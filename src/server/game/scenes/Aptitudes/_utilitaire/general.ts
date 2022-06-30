// import Ligne from "../../class/elements/Ligne";
export function fusion(personnage: any, input: any) {
  if (input.tab/* && personnage.bossControlable.getLength() == 1*/) {
    personnage.fusionner = true
    // personnage.ligne = new Ligne(personnage.scene, closest(personnage, "enemies"), personnage, 0x00000, 300, `${(Math.random() + 1).toString(36).substring(7)}`)
    input.tab = false;
  }
  if (input.tab_fin) {
    personnage.fusionner = false
    // personnage.scene.suppressionLigne(personnage.ligne, personnage.ligne.id)
    // personnage.ligne.destroy()
  }
}



export function closest(personnage: any, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
