/**
 * Boss final (docs/conception/intentions.md §3), en trois phases : « Trône », « Envol », « Rage » :
 *
 *   boss final : sélecteur
 *     ├─ trône : séquence
 *     │    [rangées de trône restantes > 0] → [cible dans la pièce centrale de l'étage ?]
 *     │    → recharge (rechargePc) → lancer un PC vers la cible (aptitude Z)
 *     ├─ rage : séquence
 *     │    [trône détruit] → [vie ≤ rage.seuilVie] → [cible dans la pièce centrale ?] → se tourner vers elle →
 *     │    combat en vol au rythme de la rage, avec la pluie de PC (aptitude R, recharge rage.rechargePluie)
 *     │    juste après la contre-attaque
 *     └─ envol : séquence
 *          [trône détruit] → [cible dans la pièce centrale ?] → se tourner vers elle →
 *          combat en vol : sélecteur
 *            ├─ [frappé depuis peu] → recharge (rechargeContreAttaque) → contre-attaque (aptitude E)
 *            ├─ [piqué récent : encore au sol] → reprendre son souffle (ne rien faire)
 *            ├─ recharge (rechargePique) → piquer devant la cible (action longue), impact (aptitude A)
 *            └─ planer au-dessus de la cible (action longue)
 *
 * Pendant la phase « Trône », le boss est assis (frame « tronehautv2 » du siège), invisible en tant
 * que sprite et invulnérable ; chaque coup porté au trône en fait tomber une rangée (Aptitudes/super_boss.ts).
 * Pendant la phase « Envol », il n'est à portée qu'au sol, juste après un piqué.
 */
import { PIECES } from "../../domain/carte";
import { action, condition, recharge, selecteur, sequence } from "../arbre";
import { ArbreBoss, ContexteBoss, contient, Point, Zone } from "../boss";

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
  /** Délai minimal entre deux rangées qui tombent, en ms (une explosion ou un projectile touche plusieurs fois). */
  delaiEntreChutes: 400,
  /** Altitude de vol pendant la phase « Envol » (sol de l'étage : y ≈ -250). */
  yVol: -650,
  /** Durée d'un déplacement en vol au-dessus de la cible, en ms. */
  dureePlane: 700,
  /** Délai minimal entre deux piqués, en ms (mesuré au départ du piqué). */
  rechargePique: 4000,
  /**
   * Écart horizontal entre la cible et le point d'atterrissage du piqué, du côté d'où vient le boss,
   * en px : il atterrit devant le joueur, à portée de ses coups (la zone de coup est à 150 px devant lui).
   */
  ecartPique: 150,
  /** Durée du piqué jusqu'à la cible, en ms. */
  dureePique: 500,
  /** Temps passé au sol après l'impact d'un piqué, en ms : la fenêtre pour le frapper. */
  pauseAuSol: 1500,
  /** Dégâts de l'impact d'un piqué aux joueurs proches. */
  degatPique: 2,
  /** Rayon de l'impact d'un piqué, en px. */
  rayonPique: 200,
  /** Délai pendant lequel un coup reçu déclenche la contre-attaque, en ms. */
  reactionContreAttaque: 600,
  /** Délai minimal entre deux contre-attaques, en ms. */
  rechargeContreAttaque: 2000,
  /** Délai entre le début de la contre-attaque et l'onde, en ms (le temps de l'animation). */
  delaiContreAttaque: 300,
  /** Dégâts de l'onde de contre-attaque. */
  degatContreAttaque: 1,
  /** Rayon de l'onde de contre-attaque, en px. */
  rayonContreAttaque: 300,
  /** Phase « Rage » : à mi-vie, rythme plus rapide et pluie de PC. */
  rage: {
    /** Vie à partir de laquelle (incluse) le boss enrage. */
    seuilVie: 15,
    rechargePique: 2500,
    dureePique: 350,
    pauseAuSol: 1000,
    dureePlane: 450,
    /** Délai minimal entre deux pluies de PC, en ms. */
    rechargePluie: 5000,
    /** Écarts horizontaux des PC de la pluie autour de la cible, en px (fixes : comportement reproductible). */
    ecartsPluie: [-450, -150, 150, 450],
    /** Hauteur d'où tombent les PC (plafond de la pièce centrale). */
    yPluie: -1000,
    /** Vitesse de chute d'un PC de la pluie, en px/s. */
    vitessePluie: 450,
    /** Durée de vie d'un PC de la pluie, en ms (assez pour traverser la pièce, pas pour atteindre le rez-de-chaussée). */
    dureePluie: 2000,
  },
} as const;

/** Rythme du combat en vol : celui de la phase « Envol », ou celui, plus rapide, de la phase « Rage ». */
interface RythmeVol {
  readonly rechargePique: number;
  readonly dureePique: number;
  readonly pauseAuSol: number;
  readonly dureePlane: number;
}

/** Pièce centrale de l'étage, entre celle de troll (x < 1789) et celle de manette (x > 3802). */
export const PIECE_BOSS_FINAL: Zone = PIECES.super_boss;

/** Abscisses des PC d'une pluie autour d'une abscisse, sans sortir de la pièce centrale. */
export function abscissesPluie(x: number): number[] {
  return REGLAGES_BOSS_FINAL.rage.ecartsPluie.map((ecart) => xDansLaPiece(x + ecart));
}
/** Marge aux murs de la pièce centrale pendant le vol, en px. */
const MARGE_VOL = 200;

const PIQUE = "piquer sur la cible";

const enPhaseTrone = ({ perception }: ContexteBoss): boolean => (perception.tronesRestants ?? 0) > 0;
const enRage = ({ perception }: ContexteBoss): boolean =>
  perception.vie !== undefined && perception.vie <= REGLAGES_BOSS_FINAL.rage.seuilVie;
const cibleDansLaPiece = ({ perception }: ContexteBoss): boolean =>
  perception.cible !== undefined && contient(PIECE_BOSS_FINAL, perception.cible.position);
const cibleAGauche = ({ perception }: ContexteBoss): boolean => (perception.cible?.position.x ?? Infinity) < perception.position.x;
const xDansLaPiece = (x: number): number =>
  Math.min(Math.max(x, (PIECE_BOSS_FINAL.xMin ?? -Infinity) + MARGE_VOL), (PIECE_BOSS_FINAL.xMax ?? Infinity) - MARGE_VOL);

/** Point d'atterrissage du piqué : devant la cible, du côté du boss (à droite s'il est à sa verticale). */
const pointDAtterrissage = (c: ContexteBoss): Point => {
  const cible = c.perception.cible?.position ?? c.perception.position;
  return { x: cible.x + (cibleAGauche(c) || cible.x === c.perception.position.x ? 1 : -1) * REGLAGES_BOSS_FINAL.ecartPique, y: cible.y };
};

/**
 * Combat en vol, commun aux phases « Envol » et « Rage » (seul le rythme change ; la rage ajoute la
 * pluie de PC, après la contre-attaque) : contre-attaquer, reprendre son souffle, piquer, planer.
 * Les recharges portent les mêmes noms dans les deux phases : la mémoire passe de l'une à l'autre.
 */
function combatEnVol(nom: string, rythme: RythmeVol, ...enPlus: ArbreBoss[]): ArbreBoss {
  return selecteur(
    nom,
    sequence(
      "contre-attaquer",
      condition(
        "frappé depuis peu",
        ({ perception, temps }) => perception.dernierCoup !== undefined && temps - perception.dernierCoup < REGLAGES_BOSS_FINAL.reactionContreAttaque,
      ),
      recharge(
        "contre-attaque",
        REGLAGES_BOSS_FINAL.rechargeContreAttaque,
        action("onde de contre-attaque", (c) => c.intentions.push({ type: "aptitude", nom: "E", entree: { e: true } })),
      ),
    ),
    ...enPlus,
    condition("reprendre son souffle au sol après un piqué", ({ memoire, temps }) => {
      const depart = memoire.get(PIQUE);
      return depart !== undefined && temps - depart < rythme.dureePique + rythme.pauseAuSol;
    }),
    recharge(
      PIQUE,
      rythme.rechargePique,
      action("piquer puis frapper le sol", (c) =>
        c.intentions.push({
          type: "rejoindre",
          position: pointDAtterrissage(c),
          duree: rythme.dureePique,
          courbe: "Quad.in",
          animationAuDepart: "super_boss_vole",
          attendreLaFin: true,
          ensuite: [{ type: "aptitude", nom: "A", entree: { a: true } }],
        }),
      ),
    ),
    action("planer au-dessus de la cible", (c) =>
      c.intentions.push({
        type: "rejoindre",
        position: { x: xDansLaPiece(c.perception.cible?.position.x ?? c.perception.position.x), y: REGLAGES_BOSS_FINAL.yVol },
        duree: rythme.dureePlane,
        courbe: "Sine.inOut",
        animationAuDepart: "super_boss_vole",
        attendreLaFin: true,
      }),
    ),
  );
}

export const arbreBossFinal: ArbreBoss = selecteur(
  "boss final",
  sequence(
    "trône",
    condition("trône encore debout", enPhaseTrone),
    condition("cible dans la pièce centrale", cibleDansLaPiece),
    recharge(
      "lancer un PC",
      REGLAGES_BOSS_FINAL.rechargePc,
      action("lancer un PC vers la cible", (c) => c.intentions.push({ type: "aptitude", nom: "Z", entree: { z: true } })),
    ),
  ),
  sequence(
    "rage",
    condition("trône détruit", (c) => !enPhaseTrone(c)),
    condition("à mi-vie", enRage),
    condition("cible dans la pièce centrale", cibleDansLaPiece),
    action("se tourner vers la cible", (c) => c.intentions.push({ type: "orienter", versLaGauche: cibleAGauche(c) })),
    combatEnVol("attaque enragée", REGLAGES_BOSS_FINAL.rage, recharge(
      "pluie de PC",
      REGLAGES_BOSS_FINAL.rage.rechargePluie,
      action("faire pleuvoir des PC autour de la cible", (c) => c.intentions.push({ type: "aptitude", nom: "R", entree: { r: true } })),
    )),
  ),
  sequence(
    "envol",
    condition("trône détruit", (c) => !enPhaseTrone(c)),
    condition("cible dans la pièce centrale", cibleDansLaPiece),
    action("se tourner vers la cible", (c) => c.intentions.push({ type: "orienter", versLaGauche: cibleAGauche(c) })),
    combatEnVol("attaque en vol", REGLAGES_BOSS_FINAL),
  ),
);
