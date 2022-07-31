export function fusion(personnage: any, input: any) {
  if (input.tab)
  {
    if (personnage.bossControllable.getLength() == 0)
    {
      personnage.fusionner = true
    }
    else
    {
      console.log("A OBTENU UN BOSS!!!!!!!!!!")
      // this.suivre = false
      // personnage.changeInterfaceClient('huzounet', false);
      const bossObtenu = personnage.bossControllable.getChildren()[0]
      bossObtenu.setScale(1)
      bossObtenu.body.setAllowGravity(true)
      bossObtenu.suivre = false;
      personnage.fusionAvecBoss(bossObtenu)
      personnage.scene.time.delayedCall(5000, () => {
        personnage.suivre = false
        // nouveauPilote.particules = false;
        // (this.scene as any).enemies.remove(nouveauPilote)
        // this.bossControllable.remove(nouveauPilote);
        console.log("SPRITE ??????????????????????????");
        // nouveauPilote.setTint(0xff0000)
        (personnage.scene as any).suppressionJoueur(bossObtenu, true, bossObtenu.ClientID)
        // bossObtenu.setAlpha(0.2)
        // this.currentTarget = this;
        // this.changeInterfaceClient(this.sprite, true);
        personnage.aObtenuUnBoss = false
        personnage.setScale(1)
      }, null, this);

      personnage.fusionner = false
      // personnage.changeInterfaceClient(`${bossObtenu.sprite}`);
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
