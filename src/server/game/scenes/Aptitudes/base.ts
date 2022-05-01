import {cross, kick, dash} from './fakhear'
import {pique, suivre} from './_Aptitudes_bosses/boss_1'
import {punch, vole, lanceManette, Direction_manette} from './_Aptitudes_bosses/manette'
import {kunai, shuriken, multiclonage} from './huzounet'
import {couteau, bombe} from './akhizonah'
import {chargeVole} from './_Aptitudes_bosses/twitchman'
import {soin, blesse, osmo_saut} from './osmosiscoop'

import TJoueur from "../types/Joueur";

import fs = require('fs');

fs.readdir('./src/server/game/scenes/Aptitudes/_Aptitudes_bosses', (err, files) => {
  console.log(files)
 files.forEach(file => {
  const module = import('./_Aptitudes_bosses/' + file).then(m => m.callSomeMethod() );
  // or const module = await import('file')
  });
});



/**
PARAMETRES GENERALE
**/

function saut(personnage: Phaser.Physics.Arcade.Sprite|any) {
  // if (personnage.body.touching.down) {
    personnage.play('jump')
    // personnage.setVelocityY(-1400);
    // personnage.compteurSaut++
    // if (personnage.body.touching.down) {
    //   personnage.compteurSaut = 0
    // }
  // }
}

// function deplacement(personnage, input, direction) {
//   personnage.setVelocityX(direction ? -400 : 400)
//   personnage.setFlipX(direction);
//   personnage.setDragX(1400)
//
//   console.log(input)
// }

// function deplacement(direction: 'left'|'right', objet: boolean, fin: boolean) {
//
//   if (objet) {
//     if (!this.vole) setAnimation(this, 'walk')
//     this.setVelocityX(direction == 'right' ? this.vel : -this.vel);
//     this.setFlipX(direction == 'right' ? false : true);
//     this.setDragX(1400)
//   }
//   if (fin) {
//     // setAnimation(this, 'idle_walk')
//     this.setVelocityX(0);
//   }
// }


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
       degat: 1,
       puissanceDeBase: 10,
     },
     'akhizonah': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       degat: 1,
       puissanceDeBase: 10,
     },

     'huzounet': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       degat: 1,
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
     },
     //bosses
     'boss_1': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       degat: 2,
       puissanceDeBase: 10,
     },
     'twitchman': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       degat: 2,
       puissanceDeBase: 10,
     },
     'manette': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       degat: 1,
       masse: 30,
       puissanceDeBase: 10
     },
   }
 }

const Direction_defaut = {
  toucheDroite: (personnage: Phaser.Physics.Arcade.Sprite, input: any) => {
    personnage.setVelocityX((personnage as any).vel);
    personnage.setDragX(1400)
    if (personnage.flipX) personnage.setFlipX(false);
    if (input.space) {
      personnage.play('jump', true)
      personnage.setVelocityY(-1400);
    } else {
      personnage.play('walk', true)
    }

    if (input.right_fin && !input.space)
    {
      personnage.play('idle_walk')
      personnage.setDragX(8400)
    }
  },
  toucheGauche: (personnage: Phaser.Physics.Arcade.Sprite, input: any) => {
    personnage.setVelocityX(-(personnage as any).vel);
    personnage.setDragX(1400)
    if (!personnage.flipX) personnage.setFlipX(true);
    if (input.space) {
      personnage.play('jump', true)
      personnage.setVelocityY(-1400);
    } else {
      personnage.play('walk', true)
    }
    if (input.left_fin && !input.space)
    {
      personnage.setDragX(8400)
      personnage.play('idle_walk')
    }
  }
}


export const Aptitudes = {
  'boss_1': {
    toucheA: (boss_1: TJoueur) => {
      pique(boss_1)
    },
    toucheZ: (boss_1: TJoueur) => {
      suivre(boss_1)
    }
  },
  'manette': {
    toucheA: (manette: TJoueur, input?: Object) => {
      punch(manette, input)
    },
    toucheZ: (manette: TJoueur, input: Object) => {
      lanceManette(manette, input)
    },
    toucheEspace: (manette: TJoueur, input: Object) => {
      vole(manette, input)
    },
    ...Direction_manette
  },
  'twitchman': {
    toucheA: (manette: TJoueur, _input?: Object) => {
      chargeVole(manette)
    },
    ...Direction_defaut
  },
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
    },
    ...Direction_defaut
  },
  'huzounet': {
    toucheA: (huzounet: TJoueur, input?: Object) => {
      shuriken(huzounet, input)
    },
    toucheZ: (huzounet: TJoueur) => {
      kunai(huzounet)
    },
    toucheE: (huzounet: TJoueur) => {
      multiclonage(huzounet)
    },
    toucheR: (huzounet: TJoueur) => {
      interaction(huzounet)
    },
    toucheEspace: (huzounet: TJoueur) => {
      saut(huzounet)
    },
    ...Direction_defaut
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
    },
    ...Direction_defaut
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
    },
    ...Direction_defaut
  }

};

// export const Aptitudes = () => parametres;
