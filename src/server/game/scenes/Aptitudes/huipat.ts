import { setAnimation } from "../Animations/AnimationJoueur"
import TJoueur from "../types/Joueur";
import fusion from "./_utilitaire/fusion";
import ManetteClass from "../class/elements/ManetteClass";
import { Balle } from "../class/elements/Balle";
import Toile from "../class/elements/Toile";

export function __StatsSupplementaire(fakhear: TJoueur, _Aptitudes: any) {
  fakhear.degat = 10
}

export function cross__A(fakhear: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a) {
    input.a = false
    console.log("ATTAQUE HUIPAT");
    // setAnimation(fakhear, 'cross')
  }
}

export function kick__Z(manette: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (!manette.obj_manette) {
    // manette.son = 'manette'
    // manette.play('manette_lance')
      manette.body.setVelocityY(1000)
    const obj_manette = manette.scene.add.existing(new ManetteClass(manette.scene, manette.flipX ? manette.x - 80 : manette.x + 80, manette.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
    .setData({ ClientId: manette.ClientID, degat: manette.degat}))
    .setFlipX(manette.flipX)
    manette.scene.physics.add.existing(obj_manette);
    manette.scene.physics.add.overlap(obj_manette, (manette.scene as any)[`${manette.cible_courante}`], function(_obj_manette, _ennemie: any) {
      if (_ennemie.sprite !== manette.sprite) {
        _ennemie.dommage(_obj_manette.getData('degat'))
        _obj_manette.setData('degat', 0)
      }
    }, undefined, manette);

    (obj_manette.body as any).setAllowGravity(false);
    // manette.scene.groupeManettes.add(obj_manette);
    manette.obj_manette = obj_manette;

    manette.scene.time.delayedCall(200, () => {

        var timeline = manette.scene.tweens.createTimeline();

        timeline.add({
          targets: manette.obj_manette,
          x: manette.flipX ? manette.x -1000 : manette.x + 1000,
          ease: 'Power2',
          duration: 500,
          onComplete: function(_tw, tg: any) {
            tg[0].setData('degat', 1)
          }
        });

        timeline.add({
          targets: manette.obj_manette,
          props: {
            x: { value: function () { return manette.x; }, ease: 'Power1' },
            y: { value: function () { return manette.y; }, ease: 'Power3' }
          },
          ease: 'Power2',
          duration: 800
        });

        //@ts-ignore
        manette.obj_manette.tweenManette = timeline;
        timeline.play()
      manette.obj_manette = undefined;
    }, null, manette);
  }





//   if (input.z)
//   {
//     console.log("Z HUIPAT");
// //   fakhear.son = 'kick'
// //   fakhear.play('attack')
// //   fakhear.setVelocityX(0);
//   }
//   input.z = false
}

export function dash__E(huipat: Phaser.Physics.Arcade.Sprite | any) {
  console.log("HUIPAT E");
  const id1 = `${(Math.random() + 1).toString(36).substring(7)}`
  const balle1 = huipat.scene.add.existing(new Balle(huipat.scene, huipat.x, huipat.y - 55, 'balle', id1, huipat.flipX, huipat.scene.enemies))
  huipat.scene.physics.add.existing(balle1);
}

export function fusion__TAB(huipat: TJoueur, input: any) {
  const id1 = `${(Math.random() + 1).toString(36).substring(7)}`
  const balle1 = huipat.scene.add.existing(new Toile(huipat.scene, huipat.x, huipat.y - 55, 'toile', id1, huipat.flipX))
  huipat.scene.physics.add.existing(balle1);
  console.log("FUSION TAB HUIPAT");
}