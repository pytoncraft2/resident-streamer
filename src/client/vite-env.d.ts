/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Adresse du serveur de jeu, si elle diffère de celle qui sert la page (voir utils/serveur.ts). */
  readonly VITE_SERVEUR_URL?: string;
}
