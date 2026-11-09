/**
 * Démarre le serveur compilé (build/server/server.js) dans un processus séparé,
 * sur un port libre, pour les tests d'intégration.
 */
import { ChildProcess, spawn } from "child_process";
import { promises as fs } from "fs";
import http from "http";
import net from "net";
import os from "os";
import path from "path";

export interface ServeurDeTest {
  readonly port: number;
  readonly httpUrl: string;
  readonly wsUrl: string;
  /** Fichier du classement de ce serveur (dossier temporaire, supprimé à l'arrêt). */
  readonly fichierScores: string;
  /** Sortie standard et d'erreur cumulées du serveur. */
  journal(): string;
  arreter(): Promise<void>;
}

const RACINE = path.resolve(__dirname, "../..");
const POINT_ENTREE = path.join(RACINE, "build/server/server.js");

function portLibre(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const adresse = srv.address();
      if (adresse === null || typeof adresse === "string") {
        srv.close();
        reject(new Error("adresse de port inattendue"));
        return;
      }
      const { port } = adresse;
      srv.close(() => resolve(port));
    });
  });
}

export function getStatut(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode ?? 0);
    });
    req.on("error", reject);
    req.setTimeout(2000, () => req.destroy(new Error("délai dépassé")));
  });
}

export async function attendre(condition: () => boolean | Promise<boolean>, delaiMs: number, libelle: string): Promise<void> {
  const fin = Date.now() + delaiMs;
  for (;;) {
    try {
      if (await condition()) return;
    } catch {
      // condition pas encore remplie (ex. serveur pas encore à l'écoute)
    }
    if (Date.now() > fin) throw new Error(`délai dépassé : ${libelle}`);
    await new Promise((r) => setTimeout(r, 100));
  }
}

export interface OptionsServeur {
  /** Classement écrit avant le démarrage ; sinon le serveur crée le sien depuis src/server/scores.json. */
  classement?: unknown;
  /** Variables d'environnement supplémentaires du serveur (ex. BOSS_FINAL_DIRECT). */
  env?: Readonly<Record<string, string>>;
}

export async function demarrerServeur(options: OptionsServeur = {}): Promise<ServeurDeTest> {
  const port = await portLibre();
  const dossier = await fs.mkdtemp(path.join(os.tmpdir(), "resident-streamer-test-"));
  const fichierScores = path.join(dossier, "scores.json");
  if (options.classement !== undefined) await fs.writeFile(fichierScores, JSON.stringify(options.classement));
  let sortie = "";
  const processus: ChildProcess = spawn(process.execPath, [POINT_ENTREE], {
    cwd: RACINE,
    env: { ...process.env, ...options.env, PORT: String(port), HOST: "127.0.0.1", SCORES_FICHIER: fichierScores },
    stdio: ["ignore", "pipe", "pipe"],
  });
  processus.stdout?.on("data", (d: Buffer) => (sortie += d.toString()));
  processus.stderr?.on("data", (d: Buffer) => (sortie += d.toString()));

  const httpUrl = `http://127.0.0.1:${port}`;
  await attendre(async () => (await getStatut(`${httpUrl}/scores`)) === 200, 15000, "démarrage du serveur");

  return {
    port,
    httpUrl,
    wsUrl: `ws://127.0.0.1:${port}`,
    fichierScores,
    journal: () => sortie,
    arreter: async () => {
      if (processus.exitCode === null) {
        await new Promise<void>((resolve) => {
          processus.once("exit", () => resolve());
          processus.kill("SIGTERM");
        });
      }
      await fs.rm(dossier, { recursive: true, force: true });
    },
  };
}
