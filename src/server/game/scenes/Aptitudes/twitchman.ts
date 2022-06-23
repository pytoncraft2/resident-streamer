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

export function __auto(manette: TJoueur, _input: any, aptitudes: any) {
  const positionJoueurProche: any = manette.scene.physics.closest(manette, [...(manette.scene as any).players.getChildren()])
  if (positionJoueurProche)
  {
    var dist = Phaser.Math.Distance.BetweenPoints(manette, positionJoueurProche);

    if (positionJoueurProche.x < manette.x)
    {
      manette.setFlipX(true)
      if (dist > 400 && dist < 900)
      {
        if (manette.body) laser__E(manette, {z: true})
        reactiveBoucle(manette, aptitudes)
      } else if (dist > 900)
      {
        if (manette.body)
        {
          manette.body.setVelocityX(-340)
          aptitudes.toucheGauche(manette, {left_debut: true})
        }

        reactiveBoucle(manette, aptitudes)
      }
      else if (dist < 400)
      {
        manette.play("twitchman_punch")
        manette.scene.tweens.add({
          delay: 500,
          onStart: () => manette.play(""),
          targets: manette,
          x: 0,
          y: 0,
          duration: 1000,
          ease: 'Sine.inOut',
          onComplete: () => reactiveBoucle(manette, aptitudes)
        });
      }
    }
    else if (positionJoueurProche.x > manette.x)
    {
      manette.setFlipX(false)
      if (dist > 400 && dist < 900)
      {
        if (manette.body) laser__E(manette, {z: true})
        reactiveBoucle(manette, aptitudes)
      }
      else if (dist > 900)
      {
        if (manette.body)
        {
          manette.body.setVelocityX(340)
          aptitudes.toucheDroite(manette, {right_debut: true})
        }
        reactiveBoucle(manette, aptitudes)
      }
      else if (dist < 400)
      {
        manette.play("twitchman_punch")
        manette.scene.tweens.add({
          delay: 500,
          onStart: () => manette.play("twitchman_vole"),
          targets: manette,
          x: 1960,
          y: 0,
          duration: 1000,
          ease: 'Sine.inOut',
          onComplete: () => reactiveBoucle(manette, aptitudes)
        });
      }
    }
  }
}

function reactiveBoucle(manette: TJoueur, aptitudes: any) {
  manette.scene.time.delayedCall(500, () => {
    __auto(manette, {}, aptitudes)
  }, null, this);
}
