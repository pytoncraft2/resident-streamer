/**
 * Calcul de l'adresse du serveur de jeu (anomalie B6), sans dépendance au navigateur ni à Vite
 * pour rester testable. Voir `serveur.ts` pour la lecture de l'environnement réel.
 */

export interface ContexteUrlServeur {
  /** `VITE_SERVEUR_URL` si définie, ex. `https://jeu.exemple.fr`. */
  urlConfiguree?: string;
  /** Client servi par Vite en développement (port distinct de celui du serveur). */
  developpement: boolean;
  /** `location.protocol`, ex. `https:`. */
  protocole: string;
  /** `location.hostname`. */
  hote: string;
  /** `location.origin`. */
  origine: string;
}

/** Port du serveur de jeu en développement (`PORT` par défaut de src/server/server.ts). */
export const PORT_SERVEUR_DEV = 3000;

/**
 * URL HTTP du serveur, sans `/` final :
 * - `urlConfiguree` si fournie ;
 * - en développement, le même hôte sur le port du serveur ;
 * - sinon l'origine de la page, puisque le serveur sert aussi le client.
 */
export function urlHttpServeur(contexte: ContexteUrlServeur): string {
  if (contexte.urlConfiguree) return contexte.urlConfiguree.replace(/\/+$/, "");
  if (contexte.developpement) return `${contexte.protocole}//${contexte.hote}:${PORT_SERVEUR_DEV}`;
  return contexte.origine;
}

/** `http://…` → `ws://…`, `https://…` → `wss://…`. */
export function versWebSocket(urlHttp: string): string {
  return urlHttp.replace(/^http/, "ws");
}
