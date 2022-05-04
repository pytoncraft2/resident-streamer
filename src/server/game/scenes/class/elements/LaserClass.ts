import { Projectile } from "../../../RoomState"


// var rect = new Phaser.GameObjects.Rectangle(scene, x, y, width, height, fillColor, fillAlpha);
// scene.add.existing(rect);
export default class LaserClass extends Phaser.GameObjects.Rectangle {
  sprite: string = 'huzounet'
  _frame: string = 'kunai'
  id: any

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: any,
    fillAlpha: any,
    ClientID: string
  ) {
    super(scene, x, y, width, height, fillColor, fillAlpha)

    this.init(scene, ClientID)
  }

  init(scene: Phaser.Scene, id: string) {
    this.scene = scene
    // this.scene.add.existing(this)
    // scene.physics.add.existing(this);
    this.id = id;
    // console.log("CCCCCCCCCCCCCCCCCREATION laser")

    // this.setBounce(1, 1);
    (this.scene as any).room.state.projectiles.set(
      this.id,
      new Projectile({
        x: this.x,
        y: this.y,
        id: this.id,
        laser: true
        // flipX: this.flipX,
        // sprite: this.sprite,
        // _frame: this._frame
      })
    )

  }
  update(time, delta) {
    // console.log(this.anims.msPerFrame += 300)


  }

}
