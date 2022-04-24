interface BaseEquipement {
  boulesEnMain: Phaser.Physics.Arcade.Group;
}

interface Kunai extends Phaser.Physics.Arcade.Sprite {
  kunai: Phaser.Physics.Arcade.Group;
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
  kunai: KunaiClass
  scene: Scene
  interaction_objet: boolean
}

  export default TJoueur;
