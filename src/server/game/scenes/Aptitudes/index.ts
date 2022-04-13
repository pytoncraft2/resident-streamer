import {cross, kick, dash, interaction} from './fakhear'
import {pique} from './boss_1'



/**
 * saut - Aptitude générale disponible pour tout le monde
 */
function saut() {

}

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
  toucheA: (fakhear) => {
    cross(fakhear)
  },
  toucheZ: (fakhear) => {
    kick(fakhear)
  },
  toucheE: (scene, player) => {
    dash()
  },
  toucheR: (scene, player) => {
    interaction()
  },
  toucheEspace: (charge, scene, player) => {
    saut()
  },
  gestionRecevoirDegat: (scene, player) => {
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
  toucheA: (boss_1) => {
    pique(boss_1)
  },
  toucheZ: (fakhear) => {
    kick(fakhear)
  },
  toucheE: (scene, player) => {
    dash()
  },
  toucheR: (scene, player) => {
    interaction()
  },
  toucheEspace: (charge, scene, player) => {
    saut()
  },
  gestionRecevoirDegat: (scene, player) => {
  }
}


export const Aptitudes = () => parametres;
