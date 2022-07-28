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
    this.state.compteur = 0

    this.donnes = {}
    this.enemies =

    this.Game = new Phaser.Game(config)
    this.scene = this.Game.scene.scenes[0]
    this.scene.setRoom(this)

    this.clock.start();

      // this.scene.createEnnemy('boss_1', 'fakhear_atlas')
      // this.scene.createEnnemy('twitchman', 'fakhear_atlas')

      this.boss = {
        'super_boss': {
          temps: 10_000,
          x: 2830,
          y: -900,
          vivant: true
        },
        'twitchman': {
          temps: 10_000,
          x: 1000,
          y: -1000,
          vivant: true
        },
        'boss_1': {
          temps: 2_000,
          x: 4800,
          y: -200,
          vivant: true
        },
        'manette': {
          temps: 4_000,
          x: 1000,
          y: -200,
          vivant: true
        },
        'troll':  {
          temps: 7_000,
          x: 4800,
          y: -900,
          vivant: true
        }
        // 'huzounet': 1_000
      }
      Object.entries(this.boss).map(item => {
        const randomNombre = `${(Math.random() + 1).toString(36).substring(7)}`
        this.clock.setTimeout(() => {
            (this.scene as any).room.donnes[randomNombre] = {
              clavier: {
                up: false,
                right: false,
                down: false,
                left: false,
                space: false,
                a: false,
                a_fin: false,
                z: false,
                e: false,
                r: false
              }
            }
            const presences = this.scene.createEnnemy(randomNombre, item[0], true, item[1].x, item[1].y);
            for (const [key, value] of Object.entries(presences.presences)) {
              this.state.presences.set(key, new Player(value))
            }
        }, item[1].temps);

      })
    //   for (let key of boss) {
    //   }
      // this.scene.createPlayer(123456789, 'twitchman')


    // this.clock.setTimeout(() => {
    //   // this.scene.createEnnemy('boss_1', 'fakhear_atlas')
    //   // this.scene.createEnnemy('twitchman', 'fakhear_atlas')
    //
    //
    //   (this.scene as any).room.donnes['123456787'] = {
    //     clavier: {
    //       up: false,
    //       right: false,
    //       down: false,
    //       left: false,
    //       space: false,
    //       a: false,
    //       z: false,
    //       e: false,
    //       r: false
    //     }
    //   }
    //
    //   const presences = this.scene.createEnnemy('123456787', 'manette')
    //   for (const [key, value] of Object.entries(presences.presences)) {
    //     this.state.presences.set(key, new Player(value))
    //   }
    //   // this.scene.createPlayer(123456789, 'twitchman')
    // }, 4_000);


    // this.clock.setTimeout(() => {
    //   this.scene.createEnnemy('boss_1', 'fakhear_atlas')
    //   // this.scene.createEnnemy('twitchman', 'fakhear_atlas')
    // this.broadcast("test", "an action has been taken!");
    // }, 4_000);

    this.onMessage("inputs", (client, message) => {
      this.donnes[client.id].clavier = message
    })


  }

  onJoin(client: Client, options: any) {
    console.log(`${client.id} has joined!`)
    this.donnes[client.id] = {
      clavier: {
        up: false,
        right: false,
        down: false,
        left: false,
        space: true,
        a: false,
        a_fin: false,
        z: false,
        e: false,
        r: false
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
    this.scene.players.destroy(true)
    this.scene.enemies.destroy(true)
    this.Game.destroy(true)

    // this.sys.game.destroy(true);
    console.log(`${this.roomId} shutting down!!`)
  }
}
