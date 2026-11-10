/**
 * Registre des aptitudes : une entrée par personnage (jouable ou boss), construite à partir de la
 * définition typée exportée par chaque fichier `Aptitudes/<personnage>.ts` (`definition.ts`).
 *
 * Ajouter un personnage jouable : l'ajouter au catalogue partagé (`src/shared/personnages.ts`),
 * créer son fichier (`export default definirPersonnage({ … })`) et l'ajouter à `PERSONNAGES`
 * ci-dessous (TypeScript le réclame). Son nom sert aussi de clé à ses images côté client.
 *
 * @example
 * Activer l'aptitude de la touche A de fakhear :
 * ```
 * Aptitudes['fakhear'].A(sprite, { a: true })
 * ```
 */
import TJoueur from "../types/Joueur";
import { PersonnageJouable } from "../../../../shared/personnages";
import { BOSS_FINAL, BOSS_PRINCIPAUX } from "../../../domain/progression";
import { construireRegistre, DefinitionPersonnage, RegistreAptitudes } from "./definition";
import { DEPLACEMENTS_PAR_DEFAUT } from "../Stats/Defaut";
import akhizonah from "./akhizonah";
import fakhear from "./fakhear";
import huzounet from "./huzounet";
import osmosiscoop from "./osmosiscoop";
import boss_1 from "./boss_1";
import manette from "./manette";
import troll from "./troll";
import twitchman from "./twitchman";
import super_boss from "./super_boss";

type NomPersonnage = PersonnageJouable | (typeof BOSS_PRINCIPAUX)[number] | typeof BOSS_FINAL;

/**
 * Personnages du jeu : les 4 jouables (catalogue partagé `src/shared/personnages.ts`) puis les 5 boss
 * (`domain/progression.ts`). TypeScript exige une définition pour chacun, et rien d'autre.
 */
export const PERSONNAGES: Readonly<Record<NomPersonnage, DefinitionPersonnage<TJoueur>>> = {
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
 * aptitudes envoyés au client (`commandes`), avec les stats et déplacements de chacun. Construit au
 * chargement, de façon synchrone ; plus rien n'y est écrit ensuite.
 */
export const Aptitudes: Touches = construireRegistre(PERSONNAGES, DEPLACEMENTS_PAR_DEFAUT);
