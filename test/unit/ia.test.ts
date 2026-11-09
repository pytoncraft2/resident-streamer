import { strict as assert } from "assert";
import { action, condition, selecteur, sequence } from "../../src/server/ia/arbre";
import { contient, decider, distance, PerceptionBoss } from "../../src/server/ia/boss";
import { arbreBoss1, PLACE_BOSS_1 } from "../../src/server/ia/bosses/boss_1";
import { arbreManette, COINS_MANETTE, PLACE_MANETTE } from "../../src/server/ia/bosses/manette";
import { arbreTroll, PLACE_TROLL } from "../../src/server/ia/bosses/troll";

describe("ia/arbre · briques", function () {
  const trace: string[] = [];
  const note = (nom: string) => action<null>(nom, () => void trace.push(nom));
  beforeEach(() => (trace.length = 0));

  it("le sélecteur s'arrête au premier enfant qui réussit", function () {
    const arbre = selecteur<null>("s", condition("non", () => false), note("a"), note("b"));
    assert.equal(arbre.evaluer(null), "succes");
    assert.deepEqual(trace, ["a"]);
  });

  it("le sélecteur échoue si aucun enfant ne réussit", function () {
    assert.equal(selecteur<null>("s", condition("non", () => false)).evaluer(null), "echec");
  });

  it("la séquence s'arrête au premier enfant qui échoue", function () {
    const arbre = sequence<null>("q", note("a"), condition("non", () => false), note("b"));
    assert.equal(arbre.evaluer(null), "echec");
    assert.deepEqual(trace, ["a"]);
  });

  it("la séquence réussit si tous ses enfants réussissent", function () {
    assert.equal(sequence<null>("q", note("a"), note("b")).evaluer(null), "succes");
    assert.deepEqual(trace, ["a", "b"]);
  });
});

describe("ia/boss · contient", function () {
  it("bornes strictes, bornes absentes non limitées", function () {
    const zone = { xMin: 0, xMax: 10, yMin: 0 };
    assert.equal(contient(zone, { x: 5, y: 1000 }), true);
    assert.equal(contient(zone, { x: 0, y: 5 }), false);
    assert.equal(contient(zone, { x: 5, y: 0 }), false);
  });
});

describe("ia/bosses · boss_1 (comportement repris de l'ancien __auto)", function () {
  const percevoir = (boss: { x: number; y: number }, cible?: { x: number; y: number }): PerceptionBoss => ({
    position: boss,
    cible: cible ? { position: cible } : undefined,
  });

  it("joueur le plus proche dans sa pièce → poursuite à vitesse 800", function () {
    assert.deepEqual(decider(arbreBoss1, percevoir(PLACE_BOSS_1, { x: 4500, y: 756 })), [
      { type: "poursuivre", vitesse: 800, animation: "deplacement" },
    ]);
  });

  it("joueur hors de la pièce → retour à sa place (5010, 755) en 500 ms", function () {
    assert.deepEqual(decider(arbreBoss1, percevoir({ x: 4600, y: 756 }, { x: 2830, y: 756 })), [
      { type: "rejoindre", position: { x: 5010, y: 755 }, duree: 500 },
    ]);
  });

  it("joueur hors de la pièce et boss déjà à x = 5010 → rien", function () {
    assert.deepEqual(decider(arbreBoss1, percevoir({ x: 5010, y: 700 }, { x: 2830, y: 756 })), []);
  });

  it("joueur à l'étage, au-dessus de la pièce (y ≤ -249) → pas de poursuite", function () {
    assert.deepEqual(decider(arbreBoss1, percevoir({ x: 4600, y: 756 }, { x: 4500, y: -300 })), [
      { type: "rejoindre", position: { x: 5010, y: 755 }, duree: 500 },
    ]);
  });

  it("bornes de la pièce exclues (x = 3802)", function () {
    assert.equal(decider(arbreBoss1, percevoir({ x: 4600, y: 756 }, { x: 3802, y: 756 }))[0]?.type, "rejoindre");
  });

  it("aucun joueur → aucune intention", function () {
    assert.deepEqual(decider(arbreBoss1, percevoir({ x: 4600, y: 756 })), []);
  });
});

describe("ia/boss · distance", function () {
  it("distance euclidienne", function () {
    assert.equal(distance({ x: 0, y: 0 }, { x: 3, y: 4 }), 5);
  });
});

describe("ia/bosses · manette (comportement repris de l'ancien __auto)", function () {
  const ETAGE = -300;
  const percevoir = (boss: { x: number; y: number }, cible?: { x: number; y: number }): PerceptionBoss => ({
    position: boss,
    cible: cible ? { position: cible } : undefined,
  });
  const types = (p: PerceptionBoss): string[] => decider(arbreManette, p).map((i) => i.type);

  it("cible proche (< 400) à gauche → se tourne, frappe puis s'envole vers le coin gauche (action longue)", function () {
    const intentions = decider(arbreManette, percevoir({ x: 4800, y: ETAGE }, { x: 4500, y: ETAGE }));
    assert.deepEqual(intentions[0], { type: "orienter", versLaGauche: true });
    assert.deepEqual(intentions[1], { type: "animation", nom: "manette_punch" });
    assert.deepEqual(intentions[2], {
      type: "rejoindre", position: COINS_MANETTE.gauche, delai: 500, duree: 1000, courbe: "Sine.inOut", animationAuDepart: "manette_vole", attendreLaFin: true,
    });
  });

  it("cible proche à droite → s'envole vers le coin droit", function () {
    const vol = decider(arbreManette, percevoir({ x: 4800, y: ETAGE }, { x: 5100, y: ETAGE })).find((i) => i.type === "rejoindre");
    assert.deepEqual(vol && "position" in vol ? vol.position : undefined, COINS_MANETTE.droite);
  });

  it("cible à distance moyenne (400 à 900) → se tourne et lance (Z)", function () {
    assert.deepEqual(decider(arbreManette, percevoir({ x: 4800, y: ETAGE }, { x: 4200, y: ETAGE })), [
      { type: "orienter", versLaGauche: true },
      { type: "aptitude", nom: "Z", entree: { z: true } },
    ]);
  });

  it("cible lointaine (> 900) à droite → avance vers elle", function () {
    assert.deepEqual(decider(arbreManette, percevoir({ x: 3900, y: ETAGE }, { x: 5500, y: ETAGE })), [
      { type: "orienter", versLaGauche: false },
      { type: "vitesseX", valeur: 340 },
      { type: "aptitude", nom: "toucheDroite", entree: { right_debut: true } },
    ]);
  });

  it("distances limites : 400 → lance, 900 → avance (l'ancien code cessait de décider)", function () {
    assert.deepEqual(types(percevoir({ x: 4800, y: ETAGE }, { x: 4400, y: ETAGE })), ["orienter", "aptitude"]);
    assert.deepEqual(types(percevoir({ x: 4800, y: ETAGE }, { x: 3900, y: ETAGE })), ["orienter", "vitesseX", "aptitude"]);
  });

  it("cible au rez-de-chaussée (y > -249) → vole jusqu'à sa place (action longue)", function () {
    assert.deepEqual(decider(arbreManette, percevoir({ x: 3970, y: ETAGE }, { x: 4500, y: 756 })), [
      { type: "rejoindre", position: PLACE_MANETTE, duree: 900, animationAuDepart: "manette_vole", attendreLaFin: true },
    ]);
  });

  it("déjà à sa place (x = 4800) et cible hors de la pièce → rien", function () {
    assert.deepEqual(decider(arbreManette, percevoir(PLACE_MANETTE, { x: 2830, y: 756 })), []);
  });

  it("aucun joueur → aucune intention", function () {
    assert.deepEqual(decider(arbreManette, percevoir({ x: 4000, y: ETAGE })), []);
  });
});

describe("ia/bosses · troll (comportement repris de l'ancien __auto)", function () {
  const ETAGE = -300;
  const percevoir = (boss: { x: number; y: number }, cible?: { x: number; y: number }): PerceptionBoss => ({
    position: boss,
    cible: cible ? { position: cible } : undefined,
  });

  it("cible proche (< 400) à droite → se tourne et charge de 1300 px vers elle (action longue)", function () {
    assert.deepEqual(decider(arbreTroll, percevoir({ x: 427, y: ETAGE }, { x: 700, y: ETAGE })), [
      { type: "orienter", versLaGauche: false },
      { type: "charger", decalageX: 1300, delai: 500, duree: 700, animationAuDepart: "troll_run", animationALaFin: "troll_idle" },
    ]);
  });

  it("cible proche à gauche → charge vers la gauche", function () {
    const charge = decider(arbreTroll, percevoir({ x: 1500, y: ETAGE }, { x: 1300, y: ETAGE })).find((i) => i.type === "charger");
    assert.equal(charge && "decalageX" in charge ? charge.decalageX : undefined, -1300);
  });

  it("cible à distance moyenne (400 à 900) → lance une oie (A)", function () {
    assert.deepEqual(decider(arbreTroll, percevoir({ x: 427, y: ETAGE }, { x: 1100, y: ETAGE })), [
      { type: "orienter", versLaGauche: false },
      { type: "aptitude", nom: "A", entree: { a: true } },
    ]);
  });

  it("cible lointaine (> 900) dans la pièce → lance une grenouille (Z)", function () {
    assert.deepEqual(decider(arbreTroll, percevoir({ x: 427, y: ETAGE }, { x: 1600, y: ETAGE })), [
      { type: "orienter", versLaGauche: false },
      { type: "aptitude", nom: "Z", entree: { z: true } },
    ]);
  });

  it("cible hors de la pièce (x ≥ 1789 ou rez-de-chaussée) → retour à sa place s'il n'y est pas", function () {
    const retour = [{ type: "rejoindre", position: PLACE_TROLL, duree: 900, animationAuDepart: "troll_idle", attendreLaFin: true }];
    assert.deepEqual(decider(arbreTroll, percevoir({ x: 1200, y: ETAGE }, { x: 1881, y: ETAGE })), retour);
    assert.deepEqual(decider(arbreTroll, percevoir({ x: 1200, y: ETAGE }, { x: 1000, y: 756 })), retour);
    assert.deepEqual(decider(arbreTroll, percevoir(PLACE_TROLL, { x: 1881, y: ETAGE })), []);
  });
});
