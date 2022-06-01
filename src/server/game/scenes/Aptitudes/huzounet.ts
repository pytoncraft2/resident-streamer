import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/elements/BouleClass"
import KunaiClass from "../class/elements/KunaiClass"
import CloneClass from "../class/elements/CloneClass"

import TJoueur from "../types/Joueur";

export function StatsSupplementaire(huzounet: TJoueur, Aptitudes: any) {
  huzounet.boulesEnMain = huzounet.scene.physics.add.group({
    runChildUpdate: true,
    collideWorldBounds: true,
    maxSize: 4
  })
}


/**
 * shuriken - Logique de charge et d'envoie de la boule
 *
 * @param  {Object} huzounet: TJoueur Type
 * @param  {Object} input?: any       touche appuié
 */
export function shuriken(huzounet: TJoueur, input?: any) {

  if (input.a) {

    //creation de la boule si non créer + animation début
    if (!huzounet.boulesEnMain.getLength())
    {
      huzounet.puissanceChargeBoule = 0
      const boule = huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.flipX ? huzounet.x + 80 : huzounet.x - 80, huzounet.y - 160, "huzounet",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID, puissance: 2}))
      huzounet.boulesEnMain.add(boule);
      (boule.body as any).setAllowGravity(false);

      setAnimation(huzounet, 'huzounet_preparation_attaque')

    //grossisement de la boule
    } else 
    {
      (huzounet.boulesEnMain.getChildren()[0] as BouleClass).scale += 0.02;
      (huzounet.boulesEnMain.getChildren()[0] as BouleClass).alpha += 0.01;
      huzounet.puissanceChargeBoule += 0.01
    }
  }

  //envoie de la boule + animation envoie
  if (input.a_fin)
  {
    if (huzounet.boulesEnMain && huzounet.boulesEnMain.getLength())
    {
      console.log("ENVOIE");

      const boule = (huzounet.boulesEnMain.getChildren()[0] as BouleClass);
      boule.proprietaire = huzounet.ClientID;
      huzounet.scene.groupeBoulesHuzounet.add(boule.setData('degat', huzounet.puissanceChargeBoule));
      huzounet.scene.groupeBoulesHuzounet.getMatching('proprietaire', huzounet.ClientID)[0].body.setVelocityX(huzounet.flipX ? -2600 : 2600);
      huzounet.scene.groupeBoulesHuzounet.getMatching('proprietaire', huzounet.ClientID)[0].proprietaire = '';
      huzounet.boulesEnMain.clear();
      input.a_fin = false

      setAnimation(huzounet, 'huzounet_envoie_attaque');
    }
  }

}

export function kunai(huzounet: TJoueur) {
    setAnimation(huzounet, 'huzounet_kunai_attaque');

    if (!huzounet.kunai) {
      const kunai = huzounet.scene.add.existing(new KunaiClass(huzounet.scene, huzounet.flipX ? huzounet.x - 80 : huzounet.x + 80, huzounet.y - 60, "huzounet",  `${(Math.random() + 1).toString(36).substring(7)}`)
      .setData({ ClientId: huzounet.ClientID, degat: huzounet.degat}))
      .setFlipX(huzounet.flipX)
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

export function multiclonage(huzounet: TJoueur) {
  if (!huzounet.clone) {
    huzounet.clone = true
    const clone1 = huzounet.scene.add.existing(new CloneClass(huzounet.scene, huzounet.x + 100, huzounet.y + 10, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`, huzounet).setData({ ClientId: huzounet.ClientID, degat: huzounet.degat/2})).setFlipX(huzounet.flipX)
    const clone2 = huzounet.scene.add.existing(new CloneClass(huzounet.scene, huzounet.x + 200, huzounet.y + 10, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`, huzounet).setData({ ClientId: huzounet.ClientID, degat: huzounet.degat/2})).setFlipX(huzounet.flipX)
    const clone3 = huzounet.scene.add.existing(new CloneClass(huzounet.scene, huzounet.x - 200, huzounet.y + 10, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`, huzounet).setData({ ClientId: huzounet.ClientID, degat: huzounet.degat/2})).setFlipX(huzounet.flipX)
    const clone4 = huzounet.scene.add.existing(new CloneClass(huzounet.scene, huzounet.x - 100, huzounet.y + 10, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`, huzounet).setData({ ClientId: huzounet.ClientID, degat: huzounet.degat/2})).setFlipX(huzounet.flipX)
    huzounet.scene.physics.add.existing(clone1);
    huzounet.scene.physics.add.existing(clone2);
    huzounet.scene.physics.add.existing(clone3);
    huzounet.scene.physics.add.existing(clone4);
  }
}
