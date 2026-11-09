import { strict as assert } from "assert";
import { campDe, SceneCamps } from "../../src/server/game/camps";
import { peutBlesser } from "../../src/server/domain/combat";

const groupe = (...membres: object[]) => ({ contains: (objet: unknown) => membres.includes(objet as object) });

describe("game/camps · campDe", function () {
  const joueur = {};
  const boss = {};
  const rangeeDeTrone = {};
  const projectile = {};
  const scene: SceneCamps = { players: groupe(joueur), enemies: groupe(boss, rangeeDeTrone) };

  it("joueurs, ennemis (boss et éléments du trône), ou aucun camp", function () {
    assert.equal(campDe(scene, joueur), "players");
    assert.equal(campDe(scene, boss), "enemies");
    assert.equal(campDe(scene, rangeeDeTrone), "enemies");
    assert.equal(campDe(scene, projectile), undefined);
  });

  it("laser de twitchman en boss (vise « players ») : ni les autres boss, ni le trône", function () {
    assert.equal(peutBlesser("players", campDe(scene, joueur)), true);
    assert.equal(peutBlesser("players", campDe(scene, boss)), false);
    assert.equal(peutBlesser("players", campDe(scene, rangeeDeTrone)), false);
  });

  it("laser de twitchman contrôlé par un joueur (vise « enemies ») : pas de tir ami", function () {
    assert.equal(peutBlesser("enemies", campDe(scene, joueur)), false);
    assert.equal(peutBlesser("enemies", campDe(scene, rangeeDeTrone)), true);
  });
});
