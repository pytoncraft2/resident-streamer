export function kunai(huzounet:Phaser.Physics.Arcade.Sprite|any) {
  huzounet.play('attack')
}

export function shuriken(huzounet) {
  // huzounet.play('huzounet_shuriken')
  var coefDir = -1;
  // console.log(huzounet.etatInitial.groupeBoules)
// if (huzounet['direction'] == 'left') { coefDir = -1; } else { coefDir = 1 }
// // on crée la balle a coté du joueur
// huzounet.scene.spawnBoule()
huzounet.etatInitial.groupeBoules.create(huzounet.x, huzounet.y - 4, `atlas`, 'shuriken0');
huzounet.scene.room.broadcast("deplacement-boule", {x: huzounet.x, y: huzounet.y, id: huzounet.ClientID})
// this.room.broadcast("boss-KO", `${id}`);


// huzounet.etatInitial.groupeBoules.playAnimation(`huzounet_shuriken`);
console.log("SHURIKEN")

// var bullet = this.groupeBullets.create(huzounet.x + coefDir, huzounet.y - 4, 'bullet').setScale(0.2);
// // parametres physiques de la balle.
// huzounet.etatInitial.groupeBoules.setCollideWorldBounds(true);
// huzounet.etatInitial.groupeBoules.body.allowGravity = false;
// bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
}
