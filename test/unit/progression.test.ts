import { strict as assert } from "assert";
import { BOSS_PRINCIPAUX, bossPrincipauxVaincus, EtatBoss, partieGagnee } from "../../src/server/domain/progression";

const etat = (...vaincus: string[]): EtatBoss =>
  Object.fromEntries([...BOSS_PRINCIPAUX, "super_boss"].map((nom) => [nom, { vaincu: vaincus.includes(nom) }]));

describe("domain/progression (intentions §1)", function () {
  it("le boss final n'apparaît pas tant qu'un boss principal vit, même troll + manette vaincus", function () {
    assert.equal(bossPrincipauxVaincus(etat("troll", "manette")), false);
    assert.equal(bossPrincipauxVaincus(etat("twitchman", "boss_1", "troll")), false);
  });

  it("le boss final apparaît quand les 4 boss principaux sont vaincus", function () {
    assert.equal(bossPrincipauxVaincus(etat(...BOSS_PRINCIPAUX)), true);
  });

  it("la partie n'est gagnée qu'avec le boss final vaincu en plus des 4", function () {
    assert.equal(partieGagnee(etat(...BOSS_PRINCIPAUX)), false);
    assert.equal(partieGagnee(etat(...BOSS_PRINCIPAUX, "super_boss")), true);
  });

  it("le boss final seul ne suffit pas", function () {
    assert.equal(partieGagnee(etat("super_boss")), false);
  });

  it("un boss absent de l'état compte comme non vaincu", function () {
    assert.equal(bossPrincipauxVaincus({ twitchman: { vaincu: true } }), false);
  });
});
