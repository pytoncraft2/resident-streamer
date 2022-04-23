import { setAnimation } from "../Animations/AnimationJoueur"

export function cross(fakhear: Phaser.Physics.Arcade.Sprite|any, input) {
  if (input.a) {
    input.a = false
    fakhear.setVelocityX(0)
    setAnimation(fakhear, 'cross')
  }
}

export function kick(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.play('attack')
  fakhear.setVelocityX(0);
}

export function dash(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.play('straightlead')
  fakhear.setVelocityX(0);
  fakhear.body.checkCollision.none = true;

  fakhear.scene.tweens.addCounter({
    duration: 300,
    onUpdate: () => (fakhear.setVelocity((fakhear.flipX ? -1700 : 1700), -70)),
    onComplete: () => (fakhear.setVelocityX(0), fakhear.play('idle_attack'), fakhear.body.checkCollision.none = false),
    repeat: 0,            // -1: infinity
    yoyo: false,
  })
}

export function interaction(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.interaction_objet = true
  fakhear.scene.tweens.addCounter({
    duration: 1,
    onComplete: () => (fakhear.interaction_objet = false)
  })
  // fakhear.interaction_objet = false
}
