import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import TJoueur from "../types/Joueur";

export function shuriken(huzounet: TJoueur, input?: any) {

  if (input.a.charge) {
    huzounet.parametresDeBase.boulesEnMain.add(huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x -80, huzounet.y - 160, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID})))
    const p = huzounet.parametresDeBase.boulesEnMain.getFirstAlive();
    p.body.setAllowGravity(false);
    huzounet.scene.containerColision
    //@ts-ignore
    huzounet.animationCharge = huzounet.scene.add.tween({
      targets: p,
      scale: 2,
      duration: 1000
    })
    setAnimation(huzounet, 'huzounet_preparation_attaque')
    input.a.charge = false
  }

  if (input.a.envoie) {
    setAnimation(huzounet, 'huzounet_envoie_attaque')
    //@ts-ignore
    huzounet.animationCharge.remove()
    huzounet.parametresDeBase.boulesEnMain.getFirstAlive().setVelocityX(huzounet.flipX ? -100 : 100).setDestructionIminente((boule) => {
      console.log("DDDDDDDDDDDDDDDDDDDDDDDDDESSSSTRUCTION DE L'ID")
      boule.setAlpha(0.5)
    })

    input.a.envoie = false
  }

}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
