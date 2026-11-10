import TJoueur from "../types/Joueur";
import { Action, ToucheDeplacement } from "../Aptitudes/definition";

/**
 * Déplacements par défaut de tous les personnages (marche, saut, changement d'étage), complétés ou
 * remplacés par ceux de la définition de chaque personnage (`deplacements`). Chaque action agit sur
 * le personnage reçu en paramètre : le registre qui les contient est partagé par toutes les rooms.
 */
export const DEPLACEMENTS_PAR_DEFAUT: Readonly<Record<ToucheDeplacement, Action<TJoueur>>> = {
  toucheDroite: (personnage: any, input: any) => {
    direction(input.right_debut, input.right_fin, personnage, input, true)
  },
  toucheGauche: (personnage: any, input: any) => {
    direction(input.left_debut, input.left_fin, personnage, input, false)
  },
  toucheEspace: (personnage: any, _input: any) => {
    personnage.setVelocityY(-1150);
  },
  toucheHaut: (personnage: any, input: any) => {
    changementEtage(personnage, -2600, 1000)
    input.up = false;
  },
  toucheBas: (personnage: any, input: any) => {
    changementEtage(personnage, 900, 500)
    input.down = false;
  },
}

function direction(debut: boolean, fin: boolean, personnage: any, _input: any, dir: boolean) {
  if (debut) {
    personnage.setFlipX(!dir)
    personnage.play('walk', true)
  }
  else if (fin) {
    personnage.setVelocityX(0)
    personnage.play('idle_walk', true)
  }
  else personnage.setVelocityX(dir ? (personnage as any).vel : -(personnage as any).vel)
}

function changementEtage(personnage, velocite, delai){
    personnage.body.checkCollision.none = true;
    personnage.setVelocityY(velocite);
    personnage.scene.time.delayedCall(delai, () => {
      personnage.body.checkCollision.none = false;
    }, null, personnage);
}
