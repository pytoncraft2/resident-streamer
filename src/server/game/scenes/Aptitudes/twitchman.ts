import TJoueur from "../types/Joueur";
import { AnimationPersonnage, definirPersonnage } from "./definition";
import { arbreTwitchman } from "../../../ia/bosses/twitchman";
import { demarrerIA } from "../../ia/pilote";
import LaserClass from "../class/elements/LaserClass";

/** Saut de twitchman : il s'élève en volant. */
export function envol(_twitchman: TJoueur) {
  _twitchman.body.setVelocityY(-500)
  _twitchman.play('twitchman_vole', true)
  _twitchman.survole = true
  _twitchman.scene.time.delayedCall(410, () => {
    _twitchman.survole = false
  })
}

export function initialiser(twitchman: TJoueur, _Aptitudes: any) {
  twitchman.cible_courante = "players"
  twitchman.laser = new LaserClass(twitchman.scene, twitchman.x + 80, twitchman.y - 185, 0, 28, 1902222, 1, `${(Math.random() + 1).toString(36).substring(7)}`, twitchman, twitchman.cible_courante)

}


export function punch(twitchman: TJoueur, input: any) {
  if (input.a)
  {
  twitchman.play('twitchman_punch')
  input.a = false
  }
}

export function charge(twitchman: TJoueur, input: any) {
  if (input.z)
  {
    twitchman.play('twitchman_charge')
    twitchman.body.setVelocityX(twitchman.flipX ? -5000 : 5000)
    input.z = false
  }

  if (input.z_fin)
  {
    twitchman.body.setVelocity(0)
    twitchman.play('twitchman_vole', true)
  }
}

export function laser(twitchman: TJoueur, input: any) {
  twitchman.son = 'laser'
  twitchman.laser.charge()
  input.e = false
}

/**
 * IA de twitchman : arbre de comportement (src/server/ia/bosses/twitchman.ts) piloté toutes les 500 ms (ADR-003).
 */
export function auto(twitchman: TJoueur, _input: any, aptitudes: any) {
  demarrerIA(twitchman as any, arbreTwitchman, { periode: 500, aptitudes });
}

/** Animations propres à twitchman (en plus des animations communes, `Animations/communes.ts`). */
const ANIMATIONS: readonly AnimationPersonnage[] = [
  { cle: "twitchman_punch", prefixe: "twitchmanpunch", images: { debut: 0, fin: 1 }, frameRate: 8, repeat: 1, imageQuiBlesse: "twitchmanpunch1" },
  { cle: "twitchman_vole", prefixe: "twitchmanfly", images: { debut: 0, fin: 4 }, frameRate: 10, repeat: -1 },
  { cle: "twitchman_charge", prefixe: "twitchmancharge", images: { debut: 0, fin: 0 }, frameRate: 1, repeat: 0 },
];

export default definirPersonnage<TJoueur>({
  initialiser,
  deplacements: { toucheEspace: envol },
  touches: {
    A: { nom: "punch", action: punch },
    Z: { nom: "charge", action: charge },
    E: { nom: "laser", action: laser },
  },
  auto,
  animations: ANIMATIONS,
});
