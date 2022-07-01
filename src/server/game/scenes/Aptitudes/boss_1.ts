import TJoueur from "../types/Joueur";
export function __StatsSupplementaire(boss_1: any, Aptitudes: any) {
  Aptitudes[boss_1.sprite].toucheDroite = function (_boss_1: any) {
    boss_1.setVelocityX(400)
  }
  Aptitudes[boss_1.sprite].toucheGauche = function (_boss_1: any) {
    boss_1.setVelocityX(-400)
  }

  // const colision = boss_1.scene.physics.add.collider(boss_1.scene.players, boss_1)
  var compteurAttaque: number = 0;
  boss_1.scene.physics.add.collider(boss_1.scene.players, boss_1,
    function (_ennemie: any, _joueur: any) {
      if (_ennemie.body.touching.right)
      {
        compteurAttaque += 1
        // attaquePuisDeplacement(boss_1, boss_1.flipX == true && boss_1.blesse, 0xff0000, false, aptitudes)
        if (compteurAttaque > 3) {
          _ennemie.play("attaque")
          compteurAttaque = 0;
        }

        if (_ennemie.flipX) {
          _ennemie.setFlipX(false);
          _ennemie.play("attaque")
        }
      }
      else if (boss_1.body.touching.left)
      {
        compteurAttaque += 1
        if (compteurAttaque > 3) {
          _ennemie.play("attaque")
          compteurAttaque = 0;
        }

        if (!_ennemie.flipX) {
          _ennemie.setFlipX(true);
          _ennemie.play("attaque")
        }
      }
    }, null, this);

  // boss_1.scene.time.delayedCall(500, () => {
    // boss_1.scene.physics.world.removeCollider(colision);
  // }, null, this);
}

export function pique__A(boss_1: Phaser.Physics.Arcade.Sprite|any, input) {
  boss_1.play('attaque')
  input.a = false
}

export function suivre__Z(boss_1: Phaser.Physics.Arcade.Sprite|any) {
  if (boss_1.scene.players.getLength() > 1)
  {
    boss_1.scene.physics.moveToObject(boss_1, boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()]), 600);
  }
}

export function __auto(boss_1: Phaser.Physics.Arcade.Sprite|any, input: any, aptitudes: any) {
  if (boss_1 && boss_1.body) {
    if (boss_1.scene.players.getLength() > 0 && boss_1)
    {
      let joueuProche = boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()])
      if (joueuProche) {
        boss_1.scene.physics.moveToObject(boss_1, joueuProche, 800);
        boss_1.play('deplacement');
      }
    }
  reactiveBoucle(boss_1, aptitudes)
  } else {
  reactiveBoucle(boss_1, aptitudes)
  }
}

function attaquePuisDeplacement(boss_1, condition, couleur, directionFinal, aptitudes) {
  boss_1.play('attaque')
  // boss_1.on('animationcomplete', () => {
  boss_1.scene.physics.moveToObject(boss_1, boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()]), 800);
    // boss_1.anims.play('deplacement');
  boss_1.setFlipX(directionFinal)
  // reactiveBoucle(boss_1, aptitudes)
  // });
}

function reactiveBoucle(boss_1: TJoueur, aptitudes: any) {
  if (boss_1.scene)
  {
      boss_1.scene.time.delayedCall(500, () => {
        __auto(boss_1, {}, aptitudes)
      }, null, this);
  }
}
