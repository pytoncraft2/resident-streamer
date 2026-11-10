/**
 * Pilote des IA de boss (`game/ia/pilote.ts`) avec une scène factice : horloge simulée (les
 * rappels de `time.delayedCall` sont déclenchés à la demande), aucun Phaser.
 */
import { strict as assert } from "assert";
import { action } from "../../src/server/ia/arbre";
import { ArbreBoss } from "../../src/server/ia/boss";
import { BossPilote, demarrerIA } from "../../src/server/game/ia/pilote";

class SceneFactice {
  readonly enAttente: (() => void)[] = [];
  readonly room = { boss: { factice: { vaincu: false } } };
  readonly time = { now: 0, delayedCall: (_ms: number, rappel: () => void) => void this.enAttente.push(rappel) };
  readonly players = { getLength: () => 1, getChildren: () => [{ x: 10, y: 20 }] };
  readonly physics = { closest: () => ({ x: 10, y: 20 }) };
  /** Déclenche les rappels programmés jusque-là (un « tour » d'horloge). */
  avancer(): void {
    for (const rappel of this.enAttente.splice(0)) rappel();
  }
}

function piloter(): { scene: SceneFactice; decisions: () => number; vaincus: () => number } {
  const scene = new SceneFactice();
  let decisions = 0;
  let vaincus = 0;
  const arbre: ArbreBoss = action("décider", () => void decisions++);
  // Boss factice : seuls les champs lus par le pilote (scene, sprite, body, active, x, y).
  const boss = { scene, sprite: "factice", body: {}, active: true, x: 0, y: 0 } as unknown as BossPilote;
  demarrerIA(boss, arbre, { periode: 500, surVaincu: () => void vaincus++ });
  return { scene, decisions: () => decisions, vaincus: () => vaincus };
}

describe("game/ia/pilote · cycle de vie", function () {
  it("décide immédiatement puis à chaque période", function () {
    const { scene, decisions } = piloter();
    assert.equal(decisions(), 1);
    scene.avancer();
    scene.avancer();
    assert.equal(decisions(), 3);
  });

  it("mort : surVaincu une seule fois, puis plus aucune décision ni programmation", function () {
    const { scene, decisions, vaincus } = piloter();
    scene.room.boss.factice.vaincu = true;
    scene.avancer();
    assert.equal(vaincus(), 1);
    assert.equal(scene.enAttente.length, 0, "plus rien de programmé");
    scene.avancer();
    assert.equal(decisions(), 1);
    assert.equal(vaincus(), 1);
  });

  it("aucun joueur : ne décide pas mais continue d'attendre (reprise quand un joueur revient)", function () {
    const { scene, decisions } = piloter();
    scene.players.getLength = () => 0;
    scene.avancer();
    scene.avancer();
    assert.equal(decisions(), 1);
    scene.players.getLength = () => 1;
    scene.avancer();
    assert.equal(decisions(), 2);
  });
});
