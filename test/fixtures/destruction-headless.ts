/**
 * Processus séparé (les globaux du pont ne doivent pas polluer les autres tests).
 * Crée puis détruit N jeux Phaser HEADLESS comme une room, puis affiche en JSON
 * le nombre d'erreurs de destruction et de jeux encore en mémoire après GC.
 * Lancement : node --expose-gc -r ts-node/register test/fixtures/destruction-headless.ts [--sans-correctif]
 */
import "@geckos.io/phaser-on-nodejs";
import Phaser from "phaser";
import { completerDemarrageHeadless, installerPolyfillsHeadless } from "../../src/server/game/phaserHeadless";

interface Resultat {
  jeux: number;
  erreurs: number;
  enMemoire: number;
  premiereErreur?: string;
}

interface FenetreEcoutable {
  addEventListener(type: "error", ecouteur: (ev: { error?: { message?: string } }) => void): void;
}

const N = 20;
const corrige = !process.argv.includes("--sans-correctif");
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const gc = (globalThis as unknown as { gc?: () => void }).gc;

async function main(): Promise<void> {
  if (!gc) throw new Error("lancer avec --expose-gc");
  if (corrige) installerPolyfillsHeadless();

  const resultat: Resultat = { jeux: N, erreurs: 0, enMemoire: 0 };
  // Les exceptions levées dans la boucle Phaser sont rapportées par jsdom sur window, pas sur process.
  const fenetre = (globalThis as unknown as { window: FenetreEcoutable }).window;
  fenetre.addEventListener("error", (ev) => {
    resultat.erreurs++;
    resultat.premiereErreur ??= ev.error?.message;
  });

  const references: WeakRef<Phaser.Game>[] = [];
  for (let i = 0; i < N; i++) {
    const game = new Phaser.Game({
      type: Phaser.HEADLESS,
      width: 800,
      height: 600,
      banner: false,
      audio: { noAudio: true },
      physics: { default: "arcade" },
      scene: {
        create(this: Phaser.Scene) {
          for (let j = 0; j < 20; j++) this.physics.add.sprite(j, j, "__DEFAULT");
        },
      },
    });
    if (corrige) completerDemarrageHeadless(game);
    await pause(100);
    game.destroy(true);
    references.push(new WeakRef(game));
    await pause(50);
  }

  await pause(300);
  gc();
  await pause(100);
  gc();
  resultat.enMemoire = references.filter((r) => r.deref() !== undefined).length;
  process.stdout.write(`RESULTAT ${JSON.stringify(resultat)}\n`);
  process.exit(0);
}

main().catch((e: unknown) => {
  process.stdout.write(`ECHEC ${e instanceof Error ? e.message : String(e)}\n`);
  process.exit(1);
});
