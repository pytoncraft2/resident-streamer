interface BaseEquipement {
  boulesEnMain: Phaser.Physics.Arcade.Group;
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
}

  export default TJoueur;
