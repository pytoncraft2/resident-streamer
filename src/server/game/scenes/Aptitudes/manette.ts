import ManetteClass from '../class/elements/ManetteClass'

import TJoueur from "../types/Joueur";

export function __StatsSupplementaire(personnage: TJoueur, Aptitudes: any) {
  Aptitudes[personnage.sprite].toucheEspace = (personnage: Phaser.Physics.Arcade.Sprite, _input: any) => {
      personnage.setVelocityY(-1250);
      personnage.setVelocityX(personnage.flipX ? (-1400) : (1400));
      personnage.play("manette_vole")
  }
  personnage.cible_courante = "players"
}

export function punch__A(manette: TJoueur, input: any) {
  if (input.a) {
    manette.body.setVelocityY(1000)
    manette.play('manette_punch')
  }
}

export function lancer__Z(manette: TJoueur, _input: any) {

  if (!manette.obj_manette) {
    manette.son = 'manette'
    manette.play('manette_lance')
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
}

export function __animationLancerManette(manette: TJoueur) {
  var timeline = manette.scene.tweens.createTimeline();

  timeline.add({
    targets: manette.groupeManettes.getChildren()[0],
    x: manette.flipX ? manette.x -1000 : manette.x + 1000,
    ease: 'Power2',
    duration: 500,
    onComplete: function(_tw, _tg: any) {
      // tg[0].setData('degat', 1)
    }
  });

  timeline.add({
    targets: manette.groupeManettes.getChildren()[0],
    props: {
      x: { value: function () { return manette.x; }, ease: 'Power1' },
      y: { value: function () { return manette.y; }, ease: 'Power3' }
    },
    ease: 'Power2',
    duration: 800
  });

  timeline.play()
}

/**
 * @see {@link game/scenes/Aptitudes/base} pour un example
 */
 export function __auto(manette: TJoueur, _input: any, aptitudes: any) {
   if (manette.scene)
   {
     if ((manette.scene as any).room.boss[`${manette.sprite}`].vaincu) return;
     const positionJoueurProche: any = manette.scene.physics.closest(manette, [...(manette.scene as any).players.getChildren()])
     if (positionJoueurProche)
     {

        if (positionJoueurProche.x < 5627 && positionJoueurProche.x > 3802 && positionJoueurProche.y < -249) {

       var dist = Phaser.Math.Distance.BetweenPoints(manette, positionJoueurProche);

       if (positionJoueurProche.x < manette.x)
       {
         manette.setFlipX(true)
         if (dist > 400 && dist < 900)
         {
           if (manette.body) lancer__Z(manette, {z: true})
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
           manette.play("manette_punch")
           manette.scene.tweens.add({
             delay: 500,
             onStart: () => manette.play("manette_vole"),
             targets: manette,
             x: 3970,
             y: -950,
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
           if (manette.body) lancer__Z(manette, {z: true})
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
           manette.play("manette_punch")
           manette.scene.tweens.add({
             delay: 500,
             onStart: () => manette.play("manette_vole"),
             targets: manette,
             x: 5337,
             y: -950,
             duration: 1000,
             ease: 'Sine.inOut',
             onComplete: () => reactiveBoucle(manette, aptitudes)
           });
         }
       }
     } else {

       if (manette.x != 4800) {
         manette.scene.tweens.add({
           targets: manette,
           x: 4800,
           y: -249,
           onStart: () => manette.play("manette_vole"),
           onComplete: () => {
             reactiveBoucle(manette, aptitudes)
           },
           duration: 900,
         });
       }
       else reactiveBoucle(manette, aptitudes)
     }
    } 
   }
 }

function reactiveBoucle(manette: TJoueur, aptitudes: any) {
  if ((manette.scene as any).room.boss[`${manette.sprite}`].vaincu) return;
  manette.scene.time.delayedCall(500, () => {
    if ((manette.scene as any).room.boss[`${manette.sprite}`].vaincu) return;
    __auto(manette, {}, aptitudes)
  }, null, this);
}
