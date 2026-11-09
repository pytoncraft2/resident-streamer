import { strict as assert } from "assert";
import { clavierRecu, frontsMontants } from "../../src/server/domain/entrees";

const RELACHE = { a: false, z: false, e: false, r: false, tab: false, right: false };

describe("domain/entrees · frontsMontants (anomalie B7)", function () {
  it("détecte l'appui d'une touche", function () {
    assert.equal(frontsMontants(RELACHE, { ...RELACHE, z: true }).z_debut, true);
  });

  it("ignore une touche restée enfoncée quand une autre touche change", function () {
    const zTenu = { ...RELACHE, z: true };
    const f = frontsMontants(zTenu, { ...zTenu, right: true });
    assert.equal(f.z_debut, false);
  });

  it("redétecte la touche après un relâchement", function () {
    const zTenu = { ...RELACHE, z: true };
    const relache = frontsMontants(zTenu, RELACHE);
    assert.equal(relache.z_debut, false);
    assert.equal(frontsMontants(RELACHE, zTenu).z_debut, true);
  });

  it("premier message : toute touche enfoncée est un appui", function () {
    const f = frontsMontants(undefined, { a: true, e: true });
    assert.deepEqual(f, { a_debut: true, z_debut: false, e_debut: true, r_debut: false, tab_debut: false });
  });

  it("une valeur non booléenne compte comme relâchée", function () {
    assert.equal(frontsMontants(RELACHE, { z: "oui" }).z_debut, false);
  });
});

describe("domain/entrees · clavierRecu", function () {
  it("garde l'état reçu et écrase les fronts envoyés par le client", function () {
    const zTenu = { ...RELACHE, z: true };
    const clavier = clavierRecu(zTenu, { ...zTenu, right: true, z_debut: true, z_fin: true });
    assert.equal(clavier.right, true);
    assert.equal(clavier.z_fin, true);
    assert.equal(clavier.z_debut, false);
  });
});
