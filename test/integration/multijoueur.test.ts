/**
 * Scénarios multijoueurs (recette, phase 1) automatisables sans navigateur : synchronisation entre
 * clients, départ puis retour d'un joueur dans le même salon. Il n'y a pas de reprise de session :
 * un joueur qui revient est un nouveau joueur (nouvelle présence, vie et position de départ).
 */
import { strict as assert } from "assert";
import { Client, Room } from "@colyseus/sdk";
import { attendre, demarrerServeur, ServeurDeTest } from "../helpers/serveur";
import { ClavierEnvoye, OptionsJeu } from "../../src/shared/messages";
import { EtatPresence } from "../../src/shared/etats";
import { PersonnageJouable } from "../../src/shared/personnages";

interface EtatJeu {
  readonly presences?: { get(cle: string): EtatPresence | undefined; has(cle: string): boolean };
}

const AU_REPOS: ClavierEnvoye = {
  a: false, z: false, e: false, r: false, space: false, right: false, left: false, up: false, down: false, tab: false,
  a_fin: false, z_fin: false, space_fin: false, right_fin: false, left_fin: false, right_debut: false, left_debut: false, tab_fin: false,
};

describe("multijoueur (intégration)", function () {
  this.timeout(60000);
  let serveur: ServeurDeTest;
  const ouvertes: Room[] = [];

  before(async function () {
    serveur = await demarrerServeur();
  });

  afterEach(async function () {
    await Promise.all(ouvertes.splice(0).map((r) => r.leave().catch(() => undefined)));
  });

  after(async function () {
    await serveur?.arreter();
  });

  async function rejoindre(salon: string, sprite: PersonnageJouable): Promise<Room<unknown, EtatJeu>> {
    const options: OptionsJeu = { salon, sprite };
    const room = await new Client(serveur.wsUrl).joinOrCreate<EtatJeu>("game_instance", options);
    room.onMessage("*", () => undefined);
    ouvertes.push(room);
    await attendre(() => room.state.presences?.get(room.sessionId)?.sprite === sprite, 4000, `présence de ${sprite}`);
    return room;
  }

  it("3 joueurs : chacun voit les deux autres, avec leur personnage", async function () {
    const salon = `multi3-${Date.now()}`;
    const salles = [await rejoindre(salon, "fakhear"), await rejoindre(salon, "huzounet"), await rejoindre(salon, "osmosiscoop")];
    assert.equal(new Set(salles.map((r) => r.roomId)).size, 1, "même room");
    for (const r of salles) {
      await attendre(() => salles.every((autre) => r.state.presences?.has(autre.sessionId) === true), 4000, "présences de tous");
      assert.deepEqual(salles.map((autre) => r.state.presences?.get(autre.sessionId)?.sprite), ["fakhear", "huzounet", "osmosiscoop"]);
    }
  });

  it("2 joueurs : le déplacement de l'un est vu par l'autre", async function () {
    const salon = `multi2-${Date.now()}`;
    const a = await rejoindre(salon, "fakhear");
    const b = await rejoindre(salon, "akhizonah");
    await attendre(() => b.state.presences?.has(a.sessionId) === true, 4000, "a visible chez b");
    const xDepart = b.state.presences?.get(a.sessionId)?.x ?? 0;
    a.send("inputs", { ...AU_REPOS, right: true });
    await attendre(() => (b.state.presences?.get(a.sessionId)?.x ?? 0) > xDepart + 200, 4000, "b voit a se déplacer");
    a.send("inputs", AU_REPOS);
  });

  it("départ puis retour dans le même salon : même room, nouvelle présence, l'autre joueur n'est pas affecté", async function () {
    const salon = `retour-${Date.now()}`;
    const restant = await rejoindre(salon, "fakhear");
    let partant = await rejoindre(salon, "huzounet");
    const ancienneSession = partant.sessionId;
    const roomId = partant.roomId;
    await attendre(() => restant.state.presences?.has(ancienneSession) === true, 4000, "partant visible");

    await partant.leave();
    ouvertes.splice(ouvertes.indexOf(partant), 1);
    await attendre(() => restant.state.presences?.has(ancienneSession) === false, 4000, "présence retirée au départ");

    partant = await rejoindre(salon, "huzounet");
    assert.equal(partant.roomId, roomId, "retour dans la même room");
    assert.notEqual(partant.sessionId, ancienneSession, "nouvelle session");
    await attendre(() => restant.state.presences?.has(partant.sessionId) === true, 4000, "nouvelle présence visible");
    assert.equal(restant.state.presences?.get(partant.sessionId)?.vie, 10, "repart avec toute sa vie");
    assert.equal(restant.state.presences?.get(restant.sessionId)?.sprite, "fakhear", "le joueur resté garde sa présence");
    assert.doesNotMatch(serveur.journal(), /TypeError|Cannot read/, "erreur dans le journal du serveur");
  });
});
