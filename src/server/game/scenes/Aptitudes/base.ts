// import {cross, kick, dash} from './fakhear'
// import {pique, suivre} from './_boss_1'
// import {punch, vole, lanceManette, Direction_manette} from './_manette'
// import {kunai, shuriken, multiclonage} from './huzounet'
// import {couteau, bombe} from './akhizonah'
// import {chargeVole} from './_twitchman'
// import {soin, blesse, osmo_saut} from './osmosiscoop'

// import * as a from './_twitchman'
import * as fs from 'fs';

// const files = import("./" + );

//@ts-ignore
// a.survoler()

import TJoueur from "../types/Joueur";

// import fs = require('fs');

export const Aptitudes = {};

fs.readdir('./src/server/game/scenes/Aptitudes', (err, files) => {
  console.log(files)
//    // console.log(file)
//    if (file != 'base.ts') {
//      // console.log(file)
//      // import("./" + file).then();
//        console.log(file.substring(0, file.lastIndexOf('.')))
//      const module = import('./' + file).then((m) => {
//        // console.log(m)
//        // Aptitudes[file.substring(0, file.lastIndexOf('.'))] = {
//        //   // toucheA: function(manette: TJoueur, _input?: Object) {
//        //   //   // m.survoler()
//        //   //   console.log("OKAY")
//        //   //   // chargeVole(manette)
//        //   // }
//        //   ...Direction_defaut
//        // }
//
// //        const arr = [{id: 'a'}, {id: 'b'}, {id: 'c'}];
// //
// //        const values = arr.map(object => object.id)
// // for (const [key, value] of Object.entries(m)) {
// //   // console.log(`${key}: ${value}`);
// //   console.log(`${key}`);
// // }
//      });
//
//
//    }
//   // or const module = await import('file')




























files.forEach((file, index) => {
  const module = import('./' + file).then((m) => {
    if (file == 'twitchman.ts')
    {
      // console.log(index)
      // console.log(Object.entries(m).length)
      // console.log(Object.entries(m))

      // Object.entries(m).map((x, i) => {
      // console.log(m)


          // console.log(Object.values(m)[1])
      // for (let i = 0; i < Object.entries(m).length; i++) {
      //     // array[i];
          Aptitudes[file.substring(0, file.lastIndexOf('.'))] = {
            toucheA: Object.values(m)[0],
            toucheZ: Object.values(m)[1],
            toucheE: Object.values(m)[2],
            toucheR: Object.values(m)[3]
          }
      //
      //     console.log(Object.entries(m)[i])
      // }
      // console.log(Object.entries(m).length)
      // for (const [key, value] of Object.entries(m)) {
      //   console.log(value);
      //   console.log(key);
      // }


      // Aptitudes[file.substring(0, file.lastIndexOf('.'))] = {
      //   toucheA: x[1],
      //   toucheZ: x,
      //   toucheE: m,
      //   toucheR: x[1]
      // }
      // if (x[1][0])
      // console.log(x)
      // console.log(Object.entries(m)[2][1])
      // console.log("_____________________")

      // });
      // console.log(m)
      // console.log(m.length)


      //   toucheA: m.couteau,
      //   toucheZ: m.couteau,
      //   toucheE: m.couteau
    }
  });
});




setTimeout(() => {
//
console.log(Aptitudes)
}, 3000);


















});
//@ts-ignore
// survoler()
// console.log(_manette)

// console.log(jjj)
//@ts-ignore
// console.log(A)


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
    console.log("DROITE")
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


// export const Aptitudes = {
//   'boss_1': {
//     toucheA: (boss_1: TJoueur) => {
//       // pique(boss_1)
//     },
//     toucheZ: (boss_1: TJoueur) => {
//       // suivre(boss_1)
//     }
//   },
//   'manette': {
//     toucheA: (manette: TJoueur, input?: Object) => {
//       // punch(manette, input)
//     },
//     toucheZ: (manette: TJoueur, input: Object) => {
//       // lanceManette(manette, input)
//     },
//     toucheEspace: (manette: TJoueur, input: Object) => {
//       // vole(manette, input)
//     },
//     // ...Direction_manette
//   },
//   'twitchman': {
//     toucheA: (manette: TJoueur, _input?: Object) => {
//       // chargeVole(manette)
//     },
//     ...Direction_defaut
//   },
//   'fakhear': {
//     toucheA: (fakhear: TJoueur, input?: Object) => {
//       // cross(fakhear, input)
//     },
//     toucheZ: (fakhear: TJoueur) => {
//       // kick(fakhear)
//     },
//     toucheE: (fakhear: TJoueur) => {
//       // dash(fakhear)
//     },
//     toucheR: (fakhear: TJoueur) => {
//       // interaction(fakhear)
//     },
//     toucheEspace: (fakhear: TJoueur) => {
//       saut(fakhear)
//     },
//     ...Direction_defaut
//   },
//   'huzounet': {
//     toucheA: (huzounet: TJoueur, input?: Object) => {
//       // shuriken(huzounet, input)
//     },
//     toucheZ: (huzounet: TJoueur) => {
//       // kunai(huzounet)
//     },
//     toucheE: (huzounet: TJoueur) => {
//       // multiclonage(huzounet)
//     },
//     toucheR: (huzounet: TJoueur) => {
//       // interaction(huzounet)
//     },
//     toucheEspace: (huzounet: TJoueur) => {
//       // saut(huzounet)
//     },
//     ...Direction_defaut
//   },
//   'akhizonah': {
//     toucheA: (akhizonah: TJoueur, input?: Object) => {
//       // couteau(akhizonah, input)
//     },
//     toucheZ: (akhizonah: TJoueur) => {
//       // bombe(akhizonah)
//     },
//     toucheE: (akhizonah: TJoueur) => {
//       // interaction(akhizonah)
//     },
//     toucheEspace: (akhizonah: TJoueur) => {
//       saut(akhizonah)
//     },
//     ...Direction_defaut
//   },
//   'osmosiscoop': {
//     toucheA: (osmo: TJoueur, input?: Object) => {
//       // soin(osmo, input)
//     },
//     toucheZ: (osmo: TJoueur, input?: Object) => {
//       // blesse(osmo, input)
//     },
//     toucheE: (osmo: TJoueur) => {
//       // interaction(osmo)
//     },
//     toucheEspace: (osmo: TJoueur) => {
//       // osmo_saut(osmo)
//     },
//     ...Direction_defaut
//   }
//
// };

// export const Aptitudes;
// export default Aptitudes;
