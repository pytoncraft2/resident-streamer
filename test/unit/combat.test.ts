import { strict as assert } from "assert";
import { peutBlesser, peutSoigner, vieApresDommage } from "../../src/server/domain/combat";

describe("domain/combat · vieApresDommage", function () {
  it("retire la puissance de la vie", function () {
    assert.equal(vieApresDommage(10, 3), 7);
  });
  it("accepte une puissance nulle", function () {
    assert.equal(vieApresDommage(10, 0), 10);
  });
  it("ignore une puissance négative ou NaN", function () {
    assert.equal(vieApresDommage(10, -5), 10);
    assert.equal(vieApresDommage(10, Number.NaN), 10);
  });
  it("laisse la vie devenir négative", function () {
    assert.equal(vieApresDommage(1, 3), -2);
  });
});

describe("domain/combat · peutBlesser (pas de tir ami, intentions §2)", function () {
  it("un joueur (vise les boss) blesse un boss, pas un autre joueur", function () {
    assert.equal(peutBlesser("enemies", "enemies"), true);
    assert.equal(peutBlesser("enemies", "players"), false);
  });
  it("un boss (vise les joueurs) blesse un joueur, pas un autre boss", function () {
    assert.equal(peutBlesser("players", "players"), true);
    assert.equal(peutBlesser("players", "enemies"), false);
  });
  it("une cible hors des deux groupes n'est jamais blessée", function () {
    assert.equal(peutBlesser("enemies", undefined), false);
  });
});

describe("domain/combat · peutSoigner (alliés seulement, intentions §2)", function () {
  it("un joueur soigne un joueur, pas un boss", function () {
    assert.equal(peutSoigner("enemies", "players"), true);
    assert.equal(peutSoigner("enemies", "enemies"), false);
  });
  it("une cible hors des deux groupes n'est jamais soignée", function () {
    assert.equal(peutSoigner("enemies", undefined), false);
  });
});
