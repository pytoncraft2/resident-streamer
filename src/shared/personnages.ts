/**
 * Catalogue des personnages jouables, partagé par le client (lobby) et le serveur (validation à la
 * connexion, registre des aptitudes). Module pur, sans dépendance : voir ADR-002.
 *
 * Le nom d'un personnage est aussi la clé de ses ressources : atlas `<nom>_atlas` (asset pack du
 * client), icône `icon_<nom>` (`icons_atlas`), fichier `src/server/game/scenes/Aptitudes/<nom>.ts`.
 */

/** Personnages jouables, dans l'ordre de défilement du lobby. */
export const PERSONNAGES_JOUABLES = ["fakhear", "akhizonah", "huzounet", "osmosiscoop"] as const;

export type PersonnageJouable = (typeof PERSONNAGES_JOUABLES)[number];

export function estPersonnageJouable(nom: unknown): nom is PersonnageJouable {
  return typeof nom === "string" && (PERSONNAGES_JOUABLES as readonly string[]).includes(nom);
}
