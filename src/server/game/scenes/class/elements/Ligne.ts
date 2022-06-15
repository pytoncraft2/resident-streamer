import { Ligne } from "../../../RoomState"

export default class LigneClass extends Phaser.GameObjects.Line {
  sprite: string = 'laser01'
  _frame: string = 'laser01'
  id: any

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    x1: number,
    y1:number,
    x2: number,
    y2:number,
    strokeColor:number,
    strokeAlpha:number,
    ClientID: string,
  ) {
    super(scene, x, y, x1, y1, x2, y2, strokeColor, strokeAlpha)
    this.init(scene, ClientID)
  }

  init(scene: Phaser.Scene, id: string) {
    this.scene = scene
    this.scene.add.existing(this)
    this.id = id;
  }

  preUpdate(time, delta) {
    console.log("LIGNE !!!")
  }
}
