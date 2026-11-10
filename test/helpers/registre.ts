/**
 * Lecture du registre des aptitudes du serveur compilé, via `test/fixtures/registre-aptitudes.ts`
 * exécuté dans un processus séparé (pont Phaser, fichiers d'aptitudes non stricts).
 */
import { execFile } from "child_process";
import path from "path";

export interface AnimationLue {
  readonly cle: string;
  readonly imageQuiBlesse?: string;
  /** Noms des images de l'animation dans l'atlas (`<prefixe><n>`). */
  readonly images: readonly string[];
}

export interface EntreeLue {
  readonly cles: readonly string[];
  readonly commandes: Readonly<Record<string, string>>;
  readonly animations?: readonly AnimationLue[];
  readonly stats?: { readonly vie: number; readonly degat: number; readonly vitesse: number };
  readonly deplacementsPropres?: readonly string[];
}

export interface RegistreLu {
  readonly registre: Readonly<Record<string, EntreeLue>>;
  readonly communes: readonly AnimationLue[];
}

const RACINE = path.resolve(__dirname, "../..");
const SCRIPT = path.join(RACINE, "test/fixtures/registre-aptitudes.ts");

export function lireRegistre(): Promise<RegistreLu> {
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      ["-r", "ts-node/register", SCRIPT],
      { cwd: RACINE, env: { ...process.env, TS_NODE_PROJECT: "test/tsconfig.json" }, timeout: 60000, maxBuffer: 16 * 1024 * 1024 },
      (erreur, sortie, sortieErreur) => {
        const ligne = sortie.split("\n").find((l) => l.startsWith("RESULTAT "));
        if (!ligne) return reject(erreur ?? new Error(`pas de résultat :\n${sortieErreur.slice(-2000)}`));
        resolve(JSON.parse(ligne.slice("RESULTAT ".length)) as RegistreLu);
      },
    );
  });
}
