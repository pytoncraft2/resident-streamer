/**
 * Anomalie B1 : la destruction d'un jeu Phaser HEADLESS (une room) doit aboutir
 * sans exception et libérer la mémoire. Voir src/server/game/phaserHeadless.ts.
 */
import { strict as assert } from "assert";
import { execFile } from "child_process";
import path from "path";

interface Resultat {
  jeux: number;
  erreurs: number;
  enMemoire: number;
  premiereErreur?: string;
}

const RACINE = path.resolve(__dirname, "../..");
const SCRIPT = path.join(RACINE, "test/fixtures/destruction-headless.ts");

function lancer(...options: string[]): Promise<Resultat> {
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      ["--expose-gc", "-r", "ts-node/register", SCRIPT, ...options],
      { cwd: RACINE, env: { ...process.env, TS_NODE_PROJECT: "test/tsconfig.json" }, timeout: 60000, maxBuffer: 16 * 1024 * 1024 },
      (erreur, sortie) => {
        const ligne = sortie.split("\n").find((l) => l.startsWith("RESULTAT "));
        if (!ligne) return reject(erreur ?? new Error(`pas de résultat :\n${sortie.slice(-2000)}`));
        resolve(JSON.parse(ligne.slice("RESULTAT ".length)) as Resultat);
      },
    );
  });
}

describe("destruction des jeux Phaser HEADLESS (anomalie B1)", function () {
  this.timeout(90000);

  it("avec les contournements : aucune erreur et aucun jeu retenu en mémoire", async function () {
    const r = await lancer();
    assert.equal(r.erreurs, 0, `erreurs de destruction : ${r.premiereErreur ?? ""}`);
    assert.ok(r.enMemoire <= 1, `${r.enMemoire}/${r.jeux} jeux encore en mémoire après GC`);
  });

  it("sans les contournements, le défaut existe toujours (sinon, les retirer)", async function () {
    const r = await lancer("--sans-correctif");
    assert.ok(r.erreurs > 0 && r.enMemoire > r.jeux / 2, `le pont ou Phaser semble corrigé : ${JSON.stringify(r)}`);
  });
});
