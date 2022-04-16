export function kunai(huzounet:Phaser.Physics.Arcade.Sprite|any) {
}

export function shuriken(huzounet) {
  // huzounet.play('huzounet_shuriken')
  huzounet.play('attack')
  var coefDir = -1;
  // console.log(huzounet.etatInitial.groupeBoules)
// if (huzounet['direction'] == 'left') { coefDir = -1; } else { coefDir = 1 }
// // on crée la balle a coté du joueur
// huzounet.scene.spawnBoule()
const boule = huzounet.etatInitial.groupeBoules.create(huzounet.x, huzounet.y - 4, `atlas`, 'shuriken0');
huzounet.scene.room.broadcast("deplacement-boule", {x: huzounet.x, y: huzounet.y, id: huzounet.ClientID})
// this.room.broadcast("boss-KO", `${id}`);


// huzounet.etatInitial.groupeBoules.playAnimation(`huzounet_shuriken`);
console.log("SHURIKEN")
const bb = huzounet.scene.physics.add.existing(boule)
huzounet.scene.physics.world.enable(boule);

bb.body.setVelocityX(1900)

huzounet.scene.tweens.add({
  targets: bb,
  velocityX: 400,
  duration: 5000,
  onUpdate: () => {
    huzounet.scene.room.broadcast("deplacement-boule", {x: boule.x, y: boule.y, id: huzounet.ClientID})
  },
  onComplete: () => (huzounet.setVelocityX(0)),
  repeat: 0,            // -1: infinity
  yoyo: false,
})


// console.log(boule.body)
// console.log(boule.id)
// console.log(boule.body.id)
// boule.setBounce(0.2).setCollideWorldBounds(true)
// boule.setPushable(false)

// var bullet = this.groupeBullets.create(huzounet.x + coefDir, huzounet.y - 4, 'bullet').setScale(0.2);
// // parametres physiques de la balle.
// huzounet.etatInitial.groupeBoules.setCollideWorldBounds(true);
// huzounet.etatInitial.groupeBoules.body.allowGravity = false;
// bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
}
