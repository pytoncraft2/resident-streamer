import TJoueur from "../types/Joueur";
import GrenouilleClass from "../class/elements/GrenouilleClass";
import OieClass from "../class/elements/OieClass";

export function __StatsSupplementaire(personnage: TJoueur, Aptitudes: any) {
  personnage.anims.create({
    key: 'troll_run',
    frames: personnage.anims.generateFrameNames('atlas', { prefix: 'trollrun', start: 0, end: 5 }),
    frameRate: 30,
    repeat: 0
  });

  personnage.anims.create({
    key: 'troll_idle',
    frames: personnage.anims.generateFrameNames('atlas', { prefix: 'troll', start: 0, end: 0 }),
    frameRate: 1,
    repeat: 0
  });

  personnage.anims.create({
    key: 'troll_attaque',
    frames: personnage.anims.generateFrameNames('atlas', { prefix: 'trollattack', start: 0, end: 1 }),
    frameRate: 6,
    repeat: 1
  });

  personnage.cible_courante = "players"


  Aptitudes[personnage.sprite].toucheEspace = (_personnage: Phaser.Physics.Arcade.Sprite, _input: any) => {}
  Aptitudes[personnage.sprite].toucheDroite = (personnage: Phaser.Physics.Arcade.Sprite, _input: any) => {
    if (_input.right_fin)
    {
      personnage.play('troll_idle')
      personnage.setVelocityX(0)
    }
    else
    {
      personnage.play('troll_run', true)
      personnage.setVelocityX(1800)
      if (personnage.flipX) personnage.setFlipX(false)
    }
  }

  Aptitudes[personnage.sprite].toucheGauche = (personnage: Phaser.Physics.Arcade.Sprite, _input: any) => {
    if (_input.left_fin)
    {
      personnage.play('troll_idle')
      personnage.setVelocityX(0)
    }
    else
    {
      personnage.play('troll_run', true)
      personnage.setVelocityX(-1800)
      if (!personnage.flipX) personnage.setFlipX(true)
    }
  }
}

export function oie__A(troll: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a) {
    input.a = false
    troll.play("troll_attaque")

    const oie = troll.scene.add.existing(new OieClass(troll.scene, troll.flipX ? troll.x - 180 : troll.x + 180, troll.y, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, troll.flipX).setData({ ClientId: troll.ClientID, degat: 0.9}));
    troll.scene.physics.add.existing(oie);
    troll.scene.physics.add.collider(troll.scene[`${troll.cible_courante}`].getChildren(), oie)
    // function (_joueur: TJoueur, _oie: any) {
    //   if (_oie.body.touching.left || _oie.body.touching.right) {
    //     _joueur.dommage(_oie.getData('degat'))
    //     _oie.setData('degat', 0)
    //   }
    // }, null, this)
    oie.setPushable(false);
  }
}

export function grenouille__Z(troll: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.z) {
    input.z = false
    // troll.play("troll_attaque")
    // new GrenouilleClass(troll.scene, troll.x, troll.y, 'atlas')
    troll.play("troll_attaque")
    const grenouille = troll.scene.add.existing(new GrenouilleClass(troll.scene, troll.flipX ? troll.x - 380 : troll.x + 380, troll.y - 400, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, !troll.flipX).setData({ ClientId: troll.ClientID, degat: 0.3}));
    troll.scene.physics.add.existing(grenouille);

    // if (!fakhear.obj_manette) {
    //   const obj_manette = fakhear.scene.add.existing(new ManetteClass(fakhear.scene, fakhear.flipX ? fakhear.x - 80 : fakhear.x + 80, fakhear.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
    //   .setData({ ClientId: fakhear.ClientID, degat: 1}))
    //   fakhear.obj_manette = obj_manette
    // } else {
    //   fakhear.obj_manette.traquer(fakhear)
    // }
  }
}

export function __auto(troll: TJoueur, _input: any, aptitudes: any) {
  if (troll.scene)
  {
    // grenouille__Z(troll, {z: true})

    const positionJoueurProche: any = troll.scene.physics.closest(troll, [...(troll.scene as any)[`${troll.cible_courante}`].getChildren()])
    if (positionJoueurProche)
    {
      var dist = Phaser.Math.Distance.BetweenPoints(troll, positionJoueurProche);

      console.log(dist)

      // if (dist < 272)
      // {
      //   troll.play('troll_run', true)
      //   troll.body.setVelocityX(!troll.flipX ? 1800 : -1800)
      // }
      // else if (troll.body && dist > 472) {
      //   troll.play('troll_run')
      //   troll.body.setVelocityX(troll.flipX ? -1800 : 1800)
      // }




        if (positionJoueurProche.x < troll.x)
        {
          troll.setFlipX(true)

          if (positionJoueurProche.y == troll.y) {
            if (troll.body) oie__A(troll, {a: true})
            const colision = troll.scene.physics.add.collider(positionJoueurProche, troll)
            troll.scene.time.delayedCall(500, () => {
              troll.scene.physics.world.removeCollider(colision);
            }, null, this);
            reactiveBoucle(troll, aptitudes)
          } else if (dist > 400 && dist < 900)
          {
            if (troll.body) oie__A(troll, {a: true})
            reactiveBoucle(troll, aptitudes)
          } else if (dist > 900)
          {
            if (troll.body)
            {
              troll.body.setVelocityX(-340)
              // aptitudes.toucheGauche(troll, {left: true})
              _input.left = true
            }

            reactiveBoucle(troll, aptitudes)
          }
          else if (dist < 400)
          {
            troll.play("troll_run", true)
            troll.scene.tweens.add({
              delay: 500,
              onStart: () => troll.play("troll_run", true),
              targets: troll,
              x: 0,
              duration: 1000,
              ease: 'Sine.inOut',
              onComplete: () => reactiveBoucle(troll, aptitudes)
            });
          }
        }
        else if (positionJoueurProche.x > troll.x)
        {
          troll.setFlipX(false)

          if (positionJoueurProche.y == troll.y) {
            if (troll.body) grenouille__Z(troll, {z: true})
            reactiveBoucle(troll, aptitudes)
          } else if (dist > 400 && dist < 900)
          {
            troll.scene.tweens.add({
              onStart: () => troll.play("troll_run", true),
              targets: troll,
              x: "-=40",
              duration: 1000,
              ease: 'Sine.inOut',
              onComplete: () => {
                oie__A(troll, {e: true})
                reactiveBoucle(troll, aptitudes)
              }
            });
            // if (troll.body) lanceManette__Z(troll, {z: true})
            // reactiveBoucle(troll, aptitudes)
          }
          else if (dist > 900)
          {
            if (troll.body)
            {
              troll.body.setVelocityX(340)
              // aptitudes.toucheDroite(troll, {right: true})
              _input.right = true
            }
            reactiveBoucle(troll, aptitudes)
          }
          else if (dist < 400)
          {
            troll.play("troll_run", true)
            troll.scene.tweens.add({
              delay: 500,
              onStart: () => troll.play("troll_run", true),
              targets: troll,
              x: 1960,
              duration: 1000,
              ease: 'Sine.inOut',
              onComplete: () => reactiveBoucle(troll, aptitudes)
            });
          }
        }
























    }

    // troll.setFlipX(!troll.flipX)
    // // oie__A(troll, {a: true})
    // troll.scene.time.delayedCall(500, () => {
    //   oie__A(troll, {a: true})
    //     troll.body.setVelocityX(0)
    //     console.log(troll.x)
    //     console.log(troll.y)
    // //   troll.scene.time.delayedCall(200, () => {
    // //     oie__A(troll, {a: true})
    //     reactiveBoucle(troll, aptitudes)
    // //   }, null, this);
    // }, null, this);

  }
}

function reactiveBoucle(troll: TJoueur, aptitudes: any) {
  if (troll.scene)
  {
    troll.scene.time.delayedCall(1300, () => {
      __auto(troll, {}, aptitudes)
    }, null, this);
  }
}
