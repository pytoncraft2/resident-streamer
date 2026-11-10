import { strict as assert } from "assert";
import { action, condition, recharge, selecteur, sequence, TraceArbre } from "../../src/server/ia/arbre";
import { ArbreBoss, decider, PerceptionBoss } from "../../src/server/ia/boss";
import { arbreBoss1, PLACE_BOSS_1 } from "../../src/server/ia/bosses/boss_1";
import { arbreManette, PLACE_MANETTE } from "../../src/server/ia/bosses/manette";
import { arbreTroll, PLACE_TROLL } from "../../src/server/ia/bosses/troll";
import { arbreTwitchman, PLACE_TWITCHMAN } from "../../src/server/ia/bosses/twitchman";
import { arbreBossFinal, REGLAGES_BOSS_FINAL } from "../../src/server/ia/bosses/super_boss";
import { formaterDecision, resumerIntentions, traceIaActive } from "../../src/server/ia/trace";

const nouvelleTrace = (): TraceArbre => ({ lignes: [], profondeur: 0 });

describe("ia/arbre · trace des décisions", function () {
  const arbre: ArbreBoss = selecteur(
    "boss",
    sequence("attaquer", condition("cible proche", () => false), action("frapper", () => undefined)),
    sequence(
      "tirer",
      condition("cible visible", () => true),
      recharge("tir", 1000, action("lancer", (c) => c.intentions.push({ type: "aptitude", nom: "Z", entree: { z: true } }))),
    ),
  );
  const perception = (temps: number): PerceptionBoss => ({ position: { x: 0, y: 0 }, temps });

  it("une ligne par nœud évalué, indentée selon la profondeur, avec son résultat ; les nœuds non évalués n'apparaissent pas", function () {
    const trace = nouvelleTrace();
    decider(arbre, perception(0), new Map(), trace);
    assert.deepEqual(trace.lignes, [
      "boss ✔",
      "  attaquer ✘",
      "    cible proche ✘",
      "  tirer ✔",
      "    cible visible ✔",
      "    tir ✔",
      "      lancer ✔",
    ]);
    assert.equal(trace.profondeur, 0);
  });

  it("une recharge en cours est marquée ⏳ et n'évalue pas son enfant", function () {
    const memoire = new Map<string, number>();
    decider(arbre, perception(0), memoire);
    const trace = nouvelleTrace();
    decider(arbre, perception(500), memoire, trace);
    assert.deepEqual(trace.lignes.slice(3), ["  tirer ✘", "    cible visible ✔", "    tir ⏳"]);
  });

  it("sans trace : mêmes intentions (la trace n'influence pas la décision)", function () {
    const avec = decider(arbre, perception(0), new Map(), nouvelleTrace());
    const sans = decider(arbre, perception(0), new Map());
    assert.deepEqual(avec, sans);
  });
});

describe("ia/trace · activation et format", function () {
  it("IA_TRACE : désactivée par défaut ; 1 ou tous ; ou une liste de boss", function () {
    assert.equal(traceIaActive("troll", {}), false);
    assert.equal(traceIaActive("troll", { IA_TRACE: "" }), false);
    assert.equal(traceIaActive("troll", { IA_TRACE: "1" }), true);
    assert.equal(traceIaActive("troll", { IA_TRACE: "tous" }), true);
    assert.equal(traceIaActive("troll", { IA_TRACE: "manette, troll" }), true);
    assert.equal(traceIaActive("boss_1", { IA_TRACE: "manette,troll" }), false);
  });

  it("résumé des intentions en une ligne", function () {
    assert.equal(resumerIntentions([]), "rien");
    assert.equal(
      resumerIntentions([
        { type: "orienter", versLaGauche: true },
        { type: "aptitude", nom: "Z", entree: { z: true } },
        { type: "rejoindre", position: { x: 427.4, y: 755 }, duree: 900 },
      ]),
      "orienter à gauche, aptitude Z, rejoindre (427, 755)",
    );
  });

  it("bloc de décision : boss, nœuds, intentions", function () {
    assert.equal(formaterDecision("troll", ["troll ✘"], []), "[IA troll]\n  troll ✘\n  ⇒ rien");
  });
});

describe("ia/bosses · perte de cible (aucun joueur)", function () {
  const sansCible = (position: { x: number; y: number }, extra: Partial<PerceptionBoss> = {}): PerceptionBoss => ({ position, temps: 10000, ...extra });
  const cas: [string, ArbreBoss, PerceptionBoss][] = [
    ["boss_1", arbreBoss1, sansCible({ x: PLACE_BOSS_1.x + 300, y: PLACE_BOSS_1.y })],
    ["manette", arbreManette, sansCible({ x: PLACE_MANETTE.x + 300, y: PLACE_MANETTE.y })],
    ["troll", arbreTroll, sansCible({ x: PLACE_TROLL.x + 300, y: PLACE_TROLL.y })],
    ["twitchman", arbreTwitchman, sansCible({ x: PLACE_TWITCHMAN.x + 300, y: PLACE_TWITCHMAN.y })],
    ["boss final (trône)", arbreBossFinal, sansCible({ x: 3000, y: -880 }, { tronesRestants: 6 })],
    ["boss final (vol)", arbreBossFinal, sansCible({ x: 3000, y: REGLAGES_BOSS_FINAL.yVol }, { tronesRestants: 0, vie: 30 })],
    ["boss final (rage)", arbreBossFinal, sansCible({ x: 3000, y: REGLAGES_BOSS_FINAL.yVol }, { tronesRestants: 0, vie: 10 })],
  ];
  for (const [nom, arbre, perception] of cas) {
    it(`${nom} : aucune intention, même loin de sa place (il attend qu'un joueur réapparaisse)`, function () {
      assert.deepEqual(decider(arbre, perception), []);
    });
  }
});
