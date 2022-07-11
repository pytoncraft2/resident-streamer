import { Projectile } from "../../../RoomState"
import { AnimationGrenouille } from "../../Animations/AnimationJoueur"
import { Balle } from "./Balle"

export default class GrenouilleClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  sprite: string = 'troll'
  _frame: string = 'frog0'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    ClientID: string,
    flipX: boolean,
    cible: string
  ) {
    super(scene, x, y, sprite)

    this.init(scene, ClientID, flipX, cible)
  }

  init(scene: Phaser.Scene, id: string, flipX: boolean, cible) {
    this.scene = scene
    scene.physics.add.existing(this);
    this.id = id
    this.setFlipX(flipX)

    this.setCollideWorldBounds(true);

    new AnimationGrenouille(this.anims)
    //@ts-ignore
    scene.physics.add.collider(scene.platforme, this);

    scene.time.delayedCall(900, () => {
      this.play('grenouille_tire')
      const balle1 = this.scene.add.existing(new Balle(this.scene, this.x, this.y - 55, 'balle', `${(Math.random() + 1).toString(36).substring(7)}`, !this.flipX, cible))
      this.scene.time.delayedCall(100, () => {
        const balle2 = this.scene.add.existing(new Balle(this.scene, this.x, this.y - 55, 'balle', `${(Math.random() + 1).toString(36).substring(7)}`, !this.flipX, cible))
        this.scene.physics.add.existing(balle1);

        this.scene.time.delayedCall(200, () => {
          const balle3 = this.scene.add.existing(new Balle(this.scene, this.x, this.y - 55, 'balle', `${(Math.random() + 1).toString(36).substring(7)}`, !this.flipX, cible))
          this.scene.physics.add.existing(balle3);
        }, null, this);

      }, null, this);
    }, null, this);

    //args: [],
(this.scene as any).suppressionProjectileDelai(this, id, 1400, true)
this.setSize(300, 300);

(this.scene as any).room.state.projectiles.set(
  this.id,
  new Projectile({
    x: this.x,
    y: this.y,
    id: this.id,
    anim: this.anims.getFrameName(),
    sprite: this.sprite,
    flipX: this.flipX,
    _frame: this._frame,
    scale: 2
  })
)
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
