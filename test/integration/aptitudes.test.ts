/**
 * Caractérisation de la cadence des aptitudes, observée dans l'état Colyseus.
 *
 * Il n'y a pas de « cooldown » : la fréquence d'une aptitude dépend de la façon dont elle traite
 * l'entrée (src/server/game/scenes/Aptitudes/). Depuis la correction de B7, la bombe, le kunaï et
 * le dash se déclenchent sur le front montant calculé par le serveur (src/server/domain/entrees.ts) :
 * un appui = une action, même si la touche reste enfoncée ou si une autre touche change.
 * Avant B7, maintenir Z relançait ~8 projectiles par seconde.
 * Le clonage de huzounet reste unique pour la partie, par conception (B8).
 */
import { strict as assert } from "assert";
import { Client, Room } from "@colyseus/sdk";
import { attendre, demarrerServeur, ServeurDeTest } from "../helpers/serveur";

interface MapVue<T> {
  get(cle: string): T | undefined;
  keys(): IterableIterator<string>;
  values(): IterableIterator<T>;
}
interface ObjetVue {
  readonly sprite?: string;
  readonly x?: number;
}
interface EtatJeu {
  readonly presences?: MapVue<ObjetVue>;
  readonly projectiles?: MapVue<ObjetVue>;
}

const AU_REPOS = { up: false, right: false, down: false, left: false, space: false, a: false, a_fin: false, z: false, e: false, r: false };
type Touche = "z" | "e";
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

describe("aptitudes : cadence (intégration)", function () {
  this.timeout(60000);
  let serveur: ServeurDeTest;
  const ouvertes = new Set<Room>();

  before(async function () {
    serveur = await demarrerServeur();
  });

  afterEach(async function () {
    for (const r of ouvertes) await r.leave();
    ouvertes.clear();
  });

  after(async function () {
    await serveur?.arreter();
  });

  /** Partie à un seul joueur, dans un salon dédié. */
  async function partieSolo(sprite: string): Promise<Room<unknown, EtatJeu>> {
    const room = await new Client(serveur.wsUrl).joinOrCreate<EtatJeu>("game_instance", { salon: `aptitudes-${sprite}-${Date.now()}`, sprite });
    room.onMessage("*", () => undefined);
    ouvertes.add(room);
    await attendre(() => room.state.presences?.get(room.sessionId) !== undefined, 5000, "présence du joueur");
    await pause(500);
    return room;
  }

  /** Maintient une touche pendant `dureeMs`, puis la relâche. */
  async function maintenir(room: Room<unknown, EtatJeu>, touche: Touche, dureeMs: number): Promise<void> {
    room.send("inputs", { ...AU_REPOS, [touche]: true });
    await pause(dureeMs);
    room.send("inputs", AU_REPOS);
  }

  /** Nombre de projectiles distincts d'un sprite apparus pendant `action` (+ 800 ms de marge). */
  async function compterProjectiles(room: Room<unknown, EtatJeu>, sprite: string, action: () => Promise<void>): Promise<number> {
    const vus = new Set<string>();
    const releve = setInterval(() => {
      const projectiles = room.state.projectiles;
      if (!projectiles) return;
      for (const id of Array.from(projectiles.keys())) if (projectiles.get(id)?.sprite === sprite) vus.add(id);
    }, 5);
    try {
      await action();
      await pause(800);
    } finally {
      clearInterval(releve);
    }
    return vus.size;
  }

  const projectilesParZ: Array<[personnage: string, projectile: string]> = [
    ["akhizonah", "bombe"],
    ["huzounet", "kunaï"],
  ];

  for (const [personnage, projectile] of projectilesParZ) {
    describe(`${personnage} · ${projectile} (Z, un appui = un projectile, B7)`, function () {
      it("un appui bref lance un seul projectile", async function () {
        const room = await partieSolo(personnage);
        assert.equal(await compterProjectiles(room, personnage, () => maintenir(room, "z", 30)), 1);
      });

      it("un maintien de 1 s ne lance qu'un projectile", async function () {
        const room = await partieSolo(personnage);
        assert.equal(await compterProjectiles(room, personnage, () => maintenir(room, "z", 1000)), 1);
      });

      it("maintenir Z en changeant de direction ne relance pas (le client renvoie alors z: true)", async function () {
        const room = await partieSolo(personnage);
        const n = await compterProjectiles(room, personnage, async () => {
          room.send("inputs", { ...AU_REPOS, z: true });
          await pause(300);
          room.send("inputs", { ...AU_REPOS, z: true, right: true });
          await pause(300);
          room.send("inputs", { ...AU_REPOS, z: true, left: true });
          await pause(300);
          room.send("inputs", AU_REPOS);
        });
        assert.equal(n, 1);
      });

      it("deux appuis successifs lancent deux projectiles", async function () {
        const room = await partieSolo(personnage);
        const n = await compterProjectiles(room, personnage, async () => {
          await maintenir(room, "z", 30);
          await pause(300);
          await maintenir(room, "z", 30);
        });
        assert.equal(n, 2);
      });
    });
  }

  describe("huzounet · clonage (E, drapeau jamais réinitialisé)", function () {
    it("crée 4 clones au premier appui, aucun ensuite, et les clones persistent", async function () {
      const room = await partieSolo("huzounet");
      // Les clones sont publiés dans presences avec le sprite du joueur.
      const clones = (): number => Array.from(room.state.presences?.values() ?? []).filter((p) => p.sprite === "huzounet").length - 1;

      await maintenir(room, "e", 50);
      await attendre(() => clones() === 4, 3000, "4 clones");

      await maintenir(room, "e", 50);
      await pause(1500);
      assert.equal(clones(), 4);
    });

    it("un appui sur Z lance un kunaï par clone en plus de celui du joueur, même maintenu (B7)", async function () {
      const room = await partieSolo("huzounet");
      const clones = (): number => Array.from(room.state.presences?.values() ?? []).filter((p) => p.sprite === "huzounet").length - 1;
      await maintenir(room, "e", 50);
      await attendre(() => clones() === 4, 3000, "4 clones");
      await pause(300);

      assert.equal(await compterProjectiles(room, "huzounet", () => maintenir(room, "z", 1000)), 5);
    });
  });

  describe("fakhear · dash (E, un appui = un dash, B7)", function () {
    it("chaque appui déplace fakhear d'environ 500 px, y compris le deuxième", async function () {
      const room = await partieSolo("fakhear");
      const x = (): number => room.state.presences?.get(room.sessionId)?.x ?? Number.NaN;
      await attendre(() => Number.isFinite(x()), 3000, "position initiale");

      // Un tween détruit à sa fin (comportement par défaut de Phaser ≥ 3.60) casserait le 2e dash.
      for (const dash of [1, 2]) {
        const avant = x();
        await maintenir(room, "e", 50);
        await pause(700); // 300 ms de dash + marge
        const deplacement = x() - avant;
        assert.ok(deplacement > 250, `dash ${dash} : déplacement de ${Math.round(deplacement)} px (attendu ≈ 500)`);
      }
    });

    it("maintenir E pendant 1,5 s ne fait qu'un dash", async function () {
      const room = await partieSolo("fakhear");
      const x = (): number => room.state.presences?.get(room.sessionId)?.x ?? Number.NaN;
      await attendre(() => Number.isFinite(x()), 3000, "position initiale");
      const avant = x();
      await maintenir(room, "e", 1500);
      await pause(500);
      const deplacement = x() - avant;
      // Un dash ≈ 500 px ; avant B7, le maintien en enchaînait plusieurs.
      assert.ok(deplacement > 250 && deplacement < 900, `déplacement de ${Math.round(deplacement)} px (attendu ≈ 500)`);
    });
  });
});
