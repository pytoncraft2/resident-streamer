/**
 * Publication des états synchronisés de la room de jeu (`RoomState`) : seul endroit qui crée ou
 * modifie les objets synchronisés. Les données publiées respectent les contrats lus par le client
 * (`src/shared/etats.ts`).
 *
 * Un objet déjà publié est modifié en place : Colyseus ne transmet alors que les champs qui ont
 * changé. Mesuré le 2026-11-10 (un joueur en mouvement, boss actifs) : 23,3 Kio/s par client en
 * recréant les objets à chaque image, 1,2 Kio/s en les modifiant (`test/integration/etats.test.ts`).
 * Les champs ponctuels d'une présence (`son`, `particules`, `sprite_fusion`, `commandes`) sont
 * effacés à chaque publication qui ne les reprend pas : ils restent présents une seule publication,
 * comme lorsque l'objet était recréé. Une publication partielle (ex. `commandes` seules) complète
 * l'objet existant au lieu de le remplacer.
 */
import { Commandes, Ligne, Player, Projectile, Rectangle } from "./RoomState";
import { EtatLigne, EtatPresence, EtatProjectile, EtatRectangle } from "../../shared/etats";

interface Collection {
  get(cle: string): unknown;
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

/** Champs d'une présence valables pour une seule publication. */
const PONCTUELS_EFFACES = { son: undefined, particules: undefined, sprite_fusion: undefined, commandes: undefined } as const;

/** Présence d'un joueur, d'un boss ou d'un clone. */
export function publierPresence(scene: unknown, cle: string, etat: EtatPresence): void {
  const presences = etatDe(scene)?.presences;
  if (!presences) return;
  const { commandes, ...reste } = etat;
  const champs = { ...PONCTUELS_EFFACES, ...reste, ...(commandes ? { commandes: new Commandes(commandes) } : {}) };
  const existante = presences.get(cle);
  if (existante instanceof Player) Object.assign(existante, champs);
  else presences.set(cle, new Player(champs));
}

/** Projectile ou élément animé, publié sous son `id`. */
export function publierProjectile(scene: unknown, etat: EtatProjectile): void {
  const projectiles = etatDe(scene)?.projectiles;
  if (!projectiles) return;
  const existant = projectiles.get(etat.id);
  if (existant instanceof Projectile) Object.assign(existant, etat);
  else projectiles.set(etat.id, new Projectile(etat));
}

export function publierLigne(scene: unknown, cle: string, etat: EtatLigne): void {
  const lignes = etatDe(scene)?.lignes;
  if (!lignes) return;
  const existante = lignes.get(cle);
  if (existante instanceof Ligne) Object.assign(existante, etat);
  else lignes.set(cle, new Ligne(etat));
}

export function publierRectangle(scene: unknown, cle: string, etat: EtatRectangle): void {
  const rectangles = etatDe(scene)?.rectangles;
  if (!rectangles) return;
  const existant = rectangles.get(cle);
  if (existant instanceof Rectangle) Object.assign(existant, etat);
  else rectangles.set(cle, new Rectangle(etat));
}
