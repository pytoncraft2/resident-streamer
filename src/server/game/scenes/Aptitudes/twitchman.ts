import TJoueur from "../types/Joueur";

export function StatsSupplementaire() {}

export function punch(twitchman: TJoueur, input) {
  if (input.a)
  {
  console.log("PUNCH ????????")
  twitchman.play('twitchman_punch')
  }
}

export function survoler(twitchman, input) {
  if (input.z)
  {
    twitchman.play('twitchman_vole', true)
    twitchman.body.setVelocityY(-500)
  }
  //
  // if (input.a_fin)
  // {
  // }
}


export function charge(twitchman: TJoueur, input) {}

export function saut(twitchman: TJoueur, input) {
  twitchman.body.setVelocityY(-1200)
}
