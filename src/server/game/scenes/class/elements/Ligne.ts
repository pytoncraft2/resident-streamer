import { Ligne } from "../../../RoomState"

export default class LigneClass extends Phaser.GameObjects.Graphics {
  closest: any
  personnage: any
  lineColor: any
  lineHeight: Phaser.Tweens.Tween
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
    this.scene.time.delayedCall(10000, () => {
      this.defaultFillColor = 0x03bb03
    }, null, this);

    // this.scene.tweens.add({
    //   targets: this.lineHeight,
    //   height: 9,
    //   // alpha: '+=1',
    //   // alpha: { from: 0, to: 1 },
    //   // alpha: { start: 0, to: 1 },
    //   // alpha: { start: value0, from: value1, to: value2 },
    //   // alpha: function(target, key, value, targetIndex, totalTargets, tween)  { return newValue; },
    //   // alpha: {
    //   //      getActive: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; },
    //   //      getStart: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; },
    //   //      getEnd: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; }
    //   // },
    //   ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    //   duration: 2000,
    //   repeat: 0,            // -1: infinity
    //   yoyo: false
    // });

    this.lineHeight = this.scene.tweens.addCounter({
      from: 0,
      to: 20,
      ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 150,
      repeat: -1,            // -1: infinity
      yoyo: true,
    });


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
        couleur: this.defaultFillColor,
        lineHeight: this.lineHeight.getValue(),
      })
    )
  }
}
