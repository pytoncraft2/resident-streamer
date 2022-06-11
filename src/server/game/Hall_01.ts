//@ts-nocheck

import "@geckos.io/phaser-on-nodejs"
import { Room, Client, Delayed } from "colyseus"
import config from "./config"

import { RoomState, Player } from "./RoomState"


/**
 * Colyseus gestion des états de la room
 */

export default class GameRooms extends Room {
  Game!: Phaser.Game
  scene!: Phaser.Scene
  delayedInterval!: Delayed;


  constructor() {
    super()
    this.autoDispose = true
    this.setPatchRate(1)
    this.maxClients = 4
  }

  onCreate() {
    this.setState(new RoomState())
    this.donnes = {}

    this.Game = new Phaser.Game(config)
    this.scene = this.Game.scene.scenes[0]
    this.scene.setRoom(this)

    this.clock.start();

    this.clock.setTimeout(() => {
      // this.scene.createEnnemy('boss_1', 'fakhear_atlas')
      this.scene.createEnnemy('twitchman', 'fakhear_atlas')
    }, 2_000);

    this.clock.setTimeout(() => {
      this.scene.createEnnemy('boss_1', 'fakhear_atlas')
      // this.scene.createEnnemy('twitchman', 'fakhear_atlas')
    }, 4_000);

    this.onMessage("inputs", (client, message) => {
      this.donnes[client.id].clavier = message
    })
  }

  onJoin(client: Client, options: any) {
    console.log(`${client.id} has joined!`)
    console.log("DEBUT SPRITE -------------------------")
    console.log(options.sprite)
    this.donnes[client.id] = {
      clavier: {
        up: false,
        right: {stop: true},
        down: false,
        left: false,
        a: false,
        z: false,
        e: false
      },
      sprite: `${options.sprite}`
    }
    const presences = this.scene.createPlayer(client.id, options.sprite)
    for (const [key, value] of Object.entries(presences.presences)) {
      this.state.presences.set(key, new Player(value))
    }
  }

  onLeave(client: Client) {
    console.log(`${client.id} left !! `)
    const presence = this.scene.removePlayer(client.id)
    this.state.presences.delete(client.id)
    delete this.donnes[client.id].clavier
  }

  onDispose() {
    console.log(`${this.roomId} shutting down!!`)
  }
}
