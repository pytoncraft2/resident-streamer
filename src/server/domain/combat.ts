/**
 * Règles de combat, indépendantes de Phaser et de Colyseus.
 */

/**
 * Points de vie après un coup de puissance donnée.
 * Une puissance négative (ou NaN) est ignorée ; la vie peut devenir négative.
 */
export function vieApresDommage(vie: number, puissance: number): number {
  return puissance >= 0 ? vie - puissance : vie;
}

/** Groupe de la scène serveur auquel appartient une entité : joueurs ou boss. */
export type Camp = "players" | "enemies";

/**
 * Une attaque ne blesse que les entités du groupe visé par l'attaquant (`cible_courante`) :
 * pas de tir ami entre joueurs (intentions §2). Cible hors des deux groupes : jamais blessée.
 */
export function peutBlesser(campVise: Camp, campCible: Camp | undefined): boolean {
  return campCible === campVise;
}

/** Le soin ne s'applique qu'aux alliés : les entités qui ne sont pas dans le groupe visé (intentions §2). */
export function peutSoigner(campVise: Camp, campCible: Camp | undefined): boolean {
  return campCible !== undefined && campCible !== campVise;
}
