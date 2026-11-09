/**
 * Pilote Phaser des IA de boss (ADR-003) : construit la perception, évalue l'arbre de comportement
 * (src/server/ia/) et applique les intentions produites. Reprend la boucle des anciens `__auto` :
 * un tick toutes les `periode` ms, arrêt définitif quand le boss est vaincu.
 */
import Phaser from "phaser";
import { ArbreBoss, decider, Intention, PerceptionBoss } from "../../ia/boss";

/** Vue minimale de la scène serveur (hall.ts) utilisée par le pilote. */
interface SceneBoss extends Phaser.Scene {
  room: { boss: Record<string, { vaincu: boolean }> };
  players: Phaser.Physics.Arcade.Group;
}

/** Boss piloté : sprite physique dont `sprite` est le nom (clé de `room.boss`). */
export interface BossPilote extends Phaser.Physics.Arcade.Sprite {
  sprite: string;
}

export interface OptionsPilote {
  /** Intervalle entre deux décisions, en ms. */
  periode: number;
  /** Appelé une fois quand le boss est vaincu, avant l'arrêt de l'IA. */
  surVaincu?: () => void;
}

function appliquer(boss: BossPilote, scene: SceneBoss, cible: Phaser.GameObjects.GameObject | undefined, intention: Intention): void {
  switch (intention.type) {
    case "poursuivre":
      if (cible) scene.physics.moveToObject(boss, cible, intention.vitesse);
      boss.play(intention.animation);
      return;
    case "rejoindre":
      scene.tweens.add({ targets: boss, x: intention.position.x, y: intention.position.y, duration: intention.duree });
      return;
  }
}

/** Démarre l'IA d'un boss : premier tick immédiat, puis toutes les `periode` ms. */
export function demarrerIA(boss: BossPilote, arbre: ArbreBoss, options: OptionsPilote): void {
  const tick = (): void => {
    const scene = boss.scene as SceneBoss | undefined;
    if (!scene) return; // boss détruit avec sa scène

    if (scene.room.boss[boss.sprite]?.vaincu) {
      options.surVaincu?.();
      return; // plus de décision après la défaite
    }

    if (boss.body && scene.players.getLength() > 0) {
      const plusProche = scene.physics.closest(boss, scene.players.getChildren()) as Phaser.GameObjects.GameObject & Phaser.Types.Math.Vector2Like | null;
      const perception: PerceptionBoss = {
        position: { x: boss.x, y: boss.y },
        cible: plusProche && plusProche.x !== undefined && plusProche.y !== undefined ? { position: { x: plusProche.x, y: plusProche.y } } : undefined,
      };
      for (const intention of decider(arbre, perception)) appliquer(boss, scene, plusProche ?? undefined, intention);
    }

    if (scene.time) scene.time.delayedCall(options.periode, tick);
  };
  tick();
}
