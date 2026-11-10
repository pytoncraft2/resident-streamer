import { AnimationPersonnage } from "../Aptitudes/definition";

/**
 * Crée sur un sprite ses animations (communes + propres à son personnage, voir `Aptitudes/base.ts`),
 * à partir des images de l'atlas serveur `atlas`.
 */
export function AnimationJoueur(anim: Phaser.Animations.AnimationState, animations: readonly AnimationPersonnage[]) {
  for (const animation of animations) {
    const { images, prefixe } = animation
    anim.create({
      key: animation.cle,
      frames: anim.generateFrameNames('atlas', "debut" in images
        ? { prefix: prefixe, start: images.debut, end: images.fin }
        : { prefix: prefixe, frames: [...images] }),
      frameRate: animation.frameRate,
      ...(animation.repeat !== undefined ? { repeat: animation.repeat } : {}),
      ...(animation.yoyo ? { yoyo: true } : {}),
    });
  }
}

export function AnimationBombe(anim: Phaser.Animations.AnimationState){
  anim.create({
    key: 'akhizonah_bombe',
    frames: anim.generateFrameNames('atlas', { prefix: 'bombe', start: 0, end: 8 }),
    frameRate: 13,
    repeat: 0,
    delay: 1500
  });
}

export function AnimationGrenouille(anim: Phaser.Animations.AnimationState) {
  anim.create({
    key: 'grenouille_tire',
    frames: anim.generateFrameNames('atlas', { prefix: 'frog', start: 0, end: 4 }),
    frameRate: 13,
    yoyo: true,
    repeat: 0
  });
}

export function AnimationOie(anim: Phaser.Animations.AnimationState) {
  anim.create({
    key: 'oie_tire',
    frames: anim.generateFrameNames('atlas', { prefix: 'attack', start: 0, end: 13 }),
    frameRate: 20,
    repeat: -1
  });
}


export const setAnimation = (sprite: Phaser.GameObjects.Sprite, animation: string = 'idle') => {
  if (!sprite.anims.isPlaying) sprite.play(animation)
  else if (sprite.anims.isPlaying && sprite.anims.getName() !== animation) sprite.play(animation)
}
