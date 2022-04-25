interface BaseEquipement {
  boulesEnMain: Phaser.Physics.Arcade.Group;
}

interface Scene extends Phaser.Scene {
  containerColision: Phaser.GameObjects.Container;
  room: any
  groupeBoulesHuzounet: Phaser.Physics.Arcade.Group;
}


interface TJoueur extends Phaser.GameObjects.Sprite
{
  parametresDeBase: BaseEquipement
  ClientID: string
  vie: number,
  displayWidth: number,
  displayHeight: number,
  masse: number,
  puissanceDeBase: number,
  puissanceChargeBoule: number,
  boulesEnMain: Phaser.Physics.Arcade.Group
  containerColision: Phaser.GameObjects.Container
  animationCharge: Phaser.Tweens.Tween
  kunai: Phaser.Physics.Arcade.Sprite|undefined
  scene: Scene
  interaction_objet: boolean
  compteurSaut: number;

  body: Phaser.Physics.Arcade.Body

  //akhizonah
  bombe: Phaser.Physics.Arcade.Sprite|undefined
}

  export default TJoueur;
