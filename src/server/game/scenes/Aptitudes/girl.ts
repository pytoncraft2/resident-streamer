import TJoueur from "../types/Joueur";

export function __StatsSupplementaire(fakhear: TJoueur, _Aptitudes: any) {
  fakhear.degat = 10
  var json = fakhear.scene.anims.toJSON();
  console.log(json);
  fakhear.scene.anims.fromJSON(json);
}

export function cross__A(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a)
  {
    console.log("GRIAL A");
    girl.play("run_right")
    input.a = false
  }
}

export function kick__Z(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
    console.log("GIRL Z");
}

export function dash__E(huipat: Phaser.Physics.Arcade.Sprite | any) {
  console.log("GIRL E");
}

export function fusion__TAB(huipat: TJoueur, input: any) {
  console.log("FUSION TAB GIRL");
}