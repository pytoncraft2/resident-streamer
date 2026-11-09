import { strict as assert } from "assert";
import { MessageFinJeu, RoomDiffusion, terminerPartie } from "../../src/server/game/finDePartie";
import { DepotScores } from "../../src/server/stockage/fichierScores";

interface Ajout {
  equipe: string;
  joueurs: readonly string[];
  score: string;
}

class RoomFactice implements RoomDiffusion {
  readonly diffusions: Array<{ type: string; message: MessageFinJeu }> = [];
  broadcast(type: string, message: MessageFinJeu): void {
    this.diffusions.push({ type, message });
  }
}

class DepotFactice implements DepotScores {
  readonly ajouts: Ajout[] = [];
  constructor(private readonly echec = false) {}
  ajouter(equipe: string, joueurs: readonly string[], score: string): Promise<void> {
    this.ajouts.push({ equipe, joueurs, score });
    return this.echec ? Promise.reject(new Error("disque plein")) : Promise.resolve();
  }
}

describe("game/finDePartie · terminerPartie", function () {
  it("diffuse FIN_JEU avec le temps, les personnages et le nom d'équipe du serveur", function () {
    const room = new RoomFactice();
    terminerPartie(room, "00:03:57", ["huzounet", "akhizonah"], new DepotFactice(), 0.3);
    assert.deepEqual(room.diffusions, [
      { type: "FIN_JEU", message: { temps: "00:03:57", joueur: ["huzounet", "akhizonah"], equipe: "EQUIPE HUZOUNET 30" } },
    ]);
  });

  it("enregistre une seule entrée par partie, avec les valeurs diffusées", function () {
    const depot = new DepotFactice();
    terminerPartie(new RoomFactice(), "00:01:42", ["osmosiscoop", "fakhear"], depot, 0.54);
    assert.deepEqual(depot.ajouts, [{ equipe: "EQUIPE OSMOSISCOOP 54", joueurs: ["osmosiscoop", "fakhear"], score: "00:01:42" }]);
  });

  it("ne fait rien si la partie de la room est déjà terminée", function () {
    const room = new RoomFactice();
    const depot = new DepotFactice();
    assert.equal(terminerPartie(room, "00:01:00", ["troll"], depot, 0.1), true);
    assert.equal(terminerPartie(room, "00:02:00", ["troll"], depot, 0.2), false);
    assert.equal(room.diffusions.length, 1);
    assert.equal(depot.ajouts.length, 1);
  });

  it("traite chaque room indépendamment", function () {
    const depot = new DepotFactice();
    terminerPartie(new RoomFactice(), "00:01:00", ["troll"], depot, 0.1);
    terminerPartie(new RoomFactice(), "00:02:00", ["manette"], depot, 0.2);
    assert.equal(depot.ajouts.length, 2);
  });

  it("n'interrompt pas la partie si l'enregistrement échoue (erreur journalisée)", async function () {
    const erreurs: unknown[][] = [];
    const original = console.error;
    console.error = (...args: unknown[]) => void erreurs.push(args);
    try {
      const room = new RoomFactice();
      assert.equal(terminerPartie(room, "00:01:00", ["troll"], new DepotFactice(true), 0.1), true);
      await new Promise((r) => setImmediate(r));
      assert.equal(room.diffusions.length, 1);
      assert.equal(erreurs.length, 1);
    } finally {
      console.error = original;
    }
  });
});
