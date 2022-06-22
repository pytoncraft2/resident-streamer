import ManetteClass from '../class/elements/ManetteClass'

import TJoueur from "../types/Joueur";
import { fusion } from "./_utilitaire/general";


export function __StatsSupplementaire() {}

export function punch__A(manette: TJoueur, input: any) {
  if (input.a) {
    manette.body.setVelocityY(1000)
    manette.play('manette_punch')
  }
}

export function lanceManette__Z(manette: TJoueur, input: any) {

  if (!manette.obj_manette) {
    manette.play('manette_lance')
      manette.body.setVelocityY(1000)
    const obj_manette = manette.scene.add.existing(new ManetteClass(manette.scene, manette.flipX ? manette.x - 80 : manette.x + 80, manette.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
    .setData({ ClientId: manette.ClientID, degat: manette.degat}))
    .setFlipX(manette.flipX)
    manette.scene.physics.add.existing(obj_manette);
    manette.scene.physics.add.overlap(obj_manette, (manette.scene as any).players, function(_obj_manette, _ennemie: any) {
      _ennemie.dommage(_obj_manette.getData('degat'))
      _obj_manette.setData('degat', 0)
    }, undefined, manette);

    (obj_manette.body as any).setAllowGravity(false);
    manette.obj_manette = obj_manette
    manette.scene.time.delayedCall(100, () => {

        var timeline = manette.scene.tweens.createTimeline();

        timeline.add({
          targets: manette.obj_manette,
          x: manette.flipX ? manette.x -1000 : manette.x + 1000,
          ease: 'Power2',
          duration: 500,
          onComplete: function(tw, tg: any) {
            tg[0].setData('degat', 1)
          }
        });

        timeline.add({
          targets: manette.obj_manette,
          // x: manette.x,
          props: {
            x: { value: function () { return manette.x; }, ease: 'Power1' },
            y: { value: function () { return manette.y; }, ease: 'Power3' }
          },
          // y: manette.y,
          ease: 'Power2',
          duration: 800
        });

        timeline.play()
        // manette.obj_manette.setVelocityX(manette.flipX ? -2300 : 2300)
        // manette.scene.tweens.add({
        //   targets: manette.obj_manette,
        //   x: manette.flipX ? manette.x -1000 : manette.x + 1000,
        //   duration: 900,
        //   ease: 'Power2',
        //   // yoyo: true,
        //   alpha: 0,
        //   onComplete: (tw, _target: any) => {
        //     manette.scene.physics.moveToObject(manette, manette.obj_manette, 1200)
        //   },
        //   // onYoyoParams: [manette],
        //   // onYoyo: function(tw, target, manette) {
        //   //   target.setData('degat', 1)
        //   //   if (target.y > manette.y) target.y += 20
        //   // }
        //   // delay: 1000
        // });

      manette.obj_manette = undefined;
    }, null, manette);
  }
}

export function fusion__TAB(personnage: TJoueur, input: any) {
  fusion(personnage, input)
}


export function vole() {
// manette.vole = true
//   console.log("vole")
//     manette.play('manette_vole')
//     manette.setVelocityY(-800)
}

/**
 * @see {@link game/scenes/Aptitudes/base} pour un example
 */
export function __auto(manette: TJoueur, input: any, aptitudes: any) {
  const positionJoueurProche: any = manette.scene.physics.closest(manette, [...(manette.scene as any).players.getChildren()])
      if (positionJoueurProche)
      {
        var dist = Phaser.Math.Distance.BetweenPoints(manette, positionJoueurProche);

        if (positionJoueurProche.x < manette.x) {
          manette.setFlipX(true)
          if (dist > 400 && dist < 900) {
            if (manette.body) lanceManette__Z(manette, {z: true})
            reactiveBoucle(manette, aptitudes)
          } else if (dist > 900) {
            if (manette.body) {

              // const input = (this.scene as any).room.donnes[this.ClientID].clavier

              manette.body.setVelocityX(-340)
              aptitudes.toucheGauche(manette, {left_debut: true})
              // aptitudes.toucheGauche(manette, {left_fin: true})
            }

            reactiveBoucle(manette, aptitudes)
          } else if (dist < 400) {
            manette.play("manette_punch")
            // manette.play("manette_vole")
            manette.scene.tweens.add({
              delay: 500,
              onStart: () => manette.play("manette_vole"),
              targets: manette,
              x: 0,
              y: 0,
              duration: 1000,
              ease: 'Sine.inOut',
              onComplete: () => reactiveBoucle(manette, aptitudes)
            });
          }
        } else if (positionJoueurProche.x > manette.x) {
          manette.setFlipX(false)
          if (dist > 400 && dist < 900) {
            if (manette.body) lanceManette__Z(manette, {z: true})
            reactiveBoucle(manette, aptitudes)
          } else if (dist > 900) {
                // manette.play("manette_punch")
            if (manette.body) {
              manette.body.setVelocityX(340)
              aptitudes.toucheDroite(manette, {right_debut: true})
              // aptitudes.toucheDroite(manette, {right_fin: true})
            }
            reactiveBoucle(manette, aptitudes)
          } else if (dist < 400) {
            manette.play("manette_punch")
            manette.scene.tweens.add({
              delay: 500,
              onStart: () => manette.play("manette_vole"),
              targets: manette,
              x: 1960,
              y: 0,
              duration: 1000,
              ease: 'Sine.inOut',
              onComplete: () => reactiveBoucle(manette, aptitudes)
            });
          }
        }

        // if (positionJoueurProche.y < manette.y)
        // {
        //   if (manette.body)
        //   {
        //     // manette.setTint(16777215)
        //     // manette.body.setVelocityY(-1900)
        //     // manette.play("manette_vole")
        //
        //     if (manette.body.touching.down) {
        //       lanceManette__Z(manette, {})
        //     }
        //   }
        // }

      // if (manette.body) {
      // }

      }

      // if (manette.body) {
      // }


}

function reactiveBoucle(manette, aptitudes) {
  manette.scene.time.delayedCall(500, () => {
    __auto(manette, {}, aptitudes)
  }, null, this);
}
