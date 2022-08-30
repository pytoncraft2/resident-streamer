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
            'super_boss': {
                temps: 1000,
                x: 2830,
                y: -900,
                vaincu: false,
                inaccessible: false
            },
            'twitchman': {
                temps: 1000,
                x: 1000,
                y: -200,
                vaincu: false,
                inaccessible: false
            },
            'boss_1': {
                temps: 2000,
                x: 4800,
                y: -200,
                vaincu: false,
                inaccessible: false
            },
            'manette': {
                temps: 1000,
                x: 4800,
                y: -900,
                vaincu: false,
                inaccessible: false
            },
            'troll': {
                temps: 7000,
                x: 1000,
                y: -1000,
                vaincu: false,
                inaccessible: false
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFsbF8wMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9IYWxsXzAxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxhQUFhOzs7OztBQUViLHVDQUFvQztBQUNwQyx1Q0FBZ0Q7QUFDaEQsc0RBQTZCO0FBRTdCLDJDQUErQztBQUcvQzs7R0FFRztBQUVILE1BQXFCLFNBQVUsU0FBUSxlQUFJO0lBTXpDO1FBQ0UsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLHFCQUFTLEVBQUUsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQTtRQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUVoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBTSxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFFeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsWUFBWSxFQUFFO2dCQUNaLEtBQUssRUFBRSxJQUFLO2dCQUNaLENBQUMsRUFBRSxJQUFJO2dCQUNQLENBQUMsRUFBRSxDQUFDLEdBQUc7Z0JBQ1AsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsWUFBWSxF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