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
  @type("string") sprite?: string
  @type("string") anim?: string
  @type("boolean") flipX?: boolean
  @type("boolean") particules?: boolean;
  @type("number") vie?: number
  @type("number") tint?: number
  @type("number") scale?: number;
  @type("number") xa?: number
  @type("number") ya?: number
}

export class RoomState extends Schema {
  //@ts-ignore
  @type({ map: Player }) presences = new MapSchema<Player>()
  @type({ map: Projectile }) projectiles = new MapSchema<Projectile>()
}
