import {cross, kick, dash, interaction} from './fakhear'



/**
 * saut - Aptitude générale disponible pour tout le monde
 */
function saut() {

}

const parametres = {};

parametres['fakhear'] = {
  etatInitial: {
    vie: 5,
    displayWidth: 104,
    displayHeight: 302,
    masse: 30,
    puissanceDeBase: 10,
    attaqueFrame: "positiona3"
  },
  toucheA: (charge, scene, player) => {
    cross(charge, scene, player)
  },
  toucheZ: (scene, player) => {
    kick(scene, player)
  },
  toucheE: (scene, player) => {
    dash(scene, player)
  },
  toucheR: (scene, player) => {
    interaction(scene, player)
  },
  toucheEspace: (charge, scene, player) => {
    saut(charge, scene, player)
  },
  gestionRecevoirDegat: (scene, player) => {
    recevoirDegat(scene, player)
  }
}
