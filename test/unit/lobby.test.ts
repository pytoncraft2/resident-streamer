import { strict as assert } from "assert";
import { etatJoueurValide } from "../../src/server/domain/lobby";

describe("domain/lobby · etatJoueurValide (message non fiable)", function () {
  it("accepte un choix de personnage du catalogue (index 0 à 3)", function () {
    assert.deepEqual(etatJoueurValide({ pret: true, indexConfirmation: 2, ancienIndexConfirmation: 0 }), { pret: true, indexConfirmation: 2, ancienIndexConfirmation: 0 });
    assert.deepEqual(etatJoueurValide({ pret: true, indexConfirmation: 3 }), { pret: true, indexConfirmation: 3 });
  });

  it("ignore un index hors catalogue, non entier ou absent (avant : exception dans le lobby)", function () {
    for (const indexConfirmation of [4, -1, 1.5, "1", undefined, null]) {
      assert.equal(etatJoueurValide({ pret: true, indexConfirmation }), undefined, String(indexConfirmation));
    }
    assert.equal(etatJoueurValide(undefined), undefined);
    assert.equal(etatJoueurValide(null), undefined);
  });

  it("omet un ancien index invalide ; pret vaut true seulement si true est envoyé", function () {
    assert.deepEqual(etatJoueurValide({ pret: "oui", indexConfirmation: 1, ancienIndexConfirmation: 9 }), { pret: false, indexConfirmation: 1 });
  });
});
