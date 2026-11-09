/**
 * Arbre de comportement minimal (ADR-003), indépendant de Phaser et de Colyseus.
 *
 * Un arbre est évalué à chaque « tick » de l'IA sur un contexte (perception + intentions produites).
 * Il ne modifie jamais le jeu lui-même : ses actions ajoutent des intentions, que l'exécuteur
 * (src/server/game/ia/) applique ensuite avec Phaser. On peut donc le tester avec une perception
 * fictive.
 *
 * Briques :
 * - `selecteur(...)` : essaie ses enfants dans l'ordre et s'arrête au premier qui réussit ;
 * - `sequence(...)`  : exécute ses enfants dans l'ordre et s'arrête au premier qui échoue ;
 * - `condition(test)`: réussit si le test est vrai ;
 * - `action(faire)`  : fait quelque chose (ajouter une intention) et réussit.
 */

export type Statut = "succes" | "echec";

export interface Noeud<C> {
  /** Nom affichable, pour le débogage et la lecture d'un arbre. */
  readonly nom: string;
  evaluer(contexte: C): Statut;
}

export function selecteur<C>(nom: string, ...enfants: Noeud<C>[]): Noeud<C> {
  return {
    nom,
    evaluer: (contexte) => (enfants.some((enfant) => enfant.evaluer(contexte) === "succes") ? "succes" : "echec"),
  };
}

export function sequence<C>(nom: string, ...enfants: Noeud<C>[]): Noeud<C> {
  return {
    nom,
    evaluer: (contexte) => (enfants.every((enfant) => enfant.evaluer(contexte) === "succes") ? "succes" : "echec"),
  };
}

export function condition<C>(nom: string, test: (contexte: C) => boolean): Noeud<C> {
  return { nom, evaluer: (contexte) => (test(contexte) ? "succes" : "echec") };
}

export function action<C>(nom: string, faire: (contexte: C) => void): Noeud<C> {
  return {
    nom,
    evaluer: (contexte) => {
      faire(contexte);
      return "succes";
    },
  };
}
