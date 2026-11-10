import { strict as assert } from "assert";
import { estPersonnageJouable, PERSONNAGES_JOUABLES } from "../../src/shared/personnages";

describe("shared/personnages", function () {
  it("les 4 personnages jouables, dans l'ordre du lobby", function () {
    assert.deepEqual([...PERSONNAGES_JOUABLES], ["fakhear", "akhizonah", "huzounet", "osmosiscoop"]);
  });

  it("estPersonnageJouable : seulement les noms du catalogue (ni boss, ni inconnu, ni autre type)", function () {
    for (const nom of PERSONNAGES_JOUABLES) assert.equal(estPersonnageJouable(nom), true);
    for (const nom of ["super_boss", "boss_1", "inconnu", "", "FAKHEAR", undefined, null, 3, {}]) assert.equal(estPersonnageJouable(nom), false);
  });
});
