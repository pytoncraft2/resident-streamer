import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import { Boule } from "../../RoomState"

import TJoueur from "../types/Joueur";

export function shuriken(huzounet: TJoueur, input?: any) {

  if (input.a) {
    //creation de la boule si non créer
    if (!huzounet.scene.groupeBoulesHuzounet.getLength())
    {
      console.log("CREATION BOULE")
      const boule = huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x -80, huzounet.y - 160, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID, puissance: 2}))
      huzounet.scene.groupeBoulesHuzounet.add(boule);
      (boule.body as any).setAllowGravity(false);


    //grossisement de la boule
    } else 
    {
      console.log("GROSSISEMENT");
      (huzounet.scene.groupeBoulesHuzounet.getChildren()[0] as Phaser.Physics.Arcade.Sprite).scale += 0.01;
      (huzounet.scene.groupeBoulesHuzounet.getChildren()[0] as Phaser.Physics.Arcade.Sprite).alpha += 0.01;
    }
    // console.log("A")
  }
  if (input.a_fin) (console.log("FIN A"), input.a_fin = false)
  // huzounet.x += 1
  // if (input.a.charge)
  // {
  // }
  //
  // if (input.a.envoie)
  // {
  // }

}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
