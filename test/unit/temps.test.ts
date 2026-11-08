import { strict as assert } from "assert";
import { formaterDuree } from "../../src/server/domain/temps";

describe("domain/temps · formaterDuree", function () {
  const cas: Array<[number, string]> = [
    [0, "00:00:00"],
    [21, "00:00:21"],
    [102, "00:01:42"],
    [3600, "01:00:00"],
    [3661.9, "01:01:01"], // fractions tronquées
    [360000, "100:00:00"], // au-delà de 99 h
  ];
  for (const [secondes, attendu] of cas) {
    it(`${secondes} s → ${attendu}`, function () {
      assert.equal(formaterDuree(secondes), attendu);
    });
  }
});
