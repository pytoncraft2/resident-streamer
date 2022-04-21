import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import TJoueur from "../types/Joueur";

export function shuriken(huzounet: TJoueur, input?: any) {

  console.log(huzounet.parametresDeBase.boulesEnMain.countActive())
  console.log("<__________________________>")
  console.log(huzounet.parametresDeBase.boulesEnMain.getLength())
  // huzounet.parametresDeBase.boulesEnMain.getChildren().forEach((element: BouleClass) => {
  //   // console.log(element.proprietaire)
  // });
  if (input.a.charge && !input.up && !input.down && !input.z && !input.e && !input.r && !input.a.envoie && !input.saut) {
    // console.log(huzounet.parametresDeBase.boulesEnMain.getLength())
    huzounet.parametresDeBase.boulesEnMain.add(huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x -80, huzounet.y - 160, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID})))
    // console.log("FIIIIRST")
    const p = huzounet.parametresDeBase.boulesEnMain.getFirstAlive(true);
    p.body.setAllowGravity(false);
    //@ts-ignore
    huzounet.animationCharge = huzounet.scene.add.tween({
      targets: p,
      scale: 2,
      duration: 2000
    })
    // huzounet.parametresDeBase.boulesEnMain.getFirst().setPosition(huzounet.x, huzounet.y).setVelocity(0, 0)
    // console.log(huzounet.parametresDeBase.boulesEnMain.getLength())
    // huzounet.scene.groupeBoules.add(huzounet.boule)

    setAnimation(huzounet, 'huzounet_preparation_attaque')

    input.a.charge = false
  }

  // console.log(huzounet.parametresDeBase.boulesEnMain.getLength());
  if (input.a.envoie && !input.a.charge && !input.up && !input.down && !input.z && !input.e && !input.r && !input.saut) {
    // console.log(input)

    // huzounet.boule.stopAnim()

    setAnimation(huzounet, 'huzounet_envoie_attaque')
    // console.log("JJJJJJJJJJJJOUEE ??????????????????")
    //@ts-ignore
    // if (huzounet.animationCharge.isPlaying()) {
      //@ts-ignore
      // huzounet.animationCharge.stop()

      huzounet.parametresDeBase.boulesEnMain.getFirstAlive(true).setVelocityX(huzounet.flipX ? -2400 : 2400).setDestructionIminente()
    // }
    // const l = huzounet.parametresDeBase.boulesEnMain.getLength();
    // (huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass).setAlpha(0.5);
    // (huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass).lancer(Cl);
    // if (huzounet.parametresDeBase.boulesEnMain.contains((huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass))) {
    //   (huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass).lancer(huzounet);
    //   // huzounet.scene.tweens.add({
    //   //   targets: (huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass),
    //   //   alpha: 1,
    //   //   scale: 1,
    //   //   duration: 1000,
    //   //   // onUpdate:() => huzounet.physics.moveTo((huzounet.parametresDeBase.boulesEnMain.getChildren()[l - 1] as BouleClass), huzounet.x, huzounet.y,60)
    //   // })
    //
    // }


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
