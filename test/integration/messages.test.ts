/**
 * Contrats des messages réseau (`src/shared/messages.ts`) vérifiés sur le serveur réel : forme des
 * messages `suppression` diffusés, et refus d'un `etatJoueur` invalide par le lobby.
 */
import { strict as assert } from "assert";
import { Client, Room } from "@colyseus/sdk";
import { attendre, demarrerServeur, ServeurDeTest } from "../helpers/serveur";
import { ClavierEnvoye, MessageSuppression } from "../../src/shared/messages";

const AU_REPOS: ClavierEnvoye = {
  a: false, z: false, e: false, r: false, space: false, right: false, left: false, up: false, down: false, tab: false,
  a_fin: false, z_fin: false, space_fin: false, right_fin: false, left_fin: false, right_debut: false, left_debut: false, tab_fin: false,
};
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

/** Vrai si `message` respecte `MessageSuppression` : une seule clé connue, identifiant texte. */
function estSuppression(message: unknown): message is MessageSuppression {
  if (typeof message !== "object" || message === null) return false;
  const entrees = Object.entries(message);
  return entrees.length === 1 && ["projectilesRef", "playersRef", "lignesRef"].includes(entrees[0]?.[0] ?? "") && typeof entrees[0]?.[1] === "string";
}

describe("messages réseau (intégration)", function () {
  this.timeout(60000);
  let serveur: ServeurDeTest;

  before(async function () {
    serveur = await demarrerServeur();
  });

  after(async function () {
    await serveur?.arreter();
  });

  it("suppression : une seule clé connue et un identifiant texte (bombe d'akhizonah)", async function () {
    const room: Room = await new Client(serveur.wsUrl).joinOrCreate("game_instance", { salon: `messages-${Date.now()}`, sprite: "akhizonah" });
    const suppressions: unknown[] = [];
    room.onMessage("suppression", (message: unknown) => void suppressions.push(message));
    room.onMessage("*", () => undefined);
    try {
      await pause(2500);
      room.send("inputs", { ...AU_REPOS, z: true });
      await pause(150);
      room.send("inputs", AU_REPOS);
      await attendre(() => suppressions.length > 0, 8000, "suppression de la bombe");
      for (const message of suppressions) assert.ok(estSuppression(message), `forme inattendue : ${JSON.stringify(message)}`);
    } finally {
      await room.leave();
    }
  });

  it("lobby : un etatJoueur hors catalogue est ignoré, sans erreur serveur ; un choix valide est enregistré", async function () {
    const room: Room<unknown, { joueurs?: { get(cle: string): { indexConfirmation?: number } | undefined } }> =
      await new Client(serveur.wsUrl).joinOrCreate("lobby", { salon: `messages-lobby-${Date.now()}` });
    try {
      room.send("etatJoueur", { pret: true, indexConfirmation: 99 });
      room.send("etatJoueur", { pret: true, indexConfirmation: "x" });
      await pause(500);
      // À la connexion, le joueur n'a rien choisi : indexConfirmation vaut -1 (lobby.ts, onJoin).
      assert.equal(room.state.joueurs?.get(room.sessionId)?.indexConfirmation, -1, "choix invalide enregistré");
      room.send("etatJoueur", { pret: true, indexConfirmation: 2 });
      await attendre(() => room.state.joueurs?.get(room.sessionId)?.indexConfirmation === 2, 3000, "choix valide enregistré");
      assert.doesNotMatch(serveur.journal(), /TypeError|Cannot read/, "erreur dans le journal du serveur");
    } finally {
      await room.leave();
    }
  });
});
