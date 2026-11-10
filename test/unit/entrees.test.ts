import { strict as assert } from "assert";
import { clavierRecu, frontsAConsommer, frontsMontants, touchesDeclenchees } from "../../src/server/domain/entrees";

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

describe("domain/entrees · touches déclenchées et fronts consommés (PlayerClass.preUpdate)", function () {
  it("aucune touche : rien à appeler, rien à consommer", function () {
    assert.deepEqual(touchesDeclenchees({}), []);
    assert.deepEqual(frontsAConsommer({}), []);
  });

  it("chaque touche déclenche sa clé du registre ; A, Z, TAB et la marche aussi au relâchement", function () {
    const cas: [Record<string, boolean>, string][] = [
      [{ a: true }, "A"], [{ a_fin: true }, "A"],
      [{ z: true }, "Z"], [{ z_fin: true }, "Z"],
      [{ e: true }, "E"], [{ r: true }, "R"],
      [{ tab: true }, "TAB"], [{ tab_fin: true }, "TAB"],
      [{ left: true }, "toucheGauche"], [{ left_fin: true }, "toucheGauche"],
      [{ right: true }, "toucheDroite"], [{ right_fin: true }, "toucheDroite"],
      [{ up: true }, "toucheHaut"], [{ down: true }, "toucheBas"], [{ space: true }, "toucheEspace"],
    ];
    for (const [clavier, cle] of cas) assert.deepEqual(touchesDeclenchees(clavier), [cle], JSON.stringify(clavier));
  });

  it("E, R, haut, bas et espace ne réagissent pas à leur relâchement", function () {
    assert.deepEqual(touchesDeclenchees({ e_fin: true, r_fin: true, up_fin: true, down_fin: true, space_fin: true }), []);
  });

  it("plusieurs touches : ordre historique (actions puis déplacements)", function () {
    assert.deepEqual(touchesDeclenchees({ space: true, right: true, tab: true, a: true }), ["A", "TAB", "toucheDroite", "toucheEspace"]);
  });

  it("valeurs évaluées comme vraies ou fausses (comportement historique)", function () {
    assert.deepEqual(touchesDeclenchees({ a: 1, z: 0, e: "" }), ["A"]);
  });

  it("fronts consommés : la liste historique seulement (a_fin et les *_debut d'actions restent)", function () {
    const clavier = { left_fin: true, z_fin: true, right_fin: true, space_fin: true, right_debut: true, left_debut: true, tab_fin: true, a_fin: true, z_debut: true };
    assert.deepEqual(frontsAConsommer(clavier), ["left_fin", "z_fin", "right_fin", "space_fin", "right_debut", "left_debut", "tab_fin"]);
  });
});
