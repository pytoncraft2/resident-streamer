import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import KunaiClass from "../class/objets/KunaiClass"

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
      const boule = huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.flipX ? huzounet.x + 80 : huzounet.x - 80, huzounet.y - 160, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID, puissance: 2}))
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
      huzounet.scene.groupeBoulesHuzounet.getMatching('proprietaire', huzounet.ClientID)[0].body.setVelocityX(huzounet.flipX ? -2600 : 2600);
      huzounet.scene.groupeBoulesHuzounet.getMatching('proprietaire', huzounet.ClientID)[0].proprietaire = '';
      huzounet.parametresDeBase.boulesEnMain.clear();
      input.a_fin = false

      setAnimation(huzounet, 'huzounet_envoie_attaque');
    }
  }

}

export function kunai(huzounet: TJoueur) {
    setAnimation(huzounet, 'huzounet_kunai_attaque');

    if (!huzounet.kunai) {
      const kunai = huzounet.scene.add.existing(new KunaiClass(huzounet.scene, huzounet.flipX ? huzounet.x - 80 : huzounet.x + 80, huzounet.y - 60, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID, degat: 0.3})).setFlipX(huzounet.flipX)
      huzounet.scene.physics.add.existing(kunai);
      huzounet.scene.physics.add.overlap(kunai, (huzounet.scene as any).enemies, function(_kunai, _ennemie: any) {
        _ennemie.blesse_ennemie(_kunai.getData('degat'))
        _kunai.setData('degat', 0)
      }, undefined, huzounet);

      (kunai.body as any).setAllowGravity(false);
      huzounet.kunai = kunai
      huzounet.scene.time.delayedCall(100, () => {
          huzounet.kunai.setVelocityX(huzounet.flipX ? -2300 : 2300).setFlipX(huzounet.flipX)
            huzounet.kunai = undefined;
      }, null, huzounet);
    }
}
