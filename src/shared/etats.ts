/**
 * États synchronisés de la room de jeu (`RoomState`, schémas Colyseus) tels que le client les lit
 * (ADR-002) : une présence par joueur ou boss, des projectiles, des lignes et des rectangles.
 *
 * Chaque entité republie son état à chaque image ; le serveur modifie l'objet synchronisé en place
 * (seuls les champs changés sont transmis). Les champs ponctuels (`son`, `particules`, `commandes`,
 * `sprite_fusion`) ne sont présents que pendant la publication où ils sont posés, et le client y
 * réagit quand ils sont présents.
 * Certaines publications sont partielles (présence à la connexion : `x`, `y` ; interface :
 * `commandes`) : d'où des champs de présence tous optionnels.
 */
import type { ToucheCommande } from "./touches";

/** Joueur, boss ou clone (`state.presences`, clé : identifiant de session ou du boss). */
export interface EtatPresence {
  readonly id?: string;
  readonly x?: number;
  readonly y?: number;
  /** Personnage (clé de l'atlas client `<sprite>_atlas`). */
  readonly sprite?: string;
  /** Nom de l'image affichée (animation en cours). */
  readonly anim?: string;
  readonly flipX?: boolean;
  readonly vie?: number;
  readonly tint?: number;
  readonly scale?: number;
  readonly alpha?: number;
  /** Position de la zone d'attaque. */
  readonly xa?: number;
  readonly ya?: number;
  /** Ponctuel : son à jouer. */
  readonly son?: string;
  /** Ponctuel : particules de défaite d'un boss. */
  readonly particules?: boolean;
  /** Ponctuel : icône du boss fusionné. */
  readonly sprite_fusion?: string;
  /** Ponctuel : noms des aptitudes de chaque touche, pour l'interface. */
  readonly commandes?: Readonly<Partial<Record<ToucheCommande, string>>>;
}

/** Projectile ou élément de décor animé (`state.projectiles`, clé : `id`). */
export interface EtatProjectile {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  /** Atlas client `<sprite>_atlas`. */
  readonly sprite: string;
  /** Image de départ dans l'atlas. */
  readonly _frame?: string;
  /** Image courante (remplace `_frame` une fois créé). */
  readonly anim?: string;
  readonly alpha?: number;
  readonly scale?: number;
  readonly flipX?: boolean;
  readonly angle?: number;
  /** Présents dans le schéma et lus par le client, mais jamais publiés aujourd'hui. */
  readonly depth?: number;
  readonly scaleX?: number;
  readonly scaleY?: number;
}

/** Ligne de visée (`state.lignes`, clé : `id`). */
export interface EtatLigne {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly couleur: number;
  readonly lineHeight: number;
  /** Champs transmis mais inutilisés par le client (valeurs fixes historiques). */
  readonly x?: number;
  readonly y?: number;
}

/** Rectangle (laser de twitchman, `state.rectangles`, clé : `id`). */
export interface EtatRectangle {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly fillColor?: number;
  readonly fillAlpha?: number;
  readonly angle?: number;
  /** Présent dans le schéma et lu par le client, mais jamais publié aujourd'hui. */
  readonly scale?: number;
}
