import { strict as assert } from "assert";
import { construireRegistre, definirPersonnage, Entree } from "../../src/server/game/scenes/Aptitudes/definition";

interface Faux {
  journal: string[];
}

const note = (texte: string) => (p: Faux, _entree: Entree): void => void p.journal.push(texte);

describe("Aptitudes/definition · construireRegistre", function () {
  const joueur = definirPersonnage<Faux>({
    initialiser: (p) => void p.journal.push("init"),
    touches: { A: { nom: "cross", action: note("A") }, TAB: { nom: "fusion", action: note("TAB") } },
  });
  const boss = definirPersonnage<Faux>({
    touches: { Z: { nom: "lancer", action: note("Z") } },
    auto: (p) => void p.journal.push("auto"),
  });
  const registre = construireRegistre({ joueur, boss });

  it("une entrée par personnage, nommée par sa clé", function () {
    assert.deepEqual(Object.keys(registre).sort(), ["boss", "joueur"]);
  });

  it("chaque touche définie appelle son action ; le nom de l'aptitude devient la commande affichée", function () {
    const p: Faux = { journal: [] };
    registre.joueur?.A?.(p, { a: true });
    registre.joueur?.TAB?.(p, {});
    assert.deepEqual(p.journal, ["A", "TAB"]);
    assert.deepEqual(registre.joueur?.commandes, { A: "cross", TAB: "fusion" });
    assert.equal(registre.joueur?.Z, undefined);
  });

  it("initialiser devient StatsSupplementaire ; sans initialiser, une fonction vide (toujours appelable)", function () {
    const p: Faux = { journal: [] };
    registre.joueur?.StatsSupplementaire(p, registre);
    registre.boss?.StatsSupplementaire(p, registre);
    assert.deepEqual(p.journal, ["init"]);
  });

  it("auto seulement pour un personnage qui en définit une (boss)", function () {
    assert.equal(typeof registre.boss?.auto, "function");
    assert.equal(registre.joueur?.auto, undefined);
  });

  it("chaque personnage a ses propres commandes (pas d'objet partagé)", function () {
    assert.notEqual(registre.joueur?.commandes, registre.boss?.commandes);
    assert.deepEqual(registre.boss?.commandes, { Z: "lancer" });
  });
});
