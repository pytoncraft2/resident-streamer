import TJoueur from "../types/Joueur";
import { arbreBoss1 } from "../../../ia/bosses/boss_1";
import { demarrerIA } from "../../ia/pilote";
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

/**
 * IA de boss_1 : arbre de comportement (src/server/ia/bosses/boss_1.ts) piloté toutes les 500 ms
 * (ADR-003). Une fois vaincu, le boss ne réagit plus au contact des joueurs.
 */
export function __auto(boss_1: TJoueur | any, _input: any, _aptitudes: any) {
  demarrerIA(boss_1, arbreBoss1, {
    periode: 500,
    surVaincu: () => boss_1.scene.physics.world.removeCollider(boss_1.auto_colision),
  });
}
