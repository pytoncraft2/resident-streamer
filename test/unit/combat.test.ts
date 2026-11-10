import { strict as assert } from "assert";
import { VIE_MAX, peutBlesser, peutSoigner, resoudreContact, vieApresDommage, vieApresSoin } from "../../src/server/domain/combat";

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

describe("domain/combat · vieApresSoin (plafond à 10, intentions §2)", function () {
  it("ajoute le soin sous le plafond", function () {
    assert.equal(vieApresSoin(5, 0.01), 5.01);
  });
  it("ne dépasse jamais le plafond", function () {
    assert.equal(vieApresSoin(9.995, 0.01), VIE_MAX);
    assert.equal(vieApresSoin(VIE_MAX, 0.01), VIE_MAX);
  });
  it("ne réduit pas une vie déjà au-dessus du plafond", function () {
    assert.equal(vieApresSoin(12, 0.01), 12);
  });
  it("ignore un soin négatif ou NaN", function () {
    assert.equal(vieApresSoin(5, -1), 5);
    assert.equal(vieApresSoin(5, Number.NaN), 5);
  });
});

describe("domain/combat · resoudreContact (zone d'attaque de PlayerClass)", function () {
  const fakhear = { blesse: true, soigne: false, degat: 2, campVise: "enemies" as const, sprite: "fakhear" };
  const osmo = { blesse: false, soigne: true, degat: 1, campVise: "enemies" as const, sprite: "osmosiscoop" };
  const boss = { invulnerable: false, blessable: true, vie: 10, sprite: "boss_1", camp: "enemies" as const, estJoueur: false };
  const allie = { invulnerable: false, blessable: true, vie: 5, sprite: "huzounet", camp: "players" as const, estJoueur: true };

  it("coup sur un boss : dégâts de l'attaquant, coup consommé", function () {
    assert.deepEqual(resoudreContact(fakhear, boss), { ignore: false, consommeCoup: true, effet: { type: "dommage", puissance: 2 }, soin: false });
  });

  it("cible invulnérable (boss final sur son trône) : ignorée, coup NON consommé", function () {
    assert.deepEqual(resoudreContact(fakhear, { ...boss, invulnerable: true }), { ignore: true, consommeCoup: false, effet: { type: "aucun" }, soin: false });
  });

  it("pas de tir ami : un allié n'est pas blessé, mais le coup est consommé", function () {
    assert.deepEqual(resoudreContact(fakhear, allie), { ignore: false, consommeCoup: true, effet: { type: "aucun" }, soin: false });
  });

  it("pas de coup hors de l'image qui blesse", function () {
    assert.deepEqual(resoudreContact({ ...fakhear, blesse: false }, boss).effet, { type: "aucun" });
    assert.equal(resoudreContact({ ...fakhear, blesse: false }, boss).consommeCoup, false);
  });

  it("ni une entité sans dommage (élément de décor), ni une entité du même personnage", function () {
    assert.deepEqual(resoudreContact(fakhear, { ...boss, blessable: false }).effet, { type: "aucun" });
    assert.deepEqual(resoudreContact(fakhear, { ...boss, sprite: "fakhear" }).effet, { type: "aucun" });
  });

  it("cible déjà à 0 : relevée à 10 points de vie ; son « game-over » si elle vise les ennemis", function () {
    assert.deepEqual(resoudreContact(fakhear, { ...boss, vie: 0 }).effet, { type: "relever", vie: 10, sonGameOver: false });
    const bossFusionne = { ...boss, vie: 0, estJoueur: true };
    assert.deepEqual(resoudreContact(fakhear, bossFusionne).effet, { type: "relever", vie: 10, sonGameOver: true });
  });

  it("soin réservé aux alliés", function () {
    assert.equal(resoudreContact(osmo, allie).soin, true);
    assert.equal(resoudreContact(osmo, boss).soin, false);
    assert.equal(resoudreContact(osmo, { ...allie, camp: undefined }).soin, false);
  });
});
