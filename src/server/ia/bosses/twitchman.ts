/**
 * IA de twitchman (ADR-003), reprise de l'ancien `__auto`. Pièce au rez-de-chaussée, à gauche.
 *
 *   twitchman : sélecteur
 *     ├─ combattre : séquence
 *     │    [cible dans ma pièce ?] → se tourner vers elle →
 *     │    sélecteur
 *     │      ├─ [cible exactement à ma hauteur] charger (aptitude Z) + collision 500 ms avec elle
 *     │      ├─ [< 400] frapper, puis s'envoler vers le coin de son côté (action longue)
 *     │      ├─ [< 900] cible à gauche : charger (Z) ; à droite : s'élever puis tirer le laser (E)
 *     │      └─ avancer vers elle (vitesse 340)
 *     └─ rentrer : [une cible existe et x ≠ 427 ?] → voler jusqu'à (427, 755) (action longue)
 *
 * L'asymétrie à distance moyenne (charge à gauche, laser à droite) est celle de l'ancien code.
 * Différences voulues : l'ancien code cessait définitivement de décider quand la distance valait
 * exactement 400 ou 900, quand la cible avait la même abscisse, ou sans aucun joueur.
 */
import { action, condition, selecteur, sequence } from "../arbre";
import { ArbreBoss, ContexteBoss, contient, distance, Point, Zone } from "../boss";

/** Pièce de twitchman au rez-de-chaussée, à gauche (bornes exclues), reprise de l'ancien code. */
export const PIECE_TWITCHMAN: Zone = { xMax: 1789, yMin: -249 };
export const PLACE_TWITCHMAN: Point = { x: 427, y: 755 };
/** Coins vers lesquels twitchman s'envole après avoir frappé, selon le côté de la cible. */
export const COINS_TWITCHMAN = { gauche: { x: 0, y: 0 }, droite: { x: 1960, y: 0 } } as const;

const cibleAGauche = ({ perception }: ContexteBoss): boolean => (perception.cible?.position.x ?? Infinity) < perception.position.x;
const distanceCible = ({ perception }: ContexteBoss): number =>
  perception.cible ? distance(perception.position, perception.cible.position) : Infinity;

export const arbreTwitchman: ArbreBoss = selecteur(
  "twitchman",
  sequence(
    "combattre",
    condition("cible dans ma pièce", ({ perception }) => perception.cible !== undefined && contient(PIECE_TWITCHMAN, perception.cible.position)),
    action("se tourner vers la cible", (c) => c.intentions.push({ type: "orienter", versLaGauche: cibleAGauche(c) })),
    selecteur(
      "attaque",
      sequence(
        "charger à même hauteur",
        condition("cible exactement à ma hauteur", ({ perception }) => perception.cible?.position.y === perception.position.y),
        action("charger et la percuter", (c) => {
          c.intentions.push({ type: "aptitude", nom: "Z", entree: { z: true } });
          c.intentions.push({ type: "collisionTemporaire", duree: 500 });
        }),
      ),
      sequence(
        "frapper puis s'envoler",
        condition("cible à moins de 400", (c) => distanceCible(c) < 400),
        action("frapper et s'envoler vers le coin", (c) => {
          c.intentions.push({ type: "animation", nom: "twitchman_punch" });
          c.intentions.push({
            type: "rejoindre",
            position: cibleAGauche(c) ? COINS_TWITCHMAN.gauche : COINS_TWITCHMAN.droite,
            delai: 500,
            duree: 1000,
            courbe: "Sine.inOut",
            animationAuDepart: "twitchman_vole",
            attendreLaFin: true,
          });
        }),
      ),
      sequence(
        "distance moyenne",
        condition("cible à moins de 900", (c) => distanceCible(c) < 900),
        selecteur(
          "selon le côté",
          sequence(
            "charger à gauche",
            condition("cible à gauche", cibleAGauche),
            action("charger", (c) => c.intentions.push({ type: "aptitude", nom: "Z", entree: { z: true } })),
          ),
          action("s'élever puis tirer le laser", (c) =>
            c.intentions.push({
              type: "rejoindre",
              position: { x: -40, y: 0 },
              relatifX: true,
              duree: 1000,
              courbe: "Sine.inOut",
              animationAuDepart: "twitchman_vole",
              attendreLaFin: true,
              ensuite: [{ type: "aptitude", nom: "E", entree: { e: true } }],
            }),
          ),
        ),
      ),
      action("avancer vers la cible", (c) => {
        const gauche = cibleAGauche(c);
        c.intentions.push({ type: "vitesseX", valeur: gauche ? -340 : 340 });
        c.intentions.push({ type: "aptitude", nom: gauche ? "toucheGauche" : "toucheDroite", entree: gauche ? { left_debut: true } : { right_debut: true } });
      }),
    ),
  ),
  sequence(
    "rentrer",
    condition("une cible existe et je ne suis pas à ma place", ({ perception }) => perception.cible !== undefined && perception.position.x !== PLACE_TWITCHMAN.x),
    action("voler jusqu'à ma place", (c) =>
      c.intentions.push({ type: "rejoindre", position: PLACE_TWITCHMAN, duree: 900, animationAuDepart: "twitchman_vole", attendreLaFin: true }),
    ),
  ),
);
