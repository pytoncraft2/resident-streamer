/**
 * API du classement sur le serveur compilé : GET /scores ; plus de POST depuis la correction de B3
 * (le serveur enregistre lui-même les scores en fin de partie, voir src/server/game/finDePartie.ts).
 * Chaque serveur de test a son propre fichier de scores (SCORES_FICHIER temporaire, anomalie B4).
 */
import { strict as assert } from "assert";
import { promises as fs } from "fs";
import http from "http";
import path from "path";
import { demarrerServeur, ServeurDeTest } from "../helpers/serveur";

const CLASSEMENT_VERSIONNE = path.resolve(__dirname, "../../src/server/scores.json");

type Classement = Record<string, { joueurs: unknown; score: string }>;

function requete(url: string, methode: "GET" | "POST", corps?: unknown): Promise<{ statut: number; texte: string }> {
  return new Promise((resolve, reject) => {
    const donnees = corps === undefined ? undefined : JSON.stringify(corps);
    const req = http.request(url, { method: methode, headers: donnees ? { "Content-Type": "application/json" } : {} }, (res) => {
      let texte = "";
      res.on("data", (d: Buffer) => (texte += d.toString()));
      res.on("end", () => resolve({ statut: res.statusCode ?? 0, texte }));
    });
    req.on("error", reject);
    if (donnees) req.write(donnees);
    req.end();
  });
}

const CLASSEMENT: Classement = {
  "EQUIPE B": { joueurs: ["b"], score: "00:02:00" },
  "EQUIPE A": { joueurs: ["a"], score: "00:01:00" },
};

describe("API /scores (intégration)", function () {
  describe("avec un classement existant", function () {
    let serveur: ServeurDeTest;

    before(async function () {
      serveur = await demarrerServeur({ classement: CLASSEMENT });
    });

    after(async function () {
      await serveur?.arreter();
    });

    it("GET renvoie le fichier tel quel", async function () {
      const rep = await requete(`${serveur.httpUrl}/scores`, "GET");
      assert.equal(rep.statut, 200);
      assert.equal(rep.texte, await fs.readFile(serveur.fichierScores, "utf8"));
      assert.deepEqual(Object.keys(JSON.parse(rep.texte) as Classement), ["EQUIPE B", "EQUIPE A"]);
    });

    it("POST /scores n'existe plus (404) et ne modifie pas le classement (anomalie B3)", async function () {
      const avant = await fs.readFile(serveur.fichierScores, "utf8");
      const rep = await requete(`${serveur.httpUrl}/scores`, "POST", { equipe: "TRICHE", joueur: ["x"], score: "00:00:01" });
      assert.equal(rep.statut, 404);
      await new Promise((r) => setTimeout(r, 200));
      assert.equal(await fs.readFile(serveur.fichierScores, "utf8"), avant);
    });
  });

  describe("au premier démarrage (anomalie B4)", function () {
    it("crée le classement depuis src/server/scores.json, sans modifier ce dernier", async function () {
      const versionne = await fs.readFile(CLASSEMENT_VERSIONNE, "utf8");
      const serveur = await demarrerServeur();
      try {
        assert.equal(await fs.readFile(serveur.fichierScores, "utf8"), versionne);
        assert.equal((await requete(`${serveur.httpUrl}/scores`, "GET")).texte, versionne);
      } finally {
        await serveur.arreter();
      }
      assert.equal(await fs.readFile(CLASSEMENT_VERSIONNE, "utf8"), versionne);
    });
  });
});
