import { setAnimation } from "../Animations/AnimationJoueur"


export function kunai(huzounet:Phaser.Physics.Arcade.Sprite|any) {
}

export function shuriken(huzounet: Phaser.Physics.Arcade.Sprite|any) {
  let tween;
  if (huzounet.scene.groupeBoules.getLength() == 0) {
    setAnimation(huzounet, 'attack')
    huzounet.scene.room.broadcast("apparition-boule", {x: huzounet.x, y: huzounet.y, id: huzounet.ClientID})
    const boule = huzounet.scene.groupeBoules.create(huzounet.x, huzounet.y - 4, `atlas`, 'shuriken0')
    const boulePhysique = huzounet.scene.physics.add.existing(boule)
    // huzounet.scene.physics.world.enable(boulePhysique);
    // huzounet.scene.physics.add.collider(boulePhysique, huzounet.scene.enemies);
      huzounet.lancer = huzounet.scene.tweens.addCounter({
        duration: 1000,
        onUpdate: () => (huzounet.anims.getFrameName() == 'positiona4' && boulePhysique.body && boulePhysique.body.setVelocityX(huzounet.flipX ? -1900 : 1900)),
        onComplete: () => (huzounet.scene.groupeBoules.setXY(huzounet.x, huzounet.y)),
        repeat: 0,
        yoyo: false,
      })
  } else if (huzounet.scene.groupeBoules.getLength() == 1) {
    huzounet.scene.groupeBoules.setXY(huzounet.x, huzounet.y)
    huzounet.lancer.restart()
  }
}
