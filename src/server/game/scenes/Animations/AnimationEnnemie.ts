export function AnimationEnnemie(anim: Phaser.Animations.AnimationState) {
  anim.create({
    key: "deplacement",
    frames: anim.generateFrameNames('atlas', { prefix: 'movechaiseboss', start: 0, end: 1 }),
    frameRate: 6,
    repeat: 1
  })

  anim.create({
    key: "attaque",
    frames: anim.generateFrameNames('atlas', { prefix: 'attackchaiseboss', start: 0, end: 1 }),
    frameRate: 5,
    repeat: 0
  })

}
