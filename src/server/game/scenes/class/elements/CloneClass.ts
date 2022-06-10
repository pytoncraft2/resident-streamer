import { Player } from "../../../RoomState"
import {kunai__Z, shuriken__A, multiclonage__E} from '././../../Aptitudes/huzounet'
import { AnimationJoueur, setAnimation } from "../../Animations/AnimationJoueur"

export default class CloneClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string  = ''
  actif: boolean = true
  sprite: string = 'huzounet'
  vie: number = 10
  degat: number = 0.2

  zoneInteraction: any

  vitesse: number = 0
  puissance: number = 0

  ClientID: string

  createur: any
  randomVitesse: number

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    ClientID: string,
    createur: any
  ) {
    super(scene, x, y, sprite)

    this.init(scene, ClientID, createur)
  }

  init(scene: Phaser.Scene, id: string, createur) {

    this.scene = scene
    this.createur = createur
    // this.degat = createur.degat/2
    // this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.ClientID = id
    this.setCollideWorldBounds(true);
    new AnimationJoueur(this.anims)

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
    this.setDrag(1900)
    this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    this.zoneInteraction.action = (_e) => {

      // if (this.blesse_opposant) {
      //   this.blesse_opposant = false
      //   if (typeof _e.blesse_ennemie === "function") _e.blesse_ennemie(1)
      // }
      //
      // if (this.interaction_objet) {
      //   if (!_e.vivant && _e.active) {
      //     if (typeof _e.proprietaire_objet === "function") {
      //       _e.proprietaire_objet(this.ClientID)
      //       _e.active = false
      //     }
      //   }
      //   this.interaction_objet = false
      // }
      //
      // if (this.soigne) {
      //   console.log("SOIN")
      //   _e.vie += 0.01
      // }

    };

    this.scene.physics.add.existing(this.zoneInteraction);
    this.zoneInteraction.body.enable = false;
    (this.scene as any).playersAttackZone.add(this.zoneInteraction);

    this.randomVitesse = Phaser.Math.Between(800, 1200)
    this.scene.events.once('repositionnement', this.repositionnement, this);


  }
  preUpdate(time, delta) {
    // console.log(this.anims.msPerFrame += 300)
    super.preUpdate(time, delta);

    this.vie -= 0.04

    let animationName = this.anims.getFrameName();
    this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);


    if ((this.scene as any).room.donnes[this.createur.ClientID].clavier.z) {
      kunai__Z(this as any)
    }

    if ((this.scene as any).room.donnes[this.createur.ClientID].clavier.right) {
        setAnimation(this, 'walk')
        this.setFlipX(false)
        this.setVelocityX(300)
    }

    if ((this.scene as any).room.donnes[this.createur.ClientID].clavier.left) {
      setAnimation(this, 'walk')
      this.setFlipX(true)
      this.setVelocityX(-300)
    }
//     if (Phaser.Math.Distance.Between(this.createur.x, this.createur.y, this.x, this.y) > 600) {
//       // this.x += 10
//       // this.scene.physics.moveTo(this, this.x + 200, this.y);
//       // this.scene.physics.moveToObject(this, this.x + 200, this.y);
//       this.scene.events.emit('repositionnement');
//
//
// console.log((this.scene as any).room.donnes[this.createur.ClientID].clavier);
//       console.log("SUPP")
//     } else {
//       // if (this.body.velocity.x != 0) this.setVelocity(0)
//     }

    (this.scene as any).room.state.presences.set(
      this.ClientID,
      new Player({
        x: this.x,
        y: this.y,
        sprite: this.sprite,
        anim: animationName,
        flipX: this.flipX,
        tint: this.tintBottomLeft,
        vie: this.vie,
        xa: this.zoneInteraction.x,
        ya: this.zoneInteraction.y
      })
    )
  }

  auto() {
    // setAnimation(huzounet, 'huzounet_preparation_attaque')

    // var timer = this.scene.time.addEvent({
    //   delay: Phaser.Math.Between(600, 1000),                // ms
    //   callback: () => {
    //     kunai(this as any)
    //   },
    //   //args: [],
    //   callbackScope: this,
    //   repeat: 4
    // });
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

  repositionnement() {
    this.scene.physics.moveToObject(this, {x: this.x + 200, y: this.y}, this.randomVitesse);
  }

  // stopAnim() {
  //   this.animationCharge.stop()
  //   if (!this.animationCharge.isPlaying()) {
  //     this.animationEnvoie.play()
  //   }
  // }
}
