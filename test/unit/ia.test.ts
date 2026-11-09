import { strict as assert } from "assert";
import { action, condition, selecteur, sequence } from "../../src/server/ia/arbre";
import { contient, decider, PerceptionBoss } from "../../src/server/ia/boss";
import { arbreBoss1, PLACE_BOSS_1 } from "../../src/server/ia/bosses/boss_1";

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
