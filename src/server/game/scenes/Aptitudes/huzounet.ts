import { setAnimation } from "../Animations/AnimationJoueur"


export function shuriken(huzounet:Phaser.Physics.Arcade.Sprite|any, input?: any) {
  if (input.a.charge) {
    console.log('CHHHHHARRRGE')
    huzounet.scene.room.broadcast("apparition-boule", {x: huzounet.flipX ? huzounet.x + 100 : huzounet.x - 100 , y:  huzounet.flipX ? huzounet.y - 170 : huzounet.y + 170, id: huzounet.ClientID})
    input.a.charge = false
  }
  if (input.a.envoie) {
    input.a.envoie = false
  }
}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
