/**
 * Contrats des messages réseau entre le client et le serveur (ADR-002) : nom et contenu de chaque
 * message, par room et par sens. Les fonctions `canal…` lient le nom d'un message à son contenu
 * pour l'envoi, la diffusion et la réception ; elles ne dépendent que de la forme des rooms
 * (client ou serveur Colyseus), pas de Colyseus lui-même.
 *
 * Autorité serveur : ce qu'envoie le client est décrit ici, mais le serveur le reçoit comme une
 * donnée non fiable (`Recu<…>`, valeurs `unknown`) et le vérifie.
 */
import { PersonnageJouable } from "./personnages";

// ─── Room de jeu (`game_instance`) ─────────────────────────────────────────────────────────────

/** Options de connexion à une partie. */
export interface OptionsJeu {
  readonly salon: string;
  /** Vérifié par le serveur (`Hall_01.onAuth`) : un personnage hors catalogue est refusé. */
  readonly sprite: PersonnageJouable;
}

/**
 * Clavier envoyé par le client à chaque changement de touche : l'état complet des touches, plus des
 * fronts calculés par le client. Le serveur recalcule lui-même les fronts des touches d'action (B7).
 */
export interface ClavierEnvoye {
  readonly a: boolean;
  readonly z: boolean;
  readonly e: boolean;
  readonly r: boolean;
  readonly space: boolean;
  readonly right: boolean;
  readonly left: boolean;
  readonly up: boolean;
  readonly down: boolean;
  readonly tab: boolean;
  readonly a_fin: boolean;
  readonly z_fin: boolean;
  readonly space_fin: boolean;
  readonly right_fin: boolean;
  readonly left_fin: boolean;
  readonly right_debut: boolean;
  readonly left_debut: boolean;
  readonly tab_fin: boolean;
}

/** Objet à retirer de l'affichage : un projectile, un joueur ou une ligne, par son identifiant. */
export type MessageSuppression =
  | { readonly projectilesRef: string }
  | { readonly playersRef: string }
  | { readonly lignesRef: string };

/** Fin de partie, décidée par le serveur (B3). */
export interface MessageFinJeu {
  /** Temps de l'équipe, `hh:mm:ss`. */
  readonly temps: string;
  /** Personnages de l'équipe. */
  readonly joueur: readonly string[];
  readonly equipe: string;
}

/** Messages du client vers la room de jeu. */
export interface MessagesVersJeu {
  readonly inputs: ClavierEnvoye;
}

/** Messages diffusés par la room de jeu. */
export interface MessagesDuJeu {
  readonly suppression: MessageSuppression;
  /** Porte du rez-de-chaussée ouverte (4 boss vaincus, ou raccourci du boss final). */
  readonly RDC_OK: undefined;
  /** Pièce centrale de l'étage révélée. */
  readonly ETAGE_OK: undefined;
  readonly FIN_JEU: MessageFinJeu;
}

// ─── Room de lobby (`lobby`) ───────────────────────────────────────────────────────────────────

export interface OptionsLobby {
  readonly salon: string;
}

/** Choix d'un joueur dans le lobby : index du personnage choisi (et du précédent). */
export interface EtatJoueurLobby {
  readonly pret: boolean;
  readonly indexConfirmation: number;
  readonly ancienIndexConfirmation?: number;
}

/** Messages du client vers la room de lobby. */
export interface MessagesVersLobby {
  readonly etatJoueur: EtatJoueurLobby;
  /** L'hôte lance la partie (tous les joueurs sont prêts). */
  readonly demandeCommencerJeu: undefined;
}

/** Messages diffusés par la room de lobby. */
export interface MessagesDuLobby {
  /** Contenu sans usage (texte fixe) : seul le signal compte. */
  readonly commencerJeu: string;
}

// ─── Envoi, diffusion, réception typés ─────────────────────────────────────────────────────────

/** Contenu d'un message tel que reçu par le serveur : non fiable, chaque champ est à vérifier. */
export type Recu<T> = { readonly [K in keyof T]?: unknown };

/** Arguments du contenu : aucun pour un message sans contenu (`undefined`). */
type Contenu<T> = [T] extends [undefined] ? [] : [message: T];

/** Room côté client (Colyseus SDK) : envoi et écoute. */
export interface RoomClient {
  send(type: string, message?: unknown): void;
  onMessage(type: string, rappel: (message: unknown) => void): unknown;
}

/** Room côté serveur (Colyseus core) : diffusion à tous ses clients. */
export interface RoomDiffusante {
  broadcast(type: string, message?: unknown): void;
}

/** Canal typé d'une room : messages `V` envoyés par le client, messages `D` diffusés par le serveur. */
export interface Canal<V, D> {
  /** Client : envoyer un message à la room. */
  envoyer<K extends keyof V & string>(room: RoomClient, type: K, ...contenu: Contenu<V[K]>): void;
  /** Client : écouter un message diffusé par la room. */
  ecouter<K extends keyof D & string>(room: RoomClient, type: K, rappel: (message: D[K]) => void): void;
  /** Serveur : diffuser un message à tous les clients de la room. */
  diffuser<K extends keyof D & string>(room: RoomDiffusante, type: K, ...contenu: Contenu<D[K]>): void;
}

function canal<V, D>(): Canal<V, D> {
  return {
    envoyer: (room, type, ...contenu) => room.send(type, ...contenu),
    // Message diffusé par le serveur, dont `diffuser` garantit la forme : seul point de conversion.
    ecouter: (room, type, rappel) => void room.onMessage(type, (message) => rappel(message as D[typeof type])),
    diffuser: (room, type, ...contenu) => room.broadcast(type, ...contenu),
  };
}

/** Room de jeu (`game_instance`). */
export const canalJeu: Canal<MessagesVersJeu, MessagesDuJeu> = canal();

/** Room de lobby (`lobby`). */
export const canalLobby: Canal<MessagesVersLobby, MessagesDuLobby> = canal();
