import { Ligne } from "../../../RoomState"

export default class LigneClass extends Phaser.GameObjects.Graphics {
  closestX: number
  closestY: number
  personnageX: number
  personnageY: number
  lineColor: any
  lineHeight: any
  id: any

  constructor(
    scene: Phaser.Scene,
    closestX: number,
    closestY: number,
    personnageX: number,
    personnageY:number,
    lineColor: any,
    lineHeight: number,
    id: string,
  ) {
    // super(scene, [x, y, x1, y1, x2, y2, strokeColor, strokeAlpha])
    super(scene,{
      x: 0,
      y: 0,
      lineStyle: {
        width: 5,
        color: 0xff3300,
        alpha: 1
      },
      fillStyle: {
        color: 0xff3300,
        alpha: 1
      }
    })
    this.init(scene, id, closestX, closestY, personnageX, personnageY)
  }

  init(scene: Phaser.Scene, id: string, closestX: number, closestY: number, personnageX: number, personnageY: number) {
    this.scene = scene
    this.scene.add.existing(this)
    this.id = id;
    this.closestX = closestX;
    this.closestY = closestY;
    this.personnageX = personnageX
    this.personnageY = personnageY
  }

  preUpdate(time, delta) {

    (this.scene as any).room.state.lignes.set(
      this.id,
      new Ligne({
        x: 600,
        y: 200,
        x1: 0,
        y1: 0,
        x2: 140,
        y2: 0,
        couleur: this.defaultFillColor
        // scale: this.scale,
      })
    )
  }
}
