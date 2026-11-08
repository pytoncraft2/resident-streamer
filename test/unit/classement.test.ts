import { strict as assert } from "assert";
import { ajouterScore, Classement } from "../../src/server/domain/classement";

describe("domain/classement · ajouterScore", function () {
  const base: Classement = {
    "EQUIPE B": { joueurs: ["b"], score: "00:02:00" },
    "EQUIPE A": { joueurs: ["a"], score: "00:01:00" },
  };

  it("insère et trie par temps croissant", function () {
    const c = ajouterScore(base, "EQUIPE C", ["c"], "00:01:30");
    assert.deepEqual(Object.keys(c), ["EQUIPE A", "EQUIPE C", "EQUIPE B"]);
  });

  it("ne modifie pas le classement reçu", function () {
    ajouterScore(base, "EQUIPE C", ["c"], "00:01:30");
    assert.deepEqual(Object.keys(base), ["EQUIPE B", "EQUIPE A"]);
  });

  it("écrase une équipe existante même avec un moins bon temps", function () {
    const c = ajouterScore(base, "EQUIPE A", ["a2"], "00:05:00");
    assert.deepEqual(Object.keys(c), ["EQUIPE B", "EQUIPE A"]);
    assert.deepEqual(c["EQUIPE A"], { joueurs: ["a2"], score: "00:05:00" });
  });

  it("convertit équipe et score en chaîne", function () {
    const c = ajouterScore({}, undefined, [], 130);
    assert.deepEqual(c, { undefined: { joueurs: [], score: "130" } });
  });

  it("place en tête les noms d'équipe numériques", function () {
    const c = ajouterScore(base, "42", ["x"], "00:09:00");
    assert.deepEqual(Object.keys(c), ["42", "EQUIPE A", "EQUIPE B"]);
  });
});
