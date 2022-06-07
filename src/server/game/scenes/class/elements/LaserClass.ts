import { Projectile } from "../../../RoomState"


// var rect = new Phaser.GameObjects.Rectangle(scene, x, y, width, height, fillColor, fillAlpha);
// scene.add.existing(rect);
export default class LaserClass extends Phaser.GameObjects.Rectangle {
  sprite: string = 'laser01'
  _frame: string = 'laser01'
  id: any
  rect: any
  proprietaire: any
  proprietaireID: any

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

  init(scene: Phaser.Scene, id: string, proprietaire) {
    this.scene = scene
    console.log("PROPRIETAIRE ID:")
    this.proprietaireID = proprietaire.ClientID
    this.proprietaire = proprietaire
    // this.rect = this.scene.add.rectangle(400, 300, 300, 20, 0x9966ff).setStrokeStyle(2, 0xffff00);
    // this.rect.setPosition(proprietaire.x, proprietaire.y)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this);
    this.setScale(0.19265106053743225, 0.14474581179115986)
    // var block = this.physics.add.sprite(700, 300, 'mushroom');
    // blocks.push(block);
    this.setAlpha(0)
    this.setDepth(2)



    // this.scene.add.existing(this)
    // scene.physics.add.existing(this);
    this.id = id;
    // console.log("CCCCCCCCCCCCCCCCCREATION laser")

    // this.setBounce(1, 1);


  }

  preUpdate(time, delta) {
    // console.log("UPDATE!!!")
    // this.setScale(0.1)

    this.x = this.proprietaire.x + 80
    this.y = this.proprietaire.y - 185

    var x = this.x;
    var y = this.y - (this.height /2);

    var within = this.scene.physics.overlapRect(x, y, this.width - 150, this.height);

    within.forEach(function (body) {
      if (body.gameObject.type == "Sprite") {
        if (body.gameObject.ClientID != this.proprietaireID) {
          body.gameObject.setTint(0xff0000);
        }
      }
    }, this);

    (this.scene as any).room.state.projectiles.set(
      this.id,
      new Projectile({
        x: this.x,
        y: this.y,
        id: this.id,
        laser: true,
        scale: this.scale,
        depth: this.depth,
        sprite: this.sprite,
        alpha: this.alpha,
        _frame: this._frame
      })
    )

  }

  charge() {
    var tween = this.scene.tweens.add({
      targets: this,
      alpha: 0.7,
      //displayOriginX: rect.displayOriginX,
      duration: 200,
      yoyo: true,
      repeat: 3
    });
  }

  // update(time, delta) {
  //   this.setAlpha(0.5)
  // //
  // }

}
