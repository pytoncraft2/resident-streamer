/**
 * Publication des états synchronisés de la room de jeu (`RoomState`) : seul endroit qui crée les
 * objets synchronisés. Les données publiées respectent les contrats lus par le client
 * (`src/shared/etats.ts`).
 *
 * Chaque publication remplace l'objet synchronisé (comportement historique) : les champs
 * ponctuels (`son`, `particules`…) disparaissent d'eux-mêmes à la publication suivante.
 */
import { Commandes, Ligne, Player, Projectile, Rectangle } from "./RoomState";
import { EtatLigne, EtatPresence, EtatProjectile, EtatRectangle } from "../../shared/etats";

interface Collection {
  set(cle: string, valeur: unknown): unknown;
}

/** État synchronisé de la room, atteint depuis une scène (ou une scène détruite : `undefined`). */
interface EtatRoom {
  readonly presences: Collection;
  readonly projectiles: Collection;
  readonly lignes: Collection;
  readonly rectangles: Collection;
}

function etatDe(scene: unknown): EtatRoom | undefined {
  if (typeof scene !== "object" || scene === null || !("room" in scene)) return undefined;
  const room = scene.room;
  if (typeof room !== "object" || room === null || !("state" in room)) return undefined;
  // RoomState de Hall_01 (schéma Colyseus) : ses collections ont la forme de EtatRoom.
  return room.state as EtatRoom;
}

/** Présence d'un joueur, d'un boss ou d'un clone. */
export function publierPresence(scene: unknown, cle: string, etat: EtatPresence): void {
  const { commandes, ...reste } = etat;
  etatDe(scene)?.presences.set(cle, new Player(commandes ? { ...reste, commandes: new Commandes(commandes) } : reste));
}

/** Projectile ou élément animé, publié sous son `id`. */
export function publierProjectile(scene: unknown, etat: EtatProjectile): void {
  etatDe(scene)?.projectiles.set(etat.id, new Projectile(etat));
}

export function publierLigne(scene: unknown, cle: string, etat: EtatLigne): void {
  etatDe(scene)?.lignes.set(cle, new Ligne(etat));
}

export function publierRectangle(scene: unknown, cle: string, etat: EtatRectangle): void {
  etatDe(scene)?.rectangles.set(cle, new Rectangle(etat));
}
