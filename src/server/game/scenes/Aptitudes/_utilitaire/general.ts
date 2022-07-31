export function fusion(personnage: any, input: any) {
  if (input.tab)
  {
    if (personnage.bossControllable.getLength() == 0)
    {
      console.log("----------AUCUN BOSS OBTENU-----------")
      personnage.fusionner = true
    }
    else
    {
      console.log("A OBTENU UN BOSS!!!!!!!!!!")
      // this.suivre = false
      // personnage.changeInterfaceClient('huzounet', false);
      // const bossObtenu = personnage.bossControllable.getFirstAlive()
      // bossObtenu.setScale(1)
      // bossObtenu.body.setAllowGravity(true)
      // bossObtenu.suivre = false;
      // personnage.fusionAvecBoss(bossObtenu)
      // personnage.fusionner = false
      // personnage.changeInterfaceClient(`${bossObtenu.sprite}`);
      // personnage.bossControllable.clear()

      const bossObtenu = personnage.bossControllable.getFirstAlive()
      bossObtenu.setScale(1)
      bossObtenu.body.setAllowGravity(true)
      bossObtenu.suivre = false;
      personnage.fusionAvecBoss(bossObtenu)
      personnage.fusionner = false

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
