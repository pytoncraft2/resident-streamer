/**
 * États synchronisés (`src/shared/etats.ts`, `game/publication.ts`) observés par un client réel :
 * champs ponctuels (présents une seule publication), position conservée, trafic réseau.
 */

/** WebSocket du transport du SDK, réduite à l'écoute des messages reçus. */
interface SocketEcoutable {
  addEventListener(type: "message", ecouteur: (evenement: { data: unknown }) => void): void;
}

function tailleDe(donnees: unknown): number {
  if (donnees instanceof ArrayBuffer) return donnees.byteLength;
  if (ArrayBuffer.isView(donnees)) return donnees.byteLength;
  return String(donnees).length;
}
import { strict as assert } from "assert";
import { Client, Room } from "@colyseus/sdk";
import { attendre, demarrerServeur, ServeurDeTest } from "../helpers/serveur";
import { ClavierEnvoye, OptionsJeu } from "../../src/shared/messages";
import { EtatPresence } from "../../src/shared/etats";

interface EtatJeu {
  readonly presences?: { get(cle: string): EtatPresence | undefined; size: number };
}

const AU_REPOS: ClavierEnvoye = {
  a: false, z: false, e: false, r: false, space: false, right: false, left: false, up: false, down: false, tab: false,
  a_fin: false, z_fin: false, space_fin: false, right_fin: false, left_fin: false, right_debut: false, left_debut: false, tab_fin: false,
};
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

describe("états synchronisés (intégration)", function () {
  this.timeout(60000);
  let serveur: ServeurDeTest;

  before(async function () {
    serveur = await demarrerServeur();
  });

  after(async function () {
    await serveur?.arreter();
  });

  /** Rejoint une partie et enregistre, à chaque mise à jour, la présence du joueur. */
  async function rejoindre(sprite: OptionsJeu["sprite"]): Promise<{ room: Room<unknown, EtatJeu>; historique: EtatPresence[] }> {
    const options: OptionsJeu = { salon: `etats-${sprite}-${Date.now()}`, sprite };
    const room = await new Client(serveur.wsUrl).joinOrCreate<EtatJeu>("game_instance", options);
    room.onMessage("*", () => undefined);
    const historique: EtatPresence[] = [];
    room.onStateChange(() => {
      const p = room.state.presences?.get(room.sessionId);
      if (p) historique.push({ ...p, commandes: p.commandes ? { ...p.commandes } : undefined });
    });
    return { room, historique };
  }

  it("commandes : publiées une fois à l'arrivée du joueur, puis absentes ; la position reste connue", async function () {
    const { room, historique } = await rejoindre("fakhear");
    try {
      await attendre(() => historique.some((p) => p.commandes?.A === "cross"), 4000, "commandes publiées");
      await pause(500);
      const i = historique.findIndex((p) => p.commandes?.A === "cross");
      assert.ok(historique.slice(i + 1).every((p) => p.commandes === undefined), "commandes republiées après la première fois");
      assert.ok(historique.slice(i + 2).every((p) => typeof p.x === "number"), "présence sans position");
    } finally {
      await room.leave();
    }
  });

  it("son : présent sur une publication (coup de fakhear), puis effacé", async function () {
    const { room, historique } = await rejoindre("fakhear");
    try {
      await pause(2500);
      room.send("inputs", { ...AU_REPOS, a: true });
      await pause(150);
      room.send("inputs", AU_REPOS);
      await attendre(() => historique.some((p) => p.son === "quick-punch"), 3000, "son du coup");
      await pause(300);
      const i = historique.findIndex((p) => p.son === "quick-punch");
      assert.equal(historique[i + 1]?.son, undefined, "son encore présent à la publication suivante");
    } finally {
      await room.leave();
    }
  });

  it("trafic : un joueur en mouvement et les boss tiennent sous 12 Kio/s (≈ 1,2 mesuré ; 23 quand chaque objet était recréé)", async function () {
    const { room } = await rejoindre("fakhear");
    try {
      const transport: unknown = room.connection.transport;
      assert.ok(typeof transport === "object" && transport !== null && "ws" in transport, "transport WebSocket attendu");
      const ws = transport.ws as SocketEcoutable;
      await pause(4000);
      let octets = 0;
      ws.addEventListener("message", (e) => void (octets += tailleDe(e.data)));
      const debut = Date.now();
      for (let i = 0; i < 10; i++) {
        room.send("inputs", { ...AU_REPOS, [i % 2 ? "left" : "right"]: true });
        await pause(1000);
      }
      const kioParSeconde = octets / ((Date.now() - debut) / 1000) / 1024;
      assert.ok(kioParSeconde > 0.5, `aucun trafic mesuré (${kioParSeconde.toFixed(1)} Kio/s)`);
      assert.ok(kioParSeconde < 12, `trafic de ${kioParSeconde.toFixed(1)} Kio/s`);
    } finally {
      await room.leave();
    }
  });
});
