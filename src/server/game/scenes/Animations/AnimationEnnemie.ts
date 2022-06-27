export function AnimationEnnemie(anim: Phaser.Animations.AnimationState) {
  anim.create({
    key: "deplacement",
    frames: anim.generateFrameNames('atlas', { prefix: 'marche', start: 0, end: 1 }),
    frameRate: 1,
    repeat: 1
  })

  anim.create({
    key: "attaque",
    frames: anim.generateFrameNames('atlas', { prefix: 'attackchaiseboss', start: 0, end: 1 }),
    frameRate: 12,
    yoyo: true,
    repeat: 0
  })

}
