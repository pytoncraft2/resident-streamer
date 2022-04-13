export function cross(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.vie -=1
}

export function kick(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.play('attack')
  fakhear.setVelocityX(0);
}

export function dash() {

}

export function interaction() {

}
