/**
 * IA de boss_1 (pilote de l'ADR-003), reprise à l'identique de l'ancien `__auto` :
 * le joueur le plus proche dans sa pièce → il fonce vers lui ; sinon il rejoint sa place.
 *
 *   boss_1 : sélecteur
 *     ├─ séquence « chasser » : [cible dans ma pièce ?] → poursuivre (vitesse 800)
 *     └─ séquence « rentrer » : [une cible existe et je ne suis pas à x = 5010 ?] → rejoindre (5010, 755) en 500 ms
 */
import { action, condition, selecteur, sequence } from "../arbre";
import { ArbreBoss, contient, Point, Zone } from "../boss";

/** Pièce de boss_1 au rez-de-chaussée (bornes exclues), reprise de l'ancien code. */
export const PIECE_BOSS_1: Zone = { xMin: 3802, xMax: 5627, yMin: -249 };
export const PLACE_BOSS_1: Point = { x: 5010, y: 755 };

export const arbreBoss1: ArbreBoss = selecteur(
  "boss_1",
  sequence(
    "chasser",
    condition("cible dans ma pièce", ({ perception }) => perception.cible !== undefined && contient(PIECE_BOSS_1, perception.cible.position)),
    action("poursuivre", ({ intentions }) => intentions.push({ type: "poursuivre", vitesse: 800, animation: "deplacement" })),
  ),
  sequence(
    "rentrer",
    // Comme l'ancien code : sans aucun joueur, le boss ne bouge pas ; il ne compare que x à sa place.
    condition("une cible existe et je ne suis pas à ma place", ({ perception }) => perception.cible !== undefined && perception.position.x !== PLACE_BOSS_1.x),
    action("rejoindre ma place", ({ intentions }) => intentions.push({ type: "rejoindre", position: PLACE_BOSS_1, duree: 500 })),
  ),
);
