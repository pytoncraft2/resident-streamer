import * as fs from 'fs';
import path from 'path'
const nomFichierCourant = path.basename(__filename);
import TJoueur from "../types/Joueur";

export interface Touches {
  [personnage:string]:{
    StatsSupplementaire?: (joueur: TJoueur, Aptitudes: Touches) => void,
    /** Activation fonction correspondant à la touche **A** */
    A?: (joueur: Phaser.Physics.Arcade.Sprite, input: any) => void;
    /** Activation fonction correspondant à la touche **Z** */
    Z?: (joueur: Phaser.Physics.Arcade.Sprite, input: any) => void;
    /** Activation fonction correspondant à la touche **E** */
    E?: (joueur: Phaser.Physics.Arcade.Sprite, input: any) => void;
    /** Activation fonction correspondant à la touche **R** */
    R?: (joueur: Phaser.Physics.Arcade.Sprite, input: any) => void;
    /** Activation fonction correspondant à la **TAB** */
    TAB?: (joueur: Phaser.Physics.Arcade.Sprite, input: any) => void;
    toucheGauche?: (joueur: TJoueur, input: any) => void;
    toucheDroite?: (joueur: TJoueur, input: any) => void;
    toucheEspace?: (joueur: TJoueur, input: any) => void;
  }
}
/**
 * Stockage des touches qui active les aptitudes du personnage
 *
 * __Utilisation__
 * ```typescript
 * Aptitudes['fakhear'].A()
 * //active la touche A des aptitudes de Fakhear
 * ```
 */
export const Aptitudes: Touches = {};

//import de toute les Aptitudes des personnages selon les touches disponibles
//import toute les fonction du dossier "Aptitudes"
 /**
  * Import tout les fichier du dossier `./src/server/game/scenes/Aptitudes`, excepté le fichier lui-même
  *
  * @remarks
  * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
  *
  * @returns The arithmetic mean of something
  *
  * @beta
  */
export const dirents = fs.readdirSync('./src/server/game/scenes/Aptitudes', { withFileTypes: true })
.filter(dirent => dirent.isFile())
    .map(file => {
      import('./' + file.name).then((m) => {
        //Excepté le fichier lui-meme
        if (file.name != nomFichierCourant)
        {
          //le nom du fichier devient la clé pour l'objet (Aptitudes)
          const personnage = file.name.substring(0, file.name.lastIndexOf('.'))
          Object.values(m).forEach((fn, i) => {
            console.log(m)
            //regarde si la fonction contien un undescord
            let index = fn.toString().split(' ')[1].indexOf("__")
            if (index != -1)
            {
              let CLE = fn.toString().split(' ')[1].substr(index+2).split('(')[0]
              if (Aptitudes[personnage] === undefined) Aptitudes[personnage] = {}
              //la CLE correspond au mot après l'underscord (example: Aptitudes['fakhear']['A'])
              Aptitudes[personnage][CLE] = fn
              //fn correspond à la fonction qui active l'aptitudes
            }
          })
        }
      });
    });

setTimeout(() => {
console.log(Aptitudes)
}, 3000);
