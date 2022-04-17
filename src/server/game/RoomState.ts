//@ts-nocheck

/**
 * Schema Colyseus
 */
import {
  Schema,
  MapSchema,
  type,
} from "@colyseus/schema"

export class Ennemy extends Schema {
  @type("number") x?: number
  @type("number") y?: number
  @type("string") sprite?: string
  @type("string") anim?: string
  @type("boolean") flipX?: boolean
  @type("number") vie?: number
}

export class Boule extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") scale: number;
}

export class ZoneAttaque extends Schema {
    @type("number") x: number = 1;
    @type("number") y: number = 2;
}

export class Player extends Schema {
  @type("number") x?: number
  @type("number") y?: number
  @type("string") sprite?: string
  @type("string") anim?: string
  @type("boolean") flipX?: boolean
  @type("number") vie?: number
  @type("number") tint?: number
  @type("number") xa?: number
  @type("number") ya?: number
}



// class MyState extends Schema {
//     @type(ZoneAttaque) zoneAttaque: ZoneAttaque = new ZoneAttaque();
// }

export class Input extends Schema {
  @type("boolean") left: boolean = false
  @type("boolean") right: boolean = false
  @type("boolean") up: boolean = false
  @type("boolean") down: boolean = false
  @type("boolean") space: boolean = false
  @type("boolean") a: boolean = false
  @type("boolean") z: boolean = false
  @type("boolean") e: boolean = false
}

export class RoomState extends Schema {
  //@ts-ignore
  @type({ map: Player }) presences = new MapSchema<Player>()
  @type({ map: Boule }) boules = new MapSchema<Boule>()
  @type({ map: Input }) playerInputs = new MapSchema<Input>()
}
