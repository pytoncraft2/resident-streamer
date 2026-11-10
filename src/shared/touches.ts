/**
 * Touches d'action, affichées au joueur avec le nom de leur aptitude (commandes de l'interface).
 * Partagé par le registre des aptitudes (serveur) et l'état synchronisé lu par le client.
 */
export const TOUCHES_COMMANDE = ["A", "Z", "E", "R", "TAB"] as const;
export type ToucheCommande = (typeof TOUCHES_COMMANDE)[number];
