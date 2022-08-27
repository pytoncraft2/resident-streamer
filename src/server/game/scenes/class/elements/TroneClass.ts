import { Projectile } from "../../../RoomState"

export default class TroneClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  proprietaire: string = ''
  traqueJoueur: Phaser.Physics.Arcade.Sprite

  sprite: string = 'super_boss'
  _frame: string = 'tronetest'
  vitesse: number = 0
  puissance: number = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    ClientID: string,
    frame: string,
    positionY: number
  ) {
    super(scene, x, y, sprite)

    this.init(scene, ClientID, frame, positionY)
  }

  init(scene: Phaser.Scene, id: string, frame: string, positionY) {
    this.scene = scene
    this._frame = frame
    this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.id = id

    this.setPosition(3000, positionY);

  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    (this.scene as any).room.state.projectiles.set(
      this.id,
      new Projectile({
        x: this.x,
        y: this.y,
        id: this.id,
        flipX: this.flipX,
        sprite: this.sprite,
        alpha: this.alpha,
        _frame: this._frame
      })
    )
  }

  traquer(joueur: Phaser.Physics.Arcade.Sprite, desactivation: boolean = false) {
    if (desactivation) this.traqueJoueur = null
    else this.traqueJoueur = joueur
  }
}
