/**
 * Pilote Phaser des IA de boss (ADR-003) : construit la perception, évalue l'arbre de comportement
 * (src/server/ia/) et applique les intentions produites, dans l'ordre. Reprend la boucle des anciens
 * `__auto` : une décision toutes les `periode` ms ; après une action longue (`attendreLaFin`), la
 * décision suivante attend la fin de l'action puis `periode` ms ; arrêt définitif quand le boss est vaincu.
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

/** Aptitudes d'un boss (`Aptitudes[boss.sprite]`) : fonctions appelées avec le boss et une entrée. */
export type AptitudesBoss = Readonly<Record<string, unknown>>;

export interface OptionsPilote {
  /** Intervalle entre deux décisions, en ms. */
  periode: number;
  /** Aptitudes utilisables par les intentions `aptitude`. */
  aptitudes?: AptitudesBoss;
  /** Appelé une fois quand le boss est vaincu, avant l'arrêt de l'IA. */
  surVaincu?: () => void;
}

/**
 * Applique une intention. Renvoie `true` si c'est une action longue : la décision suivante sera
 * alors programmée par `quandTermine`.
 */
function appliquer(
  boss: BossPilote,
  scene: SceneBoss,
  cible: Phaser.GameObjects.GameObject | undefined,
  intention: Intention,
  options: OptionsPilote,
  quandTermine: () => void,
): boolean {
  switch (intention.type) {
    case "poursuivre":
      if (cible) scene.physics.moveToObject(boss, cible, intention.vitesse);
      boss.play(intention.animation);
      return false;
    case "rejoindre": {
      const { animationAuDepart, attendreLaFin, ensuite, position, relatifX } = intention;
      const aLArrivee = ensuite?.length || attendreLaFin
        ? () => {
            for (const suite of ensuite ?? []) appliquer(boss, scene, cible, suite, options, () => undefined);
            if (attendreLaFin) quandTermine();
          }
        : undefined;
      scene.tweens.add({
        targets: boss,
        // Valeur relative résolue au départ du tween, comme l'ancien x: "-=40".
        x: relatifX ? `${position.x < 0 ? "-=" : "+="}${Math.abs(position.x)}` : position.x,
        y: position.y,
        duration: intention.duree,
        delay: intention.delai ?? 0,
        ease: intention.courbe,
        onStart: animationAuDepart ? () => boss.play(animationAuDepart) : undefined,
        onComplete: aLArrivee,
      });
      return attendreLaFin === true;
    }
    case "collisionTemporaire": {
      if (!cible) return false;
      const collision = scene.physics.add.collider(cible, boss);
      scene.time.delayedCall(intention.duree, () => scene.physics.world.removeCollider(collision));
      return false;
    }
    case "charger": {
      const { animationAuDepart, animationALaFin, decalageX } = intention;
      scene.tweens.add({
        targets: boss,
        // Valeur relative résolue au départ du tween, comme l'ancien x: "-=1300".
        x: `${decalageX < 0 ? "-=" : "+="}${Math.abs(decalageX)}`,
        duration: intention.duree,
        delay: intention.delai ?? 0,
        onStart: animationAuDepart ? () => boss.play(animationAuDepart, true) : undefined,
        onComplete: () => {
          boss.setVelocityX(0);
          if (animationALaFin) boss.play(animationALaFin);
          quandTermine();
        },
      });
      return true;
    }
    case "orienter":
      boss.setFlipX(intention.versLaGauche);
      return false;
    case "vitesseX":
      boss.setVelocityX(intention.valeur);
      return false;
    case "aptitude": {
      const aptitude = options.aptitudes?.[intention.nom];
      if (typeof aptitude === "function") aptitude(boss, { ...intention.entree });
      return false;
    }
    case "animation":
      boss.play(intention.nom);
      return false;
  }
}

/** Démarre l'IA d'un boss : première décision immédiate, puis selon `periode` et les actions longues. */
export function demarrerIA(boss: BossPilote, arbre: ArbreBoss, options: OptionsPilote): void {
  const programmer = (): void => {
    const scene = boss.scene as SceneBoss | undefined;
    if (scene?.time) scene.time.delayedCall(options.periode, tick);
  };

  const tick = (): void => {
    const scene = boss.scene as SceneBoss | undefined;
    if (!scene) return; // boss détruit avec sa scène

    if (scene.room.boss[boss.sprite]?.vaincu) {
      options.surVaincu?.();
      return; // plus de décision après la défaite
    }

    let actionLongue = false;
    if (boss.body && scene.players.getLength() > 0) {
      const plusProche = scene.physics.closest(boss, scene.players.getChildren()) as Phaser.GameObjects.GameObject & Phaser.Types.Math.Vector2Like | null;
      const perception: PerceptionBoss = {
        position: { x: boss.x, y: boss.y },
        cible: plusProche && plusProche.x !== undefined && plusProche.y !== undefined ? { position: { x: plusProche.x, y: plusProche.y } } : undefined,
      };
      for (const intention of decider(arbre, perception)) {
        // Une seule action longue reprogramme la décision suivante.
        const longue = appliquer(boss, scene, plusProche ?? undefined, intention, options, actionLongue ? () => undefined : programmer);
        actionLongue = actionLongue || longue;
      }
    }

    if (!actionLongue) programmer();
  };
  tick();
}
