import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/BouleClass"

export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  if (input.a.charge) {
    huzounet.boule = new BouleClass(huzounet.scene, huzounet.x, huzounet.y, "atlas",  `boule-${huzounet.scene.groupeBoules.getLength()}`).setData({ ClientId: huzounet.ClientID})
    huzounet.scene.groupeBoules.add(huzounet.boule)
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
}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
