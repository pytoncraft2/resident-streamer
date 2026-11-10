import TJoueur from "../types/Joueur";
import { definirPersonnage } from "./definition";
import { arbreTroll } from "../../../ia/bosses/troll";
import { demarrerIA } from "../../ia/pilote";
import GrenouilleClass from "../class/elements/GrenouilleClass";
import OieClass from "../class/elements/OieClass";

export function initialiser(personnage: TJoueur, Aptitudes: any) {
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

export function oie(troll: Phaser.Physics.Arcade.Sprite|any, input: any) {
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

export function grenouille(troll: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.z) {
    input.z = false
    troll.son = 'troll_bouton2'
    troll.play("troll_attaque")
    const grenouille = troll.scene.add.existing(new GrenouilleClass(troll.scene, troll.flipX ? troll.x - Phaser.Math.Between(380, 180) : troll.x + Phaser.Math.Between(380, 180), troll.y - 400, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, !troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.3}));
    troll.scene.physics.add.existing(grenouille);
  }
}

/**
 * IA de troll : arbre de comportement (src/server/ia/bosses/troll.ts) piloté toutes les 800 ms (ADR-003).
 */
export function auto(troll: TJoueur, _input: any, aptitudes: any) {
  demarrerIA(troll as any, arbreTroll, { periode: 800, aptitudes });
}

export default definirPersonnage<TJoueur>({
  initialiser,
  touches: {
    A: { nom: "oie", action: oie },
    Z: { nom: "grenouille", action: grenouille },
  },
  auto,
});
