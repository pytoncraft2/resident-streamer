/**
 * Fin de partie, décidée par le serveur (anomalie B3) : le temps vient du chronomètre serveur,
 * le nom d'équipe et la liste des personnages aussi ; le client ne fait qu'afficher.
 */
import { nommerEquipe } from "../domain/classement";
import { DepotScores } from "../stockage/fichierScores";

/** Message `FIN_JEU` diffusé aux clients de la room. */
export interface MessageFinJeu {
  temps: string;
  joueur: string[];
  equipe: string;
}

/** Vue minimale d'une room Colyseus. */
export interface RoomDiffusion {
  broadcast(type: string, message: MessageFinJeu): void;
}

const terminees = new WeakSet<RoomDiffusion>();

/**
 * Diffuse `FIN_JEU` et enregistre le score, une seule fois par room.
 * @returns `false` si la partie de cette room était déjà terminée.
 */
export function terminerPartie(
  room: RoomDiffusion,
  temps: string,
  personnages: readonly string[],
  depot: DepotScores,
  tirage: number = Math.random(),
): boolean {
  if (terminees.has(room)) return false;
  terminees.add(room);

  const message: MessageFinJeu = { temps, joueur: [...personnages], equipe: nommerEquipe(personnages, tirage) };
  room.broadcast("FIN_JEU", message);
  depot.ajouter(message.equipe, message.joueur, temps).catch((erreur: unknown) => {
    console.error("Enregistrement du score impossible :", erreur);
  });
  return true;
}
