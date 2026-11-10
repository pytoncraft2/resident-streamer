/**
 * Caractérisation du registre des aptitudes (`Aptitudes/base.ts`) : pour chaque personnage, les
 * fonctions appelables (touches, `auto`, `StatsSupplementaire`) et les commandes envoyées au client
 * (`Commandes` de RoomState, affichées dans l'interface). Contrat à préserver par la refonte du registre.
 * Animations : la table des images où le coup porte (`blesse_opposant`), auparavant en dur dans
 * `PlayerClass`, est désormais portée par les animations de chaque personnage.
 * `animationLancerManette` (code mort, jamais appelé) en est exclu.
 */
import { strict as assert } from "assert";
import { execFile } from "child_process";
import path from "path";

interface EntreeRegistre {
  cles: string[];
  commandes: Record<string, string>;
}
interface AnimationLue {
  cle: string;
  imageQuiBlesse?: string;
}
interface EntreeLue extends EntreeRegistre {
  animations?: AnimationLue[];
}

const RACINE = path.resolve(__dirname, "../..");
const SCRIPT = path.join(RACINE, "test/fixtures/registre-aptitudes.ts");

function lireRegistre(): Promise<Record<string, EntreeLue>> {
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      ["-r", "ts-node/register", SCRIPT],
      { cwd: RACINE, env: { ...process.env, TS_NODE_PROJECT: "test/tsconfig.json" }, timeout: 60000, maxBuffer: 16 * 1024 * 1024 },
      (erreur, sortie, sortieErreur) => {
        const ligne = sortie.split("\n").find((l) => l.startsWith("RESULTAT "));
        if (!ligne) return reject(erreur ?? new Error(`pas de résultat :\n${sortieErreur.slice(-2000)}`));
        resolve(JSON.parse(ligne.slice("RESULTAT ".length)) as Record<string, EntreeLue>);
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
  let registre: Record<string, EntreeLue>;

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

  it("images où le coup porte : la table historique de PlayerClass, chez le bon personnage", function () {
    const blessantes = Object.fromEntries(
      Object.entries(registre).map(([personnage, e]) => [
        personnage,
        Object.fromEntries((e.animations ?? []).filter((a) => a.imageQuiBlesse !== undefined).map((a) => [a.cle, a.imageQuiBlesse])),
      ]),
    );
    assert.deepEqual(blessantes, {
      akhizonah: { akhizonah_couteau: "knife2" },
      fakhear: { cross: "cross4", attack: "positiona4", straightlead: "straightlead1" },
      huzounet: {},
      osmosiscoop: { osmo_attaque: "osmo_attaque3" },
      boss_1: { attaque: "toutes" },
      manette: { manette_punch: "manettepunch1" },
      troll: {},
      twitchman: { twitchman_punch: "twitchmanpunch1" },
      super_boss: {},
    });
  });

  it("chaque animation propre appartient à un seul personnage (clé unique)", function () {
    const cles = Object.values(registre).flatMap((e) => (e.animations ?? []).map((a) => a.cle));
    assert.equal(new Set(cles).size, cles.length, `clés en double : ${cles.join(", ")}`);
    assert.equal(cles.length, 22, "22 animations propres (+ 7 communes = les 29 historiques)");
  });
});
