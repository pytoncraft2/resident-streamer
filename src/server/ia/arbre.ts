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
 * - `action(faire)`  : fait quelque chose (ajouter une intention) et réussit ;
 * - `recharge(nom, ms, enfant)` : n'évalue son enfant qu'une fois toutes les `ms` millisecondes
 *   (mémoire et heure fournies par le contexte, propres à chaque boss).
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

/** Contexte requis par `recharge` : l'heure courante et une mémoire propre à l'entité pilotée. */
export interface ContexteRecharge {
  readonly temps: number;
  readonly memoire: Map<string, number>;
}

/**
 * Recharge : échoue sans évaluer son enfant si moins de `ms` millisecondes se sont écoulées depuis
 * le dernier succès de cet enfant ; sinon évalue l'enfant et, s'il réussit, mémorise l'heure.
 */
export function recharge<C extends ContexteRecharge>(nom: string, ms: number, enfant: Noeud<C>): Noeud<C> {
  return {
    nom,
    evaluer: (contexte) => {
      const dernier = contexte.memoire.get(nom);
      if (dernier !== undefined && contexte.temps - dernier < ms) return "echec";
      const statut = enfant.evaluer(contexte);
      if (statut === "succes") contexte.memoire.set(nom, contexte.temps);
      return statut;
    },
  };
}
