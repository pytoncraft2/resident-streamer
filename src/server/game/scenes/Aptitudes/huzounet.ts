import { setAnimation } from "../Animations/AnimationJoueur"


export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  // console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCHARFEG ?")
  // console.log(huzounet.animationEnvoie && huzounet.animationCharge.isPlaying())
  if (input.a.charge) {
  // if (!huzounet.parametresDeBase.animationCharge.isPlaying()) {
  //   huzounet.parametresDeBase.animationCharge.play()
  // }
      // console.log(huzounet.parametresDeBase.boulePhysique.groupeBoules.getLength())
    if (huzounet.parametresDeBase.boulePhysique.groupeBoules.getLength() == 0) {
      huzounet.scene.room.broadcast("apparition-boule", {x: huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100 , y:  huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170, id: huzounet.ClientID})
      huzounet.boulePhysique = huzounet.parametresDeBase.boulePhysique.creation(huzounet)
      // console.log("___________")
      // console.log(huzounet.boulePhysique)
      // huzounet.boulePhysique.retourPositionPrincipale = () => {
      //   huzounet.boulePhysique.setPosition(huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100, huzounet.y - 170, huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170)
      //   // huzounet.boulePhysique.setScale(0)
      //   // huzounet.boulePhysique.setAlpha(0.1)
      //   huzounet.boulePhysique.setVelocity(0)
      //   huzounet.scene.colisionShurikenEnnemie.active = false
      // console.log(huzounet.parametresDeBase.boulePhysique.groupeBoules.getLength())
      // }
    } else {
      huzounet.boulePhysique.setVelocity(0)
      huzounet.boulePhysique.setPosition(huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100, huzounet.y - 170, huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170)
        // huzounet.boulePhysique.setAlpha(0.8)
      // huzounet.boulePhysique.setScale(0.5)
    }
    setAnimation(huzounet, 'huzounet_preparation_attaque')

    // huzounet.parametresDeBase.boulePhysique.animationCharge.play()
    huzounet.parametresDeBase.boulePhysique.animationCharge(huzounet).play()

    input.a.charge = false
  }
  if (input.a.envoie) {
    huzounet.scene.colisionShurikenEnnemie.active = true
    setAnimation(huzounet, 'huzounet_envoie_attaque')
    // console.log(huzounet.parametresDeBase.boulePhysique.animationCharge(huzounet))
    // console.log("EEEEEEEEEEEEEEEEEEEEEEEENVOIE")
    const puissance = huzounet.parametresDeBase.boulePhysique.animationCharge(huzounet).progress
    huzounet.parametresDeBase.boulePhysique.animationCharge(huzounet).stop()
    huzounet.boulePhysique.body && huzounet.boulePhysique.body.setVelocityX(huzounet.flipX ? -2400 : 2400)
    huzounet.boulePhysique.setData({puissance: puissance})
    // console.log(puissance)
    huzounet.parametresDeBase.boulePhysique.animationEnvoie(huzounet).play()
    input.a.envoie = false
  }
}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
