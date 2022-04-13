
/**
 * FAKHEAR
 */

function cross() {

}

function kick() {

}

function dash() {

}

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
    agrandissement(scene, player)
  },
  toucheR: (scene, player) => {
    invisible(scene, player)
  },
  toucheEspace: (charge, scene, player) => {
    saut(charge, scene, player)
  },
  gestionRecevoirDegat: (scene, player) => {
    recevoirDegat(scene, player)
  }
}
