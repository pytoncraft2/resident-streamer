// Configuration mocha : tests TypeScript exécutés via ts-node avec la config stricte de test/.
process.env.TS_NODE_PROJECT = "test/tsconfig.json";

module.exports = {
  require: ["ts-node/register"],
  extension: ["ts"],
  spec: ["test/**/*.test.ts"],
  // Les tests d'intégration démarrent un vrai serveur Phaser HEADLESS.
  timeout: 30000,
};
