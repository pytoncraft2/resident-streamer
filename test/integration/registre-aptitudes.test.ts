/**
 * Caractérisation du registre des aptitudes (`Aptitudes/base.ts`) : pour chaque personnage, les
 * fonctions appelables (touches, `auto`, `StatsSupplementaire`) et les commandes envoyées au client
 * (`Commandes` de RoomState, affichées dans l'interface). Contrat à préserver par la refonte du registre.
 * Déplacements (touche*) : présents dès la construction du registre (auparavant écrits à la création
 * de chaque personnage, dans ce registre partagé par toutes les rooms).
 * Animations : la table des images où le coup porte (`blesse_opposant`), auparavant en dur dans
 * `PlayerClass`, est désormais portée par les animations de chaque personnage.
 * `animationLancerManette` (code mort, jamais appelé) en est exclu.
 */
import { strict as assert } from "assert";
import { EntreeLue, lireRegistre } from "../helpers/registre";

interface EntreeRegistre {
  cles: string[];
  commandes: Record<string, string>;
}

const ATTENDU: Record<string, EntreeRegistre> = {
  akhizonah: { cles: ["A", "StatsSupplementaire", "TAB", "Z", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "couteau", Z: "bombe", TAB: "fusion" } },
  fakhear: { cles: ["A", "E", "StatsSupplementaire", "TAB", "Z", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "cross", Z: "kick", E: "dash", TAB: "fusion" } },
  huzounet: { cles: ["A", "E", "StatsSupplementaire", "TAB", "Z", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "shuriken", Z: "kunai", E: "clonage", TAB: "fusion" } },
  osmosiscoop: { cles: ["A", "StatsSupplementaire", "TAB", "Z", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "soin", Z: "blesse", TAB: "fusion" } },
  boss_1: { cles: ["A", "StatsSupplementaire", "Z", "auto", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "pique", Z: "suivre" } },
  manette: { cles: ["A", "StatsSupplementaire", "Z", "auto", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "punch", Z: "lancer" } },
  troll: { cles: ["A", "StatsSupplementaire", "Z", "auto", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "oie", Z: "grenouille" } },
  twitchman: { cles: ["A", "E", "StatsSupplementaire", "Z", "auto", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "punch", Z: "charge", E: "laser" } },
  super_boss: { cles: ["A", "E", "R", "StatsSupplementaire", "Z", "auto", "toucheBas", "toucheDroite", "toucheEspace", "toucheGauche", "toucheHaut"], commandes: { A: "impact", Z: "pc", E: "contreattaque", R: "pluie" } },
};

describe("registre des aptitudes (caractérisation)", function () {
  this.timeout(90000);
  let registre: Readonly<Record<string, EntreeLue>>;

  before(async function () {
    registre = (await lireRegistre()).registre;
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
    assert.equal(cles.length, 25, "25 animations propres (+ 7 communes) : les 29 historiques et les 3 de troll");
  });

  it("stats : valeurs par défaut (vie 10, dégâts 1, vitesse 600) sauf fakhear, huzounet et le boss final", function () {
    const defaut = { vie: 10, degat: 1, vitesse: 600 };
    const attendues: Record<string, typeof defaut> = {
      akhizonah: defaut, osmosiscoop: defaut, boss_1: defaut, manette: defaut, troll: defaut, twitchman: defaut,
      fakhear: { ...defaut, degat: 2 },
      huzounet: { ...defaut, degat: 0.7 },
      super_boss: { ...defaut, vie: 30 },
    };
    for (const [nom, stats] of Object.entries(attendues)) assert.deepEqual(registre[nom]?.stats, stats, nom);
  });

  it("déplacements propres : ceux que les boss installaient à leur création", function () {
    const propres = Object.fromEntries(Object.entries(registre).map(([nom, e]) => [nom, e.deplacementsPropres]));
    assert.deepEqual(propres, {
      akhizonah: [], fakhear: [], huzounet: [], osmosiscoop: [], super_boss: [],
      boss_1: ["toucheDroite", "toucheGauche"],
      manette: ["toucheEspace"],
      troll: ["toucheDroite", "toucheEspace", "toucheGauche"],
      twitchman: ["toucheEspace"],
    });
  });
});
