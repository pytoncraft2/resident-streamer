import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/BouleClass"

export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  console.log(huzounet.scene.groupeBoules.getLength())
  if (input.a.charge) {
    huzounet.boule = huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x, huzounet.y, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID}))
    huzounet.scene.groupeBoules.add(huzounet.boule)

    // if (!huzounet.animationCharge) {
    //   huzounet.animationCharge = huzounet.scene.tweens.add({
    //     targets: huzounet.boule,
    //     scale: 2,
    //     duration: 3000,
    //     paused: true
    //   });
    // }
    //
    // if (huzounet.animationCharge.isPaused()) {
    //   huzounet.animationCharge.play()
    // }
    setAnimation(huzounet, 'huzounet_preparation_attaque')

    input.a.charge = false
  }

  if (input.a.envoie) {

    huzounet.boule.stopAnim()
    // huzounet.animationCharge.stop()

    // huzounet.boule.setData({puissance: huzounet.animationCharge.progress})

    if (huzounet.boule.body) {
      setAnimation(huzounet, 'huzounet_envoie_attaque')
      huzounet.boule.body.setVelocityX(huzounet.flipX ? -2400 : 2400)
      
    }

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
