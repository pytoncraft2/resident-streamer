/**
 * Caractérisation de l'API du classement (GET/POST /scores) sur le serveur compilé.
 * Le serveur lit et écrit build/server/scores.json (copie produite par build:server) :
 * son contenu est restauré à la fin, src/server/scores.json n'est jamais touché.
 */
import { strict as assert } from "assert";
import { promises as fs } from "fs";
import http from "http";
import path from "path";
import { attendre, demarrerServeur, ServeurDeTest } from "../helpers/serveur";

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
  /** POST puis attente de l'écriture (le serveur répond avant que fs.writeFile ait fini). */
  const publier = async (equipe: string, joueur: unknown, score: string): Promise<Classement> => {
    const rep = await requete(`${serveur.httpUrl}/scores`, "POST", { equipe, joueur, score });
    assert.equal(rep.statut, 200);
    assert.deepEqual(JSON.parse(rep.texte), { status: "ok" });
    let classement: Classement = {};
    await attendre(async () => {
      classement = await lireClassement();
      return classement[equipe]?.score === score;
    }, 3000, `écriture du score de ${equipe}`);
    return classement;
  };

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

  it("POST insère l'équipe et trie le classement par temps croissant", async function () {
    const c = await publier("EQUIPE C", ["c1", "c2"], "00:01:30");
    assert.deepEqual(Object.keys(c), ["EQUIPE A", "EQUIPE C", "EQUIPE B"]);
    assert.deepEqual(c["EQUIPE C"], { joueurs: ["c1", "c2"], score: "00:01:30" });
  });

  it("POST écrase une équipe existante même avec un moins bon temps", async function () {
    const c = await publier("EQUIPE A", ["a"], "00:05:00");
    assert.deepEqual(Object.keys(c), ["EQUIPE B", "EQUIPE A"]);
  });

  it("POST place en tête un nom d'équipe numérique, quel que soit son temps", async function () {
    const c = await publier("42", ["x"], "00:09:00");
    assert.deepEqual(Object.keys(c), ["42", "EQUIPE A", "EQUIPE B"]);
  });
});
