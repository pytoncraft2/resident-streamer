/**
 * Contournements pour exécuter Phaser 4 en HEADLESS avec `@geckos.io/phaser-on-nodejs` 1.3.1
 * (anomalie B1, ADR-001) : sans eux, `Game.destroy()` lève une exception et chaque room
 * détruite reste en mémoire.
 *
 * 1. Le pont ne fournit pas `window.cancelAnimationFrame` (appelé à l'arrêt de la boucle).
 * 2. jsdom expose `screen.orientation.addEventListener` sans `removeEventListener`
 *    (appelé par le ScaleManager à la destruction).
 * 3. Sous Node, les images par défaut se chargent de façon synchrone : l'événement
 *    `SYSTEM_READY` part avant que le TextureManager s'y abonne, si bien que
 *    `textures.stamp` n'est jamais créé et que `TextureManager.destroy()` plante.
 *
 * À réévaluer à chaque montée de Phaser ou du pont : ces contournements deviennent inutiles
 * si l'environnement fournit ces API ou si Phaser corrige l'ordre d'initialisation.
 */
import Phaser from "phaser";

interface OrientationSimulee {
  addEventListener?: unknown;
  removeEventListener?: unknown;
}

/** Vue minimale des globaux installés par le pont (jsdom), sans dépendre des types DOM. */
interface GlobauxSimules {
  window?: { cancelAnimationFrame?: unknown };
  screen?: { orientation?: OrientationSimulee };
}

/** Champs que Phaser crée normalement sur `SYSTEM_READY` (déclarés `readonly` dans ses types). */
interface TexturesCompletables {
  stamp?: Phaser.GameObjects.Image;
  tileSprite?: Phaser.GameObjects.TileSprite;
}

const rien = (): void => undefined;

/** Ajoute les API manquantes de l'environnement simulé. Sans effet si elles existent déjà. */
export function installerPolyfillsHeadless(): void {
  const globaux = globalThis as unknown as GlobauxSimules;
  const fenetre = globaux.window;
  if (fenetre && typeof fenetre.cancelAnimationFrame !== "function") {
    fenetre.cancelAnimationFrame = rien;
  }
  const orientation = globaux.screen?.orientation;
  if (orientation && typeof orientation.addEventListener === "function" && typeof orientation.removeEventListener !== "function") {
    orientation.removeEventListener = rien;
  }
}

/**
 * Crée `textures.stamp` et `textures.tileSprite` comme le ferait Phaser sur `SYSTEM_READY`
 * (src/textures/TextureManager.js), s'ils manquent. À appeler juste après `new Phaser.Game()` :
 * le démarrage peut avoir eu lieu dans le constructeur (document déjà chargé) ou plus tard.
 */
export function completerDemarrageHeadless(game: Phaser.Game): void {
  const completer = (): void => {
    const sceneSysteme = game.scene.systemScene;
    const textures = game.textures as unknown as TexturesCompletables;
    if (textures.stamp || !sceneSysteme) return;
    textures.stamp = new Phaser.GameObjects.Image(sceneSysteme, 0, 0, "__DEFAULT").setOrigin(0);
    textures.tileSprite = new Phaser.GameObjects.TileSprite(sceneSysteme, 0, 0, 256, 256, "__WHITE").setOrigin(0);
  };
  if (game.scene.systemScene) completer();
  else game.events.once(Phaser.Core.Events.READY, completer);
}
