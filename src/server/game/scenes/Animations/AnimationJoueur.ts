export function AnimationJoueur(anim: any){
  anim.create({
    key: 'attack',
    frames: anim.generateFrameNames('atlas', { prefix: 'positiona', start: 0, end: 5 }),
    frameRate: 12,
    repeat: 0
  });
  anim.create({
    key: "goback",
    frames: anim.generateFrameNames('atlas', { prefix: 'dos', start: 0, end: 6 }),
    frameRate: 7,
    repeat: 0
  });

  anim.create({
    key: "front",
    frames: anim.generateFrameNames('atlas', { prefix: 'face', start: 0, end: 5 }),
    frameRate: 6,
    repeat: 0
  });
  anim.create({
    key: "walk",
    frames: anim.generateFrameNames('atlas', { prefix: 'marche', start: 1, end: 7 }),
    frameRate: 5,
    repeat: -1
  });
  anim.create({
    key: "jump",
    frames: anim.generateFrameNames('atlas', { prefix: 'jump', start: 0, end: 6 }),
    frameRate: 12,
    repeat: 0
  });

  anim.create({
    key: "idle_walk",
    frames: anim.generateFrameNames('atlas', { prefix: 'marche', start: 0, end: 0 }),
    frameRate: 1,
    repeat: -1
  });

  anim.create({
    key: "idle_attack",
    frames: anim.generateFrameNames('atlas', { prefix: 'positiona', start: 0, end: 0 }),
    frameRate: 1,
    repeat: 0
  });

  anim.create({
    key: "saut",
    frames: anim.generateFrameNames('atlas', { prefix: 'jumpface', start: 0, end: 5 }),
    frameRate: 7,
    repeat: 0
  })

  anim.create({
    key: "sautPreparation",
    frames: anim.generateFrameNames('atlas', { prefix: 'jumpface', start: 5, end: 5 }),
    frameRate: 1,
    repeat: 0
  })

  anim.create({
    key: "straightlead",
    frames: anim.generateFrameNames('atlas', { prefix: 'straightlead', start: 0, end: 3 }),
    frameRate: 8,
    repeat: 0
  })

  anim.create({
    key: "cross",
    frames: anim.generateFrameNames('atlas', { prefix: 'cross', start: 0, end: 5 }),
    frameRate: 23,
    repeat: 0
  })

}

export const setAnimation = (sprite: Phaser.GameObjects.Sprite, animation: string = 'idle') => {
  if (!sprite.anims.isPlaying) sprite.play(animation)
  else if (sprite.anims.isPlaying && sprite.anims.getName() !== animation) sprite.play(animation)
}
