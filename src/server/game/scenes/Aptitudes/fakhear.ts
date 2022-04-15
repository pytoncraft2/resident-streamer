export function cross(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.setVelocityX(0)
  fakhear.play('cross')
  fakhear.vie -= 1
  fakhear.blesse_opposant = true
}

export function kick(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.play('attack')
  fakhear.setVelocityX(0);
  fakhear.blesse_opposant = true
}

export function dash(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.play('straightlead')
  fakhear.setVelocityX(0);
  fakhear.scene.tweens.addCounter({
    from: 0,
    to: 1,
    duration: 300,
    onUpdate: () => (fakhear.setVelocity((fakhear.flipX ? -1700 : 1700), -70)),
    onComplete: () => (fakhear.setVelocityX(0), fakhear.play('idle_attack')),
    repeat: 0,            // -1: infinity
    yoyo: false,
  })
}

export function interaction() {

}
