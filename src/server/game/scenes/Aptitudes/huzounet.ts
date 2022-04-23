import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import KunaiClass from "../class/objets/KunaiClass"
import { Boule } from "../../RoomState"

import TJoueur from "../types/Joueur";



/**
 * shuriken - Logique de charge et d'envoie de la boule
 *
 * @param  {Object} huzounet: TJoueur Type
 * @param  {Object} input?: any       touche appuié
 */
export function shuriken(huzounet: TJoueur, input?: any) {

  if (input.a) {

    //creation de la boule si non créer + animation début
    if (!huzounet.parametresDeBase.boulesEnMain.getLength())
    {
      huzounet.puissanceChargeBoule = 0
      const boule = huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x -80, huzounet.y - 160, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID, puissance: 2}))
      huzounet.parametresDeBase.boulesEnMain.add(boule);
      (boule.body as any).setAllowGravity(false);

      setAnimation(huzounet, 'huzounet_preparation_attaque')

    //grossisement de la boule
    } else 
    {
      (huzounet.parametresDeBase.boulesEnMain.getChildren()[0] as BouleClass).scale += 0.02;
      (huzounet.parametresDeBase.boulesEnMain.getChildren()[0] as BouleClass).alpha += 0.01;
      huzounet.puissanceChargeBoule += 0.01
    }
  }

  //envoie de la boule + animation envoie
  if (input.a_fin)
  {
    if (huzounet.parametresDeBase.boulesEnMain.getLength())
    {
      console.log("ENVOIE");

      const boule = (huzounet.parametresDeBase.boulesEnMain.getChildren()[0] as BouleClass);
      boule.proprietaire = huzounet.ClientID;
      huzounet.scene.groupeBoulesHuzounet.add(boule.setData('degat', huzounet.puissanceChargeBoule));
      huzounet.scene.groupeBoulesHuzounet.getMatching('proprietaire', huzounet.ClientID)[0].body.setVelocityX(2600);
      huzounet.scene.groupeBoulesHuzounet.getMatching('proprietaire', huzounet.ClientID)[0].proprietaire = '';
      huzounet.parametresDeBase.boulesEnMain.clear();
      input.a_fin = false

      setAnimation(huzounet, 'huzounet_envoie_attaque');
    }
  }

}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque');

    if (!huzounet.c) {
      const kunai = huzounet.scene.add.existing(new KunaiClass(huzounet.scene, huzounet.x -80, huzounet.y - 160, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID, puissance: 2}))
    }
    // huzounet.setFrame('kunai0')
}
