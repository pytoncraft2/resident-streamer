import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/BouleClass"

export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  if (input.a.charge) {
    console.log('CHHHHHARRRGE')
    huzounet.boule = new BouleClass(huzounet.scene, huzounet.x, huzounet.y, "atlas", huzounet.ClientID).setData({ ClientId: huzounet.ClientID})
    huzounet.scene.groupeBoules.add(huzounet.boule)
    // huzounet.boule.setVelocityX(huzounet.flipX ? -2400 : 2400)
    input.a.charge = false
  }
  if (input.a.envoie) {
    input.a.envoie = false
  }
}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
