import { Projectile } from "../../../RoomState"
import { AnimationOie } from "../../Animations/AnimationJoueur"
import { Balle } from "./Balle"

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

    this.setCollideWorldBounds(true);

    new AnimationOie(this.anims)
    this.setFlipX(flipX)
    this.setScale(1.5);
    this.play('oie_tire');
    this.setSize(this.width - 20, 100);
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

    this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (_anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {

        if (frame.frame.name == 'attack3') {
          const idBalle = `${(Math.random() + 1).toString(36).substring(7)}`
          const balle = this.scene.add.existing(new Balle(this.scene, this.x, this.y - 30, 'balle', idBalle, this.flipX, cible));
          this.scene.physics.add.existing(balle);

          (this.scene as any).suppressionProjectileDelai(balle, idBalle, 700, true)
        }

        if (frame.frame.name == 'attack4') {
          const idBalleInverse = `${(Math.random() + 1).toString(36).substring(7)}`
          const balle = this.scene.add.existing(new Balle(this.scene, this.x, this.y - 30, 'balle', idBalleInverse, !this.flipX, cible));
          this.scene.physics.add.existing(balle);

          (this.scene as any).suppressionProjectileDelai(balle, idBalleInverse, 700, true)
        }

    });



  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.setVelocityX(this.flipX ? -500 : 500);


    // if (this.frame.name === "attack4") {

    // }
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
