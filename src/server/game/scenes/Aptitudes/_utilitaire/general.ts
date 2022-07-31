export function fusion(personnage: any, input: any) {
  if (input.tab)
  {
    const ennemieProche = closest(personnage, 'enemies');
    if (ennemieProche)
    {
      if ((personnage.scene as any).room.boss[`${ennemieProche.sprite}`].vaincu)
      {
        //Fusion possible
      }
      else
      {
        //recuperation objet boss possible
      }
    }
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
