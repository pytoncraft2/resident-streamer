/**
 * Tests de caractérisation des rooms Colyseus : ils figent le comportement
 * observé au diagnostic de la phase 0 (docs/phase0-diagnostic.md), sans le juger.
 * Ils démarrent le serveur compilé : lancer via `npm test` (qui compile le serveur).
 */
import { strict as assert } from "assert";
import { Client, Room } from "@colyseus/sdk";
import { attendre, demarrerServeur, getStatut, ServeurDeTest } from "../helpers/serveur";

/** Vue minimale, en lecture seule, des schémas de src/server/game/RoomState.ts. */
interface PresenceVue {
  readonly x?: number;
  readonly sprite?: string;
}
interface MapVue<T> {
  get(cle: string): T | undefined;
  keys(): IterableIterator<string>;
  values(): IterableIterator<T>;
}
interface EtatJeu {
  readonly presences?: MapVue<PresenceVue>;
}

/** Message `inputs` attendu par Hall_01 (client → serveur). */
interface Clavier {
  up: boolean; right: boolean; down: boolean; left: boolean; space: boolean;
  a: boolean; a_fin: boolean; z: boolean; e: boolean; r: boolean;
}
const AU_REPOS: Clavier = { up: false, right: false, down: false, left: false, space: false, a: false, a_fin: false, z: false, e: false, r: false };

const PERSONNAGES = ["fakhear", "akhizonah", "huzounet", "osmosiscoop"] as const;
// super_boss est absent par conception : créé inactif (Aptitudes/super_boss.ts), il ne publie sa présence
// qu'une fois activé, quand troll et manette sont vaincus (ETAGE_OK, PlayerClass.ts). Ancienne « anomalie » B2.
const BOSS_OBSERVES = ["manette", "twitchman", "boss_1", "troll"] as const;

let compteurSalon = 0;
const nouveauSalon = (): string => `test-${process.pid}-${Date.now()}-${++compteurSalon}`;

const sprites = (room: Room<unknown, EtatJeu>): string[] =>
  Array.from(room.state.presences?.values() ?? []).map((p) => p.sprite ?? "");

describe("serveur (intégration)", function () {
  let serveur: ServeurDeTest;
  const rooms: Room[] = [];
  const quittees = new Set<Room>();
  const quitter = async (room: Room): Promise<void> => {
    if (quittees.has(room)) return;
    quittees.add(room);
    await room.leave();
  };

  const rejoindre = async <T>(nom: string, options: Record<string, string>): Promise<Room<unknown, T>> => {
    const room = await new Client(serveur.wsUrl).joinOrCreate<T>(nom, options);
    // Ignorer les messages diffusés (suppression, RDC_OK…) sans avertissement.
    room.onMessage("*", () => undefined);
    rooms.push(room);
    return room;
  };

  before(async function () {
    serveur = await demarrerServeur();
  });

  after(async function () {
    await Promise.all(rooms.map((r) => quitter(r)));
    await serveur?.arreter();
  });

  it("GET /scores renvoie le classement en JSON", async function () {
    assert.equal(await getStatut(`${serveur.httpUrl}/scores`), 200);
  });

  describe("room lobby", function () {
    it("regroupe les joueurs d'un même salon et sépare les salons", async function () {
      const salon = nouveauSalon();
      const a = await rejoindre("lobby", { salon });
      const b = await rejoindre("lobby", { salon });
      const autre = await rejoindre("lobby", { salon: nouveauSalon() });
      assert.equal(a.roomId, b.roomId);
      assert.notEqual(a.roomId, autre.roomId);
    });
  });

  describe("room acceuil (liste des salons de l'écran d'accueil)", function () {
    it("annonce chaque salon avec son nom dans metadata.nomRoom, lu par Level.ts", async function () {
      interface Annonce {
        metadata?: { nomRoom?: string };
      }
      const accueil = await new Client(serveur.wsUrl).joinOrCreate("acceuil");
      rooms.push(accueil);
      const annonces: Annonce[] = [];
      accueil.onMessage("rooms", () => undefined);
      accueil.onMessage("-", () => undefined);
      accueil.onMessage("+", (message: [string, Annonce]) => annonces.push(message[1]));

      const salon = nouveauSalon();
      await rejoindre("lobby", { salon });
      await attendre(() => annonces.some((a) => a.metadata?.nomRoom === salon), 3000, `annonce du salon ${salon} avec nomRoom`);
    });
  });

  describe("room game_instance, partie à 4 joueurs", function () {
    const salon = nouveauSalon();
    const joueurs: Room<unknown, EtatJeu>[] = [];

    before(async function () {
      for (const sprite of PERSONNAGES) joueurs.push(await rejoindre<EtatJeu>("game_instance", { salon, sprite }));
    });

    it("place les 4 joueurs du salon dans la même room", function () {
      assert.ok(joueurs.every((j) => j.roomId === joueurs[0].roomId));
    });

    it("synchronise une présence par joueur avec son personnage", async function () {
      await attendre(() => PERSONNAGES.every((s) => sprites(joueurs[0]).includes(s)), 5000, "présences des joueurs");
      for (const j of joueurs) assert.ok(joueurs[0].state.presences?.get(j.sessionId), `présence ${j.sessionId}`);
    });

    it("refuse un 5e joueur dans la room (maxClients = 4) et lui en crée une autre", async function () {
      const cinquieme = await rejoindre<EtatJeu>("game_instance", { salon, sprite: "huzounet" });
      assert.notEqual(cinquieme.roomId, joueurs[0].roomId);
      await quitter(cinquieme);
    });

    it("applique côté serveur le déplacement demandé par l'input", async function () {
      const moi = (): PresenceVue | undefined => joueurs[0].state.presences?.get(joueurs[0].sessionId);
      await attendre(() => typeof moi()?.x === "number", 5000, "position initiale");
      const xInitial = moi()?.x ?? 0;
      joueurs[0].send("inputs", { ...AU_REPOS, right: true });
      await attendre(() => (moi()?.x ?? 0) > xInitial + 100, 5000, "déplacement vers la droite");
      joueurs[0].send("inputs", AU_REPOS);
    });

    it("fait apparaître les boss après leurs délais", async function () {
      await attendre(() => BOSS_OBSERVES.every((b) => sprites(joueurs[0]).includes(b)), 12000, "apparition des boss");
    });

    it("retire la présence d'un joueur qui quitte", async function () {
      const partant = joueurs[3];
      await quitter(partant);
      await attendre(() => joueurs[0].state.presences?.get(partant.sessionId) === undefined, 5000, "retrait de la présence");
    });

    it("le serveur reste disponible après la destruction de la room", async function () {
      for (const j of joueurs.slice(0, 3)) await quitter(j);
      // onDispose lève actuellement une exception (anomalie B1) sans arrêter le processus.
      await new Promise((r) => setTimeout(r, 1000));
      assert.equal(await getStatut(`${serveur.httpUrl}/scores`), 200);
    });
  });
});
