import { Projectile } from "../../../RoomState"


export default class KunaiClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  proprietaire: string = ''
  traqueJoueur: Phaser.Physics.Arcade.Sprite

  sprite: string = 'huzounet'
  _frame: string = 'kunai'

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
    this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.id = id
    this.scale = 0.2;

    (this.scene as any).suppressionProjectileDelai(this, id, 1300, true)

    this.setCollideWorldBounds(true);

  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (this.traqueJoueur) {
      this.x = this.traqueJoueur.x
      this.y = this.traqueJoueur.y
    }

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
