import TJoueur from "../../types/Joueur"

export function fusion(personnage: any, input: any) {
  if (input.tab)
  {

    if (personnage.bossControllable.getLength() == 1)
    {
      //un boss obtenu
        // personnage.bossControllable.getFirst()
        //fusion possible
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


function recuperationObjetBoss(joueur1: TJoueur, joueur2) {
 joueur1.cible_courante = "enemies";
 joueur2.changeInterfaceClient(joueur1.sprite, true);
 // _e.animationBoosFigurine.remove()
 joueur1.nouveauPilote(joueur2);
}

function fusionAvecBoss(joueur1: TJoueur, joueur2) {
   joueur1.cible_courante = "enemies";
   // this.changeInterfaceClient(_e.sprite, true, _e.ClientID);
   joueur2.fusionner = false;
   joueur2.nouveauPilote(joueur1, true);
 }

function nouveauPilote(nouveauPilote: TJoueur, detruireApres: boolean = false) {
   // nouveauPilote.particules = true;
   this.currentTarget = nouveauPilote
   this.suivre = true
   this.setScale(0.2)

   // this.changeInterfaceClient(this.sprite, true);
   if (detruireApres)
   {
     this.scene.time.delayedCall(20000, () => {
       this.suivre = false
       nouveauPilote.particules = false;
       // (this.scene as any).enemies.remove(nouveauPilote)
       (this.scene as any).suppressionJoueur(nouveauPilote, true, nouveauPilote.ClientID)
       this.currentTarget = this;
       this.changeInterfaceClient(this.sprite, true);
       this.aObtenuUnBoss = false
       this.setScale(1)
     }, null, this);
   }
 }

export function closest(personnage: any, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
