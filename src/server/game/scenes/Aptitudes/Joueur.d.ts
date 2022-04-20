//TJoueur = Type declaration Joueur
interface BaseEquipement {
    boulesEnMain: Phaser.Physics.Arcade.Group;
}

declare interface TJoueur extends Phaser.GameObjects.Sprite
{
	next(): void
	parametresDeBase: BaseEquipement
	ClientID: string
	vie: number,
	displayWidth: number,
	displayHeight: number,
	masse: number,
	puissanceDeBase: number,
	boulesEnMain: Phaser.Physics.Arcade.Group
}

declare namespace Phaser.GameObjects
{
	interface GameObjectFactory
	{
		action(): ISlime
	}
}
