import { strict as assert } from "assert";
import { vieApresDommage } from "../../src/server/domain/combat";

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
