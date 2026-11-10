import { strict as assert } from "assert";
import { decisionTab, DUREE_FUSION, PORTEE_FUSION } from "../../src/server/domain/fusion";

describe("domain/fusion · decisionTab", function () {
  const vaincuProche = { distance: 100, vaincu: true };

  it("sans appui : rien, appui non consommé", function () {
    assert.deepEqual(decisionTab({ appui: false, ennemiProche: vaincuProche }), { type: "rien", consommer: false });
  });

  it("boss vaincu à portée : le porter", function () {
    assert.deepEqual(decisionTab({ appui: true, ennemiProche: vaincuProche }), { type: "porter" });
  });

  it("portée stricte (270 px exclus) ; boss non vaincu : rien, appui consommé", function () {
    assert.deepEqual(decisionTab({ appui: true, ennemiProche: { distance: PORTEE_FUSION - 1, vaincu: true } }), { type: "porter" });
    assert.deepEqual(decisionTab({ appui: true, ennemiProche: { distance: PORTEE_FUSION, vaincu: true } }), { type: "rien", consommer: true });
    assert.deepEqual(decisionTab({ appui: true, ennemiProche: { distance: 10, vaincu: false } }), { type: "rien", consommer: true });
  });

  it("aucun ennemi : rien, appui NON consommé (comportement historique)", function () {
    assert.deepEqual(decisionTab({ appui: true }), { type: "rien", consommer: false });
  });

  it("boss porté : fusionner, quel que soit l'ennemi proche ; devenu inaccessible : refuser", function () {
    assert.deepEqual(decisionTab({ appui: true, bossPorte: { inaccessible: false }, ennemiProche: { distance: 10, vaincu: false } }), { type: "fusionner" });
    assert.deepEqual(decisionTab({ appui: true, bossPorte: { inaccessible: true } }), { type: "refuser" });
  });

  it("constantes historiques : portée 270 px, durée 5 s", function () {
    assert.equal(PORTEE_FUSION, 270);
    assert.equal(DUREE_FUSION, 5000);
  });
});
