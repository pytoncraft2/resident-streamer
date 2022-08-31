"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
require("@geckos.io/phaser-on-nodejs");
const colyseus_1 = require("colyseus");
const LobbyState_1 = require("./LobbyState");
/**
 * Lobby colyseus
 */
class LobbyRooms extends colyseus_1.Room {
    constructor() {
        super();
        this.autoDispose = true;
        this.setPatchRate(17);
        this.maxClients = 20;
    }
    /**
     * onCreate - Initialisation des parametres de base du Lobby
     * Le premier joueur définis le nom du lobby à travers le metadata
     * Ecoute les evenements quand le joueur se connecte, change d'index ou de proprietaire
     * Puis effectue les changements qu'il faut
     *
     * @param  {Object} options: Object liste des options passé par le client
     * @param  {Object} options.salon nom du salon creer par le premier joueur
     */
    onCreate(options) {
        this.setState(new LobbyState_1.LobbyState());
        if (!this.metadata) {
            this.setMetadata({ nomRoom: options.salon });
        }
        this.etatJoueur = {};
        this.listeIndex = {
            0: [],
            1: [],
            2: [],
            3: []
        };
        this.onMessage("etatJoueur", (client, message) => {
            this.etatJoueur[client.id] = message;
            if (!this.listeIndex[message.indexConfirmation].includes(client.id)) {
                this.listeIndex[message.indexConfirmation].push(client.id);
            }
            if (this.listeIndex[message.ancienIndexConfirmation]) {
                if (this.listeIndex[message.ancienIndexConfirmation] !== this.listeIndex[message.indexConfirmation]) {
                    let arr = this.listeIndex[message.ancienIndexConfirmation];
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] === client.id) {
                            arr.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
            this.state.listeJoueurIndex.shift();
            this.state.listeJoueurIndex.push(JSON.stringify([this.listeIndex]));
            this.state.joueurs.set(client.id, new LobbyState_1.Joueur(message));
        });
        this.onMessage("demandeCommencerJeu", (_client, _message) => {
            // broadcast a message to all clients
            this.broadcast("commencerJeu", "an action has been taken!");
        });
    }
    /**
     * onJoin - Creation et Ajout d'un objet contenant les état de base du joueur
     * Le Joueur devient Proprietaire du Lobby si il est seul et est ajouté au tablau proprietaire
     *
     * @param  {Object} client: Client
     */
    onJoin(client) {
        this.etatJoueur[client.id] = {
            pret: false,
            indexConfirmation: -1,
            ancienIndexConfirmation: -1
        };
        if (!this.state.proprietaire.length) {
            this.state.proprietaire.push(client.id);
        }
        for (const [key, value] of Object.entries(this.etatJoueur)) {
            this.state.joueurs.set(key, new LobbyState_1.Joueur(value));
        }
    }
    /**
     * Suppression du joueur
     *  - dans la liste des joueurs
     *  - dans l'objet listeJoueurIndex
     *  - dans l'objet proprietaire (si il est present)
     *      - assignation d'un nouveaau proprietaire qui sera le premier de la liste des joueurs
     */
    /**
     * onLeave - description
     *
     * @param  {Object} client: Client
     */
    onLeave(client) {
        this.state.joueurs.delete(client.id);
        for (const [key] of Object.entries(this.listeIndex)) {
            this.listeIndex[key] = this.listeIndex[key].filter((a) => a !== client.id);
        }
        this.state.listeJoueurIndex.shift();
        this.state.listeJoueurIndex.push(JSON.stringify([this.listeIndex]));
        if (this.state.proprietaire.includes(client.id) && Object.entries(this.etatJoueur).length > 1) {
            delete this.etatJoueur[client.id];
            this.state.proprietaire.shift();
            this.state.proprietaire.push(Object.keys(this.etatJoueur)[0]);
        }
        else {
            delete this.etatJoueur[client.id];
        }
    }
    onDispose() {
        console.log(`${this.roomId} shutting down!!`);
    }
}
exports.default = LobbyRooms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9iYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvbG9iYnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxhQUFhO0FBQ2IsdUNBQW9DO0FBQ3BDLHVDQUF1QztBQUV2Qyw2Q0FBaUQ7QUFHakQ7O0dBRUc7QUFDSCxNQUFxQixVQUFXLFNBQVEsZUFBSTtJQUkxQztRQUNFLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBR0Q7Ozs7Ozs7O09BUUc7SUFDSCxRQUFRLENBQUMsT0FBWTtRQUVuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksdUJBQVUsRUFBRSxDQUFDLENBQUE7UUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM5QztRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDaEIsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7U0FDTixDQUFBO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFBO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFFB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