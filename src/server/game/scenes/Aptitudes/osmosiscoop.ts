import TJoueur from "../types/Joueur";
import { definirPersonnage } from "./definition";
import { aptitudeFusion } from "./_utilitaire/fusion";

export function initialiser(personnage: TJoueur) {}

export function soin(osmo: TJoueur, input: any) {
  if (input.a)
  {
    osmo.soigne = true;
    osmo.play('osmo_soin', true)
    osmo.son = 'soin'
    input.a = false
  }

  if (input.a_fin)
  {
    osmo.soigne = false;
  }
}

export function blesse(osmo: TJoueur, input: any) {
  if (input.z) {
    osmo.son = 'attaque'
    osmo.play('osmo_attaque', true)
    input.z = false;
  }
}

export default definirPersonnage<TJoueur>({
  initialiser,
  touches: {
    A: { nom: "soin", action: soin },
    Z: { nom: "blesse", action: blesse },
    TAB: aptitudeFusion,
  },
});
