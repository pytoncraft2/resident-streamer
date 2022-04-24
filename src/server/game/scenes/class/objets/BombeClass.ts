import { Bombe } from "../../../RoomState"

export default class BombeClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string  = ''
  actif: boolean = true

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
    // this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.id = id

    this.setBounce(1, 1);
    this.setCollideWorldBounds(true);

  }
  preUpdate(time, delta) {
    // console.log(this.anims.msPerFrame += 300)
    super.preUpdate(time, delta);


      (this.scene as any).room.state.bombes.set(
        this.id,
        new Bombe({
          x: this.x,
          y: this.y,
          alpha: this.alpha,
          id: this.id,
          active: this.active,
          anim: this.anims.getFrameName()
        })
      )
  }
}
