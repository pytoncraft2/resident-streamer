import TJoueur from "../types/Joueur";

export function __StatsSupplementaire(fakhear: TJoueur, _Aptitudes: any) {
}

export function cross__A(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a)
  {
    console.log("BAT A");
    input.a = false
  }
}

export function kick__Z(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
    console.log("BAT Z");
}

export function dash__E(huipat: Phaser.Physics.Arcade.Sprite | any) {
  console.log("BAT E");
}

export function fusion__TAB(huipat: TJoueur, input: any) {
  console.log("FUSION TAB BAT");
}