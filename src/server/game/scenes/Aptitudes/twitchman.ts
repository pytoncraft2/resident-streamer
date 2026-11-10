import TJoueur from "../types/Joueur";
import { definirPersonnage } from "./definition";
import { arbreTwitchman } from "../../../ia/bosses/twitchman";
import { demarrerIA } from "../../ia/pilote";
import LaserClass from "../class/elements/LaserClass";

export function initialiser(twitchman: TJoueur, Aptitudes: any) {
  Aptitudes[twitchman.sprite].toucheEspace = function (_twitchman: TJoueur) {
    _twitchman.body.setVelocityY(-500)
    _twitchman.play('twitchman_vole', true)
    _twitchman.survole = true
    _twitchman.scene.time.delayedCall(410, () => {
      _twitchman.survole = false
    })
  }

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

export default definirPersonnage<TJoueur>({
  initialiser,
  touches: {
    A: { nom: "punch", action: punch },
    Z: { nom: "charge", action: charge },
    E: { nom: "laser", action: laser },
  },
  auto,
});
