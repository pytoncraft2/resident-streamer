import * as fs from 'fs';
import path from 'path'
const nomFichierCourant = path.basename(__filename);
export const Aptitudes = {};

//import de toute les Aptitudes des personnages
fs.readdir('./src/server/game/scenes/Aptitudes', (_err, files) => {
  files.forEach((file) => {
    import('./' + file).then((m) => {
      if (file != nomFichierCourant)
      {
        Aptitudes[file.substring(0, file.lastIndexOf('.'))] = {
          toucheA: Object.values(m)[0],
          toucheZ: Object.values(m)[1],
          toucheE: Object.values(m)[2],
          toucheR: Object.values(m)[3]
        }
      }
    });
  });
});

setTimeout(() => {
console.log(Aptitudes)
}, 3000);


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
