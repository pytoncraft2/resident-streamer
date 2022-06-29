import { setAnimation } from "../Animations/AnimationJoueur"
import TJoueur from "../types/Joueur";
import Ligne from "../class/elements/Ligne";
import ManetteClass from '../class/elements/ManetteClass'
import { Aptitudes } from "../Aptitudes/base"
import { fusion } from "./_utilitaire/general";

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
  // if (input.r)
  // {
  // //@ts-ignore
  //   // if (fakhear.groupeManettes.getLength() == 0) {
  //
  //     let obj_manette
  //     const positionElementProche: any = fakhear.scene.physics.closest(fakhear, [...(fakhear.scene as any).groupeBoulesHuzounet.getChildren()])
  //     // console.log(fakhear.scene.groupeBoulesHuzounet.getLength())
  //     // if (positionElementProche) {
  //     //   positionElementProche.traquer(fakhear)
  //     // }
  //     if (positionElementProche) {
  //       console.log("OUI !!")
  //       console.log(positionElementProche.sprite)
  //       obj_manette = positionElementProche
  //     }
  //     else
  //     {
  //       obj_manette = fakhear.scene.add.existing(new ManetteClass(fakhear.scene, fakhear.flipX ? fakhear.x - 80 : fakhear.x + 80, fakhear.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
  //       .setData({ ClientId: fakhear.ClientID, degat: 1}))
  //     }
  // //@ts-ignore
  //     fakhear.groupeManettes.add(obj_manette);
  // //@ts-ignore
  //   } else if (fakhear.groupeManettes.getLength() == 1 && !fakhear.porteObjet) {
  // //@ts-ignore
  //     fakhear.porteObjet = true
  // //@ts-ignore
  //     fakhear.groupeManettes.getChildren()[0].traquer(fakhear)
  //     console.log("TRAQUE 1")
  // //@ts-ignore
  //   } else if (fakhear.porteObjet) {
  // //@ts-ignore
  //     fakhear.groupeManettes.getChildren()[0].traquer(fakhear, true)
  // //@ts-ignore
  //     fakhear.porteObjet = false
  //     //@ts-ignore
  //     // Aptitudes['manette'].animationLancerManette(fakhear)
  //     console.log("TRAQUE 2")
  //   }
  //
  //
  //   input.r = false
  // }
  //











  if (input.r)
  {

    const positionElementProche: any = fakhear.scene.physics.closest(fakhear, [...(fakhear.scene as any).groupeManettes.getChildren()])
    // console.log(fakhear.scene.groupeBoulesHuzounet.getLength())
    // if (positionElementProche) {
    //   positionElementProche.traquer(fakhear)
    // }

    let obj_manette
    if (positionElementProche) {
      obj_manette = positionElementProche
      //@ts-ignore
      console.log("MANETTE ATTRAPER !")
      let dist = Phaser.Math.Distance.BetweenPoints(obj_manette, fakhear);
      console.log(dist)

      if (dist < 85) {
        obj_manette.tweenManette.stop()
        obj_manette.timer.remove()
        obj_manette.traquer(fakhear)
        // obj_manette.setTint(0x2cd716)
        //@ts-ignore
        fakhear.groupeManettes.add(obj_manette);
      }
      // obj_manette.stop()
      // var tweens = fakhear.scene.tweens.getTweensOf(obj_manette);
      // console.log(tweens)
      //@ts-ignore
    }
    else
    {
      // obj_manette = fakhear.scene.add.existing(new ManetteClass(fakhear.scene, fakhear.flipX ? fakhear.x - 80 : fakhear.x + 80, fakhear.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
      // .setData({ ClientId: fakhear.ClientID, degat: 1}))
      // //@ts-ignore
      // fakhear.groupeManettes.add(obj_manette);
    }

  //@ts-ignore
    // if (fakhear.groupeManettes.getLength() == 0) {
        // const obj_manette = fakhear.scene.add.existing(new ManetteClass(fakhear.scene, fakhear.flipX ? fakhear.x - 80 : fakhear.x + 80, fakhear.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
        // .setData({ ClientId: fakhear.ClientID, degat: 1}))
  //@ts-ignore
      // fakhear.groupeManettes.add(obj_manette);
  //@ts-ignore
    // }
    // else
  // if (fakhear.groupeManettes.getLength() == 1 && !fakhear.porteObjet) {
  // //@ts-ignore
  //     fakhear.porteObjet = true
  // //@ts-ignore
  //     fakhear.groupeManettes.getChildren()[0].traquer(fakhear)
  //     console.log("TRAQUE 1")
  // //@ts-ignore
  //   } else if (fakhear.porteObjet) {
  // //@ts-ignore
  //     fakhear.groupeManettes.getChildren()[0].traquer(fakhear, true)
  // //@ts-ignore
  //     fakhear.porteObjet = false
  //     //@ts-ignore
  //     Aptitudes['manette'].animationLancerManette(fakhear)
  //     console.log("TRAQUE 2")
  //   }


    input.r = false
  }











}
// export fusion()
// export function fusion(personnage, input);
export function fusion__TAB(personnage: TJoueur, input: any) {
  fusion(personnage, input)
}
