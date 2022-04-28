import { Kunai } from "../../../RoomState"

export default class ProjectileClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string  = ''
  actif: boolean = true

  vitesse: number = 0
  puissance: number = 0

  sprite: string

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
    this.alpha = 0.3
    this.sprite = sprite

    // this.setBounce(1, 1);
    this.setCollideWorldBounds(true);

  }
  preUpdate(time, delta) {
    // console.log(this.anims.msPerFrame += 300)
    super.preUpdate(time, delta);


      (this.scene as any).room.state.kunais.set(
        this.id,
        new Kunai({
          x: this.x,
          y: this.y,
          id: this.id,
          active: this.active,
          flipX: this.flipX
        })
      )
  }

  setVitesse(vitesse: number) {
    console.log("VITESSE SET:", vitesse);
    this.setVelocityX(vitesse);
  }

  lancer(id) {
    // this.proprietaire.push(id)
    // this.animationEnvoie.play()
  }

}