export function fusion(personnage: any, input: any) {
  if (input.tab)
  {
    if (!personnage.aObtenuUnBoss)
    {
      personnage.fusionner = true
    }
    input.tab = false;
  }
  if (input.tab_fin)
  {
    personnage.fusionner = false
  }
}



export function closest(personnage: any, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
