import {cross, kick, dash, interaction} from './fakhear'
import {pique} from './boss_1'


interface P {
  P: Phaser.Physics.Arcade.Sprite
}
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
  toucheA: (fakhear: Pick<P,'P'>) => {
    cross(fakhear)
  },
  toucheZ: (fakhear: Pick<P,'P'>) => {
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
  toucheA: (boss_1: Pick<P, 'P'>) => {
    pique(boss_1)
  }
}


export const Aptitudes = () => parametres;
