import TJoueur from "../types/Joueur";

export function StatsSupplementaire(twitchman: TJoueur, Aptitudes: any) {
  Aptitudes[twitchman.sprite].toucheEspace = function (_twitchman: TJoueur) {
    _twitchman.body.setVelocityY(-500)
    _twitchman.play('twitchman_vole', true)
  }
  Aptitudes[twitchman.sprite].toucheDroite = function (_twitchman: TJoueur) {
    // _twitchman.body.setVelocityY(-500)
    _twitchman.body.setDragX(8400)

    _twitchman.body.setVelocityX(500);
    if (_twitchman.flipX) _twitchman.setFlipX(false);

    // _twitchman.play('twitchman_vole', true)
  }
  Aptitudes[twitchman.sprite].toucheGauche = function (_twitchman: TJoueur) {
    _twitchman.body.setVelocityX(-500);
    _twitchman.body.setDragX(8400)
    if (!_twitchman.flipX) _twitchman.setFlipX(true);
    // _twitchman.body.setVelocityY(-500)
    // _twitchman.play('twitchman_vole', true)
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
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
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
    console.log("FFFFFFFFFFFFFFFFFFIN ZZZ")
  }
}
