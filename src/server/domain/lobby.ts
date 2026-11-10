/**
 * Vérification des messages du lobby (autorité serveur) : le client est non fiable.
 */
import { PERSONNAGES_JOUABLES } from "../../shared/personnages";
import { EtatJoueurLobby, Recu } from "../../shared/messages";

const estIndexPersonnage = (valeur: unknown): valeur is number =>
  typeof valeur === "number" && Number.isInteger(valeur) && valeur >= 0 && valeur < PERSONNAGES_JOUABLES.length;

/**
 * Message `etatJoueur` valide, ou `undefined` s'il doit être ignoré : `indexConfirmation` doit
 * désigner un personnage du catalogue ; un `ancienIndexConfirmation` invalide est simplement omis.
 */
export function etatJoueurValide(recu: Recu<EtatJoueurLobby> | null | undefined): EtatJoueurLobby | undefined {
  if (!recu || !estIndexPersonnage(recu.indexConfirmation)) return undefined;
  return {
    pret: recu.pret === true,
    indexConfirmation: recu.indexConfirmation,
    ...(estIndexPersonnage(recu.ancienIndexConfirmation) ? { ancienIndexConfirmation: recu.ancienIndexConfirmation } : {}),
  };
}
