/**
 * Révélation du boss final (intentions §1), une seule fois par partie : porte du rez-de-chaussée
 * ouverte (RDC_OK), pièce centrale de l'étage révélée (ETAGE_OK), boss final et trône actifs.
 * Appelée quand les 4 boss sont vaincus (PlayerClass) ou dès sa création avec BOSS_FINAL_DIRECT=1 (Hall_01).
 */
import { BOSS_FINAL } from "../domain/progression";
import { canalJeu, RoomDiffusante } from "../../shared/messages";

interface EntiteActivable {
  setActive(actif: boolean): unknown;
}

/** Boss final tel que créé par Aptitudes/super_boss.ts. */
interface BossFinal extends EntiteActivable {
  trones: EntiteActivable;
  /** Installation propre au boss final au moment de sa révélation (trône, position). */
  surRevelation?: () => void;
}

/** Vue minimale de la room Colyseus `game_instance` (Hall_01). */
export interface RoomBossFinal extends RoomDiffusante {
  bossFinalRevele?: boolean;
  boss: Record<string, { id?: string } | undefined>;
  scene: { enemiesRef: Record<string, BossFinal | undefined> };
}

/** @returns `false` si le boss final était déjà révélé ou n'existe pas encore. */
export function revelerBossFinal(room: RoomBossFinal): boolean {
  const id = room.boss[BOSS_FINAL]?.id;
  const bossFinal = id !== undefined ? room.scene.enemiesRef[id] : undefined;
  if (room.bossFinalRevele || !bossFinal) return false;
  room.bossFinalRevele = true;
  canalJeu.diffuser(room, "RDC_OK");
  canalJeu.diffuser(room, "ETAGE_OK");
  bossFinal.setActive(true);
  bossFinal.trones.setActive(true);
  bossFinal.surRevelation?.();
  return true;
}
