import {cross, kick, dash, interaction} from './fakhear'
import {pique, suivre} from './boss_1'
import {kunai, shuriken} from './huzounet'


interface P {
  P: Phaser.Physics.Arcade.Sprite
}


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
  },
  toucheE: (fakhear: Pick<P,'P'>) => {
    dash(fakhear)
  },
  toucheR: (fakhear: Pick<P,'P'>) => {
    interaction(fakhear)
  },
  toucheEspace: (fakhear: Pick<P, 'P'>) => {
    saut(fakhear)
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
  },
  toucheZ: (boss_1: Pick<P, 'P'>) => {
    suivre(boss_1)
  }
}

parametres['huzounet'] = {
  etatInitial: {
    vie: 5,
    displayWidth: 104,
    displayHeight: 302,
    masse: 30,
    puissanceDeBase: 10,
    attaqueFrame: "positiona3"
  },
  toucheA: (huzounet: Pick<P, 'P'>) => {
    kunai(huzounet)
  },
  toucheZ: (huzounet: Pick<P, 'P'>) => {
    shuriken(huzounet)
  },
  toucheEspace: (huzounet: Pick<P, 'P'>) => {
    saut(huzounet)
  }
}


export const Aptitudes = () => parametres;
