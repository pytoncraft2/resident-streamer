import { strict as assert } from "assert";
import { destinationDepuisUrl } from "../../src/client/utils/routage";

describe("client/utils/routage · destinationDepuisUrl", function () {
  it("sans salon : l'accueil", function () {
    assert.deepEqual(destinationDepuisUrl("", null), { ecran: "accueil" });
    assert.deepEqual(destinationDepuisUrl("", "fakhear"), { ecran: "accueil" });
  });

  it("salon sans personnage : le lobby du salon (avant : personnage « null » transmis au lobby)", function () {
    assert.deepEqual(destinationDepuisUrl("salon1", null), { ecran: "Lobby", salon: "salon1" });
  });

  it("salon et personnage jouable : directement en jeu", function () {
    assert.deepEqual(destinationDepuisUrl("salon1", "fakhear"), { ecran: "Jeu", salon: "salon1", personnage: "fakhear" });
  });

  it("personnage inconnu ou boss : le lobby, pas une partie que le serveur refuserait", function () {
    for (const p of ["xyz", "super_boss", "", "FAKHEAR"]) {
      assert.deepEqual(destinationDepuisUrl("salon1", p), { ecran: "Lobby", salon: "salon1" }, p);
    }
  });
});
