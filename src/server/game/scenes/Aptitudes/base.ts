import {cross, kick, dash, interaction} from './fakhear'
import {pique, suivre} from './boss_1'
import {kunai, shuriken} from './huzounet'

import TJoueur from "../types/Joueur";



/**
PARAMETRES GENERALE
**/

function saut(personnage: Phaser.Physics.Arcade.Sprite|any) {
  if (personnage.compteurSaut < 1 || personnage.body.touching.down) {
    personnage.play('jump')
    personnage.setVelocityY(-1400);
    personnage.compteurSaut++
    if (personnage.body.touching.down) {
      personnage.compteurSaut = 0
    }
  }
}
/**
 * -- LISTE DES PARAMETRES DE L'ACTION DES TOUCHES DES JOUEURS --
 * Aptitude générale disponible pour tout le monde
 */

 export const EtatsInitialStatique = (personnage?: Phaser.Physics.Arcade.Sprite) => {
   return {
     'fakhear': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       puissanceDeBase: 10,
     },
     'boss_1': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       puissanceDeBase: 10,
     },
     'huzounet': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       puissanceDeBase: 10,
       boulesEnMain: personnage.scene.physics.add.group({
         runChildUpdate: true,
         collideWorldBounds: true,
         maxSize: 4
       })
     }
   }
 }


export const Aptitudes = {
  'fakhear': {
    toucheA: (fakhear, input?: Object) => {
      cross(fakhear, input)
    },
    toucheZ: (fakhear) => {
      kick(fakhear)
    },
    toucheE: (fakhear) => {
      dash(fakhear)
    },
    toucheR: (fakhear) => {
      interaction(fakhear)
    },
    toucheEspace: (fakhear) => {
      saut(fakhear)
    }
  },
  'boss_1': {
    toucheA: (boss_1) => {
      pique(boss_1)
    },
    toucheZ: (boss_1) => {
      suivre(boss_1)
    }
  },
  'huzounet': {
    toucheA: (huzounet: TJoueur, input?: Object) => {
      shuriken(huzounet, input)
    },
    toucheZ: (huzounet: TJoueur) => {
      kunai(huzounet)
    },
    toucheEspace: (huzounet: TJoueur) => {
      saut(huzounet)
    }
  }
};

// export const Aptitudes = () => parametres;
