import TJoueur from "../types/Joueur";

export function StatsSupplementaire(twitchman: TJoueur, Aptitudes: any) {
  Aptitudes[twitchman.sprite].toucheEspace = function (_twitchman: TJoueur) {
    _twitchman.body.setVelocityY(-500)
    _twitchman.play('twitchman_vole', true)
  }
}


export function punch(twitchman: TJoueur, input) {
  if (input.a)
  {
  console.log("PUNCH ????????")
  twitchman.play('twitchman_punch')
  }
}

export function charge(twitchman, input) {
  if (input.z)
  {
    input.z = false
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
    twitchman.play('twitchman_charge')
  // twitchman.play('twitchman_punch')
    twitchman.body.setVelocityX(twitchman.flipX ? -5000 : 5000)

    twitchman.scene.time.delayedCall(410, () => {
      twitchman.play('twitchman_vole')
      twitchman.body.setVelocity(0)
    });


    // twitchman.scene.physics.accelerateToObject(clown, block, 60, 300, 300);

  }
  //
  // if (input.a_fin)
  // {
  // }
}
