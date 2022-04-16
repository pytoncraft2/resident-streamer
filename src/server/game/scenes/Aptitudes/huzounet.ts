export function kunai(huzounet:Phaser.Physics.Arcade.Sprite|any) {
}

export function shuriken(huzounet) {
  huzounet.play('attack')
  var coefDir = -1;

  huzounet.scene.room.broadcast("apparition-boule", {x: huzounet.x, y: huzounet.y, id: huzounet.ClientID})
  const boule = huzounet.scene.groupeBoules.create(huzounet.x, huzounet.y - 4, `atlas`, 'shuriken0')
  const boulePhysique = huzounet.scene.physics.add.existing(boule)
  huzounet.scene.physics.world.enable(boulePhysique);
  // huzounet.scene.physics.add.collider(boulePhysique, huzounet.scene.enemies);
  console.log(huzounet.TweenLancer)
  if (!huzounet.TweenLancer) {
    boulePhysique.body.setVelocityX(huzounet.flipX ? -1900 : 1900)
    huzounet.TweenLancer = huzounet.scene.tweens.addCounter({
      duration: 1000,
      // onComplete: () => huzounet.scene.groupeBoules.getChildren()[0].destroy(),
      repeat: 0,            // -1: infinity
      yoyo: false,
    })
  }

  if (!huzounet.TweenLancer.isPlaying()) {

    huzounet.TweenLancer.play();
    boulePhysique.body.setVelocityX(huzounet.flipX ? -1900 : 1900)
    console.log("C REPARTI")
  } else {
    console.log("JOUE DEJA")
  }
}
