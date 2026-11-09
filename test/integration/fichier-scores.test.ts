/**
 * Stockage du classement sur un fichier temporaire (jamais scores.json du dépôt).
 */
import { strict as assert } from "assert";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { cheminScores, FichierScores } from "../../src/server/stockage/fichierScores";

describe("stockage/FichierScores", function () {
  let dossier: string;
  let chemin: string;

  beforeEach(async function () {
    dossier = await fs.mkdtemp(path.join(os.tmpdir(), "scores-"));
    chemin = path.join(dossier, "scores.json");
    await fs.writeFile(chemin, JSON.stringify({ "EQUIPE B": { joueurs: ["b"], score: "00:02:00" } }));
  });

  afterEach(async function () {
    await fs.rm(dossier, { recursive: true, force: true });
  });

  const lire = async (): Promise<Record<string, { joueurs: unknown; score: string }>> => JSON.parse(await fs.readFile(chemin, "utf8"));

  it("ajoute une entrée et garde le classement trié", async function () {
    await new FichierScores(chemin).ajouter("EQUIPE A", ["a1", "a2"], "00:01:00");
    const c = await lire();
    assert.deepEqual(Object.keys(c), ["EQUIPE A", "EQUIPE B"]);
    assert.deepEqual(c["EQUIPE A"], { joueurs: ["a1", "a2"], score: "00:01:00" });
  });

  it("ne perd aucun ajout lorsque plusieurs parties se terminent en même temps", async function () {
    const depot = new FichierScores(chemin);
    await Promise.all(["C", "D", "E", "F", "G"].map((x, i) => depot.ajouter(`EQUIPE ${x}`, [x], `00:0${i}:30`)));
    assert.deepEqual(Object.keys(await lire()).sort(), ["EQUIPE B", "EQUIPE C", "EQUIPE D", "EQUIPE E", "EQUIPE F", "EQUIPE G"]);
  });

  it("un échec de lecture est remonté sans bloquer les ajouts suivants", async function () {
    const depot = new FichierScores(chemin);
    await fs.writeFile(chemin, "pas du JSON");
    await assert.rejects(depot.ajouter("EQUIPE X", ["x"], "00:00:10"));
    await fs.writeFile(chemin, "{}");
    await depot.ajouter("EQUIPE Y", ["y"], "00:00:20");
    assert.deepEqual(Object.keys(await lire()), ["EQUIPE Y"]);
  });

  it("initialiser crée le fichier et ses dossiers depuis la source, une seule fois", async function () {
    const source = path.join(dossier, "source.json");
    await fs.writeFile(source, '{"EQUIPE S":{"joueurs":["s"],"score":"00:00:30"}}');
    const cible = new FichierScores(path.join(dossier, "a", "b", "scores.json"));
    assert.equal(cible.initialiser(source), true);
    assert.equal(await fs.readFile(cible.chemin, "utf8"), await fs.readFile(source, "utf8"));
    await cible.ajouter("EQUIPE T", ["t"], "00:00:10");
    assert.equal(cible.initialiser(source), false);
    assert.deepEqual(Object.keys(JSON.parse(await fs.readFile(cible.chemin, "utf8"))), ["EQUIPE T", "EQUIPE S"]);
  });

  it("lireBrut renvoie le contenu exact du fichier", async function () {
    assert.equal(await new FichierScores(chemin).lireBrut(), await fs.readFile(chemin, "utf8"));
  });
});

describe("stockage/cheminScores", function () {
  it("par défaut : donnees/scores.json à la racine du projet, hors du build", function () {
    assert.equal(cheminScores({}), path.resolve(__dirname, "../../donnees/scores.json"));
  });

  it("SCORES_FICHIER le remplace, résolu depuis le dossier courant", function () {
    assert.equal(cheminScores({ SCORES_FICHIER: "x/scores.json" }), path.resolve("x/scores.json"));
  });
});
