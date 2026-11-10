import TJoueur from "../types/Joueur";
import { AnimationPersonnage, definirPersonnage } from "./definition";
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

/** Animations propres à osmosiscoop (en plus des animations communes, `Animations/communes.ts`). */
const ANIMATIONS: readonly AnimationPersonnage[] = [
  { cle: "osmo_attaque", prefixe: "osmo_attaque", images: { debut: 0, fin: 3 }, frameRate: 10, repeat: 0, imageQuiBlesse: "osmo_attaque3" },
  { cle: "osmo_soin", prefixe: "osmo_soin", images: { debut: 0, fin: 3 }, frameRate: 10, repeat: 0 },
  // jamais jouée aujourd'hui
  { cle: "osmo_saut", prefixe: "osmo_saut", images: { debut: 1, fin: 2 }, frameRate: 1, repeat: 0 },
];

export default definirPersonnage<TJoueur>({
  initialiser,
  touches: {
    A: { nom: "soin", action: soin },
    Z: { nom: "blesse", action: blesse },
    TAB: aptitudeFusion,
  },
  animations: ANIMATIONS,
});
