import { Projectile } from "../../../RoomState"
import { AnimationGrenouille } from "../../Animations/AnimationJoueur"

export default class GrenouilleClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string  = ''
  actif: boolean = true
  zoneInteraction: any
  explosion: boolean

  sprite: string = 'troll'
  _frame: string = 'frog0'

  vitesse: number = 0
  puissance: number = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    ClientID: string
  ) {
    super(scene, x, y, sprite)

    this.init(scene, ClientID)
  }

  init(scene: Phaser.Scene, id: string) {
    this.scene = scene
    scene.physics.add.existing(this);
    this.id = id

    this.setCollideWorldBounds(true);

    new AnimationGrenouille(this.anims)
    // (this.scene as any).room.state.projectiles.set(
    //   this.id,
    //   new Projectile({
    //     x: this.x,
    //     y: this.y,
    //     id: this.id,
    //     anim: this.anims.getFrameName(),
    //     sprite: this.sprite,
    //     _frame: this._frame
    //   })
    // )
  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

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
