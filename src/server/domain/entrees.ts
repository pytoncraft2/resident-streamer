/**
 * Entrées des joueurs, calculées par le serveur (autorité serveur) : le client n'envoie un message
 * `inputs` que lorsque l'état d'une touche change, mais il renvoie alors l'état complet ; une touche
 * maintenue réapparaît donc à `true` à chaque changement d'une autre touche. Le front montant permet
 * de déclencher une aptitude une seule fois par appui (anomalie B7).
 */

/** Touches d'action pour lesquelles un front montant `<touche>_debut` est calculé. */
export const TOUCHES_ACTION = ["a", "z", "e", "r", "tab"] as const;
export type ToucheAction = (typeof TOUCHES_ACTION)[number];

export type FrontsMontants = Record<`${ToucheAction}_debut`, boolean>;

/** État des touches tel que reçu ; les valeurs non booléennes comptent comme relâchées. */
export type EtatTouches = Readonly<Partial<Record<string, unknown>>>;

/**
 * `<touche>_debut` vaut `true` si la touche est enfoncée dans `actuel` sans l'être dans `precedent`.
 * Sans état précédent (premier message), toute touche enfoncée est un nouvel appui.
 */
export function frontsMontants(precedent: EtatTouches | undefined, actuel: EtatTouches): FrontsMontants {
  const fronts = {} as FrontsMontants;
  for (const touche of TOUCHES_ACTION) {
    fronts[`${touche}_debut`] = actuel[touche] === true && precedent?.[touche] !== true;
  }
  return fronts;
}

/**
 * Clavier d'un joueur après réception d'un message : l'état reçu, complété par les fronts montants
 * calculés ici. Les éventuels `<touche>_debut` envoyés par le client sont écrasés.
 */
export function clavierRecu(precedent: EtatTouches | undefined, recu: EtatTouches): Record<string, unknown> {
  return { ...recu, ...frontsMontants(precedent, recu) };
}
