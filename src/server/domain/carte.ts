/**
 * Carte du niveau (indépendante de Phaser) : deux niveaux de trois pièces, séparés par des murs
 * verticaux et par le plancher de l'étage. Repère Phaser : x vers la droite, y vers le bas (l'étage
 * a des y plus petits que le rez-de-chaussée).
 *
 *   étage (y < -249)            troll      | super_boss (centre)  | manette
 *   rez-de-chaussée (y > -249)  twitchman  | hall (départ)        | boss_1
 *                               x < 1789     1789 < x < 3802        3802 < x < 5627
 *
 * Bornes strictes (`contient`) : un point exactement sur un mur ou sur le plancher n'est dans
 * aucune pièce.
 */
import type { Point, Zone } from "../ia/boss";

/** Murs verticaux entre les pièces, et fin de la carte à droite. */
export const MURS = { gauche: 1789, droite: 3802, fin: 5627 } as const;

/** Plancher de l'étage : en dessous (y > -249) le rez-de-chaussée, au-dessus (y < -249) l'étage. */
export const PLANCHER_ETAGE = -249;

export type NomPiece = "twitchman" | "hall" | "boss_1" | "troll" | "super_boss" | "manette";

/** Pièces, nommées d'après leur occupant (le hall n'a pas de boss : départ des joueurs). */
export const PIECES: Readonly<Record<NomPiece, Zone>> = {
  twitchman: { xMax: MURS.gauche, yMin: PLANCHER_ETAGE },
  hall: { xMin: MURS.gauche, xMax: MURS.droite, yMin: PLANCHER_ETAGE },
  boss_1: { xMin: MURS.droite, xMax: MURS.fin, yMin: PLANCHER_ETAGE },
  troll: { xMax: MURS.gauche, yMax: PLANCHER_ETAGE },
  super_boss: { xMin: MURS.gauche, xMax: MURS.droite, yMax: PLANCHER_ETAGE },
  manette: { xMin: MURS.droite, xMax: MURS.fin, yMax: PLANCHER_ETAGE },
};

export type NomBossCarte = Exclude<NomPiece, "hall">;

/**
 * Places des boss principaux : là où ils retournent quand aucun joueur n'est dans leur pièce.
 * À l'étage, la place est sur le plancher (y = -249). Le boss final n'a pas de place (trône, vol).
 */
export const PLACES: Readonly<Record<Exclude<NomBossCarte, "super_boss">, Point>> = {
  twitchman: { x: 427, y: 755 },
  boss_1: { x: 5010, y: 755 },
  troll: { x: 427, y: PLANCHER_ETAGE },
  manette: { x: 4800, y: PLANCHER_ETAGE },
};

/** Points d'apparition des boss (au-dessus du sol de leur pièce, ils tombent à leur création). */
export const APPARITIONS_BOSS: Readonly<Record<NomBossCarte, Point>> = {
  super_boss: { x: 2830, y: -900 },
  twitchman: { x: 1000, y: -200 },
  boss_1: { x: 4800, y: -200 },
  manette: { x: 4800, y: -900 },
  troll: { x: 1000, y: -1000 },
};

/** Apparition d'un joueur au début de la partie, puis réapparition après une mort (dans le hall). */
export const APPARITION_JOUEUR: Point = { x: 2830, y: 700 };
export const REAPPARITION_JOUEUR: Point = { x: 2830, y: 755 };
