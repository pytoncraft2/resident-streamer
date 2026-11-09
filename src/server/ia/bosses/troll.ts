/**
 * IA de troll (ADR-003), reprise de l'ancien `__auto`. Pièce à l'étage, à gauche ; une décision toutes les 800 ms.
 *
 *   troll : sélecteur
 *     ├─ combattre : séquence
 *     │    [cible dans ma pièce ?] → se tourner vers elle →
 *     │    sélecteur selon la distance
 *     │      ├─ [< 400] charger de 1300 px vers elle (action longue)
 *     │      ├─ [< 900] lancer une oie (aptitude A)
 *     │      └─ lancer une grenouille (aptitude Z)
 *     └─ rentrer : [une cible existe et x ≠ 427 ?] → rejoindre (427, -249) (action longue)
 *
 * Différences voulues avec l'ancien code : il cessait définitivement de décider quand la distance
 * valait exactement 400 ou 900, quand la cible avait la même abscisse que lui, ou sans aucun joueur.
 */
import { action, condition, selecteur, sequence } from "../arbre";
import { ArbreBoss, ContexteBoss, contient, distance, Point, Zone } from "../boss";

/** Pièce de troll à l'étage, à gauche (bornes exclues), reprise de l'ancien code. */
export const PIECE_TROLL: Zone = { xMax: 1789, yMax: -249 };
export const PLACE_TROLL: Point = { x: 427, y: -249 };
export const DISTANCE_CHARGE_TROLL = 1300;

const cibleAGauche = ({ perception }: ContexteBoss): boolean => (perception.cible?.position.x ?? Infinity) < perception.position.x;
const distanceCible = ({ perception }: ContexteBoss): number =>
  perception.cible ? distance(perception.position, perception.cible.position) : Infinity;

export const arbreTroll: ArbreBoss = selecteur(
  "troll",
  sequence(
    "combattre",
    condition("cible dans ma pièce", ({ perception }) => perception.cible !== undefined && contient(PIECE_TROLL, perception.cible.position)),
    action("se tourner vers la cible", (c) => c.intentions.push({ type: "orienter", versLaGauche: cibleAGauche(c) })),
    selecteur(
      "attaque selon la distance",
      sequence(
        "charger",
        condition("cible à moins de 400", (c) => distanceCible(c) < 400),
        action("charger vers la cible", (c) =>
          c.intentions.push({
            type: "charger",
            decalageX: cibleAGauche(c) ? -DISTANCE_CHARGE_TROLL : DISTANCE_CHARGE_TROLL,
            delai: 500,
            duree: 700,
            animationAuDepart: "troll_run",
            animationALaFin: "troll_idle",
          }),
        ),
      ),
      sequence(
        "oie",
        condition("cible à moins de 900", (c) => distanceCible(c) < 900),
        action("lancer une oie", (c) => c.intentions.push({ type: "aptitude", nom: "A", entree: { a: true } })),
      ),
      action("lancer une grenouille", (c) => c.intentions.push({ type: "aptitude", nom: "Z", entree: { z: true } })),
    ),
  ),
  sequence(
    "rentrer",
    condition("une cible existe et je ne suis pas à ma place", ({ perception }) => perception.cible !== undefined && perception.position.x !== PLACE_TROLL.x),
    action("rejoindre ma place", (c) =>
      c.intentions.push({ type: "rejoindre", position: PLACE_TROLL, duree: 900, animationAuDepart: "troll_idle", attendreLaFin: true }),
    ),
  ),
);
