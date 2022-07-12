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

    const oie = troll.scene.add.existing(new OieClass(troll.scene, troll.flipX ? troll.x - 180 : troll.x + 180, troll.y, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.9}));
    troll.scene.physics.add.existing(oie);
    troll.scene.physics.add.collider(troll.scene[`${troll.cible_courante}`].getChildren(), oie)
    oie.setPushable(false);
  }
}

export function grenouille__Z(troll: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.z) {
    input.z = false
    troll.play("troll_attaque")
    const grenouille = troll.scene.add.existing(new GrenouilleClass(troll.scene, troll.flipX ? troll.x - Phaser.Math.Between(380, 180) : troll.x + Phaser.Math.Between(380, 180), troll.y - 400, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, !troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.3}));
    troll.scene.physics.add.existing(grenouille);
  }
}

export function __auto(troll: TJoueur, _input: any, aptitudes: any) {
  if (troll.scene)
  {
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
