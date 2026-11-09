// Configuration mocha : tests TypeScript exécutés via ts-node avec la config stricte de test/.
process.env.TS_NODE_PROJECT = "test/tsconfig.json";

module.exports = {
  require: ["ts-node/register"],
  // Node ≥ 23 charge les .ts nativement (types retirés, sans vérification) : mocha 9 essaie import()
  // avant require(), si bien qu'un test pouvait échapper à ts-node. On force le passage par ts-node.
  "node-option": ["no-experimental-strip-types"],
  extension: ["ts"],
  spec: ["test/**/*.test.ts"],
  // Les tests d'intégration démarrent un vrai serveur Phaser HEADLESS.
  timeout: 30000,
};
