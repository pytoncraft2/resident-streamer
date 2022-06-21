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
    manette.scene.physics.add.overlap(obj_manette, (manette.scene as any).enemies, function(_obj_manette, _ennemie: any) {
      _ennemie.dommage(_obj_manette.getData('degat'))
      _obj_manette.setData('degat', 0)
    }, undefined, manette);

    (obj_manette.body as any).setAllowGravity(false);
    manette.obj_manette = obj_manette
    manette.scene.time.delayedCall(100, () => {
      if (manette.anims.getName() == "manette_vole") {
        manette.obj_manette.setVelocityY(2300)
      } else {

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
      }

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

export function auto() {
  punch__A()
}
