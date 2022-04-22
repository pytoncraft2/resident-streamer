import { setAnimation } from "../Animations/AnimationJoueur"
import BouleClass from "../class/objets/BouleClass"
import { Boule } from "../../RoomState"

import TJoueur from "../types/Joueur";

export function shuriken(huzounet: TJoueur, input?: any) {

  // console.log("charge")
  // @ts-ignore
  // huzounet.charge = true

  if (input.a) console.log("A")
  if (input.a_fin) (console.log("FIN A"), input.a_fin = false)
  // huzounet.x += 1
  // if (input.a.charge)
  // {
  // }
  //
  // if (input.a.envoie)
  // {
  // }

}

export function kunai(huzounet: Phaser.Physics.Arcade.Sprite|any) {
    setAnimation(huzounet, 'huzounet_kunai_attaque')
    // huzounet.setFrame('kunai0')
}
