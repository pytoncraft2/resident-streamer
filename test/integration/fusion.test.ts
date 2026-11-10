/**
 * Fusion (TAB) avec un boss vaincu, cycle complet, caractérisé sur le boss final (BOSS_FINAL_DIRECT=1,
 * seul boss qu'on peut vaincre sans parcourir la carte) :
 *   seul → [TAB près d'un boss vaincu] porte le boss (boss réduit à 0,2, au-dessus du joueur)
 *        → [TAB] fusionné (joueur réduit à 0,2, il pilote le boss, interface du boss)
 *        → [5 s] fin : boss retiré, son « ejection », joueur à sa taille, son interface.
 */
import { strict as assert } from "assert";
import { Client, Room } from "@colyseus/sdk";
import { attendre, demarrerServeur, ServeurDeTest } from "../helpers/serveur";
import { ClavierEnvoye, OptionsJeu } from "../../src/shared/messages";
import { EtatPresence } from "../../src/shared/etats";

interface EtatJeu {
  readonly presences?: { get(cle: string): EtatPresence | undefined; values(): IterableIterator<EtatPresence>; entries(): IterableIterator<[string, EtatPresence]> };
}

const AU_REPOS: ClavierEnvoye = {
  a: false, z: false, e: false, r: false, space: false, right: false, left: false, up: false, down: false, tab: false,
  a_fin: false, z_fin: false, space_fin: false, right_fin: false, left_fin: false, right_debut: false, left_debut: false, tab_fin: false,
};
const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
const proche = (a: number | undefined, b: number, ecart: number): boolean => a !== undefined && Math.abs(a - b) < ecart;

describe("fusion avec un boss vaincu (intégration)", function () {
  this.timeout(150000);
  let serveur: ServeurDeTest;

  before(async function () {
    serveur = await demarrerServeur({ env: { BOSS_FINAL_DIRECT: "1" } });
  });

  after(async function () {
    await serveur?.arreter();
  });

  it("porter le boss, fusionner, le piloter, puis fin au bout de 5 s", async function () {
    const options: OptionsJeu = { salon: `fusion-${Date.now()}`, sprite: "fakhear" };
    const room: Room<unknown, EtatJeu> = await new Client(serveur.wsUrl).joinOrCreate<EtatJeu>("game_instance", options);
    const historique: EtatPresence[] = [];
    room.onMessage("*", () => undefined);
    room.onStateChange(() => {
      const p = room.state.presences?.get(room.sessionId);
      if (p) historique.push({ ...p, commandes: p.commandes ? { ...p.commandes } : undefined });
    });
    const moi = (): EtatPresence | undefined => room.state.presences?.get(room.sessionId);
    const entreeBoss = (): [string, EtatPresence] | undefined =>
      Array.from(room.state.presences?.entries() ?? []).find(([, p]) => p.sprite === "super_boss");
    const boss = (): EtatPresence | undefined => entreeBoss()?.[1];
    const appui = async (entree: Partial<ClavierEnvoye>, ms = 150): Promise<void> => {
      room.send("inputs", { ...AU_REPOS, ...entree });
      await pause(ms);
      room.send("inputs", AU_REPOS);
    };
    const remonterSiBesoin = async (): Promise<void> => {
      if ((moi()?.y ?? 0) > 0) {
        await appui({ up: true }, 100);
        await pause(1500);
      }
    };

    try {
      await attendre(() => boss() !== undefined, 6000, "boss final présent");
      await remonterSiBesoin();
      await appui({ up: true }, 100);
      await pause(1500);

      // Vaincre le boss final (échelle 0,5 : figurine).
      const debut = Date.now();
      while ((boss()?.scale ?? 1) > 0.6) {
        assert.ok(Date.now() - debut < 70000, "boss final non vaincu à temps");
        await remonterSiBesoin();
        await appui({ a: true }, 100);
        await pause(400);
      }

      // 1. Porter le boss : TAB à portée ; le boss réduit à 0,2 suit le joueur, au-dessus de lui.
      for (let essai = 0; essai < 60 && (boss()?.scale ?? 1) > 0.3; essai++) {
        await remonterSiBesoin();
        const b = boss(), j = moi();
        if (!b || !j) break;
        const dx = (b.x ?? 0) - (j.x ?? 0);
        if (Math.abs(dx) > 100) {
          room.send("inputs", { ...AU_REPOS, [dx > 0 ? "right" : "left"]: true });
          await pause(150);
        }
        await appui({ space: true, tab: true });
        await pause(200);
      }
      assert.ok(proche(boss()?.scale, 0.2, 0.01), `boss non porté (échelle ${boss()?.scale})`);
      await attendre(() => proche(boss()?.x, moi()?.x ?? 0, 30) && (boss()?.y ?? 0) < (moi()?.y ?? 0), 2000, "boss au-dessus du joueur");
      const cleBoss = entreeBoss()?.[0] ?? "";

      // 2. Fusionner : TAB ; le joueur réduit à 0,2, le boss à sa taille, interface du boss.
      const avantFusion = historique.length;
      await appui({ tab: true });
      await attendre(() => proche(moi()?.scale, 0.2, 0.01) && proche(boss()?.scale, 1, 0.01), 2000, "fusion");
      await attendre(() => historique.slice(avantFusion).some((p) => p.sprite_fusion === "super_boss" && p.commandes?.A === "impact"), 2000, "interface du boss");

      // 3. Piloter le boss : la touche droite le déplace.
      const xBoss = boss()?.x ?? 0;
      room.send("inputs", { ...AU_REPOS, right: true, right_debut: true });
      await attendre(() => (boss()?.x ?? 0) > xBoss + 50, 2000, "le boss suit les touches du joueur");
      room.send("inputs", AU_REPOS);

      // 4. Fin de la fusion, 5 s après : boss retiré, son « ejection », joueur à sa taille, son interface.
      const avantFin = historique.length;
      await attendre(() => room.state.presences?.get(cleBoss) === undefined, 8000, "boss retiré");
      await attendre(() => proche(moi()?.scale, 1, 0.01), 2000, "joueur à sa taille");
      const fin = historique.slice(avantFin);
      assert.ok(fin.some((p) => p.son === "ejection"), "son « ejection »");
      assert.ok(fin.some((p) => p.commandes?.A === "cross"), "interface du joueur rétablie");
      assert.doesNotMatch(serveur.journal(), /TypeError|Cannot read/, "erreur dans le journal du serveur");
    } finally {
      await room.leave();
    }
  });
});
