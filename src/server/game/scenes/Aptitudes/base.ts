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
    auto?(joueur: TJoueur, input: any, Aptitudes?: any): void;
  }
}
/**
 * Stockage des touches qui active les aptitudes du personnage
 *
 * @example
 * Activer la fonction correspondant à la touche A du personnage fakhear:
 * ```
 * Aptitudes['fakhear'].A(Sprite, {a: true})
 * //active la fonction correspondant à la touche A des aptitudes de Fakhear
 * ```
 */
export const Aptitudes: Touches = {};
export const Commandes: any = {};

 /**
  * Import tout les fichier du dossier `./src/server/game/scenes/Aptitudes`, excepté le fichier lui-même
  *
  * @remarks
  * le nom du fichier devient la clé pour l'objet `Aptitudes`<br>
  * le dossier `_utilitaire` contient les fonctions souvent utilisable pour tout les joueurs<br>
  * Toute les fonctions comportant deux underscord sont ajouté à l'objet `Aptitudes`
  * avec pour clé la valeur qu'il y a après l'undescord
  *
  * @example
  * Activer la fonction correspondant à la touche A du personnage fakhear:
  * ```
  * //Ici la valeur situé après les 2 undescord est "A"
  * export function cross__A(sprite, input) {
  *   if (input.a) setAnimation(fakhear, 'cross')
  * }
  * //Ce qui donnes au final un objet Aptidudes comme ci dessous:
  * Aptitudes['fakhear']['A'] = fn
  * ```
  */
export const autoImport = fs.readdirSync('./src/server/game/scenes/Aptitudes', { withFileTypes: true })
.filter(autoImport => autoImport.isFile())
    .map(file => {
      import('./' + file.name).then((m) => {
        if (file.name != nomFichierCourant)
        {
          //le nom du fichier devient la clé pour l'objet (Aptitudes)
          const personnage = file.name.substring(0, file.name.lastIndexOf('.'))
          Object.values(m).forEach((fn, _i) => {
            //regarde si la fonction contien un undescord
            let index = fn.toString().split(' ')[1].indexOf("__")
            let NOMFONCTION = fn.toString().split(' ')[1].split('__')[0];
            if (NOMFONCTION != '') {
              let CLE = fn.toString().split(' ')[1].substring(index+2).split('(')[0]
              if (Commandes[personnage] === undefined) Commandes[personnage] = {}
              Commandes[personnage][`${CLE}`] = NOMFONCTION
            }
            if (index != -1)
            {
              let CLE = fn.toString().split(' ')[1].substring(index+2).split('(')[0]
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
      console.log(Commandes)

    }, 9000);
