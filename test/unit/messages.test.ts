import { strict as assert } from "assert";
import { canalJeu, canalLobby, ClavierEnvoye, RoomClient, RoomDiffusante } from "../../src/shared/messages";

class RoomFactice implements RoomClient, RoomDiffusante {
  readonly envois: unknown[][] = [];
  readonly diffusions: unknown[][] = [];
  readonly ecouteurs = new Map<string, (message: unknown) => void>();
  send(...args: unknown[]): void {
    this.envois.push(args);
  }
  broadcast(...args: unknown[]): void {
    this.diffusions.push(args);
  }
  onMessage(type: string, rappel: (message: unknown) => void): unknown {
    this.ecouteurs.set(type, rappel);
    return undefined;
  }
}

const AU_REPOS: ClavierEnvoye = {
  a: false, z: false, e: false, r: false, space: false, right: false, left: false, up: false, down: false, tab: false,
  a_fin: false, z_fin: false, space_fin: false, right_fin: false, left_fin: false, right_debut: false, left_debut: false, tab_fin: false,
};

describe("shared/messages · canaux typés", function () {
  it("envoyer transmet le nom et le contenu ; un message sans contenu part sans argument", function () {
    const room = new RoomFactice();
    canalJeu.envoyer(room, "inputs", AU_REPOS);
    canalLobby.envoyer(room, "demandeCommencerJeu");
    assert.deepEqual(room.envois, [["inputs", AU_REPOS], ["demandeCommencerJeu"]]);
  });

  it("diffuser transmet le nom et le contenu", function () {
    const room = new RoomFactice();
    canalJeu.diffuser(room, "suppression", { projectilesRef: "pc-1" });
    canalJeu.diffuser(room, "RDC_OK");
    canalJeu.diffuser(room, "FIN_JEU", { temps: "00:10:00", joueur: ["fakhear"], equipe: "Les Fakhear" });
    assert.deepEqual(room.diffusions, [
      ["suppression", { projectilesRef: "pc-1" }],
      ["RDC_OK"],
      ["FIN_JEU", { temps: "00:10:00", joueur: ["fakhear"], equipe: "Les Fakhear" }],
    ]);
  });

  it("ecouter transmet le message reçu au rappel, sous son type", function () {
    const room = new RoomFactice();
    const recus: string[] = [];
    canalJeu.ecouter(room, "FIN_JEU", (fin) => recus.push(fin.temps));
    room.ecouteurs.get("FIN_JEU")?.({ temps: "00:01:00", joueur: [], equipe: "" });
    assert.deepEqual(recus, ["00:01:00"]);
  });

  it("le compilateur refuse un nom inconnu, un contenu manquant ou mal formé (vérifié par tsc)", function () {
    const room = new RoomFactice();
    // @ts-expect-error message inconnu
    canalJeu.diffuser(room, "FIN_JEUX", { temps: "", joueur: [], equipe: "" });
    // @ts-expect-error contenu manquant
    canalJeu.diffuser(room, "suppression");
    // @ts-expect-error clé de suppression inconnue
    canalJeu.diffuser(room, "suppression", { bossRef: "x" });
    // @ts-expect-error clavier incomplet
    canalJeu.envoyer(room, "inputs", { a: true });
    // @ts-expect-error message du lobby sur le canal du jeu
    canalJeu.envoyer(room, "etatJoueur", { pret: true, indexConfirmation: 0 });
    assert.equal(room.diffusions.length + room.envois.length, 5);
  });
});
