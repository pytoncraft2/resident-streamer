import { Projectile } from "../../../RoomState"


// var rect = new Phaser.GameObjects.Rectangle(scene, x, y, width, height, fillColor, fillAlpha);
// scene.add.existing(rect);
export default class LaserClass extends Phaser.GameObjects.Rectangle {
  sprite: string = 'huzounet'
  _frame: string = 'kunai'
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
    this.rect = this.scene.add.rectangle(400, 300, 300, 20, 0x9966ff).setStrokeStyle(2, 0xffff00);
    this.rect.setPosition(proprietaire.x, proprietaire.y)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this);
    // var block = this.physics.add.sprite(700, 300, 'mushroom');
    // blocks.push(block);

    var tween = this.scene.tweens.add({
      targets: this.rect,
      width: 900,
      //displayOriginX: rect.displayOriginX,
      duration: 7000,
      repeat: -1,            // -1: infinity
      yoyo: true
    });

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

  preUpdate(time, delta) {
    // console.log("UPDATE!!!")
    var x = this.rect.x;
    var y = this.rect.y - (this.rect.height /2);

    var within = this.scene.physics.overlapRect(x, y, this.rect.width - 150, this.rect.height);

    within.forEach(function (body) {
      if (body.gameObject.type == "Sprite"){
        console.log("___________ID____________")
        console.log(body.gameObject.ClientID)
        console.log("___________ID 222____________")
        console.log(this.proprietaireID)
      }
      // && this.proprietaireID != body.gameObject.ClientID) body.gameObject.setTint(0xff0000);
    }, this);

  }

  // update(time, delta) {
  //
  // }

}
