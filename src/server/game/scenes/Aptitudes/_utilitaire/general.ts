export function fusion(personnage: any, input: any) {
  if (input.tab)
  {
    console.log("---------------------------------------------")
    console.log(personnage.aObtenuUnBoss)
    if (!personnage.aObtenuUnBoss)
    {
      personnage.fusionner = true
    }
    else
    {
      console.log("A OBTENU UN BOSS!!!!!!!!!!")
      // this.suivre = false
      personnage.bossControllable.getChildren()[0].setScale(1)
      personnage.bossControllable.getChildren()[0].body.setAllowGravity(true)
      personnage.bossControllable.getChildren()[0].suivre = false;
      personnage.fusionAvecBoss(personnage.bossControllable.getChildren()[0])
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
