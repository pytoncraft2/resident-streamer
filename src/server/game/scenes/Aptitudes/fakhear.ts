import { setAnimation } from "../Animations/AnimationJoueur"
import TJoueur from "../types/Joueur";


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

export function interaction__R(personnage: TJoueur) {
  // personnage.interaction_objet = true
  // personnage.scene.tweens.addCounter({
  //   duration: 1,
  //   onComplete: () => (personnage.interaction_objet = false)
  // })
}

export function fusion__TAB(personnage: TJoueur, input: any) {
  if (input.tab) {
    input.tab = false;
    console.log(personnage.data)
    elementProche(personnage, true)
     // personnage.gfx.clear()
     // .lineStyle(2, 0xff3300)
     // personnage.scene.time.delayedCall(10000, () => {
       // elementProche(personnage, false)
     // }, null, personnage);

     // .lineBetween(elementProche.x, elementProche.y, personnage.x, personnage.y)
    // personnage.particules = true
  }
  // console.log(personnage.scene.players.getLength())
  if (input.tab_fin) {
    elementProche(personnage, false)
    // personnage.particules = false
  }


}

function elementProche(personnage: TJoueur, etat: boolean, type: string = 'players', activeElement: string = 'particules') {
  let groupeCible = personnage.scene[type].getChildren();
  let elementProche: any = personnage.scene.physics.closest(personnage, groupeCible);
  if (elementProche) elementProche[activeElement] = etat;
}
