/**
 * Stockage du classement dans un fichier JSON (scores.json).
 * Les ajouts sont sérialisés : chacun relit le fichier puis l'écrit avant que le suivant commence,
 * pour que deux fins de partie simultanées ne s'écrasent pas.
 */
import { copyFileSync, existsSync, mkdirSync, promises as fs } from "fs";
import path from "path";
import { ajouterScore, Classement } from "../domain/classement";

export interface DepotScores {
  /** Ajoute (ou remplace) le score d'une équipe ; résolue une fois le fichier écrit. */
  ajouter(equipe: string, joueurs: readonly string[], score: string): Promise<void>;
}

export class FichierScores implements DepotScores {
  private file: Promise<void> = Promise.resolve();

  constructor(readonly chemin: string) {}

  /**
   * Crée le fichier à partir de `source` s'il n'existe pas encore (dossiers compris).
   * Synchrone : à appeler une fois au démarrage, avant d'accepter des requêtes.
   * @returns `true` si le fichier vient d'être créé.
   */
  initialiser(source: string): boolean {
    if (existsSync(this.chemin)) return false;
    mkdirSync(path.dirname(this.chemin), { recursive: true });
    copyFileSync(source, this.chemin);
    return true;
  }

  /** Contenu du fichier tel quel (renvoyé par `GET /scores`). */
  lireBrut(): Promise<string> {
    return this.file.then(() => fs.readFile(this.chemin, "utf8"));
  }

  ajouter(equipe: string, joueurs: readonly string[], score: string): Promise<void> {
    const ajout = this.file.then(async () => {
      // Contenu supposé conforme : le fichier n'est écrit que par ce module.
      const classement = JSON.parse(await fs.readFile(this.chemin, "utf8")) as Classement;
      await fs.writeFile(this.chemin, JSON.stringify(ajouterScore(classement, equipe, [...joueurs], score)));
    });
    // Un échec ne doit pas bloquer les ajouts suivants ; il reste visible pour l'appelant.
    this.file = ajout.catch(() => undefined);
    return ajout;
  }
}

/** Racine du projet, depuis `src/server/stockage/` (ts-node) comme depuis `build/server/stockage/`. */
const RACINE = path.resolve(__dirname, "..", "..", "..");

/** Classement initial versionné : copié au premier démarrage, jamais modifié par le serveur. */
export const CLASSEMENT_INITIAL = path.join(RACINE, "src", "server", "scores.json");

/**
 * Emplacement des données (anomalie B4) : hors du code et du build, pour qu'un build ou un
 * déploiement n'écrase pas le classement. `SCORES_FICHIER` (relatif au dossier courant) le remplace.
 */
export function cheminScores(env: NodeJS.ProcessEnv = process.env): string {
  return env.SCORES_FICHIER ? path.resolve(env.SCORES_FICHIER) : path.join(RACINE, "donnees", "scores.json");
}

export const scoresServeur = new FichierScores(cheminScores());
