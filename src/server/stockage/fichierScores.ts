/**
 * Stockage du classement dans un fichier JSON (scores.json).
 * Les ajouts sont sérialisés : chacun relit le fichier puis l'écrit avant que le suivant commence,
 * pour que deux fins de partie simultanées ne s'écrasent pas.
 */
import { promises as fs } from "fs";
import path from "path";
import { ajouterScore, Classement } from "../domain/classement";

export interface DepotScores {
  /** Ajoute (ou remplace) le score d'une équipe ; résolue une fois le fichier écrit. */
  ajouter(equipe: string, joueurs: readonly string[], score: string): Promise<void>;
}

export class FichierScores implements DepotScores {
  private file: Promise<void> = Promise.resolve();

  constructor(private readonly chemin: string) {}

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

/**
 * Classement du serveur : `scores.json` à la racine du dossier serveur
 * (`build/server/` une fois compilé, `src/server/` en développement), comme `GET /scores`.
 */
export const scoresServeur = new FichierScores(path.join(__dirname, "..", "scores.json"));
