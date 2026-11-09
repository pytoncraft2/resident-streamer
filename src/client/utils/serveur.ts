/**
 * Adresses du serveur de jeu pour le navigateur (anomalie B6) : remplacent `localhost:3000`
 * codé en dur, qui ne fonctionnait que sur la machine du serveur et en HTTP.
 */
import { urlHttpServeur, versWebSocket } from "./urlServeur";

const URL_HTTP = urlHttpServeur({
  urlConfiguree: import.meta.env.VITE_SERVEUR_URL,
  developpement: import.meta.env.DEV,
  protocole: window.location.protocol,
  hote: window.location.hostname,
  origine: window.location.origin,
});

/** URL HTTP du serveur, ex. pour `GET /scores`. */
export const URL_HTTP_SERVEUR = URL_HTTP;

/** URL WebSocket du serveur Colyseus. */
export const URL_WS_SERVEUR = versWebSocket(URL_HTTP);
