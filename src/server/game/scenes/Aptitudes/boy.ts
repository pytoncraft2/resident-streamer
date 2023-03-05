import TJoueur from "../types/Joueur";

export function __StatsSupplementaire(fakhear: TJoueur, _Aptitudes: any) {
}

export function cross__A(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a)
  {
    console.log("BOY A");
    input.a = false
  }
}

export function kick__Z(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
    console.log("BOY Z");
}

export function dash__E(huipat: Phaser.Physics.Arcade.Sprite | any) {
  console.log("BOY E");
}

export function fusion__TAB(huipat: TJoueur, input: any) {
  console.log("FUSION TAB BOY");
}