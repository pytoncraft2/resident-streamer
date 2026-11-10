//@ts-nocheck

import "@geckos.io/phaser-on-nodejs"
import { Room, Client, Delayed, ServerError } from "@colyseus/core"
import config from "./config"
import { completerDemarrageHeadless, installerPolyfillsHeadless } from "./phaserHeadless"
import { clavierRecu } from "../domain/entrees"
import { BOSS_FINAL, bossFinalDirect } from "../domain/progression"
import { revelerBossFinal } from "./bossFinal"
import { estPersonnageJouable } from "../../shared/personnages"
import { ClavierEnvoye, Recu } from "../../shared/messages"

// Contournements de l'anomalie B1 (destruction des rooms), voir phaserHeadless.ts.
installerPolyfillsHeadless()

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
    this.patchRate = 1
    this.maxClients = 4
    // Boss final déjà révélé dans cette partie (PlayerClass.animationBossVaincu, une seule fois).
    this.bossFinalRevele = false
  }

  onCreate() {
    this.state = new RoomState()
    this.state.compteur = 0

    this.donnes = {}

    this.Game = new Phaser.Game(config)
    completerDemarrageHeadless(this.Game)
    this.scene = this.Game.scene.scenes[0]
    this.scene.setRoom(this)

    this.clock.start();

      this.boss = {
        'super_boss': {
          temps: 1_000,
          x: 2830,
          y: -900,
          vaincu: false,
          inaccessible: false
        },
        'twitchman': {
          temps: 1_000,
          x: 1000,
          y: -200,
          vaincu: false,
          inaccessible: false
        },
        'boss_1': {
          temps: 2_000,
          x: 4800,
          y: -200,
          vaincu: false,
          inaccessible: false
        },
        'manette': {
          temps: 1_000,
          x: 4800,
          y: -900,
          vaincu: false,
          inaccessible: false
        },
        'troll':  {
          temps: 7_000,
          x: 1000,
          y: -1000,
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
            const presences = this.scene.createEnnemy(randomNombre, item[0], true, item[1].x, item[1].y);
            for (const [key, value] of Object.entries(presences.presences)) {
              this.state.presences.set(key, new Player(value))
            }
            // Raccourci de développement : boss final actif dès sa création (BOSS_FINAL_DIRECT=1).
            // createEnnemy le crée après 1000 ms sur l'horloge Phaser : révéler juste après, sur la même horloge.
            if (item[0] === BOSS_FINAL && bossFinalDirect()) this.scene.time.delayedCall(1050, () => revelerBossFinal(this))
        }, item[1].temps);

      })

    // Message `inputs` (contrat partagé MessagesVersJeu) : reçu comme non fiable, vérifié par clavierRecu.
    this.onMessage("inputs", (client, message: Recu<ClavierEnvoye>) => {
      const joueur = this.donnes[client.sessionId]
      // Fronts montants calculés par le serveur (B7) à partir du dernier message reçu tel quel.
      joueur.clavier = clavierRecu(joueur.dernierMessage, message)
      joueur.dernierMessage = message
    })


  }

  /**
   * Autorité serveur : seul un personnage jouable du catalogue partagé est accepté. Avant, un nom
   * inconnu levait une exception à la création du joueur et un nom de boss était accepté.
   */
  onAuth(_client: Client, options: any) {
    if (!estPersonnageJouable(options?.sprite)) throw new ServerError(400, `personnage inconnu : ${String(options?.sprite)}`)
    return true
  }

  onJoin(client: Client, options: any) {
    this.donnes[client.sessionId] = {
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
    const presences = this.scene.createPlayer(client.sessionId, options.sprite)
    for (const [key, value] of Object.entries(presences.presences)) {
      this.state.presences.set(key, new Player(value))
    }
  }

  onLeave(client: Client) {
    const presence = this.scene.removePlayer(client.sessionId)
    this.state.presences.delete(client.sessionId)
    delete this.donnes[client.sessionId].clavier
  }

  onDispose() {
    // Room détruite avant le démarrage de sa scène (ex. seul joueur refusé par onAuth) : groupes absents,
    // mais le jeu Phaser doit quand même être détruit (sinon il reste en mémoire, cf. B1).
    this.scene?.players?.destroy(true)
    this.scene?.enemies?.destroy(true)
    this.Game.destroy(true)
  }
}
