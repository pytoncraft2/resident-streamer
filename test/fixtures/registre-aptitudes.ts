/**
 * Processus séparé : charge le registre des aptitudes du serveur **compilé** (build/server, produit par
 * `npm test`) avec le pont Phaser, puis affiche (ligne « RESULTAT ») en JSON, par personnage, ses clés, ses commandes et ses animations.
 * Les fichiers d'aptitudes ne compilent pas avec la config stricte des tests : ils sont lus compilés.
 * Lancement : node -r ts-node/register test/fixtures/registre-aptitudes.ts
 */
import "@geckos.io/phaser-on-nodejs";
import Phaser from "phaser";
import path from "path";

interface Registre {
  readonly [personnage: string]: { readonly [cle: string]: unknown };
}

const RACINE = path.resolve(__dirname, "../..");
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

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
  const resultat = Object.fromEntries(
    Object.entries(Aptitudes).map(([personnage, aptitudes]) => [
      personnage,
      {
        cles: Object.keys(aptitudes).filter((cle) => cle !== "commandes" && typeof aptitudes[cle] === "function").sort(),
        commandes: aptitudes.commandes,
        animations: Array.isArray(aptitudes.animations)
          ? (aptitudes.animations as { cle: string; imageQuiBlesse?: string }[]).map((a) => ({ cle: a.cle, imageQuiBlesse: a.imageQuiBlesse }))
          : undefined,
      },
    ]),
  );
  process.stdout.write(`\nRESULTAT ${JSON.stringify(resultat)}\n`);
}

main().catch((erreur: unknown) => {
  process.stderr.write(String(erreur instanceof Error ? erreur.stack : erreur));
  process.exit(1);
});
