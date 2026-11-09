/**
 * Caractérisation des routes HTTP du serveur (Express) : client servi depuis dist/,
 * URL de salon, fichiers statiques, CORS. Figé avant la montée Express 4 → 5.
 * Les cas qui servent dist/ sont ignorés si le client n'a pas été compilé (`npm run build`).
 */
import { strict as assert } from "assert";
import { existsSync, promises as fs } from "fs";
import http from "http";
import path from "path";
import { demarrerServeur, ServeurDeTest } from "../helpers/serveur";

const DIST = path.resolve(__dirname, "../../dist");

interface Reponse {
  statut: number;
  type: string;
  cors: string | undefined;
  corps: string;
}

function obtenir(url: string, entetes: Record<string, string> = {}): Promise<Reponse> {
  return new Promise((resolve, reject) => {
    http
      .get(url, { headers: entetes }, (res) => {
        let corps = "";
        res.on("data", (d: Buffer) => (corps += d.toString()));
        res.on("end", () =>
          resolve({
            statut: res.statusCode ?? 0,
            type: String(res.headers["content-type"] ?? ""),
            cors: res.headers["access-control-allow-origin"] as string | undefined,
            corps,
          }),
        );
      })
      .on("error", reject);
  });
}

describe("routes HTTP (intégration)", function () {
  let serveur: ServeurDeTest;
  let indexHtml = "";
  const clientCompile = existsSync(path.join(DIST, "index.html"));

  before(async function () {
    serveur = await demarrerServeur();
    if (clientCompile) indexHtml = await fs.readFile(path.join(DIST, "index.html"), "utf8");
  });

  after(async function () {
    await serveur?.arreter();
  });

  const avecClient = function (this: Mocha.Context): void {
    if (!clientCompile) this.skip(); // dist/ absent : lancer `npm run build` pour couvrir ces cas
  };

  it("GET / renvoie le client (dist/index.html)", async function () {
    avecClient.call(this);
    const r = await obtenir(`${serveur.httpUrl}/`);
    assert.equal(r.statut, 200);
    assert.match(r.type, /text\/html/);
    assert.equal(r.corps, indexHtml);
  });

  it("GET /<salon> renvoie aussi le client (lien d'invitation)", async function () {
    avecClient.call(this);
    const r = await obtenir(`${serveur.httpUrl}/monsalon42`);
    assert.equal(r.statut, 200);
    assert.equal(r.corps, indexHtml);
  });

  it("sert les fichiers statiques de dist/", async function () {
    avecClient.call(this);
    const r = await obtenir(`${serveur.httpUrl}/site.webmanifest`);
    assert.equal(r.statut, 200);
    assert.equal(r.corps, await fs.readFile(path.join(DIST, "site.webmanifest"), "utf8"));
  });

  it("répond 404 à un chemin inconnu à plusieurs segments", async function () {
    const r = await obtenir(`${serveur.httpUrl}/inconnu/chemin`);
    assert.equal(r.statut, 404);
  });

  it("GET /scores autorise toutes les origines (CORS)", async function () {
    const r = await obtenir(`${serveur.httpUrl}/scores`, { Origin: "http://exemple.test" });
    assert.equal(r.statut, 200);
    assert.match(r.type, /application\/json/);
    assert.equal(r.cors, "*");
  });
});
