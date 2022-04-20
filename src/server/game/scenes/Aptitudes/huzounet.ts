import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import TJoueur from "../types/Joueur";

// interface BaseEquipement {
//     boulesEnMain: Phaser.Physics.Arcade.Group;
// }
//
// declare interface TJoueur extends Phaser.GameObjects.Sprite
// {
// 	next(): void
// 	parametresDeBase: BaseEquipement
// 	ClientID: string
// 	vie: number,
// 	displayWidth: number,
// 	displayHeight: number,
// 	masse: number,
// 	puissanceDeBase: number,
// 	boulesEnMain: Phaser.Physics.Arcade.Group
// }

export function shuriken(huzounet: TJoueur, input?: any) {
  // console.log(huzounet.scene.groupeBoules.getLength())
  if (input.a.charge) {

    console.log(huzounet.parametresDeBase.boulesEnMain.getLength())
    huzounet.parametresDeBase.boulesEnMain.add(huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x, huzounet.y, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID})))
    console.log(huzounet.parametresDeBase.boulesEnMain.getLength())
    // huzounet.scene.groupeBoules.add(huzounet.boule)

    setAnimation(huzounet, 'huzounet_preparation_attaque')

    input.a.charge = false
  }

  if (input.a.envoie) {

    // huzounet.boule.stopAnim()

    setAnimation(huzounet, 'huzounet_envoie_attaque')
    console.log(huzounet.parametresDeBase.boulesEnMain.getLength());
    (huzounet.parametresDeBase.boulesEnMain.getChildren()[0] as Phaser.Physics.Arcade.Sprite).setAlpha(0.5)
    // huzounet.boule.body.setVelocityX(huzounet.flipX ? -2400 : 2400)


    // console.log(huzounet.boule[0])
    // if (!huzounet.boule.body) {
      // var tweens = huzounet.tweens.getTweensOf(huzounet.boule);
      // console.log("RIEN -----------------------")
      // console.log(tweens)
    // }
    /*
    huzounet.boule.stopAnim()

    setAnimation(huzounet, 'huzounet_envoie_attaque')
    huzounet.boule.body.setVelocityX(huzounet.flipX ? -2400 : 2400)
    */

    input.a.envoie = false
  }
}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
