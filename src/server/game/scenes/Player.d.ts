declare interface IPlayer extends Phaser.GameObjects.Sprite
{
	action(objet_rencontré): void
}

declare namespace Phaser.GameObjects
{
	interface GameObjectFactory
	{
		player(): IPlayer
	}
}
