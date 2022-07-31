export function fusion(personnage: any, input: any) {
  if (input.tab)
  {
    input.tab = false;
  }
  if (input.tab_fin)
  {
  }
}



export function closest(personnage: any, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
