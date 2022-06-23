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
  twitchman.laser.charge()
  input.e = false
}

export function __auto(twitchman: TJoueur, _input: any, aptitudes: any) {
  const positionJoueurProche: any = twitchman.scene.physics.closest(twitchman, [...(twitchman.scene as any).players.getChildren()])
  if (positionJoueurProche)
  {
    var dist = Phaser.Math.Distance.BetweenPoints(twitchman, positionJoueurProche);
    // if (twitchman.body) aptitudes.toucheEspace(twitchman, {space: true})
    twitchman.play("twitchman_vole")
    // _input.space = true
    if (twitchman.body) {
      if (dist > 960 && dist < 1920) {
        twitchman.scene.physics.moveTo(twitchman, 1920, 0, 800, 1000);
      } else if (dist < 960) {
        twitchman.scene.physics.moveTo(twitchman, 0, 0, 800, 1000);
      }

      // twitchman.body.setVelocityY(-6000)
      // twitchman.body.setAllowGravity(false)
      // aptitudes.toucheDroite(twitchman, {right_debut: true})
    }
    reactiveBoucle(twitchman, aptitudes)
  }
}

function reactiveBoucle(manette: TJoueur, aptitudes: any) {
  manette.scene.time.delayedCall(500, () => {
    __auto(manette, {}, aptitudes)
  }, null, this);
}
