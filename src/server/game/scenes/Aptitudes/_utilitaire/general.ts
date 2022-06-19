export function test(parameter) {
  console.log("TEST REUSSI !")
}

export function fusion(personnage: any, input: any) {
  if (input.tab/* && personnage.bossControlable.getLength() == 1*/) {
    personnage.fusionner = true
    input.tab = false;
  }
  if (input.tab_fin) {
  }
}



export function closest(personnage: any, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
