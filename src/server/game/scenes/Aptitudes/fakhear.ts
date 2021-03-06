import { setAnimation } from "../Animations/AnimationJoueur"
import TJoueur from "../types/Joueur";
import ManetteClass from '../class/elements/ManetteClass'
import { Aptitudes } from "../Aptitudes/base"
import { fusion, closest } from "./_utilitaire/general";

export function test() {}

export function __StatsSupplementaire(fakhear: TJoueur, _Aptitudes: any) {
  //@ts-ignore
  fakhear.groupeManettes = fakhear.scene.physics.add.group({
    runChildUpdate: true,
    collideWorldBounds: true,
    allowGravity: false
  })
  //@ts-ignore
  fakhear.porteObjet = false
}

export function cross__A(fakhear: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a) {
    input.a = false
    fakhear.setVelocityX(0)
    setAnimation(fakhear, 'cross')
    // if (!fakhear.obj_manette) {
    //   const obj_manette = fakhear.scene.add.existing(new ManetteClass(fakhear.scene, fakhear.flipX ? fakhear.x - 80 : fakhear.x + 80, fakhear.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
    //   .setData({ ClientId: fakhear.ClientID, degat: 1}))
    //   fakhear.obj_manette = obj_manette
    // } else {
    //   fakhear.obj_manette.traquer(fakhear)
    // }
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

export function interaction__R(fakhear: TJoueur, input) {
  if (input.r)
  {
    const elementProche: any = fakhear.scene.physics.closest(fakhear, [...(fakhear.scene as any).groupeManettes.getChildren()])
    if (elementProche) {
      let dist = Phaser.Math.Distance.BetweenPoints(elementProche, fakhear);
      if (dist < 225) {
        (fakhear.scene as any).suppressionProjectileDelai(elementProche, elementProche.id, 0)
      }
    }
    input.r = false
  }
}
// export fusion()
// export function fusion(personnage, input);
export function fusion__TAB(personnage: TJoueur, input: any) {
  fusion(personnage, input)
}
