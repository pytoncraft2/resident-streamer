import { setAnimation } from "../Animations/AnimationJoueur"


export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  // console.log("CHAAARGE")
  // console.log(input)
  // console.log(input.preparationA)
  // console.log(input)
  // console.log("SHURIKEN ----------------")
  // if (huzounet.scene.groupeBoules.getLength() == 0) {
  //   setAnimation(huzounet, 'attack')
  //   huzounet.scene.room.broadcast("apparition-boule", {x: huzounet.x, y: huzounet.y, id: huzounet.ClientID})
  //   const boulePhysique = huzounet.scene.groupeBoules.create(huzounet.x, huzounet.y - 170, `atlas`, 'shuriken0')
  //   // const boulePhysique = huzounet.scene.physics.add.existing(boule)
  //   if (boulePhysique.body) {
  //     huzounet.scene.tweens.addCounter({
  //       duration: 1000,
  //       onStart: () => boulePhysique.body && boulePhysique.body.setVelocityX(huzounet.flipX ? 440 : -440),
  //       onUpdate: () => (huzounet.anims.getFrameName() == 'positiona4' && boulePhysique.body && boulePhysique.body.setVelocityX(huzounet.flipX ? -2400 : 2400)),
  //       onComplete: () => (huzounet.scene.groupeBoules.clear()),
  //       repeat: 0,
  //       yoyo: false,
  //     })
  //   }
  // }


  // if (input.directeA) {

    // if (input.directeA === true) {
    //   huzounet.setTint(0x0e88bd)
    // }
    // if (input.directeA === false) {
    //   huzounet.setTint(16777215)
    // }
  // }

    //   huzounet.scene.tweens.addCounter({
    //     from: 0,
    //     to: 10,
    //     duration: 3000,
    //     // onStart: () => boulePhysique.body && boulePhysique.body.setVelocityX(huzounet.flipX ? 440 : -440),
    //     onUpdate: () => (console.log("UPDATE")),
    //     onComplete: () => (console.log("FIN")),
    //     repeat: 0,
    //     yoyo: false,
    // })


    if (input.a.charge) {
      console.log("CHAAAARGE")
    //   setAnimation(this, 'idle_walk')
    //   objet.stop = false
    //   objet.marche = false
    //   this.setVelocityX(0);
      input.a.charge = false
    }
    if (input.a.envoie) {
      console.log("EENNNNVOIE")
    //   setAnimation(this, 'walk')
    //   this.setVelocityX(direction == 'right' ? this.vel : -this.vel);
    //   this.setFlipX(direction == 'right' ? false : true);
    //   this.setDragX(0)
    input.a.envoie = false

    }


}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
}
