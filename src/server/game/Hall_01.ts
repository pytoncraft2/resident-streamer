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

    this.Game = new Phaser.Game(config)
    this.scene = this.Game.scene.scenes[0]
    this.scene.setRoom(this)

    this.clock.start();

      this.boss = {
        // 'super_boss': {
        //   temps: 1_000,
        //   x: 2830,
        //   y: -900,
        //   vaincu: false,
        //   inaccessible: false
        // },
        // 'twitchman': {
        //   temps: 1_000,
        //   x: 1000,
        //   y: -200,
        //   vaincu: false,
        //   inaccessible: false
        // },
        // 'boss_1': {
        //   temps: 2_000,
        //   x: 4800,
        //   y: -200,
        //   vaincu: false,
        //   inaccessible: false
        // },
        // 'manette': {
        //   temps: 1_000,
        //   x: 4800,
        //   y: -900,
        //   vaincu: false,
        //   inaccessible: false
        // },
        // 'troll':  {
        //   temps: 1_000,
        //   x: 1000,
        //   y: -1000,
        //   vaincu: false,
        //   inaccessible: false
        // }
        // 'girl':  {
        //   temps: 7_000,
        //   x: 1000,
        //   y: -1000,
        //   frame: "boy_idle1.png",
        //   vaincu: false,
        //   inaccessible: false
        // },
        'spider':  {
          temps: 1_000,
          x: 1000,
          y: -300,
          frame: "spider_run.png",
          vaincu: false,
          inaccessible: false
        }
      }
      Object.entries(this.boss).map(item => {
        const randomNombre = `${(Math.random() + 1).toString(36).substring(7)}`;
        this.boss[item[0]]['id'] = randomNombre;
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
            const presences = this.scene.createEnnemy(randomNombre, item[0], true, item[1].x, item[1].y, item[1].frame);
            for (const [key, value] of Object.entries(presences.presences)) {
              this.state.presences.set(key, new Player(value))
            }
        }, item[1].temps);

      })

    this.onMessage("inputs", (client, message) => {
      this.donnes[client.id].clavier = message
    })


  }

  onJoin(client: Client, options: any) {
    console.log(options);
    
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
    const presences = this.scene.createPlayer(client.id, options.sprite, options.frame)
    for (const [key, value] of Object.entries(presences.presences)) {
      this.state.presences.set(key, new Player(value))
    }
  }

  onLeave(client: Client) {
    const presence = this.scene.removePlayer(client.id)
    this.state.presences.delete(client.id)
    delete this.donnes[client.id].clavier
  }

  onDispose() {
    this.scene.players.destroy(true)
    this.scene.enemies.destroy(true)
    this.Game.destroy(true)
  }
}
