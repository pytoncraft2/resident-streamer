import { setAnimation } from "../Animations/AnimationJoueur"
import TJoueur from "../types/Joueur";
import fusion from "./_utilitaire/fusion";
import ManetteClass from "../class/elements/ManetteClass";
import { Balle } from "../class/elements/Balle";
import Toile from "../class/elements/Toile";

export function __StatsSupplementaire(fakhear: TJoueur, _Aptitudes: any) {
  fakhear.degat = 10
}

export function cross__A(fakhear: Phaser.Physics.Arcade.Sprite|any, input: any) {
    console.log("GRIAL A");
}

export function kick__Z(manette: Phaser.Physics.Arcade.Sprite|any, input: any) {
    console.log("GIRL Z");
}

export function dash__E(huipat: Phaser.Physics.Arcade.Sprite | any) {
  console.log("GIRL E");
}

export function fusion__TAB(huipat: TJoueur, input: any) {
  console.log("FUSION TAB GIRL");
}