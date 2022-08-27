import TJoueur from "../types/Joueur";
export function __StatsSupplementaire(boss_1: any, Aptitudes: any) {
  Aptitudes[boss_1.sprite].toucheDroite = function (_boss_1: any) {
    boss_1.setVelocityX(400)
  }
  Aptitudes[boss_1.sprite].toucheGauche = function (_boss_1: any) {
    boss_1.setVelocityX(-400)
  }

  var compteurAttaque: number = 0;
  boss_1.auto_colision = boss_1.scene.physics.add.collider(boss_1.scene.players, boss_1,
    function (_ennemie: any, _joueur: any) {
      if (_ennemie.body.touching.right)
      {
        compteurAttaque += 1;
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

}

export function pique__A(boss_1: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a)
  {
    boss_1.son = 'boss_attaque'
    input.a = false
    boss_1.play('attaque')
  }
}

export function suivre__Z(boss_1: Phaser.Physics.Arcade.Sprite|any) {
  if (boss_1.scene.players.getLength() > 1)
  {
    boss_1.scene.physics.moveToObject(boss_1, boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()]), 600);
  }
}

export function __auto(boss_1: TJoueur | any, input: any, aptitudes: any) {

  if ((boss_1.scene as any).room.boss[`${boss_1.sprite}`].vaincu) return boss_1.scene.physics.world.removeCollider(boss_1.auto_colision);
  if (boss_1 && boss_1.body)
  {
    if (boss_1.scene.players.getLength() > 0 && boss_1)
    {
      let joueuProche = boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()])
      if (joueuProche)
      {
        if (joueuProche.x < 5627 && joueuProche.x > 3802 && joueuProche.y > -249)
        {
          boss_1.scene.physics.moveToObject(boss_1, joueuProche, 800);
          boss_1.play('deplacement');
        }
        else
        {
          if (boss_1.x != 5010) {
            boss_1.scene.tweens.add({
              targets: boss_1,
              x: 5010,
              y: 755,
              duration: 500,
            });
          }
        }
      }
    }
    reactiveBoucle(boss_1, aptitudes)
  }
  else reactiveBoucle(boss_1, aptitudes)
}

function reactiveBoucle(boss_1: TJoueur, aptitudes: any) {
  if (boss_1.scene && boss_1.scene.time)
  {
      boss_1.scene.time.delayedCall(500, () => {
        __auto(boss_1, {}, aptitudes)
      }, null, this);
  }
}
