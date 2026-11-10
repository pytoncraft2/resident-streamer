/**
 * Processus séparé : charge le registre des aptitudes du serveur **compilé** (build/server, produit par
 * `npm test`) avec le pont Phaser, puis affiche (ligne « RESULTAT ») en JSON : par personnage, ses clés, ses
 * commandes et ses animations (avec les noms de leurs images), ainsi que les animations communes.
 * Lu par `test/helpers/registre.ts`.
 * Les fichiers d'aptitudes ne compilent pas avec la config stricte des tests : ils sont lus compilés.
 * Lancement : node -r ts-node/register test/fixtures/registre-aptitudes.ts
 */
import "@geckos.io/phaser-on-nodejs";
import Phaser from "phaser";
import path from "path";
import { AnimationPersonnage, nomsDesImages } from "../../src/server/game/scenes/Aptitudes/definition";

interface Registre {
  readonly [personnage: string]: { readonly [cle: string]: unknown };
}

const RACINE = path.resolve(__dirname, "../..");
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const resumer = (a: AnimationPersonnage) => ({ cle: a.cle, imageQuiBlesse: a.imageQuiBlesse, images: nomsDesImages(a) });

async function main(): Promise<void> {
  // Les classes d'éléments (BombeClass…) héritent du `Phaser` global, comme dans le serveur.
  (globalThis as unknown as { Phaser: typeof Phaser }).Phaser = Phaser;
  const { Aptitudes } = require(path.join(RACINE, "build/server/game/scenes/Aptitudes/base.js")) as { Aptitudes: Registre };
  // L'ancien chargeur remplissait le registre de façon asynchrone : attendre qu'il soit stable
  // (sans effet sur le registre actuel, construit au chargement, mais garde le test valable des deux côtés).
  let taille = -1;
  for (let essai = 0; essai < 50 && Object.keys(Aptitudes).length !== taille; essai++) {
    taille = Object.keys(Aptitudes).length;
    await pause(100);
  }
  const { DEPLACEMENTS_PAR_DEFAUT } = require(path.join(RACINE, "build/server/game/scenes/Stats/Defaut.js")) as {
    DEPLACEMENTS_PAR_DEFAUT?: Record<string, unknown>;
  };
  const resultat = Object.fromEntries(
    Object.entries(Aptitudes).map(([personnage, aptitudes]) => [
      personnage,
      {
        cles: Object.keys(aptitudes).filter((cle) => cle !== "commandes" && typeof aptitudes[cle] === "function").sort(),
        commandes: aptitudes.commandes,
        animations: Array.isArray(aptitudes.animations) ? (aptitudes.animations as AnimationPersonnage[]).map(resumer) : undefined,
        stats: aptitudes.stats,
        // Déplacements qui remplacent ceux par défaut (fonction différente de DEPLACEMENTS_PAR_DEFAUT).
        deplacementsPropres: DEPLACEMENTS_PAR_DEFAUT
          ? Object.keys(DEPLACEMENTS_PAR_DEFAUT).filter((t) => aptitudes[t] !== DEPLACEMENTS_PAR_DEFAUT[t]).sort()
          : undefined,
      },
    ]),
  );
  const { ANIMATIONS_COMMUNES } = require(path.join(RACINE, "build/server/game/scenes/Animations/communes.js")) as { ANIMATIONS_COMMUNES: AnimationPersonnage[] };
  process.stdout.write(`\nRESULTAT ${JSON.stringify({ registre: resultat, communes: ANIMATIONS_COMMUNES.map(resumer) })}\n`);
}

main().catch((erreur: unknown) => {
  process.stderr.write(String(erreur instanceof Error ? erreur.stack : erreur));
  process.exit(1);
});
