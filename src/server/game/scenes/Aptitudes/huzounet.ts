import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import { Boule } from "../../RoomState"

import TJoueur from "../types/Joueur";

export function shuriken(huzounet: TJoueur, input?: any) {

  if (input.a) {
    console.log(huzounet.parametresDeBase.boulesEnMain.getLength())
    //creation de la boule si non créer
    if (!huzounet.parametresDeBase.boulesEnMain.getLength())
    {
      console.log("CREATION BOULE")
      const boule = huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x -80, huzounet.y - 160, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID, puissance: 2}))
      huzounet.parametresDeBase.boulesEnMain.add(boule);
      (boule.body as any).setAllowGravity(false);


    //grossisement de la boule
    } else 
    {
      console.log("GROSSISEMENT");
      (huzounet.parametresDeBase.boulesEnMain.getChildren()[0] as BouleClass).scale += 0.01;
      (huzounet.parametresDeBase.boulesEnMain.getChildren()[0] as BouleClass).alpha += 0.01;
    }
  }

  //envoie de la boule
  if (input.a_fin)
  {
    if (huzounet.parametresDeBase.boulesEnMain.getLength())
    {
      console.log("ENVOIE");
      (huzounet.parametresDeBase.boulesEnMain.getChildren()[0] as BouleClass).vitesse = 42;
      huzounet.scene.groupeBoulesHuzounet.add(huzounet.parametresDeBase.boulesEnMain.getChildren()[0] as BouleClass)
      // huzounet.parametresDeBase.boulesEnMain.clear();
      input.a_fin = false
    }
  }

}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
