import TJoueur from "../types/Joueur";
import LaserClass from "../class/elements/LaserClass";

export function __StatsSupplementaire(twitchman: TJoueur, Aptitudes: any) {
  Aptitudes[twitchman.sprite].toucheEspace = function (_twitchman: TJoueur) {
    _twitchman.body.setVelocityY(-500)
    _twitchman.play('twitchman_vole', true)
    _twitchman.survole = true
    _twitchman.scene.time.delayedCall(410, () => {
      _twitchman.survole = false
    })
  }

  twitchman.laser = new LaserClass(twitchman.scene, twitchman.x + 80, twitchman.y - 185, 0, 28, 1902222, 1, `${(Math.random() + 1).toString(36).substring(7)}`, twitchman)

  // twitchman.laser = new LaserClass(twitchman.scene, twitchman.flipX ? twitchman.x - 80 : twitchman.x + 80, twitchman.y - 60, "laser",  `${(Math.random() + 1).toString(36).substring(7)}`, twitchman)

}


export function punch__A(twitchman: TJoueur, input: any) {
  if (input.a)
  {
  twitchman.play('twitchman_punch')
  input.a = false
  }
}

export function charge__Z(twitchman: TJoueur, input: any) {
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

export function laser__E(twitchman: TJoueur, input: any) {
  console.log("LAZER")
  twitchman.laser.charge()
  input.e = false
}
