/**
 * API du classement sur le serveur compilé : GET /scores ; plus de POST depuis la correction de B3
 * (le serveur enregistre lui-même les scores en fin de partie, voir src/server/game/finDePartie.ts).
 * Le serveur lit et écrit build/server/scores.json (copie produite par build:server) :
 * son contenu est restauré à la fin, src/server/scores.json n'est jamais touché.
 */
import { strict as assert } from "assert";
import { promises as fs } from "fs";
import http from "http";
import path from "path";
import { demarrerServeur, ServeurDeTest } from "../helpers/serveur";

const FICHIER_SCORES = path.resolve(__dirname, "../../build/server/scores.json");

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

describe("API /scores (intégration)", function () {
  let serveur: ServeurDeTest;
  let sauvegarde: string;

  const lireClassement = async (): Promise<Classement> => JSON.parse((await requete(`${serveur.httpUrl}/scores`, "GET")).texte) as Classement;
  const ecrireFichier = (c: Classement): Promise<void> => fs.writeFile(FICHIER_SCORES, JSON.stringify(c));
  before(async function () {
    sauvegarde = await fs.readFile(FICHIER_SCORES, "utf8");
    serveur = await demarrerServeur();
  });

  after(async function () {
    await serveur?.arreter();
    await fs.writeFile(FICHIER_SCORES, sauvegarde);
  });

  beforeEach(async function () {
    await ecrireFichier({
      "EQUIPE B": { joueurs: ["b"], score: "00:02:00" },
      "EQUIPE A": { joueurs: ["a"], score: "00:01:00" },
    });
  });

  it("GET renvoie le fichier tel quel", async function () {
    assert.deepEqual(Object.keys(await lireClassement()), ["EQUIPE B", "EQUIPE A"]);
  });

  it("POST /scores n'existe plus (404) et ne modifie pas le classement (anomalie B3)", async function () {
    const avant = await fs.readFile(FICHIER_SCORES, "utf8");
    const rep = await requete(`${serveur.httpUrl}/scores`, "POST", { equipe: "TRICHE", joueur: ["x"], score: "00:00:01" });
    assert.equal(rep.statut, 404);
    await new Promise((r) => setTimeout(r, 200));
    assert.equal(await fs.readFile(FICHIER_SCORES, "utf8"), avant);
  });
});
