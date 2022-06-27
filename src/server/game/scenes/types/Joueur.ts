import LaserClass from "../class/elements/LaserClass";
import Hall from "../hall";

export interface Scene extends Phaser.Scene {
  containerColision: Phaser.GameObjects.Container;
  room: any
  groupeBoulesHuzounet: Phaser.Physics.Arcade.Group;
}


interface TJoueur extends Phaser.GameObjects.Sprite
{
  ClientID?: string
  vie: number,
  displayWidth: number,
  displayHeight: number,
  physics: Phaser.Physics.Arcade.ArcadePhysics
  masse: number,
  puissanceDeBase: number,


  containerColision: Phaser.GameObjects.Container
  animationCharge: Phaser.Tweens.Tween
  kunai: Phaser.Physics.Arcade.Sprite|undefined
  compteurSaut: number;
  degat: number
  sprite: string
  particules: boolean
  gfx: Phaser.GameObjects.Graphics

  tweenIcon: Phaser.Tweens.Tween
  iconSuitJoueur: boolean

  body: Phaser.Physics.Arcade.Body
  scene: Hall

  //huzounet
  puissanceChargeBoule: number,
  boulesEnMain: Phaser.Physics.Arcade.Group
  clone: boolean

  //akhizonah
  bombe: Phaser.Physics.Arcade.Sprite|undefined

  //osmosiscoop
  soigne: boolean

  //mannette
  obj_manette: Phaser.Physics.Arcade.Sprite

  //twitchman
  survole: boolean
  laser: LaserClass

  //degat
  dommage(puissance: number): void

  nouveauPilote(joueur: Phaser.Physics.Arcade.Sprite): void

  //bot
  auto(joueur: Phaser.Physics.Arcade.Sprite): void

}

  export default TJoueur;
