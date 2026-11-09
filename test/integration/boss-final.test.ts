/**
 * Boss final. Le raccourci BOSS_FINAL_DIRECT=1 l'active dès le début de la partie (sans lui, il
 * n'apparaît qu'après les 4 boss : voir rooms.test.ts, où il est absent).
 * Phase « Trône » : 6 rangées de PC + siège (« tronehaut », boss assis) ; le boss, invisible et
 * invulnérable, lance des PC sur un joueur de la pièce centrale de l'étage ; chaque coup (corps à
 * corps, kunaï, boule, bombe…) fait tomber une rangée ; trône détruit → siège vide (« tronehautv2 »),
 * boss visible et vulnérable.
 */
import { strict as assert } from "assert";
import { Client, Room } from "@colyseus/sdk";
import { attendre, demarrerServeur, ServeurDeTest } from "../helpers/serveur";

interface PresenceVue {
  readonly x?: number;
  readonly y?: number;
  readonly sprite?: string;
  readonly alpha?: number;
  readonly vie?: number;
}
interface ProjectileVue {
  readonly sprite?: string;
  readonly _frame?: string;
  readonly anim?: string;
}
interface MapVue<T> {
  get(cle: string): T | undefined;
  keys(): IterableIterator<string>;
  values(): IterableIterator<T>;
}
interface EtatJeu {
  readonly presences?: MapVue<PresenceVue>;
  readonly projectiles?: MapVue<ProjectileVue>;
}

const AU_REPOS = { up: false, right: false, down: false, left: false, space: false, a: false, a_fin: false, z: false, e: false, r: false };
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

describe("boss final (intégration)", function () {
  this.timeout(90000);
  let serveur: ServeurDeTest;

  before(async function () {
    serveur = await demarrerServeur({ env: { BOSS_FINAL_DIRECT: "1" } });
  });

  after(async function () {
    await serveur?.arreter();
  });

  /** Rejoint une partie dédiée et monte à l'étage, dans la pièce centrale (x = 2830). */
  async function partieALEtage(sprite: string, messages: string[] = []): Promise<Room<unknown, EtatJeu>> {
    const room = await new Client(serveur.wsUrl).joinOrCreate<EtatJeu>("game_instance", { salon: `boss-final-${sprite}-${Date.now()}`, sprite });
    room.onMessage("*", (type: string | number) => void messages.push(String(type)));
    await attendre(() => bossFinal(room) !== undefined, 6000, "présence du boss final");
    room.send("inputs", { ...AU_REPOS, up: true });
    await attendre(() => (room.state.presences?.get(room.sessionId)?.y ?? 0) < -200, 4000, "joueur monté à l'étage");
    room.send("inputs", AU_REPOS);
    await attendre(() => Math.abs((room.state.presences?.get(room.sessionId)?.y ?? 0) + 249) < 20, 4000, "joueur posé à l'étage");
    return room;
  }

  const bossFinal = (room: Room<unknown, EtatJeu>): PresenceVue | undefined =>
    Array.from(room.state.presences?.values() ?? []).find((p) => p.sprite === "super_boss");
  const elementsDuTrone = (room: Room<unknown, EtatJeu>): ProjectileVue[] =>
    Array.from(room.state.projectiles?.values() ?? []).filter((p) => p.sprite === "super_boss" && p._frame !== "pc");

  describe("raccourci et phase « Trône »", function () {
    let room: Room<unknown, EtatJeu>;
    const messages: string[] = [];

    before(async function () {
      room = await partieALEtage("osmosiscoop", messages);
    });

    after(async function () {
      await room?.leave();
    });

    it("le boss final est actif dès le début et la pièce centrale est révélée", function () {
      assert.ok(messages.includes("RDC_OK") && messages.includes("ETAGE_OK"), `messages reçus : ${messages.join(", ")}`);
    });

    it("le trône est complet (6 rangées + siège avec le boss assis) et le boss est invisible", function () {
      const trone = elementsDuTrone(room);
      assert.equal(trone.length, 7);
      assert.ok(trone.some((t) => t.anim === "tronehaut"), "siège avec le boss assis");
      assert.equal(bossFinal(room)?.alpha, 0);
    });

    it("lance des PC sur un joueur de la pièce centrale, qui perd de la vie", async function () {
      const vieAvant = room.state.presences?.get(room.sessionId)?.vie ?? 0;
      await attendre(() => (room.state.presences?.get(room.sessionId)?.vie ?? 0) < vieAvant, 6000, "joueur touché par un PC");
    });
  });

  describe("destruction du trône", function () {
    it("les attaques à distance (kunaïs de huzounet) font aussi tomber les rangées", async function () {
      const room = await partieALEtage("huzounet");
      try {
        const avant = elementsDuTrone(room).length;
        for (let k = 0; k < 2; k++) {
          room.send("inputs", { ...AU_REPOS, z: true });
          await pause(100);
          room.send("inputs", AU_REPOS);
          await pause(700);
        }
        await attendre(() => elementsDuTrone(room).length <= avant - 2, 3000, "deux rangées tombées sous les kunaïs");
      } finally {
        await room.leave();
      }
    });

    it("six coups font tomber les rangées ; le boss apparaît, vulnérable, sur le sol de l'étage", async function () {
      const room = await partieALEtage("fakhear");
      try {
        for (let coup = 0; coup < 12 && elementsDuTrone(room).length > 1; coup++) {
          room.send("inputs", { ...AU_REPOS, a: true });
          await pause(150);
          room.send("inputs", AU_REPOS);
          await pause(600);
        }
        const trone = elementsDuTrone(room);
        assert.deepEqual(trone.map((t) => t.anim), ["tronehautv2"], "seul le siège vide reste");
        await attendre(() => bossFinal(room)?.alpha === 1 && Math.abs((bossFinal(room)?.y ?? 0) + 250) < 30, 3000, "boss visible sur le sol de l'étage");

        const vieAvant = bossFinal(room)?.vie ?? 0;
        room.send("inputs", { ...AU_REPOS, a: true });
        await pause(150);
        room.send("inputs", AU_REPOS);
        await attendre(() => (bossFinal(room)?.vie ?? vieAvant) < vieAvant, 3000, "boss blessé : il est vulnérable");
      } finally {
        await room.leave();
      }
    });
  });
});
