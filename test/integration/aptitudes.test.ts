/**
 * Caractérisation de la cadence des aptitudes, observée dans l'état Colyseus.
 *
 * Le code n'a pas de « cooldown » explicite : la fréquence d'une aptitude dépend
 * uniquement de la façon dont elle traite l'input reçu (src/server/game/scenes/Aptitudes/) :
 * - une touche « consommée » (`input.x = false`) déclenche une action par appui ;
 * - une touche non consommée relance l'action tant qu'elle est maintenue, limitée
 *   seulement par un drapeau remis à zéro après un délai (100 ms pour bombe et kunaï) ;
 * - un drapeau jamais remis à zéro rend l'action unique pour la partie (clonage) ;
 * - une animation (tween) en cours bloque sa relance (dash de fakhear, 300 ms).
 * Mesures de référence (Node 16, 2 exécutions) : ~8 projectiles par seconde de maintien.
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
    describe(`${personnage} · ${projectile} (Z, touche non consommée)`, function () {
      it("un appui bref lance un seul projectile", async function () {
        const room = await partieSolo(personnage);
        assert.equal(await compterProjectiles(room, personnage, () => maintenir(room, "z", 30)), 1);
      });

      it("un maintien de 1 s relance le projectile environ toutes les 125 ms, sans recharge", async function () {
        const room = await partieSolo(personnage);
        const n = await compterProjectiles(room, personnage, () => maintenir(room, "z", 1000));
        assert.ok(n >= 6 && n <= 11, `${n} projectiles (attendu ≈ 8)`);
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
  });

  describe("fakhear · dash (E, tween relancé tant qu'il n'est pas en cours)", function () {
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
  });
});
