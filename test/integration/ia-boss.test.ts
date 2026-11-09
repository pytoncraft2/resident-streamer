/**
 * Caractérisation de l'IA des boss (ADR-003), observée dans l'état Colyseus.
 * boss_1 : le joueur le plus proche dans sa pièce (rez-de-chaussée, 3802 < x < 5627) → il fonce
 * vers lui ; sinon il rejoint sa place (5010, 755). Mesures de référence : boss en place ~4 s
 * après la création de la room ; il rejoint le joueur moins d'une seconde après son entrée.
 * manette : pièce à l'étage (3802 < x < 5627, y < -249), place (4800, -249) ; joueur à distance
 * moyenne → se tourne vers lui et lance une manette ; joueur proche → frappe puis s'envole vers
 * un coin (y ≈ -950) ; joueur sorti → revient à sa place.
 * troll : pièce à l'étage, à gauche (x < 1789, y < -249), place (427, -249) ; joueur dans sa pièce
 * → se tourne vers lui et lance oies et grenouilles (projectiles « troll »), qui le repoussent.
 * La charge (joueur à moins de 400) n'est pas atteignable de façon fiable ici : tests unitaires.
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
interface PresenceVueOrientee extends PresenceVue {
  readonly flipX?: boolean;
}
interface ProjectileVue {
  readonly sprite?: string;
}
interface EtatJeu {
  readonly presences?: MapVue<PresenceVueOrientee>;
  readonly projectiles?: { keys(): IterableIterator<string>; get(cle: string): ProjectileVue | undefined };
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

  describe("troll", function () {
    const PLACE_TROLL = { x: 427, y: -249 };
    let r: Room<unknown, EtatJeu>;
    const joueur = (): PresenceVueOrientee | undefined => r.state.presences?.get(r.sessionId);
    const troll = (): PresenceVueOrientee | undefined => Array.from(r.state.presences?.values() ?? []).find((p) => p.sprite === "troll");
    const tirs = new Set<string>();
    let releve: NodeJS.Timeout | undefined;

    before(async function () {
      r = await new Client(serveur.wsUrl).joinOrCreate<EtatJeu>("game_instance", { salon: `ia-troll-${Date.now()}`, sprite: "osmosiscoop" });
      r.onMessage("*", () => undefined);
      releve = setInterval(() => {
        const pj = r.state.projectiles;
        if (pj) for (const id of Array.from(pj.keys())) if (pj.get(id)?.sprite === "troll") tirs.add(id);
      }, 20);
    });

    after(async function () {
      if (releve) clearInterval(releve);
      await r?.leave();
    });

    it("se tient à sa place à l'étage tant qu'aucun joueur n'est dans sa pièce", async function () {
      await attendre(() => {
        const t = troll();
        return t?.x !== undefined && t.y !== undefined && Math.abs(t.x - PLACE_TROLL.x) < 30 && Math.abs(t.y - PLACE_TROLL.y) < 30;
      }, 12000, "troll à sa place (427, -249)");
      assert.equal(tirs.size, 0);
    });

    it("se tourne vers un joueur entré dans sa pièce et lui lance des projectiles", async function () {
      r.send("inputs", { ...AU_REPOS, up: true });
      await attendre(() => (joueur()?.y ?? 0) < -200, 4000, "joueur monté à l'étage");
      r.send("inputs", AU_REPOS);
      await attendre(() => Math.abs((joueur()?.y ?? 0) + 249) < 20, 4000, "joueur posé à l'étage");
      r.send("inputs", { ...AU_REPOS, left: true });
      await attendre(() => (joueur()?.x ?? 9999) < 1650, 6000, "joueur entré dans la pièce de troll");
      r.send("inputs", AU_REPOS);
      await attendre(() => tirs.size >= 1, 4000, "projectile lancé par troll");
      assert.equal(troll()?.flipX, false, "troll doit regarder vers la droite, où est le joueur");
    });
  });

  describe("manette", function () {
    const PLACE_MANETTE = { x: 4800, y: -249 };
    let r: Room<unknown, EtatJeu>;
    const joueur = (): PresenceVueOrientee | undefined => r.state.presences?.get(r.sessionId);
    const manette = (): PresenceVueOrientee | undefined => Array.from(r.state.presences?.values() ?? []).find((p) => p.sprite === "manette");
    const lancees = new Set<string>();
    let releve: NodeJS.Timeout | undefined;
    const aSaPlaceManette = (): boolean => {
      const m = manette();
      return m?.x !== undefined && m.y !== undefined && Math.abs(m.x - PLACE_MANETTE.x) < 30 && Math.abs(m.y - PLACE_MANETTE.y) < 30;
    };

    before(async function () {
      r = await new Client(serveur.wsUrl).joinOrCreate<EtatJeu>("game_instance", { salon: `ia-manette-${Date.now()}`, sprite: "osmosiscoop" });
      r.onMessage("*", () => undefined);
      releve = setInterval(() => {
        const pj = r.state.projectiles;
        if (pj) for (const id of Array.from(pj.keys())) if (pj.get(id)?.sprite === "manette") lancees.add(id);
      }, 20);
    });

    after(async function () {
      if (releve) clearInterval(releve);
      await r?.leave();
    });

    it("se tient à sa place à l'étage tant qu'aucun joueur n'est dans sa pièce", async function () {
      await attendre(aSaPlaceManette, 8000, "manette à sa place (4800, -249)");
      assert.equal(lancees.size, 0);
    });

    it("se tourne vers un joueur à distance moyenne dans sa pièce et lance une manette", async function () {
      r.send("inputs", { ...AU_REPOS, up: true });
      await attendre(() => (joueur()?.y ?? 0) < -200, 4000, "joueur monté à l'étage");
      r.send("inputs", AU_REPOS);
      await attendre(() => Math.abs((joueur()?.y ?? 0) + 249) < 20, 4000, "joueur posé à l'étage");
      r.send("inputs", { ...AU_REPOS, right: true });
      await attendre(() => (joueur()?.x ?? 0) > 3950, 6000, "joueur entré dans la pièce de manette");
      r.send("inputs", AU_REPOS);
      await attendre(() => lancees.size >= 1, 4000, "manette lancée");
      assert.equal(manette()?.flipX, true, "manette doit regarder vers la gauche, où est le joueur");
    });

    it("s'envole vers un coin quand le joueur est proche, puis revient à sa place quand il redescend", async function () {
      await attendre(() => (manette()?.y ?? 0) < -600, 10000, "envol de manette (y < -600)");
      r.send("inputs", { ...AU_REPOS, down: true });
      await attendre(() => (joueur()?.y ?? -1000) > 300, 4000, "joueur redescendu au rez-de-chaussée");
      r.send("inputs", AU_REPOS);
      await attendre(aSaPlaceManette, 8000, "manette revenue à sa place");
    });
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
