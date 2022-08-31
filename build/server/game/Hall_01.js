"use strict";
//@ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@geckos.io/phaser-on-nodejs");
const colyseus_1 = require("colyseus");
const config_1 = __importDefault(require("./config"));
const RoomState_1 = require("./RoomState");
/**
 * Colyseus gestion des états de la room
 */
class GameRooms extends colyseus_1.Room {
    constructor() {
        super();
        this.autoDispose = true;
        this.setPatchRate(1);
        this.maxClients = 4;
    }
    onCreate() {
        this.setState(new RoomState_1.RoomState());
        this.state.compteur = 0;
        this.donnes = {};
        this.Game = new Phaser.Game(config_1.default);
        this.scene = this.Game.scene.scenes[0];
        this.scene.setRoom(this);
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
        //   temps: 7_000,
        //   x: 1000,
        //   y: -1000,
        //   vaincu: false,
        //   inaccessible: false
        // }
        };
        Object.entries(this.boss).map(item => {
            const randomNombre = `${(Math.random() + 1).toString(36).substring(7)}`;
            this.boss[item[0]]['id'] = randomNombre;
            this.clock.setTimeout(() => {
                this.scene.room.donnes[randomNombre] = {
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
                };
                const presences = this.scene.createEnnemy(randomNombre, item[0], true, item[1].x, item[1].y);
                for (const [key, value] of Object.entries(presences.presences)) {
                    this.state.presences.set(key, new RoomState_1.Player(value));
                }
            }, item[1].temps);
        });
        this.onMessage("inputs", (client, message) => {
            this.donnes[client.id].clavier = message;
        });
    }
    onJoin(client, options) {
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
        };
        const presences = this.scene.createPlayer(client.id, options.sprite);
        for (const [key, value] of Object.entries(presences.presences)) {
            this.state.presences.set(key, new RoomState_1.Player(value));
        }
    }
    onLeave(client) {
        const presence = this.scene.removePlayer(client.id);
        this.state.presences.delete(client.id);
        delete this.donnes[client.id].clavier;
    }
    onDispose() {
        this.scene.players.destroy(true);
        this.scene.enemies.destroy(true);
        this.Game.destroy(true);
    }
}
exports.default = GameRooms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFsbF8wMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9IYWxsXzAxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxhQUFhOzs7OztBQUViLHVDQUFvQztBQUNwQyx1Q0FBZ0Q7QUFDaEQsc0RBQTZCO0FBRTdCLDJDQUErQztBQUcvQzs7R0FFRztBQUVILE1BQXFCLFNBQVUsU0FBUSxlQUFJO0lBTXpDO1FBQ0UsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLHFCQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQTtRQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUVoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxHQUFHO1FBQ1Ysa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsYUFBYTtRQUNiLG1CQUFtQjtRQUNuQix3QkFBd0I7UUFDeEIsS0FBSztRQUNMLGlCQUFpQjtRQUNqQixrQkFBa0I7UUFDbEIsYUFB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