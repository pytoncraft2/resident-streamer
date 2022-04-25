import {cross, kick, dash} from './fakhear'
import {pique, suivre} from './boss_1'
import {kunai, shuriken} from './huzounet'
import {couteau, bombe} from './akhizonah'
import {soin, blesse, osmo_saut} from './osmosiscoop'

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

function interaction(personnage: TJoueur) {
  personnage.interaction_objet = true
  personnage.scene.tweens.addCounter({
    duration: 1,
    onComplete: () => (personnage.interaction_objet = false)
  })
  // fakhear.interaction_objet = false
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
     },
     'osmosiscoop': {
       o: (function(){console.log('------------------------Bonjour !------------------------')})()
     }
   }
 }


export const Aptitudes = {
  'fakhear': {
    toucheA: (fakhear: TJoueur, input?: Object) => {
      cross(fakhear, input)
    },
    toucheZ: (fakhear: TJoueur) => {
      kick(fakhear)
    },
    toucheE: (fakhear: TJoueur) => {
      dash(fakhear)
    },
    toucheR: (fakhear: TJoueur) => {
      interaction(fakhear)
    },
    toucheEspace: (fakhear: TJoueur) => {
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
    toucheE: (huzounet: TJoueur) => {
      interaction(huzounet)
    },
    toucheEspace: (huzounet: TJoueur) => {
      saut(huzounet)
    }
  },
  'akhizonah': {
    toucheA: (akhizonah: TJoueur, input?: Object) => {
      couteau(akhizonah, input)
    },
    toucheZ: (akhizonah: TJoueur) => {
      bombe(akhizonah)
    },
    toucheE: (akhizonah: TJoueur) => {
      interaction(akhizonah)
    },
    toucheEspace: (akhizonah: TJoueur) => {
      saut(akhizonah)
    }
  },
  'osmosiscoop': {
    toucheA: (osmo: TJoueur, input?: Object) => {
      soin(osmo, input)
    },
    toucheZ: (osmo: TJoueur, input?: Object) => {
      blesse(osmo, input)
    },
    toucheE: (osmo: TJoueur) => {
      interaction(osmo)
    },
    toucheEspace: (osmo: TJoueur) => {
      osmo_saut(osmo)
    }
  }

};

// export const Aptitudes = () => parametres;
