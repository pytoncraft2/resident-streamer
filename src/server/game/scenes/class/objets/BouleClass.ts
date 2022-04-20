import { Boule } from "../../../RoomState"

export default class BouleClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    ClientID: string
  ) {
    super(scene, x, y, sprite)

    this.init(scene, ClientID)
  }

  init(scene: Phaser.Scene, id: string) {
    this.scene = scene
    // this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.id = id

    this.setBounce(1, 1);
    this.setCollideWorldBounds(true);
    console.log("NNNNNNNNNNNNNNNNNNNNNNNNOUVEAUUUUU")

    // this.animationCharge = this.scene.tweens.add({
    //   targets: this,
    //   scale: 2,
    //   duration: 3000,
    //   // onComplete: function() {
    //   //   if (arguments[1][0].scene){
    //   //     arguments[1][0].scene.room.state.boules.delete(arguments[1][0].id);
    //   //     arguments[1][0].destroy(true);
    //   //   }
    //   // }
    // });

    this.animationEnvoie = this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 1000,
      onComplete: function() {
        if (arguments[1][0].scene){
          arguments[1][0].scene.room.state.boules.delete(arguments[1][0].id);
          arguments[1][0].destroy(true);
        }
      },
      paused: true
    });


  }
  preUpdate(time, delta) {
    // console.log(this.anims.msPerFrame += 300)
    super.preUpdate(time, delta);


      (this.scene as any).room.state.boules.set(
        this.id,
        new Boule({
          x: this.x,
          y: this.y,
          scale: this.scale,
          alpha: this.alpha,
          id: this.id
        })
      )
  }

  lancer() {
    this.animationEnvoie.play()
  }

  // stopAnim() {
  //   this.animationCharge.stop()
  //   if (!this.animationCharge.isPlaying()) {
  //     this.animationEnvoie.play()
  //   }
  // }
}