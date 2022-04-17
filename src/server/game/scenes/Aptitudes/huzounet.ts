import { setAnimation } from "../Animations/AnimationJoueur"


export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  // console.log("CHAAARGE")
  // console.log(input)
  // console.log(input.preparationA)
  // console.log(input)
  // console.log("SHURIKEN ----------------")


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








    // if (huzounet.scene.groupeBoules.getLength() == 0) {
    //   setAnimation(huzounet, 'huzounet_preparation_attaque')
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

















    if (input.a.charge) {
    if (huzounet.scene.groupeBoules.getLength() == 0) {
      huzounet.scene.room.broadcast("apparition-boule", {x: huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100 , y:  huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170, id: huzounet.ClientID})
      huzounet.boulePhysique = huzounet.scene.groupeBoules.create(huzounet.x - 100, huzounet.y - 170, `atlas`, 'shuriken0')
      huzounet.boulePhysique.retourPositionPrincipale = () => {
      huzounet.boulePhysique.setPosition(huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100, huzounet.y - 170, huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170)
      huzounet.boulePhysique.setScale(0)
      huzounet.boulePhysique.setVelocity(0)
      huzounet.body.checkCollision.none = false
      }
    } else {
      huzounet.boulePhysique.setVelocity(0)
      huzounet.boulePhysique.setPosition(huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100, huzounet.y - 170, huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170)
      huzounet.boulePhysique.setScale(1)
    }
      setAnimation(huzounet, 'huzounet_preparation_attaque')

      huzounet.animationCharge = huzounet.scene.tweens.add({
        targets: huzounet.boulePhysique,
        scale: '+=2',
        duration: 3000
      });

      input.a.charge = false
    }
    if (input.a.envoie) {
      setAnimation(huzounet, 'huzounet_envoie_attaque')
      const puissance = huzounet.animationCharge.progress
      huzounet.animationCharge.remove()
      huzounet.boulePhysique.body && huzounet.boulePhysique.body.setVelocityX(huzounet.flipX ? -2400 : 2400)
      huzounet.boulePhysique.setData({puissance: puissance})
      input.a.envoie = false
  }


}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
}
