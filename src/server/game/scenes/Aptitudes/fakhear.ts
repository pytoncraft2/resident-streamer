import { setAnimation } from "../Animations/AnimationJoueur"
import TJoueur from "../types/Joueur";
import Ligne from "../class/elements/Ligne";

export function test() {}

export function __StatsSupplementaire() {}

export function cross__A(fakhear: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a) {
    input.a = false
    fakhear.setVelocityX(0)
    setAnimation(fakhear, 'cross')
  }
}

export function kick__Z(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.play('attack')
  fakhear.setVelocityX(0);
}

export function dash__E(fakhear: Phaser.Physics.Arcade.Sprite|any) {
  fakhear.play('straightlead')
  fakhear.setVelocityX(0);
  fakhear.body.checkCollision.none = true;

  if (!fakhear.animation_dash)  {
    fakhear.animation_dash = fakhear.scene.tweens.addCounter({
      duration: 300,
      onUpdate: () => (fakhear.setVelocity((fakhear.flipX ? -1700 : 1700), -70)),
      onComplete: () => (fakhear.setVelocityX(0), fakhear.play('idle_attack'), fakhear.body.checkCollision.none = false),
      repeat: 0,            // -1: infinity
      yoyo: false,
    })
  } else if (!fakhear.animation_dash.isPlaying()) {
    fakhear.animation_dash.restart()
  }
}

export function interaction__R(personnage: TJoueur, input) {
  if (input.r)
  {
    if (personnage.bossControlable.getLength() == 0) {

      let _e = closest(personnage, 'enemies')
      personnage.bossControlable.add(_e as Phaser.Physics.Arcade.Sprite)

      personnage.tweenIcon = personnage.scene.tweens.add({
        targets: _e,
        x: personnage.getTopCenter().x,
        y: personnage.getTopCenter().y,
        scale: 0.1,
        ease: 'Sine.easeIn',
        duration: 3000,
        onComplete: () => (personnage.iconSuitJoueur = true)
        // paused: true
      });
      // personnage.bossControlable.getChildren()[0]
      // .setScale(0.1)
      // .setPosition(personnage.getTopCenter().x, personnage.getTopCenter().y)
      // console.log(personnage.bossControlable.getChildren()[0])
      // console.log("AJOUT BOSS")
    } else if (personnage.bossControlable.getLength() == 1) {

      this.iconSuitJoueur = false
      personnage.bossControlable.clear();

      // let _e = closest(personnage, 'enemies')
      // personnage.bossControlable.add(_e as Phaser.Physics.Arcade.Sprite)
      //
      // personnage.tweenIcon = personnage.scene.tweens.add({
      //   targets: _e,
      //   x: personnage.getTopCenter().x,
      //   y: personnage.getTopCenter().y,
      //   scale: 0.1,
      //   ease: 'Sine.easeIn',
      //   duration: 3000,
      //   onComplete: () => (personnage.iconSuitJoueur = true)
      //   // paused: true
      // });
      // personnage.bossControlable.getChildren()[0]
      // .setScale(0.1)
      // .setPosition(personnage.getTopCenter().x, personnage.getTopCenter().y)
      // console.log(personnage.bossControlable.getChildren()[0])
      // console.log("AJOUT BOSS")
    }


    // closest(personnage, true, 'enemies')
    input.r = false
  }


  // personnage.interaction_objet = true
  // personnage.scene.tweens.addCounter({
  //   duration: 1,
  //   onComplete: () => (personnage.interaction_objet = false)
  // })
}

export function fusion__TAB(personnage: TJoueur, input: any) {
  if (input.tab && personnage.bossControlable.getLength() == 1) {
    console.log("TABBB")
    input.tab = false;
    let proche: any = closest(personnage, 'players')
    if (proche) {
      proche.particules = true;
      // console.log(personnage.particules)
      // console.log("VS")
      // console.log(proche.particules)
    }

    if (proche) new Ligne(personnage.scene, proche, personnage, '0x7fff00', 7, `${(Math.random() + 1).toString(36).substring(7)}`)

    // personnage.particules = true
  }
  // console.log(personnage.scene.players.getLength())
  if (input.tab_fin) {

    let proche: any = closest(personnage, 'players')
    if (proche) proche.particules = false;
    // closest(personnage, 'players')
    // personnage.particules = false
  }


}


function closest(personnage: TJoueur, type: 'players' | 'enemies') {
  let groueCible = personnage.scene[type].getChildren();
  return personnage.scene.physics.closest(personnage, groueCible);
}
