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

/**
 * @see {@link game/scenes/Aptitudes/base} pour un example
 */
export function __auto(manette: TJoueur, input: any, aptitudes: any) {



//   manette.scene.time.delayedCall(500, () => {
//       __auto(manette, {}, aptitudes)
//   }, null, this);
//
//   manette.scene.time.delayedCall(900, () => {
//     __auto(manette, {}, aptitudes)
// }, null, this);
//
var timer = manette.scene.time.addEvent({
    delay: 500,                // ms
    callback: callback,
    args: [manette],
    callbackScope: manette,
    loop: false,
    repeat: 3,
    paused: false
});

timer.reset({
    delay: 500,                // ms
    callback: callback,
    args: [],
    callbackScope: manette,
    loop: false,
    repeat: 0,
    startAt: 0,
    timeScale: 1,
    paused: false
})
manette.scene.time.addEvent(timer);


//   manette.scene.time.delayedCall(1500, () => {
//   lanceManette__Z(manette, {z: true})
// }, null, manette);
//
// manette.scene.time.delayedCall(2000, () => {
// manette.play("manette_vole")
// manette.body.setVelocityY(-1900)
// }, null, manette);
//
//
//
//   manette.scene.time.delayedCall(3000, () => {
//     lanceManette__Z(manette, {z: true})
//     if (manette.scene.players.getLength() == 1)
//     {
//       const flipXJoueur = manette.scene.physics.closest(manette, [...(manette.scene as any).players.getChildren()])
//       //@ts-ignore
//       flipXJoueur.flipX ? aptitudes.toucheDroite(manette, {left: true}) : aptitudes.toucheGauche(manette, {right: true})
//       //@ts-ignore
//       flipXJoueur.flipX ? manette.setFlipX(false) : manette.setFlipX(true);
//       // manette.scene.physics.moveToObject(manette, manette.scene.physics.closest(manette, [...(manette.scene as any).players.getChildren()]), 600);
//     }
//
//   }, null, manette);
//
//   manette.scene.time.delayedCall(3000, () => {
//     // lanceManette__Z(manette, {z: true})
//     // __auto(manette, {}, aptitudes)
//   }, null, manette);

  // return true
}

function callback(manette) {
  const positionJoueurProche: any = manette.scene.physics.closest(manette, [...(manette.scene as any).players.getChildren()])
  if (positionJoueurProche) var dist = Phaser.Math.Distance.BetweenPoints(manette, positionJoueurProche);
  if (positionJoueurProche) {
    if (positionJoueurProche.y < manette.y) {
      manette.body.setVelocityY(-1900)
      manette.play("manette_vole")
    }
    if (positionJoueurProche.x < manette.x) manette.setFlipX(true)
    else if (positionJoueurProche.x > manette.x) manette.setFlipX(false)
  }

  if (manette.body) {
    if (dist > 300) lanceManette__Z(manette, {z: true})
    else manette.play("manette_punch")
  }
}
