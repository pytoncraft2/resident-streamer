export function StatsSupplementaire() {}
import TJoueur from "../types/Joueur";

export function survoler(twitchman, input) {
  if (input.a)
  {
    twitchman.play('twitchman_vole', true)
    twitchman.body.setVelocityY(-500)
  }

  if (input.a_fin)
  {
  }
}

export function charge(twitchman: TJoueur, input) {
}
