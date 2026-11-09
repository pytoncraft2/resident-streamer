/**
 * Boss final (docs/conception/intentions.md §3), conçu en trois phases ; seule la phase « Trône »
 * est implémentée pour l'instant :
 *
 *   boss final : sélecteur
 *     └─ trône : séquence
 *          [rangées de trône restantes > 0] → [cible dans la pièce centrale de l'étage ?]
 *          → recharge (RECHARGE_PC ms) → lancer un PC vers la cible (aptitude Z)
 *
 * Pendant la phase « Trône », le boss est assis (frame « tronehaut » du siège), invisible en tant
 * que sprite et invulnérable ; chaque coup porté au trône en fait tomber une rangée (Aptitudes/super_boss.ts).
 */
import { action, condition, recharge, selecteur, sequence } from "../arbre";
import { ArbreBoss, ContexteBoss, contient, Zone } from "../boss";

/** Réglages du boss final, regroupés pour l'équilibrage. */
export const REGLAGES_BOSS_FINAL = {
  /** Vie une fois le trône détruit (3 fois un boss normal). */
  vie: 30,
  /** Délai minimal entre deux PC lancés pendant la phase « Trône », en ms. */
  rechargePc: 2000,
  /** Dégâts d'un PC lancé. */
  degatPc: 1,
  /** Vitesse d'un PC lancé, en px/s. */
  vitessePc: 700,
  /** Durée de vie d'un PC lancé, en ms. */
  dureePc: 4000,
  /** Descente du trône quand une rangée tombe, en px (écart entre deux rangées). */
  hauteurRangee: 130,
  /** Hauteur où le boss réapparaît une fois le trône détruit, au-dessus du sol de l'étage (y ≈ -250). */
  yApresTrone: -400,
  /** Délai minimal entre deux rangées qui tombent, en ms (une explosion ou un projectile touche plusieurs fois). */
  delaiEntreChutes: 400,
} as const;

/** Pièce centrale de l'étage, entre celle de troll (x < 1789) et celle de manette (x > 3802). */
export const PIECE_BOSS_FINAL: Zone = { xMin: 1789, xMax: 3802, yMax: -249 };

const enPhaseTrone = ({ perception }: ContexteBoss): boolean => (perception.tronesRestants ?? 0) > 0;

export const arbreBossFinal: ArbreBoss = selecteur(
  "boss final",
  sequence(
    "trône",
    condition("trône encore debout", enPhaseTrone),
    condition("cible dans la pièce centrale", ({ perception }) => perception.cible !== undefined && contient(PIECE_BOSS_FINAL, perception.cible.position)),
    recharge(
      "lancer un PC",
      REGLAGES_BOSS_FINAL.rechargePc,
      action("lancer un PC vers la cible", (c) => c.intentions.push({ type: "aptitude", nom: "Z", entree: { z: true } })),
    ),
  ),
);
