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

/** Vie maximale d'un personnage (valeur de départ de `PlayerClass.vie`). */
export const VIE_MAX = 10;

/**
 * Points de vie après un soin : plafonnés à `vieMax` (intentions §2). Une vie déjà au-dessus
 * du plafond n'est pas réduite ; un soin négatif ou NaN est ignoré.
 */
export function vieApresSoin(vie: number, soin: number, vieMax: number = VIE_MAX): number {
  if (!(soin > 0) || vie >= vieMax) return vie;
  return Math.min(vie + soin, vieMax);
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

/** Attaquant au contact (zone d'attaque devant lui). */
export interface AttaquantContact {
  /** Son animation en est à l'image où le coup porte (`imageQuiBlesse`). */
  readonly blesse: boolean;
  /** Il soigne (osmosiscoop maintient son soin). */
  readonly soigne: boolean;
  readonly degat: number;
  readonly campVise: Camp;
  readonly sprite: string;
}

/** Entité dans la zone d'attaque. */
export interface CibleContact {
  /** Boss final sur son trône : ignoré, sans consommer le coup (qui reste pour le trône). */
  readonly invulnerable: boolean;
  /** Elle peut recevoir des dégâts (méthode `dommage`). */
  readonly blessable: boolean;
  readonly vie: number;
  readonly sprite: string;
  readonly camp: Camp | undefined;
  /** Elle vise les ennemis : un joueur, ou un boss contrôlé par un joueur après une fusion. */
  readonly estJoueur: boolean;
}

export type EffetContact =
  | { readonly type: "aucun" }
  | { readonly type: "dommage"; readonly puissance: number }
  /** Cible déjà à 0 : remise à 10 points de vie (comportement historique), son « game-over » pour un joueur. */
  | { readonly type: "relever"; readonly vie: number; readonly sonGameOver: boolean };

export interface ResultatContact {
  /** Rien ne se passe (cible invulnérable) : ni coup consommé, ni soin. */
  readonly ignore: boolean;
  /** Le coup est consommé (une seule cible par coup). */
  readonly consommeCoup: boolean;
  readonly effet: EffetContact;
  /** Soin à appliquer après l'effet (`vieApresSoin`, 0,01 par image). */
  readonly soin: boolean;
}

/** Vie rendue à une cible frappée alors qu'elle est déjà à 0 (comportement historique). */
export const VIE_RELEVEE = VIE_MAX;

/**
 * Résultat d'un contact entre une zone d'attaque et une entité (règle de `PlayerClass`, zone
 * d'interaction) : pas de tir ami (`peutBlesser`), soin réservé aux alliés (`peutSoigner`).
 */
export function resoudreContact(attaquant: AttaquantContact, cible: CibleContact): ResultatContact {
  if (cible.invulnerable) return { ignore: true, consommeCoup: false, effet: { type: "aucun" }, soin: false };
  let effet: EffetContact = { type: "aucun" };
  if (attaquant.blesse && cible.blessable && cible.sprite !== attaquant.sprite && peutBlesser(attaquant.campVise, cible.camp)) {
    effet = cible.vie <= 0
      ? { type: "relever", vie: VIE_RELEVEE, sonGameOver: cible.estJoueur }
      : { type: "dommage", puissance: attaquant.degat };
  }
  return {
    ignore: false,
    consommeCoup: attaquant.blesse,
    effet,
    soin: attaquant.soigne && peutSoigner(attaquant.campVise, cible.camp),
  };
}
