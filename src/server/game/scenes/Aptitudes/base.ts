/**
 * Registre des aptitudes : une entrée par personnage (jouable ou boss), construite à partir de la
 * définition typée exportée par chaque fichier `Aptitudes/<personnage>.ts` (`definition.ts`).
 *
 * Ajouter un personnage : créer son fichier (`export default definirPersonnage({ … })`) et l'ajouter
 * à `PERSONNAGES` ci-dessous. La clé est son nom (`sprite`), qui sert aussi aux images côté client.
 *
 * @example
 * Activer l'aptitude de la touche A de fakhear :
 * ```
 * Aptitudes['fakhear'].A(sprite, { a: true })
 * ```
 */
import TJoueur from "../types/Joueur";
import { construireRegistre, DefinitionPersonnage, RegistreAptitudes } from "./definition";
import akhizonah from "./akhizonah";
import fakhear from "./fakhear";
import huzounet from "./huzounet";
import osmosiscoop from "./osmosiscoop";
import boss_1 from "./boss_1";
import manette from "./manette";
import troll from "./troll";
import twitchman from "./twitchman";
import super_boss from "./super_boss";

/** Personnages du jeu : les 4 jouables puis les 5 boss. */
export const PERSONNAGES: Readonly<Record<string, DefinitionPersonnage<TJoueur>>> = {
  akhizonah,
  fakhear,
  huzounet,
  osmosiscoop,
  boss_1,
  manette,
  troll,
  twitchman,
  super_boss,
};

/** Forme historique du registre, lue par `PlayerClass` et les réglages des personnages. */
export type Touches = RegistreAptitudes<TJoueur>;

/**
 * Stockage des touches qui activent les aptitudes de chaque personnage, et des noms de ces
 * aptitudes envoyés au client (`commandes`). Construit au chargement, de façon synchrone.
 */
export const Aptitudes: Touches = construireRegistre(PERSONNAGES);
