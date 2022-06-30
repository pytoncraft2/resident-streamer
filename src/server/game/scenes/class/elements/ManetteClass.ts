import { Projectile } from "../../../RoomState"

export default class ManetteClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string  = ''
  actif: boolean = true
  traqueJoueur: Phaser.Physics.Arcade.Sprite
  suivre: boolean

  vitesse: number = 0
  puissance: number = 0
  sprite: string = 'manette'
  _frame: string = 'objet_manette'

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

  init(scene: Phaser.Scene, id: string, sprite) {
    this.scene = scene
    this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.id = id
    this.scale = 0.2
    this.sprite = sprite;

    //@ts-ignore
    this.timer = (this.scene as any).suppressionProjectileDelai(this, id, 1100, true)

    // this.setBounce(1, 1);
    this.setCollideWorldBounds(true);

  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.angle += 32;

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
          active: this.active,
          flipX: this.flipX,
          sprite: this.sprite,
          alpha: this.alpha,
          angle: this.angle,
          _frame: this._frame
        })
      )
  }

  traquer(joueur: Phaser.Physics.Arcade.Sprite, desactivation: boolean = false) {
    if (desactivation) this.traqueJoueur = null
    else this.traqueJoueur = joueur
  }

}
