import TJoueur from "../types/Joueur";

export function StatsSupplementaire(twitchman: TJoueur, Aptitudes: any) {
  Aptitudes[twitchman.sprite].toucheEspace = function (_twitchman: TJoueur) {
    _twitchman.body.setVelocityY(-500)
    _twitchman.play('twitchman_vole', true)
    _twitchman.survole = true
    _twitchman.scene.time.delayedCall(410, () => {
      _twitchman.survole = false
    })
  }
}


export function punch(twitchman: TJoueur, input) {
  if (input.a)
  {
  twitchman.play('twitchman_punch')
  }
}

export function charge(twitchman, input) {
  if (input.z)
  {
    twitchman.play('twitchman_charge')
  // twitchman.play('twitchman_punch')
    // twitchman.body.setVelocityX(twitchman.flipX ? -5000 : 5000)
    twitchman.body.setVelocityX(twitchman.flipX ? -5000 : 5000)

    // twitchman.scene.physics.accelerateToObject(clown, block, 60, 300, 300);
    input.z = false

  }

  if (input.z_fin)
  {
    twitchman.setVelocity(0)
    twitchman.play('twitchman_vole', true)
  }
}
