/**
 * Écran de départ selon l'URL (`Level`) : `/<salon>?p=<personnage>` rejoint directement la partie
 * avec ce personnage, `/<salon>` ouvre le lobby du salon, `/` l'accueil. Module pur, testé.
 */
import { estPersonnageJouable, PersonnageJouable } from "../../shared/personnages";

export type Destination =
  | { readonly ecran: "accueil" }
  | { readonly ecran: "Lobby"; readonly salon: string }
  | { readonly ecran: "Jeu"; readonly salon: string; readonly personnage: PersonnageJouable };

/**
 * Un personnage inconnu dans `?p=` mène au lobby (où le joueur choisit) plutôt qu'en jeu, où le
 * serveur refuserait la connexion.
 */
export function destinationDepuisUrl(salon: string, personnage: string | null): Destination {
  if (salon === "") return { ecran: "accueil" };
  if (estPersonnageJouable(personnage)) return { ecran: "Jeu", salon, personnage };
  return { ecran: "Lobby", salon };
}
