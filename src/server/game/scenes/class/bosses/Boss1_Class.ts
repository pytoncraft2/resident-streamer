import { Player } from "../../../RoomState"
import { AnimationEnnemie } from "../../Animations/AnimationEnnemie"
import { Aptitudes } from "../../Aptitudes/base"
import { DefautStats, DefautDirection } from "../../Stats/Defaut"




/**
 * Joueur et interaction
 */

export default class Boss1_Class extends Phaser.Physics.Arcade.Sprite {
  EnnemyId: string;
  lastAnim: any;
  attaque: any;
  vie: number = 10;
  blesse: boolean = false
  etats: any
  etatEnCours: string
  zoneInteraction: any
  vivant: boolean = true
  timer_boss_1: Phaser.Time.TimerEvent
  Aptitudes: any

  sprite: string = 'boss_1'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    EnnemyId: string
  ) {
    super(scene, x, y, sprite)

    this.init(scene, EnnemyId)
  }

  init(scene: Phaser.Scene, EnnemyId: string) {

    this.scene = scene
    DefautDirection(Aptitudes, this)
    Aptitudes[this.sprite].stats.call(this, this, Aptitudes)

    this.scene.add.existing(this)
    this.EnnemyId = EnnemyId
    this.lastAnim = null;
    this.sprite = 'boss_1'
    this.attaque = false;
    this.blesse = false;
    this.Aptitudes = Aptitudes
    this.etats = {
      'initial': {
        couleur: 16777215,
        vitesse: 600
      },
      'secondaire':
      {
        couleur: 0x000000,
        vitesse: 1400
      }
    }

    // this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {
    //   // this.attaque = false
    //   // if (anim.key == 'attaque') {
    //   //   if (frame.frame.name == 'attaque1') {
    //   //     // this.attaque = true
    //   //   }
    //   // }
    // })


    // this.timer_boss_1 = scene.time.addEvent({
    //   delay: 1000,                // ms
    //   callback: this.deplacement,
    //   //args: [],
    //   callbackScope: this,
    //   loop: true
    // });

    this.etatEnCours = 'initial'


    //attaque - deplacement
    new AnimationEnnemie(this.anims)
     this.scene.events.once('changementEtat', this.changementEtat, this);
     this.scene.events.once('mourir', this.mourir, this);

     this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
     this.zoneInteraction.action = (personnage) => {
       // personnage.s

       if (this.attaque) {
         personnage.vie -= 1;
         this.attaque = false;
       }
       // console.log("ZONE ACTION ENNNEMIE ----------------------------")
     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     (this.scene as any).playersAttackZone.add(this.zoneInteraction);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);

    let animationName = this.anims.getFrameName()


    // if (this.body.touching.right) {
    //   Aptitudes[this.sprite].toucheA(this)
    //   // this.attaquePuisDeplacement(this.flipX == true && this.blesse, 0xff0000, false)
    // } else if (this.body.touching.left) {
    //   Aptitudes[this.sprite].toucheA(this)
    //   // this.attaquePuisDeplacement(this.flipX == false && this.blesse, 0xff0000, true)
    // }

    // if (this.body.touching.right) {
    //   // this.attaquePuisDeplacement(this.flipX == true && this.blesse, 0xff0000, false)
    //   this.setTint(0xff0000)
    // } else if (this.body.touching.left) {
    //   this.setTint(0x000000)
    //   // this.attaquePuisDeplacement(this.flipX == false && this.blesse, 0xff0000, true)
    // }


    if (this.vie < 5) this.scene.events.emit('changementEtat');
    if (this.vie <= 0) this.scene.events.emit('mourir');

    if (this.scene) {
      (this.scene as any).room.state.presences.set(
        this.EnnemyId,
        new Player({
          x: this.x,
          y: this.y,
          sprite: 'boss_1',
          anim: animationName,
          flipX: this.flipX,
          tint: this.tintBottomLeft,
          vie: this.vie,
          zoneAttaque: {x: 100, y: 200},
          scale: this.scale
        })
      )
    }
  }

  changementEtat() {
    this.etatEnCours = 'secondaire'
    this.setTint(this.etats[this.etatEnCours]['couleur'])
  }

  blesse_ennemie(puissance: number) {
    //   this.play('attaque')
//   this.setFlipX(directionFinal)
this.setTint(0xff0000)
    this.scene.time.delayedCall(100, () => {
      this.setTint(this.etats[this.etatEnCours]['couleur'])
    }, null, this);
    if (puissance >= 0) {
      this.vie -= puissance
    }
  }

  deplacement(input) {

    console.log("DEPLACEMENT--")
      Aptitudes[this.sprite].toucheZ(this, input)
      Aptitudes[this.sprite].toucheA(this, input)
  }

  // attaquePuisDeplacement(condition, couleur, directionFinal) {
  //   if (condition) {
  //     // this.setTint(couleur)
  // //     // this.blesse = true
  //   }
  // //   // this.scene.tweens.addCounter({
  // //   //   from: 0,
  // //   //   to: 1,
  // //   //   duration: 200,
  // //   //   onComplete: () => (this.setTint(this.etats[this.etatEnCours]['couleur']), this.blesse = false),
  // //   //   repeat: 0,            // -1: infinity
  // //   //   yoyo: false,
  // //   // })
  // //   this.play('attaque')
  // //   this.setFlipX(directionFinal)
  // }


  mourir() {
    console.log("MMMMMMMMMMMMMMMOURRRRI")
    this.etatEnCours = 'initial'
    this.clearTint()
    // this.setTint(this.etats['initial']['couleur'])
    // this.timer_boss_1.remove();
    this.setVelocity(0);
    (this.body as any).setAllowGravity(false)
    this.scene.physics.world.removeCollider((this.scene as any).colisionJoueurEnnemie);
    this.scene.physics.world.removeCollider((this.scene as any).colisionShurikenEnnemie);
    this.setPosition(this.x, 779.2995484974318);
    this.setScale(0.1);
    // (this.scene as any).room.state.presences.set(
    //   this.EnnemyId,
    //   new Player({ x: this.x, y: this.y, sprite: 'boss_1', anim: '', flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie, zoneAttaque: {x: 100, y: 200}, scale: this.scale})
    // )
  }

}
