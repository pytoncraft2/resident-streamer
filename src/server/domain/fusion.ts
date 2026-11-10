/**
 * Fusion (TAB) avec un boss vaincu (intentions §1), indépendante de Phaser. Cycle d'un joueur :
 *
 *   seul ──[TAB, boss vaincu à moins de PORTEE_FUSION]──▶ porte le boss (réduit, au-dessus de lui)
 *        ──[TAB]──▶ fusionné : il pilote le boss pendant DUREE_FUSION ms, puis le boss disparaît
 *
 * Les effets (échelles, suivi, interface, suppression du boss) restent dans
 * `Aptitudes/_utilitaire/fusion.ts` ; ce module décide seulement quoi faire d'un appui sur TAB.
 */

/** Distance maximale (exclue) entre le joueur et le boss vaincu pour le porter, en px. */
export const PORTEE_FUSION = 270;

/** Durée d'une fusion, en ms : ensuite le boss devient inaccessible et disparaît. */
export const DUREE_FUSION = 5000;

export interface SituationTab {
  /** TAB enfoncé. */
  readonly appui: boolean;
  /** Boss porté par le joueur (au plus un), avec son accessibilité. */
  readonly bossPorte?: { readonly inaccessible: boolean };
  /** Ennemi le plus proche, s'il y en a un. */
  readonly ennemiProche?: { readonly distance: number; readonly vaincu: boolean };
}

export type DecisionTab =
  /** Rien ; `consommer` : l'appui est marqué traité (sinon il sera réévalué tant que TAB est enfoncé). */
  | { readonly type: "rien"; readonly consommer: boolean }
  /** Porter l'ennemi proche (son « fusion »). */
  | { readonly type: "porter" }
  /** Fusionner avec le boss porté (son « fusion2 »). */
  | { readonly type: "fusionner" }
  /** Boss porté devenu inaccessible : seul le son « fusion2 » est joué (comportement historique). */
  | { readonly type: "refuser" };

export function decisionTab(situation: SituationTab): DecisionTab {
  if (!situation.appui) return { type: "rien", consommer: false };
  if (situation.bossPorte) return situation.bossPorte.inaccessible ? { type: "refuser" } : { type: "fusionner" };
  const proche = situation.ennemiProche;
  // Aucun ennemi : l'appui n'est pas consommé (comportement historique).
  if (!proche) return { type: "rien", consommer: false };
  if (proche.distance < PORTEE_FUSION && proche.vaincu) return { type: "porter" };
  return { type: "rien", consommer: true };
}
