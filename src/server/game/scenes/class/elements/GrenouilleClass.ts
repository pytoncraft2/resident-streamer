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

  init(scene: Phaser.Scene, id: string, flipX: boolean, cible: string) {
    this.scene = scene
    scene.physics.add.existing(this);
    this.id = id
    this.setFlipX(flipX)

    this.setCollideWorldBounds(true);

    new AnimationGrenouille(this.anims)

    //@ts-ignore
    this.scene.physics.add.collider([this.scene.platforme, this.scene.platforme_droite, this.scene.platforme_gauche, this.scene.platforme_haut, this.scene.platforme_haut_gauche, this.scene.platforme_haut_droite], this)


    scene.time.delayedCall(900, () => {
      this.play('grenouille_tire')

      const id1 = `${(Math.random() + 1).toString(36).substring(7)}`
      const balle1 = this.scene.add.existing(new Balle(this.scene, this.x, this.y - 55, 'balle', id1, !this.flipX, cible))
      this.scene.physics.add.existing(balle1);
      (this.scene as any).suppressionProjectileDelai(balle1, id1, 500, true)

      this.scene.time.delayedCall(100, () => {

        const id2 = `${(Math.random() + 1).toString(36).substring(7)}`
        const balle2 = this.scene.add.existing(new Balle(this.scene, this.x, this.y - 55, 'balle', id2, !this.flipX, cible))
        this.scene.physics.add.existing(balle2);
        (this.scene as any).suppressionProjectileDelai(balle2, id2, 600, true)

        this.scene.time.delayedCall(200, () => {

          const id3 = `${(Math.random() + 1).toString(36).substring(7)}`
          const balle3 = this.scene.add.existing(new Balle(this.scene, this.x, this.y - 55, 'balle', id3, !this.flipX, cible))
          this.scene.physics.add.existing(balle3);
          (this.scene as any).suppressionProjectileDelai(balle3, id3, 700, true)

        }, null, this);
      }, null, this);
    }, null, this);

    (this.scene as any).suppressionProjectileDelai(this, id, 1400, true)
    //args: [],
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
