/**
 * Chargement CommonJS / ESM (roadmap, phase 2). Le serveur est compilé en CommonJS, mais les paquets
 * Colyseus exposent la condition d'export `module-sync` : Node la retient pour `require` comme pour
 * `import`, si bien qu'ils sont toujours chargés dans leur version ESM, en un seul exemplaire (pas de
 * double chargement CJS + ESM, qui dédoublerait l'état interne de Colyseus). Cela suppose un Node
 * capable de `require()` un module ESM (Node 24, `.nvmrc`). Phaser reste chargé en CommonJS.
 */
import { strict as assert } from "assert";

describe("chargement des modules (CommonJS / ESM)", function () {
  it("Node accepte require() d'un module ESM (requis par la condition module-sync)", function () {
    assert.equal(process.features.require_module, true);
  });

  for (const paquet of ["@colyseus/core", "@colyseus/ws-transport", "@colyseus/schema", "@colyseus/sdk"]) {
    it(`${paquet} : require résout vers la version ESM (un seul exemplaire chargé)`, function () {
      assert.match(require.resolve(paquet), /\/build\/index\.mjs$/);
    });
  }

  it("phaser : version CommonJS (dist/phaser.js), chargée par le pont phaser-on-nodejs", function () {
    assert.match(require.resolve("phaser"), /\/dist\/phaser\.js$/);
  });
});
