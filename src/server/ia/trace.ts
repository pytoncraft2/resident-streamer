/**
 * Trace des décisions des boss, pour le débogage (désactivée par défaut). Activation par la
 * variable d'environnement `IA_TRACE` : `1` ou `tous` pour tous les boss, ou une liste de noms
 * séparés par des virgules (`IA_TRACE=troll,manette`).
 */
import { Intention } from "./boss";

export function traceIaActive(nomBoss: string, env: Readonly<Record<string, string | undefined>> = process.env): boolean {
  const valeur = env.IA_TRACE?.trim();
  if (!valeur) return false;
  if (valeur === "1" || valeur === "tous") return true;
  return valeur.split(",").map((nom) => nom.trim()).includes(nomBoss);
}

/** Intentions en une ligne : `aptitude Z, rejoindre (427, 755)`, ou `rien`. */
export function resumerIntentions(intentions: readonly Intention[]): string {
  if (intentions.length === 0) return "rien";
  return intentions
    .map((i) => {
      switch (i.type) {
        case "aptitude":
          return `aptitude ${i.nom}`;
        case "animation":
          return `animation ${i.nom}`;
        case "rejoindre":
          return `rejoindre (${Math.round(i.position.x)}, ${Math.round(i.position.y)})`;
        case "charger":
          return `charger ${i.decalageX}`;
        case "poursuivre":
          return `poursuivre à ${i.vitesse}`;
        case "orienter":
          return `orienter ${i.versLaGauche ? "à gauche" : "à droite"}`;
        case "vitesseX":
          return `vitesseX ${i.valeur}`;
        case "collisionTemporaire":
          return `collision ${i.duree} ms`;
      }
    })
    .join(", ");
}

/** Bloc de trace d'une décision : nœuds évalués (indentés) puis intentions produites. */
export function formaterDecision(nomBoss: string, lignes: readonly string[], intentions: readonly Intention[]): string {
  return [`[IA ${nomBoss}]`, ...lignes.map((l) => `  ${l}`), `  ⇒ ${resumerIntentions(intentions)}`].join("\n");
}
