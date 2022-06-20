import { Rectangle } from "../../../RoomState"
import TJoueur from "../../types/Joueur";

// export default class LaserClass extends Phaser.Physics.Arcade.Sprite {
//   id: any
//   vel: number = 400
//   animationCharge: Phaser.Tweens.Tween
//   animationEnvoie: Phaser.Tweens.Tween
//   proprietaire: TJoueur
//   actif: boolean = true
//
//   sprite: string = 'laser'
//   _frame: string = 'laser'
//
//   vitesse: number = 0
//   puissance: number = 0
//
//   constructor(
//     scene: Phaser.Scene,
//     x: number,
//     y: number,
//     sprite: string,
//     ClientID: string,
//     proprietaire: any
//   ) {
//     super(scene, x, y, sprite)
//
//     this.init(scene, ClientID, proprietaire)
//   }
//
//   init(scene: Phaser.Scene, id: string, proprietaire: TJoueur) {
//     this.scene = scene
//     this.proprietaire = proprietaire
//     this.scene.add.existing(this)
//     scene.physics.add.existing(this);
//     this.id = id
//
//     // this.setBounce(1, 1);
//     this.setCollideWorldBounds(true);
//
//   }
//   preUpdate(time, delta) {
//     // console.log(this.anims.msPerFrame += 300)
//     super.preUpdate(time, delta);
//
//     this.getLeftCenter().x = this.proprietaire.x;
//       (this.scene as any).room.state.projectiles.set(
//         this.id,
//         new Projectile({
//           x: this.x,
//           y: this.y,
//           id: this.id,
//           active: this.active,
//           flipX: this.flipX,
//           sprite: this.sprite,
//           scaleX: this.scaleX,
//           scaleY: this.scaleY,
//           _frame: this._frame
//         })
//       )
//   }
//
//   envoie() {
//
//     this.scene.tweens.add({
//       targets: this,
//       scaleX: "+=2",
//       ease: 'Sine.inOut',
//       yoyo: true,
//       duration: 1000,
//       repeat: 10
//     });
//
//   }
//
// }


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

  init(scene: Phaser.Scene, id: string, proprietaire) {
    this.scene = scene
    console.log("PROPRIETAIRE ID:")
    this.proprietaireID = proprietaire.ClientID
    this.proprietaire = proprietaire
    this.agrandissement = false;
    // this.rect = this.scene.add.rectangle(400, 300, 300, 20, 0x9966ff).setStrokeStyle(2, 0xffff00);
    // this.rect.setPosition(proprietaire.x, proprietaire.y)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this);
    // var block = this.physics.add.sprite(700, 300, 'mushroom');
    // blocks.push(block);
    this.setDepth(2)



    // this.scene.add.existing(this)
    // scene.physics.add.existing(this);
    this.id = id;
    // console.log("CCCCCCCCCCCCCCCCCREATION laser")

    // this.setBounce(1, 1);
    // this.timeline = this.scene.tweens.createTimeline();
    //
    // this.timeline.add({
    //   targets: this,
    //   // x: this.proprietaire.flipX ? this.x -1000 : this.x + 1000,
    //   width: 1200,
    //   ease: 'Power2',
    //   duration: 500,
    //   onComplete: function(tw, tg: any) {
    //     // tg[0].setData('degat', 1)
    //   }
    // });
    //
    // this.timeline.add({
    //   targets: this,
    //   width: 10,
    //   // width: 0,
    //   // props: {
    //   //   x: { value: function () { return manette.x; }, ease: 'Power1' },
    //   //   y: { value: function () { return manette.y; }, ease: 'Power3' }
    //   // },
    //   ease: 'Power2',
    //   duration: 800
    // });

    // this.timeline.add({
    //   targets: this,
    //   width: 10,
    //   // width: 0,
    //   // props: {
    //   //   x: { value: function () { return manette.x; }, ease: 'Power1' },
    //   //   y: { value: function () { return manette.y; }, ease: 'Power3' }
    //   // },
    //   ease: 'Power2',
    //   duration: 800
    // });




  }

  preUpdate(time, delta) {
    // console.log("UPDATE!!!")
    // this.setScale(0.1)

    if (this.agrandissement) this.proprietaire.flipX ? (this.width -= 70) : (this.width += 70)

    this.x = this.proprietaire.x + 80;
    this.y = this.proprietaire.y - 185;

    var x = this.x;
    var y = this.y - (this.height /2);

    var within = this.scene.physics.overlapRect(x, y, this.proprietaire.flipX ? (this.width - 150) : (this.width + 150) , this.height);
    //
    within.forEach(function (body) {
      if (body.gameObject.type == "Sprite") {
        if (body.gameObject.ClientID != this.proprietaireID) {
          this.agrandissement = false;
          body.gameObject.dommage(0.08);
        }
      }
    }, this);

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
      })
    )

  }

  charge() {
    this.agrandissement = true;

    this.scene.time.delayedCall(500, () => {
      this.agrandissement = false;
      this.setSize(1, this.height);
    }, null, this);

    // this.timeline.play()
    // this.tweenLaser = this.scene.tweens.add({
      // targets: this,
      //displayOriginX: rect.displayOriginX,
      // duration: 300,
      // width: 1200
    // });
  }

  envoie() {
    this.tweenLaser = this.scene.tweens.add({
      targets: this,
      //displayOriginX: rect.displayOriginX,
      duration: 300,
      width: 0
    });
  }

  // update(time, delta) {
  //   this.setAlpha(0.5)
  // //
  // }

}
