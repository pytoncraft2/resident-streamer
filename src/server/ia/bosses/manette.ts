/**
 * IA de manette (ADR-003), reprise de l'ancien `__auto`. Pièce à l'étage, au-dessus de celle de boss_1.
 *
 *   manette : sélecteur
 *     ├─ combattre : séquence
 *     │    [cible dans ma pièce ?] → se tourner vers elle →
 *     │    sélecteur selon la distance
 *     │      ├─ [< 400] frapper, puis s'envoler vers le coin de son côté (action longue)
 *     │      ├─ [< 900] lancer la manette (aptitude Z)
 *     │      └─ avancer vers elle (vitesse 340)
 *     └─ rentrer : [une cible existe et x ≠ 4800 ?] → voler jusqu'à (4800, -249) (action longue)
 *
 * Différences voulues avec l'ancien code : il cessait définitivement de décider quand la distance
 * valait exactement 400 ou 900, quand la cible avait la même abscisse que lui, ou sans aucun joueur.
 */
import { PIECES, PLACES } from "../../domain/carte";
import { action, condition, selecteur, sequence } from "../arbre";
import { ArbreBoss, ContexteBoss, contient, distance, Point, Zone } from "../boss";

/** Pièce de manette à l'étage (bornes exclues), reprise de l'ancien code. */
export const PIECE_MANETTE: Zone = PIECES.manette;
export const PLACE_MANETTE: Point = PLACES.manette;
/** Coins vers lesquels manette s'envole après avoir frappé, selon le côté de la cible. */
export const COINS_MANETTE = { gauche: { x: 3970, y: -950 }, droite: { x: 5337, y: -950 } } as const;

const cibleAGauche = ({ perception }: ContexteBoss): boolean => (perception.cible?.position.x ?? Infinity) < perception.position.x;
const distanceCible = ({ perception }: ContexteBoss): number =>
  perception.cible ? distance(perception.position, perception.cible.position) : Infinity;

export const arbreManette: ArbreBoss = selecteur(
  "manette",
  sequence(
    "combattre",
    condition("cible dans ma pièce", ({ perception }) => perception.cible !== undefined && contient(PIECE_MANETTE, perception.cible.position)),
    action("se tourner vers la cible", (c) => c.intentions.push({ type: "orienter", versLaGauche: cibleAGauche(c) })),
    selecteur(
      "attaque selon la distance",
      sequence(
        "frapper puis s'envoler",
        condition("cible à moins de 400", (c) => distanceCible(c) < 400),
        action("frapper et s'envoler vers le coin", (c) => {
          c.intentions.push({ type: "animation", nom: "manette_punch" });
          c.intentions.push({
            type: "rejoindre",
            position: cibleAGauche(c) ? COINS_MANETTE.gauche : COINS_MANETTE.droite,
            delai: 500,
            duree: 1000,
            courbe: "Sine.inOut",
            animationAuDepart: "manette_vole",
            attendreLaFin: true,
          });
        }),
      ),
      sequence(
        "lancer",
        condition("cible à moins de 900", (c) => distanceCible(c) < 900),
        action("lancer la manette", (c) => c.intentions.push({ type: "aptitude", nom: "Z", entree: { z: true } })),
      ),
      action("avancer vers la cible", (c) => {
        const gauche = cibleAGauche(c);
        c.intentions.push({ type: "vitesseX", valeur: gauche ? -340 : 340 });
        c.intentions.push({ type: "aptitude", nom: gauche ? "toucheGauche" : "toucheDroite", entree: gauche ? { left_debut: true } : { right_debut: true } });
      }),
    ),
  ),
  sequence(
    "rentrer",
    condition("une cible existe et je ne suis pas à ma place", ({ perception }) => perception.cible !== undefined && perception.position.x !== PLACE_MANETTE.x),
    action("voler jusqu'à ma place", (c) =>
      c.intentions.push({ type: "rejoindre", position: PLACE_MANETTE, duree: 900, animationAuDepart: "manette_vole", attendreLaFin: true }),
    ),
  ),
);
