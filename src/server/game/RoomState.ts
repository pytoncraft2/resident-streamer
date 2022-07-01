//@ts-nocheck

/**
 * Schema Colyseus
 */
import {
  Schema,
  MapSchema,
  type,
} from "@colyseus/schema"

export class Projectile extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") alpha?: number;
  @type("string") id?: string;
  @type("string") anim?: string
  @type("number") scale?: number;
  @type("number") scaleX?: number;
  @type("number") scaleY?: number;
  @type("boolean") active?: boolean;
  @type("boolean") flipX?: boolean;
  @type("boolean") explosion?: boolean;
  @type("boolean") laser?: boolean;
  @type("number") depth?: number;
  @type("number") angle?: number;
  @type("string") sprite?: string;
  @type("string") _frame?: string;
}

export class Player extends Schema {
  @type("number") x?: number
  @type("number") y?: number
  @type("string") id?: string;
  @type("string") sprite?: string
  @type("string") anim?: string
  @type("boolean") flipX?: boolean
  @type("boolean") particules?: boolean;
  @type("number") vie?: number
  @type("number") tint?: number
  @type("number") scale?: number;
  @type("number") alpha?: number;
  @type("number") xa?: number
  @type("number") ya?: number
  @type("string") sprite_fusion?: string
}

export class Ligne extends Schema {
  @type("number") x?: number
  @type("number") y?: number
  @type("number") x1?: string
  @type("number") y1?: string
  @type("number") x2?: boolean
  @type("number") y2?: boolean;
  @type("number") strokeColor?: number
  @type("number") strokeAlpha?: number
  @type("number") couleur?: number
  @type("number") lineHeight?: number
}

export class Rectangle extends Schema {
  @type("number") x?: number
  @type("number") y?: number
  @type("number") fillColor?: number;
  @type("number") fillAlpha?: number;
  @type("number") width?: number;
  @type("number") height?: number;
  @type("number") angle?: number;
}

export class Compteur extends Schema {
  @type("number") temps?: number
}


export class RoomState extends Schema {
  //@ts-ignore
  @type({ map: Player }) presences = new MapSchema<Player>()
  @type({ map: Projectile }) projectiles = new MapSchema<Projectile>()
  @type({ map: Ligne }) lignes = new MapSchema<Ligne>()
  @type({ map: Rectangle }) rectangles = new MapSchema<Rectangle>()
  @type("number") compteur: number;
}
