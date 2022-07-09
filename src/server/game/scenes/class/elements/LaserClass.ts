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
    this.proprietaireID = proprietaire.ClientID
    this.proprietaire = proprietaire
    this.agrandissement = false;
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this);
    this.setSize(1, 1)
    // this.setDisplaySize(1900, 90)
    // this.width = 2900;
    // this.height = 90
    //@ts-ignore
    this.body.setAllowGravity(false)
    this.body.velocity.x = 100;
    this.body.velocity.y = 200;
    //@ts-ignore
    this.body.bounce.x = 1;
    //@ts-ignore
    this.body.bounce.y = 1;
    //@ts-ignore
    this.body.collideWorldBounds = true;
    this.id = id;
    this.setScale(1, 5)
    //@ts-ignore
    this.scene.physics.add.overlap(this, this.scene.players, this.overlapAction, undefined, this)
    // this.scene.physics.add.collider(this, this.scene.players);

    // this.height = 200
  }

  overlapAction(laser: any, ennemie: Phaser.Physics.Arcade.Sprite) {
    //@ts-ignore
    console.log("OVERLAP")
    //@ts-ignore
    ennemie.dommage(0.08)
  }

  preUpdate(_time: number, _delta: number) {
    if (this.agrandissement) {
      // this.width += 300
      if (this.proprietaire.body) this.proprietaire.setVelocity(0)
    }

    // this.x = this.proprietaire.x;
    // this.y = this.proprietaire.y;



    // var within = this.scene.physics.overlapRect(this.proprietaire.x  + 80,this.proprietaire.y - 185, this.width, this.height);
    //
    // within.forEach(function (body: any) {
    //   if (body.gameObject.type == "Sprite") {
    //     if (body.gameObject.ClientID != this.proprietaireID) {
    //       console.log("LASSSSSER")
    //       console.log(body.gameObject.ClientID)
    //       if (body.gameObject.dommage && this.agrandissement) body.gameObject.dommage(0.08);
    //     }
    //   }
    // }, this);

    (this.scene as any).room.state.rectangles.set(
      this.id,
      new Rectangle({
        x: this.x,
        y: this.y,
        id: this.id,
        width: this.width,
        height: this.height,
        fillColor: this.fillColor,
        fillAlpha: this.fillColor,
        angle: this.angle,
        scale: this.scale
      })
    )

  }

  charge() {
    // if (!this.proprietaire.flipX) {

        const e: any = this.scene.physics.closest(this.proprietaire, [...(this.scene as any).players.getChildren()])

        if (e) {
          // var rad = Phaser.Math.Angle.Between(e.x, e.y, this.proprietaire.x, this.proprietaire.y);
          // var rad = Phaser.Math.Angle.BetweenPoints({x: e.x, y: e.y}, {x: this.proprietaire.x, y: this.proprietaire.y});
          // var deg = Phaser.Math.RadToDeg(rad);  // deg : -180 ~ 180
          // this.setAngle(deg)
          // this.x = this.proprietaire.x
          // this.y = this.proprietaire.y
          // this.width = 1000
          // @ts-ignore
          // this.enableBody(true, this.x, this.y - 50, true, true);

          // @ts-ignore
          // this.scene.physics.velocityFromRotation(deg, 600);

          // this.rotation = rad
        }
      this.agrandissement = true;
      // this.setSize(1000, 300)
      // this.height = 200
      // this.setOrigin(0, 1)
      this.scene.time.delayedCall(4500, () => {
        this.agrandissement = false;
          // this.width = 1
        // this.setSize(1, this.height);
      }, null, this);
    // }
  }
}
