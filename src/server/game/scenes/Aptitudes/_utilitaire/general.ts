export function fusion(personnage: any, input: any) {
  if (input.tab)
  {
    const ennemieProche = closest(personnage, 'enemies');
    if (ennemieProche)
    {
      // TODO: Verifier distance
      if ((personnage.scene as any).room.boss[`${ennemieProche.sprite}`].vaincu)
      {
        //ennemie vaincu
          ennemieProche.setAlpha(0.3)
          console.log("ENEMIE PROCHE VAINCU!")
          console.log(ennemieProche.alpha)
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
