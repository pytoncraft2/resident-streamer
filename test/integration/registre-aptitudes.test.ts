/**
 * Caractérisation du registre des aptitudes (`Aptitudes/base.ts`) : pour chaque personnage, les
 * fonctions appelables (touches, `auto`, `StatsSupplementaire`) et les commandes envoyées au client
 * (`Commandes` de RoomState, affichées dans l'interface). Contrat à préserver par la refonte du registre.
 * `animationLancerManette` (code mort, jamais appelé) en est exclu.
 */
import { strict as assert } from "assert";
import { execFile } from "child_process";
import path from "path";

interface EntreeRegistre {
  cles: string[];
  commandes: Record<string, string>;
}

const RACINE = path.resolve(__dirname, "../..");
const SCRIPT = path.join(RACINE, "test/fixtures/registre-aptitudes.ts");

function lireRegistre(): Promise<Record<string, EntreeRegistre>> {
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      ["-r", "ts-node/register", SCRIPT],
      { cwd: RACINE, env: { ...process.env, TS_NODE_PROJECT: "test/tsconfig.json" }, timeout: 60000, maxBuffer: 16 * 1024 * 1024 },
      (erreur, sortie, sortieErreur) => {
        const ligne = sortie.split("\n").find((l) => l.startsWith("RESULTAT "));
        if (!ligne) return reject(erreur ?? new Error(`pas de résultat :\n${sortieErreur.slice(-2000)}`));
        resolve(JSON.parse(ligne.slice("RESULTAT ".length)) as Record<string, EntreeRegistre>);
      },
    );
  });
}

const ATTENDU: Record<string, EntreeRegistre> = {
  akhizonah: { cles: ["A", "StatsSupplementaire", "TAB", "Z"], commandes: { A: "couteau", Z: "bombe", TAB: "fusion" } },
  fakhear: { cles: ["A", "E", "StatsSupplementaire", "TAB", "Z"], commandes: { A: "cross", Z: "kick", E: "dash", TAB: "fusion" } },
  huzounet: { cles: ["A", "E", "StatsSupplementaire", "TAB", "Z"], commandes: { A: "shuriken", Z: "kunai", E: "clonage", TAB: "fusion" } },
  osmosiscoop: { cles: ["A", "StatsSupplementaire", "TAB", "Z"], commandes: { A: "soin", Z: "blesse", TAB: "fusion" } },
  boss_1: { cles: ["A", "StatsSupplementaire", "Z", "auto"], commandes: { A: "pique", Z: "suivre" } },
  manette: { cles: ["A", "StatsSupplementaire", "Z", "auto"], commandes: { A: "punch", Z: "lancer" } },
  troll: { cles: ["A", "StatsSupplementaire", "Z", "auto"], commandes: { A: "oie", Z: "grenouille" } },
  twitchman: { cles: ["A", "E", "StatsSupplementaire", "Z", "auto"], commandes: { A: "punch", Z: "charge", E: "laser" } },
  super_boss: { cles: ["A", "E", "R", "StatsSupplementaire", "Z", "auto"], commandes: { A: "impact", Z: "pc", E: "contreattaque", R: "pluie" } },
};

describe("registre des aptitudes (caractérisation)", function () {
  this.timeout(90000);
  let registre: Record<string, EntreeRegistre>;

  before(async function () {
    registre = await lireRegistre();
  });

  it("contient exactement les 9 personnages (4 jouables, 5 boss)", function () {
    assert.deepEqual(Object.keys(registre).sort(), Object.keys(ATTENDU).sort());
  });

  for (const [personnage, attendu] of Object.entries(ATTENDU)) {
    it(`${personnage} : touches, auto, réglages et commandes affichées`, function () {
      const entree = registre[personnage];
      assert.ok(entree, `${personnage} absent du registre`);
      assert.deepEqual(entree.cles.filter((c) => c !== "animationLancerManette"), attendu.cles);
      assert.deepEqual(entree.commandes, attendu.commandes);
    });
  }
});
