import { strict as assert } from "assert";
import { ContexteUrlServeur, urlHttpServeur, versWebSocket } from "../../src/client/utils/urlServeur";

const page = (url: string, developpement = false, urlConfiguree?: string): ContexteUrlServeur => {
  const u = new URL(url);
  return { urlConfiguree, developpement, protocole: u.protocol, hote: u.hostname, origine: u.origin };
};

describe("client/urlServeur (anomalie B6)", function () {
  it("production : le serveur est l'origine de la page (même hôte, même port)", function () {
    assert.equal(urlHttpServeur(page("https://jeu.exemple.fr/salon42")), "https://jeu.exemple.fr");
    assert.equal(urlHttpServeur(page("http://192.168.1.20:3000/")), "http://192.168.1.20:3000");
  });

  it("développement (Vite sur un autre port) : même hôte, port 3000", function () {
    assert.equal(urlHttpServeur(page("http://localhost:5173/", true)), "http://localhost:3000");
    assert.equal(urlHttpServeur(page("http://192.168.1.20:5173/", true)), "http://192.168.1.20:3000");
  });

  it("VITE_SERVEUR_URL prime, sans / final", function () {
    assert.equal(urlHttpServeur(page("http://localhost:5173/", true, "https://api.exemple.fr/")), "https://api.exemple.fr");
    assert.equal(urlHttpServeur(page("https://jeu.exemple.fr/", false, "https://autre.exemple.fr")), "https://autre.exemple.fr");
  });

  it("WebSocket : http → ws, https → wss", function () {
    assert.equal(versWebSocket("http://localhost:3000"), "ws://localhost:3000");
    assert.equal(versWebSocket("https://jeu.exemple.fr"), "wss://jeu.exemple.fr");
  });
});
