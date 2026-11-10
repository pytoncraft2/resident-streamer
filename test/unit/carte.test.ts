import { strict as assert } from "assert";
import { APPARITION_JOUEUR, APPARITIONS_BOSS, MURS, NomPiece, PIECES, PLACES, PLANCHER_ETAGE, REAPPARITION_JOUEUR } from "../../src/server/domain/carte";
import { contient, Point } from "../../src/server/ia/boss";

const piecesDe = (point: Point): NomPiece[] => (Object.keys(PIECES) as NomPiece[]).filter((nom) => contient(PIECES[nom], point));

describe("domain/carte · cohérence du niveau", function () {
  it("chaque point de la carte hors murs et plancher est dans exactement une pièce", function () {
    for (let x = 1; x < MURS.fin; x += 37) {
      for (let y = -1200; y < 960; y += 41) {
        if (x === MURS.gauche || x === MURS.droite || y === PLANCHER_ETAGE) continue;
        assert.equal(piecesDe({ x, y }).length, 1, `(${x}, ${y}) : ${piecesDe({ x, y }).join(", ")}`);
      }
    }
  });

  it("un point sur un mur ou sur le plancher n'est dans aucune pièce (bornes strictes)", function () {
    assert.deepEqual(piecesDe({ x: MURS.gauche, y: 500 }), []);
    assert.deepEqual(piecesDe({ x: 2830, y: PLANCHER_ETAGE }), []);
  });

  it("disposition : twitchman | hall | boss_1 au rez-de-chaussée, troll | boss final | manette à l'étage", function () {
    assert.deepEqual([500, 2830, 5000].map((x) => piecesDe({ x, y: 700 })), [["twitchman"], ["hall"], ["boss_1"]]);
    assert.deepEqual([500, 2830, 5000].map((x) => piecesDe({ x, y: -600 })), [["troll"], ["super_boss"], ["manette"]]);
  });

  it("chaque boss apparaît dans sa pièce", function () {
    for (const [nom, point] of Object.entries(APPARITIONS_BOSS)) assert.deepEqual(piecesDe(point), [nom], nom);
  });

  it("chaque place de boss est dans sa pièce (une place d'étage est posée sur le plancher)", function () {
    for (const [nom, place] of Object.entries(PLACES)) {
      const auDessus = place.y === PLANCHER_ETAGE ? { x: place.x, y: place.y - 1 } : place;
      assert.deepEqual(piecesDe(auDessus), [nom], nom);
    }
  });

  it("les joueurs apparaissent et réapparaissent dans le hall", function () {
    assert.deepEqual(piecesDe(APPARITION_JOUEUR), ["hall"]);
    assert.deepEqual(piecesDe(REAPPARITION_JOUEUR), ["hall"]);
  });
});
