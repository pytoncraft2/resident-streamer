import TJoueur from "../../types/Joueur"

export function fusion(personnage: any, input: any) {
  if (input.tab)
  {

    if (personnage.bossControllable.getLength() == 1)
    {
      //un boss obtenu
        // personnage.bossControllable.getFirst()
        //fusion possible
          // fusionAvecBoss(ennemieProche, personnage)
          fusionAvecBoss(personnage.bossControllable.getChildren()[0], personnage)

    }
    else
    {
      const ennemieProche = closest(personnage, 'enemies');
      if (ennemieProche)
      {
        // TODO: Verifier distance
        if ((personnage.scene as any).room.boss[`${ennemieProche.sprite}`].vaincu)
        {
          //VAINCU
          recuperationObjetBoss(ennemieProche, personnage)
          personnage.bossControllable.add(ennemieProche)
          // fusionAvecBoss(ennemieProche, personnage)
            //
        }
        else
        {
        }
      }
    }
    input.tab = false;
  }
  if (input.tab_fin)
  {
  }
}

function recuperationObjetBoss(ennemie: any, joueur) {
  ennemie.currentTarget = joueur
  ennemie.suivre = true
  ennemie.setScale(0.2)
}

function fusionAvecBoss(ennemie: any, joueur) {
   ennemie.cible_courante = "enemies";
   ennemie.currentTarget = ennemie
   ennemie.suivre = false
   ennemie.setScale(1)

   joueur.currentTarget = ennemie
   joueur.suivre = true
   joueur.setScale(0.2)

   joueur.scene.time.delayedCall(5000, () => {
     joueur.suivre = false;
     (joueur.scene as any).suppressionJoueur(ennemie, true, ennemie.ClientID)
     joueur.currentTarget = joueur;
     joueur.changeInterfaceClient(joueur.sprite, true);
     joueur.setScale(1)
   }, null, joueur);

}

function nouveauPilote(nouveauPilote: TJoueur, detruireApres: boolean = false) {
   // nouveauPilote.particules = true;
   this.currentTarget = nouveauPilote;
   this.suivre = true;
   this.setScale(0.2);

   // this.changeInterfaceClient(this.sprite, true);
   // if (detruireApres)
   // {
   //   this.scene.time.delayedCall(20000, () => {
   //     this.suivre = false
   //     nouveauPilote.particules = false;
   //     // (this.scene as any).enemies.remove(nouveauPilote)
   //     (this.scene as any).suppressionJoueur(nouveauPilote, true, nouveauPilote.ClientID)
   //     this.currentTarget = this;
   //     this.changeInterfaceClient(this.sprite, true);
   //     this.aObtenuUnBoss = false
   //     this.setScale(1)
   //   }, null, this);
   // }
 }

export function closest(personnage: any, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
