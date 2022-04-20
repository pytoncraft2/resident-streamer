declare interface ISlime extends Phaser.GameObjects.Sprite
{
	changeColor(): void
}

declare namespace Phaser.GameObjects
{
	interface GameObjectFactory
	{
		slime(): ISlime
	}
}
