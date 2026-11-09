/**
 * Camp d'une entité de la scène serveur (hall.ts) : groupe des joueurs, groupe des ennemis (boss,
 * éléments du trône), ou aucun (projectiles, décor). Utilisé par les attaques pour appliquer
 * `peutBlesser` / `peutSoigner` (domain/combat.ts).
 */
import { Camp } from "../domain/combat";

interface Groupe {
  contains(objet: unknown): boolean;
}

/** Vue minimale de la scène : ses deux groupes d'entités. */
export interface SceneCamps {
  readonly players: Groupe;
  readonly enemies: Groupe;
}

export function campDe(scene: SceneCamps, objet: unknown): Camp | undefined {
  if (scene.players.contains(objet)) return "players";
  if (scene.enemies.contains(objet)) return "enemies";
  return undefined;
}
