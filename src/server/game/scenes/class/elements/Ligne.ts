import { Ligne } from "../../../RoomState"

export default class LigneClass extends Phaser.GameObjects.Graphics {
  closest: any
  personnage: any
  lineColor: any
  lineHeight: any
  id: any

  constructor(
    scene: Phaser.Scene,
    closest: any,
    personnage: any,
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
    this.init(scene, id, closest, personnage)
  }

  init(scene: Phaser.Scene, id: string, closest: any, personnage: any) {
    this.scene = scene
    this.scene.add.existing(this)
    this.id = id;
    this.closest = closest;
    this.personnage = personnage
  }

  preUpdate(time, delta) {

    (this.scene as any).room.state.lignes.set(
      this.id,
      new Ligne({
        x: 600,
        y: 200,
        x1: this.closest.x,
        y1: this.closest.y,
        x2: this.personnage.x,
        y2: this.personnage.y,
        couleur: this.defaultFillColor
        // scale: this.scale,
      })
    )
  }
}
