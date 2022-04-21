interface BaseEquipement {
  boulesEnMain: Phaser.Physics.Arcade.Group;
}

interface Scene extends Phaser.Scene {
  containerColision: Phaser.GameObjects.Container;
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
  boulesEnMain: Phaser.Physics.Arcade.Group
  containerColision: Phaser.GameObjects.Container
  scene: Scene
}

  export default TJoueur;
