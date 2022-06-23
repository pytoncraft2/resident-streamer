import { Rectangle } from "../../../RoomState"
import TJoueur from "../../types/Joueur";

export default class LaserClass extends Phaser.GameObjects.Rectangle {
  sprite: string = 'laser'
  _frame: string = 'laser'
  id: any
  rect: any
  proprietaire: any
  proprietaireID: any
  tweenLaser: Phaser.Tweens.Tween
  agrandissement: boolean

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: any,
    fillAlpha: any,
    ClientID: string,
    proprietaire: any
  ) {
    super(scene, x, y, width, height, fillColor, fillAlpha)

    this.init(scene, ClientID, proprietaire)
  }

  init(scene: Phaser.Scene, id: string, proprietaire: TJoueur) {
    this.scene = scene
    console.log("PROPRIETAIRE ID:")
    this.proprietaireID = proprietaire.ClientID
    this.proprietaire = proprietaire
    this.agrandissement = false;
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this);
    this.id = id;
    // this.height = 200
  }

  preUpdate(_time: number, _delta: number) {
    if (this.agrandissement) this.width += 200

    this.x = this.proprietaire.x + 80;
    this.y = this.proprietaire.y - 185;

    var x = this.x;
    var y = this.y;

    var within = this.scene.physics.overlapRect(x, y, this.width, this.height);

    within.forEach(function (body: any) {
      if (body.gameObject.type == "Sprite") {
        if (body.gameObject.ClientID != this.proprietaireID) {
          if (body.gameObject.dommage && this.agrandissement) body.gameObject.dommage(0.08);
          console.log("WITHIN!!")
        }
      }
    }, this);

    (this.scene as any).room.state.rectangles.set(
      this.id,
      new Rectangle({
        x: this.x,
        y: this.y,
        id: this.id,
        width: -this.width,
        height: this.height,
        fillColor: this.fillColor,
        fillAlpha: this.fillColor,
        angle: this.angle
      })
    )

  }

  charge() {
    if (!this.proprietaire.flipX) {

        const e: any = this.scene.physics.closest(this.proprietaire, [...(this.scene as any).enemies.getChildren()])

        if (e) {
          var rad = Phaser.Math.Angle.Between(e.x, e.y + 140, this.proprietaire.x, this.proprietaire.y);
          // var rad = Phaser.Math.Angle.BetweenPoints({x: e.x, y: e.y}, {x: this.proprietaire.x, y: this.proprietaire.y});
          var deg = Phaser.Math.RadToDeg(rad);  // deg : -180 ~ 180
          this.setAngle(deg)
          // this.rotation = rad
        }
      this.agrandissement = true;
      this.setOrigin(0, 6)
      this.scene.time.delayedCall(400, () => {
        this.agrandissement = false;
        this.setSize(1, this.height);
      }, null, this);
    }
  }
}
