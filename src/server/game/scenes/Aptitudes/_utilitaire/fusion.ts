import TJoueur from "../../types/Joueur"
import { Aptitude } from "../definition"
import { decisionTab, DUREE_FUSION } from "../../../../domain/fusion"

/** Fusion (TAB) avec un boss vaincu proche, commune aux personnages jouables. */
export const aptitudeFusion: Aptitude<TJoueur> = { nom: "fusion", action: (personnage, entree) => fusion(personnage, entree) }

export default function fusion(personnage: any, input: any) {
  const porte = personnage.bossControllable.getLength() == 1 ? personnage.bossControllable.getChildren()[0] : undefined
  const ennemiProche = porte || !input.tab ? undefined : closest(personnage, 'enemies') as TJoueur
  const room = (personnage.scene as any).room
  const decision = decisionTab({
    appui: Boolean(input.tab),
    bossPorte: porte ? { inaccessible: Boolean(room.boss[`${porte.sprite}`].inaccessible) } : undefined,
    ennemiProche: ennemiProche
      ? { distance: Phaser.Math.Distance.Between(ennemiProche.x, ennemiProche.y, personnage.x, personnage.y), vaincu: Boolean(room.boss[`${ennemiProche.sprite}`]?.vaincu) }
      : undefined,
  })
  switch (decision.type) {
    case "rien":
      if (decision.consommer) input.tab = false
      return
    case "porter":
      personnage.son = 'fusion'
      recuperationObjetBoss(ennemiProche, personnage)
      personnage.bossControllable.add(ennemiProche)
      break
    case "fusionner":
      fusionAvecBoss(porte, personnage)
      personnage.son = 'fusion2'
      break
    case "refuser":
      personnage.son = 'fusion2'
      break
  }
  input.tab = false;
}

/**
 * #### Description
 * L'ennemie se place au dessus du joueur en petit<br>
 * L'ennemie suit le joueur
 * 
 * #### Version
 * since: V1.0.0
 * 
 * Recuperations objet boss
 * @param ennemie 
 * @param joueur 
 */
function recuperationObjetBoss(ennemie: TJoueur, joueur: TJoueur) {
  ennemie.currentTarget = joueur;
  ennemie.suivre = true;
  ennemie.setScale(0.2);
}


/**
 * #### Description
 * Si la fusion avec le boss est possible, Change l'inerface coté client<br>
 * pour que l'interface (icon, commandes...) corresponde bien à celui que le joueur controlle
 * 
 * Redimensionne correctement l'ennemie et son alpha
 * Le joueur prend le controlle de l'ennemie et suit l'ennemie en petit au dessus de lui 
 * 
 * Au bout d'un certain temps l'ennemie devient innacessible au joueur
 * Le joueur reprend sa taille initial
 * L'ennemie et détruit du groupe et de colyseus
 * 
 * #### Version
 * since: V1.0.0
 * 
 * Fusions avec boss
 * @param ennemie 
 * @param joueur 
 * @returns  
 */
function fusionAvecBoss(ennemie: TJoueur, joueur: TJoueur) {
    joueur.scene.time.delayedCall(1, () => {
      joueur.changeInterfaceClient(ennemie.sprite, true);
    }, null, joueur);
    ennemie.animationBossFigurine.remove();
    ennemie.setAlpha(1);
    ennemie.body.setAllowGravity(true);
    ennemie.cible_courante = "enemies";
    ennemie.currentTarget = ennemie;
    ennemie.suivre = false;
    ennemie.setScale(1);

    joueur.currentTarget = ennemie;
    joueur.suivre = true;
    joueur.setScale(0.2);

    joueur.scene.time.delayedCall(DUREE_FUSION, () => {
      (joueur.scene as any).room.boss[`${ennemie.sprite}`].inaccessible = true;
      joueur.son = "ejection"
      joueur.suivre = false;
      (joueur.scene as any).suppressionJoueur(ennemie, true, ennemie.ClientID)
      joueur.currentTarget = joueur;
      joueur.changeInterfaceClient(joueur.sprite, true);
      joueur.setScale(1)
    }, null, joueur);
}

function closest(personnage: TJoueur, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
