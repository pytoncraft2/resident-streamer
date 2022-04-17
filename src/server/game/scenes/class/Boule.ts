import { Boule } from "../../RoomState"

export default class BouleClass extends Phaser.Physics.Arcade.Sprite {
  ClientID: any
  vel: number = 400
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

  init(scene: Phaser.Scene, ClientID: string) {
    this.scene = scene
    this.scene.add.existing(this)
    // this.ClientID = ClientID
  }
  preUpdate(time, delta) {
    // console.log(this.anims.msPerFrame += 300)
    super.preUpdate(time, delta);

    (this.scene as any).room.state.presences.set(
      this.ClientID,
      new Boule({
        x: this.x,
        y: this.y,
      })
    )
  }
}
