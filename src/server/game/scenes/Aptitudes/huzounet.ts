import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/BouleClass"

export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  console.log(huzounet.scene.groupeBoules.getLength())
  if (input.a.charge) {
    huzounet.boule = huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x, huzounet.y, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID}))
    // console.log(huzounet.boule.test())
    huzounet.scene.groupeBoules.add(huzounet.boule)
    huzounet.animationCharge = huzounet.scene.tweens.add({
      targets: huzounet.boule,
      scale: 2,
      duration: 3000
    });
    setAnimation(huzounet, 'huzounet_preparation_attaque')

    input.a.charge = false
  }

  if (input.a.envoie) {
    huzounet.animationCharge.stop()
    huzounet.boule.setData({puissance: huzounet.animationCharge.progress})

    setAnimation(huzounet, 'huzounet_envoie_attaque')
    huzounet.boule.body.setVelocityX(huzounet.flipX ? -2400 : 2400)

    huzounet.animation = huzounet.scene.tweens.timeline({
      tweens: [
        {
          targets: huzounet.boule,
          alpha: 0.8,
          duration: 3000,
          ease: 'Power1',
        },
        {
          targets: huzounet.boule,
          alpha: 0.2,
          duration: 1000,
          onComplete: function() {
            arguments[1][0].destroy(true);
            huzounet.scene.room.state.boules.delete(arguments[1][0].id);
          }
        }
    ],

  })
    input.a.envoie = false
  }

  // function stopAnimation(huzounet) {
  // huzounet.anima
  // }
}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
