import { Projectile } from "../../../RoomState"


export default class BouleClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string  = ''
  traqueJoueur: Phaser.Physics.Arcade.Sprite
  actif: boolean = true

  sprite: string = 'huzounet'
  _frame: string = 'shuriken0'

  vitesse: number = 0
  puissance: number = 0

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    ClientID: string
  ) {
    super(scene, x, y, sprite)

    this.init(scene, ClientID, sprite)
  }

  init(scene: Phaser.Scene, id: string, sprite) {
    this.scene = scene
    // this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.id = id
    this.scale = 0.2
    this.alpha = 0.3
    this.sprite = sprite


    this.setBounce(1, 1);
    this.setCollideWorldBounds(true);
    // console.log("NNNNNNNNNNNNNNNNNNNNNNNNOUVEAUUUUU")

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

    if (this.traqueJoueur) {
      this.x = this.traqueJoueur.x
      this.y = this.traqueJoueur.y
    }


      (this.scene as any).room.state.projectiles.set(
        this.id,
        new Projectile({
          x: this.x,
          y: this.y,
          scale: this.scale,
          alpha: this.alpha,
          id: this.id,
          sprite: this.sprite,
          _frame: this._frame
        })
      )
  }

  traquer(joueur: Phaser.Physics.Arcade.Sprite, desactivation: boolean = false) {
    if (desactivation) this.traqueJoueur = null
    else this.traqueJoueur = joueur
  }

  setVitesse(vitesse: number) {
    console.log("VITESSE SET:", vitesse);
    this.setVelocityX(vitesse);
  }

  lancer(id) {
    // this.proprietaire.push(id)
    // this.animationEnvoie.play()
  }

  suppression(id) {
    // this.proprietaire.shift()
  }

  setDestructionIminente(destruction) {
    var tween = this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 1000,
      repeat: 0,            // -1: infinity
      yoyo: false,
      onComplete: () => {
        // this.setActive(false);
        destruction(this)
        // this.destroy(true);
        // this.scene.room.state.boules.delete(arguments[1][0].id);
        // this.destructionColyseus();
      }
    });
  }

  destructionInstantane(destruction) {
    var tween = this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 1000,
      repeat: 0,            // -1: infinity
      yoyo: false,
      onComplete: () => {
        // this.setActive(false);
        destruction(this)
        // this.destroy(true);
        // this.scene.room.state.boules.delete(arguments[1][0].id);
        // this.destructionColyseus();
      }
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
