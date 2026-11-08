/**
 * Démarre le serveur compilé (build/server/server.js) dans un processus séparé,
 * sur un port libre, pour les tests d'intégration.
 */
import { ChildProcess, spawn } from "child_process";
import http from "http";
import net from "net";
import path from "path";

export interface ServeurDeTest {
  readonly port: number;
  readonly httpUrl: string;
  readonly wsUrl: string;
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

export async function demarrerServeur(): Promise<ServeurDeTest> {
  const port = await portLibre();
  let sortie = "";
  const processus: ChildProcess = spawn(process.execPath, [POINT_ENTREE], {
    cwd: RACINE,
    env: { ...process.env, PORT: String(port), HOST: "127.0.0.1" },
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
    journal: () => sortie,
    arreter: () =>
      new Promise((resolve) => {
        if (processus.exitCode !== null) return resolve();
        processus.once("exit", () => resolve());
        processus.kill("SIGTERM");
      }),
  };
}
