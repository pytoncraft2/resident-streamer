import { Projectile } from "../../../RoomState"


export default class BouleClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  proprietaire: string  = ''
  traqueJoueur: Phaser.Physics.Arcade.Sprite
  actif: boolean = true

  sprite: string = 'huzounet'
  _frame: string = 'shuriken0'

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

    this.init(scene, ClientID, sprite)
  }

  init(scene: Phaser.Scene, id: string, sprite: string) {
    this.scene = scene
    scene.physics.add.existing(this);
    this.id = id
    this.scale = 0.2
    this.alpha = 0.3
    this.sprite = sprite;

    (this.scene as any).suppressionProjectileDelai(this, id, 2000, true)

    this.setBounce(1, 1);
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
          scale: this.scale,
          alpha: this.alpha,
          id: this.id,
          sprite: this.sprite,
          _frame: this._frame
        })
      )
  }

  traquer(joueur: Phaser.Physics.Arcade.Sprite, desactivation: boolean = false) {
    if (desactivation) this.traqueJoueur = null
    else this.traqueJoueur = joueur
  }
}
