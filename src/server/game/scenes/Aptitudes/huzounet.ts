import { setAnimation } from "../Animations/AnimationJoueur"


export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  if (input.a.charge) {
    if (huzounet.scene.groupeBoules.getLength() == 0) {
      huzounet.scene.room.broadcast("apparition-boule", {x: huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100 , y:  huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170, id: huzounet.ClientID})
      huzounet.boulePhysique = huzounet.scene.groupeBoules.create(huzounet.x - 100, huzounet.y - 170, `atlas`, 'shuriken0')
      huzounet.boulePhysique.retourPositionPrincipale = () => {
        huzounet.boulePhysique.setPosition(huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100, huzounet.y - 170, huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170)
        // huzounet.boulePhysique.setScale(0)
        huzounet.boulePhysique.setAlpha(0.1)
        huzounet.boulePhysique.setVelocity(0)
        huzounet.scene.colisionShurikenEnnemie.active = false
      }
    } else {
      huzounet.boulePhysique.setVelocity(0)
      huzounet.boulePhysique.setPosition(huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100, huzounet.y - 170, huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170)
        huzounet.boulePhysique.setAlpha(0.8)
      // huzounet.boulePhysique.setScale(0.5)
    }
    setAnimation(huzounet, 'huzounet_preparation_attaque')

    huzounet.animationCharge = huzounet.scene.tweens.add({
      targets: huzounet.boulePhysique,
      scale: 2,
      onUpdate: () => huzounet.boulePhysique.setPosition(huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100, huzounet.y - 170, huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170),
      duration: 3000
    });

    input.a.charge = false
  }
  if (input.a.envoie) {
    huzounet.scene.colisionShurikenEnnemie.active = true
    setAnimation(huzounet, 'huzounet_envoie_attaque')
    const puissance = huzounet.animationCharge.progress
    huzounet.animationCharge.remove()
    huzounet.boulePhysique.body && huzounet.boulePhysique.body.setVelocityX(huzounet.flipX ? -2400 : 2400)
    huzounet.boulePhysique.setData({puissance: puissance})
    huzounet.scene.tweens.addCounter({
      duration: 1000,
      onComplete: () => (huzounet.boulePhysique.retourPositionPrincipale()),
    })
    input.a.envoie = false
  }
}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
