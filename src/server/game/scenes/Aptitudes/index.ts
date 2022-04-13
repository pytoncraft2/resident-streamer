import {cross, kick, dash, interaction} from './fakhear'



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
  toucheZ: (scene, player) => {
    kick()
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
