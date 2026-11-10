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
 *
 * Trace (débogage) : si le contexte porte une `trace` (`TraceArbre`), chaque nœud évalué y ajoute
 * une ligne, indentée selon sa profondeur, avec son résultat : ✔ succès, ✘ échec, ⏳ en recharge.
 */

export type Statut = "succes" | "echec";

/** Trace des nœuds évalués, remplie seulement si le contexte en porte une. */
export interface TraceArbre {
  readonly lignes: string[];
  profondeur: number;
}

const SYMBOLES: Readonly<Record<Statut, string>> = { succes: "✔", echec: "✘" };

function traceDe(contexte: unknown): TraceArbre | undefined {
  if (typeof contexte !== "object" || contexte === null || !("trace" in contexte)) return undefined;
  const trace = contexte.trace;
  if (typeof trace !== "object" || trace === null || !("lignes" in trace) || !Array.isArray(trace.lignes)) return undefined;
  if (!("profondeur" in trace) || typeof trace.profondeur !== "number") return undefined;
  // Forme vérifiée ci-dessus (lignes : tableau, profondeur : nombre).
  return trace as TraceArbre;
}

/** Évalue un nœud en le notant dans la trace : ligne réservée avant ses enfants, complétée après. */
function tracer<C>(contexte: C, nom: string, evaluer: () => Statut | "recharge"): Statut {
  const trace = traceDe(contexte);
  if (!trace) {
    const statut = evaluer();
    return statut === "recharge" ? "echec" : statut;
  }
  const indice = trace.lignes.length;
  const retrait = "  ".repeat(trace.profondeur);
  trace.lignes.push("");
  trace.profondeur++;
  const statut = evaluer();
  trace.profondeur--;
  trace.lignes[indice] = `${retrait}${nom} ${statut === "recharge" ? "⏳" : SYMBOLES[statut]}`;
  return statut === "recharge" ? "echec" : statut;
}

export interface Noeud<C> {
  /** Nom affichable, pour le débogage et la lecture d'un arbre. */
  readonly nom: string;
  evaluer(contexte: C): Statut;
}

export function selecteur<C>(nom: string, ...enfants: Noeud<C>[]): Noeud<C> {
  return {
    nom,
    evaluer: (contexte) =>
      tracer(contexte, nom, () => (enfants.some((enfant) => enfant.evaluer(contexte) === "succes") ? "succes" : "echec")),
  };
}

export function sequence<C>(nom: string, ...enfants: Noeud<C>[]): Noeud<C> {
  return {
    nom,
    evaluer: (contexte) =>
      tracer(contexte, nom, () => (enfants.every((enfant) => enfant.evaluer(contexte) === "succes") ? "succes" : "echec")),
  };
}

export function condition<C>(nom: string, test: (contexte: C) => boolean): Noeud<C> {
  return { nom, evaluer: (contexte) => tracer(contexte, nom, () => (test(contexte) ? "succes" : "echec")) };
}

export function action<C>(nom: string, faire: (contexte: C) => void): Noeud<C> {
  return {
    nom,
    evaluer: (contexte) =>
      tracer(contexte, nom, () => {
        faire(contexte);
        return "succes";
      }),
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
    evaluer: (contexte) =>
      tracer(contexte, nom, () => {
        const dernier = contexte.memoire.get(nom);
        if (dernier !== undefined && contexte.temps - dernier < ms) return "recharge";
        const statut = enfant.evaluer(contexte);
        if (statut === "succes") contexte.memoire.set(nom, contexte.temps);
        return statut;
      }),
  };
}
