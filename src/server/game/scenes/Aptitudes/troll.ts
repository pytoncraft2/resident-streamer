import TJoueur from "../types/Joueur";
import GrenouilleClass from "../class/elements/GrenouilleClass";
import OieClass from "../class/elements/OieClass";

export function __StatsSupplementaire(personnage: TJoueur, Aptitudes: any) {
  personnage.anims.create({
    key: 'troll_run',
    frames: personnage.anims.generateFrameNames('atlas', { prefix: 'trollrun', start: 0, end: 5 }),
    frameRate: 30,
    repeat: -1
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

    troll.son = 'troll_bouton'
    const oie = troll.scene.add.existing(new OieClass(troll.scene, troll.flipX ? troll.x - 180 : troll.x + 180, troll.y, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.9}));
    troll.scene.physics.add.existing(oie);
    troll.scene.physics.add.collider(troll.scene[`${troll.cible_courante}`].getChildren(), oie)
    oie.setPushable(false);
  }
}

export function grenouille__Z(troll: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.z) {
    input.z = false
    troll.son = 'troll_bouton2'
    troll.play("troll_attaque")
    const grenouille = troll.scene.add.existing(new GrenouilleClass(troll.scene, troll.flipX ? troll.x - Phaser.Math.Between(380, 180) : troll.x + Phaser.Math.Between(380, 180), troll.y - 400, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, !troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.3}));
    troll.scene.physics.add.existing(grenouille);
  }
}

export function __auto(troll: TJoueur, _input: any, aptitudes: any) {
  if (troll.scene)
  {
    if ((troll.scene as any).room.boss[`${troll.sprite}`].vaincu) return;
    const positionJoueurProche: any = troll.scene.physics.closest(troll, [...(troll.scene as any).players.getChildren()])
    if (positionJoueurProche)
    {

      var dist = Phaser.Math.Distance.BetweenPoints(troll, positionJoueurProche);

     if (positionJoueurProche.x < 1789 && positionJoueurProche.y < -249) {
      if (positionJoueurProche.x < troll.x)
      {
        troll.setFlipX(true)
        if (dist > 400 && dist < 900)
        {
          if (troll.body) oie__A(troll, {a: true})
          reactiveBoucle(troll, aptitudes)
        } else if (dist > 900)
        {
          if (troll.body) grenouille__Z(troll, {z: true})

          reactiveBoucle(troll, aptitudes)
        }
        else if (dist < 400)
        {
          troll.scene.tweens.add({
            delay: 500,
            onStart: () => troll.play("troll_run", true),
            targets: troll,
            x: "-=1300",
            duration: 700,
            onComplete: () => {
              troll.body.setVelocityX(0);
              troll.play("troll_idle")
              reactiveBoucle(troll, aptitudes)
            }
          });
        }
      }
      else if (positionJoueurProche.x > troll.x)
      {
        troll.setFlipX(false)
        if (dist > 400 && dist < 900)
        {
          if (troll.body) oie__A(troll, {a: true})
          reactiveBoucle(troll, aptitudes)
        }
        else if (dist > 900)
        {
          if (troll.body)
          {
            if (troll.body) grenouille__Z(troll, {z: true})
          }
          reactiveBoucle(troll, aptitudes)
        }
        else if (dist < 400)
        {
          // troll.play("troll_punch")
          troll.scene.tweens.add({
            delay: 500,
            onStart: () => troll.play("troll_run", true),
            targets: troll,
            x: "+=1300",
            duration: 700,
            onComplete: () => {
              troll.body.setVelocityX(0);
              troll.play("troll_idle")
              reactiveBoucle(troll, aptitudes)
            }
          });
        }
      }
    } else {
       if (troll.x != 427) {
         troll.scene.tweens.add({
           targets: troll,
           x: 427,
           y: -249,
           onStart: () => troll.play("troll_idle"),
           onComplete: () => {
             reactiveBoucle(troll, aptitudes)
           },
           duration: 900,
         });

       } else reactiveBoucle(troll, aptitudes)
     }
    }
  }
}

function reactiveBoucle(troll: TJoueur, aptitudes: any) {
  if (troll.scene)
  {

    if ((troll.scene as any).room.boss[`${troll.sprite}`].vaincu) return;
    troll.scene.time.delayedCall(800, () => {
      if ((troll.scene as any).room.boss[`${troll.sprite}`].vaincu) return;
      __auto(troll, {}, aptitudes)
    }, null, this);
  }
}
