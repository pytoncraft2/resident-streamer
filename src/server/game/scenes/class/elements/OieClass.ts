import { Projectile } from "../../../RoomState"
import { AnimationOie } from "../../Animations/AnimationJoueur"

export default class OieClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string  = ''
  actif: boolean = true
  zoneInteraction: any
  explosion: boolean

  sprite: string = 'troll'
  _frame: string = 'attack0'

  vitesse: number = 0
  puissance: number = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    ClientID: string,
    flipX: boolean
  ) {
    super(scene, x, y, sprite)

    this.init(scene, ClientID, flipX)
  }

  init(scene: Phaser.Scene, id: string, flipX: boolean) {
    this.scene = scene
    scene.physics.add.existing(this);
    this.id = id

    this.setCollideWorldBounds(true);

    new AnimationOie(this.anims)
    this.setFlipX(flipX)
    this.setScale(1.5);
    this.play('oie_tire');
    this.setSize(this.width, 100);
    // scene.suppressionProjectileDelai(this, id, 1400, true)
    (this.scene as any).room.state.projectiles.set(
      this.id,
      new Projectile({
        x: this.x,
        y: this.y,
        id: this.id,
        anim: this.anims.getFrameName(),
        sprite: this.sprite,
        flipX: this.flipX,
        scale: this.scale,
        _frame: this._frame
      })
    );
    (this.scene as any).suppressionProjectileDelai(this, id, 1300, true);
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.setVelocityX(this.flipX ? -500 : 500);

      (this.scene as any).room.state.projectiles.set(
        this.id,
        new Projectile({
          x: this.x,
          y: this.y,
          alpha: this.alpha,
          id: this.id,
          anim: this.anims.getFrameName(),
          sprite: this.sprite,
          _frame: this._frame
        })
      )
  }
}