import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/BouleClass"

export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  if (input.a.charge) {
    console.log('CHHHHHARRRGE')
    huzounet.boule = new BouleClass(huzounet.scene, huzounet.x, huzounet.y, "atlas",  `boule-${huzounet.scene.groupeBoules.getLength()}`).setData({ ClientId: huzounet.ClientID})
    huzounet.scene.groupeBoules.add(huzounet.boule)
    // console.log(huzounet.scene.groupeBoules.getLength())
    // huzounet.boule.setVelocityX(huzounet.flipX ? -2400 : 2400)
    huzounet.animationCharge = huzounet.scene.tweens.add({
      targets: huzounet.boule,
      scale: 2,
      duration: 3000
    });
    input.a.charge = false
  }
  if (input.a.envoie) {
    input.a.envoie = false
  }
    console.log(huzounet.boule.progress)
  input.a = undefined
  console.log("BOOOUCLE")
}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
