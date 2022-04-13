import {cross, kick, dash, interaction} from './fakhear'
import {pique} from './boss_1'

/**
 * -- LISTE DES PARAMETRES DE L'ACTION DES TOUCHES DES JOUEURS --
 * Aptitude générale disponible pour tout le monde
 */

const parametres:any = {};

parametres['fakhear'] = {
  etatInitial: {
    vie: 5,
    displayWidth: 104,
    displayHeight: 302,
    masse: 30,
    puissanceDeBase: 10,
    attaqueFrame: "positiona3"
  },
  toucheA: (fakhear: Phaser.Physics.Arcade.Sprite) => {
    cross(fakhear)
  },
  toucheZ: (fakhear: Phaser.Physics.Arcade.Sprite) => {
    kick(fakhear)
  }
}

parametres['boss_1'] = {
  etatInitial: {
    vie: 5,
    displayWidth: 104,
    displayHeight: 302,
    masse: 30,
    puissanceDeBase: 10,
    attaqueFrame: "positiona3"
  },
  toucheA: (boss_1: Phaser.Physics.Arcade.Sprite) => {
    pique(boss_1)
  }
}


export const Aptitudes = () => parametres;
