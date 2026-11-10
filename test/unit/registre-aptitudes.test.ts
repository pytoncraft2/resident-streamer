import { strict as assert } from "assert";
import { AnimationPersonnage, construireRegistre, definirPersonnage, Entree, imageQuiBlesse, nomsDesImages, STATS_PAR_DEFAUT, statsDe, TOUTES_LES_IMAGES } from "../../src/server/game/scenes/Aptitudes/definition";

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
  const DEFAUT = {
    toucheGauche: note("gauche"), toucheDroite: note("droite"), toucheHaut: note("haut"), toucheBas: note("bas"), toucheEspace: note("espace"),
  };
  const registre = construireRegistre({ joueur, boss }, DEFAUT);

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

describe("Aptitudes/definition · animations", function () {
  const cross: AnimationPersonnage = { cle: "cross", prefixe: "cross", images: { debut: 0, fin: 5 }, frameRate: 23, imageQuiBlesse: "cross4" };
  const attaque: AnimationPersonnage = { cle: "attaque", prefixe: "attackchaiseboss", images: { debut: 0, fin: 1 }, frameRate: 12, imageQuiBlesse: TOUTES_LES_IMAGES };
  const vole: AnimationPersonnage = { cle: "vole", prefixe: "bossfly", images: [0, 1, 4, 5], frameRate: 18 };

  it("nomsDesImages : intervalle inclusif ou liste explicite (trous de l'atlas)", function () {
    assert.deepEqual(nomsDesImages(cross), ["cross0", "cross1", "cross2", "cross3", "cross4", "cross5"]);
    assert.deepEqual(nomsDesImages(vole), ["bossfly0", "bossfly1", "bossfly4", "bossfly5"]);
  });

  it("imageQuiBlesse : seulement l'image indiquée, ou toutes ; jamais pour une animation inconnue ou sans coup", function () {
    const animations = [cross, attaque, vole];
    assert.equal(imageQuiBlesse(animations, "cross", "cross4"), true);
    assert.equal(imageQuiBlesse(animations, "cross", "cross3"), false);
    assert.equal(imageQuiBlesse(animations, "attaque", "attackchaiseboss0"), true);
    assert.equal(imageQuiBlesse(animations, "vole", "bossfly1"), false);
    assert.equal(imageQuiBlesse(animations, "inconnue", "cross4"), false);
  });

  it("le registre porte les animations propres de chaque personnage (vide par défaut)", function () {
    const rien = (): void => undefined;
    const registre = construireRegistre(
      { avec: definirPersonnage<object>({ touches: {}, animations: [cross] }), sans: definirPersonnage<object>({ touches: {} }) },
      { toucheGauche: rien, toucheDroite: rien, toucheHaut: rien, toucheBas: rien, toucheEspace: rien },
    );
    assert.deepEqual(registre.avec?.animations, [cross]);
    assert.deepEqual(registre.sans?.animations, []);
  });
});

describe("Aptitudes/definition · stats et déplacements", function () {
  const note = (texte: string) => (p: Faux, _entree: Entree): void => void p.journal.push(texte);
  const DEFAUT = {
    toucheGauche: note("gauche"), toucheDroite: note("droite"), toucheHaut: note("haut"), toucheBas: note("bas"), toucheEspace: note("espace"),
  };

  it("statsDe : valeurs par défaut complétées par la définition", function () {
    assert.deepEqual(statsDe(definirPersonnage({ touches: {} })), STATS_PAR_DEFAUT);
    assert.deepEqual(statsDe(definirPersonnage({ touches: {}, stats: { degat: 2 } })), { ...STATS_PAR_DEFAUT, degat: 2 });
  });

  it("déplacements par défaut pour tous, remplacés seulement là où la définition en fournit", function () {
    const registre = construireRegistre(
      {
        marcheur: definirPersonnage<Faux>({ touches: {} }),
        coureur: definirPersonnage<Faux>({ touches: {}, deplacements: { toucheDroite: note("course"), toucheEspace: () => undefined } }),
      },
      DEFAUT,
    );
    const p: Faux = { journal: [] };
    registre.marcheur?.toucheDroite(p, {});
    registre.coureur?.toucheDroite(p, {});
    registre.coureur?.toucheGauche(p, {});
    registre.coureur?.toucheEspace(p, {});
    assert.deepEqual(p.journal, ["droite", "course", "gauche"]);
  });

  it("les stats du registre sont celles de statsDe", function () {
    const registre = construireRegistre({ boss: definirPersonnage<Faux>({ touches: {}, stats: { vie: 30 } }) }, DEFAUT);
    assert.deepEqual(registre.boss?.stats, { ...STATS_PAR_DEFAUT, vie: 30 });
  });
});
