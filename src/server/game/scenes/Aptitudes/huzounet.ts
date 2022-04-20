import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import TJoueur from "../types/Joueur";

export function shuriken(huzounet: TJoueur, input?: any) {
  if (input.a.charge && !input.up && !input.down && !input.z && !input.e && !input.r && !input.a.envoie && !input.saut) {
    console.log(huzounet.parametresDeBase.boulesEnMain.getLength())
    huzounet.parametresDeBase.boulesEnMain.add(huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x, huzounet.y, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID})))
    console.log(huzounet.parametresDeBase.boulesEnMain.getLength())
    // huzounet.scene.groupeBoules.add(huzounet.boule)

    setAnimation(huzounet, 'huzounet_preparation_attaque')

    input.a.charge = false
  }

  console.log(huzounet.parametresDeBase.boulesEnMain.getLength());
  if (input.a.envoie && !input.a.charge && !input.up && !input.down && !input.z && !input.e && !input.r && !input.saut) {
    console.log(input)

    // huzounet.boule.stopAnim()

    setAnimation(huzounet, 'huzounet_envoie_attaque')
    const l = huzounet.parametresDeBase.boulesEnMain.getLength();
    // (huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass).setAlpha(0.5);
    (huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass).lancer();
    // (huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass).setVelocityX(huzounet.flipX ? -2400 : 2400).lancer();


    // console.log(huzounet.boule[0])
    // if (!huzounet.boule.body) {
      // var tweens = huzounet.parametresDeBase.boulesEnMain.getChildren()[0];
      // getTweensOf(tweens)
      // console.log(huzounet.scene.tweens.getTweensOf(tweens));

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
