import { setAnimation } from "../Animations/AnimationJoueur"


export function kunai(huzounet:Phaser.Physics.Arcade.Sprite|any) {
}

export function shuriken(huzounet: Phaser.Physics.Arcade.Sprite|any) {
  if (huzounet.scene.groupeBoules.getLength() == 0) {
    setAnimation(huzounet, 'attack')
    huzounet.scene.room.broadcast("apparition-boule", {x: huzounet.x, y: huzounet.y, id: huzounet.ClientID})
    const boulePhysique = huzounet.scene.groupeBoules.create(huzounet.x, huzounet.y - 170, `atlas`, 'shuriken0')
    // const boulePhysique = huzounet.scene.physics.add.existing(boule)
    if (boulePhysique.body) {
      huzounet.scene.tweens.addCounter({
        duration: 1000,
        onStart: () => boulePhysique.body && boulePhysique.body.setVelocityX(huzounet.flipX ? 440 : -440),
        onUpdate: () => (huzounet.anims.getFrameName() == 'positiona4' && boulePhysique.body && boulePhysique.body.setVelocityX(huzounet.flipX ? -2400 : 2400)),
        onComplete: () => (huzounet.scene.groupeBoules.clear()),
        repeat: 0,
        yoyo: false,
      })
    }
  }
}
