/**
 * Caractérisation de l'IA des boss (ADR-003), observée dans l'état Colyseus.
 * boss_1 : le joueur le plus proche dans sa pièce (rez-de-chaussée, 3802 < x < 5627) → il fonce
 * vers lui ; sinon il rejoint sa place (5010, 755). Mesures de référence : boss en place ~4 s
 * après la création de la room ; il rejoint le joueur moins d'une seconde après son entrée.
 */
import { strict as assert } from "assert";
import { Client, Room } from "@colyseus/sdk";
import { attendre, demarrerServeur, ServeurDeTest } from "../helpers/serveur";

interface PresenceVue {
  readonly x?: number;
  readonly y?: number;
  readonly sprite?: string;
}
interface MapVue<T> {
  get(cle: string): T | undefined;
  values(): IterableIterator<T>;
}
interface EtatJeu {
  readonly presences?: MapVue<PresenceVue>;
}

const AU_REPOS = { up: false, right: false, down: false, left: false, space: false, a: false, a_fin: false, z: false, e: false, r: false };
const PIECE_BOSS_1 = { xMin: 3802, xMax: 5627 };
const PLACE_BOSS_1 = { x: 5010, y: 755 };

describe("IA des boss (intégration)", function () {
  this.timeout(60000);
  let serveur: ServeurDeTest;
  let room: Room<unknown, EtatJeu>;

  const moi = (): PresenceVue | undefined => room.state.presences?.get(room.sessionId);
  const boss1 = (): PresenceVue | undefined => Array.from(room.state.presences?.values() ?? []).find((p) => p.sprite === "boss_1");
  const aSaPlace = (): boolean => {
    const b = boss1();
    return b?.x !== undefined && b.y !== undefined && Math.abs(b.x - PLACE_BOSS_1.x) < 30 && Math.abs(b.y - PLACE_BOSS_1.y) < 30;
  };

  before(async function () {
    serveur = await demarrerServeur();
    room = await new Client(serveur.wsUrl).joinOrCreate<EtatJeu>("game_instance", { salon: `ia-${Date.now()}`, sprite: "osmosiscoop" });
    room.onMessage("*", () => undefined);
  });

  after(async function () {
    await room?.leave();
    await serveur?.arreter();
  });

  describe("boss_1", function () {
    it("rejoint sa place tant qu'aucun joueur n'est dans sa pièce", async function () {
      await attendre(aSaPlace, 8000, "boss_1 à sa place (5010, 755)");
      const x = moi()?.x ?? 0;
      assert.ok(x < PIECE_BOSS_1.xMin, `le joueur doit être hors de la pièce (x = ${x})`);
    });

    it("fonce vers le joueur le plus proche quand il entre dans sa pièce", async function () {
      room.send("inputs", { ...AU_REPOS, right: true });
      await attendre(() => (moi()?.x ?? 0) > PIECE_BOSS_1.xMin + 100, 5000, "joueur entré dans la pièce");
      // Le joueur s'arrête loin du boss (~1000 px) : seule la poursuite peut les rapprocher.
      room.send("inputs", AU_REPOS);
      const ecartInitial = Math.abs((boss1()?.x ?? 0) - (moi()?.x ?? 0));
      assert.ok(ecartInitial > 600, `le joueur doit s'arrêter loin du boss (écart ${Math.round(ecartInitial)} px)`);
      await attendre(() => {
        const b = boss1();
        const j = moi();
        return b?.x !== undefined && j?.x !== undefined && Math.abs(b.x - j.x) < 300;
      }, 4000, "boss_1 au contact du joueur");
    });

    it("revient à sa place quand le joueur ressort de la pièce", async function () {
      room.send("inputs", { ...AU_REPOS, left: true });
      await attendre(() => (moi()?.x ?? Infinity) < PIECE_BOSS_1.xMin - 100, 8000, "joueur sorti de la pièce");
      room.send("inputs", AU_REPOS);
      await attendre(aSaPlace, 4000, "boss_1 revenu à sa place");
    });
  });
});
