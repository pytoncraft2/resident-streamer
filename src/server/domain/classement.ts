/**
 * Règles du classement (fichier scores.json), indépendantes d'Express et du stockage.
 */

export interface EntreeClassement {
  /** Liste des joueurs telle qu'envoyée par le client : non validée (anomalie B3). */
  readonly joueurs: unknown;
  /** Temps au format `HH:MM:SS`. */
  readonly score: string;
}

/** Clé : nom d'équipe. */
export type Classement = Readonly<Record<string, EntreeClassement>>;

/**
 * Nom d'équipe affiché au classement : `EQUIPE <PREMIER PERSONNAGE> <0-99>`,
 * format historiquement généré par le client (Jeu.ts), désormais par le serveur.
 *
 * @param tirage nombre dans [0, 1[ (Math.random en production)
 */
export function nommerEquipe(personnages: readonly string[], tirage: number): string {
  const premier = personnages[0]?.toUpperCase() ?? "SANS JOUEUR";
  return `EQUIPE ${premier} ${Math.floor(tirage * 100)}`;
}

/** `"00:01:42"` → 142 : clé de tri obtenue en retirant les `:`. */
const cleDeTri = (score: string): number => parseInt(score.replace(/:/g, ""));

/**
 * Ajoute (ou remplace) le score d'une équipe et renvoie le classement trié par temps croissant.
 *
 * Comportement historique conservé :
 * - une équipe déjà présente est écrasée, même si son nouveau temps est moins bon ;
 * - `equipe` et `score` sont convertis en chaîne sans validation ;
 * - les noms d'équipe ressemblant à un entier (ex. `"42"`) passent en tête,
 *   par ordre numérique, quel que soit leur temps (ordre des clés des objets JS).
 */
export function ajouterScore(classement: Classement, equipe: unknown, joueurs: unknown, score: unknown): Classement {
  const complet: Record<string, EntreeClassement> = { ...classement };
  complet[`${equipe}`] = { joueurs, score: `${score}` };
  const tries = Object.entries(complet).sort(([, a], [, b]) => cleDeTri(a.score) - cleDeTri(b.score));
  return Object.fromEntries(tries);
}
