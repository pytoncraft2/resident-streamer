import { Projectile } from "../../../RoomState"


export default class Toile extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  proprietaire: string = ''
  traqueJoueur: Phaser.Physics.Arcade.Sprite

  sprite: string = 'toile'
  _frame: string = 'toile'

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

    this.init(scene, ClientID, sprite, flipX)
  }

  init(scene: Phaser.Scene, id: string, sprite: string, flipX: boolean) {
    this.scene = scene
    scene.physics.add.existing(this);
    
    //@ts-ignore
    // this.body.setAllowGravity(false);
    this.id = id
    this.scale = 0.3
    this.alpha = 1
    this.sprite = sprite;
    this.setVelocity(flipX ? -1900 : 1900, -600);

    (this.scene as any).suppressionProjectileDelai(this, id, 300, false)

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