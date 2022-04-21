import { Boule } from "../../../RoomState"

export default class BouleClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string[] = []
  actif: boolean = true

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

    // this.animationEnvoie = this.scene.tweens.add({
    //   targets: this,
    //   alpha: 1,
    //   scale: 1,
    //   duration: 1000,
    //   onComplete: function() {
    //     // if (arguments[1][0].scene){
    //
    //     // }
    //     console.log("FINI")
    //     arguments[1][0].actif = false
    //     console.log(arguments[1][0].proprietaire)
    //     arguments[1][0].suppression(arguments[1][0].proprietaire)
    //     console.log(arguments[1][0].proprietaire)
    //     arguments[1][0].scene.room.state.boules.delete(arguments[1][0].id);
    //     arguments[1][0].destroy(true);
    //     console.log("_________________________")
    //   }
    // });


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
          id: this.id,
          actif: this.actif
        })
      )
  }

  lancer(id) {
    this.proprietaire.push(id)
    // this.animationEnvoie.play()
  }

  suppression(id) {
    this.proprietaire.shift()
  }

  setDestructionIminente() {
    var tween = this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 2000,
      repeat: 0,            // -1: infinity
      yoyo: false,
      onComplete: () => { this.setActive(false); this.destructionColyseus(); }
    });
  }

  destructionColyseus() {
    // var tween = this.scene.tweens.addCounter({
    //   from: 0,
    //   to: 1,
    //   duration: 1000,
    //   onComplete: function() {
    //     arguments[1][0].scene.room.state.boules.delete(arguments[1][0].id);
    //   }
    // });
  }

  // stopAnim() {
  //   this.animationCharge.stop()
  //   if (!this.animationCharge.isPlaying()) {
  //     this.animationEnvoie.play()
  //   }
  // }
}
