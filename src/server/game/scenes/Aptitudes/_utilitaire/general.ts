export function fusion(personnage: any, input: any) {
  if (input.tab)
  {
    console.log("---------------------------------------------")
    console.log(personnage.aObtenuUnBoss)
    personnage.changeInterfaceClient('huzounet', true,  personnage.ClientID);
    if (!personnage.aObtenuUnBoss)
    {
      personnage.fusionner = true
    }
    else
    {
      console.log("A OBTENU UN BOSS!!!!!!!!!!")
      // this.suivre = false
      const bossObtenu = personnage.bossControllable.getFirstAlive()
      bossObtenu.setScale(1)
      bossObtenu.body.setAllowGravity(true)
      bossObtenu.suivre = false;
      personnage.fusionAvecBoss(bossObtenu)
      // personnage.bossControllable.clear()
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
