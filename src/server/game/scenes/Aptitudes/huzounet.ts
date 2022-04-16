export function kunai(huzounet:Phaser.Physics.Arcade.Sprite|any) {
  huzounet.play('attack')
}

export function shuriken(huzounet) {
  huzounet.play('huzounet_shuriken')
  var coefDir;
// if (huzounet['direction'] == 'left') { coefDir = -1; } else { coefDir = 1 }
// // on crée la balle a coté du joueur
// var bullet = this.groupeBullets.create(huzounet.x + coefDir, huzounet.y - 4, 'bullet').setScale(0.2);
// // parametres physiques de la balle.
// bullet.setCollideWorldBounds(true);
// bullet.body.allowGravity = false;
// bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
}
