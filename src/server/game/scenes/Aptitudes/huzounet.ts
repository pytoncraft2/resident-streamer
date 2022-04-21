import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import { Boule } from "../../RoomState"

import TJoueur from "../types/Joueur";

export function shuriken(huzounet: TJoueur, input?: any) {

  if (input.a.charge)
  {
    console.log(huzounet.scene.groupeBoulesHuzounet.getLength())
      setAnimation(huzounet, 'huzounet_preparation_attaque')
    if (!huzounet.scene.groupeBoulesHuzounet.isFull()) {
      huzounet.scene.groupeBoulesHuzounet.add(huzounet.scene.add.existing(new BouleClass(huzounet.scene, huzounet.x -80, huzounet.y - 160, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID})))
      // const p = huzounet.scene.groupeBoulesHuzounet.getFirstAlive();
      const l = huzounet.scene.groupeBoulesHuzounet.getLength();
      const p = huzounet.scene.groupeBoulesHuzounet.getChildren()[l - 1];

      (p.body as any).setAllowGravity(false);
      huzounet.scene.containerColision
      // huzounet.animationCharge = huzounet.scene.add.tween({
      //   targets: p,
      //   scale: 2,
      //   duration: 1000
      // })
    } else {
      var timer = huzounet.scene.time.addEvent({
        delay: 3000,
        args: [huzounet],
        callback: function(h) {
          (h.scene.groupeBoulesHuzounet.clear())
        },
        loop: false
      });
    }
    input.a.charge = false
  }

  if (input.a.envoie)
  {
    // if (!huzounet.scene.groupeBoulesHuzounet.isFull()) {
      setAnimation(huzounet, 'huzounet_envoie_attaque')
      // huzounet.animationCharge.remove()
      const l = huzounet.scene.groupeBoulesHuzounet.getLength();
      const p = huzounet.scene.groupeBoulesHuzounet.getChildren()[l - 1];
      (p as any).setVelocityX(huzounet.flipX ? -1200 : 1200).setDestructionIminente((boule) => {
        console.log("DDDDDDDDDDDDDDDDDDDDDDDDDESSSSTRUCTION DE L'ID")
        huzounet.scene.room.state.boules.set(
          boule.id,
          new Boule({
            x: boule.x,
            y: boule.y,
            scale: boule.scale,
            alpha: boule.alpha,
            id: boule.id,
            active: false
          }))
          boule.setActive(false)
          var timer = huzounet.scene.time.addEvent({
            delay: 10,
            args: [boule, huzounet],
            callback: function(b, h) {
              (b.destroy(true), h.scene.room.state.boules.delete(b.id))
            },
            loop: false
          });
        })
      // }

    input.a.envoie = false
  }

}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
