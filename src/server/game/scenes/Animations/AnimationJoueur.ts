export function AnimationJoueur(anim: Phaser.Animations.AnimationState){
  anim.create({
    key: 'attack',
    frames: anim.generateFrameNames('atlas', { prefix: 'positiona', start: 0, end: 5 }),
    frameRate: 12,
    repeat: 0
  });
  anim.create({
    key: 'huzounet_preparation_attaque',
    frames: anim.generateFrameNames('atlas', { prefix: 'positiona', start: 0, end: 1 }),
    frameRate: 36,
    repeat: 0
  });
  anim.create({
    key: 'huzounet_envoie_attaque',
    frames: anim.generateFrameNames('atlas', { prefix: 'positiona', start: 1, end: 5 }),
    frameRate: 12,
    repeat: 0
  });
  anim.create({
    key: 'osmo_saut',
    frames: anim.generateFrameNames('atlas', { prefix: 'osmo_saut', start: 1, end: 2 }),
    frameRate: 1,
    repeat: 0
  });
  anim.create({
    key: 'osmo_soin',
    frames: anim.generateFrameNames('atlas', { prefix: 'osmo_soin', start: 0, end: 3 }),
    frameRate: 10,
    repeat: 0
  });
  anim.create({
    key: 'osmo_attaque',
    frames: anim.generateFrameNames('atlas', { prefix: 'osmo_attaque', start: 0, end: 3 }),
    frameRate: 10,
    repeat: 0
  });
  anim.create({
    key: 'huzounet_kunai_attaque',
    frames: anim.generateFrameNames('atlas', { prefix: 'attaque_kunai', start: 0, end: 3 }),
    frameRate: 5,
    repeat: 0
  });
  anim.create({
    key: 'akhizonah_couteau',
    frames: anim.generateFrameNames('atlas', { prefix: 'knife', start: 0, end: 3 }),
    frameRate: 8,
    repeat: 0
  });

  // anim.create({
  //   key: 'huzounet_kunai',
  //   frames: anim.generateFrameNames('atlas', { prefix: 'kunai', start: 0, end: 2 }),
  //   frameRate: 12,
  //   repeat: 0
  // });

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
    repeat: 0
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
    frameRate: 15,
    repeat: 0
  })

  anim.create({
    key: "cross",
    frames: anim.generateFrameNames('atlas', { prefix: 'cross', start: 0, end: 5 }),
    frameRate: 23,
    repeat: 0
  })

  anim.create({
    key: "huzounet_shuriken",
    frames: anim.generateFrameNames('atlas', { prefix: 'shuriken', start: 0, end: 3 }),
    frameRate: 23,
    repeat: -1
  })


//manette
anim.create({
  key: "manette_punch",
  frames: anim.generateFrameNames('atlas', { prefix: 'manettepunch', start: 0, end: 1 }),
  frameRate: 23,
  repeat: 0
})

anim.create({
  key: "manette_vole",
  frames: anim.generateFrameNames('atlas', { prefix: 'manettevole', start: 0, end: 0 }),
  frameRate: 4,
  repeat: 0
})

anim.create({
  key: "manette_lance",
  frames: anim.generateFrameNames('atlas', { prefix: 'manettelance', start: 0, end: 3 }),
  frameRate: 10,
  repeat: 0
})


//twitchman
anim.create({
  key: "twitchman_vole",
  frames: anim.generateFrameNames('atlas', { prefix: 'twitchmanfly', start: 0, end: 4 }),
  frameRate: 10,
  repeat: 0
})

anim.create({
  key: "twitchman_punch",
  frames: anim.generateFrameNames('atlas', { prefix: 'twitchmanpunch', start: 0, end: 1 }),
  frameRate: 8,
  repeat: 0
})

anim.create({
  key: "twitchman_charge",
  frames: anim.generateFrameNames('atlas', { prefix: 'twitchmancharge', start: 0, end: 0 }),
  frameRate: 1,
  repeat: 0
})






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

export const setAnimation = (sprite: Phaser.GameObjects.Sprite, animation: string = 'idle') => {
  if (!sprite.anims.isPlaying) sprite.play(animation)
  else if (sprite.anims.isPlaying && sprite.anims.getName() !== animation) sprite.play(animation)
}
