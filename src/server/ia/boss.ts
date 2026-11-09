/**
 * Vocabulaire commun aux IA de boss (ADR-003) : ce qu'un boss perçoit, et les intentions
 * qu'il peut produire. Aucune dépendance à Phaser.
 */
import { Noeud } from "./arbre";

export interface Point {
  readonly x: number;
  readonly y: number;
}

/** Zone rectangulaire de la carte ; une borne absente n'est pas limitée. Bornes strictes. */
export interface Zone {
  readonly xMin?: number;
  readonly xMax?: number;
  readonly yMin?: number;
  readonly yMax?: number;
}

export function contient(zone: Zone, point: Point): boolean {
  return (
    (zone.xMin === undefined || point.x > zone.xMin) &&
    (zone.xMax === undefined || point.x < zone.xMax) &&
    (zone.yMin === undefined || point.y > zone.yMin) &&
    (zone.yMax === undefined || point.y < zone.yMax)
  );
}

/** Ce que le boss perçoit à chaque tick. */
export interface PerceptionBoss {
  readonly position: Point;
  /** Joueur le plus proche, s'il y en a un. */
  readonly cible?: { readonly position: Point };
}

/** Ce que le boss veut faire ; appliqué par l'exécuteur Phaser. */
export type Intention =
  /** Foncer vers la cible à cette vitesse, en jouant cette animation. */
  | { readonly type: "poursuivre"; readonly vitesse: number; readonly animation: string }
  /** Rejoindre ce point en `duree` ms. */
  | { readonly type: "rejoindre"; readonly position: Point; readonly duree: number };

export interface ContexteBoss {
  readonly perception: PerceptionBoss;
  readonly intentions: Intention[];
}

export type ArbreBoss = Noeud<ContexteBoss>;

/** Évalue l'arbre sur une perception et renvoie les intentions produites. */
export function decider(arbre: ArbreBoss, perception: PerceptionBoss): Intention[] {
  const contexte: ContexteBoss = { perception, intentions: [] };
  arbre.evaluer(contexte);
  return contexte.intentions;
}
