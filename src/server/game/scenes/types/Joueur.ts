import LaserClass from "../class/elements/LaserClass";


interface BaseEquipement {
  boulesEnMain: Phaser.Physics.Arcade.Group;
}

export interface Scene extends Phaser.Scene {
  containerColision: Phaser.GameObjects.Container;
  room: any
  groupeBoulesHuzounet: Phaser.Physics.Arcade.Group;
}


interface TJoueur extends Phaser.GameObjects.Sprite
{
  ClientID: string
  vie: number,
  displayWidth: number,
  displayHeight: number,
  masse: number,
  puissanceDeBase: number,


  containerColision: Phaser.GameObjects.Container
  animationCharge: Phaser.Tweens.Tween
  kunai: Phaser.Physics.Arcade.Sprite|undefined
  scene: Scene
  interaction_objet: boolean
  compteurSaut: number;
  degat: number
  sprite: string
  particules: boolean

  body: Phaser.Physics.Arcade.Body

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
}

  export default TJoueur;
