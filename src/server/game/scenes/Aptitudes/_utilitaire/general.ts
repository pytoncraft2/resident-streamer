import TJoueur from "../../types/Joueur"

export function fusion(personnage: any, input: any) {
  if (input.tab) {
    if (personnage.bossControllable.getLength() == 1) fusionAvecBoss(personnage.bossControllable.getChildren()[0], personnage)
    else {
      const ennemieProche = closest(personnage, 'enemies');
      if (!ennemieProche) return;
      if (Phaser.Math.Distance.Between(ennemieProche.x, ennemieProche.y, personnage.x, personnage.y) < 270)
      {
        if ((personnage.scene as any).room.boss[`${ennemieProche.sprite}`].vaincu)
        {
          recuperationObjetBoss(ennemieProche, personnage)
          personnage.bossControllable.add(ennemieProche)
        }
      }
    }
    input.tab = false;
  }
}

function recuperationObjetBoss(ennemie: TJoueur, joueur:TJoueur) {
  ennemie.currentTarget = joueur
  ennemie.suivre = true
  ennemie.setScale(0.2)
}

function fusionAvecBoss(ennemie: TJoueur, joueur: TJoueur) {
   ennemie.animationBossFigurine.remove();
   ennemie.setAlpha(1);
   ennemie.body.setAllowGravity(true);
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

export function closest(personnage: any, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
