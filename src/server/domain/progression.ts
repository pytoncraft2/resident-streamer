/**
 * Progression d'une partie (docs/conception/intentions.md §1) : les 4 boss principaux vaincus
 * ouvrent la porte du rez-de-chaussée, révèlent la pièce centrale de l'étage et font apparaître
 * le boss final ; le boss final vaincu termine la partie.
 */

export const BOSS_PRINCIPAUX = ["twitchman", "boss_1", "troll", "manette"] as const;
export const BOSS_FINAL = "super_boss";

/** État des boss d'une room (`Hall_01.boss`), réduit à ce que la progression lit. */
export type EtatBoss = Readonly<Record<string, { readonly vaincu: boolean } | undefined>>;

/** Vrai quand les 4 boss principaux sont vaincus : moment de faire apparaître le boss final. */
export function bossPrincipauxVaincus(boss: EtatBoss): boolean {
  return BOSS_PRINCIPAUX.every((nom) => boss[nom]?.vaincu === true);
}

/** Vrai quand les 4 boss principaux et le boss final sont vaincus : fin de partie. */
export function partieGagnee(boss: EtatBoss): boolean {
  return bossPrincipauxVaincus(boss) && boss[BOSS_FINAL]?.vaincu === true;
}

/**
 * Raccourci de développement : `BOSS_FINAL_DIRECT=1` active le boss final dès le début de la partie,
 * sans vaincre les 4 boss (recette et tests du boss final). Inactif par défaut.
 */
export function bossFinalDirect(env: Readonly<Record<string, string | undefined>> = process.env): boolean {
  return env.BOSS_FINAL_DIRECT === "1";
}
