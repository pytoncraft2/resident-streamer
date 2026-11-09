// //@ts-nocheck
/**
 * Lobby serveur
 */

import { Schema, type } from "@colyseus/schema";
import { Client, LobbyRoom } from "@colyseus/core";

class LobbyState extends Schema {
    @type("string") custom: string ;
}

export default class CustomLobbyRoom extends LobbyRoom {
    // Référence typée : l'état de LobbyRoom est typé `object` depuis Colyseus 0.17.
    private etat = new LobbyState();

    async onCreate(options: any) {
        await super.onCreate(options);

        this.state = this.etat;
    }

    onJoin(client: Client, options: any) {
        super.onJoin(client, options);
        this.etat.custom = client.sessionId;
    }

    onLeave(client: any) {
        super.onLeave(client);
    }
}
