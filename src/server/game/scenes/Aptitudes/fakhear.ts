export function cross(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.setVelocityX(0)
  fakhear.play('cross')
  fakhear.vie -= 1
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
    from: 0,
    to: 1,
    duration: 300,
    onUpdate: () => (fakhear.setVelocity((fakhear.flipX ? -1700 : 1700), -70)),
    onComplete: () => (fakhear.setVelocityX(0), fakhear.play('idle_attack'), fakhear.body.checkCollision.none = false),
    repeat: 0,            // -1: infinity
    yoyo: false,
  })
}

export function saut(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  if (fakhear.compteurSaut < 1 || fakhear.body.touching.down) {
    fakhear.play('jump')
    fakhear.setVelocityY(-1400);
    fakhear.compteurSaut++
    if (fakhear.body.touching.down) {
      fakhear.compteurSaut = 0
    }
  }
}

export function interaction(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.interaction_objet = true
}
