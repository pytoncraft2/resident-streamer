import { Player } from "../../../RoomState"
import { AnimationEnnemie } from "../../Animations/AnimationEnnemie"
import { AnimationJoueur } from "../../Animations/AnimationJoueur"
import { Aptitudes } from "../../Aptitudes/base"
import { DefautStats, DefautDirection } from "../../Stats/Defaut"




/**
 * Joueur et interaction
 */

export default class BossClass extends Phaser.Physics.Arcade.Sprite {
  id: string;
  lastAnim: any;
  attaque: any;
  vie: number = 10;
  blesse: boolean = false
  etats: any
  etatEnCours: string
  particules: boolean = false
  blesse_opposant: boolean = false
  zoneInteraction: any
  vivant: boolean = true
  timer_boss_1: Phaser.Time.TimerEvent
  Aptitudes: any

  sprite: string

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    id: string
  ) {
    super(scene, x, y, sprite)

    this.init(scene, id)
  }

  init(scene: Phaser.Scene, id: string) {

    this.scene = scene
    this.sprite = id
    new AnimationJoueur(this.anims)
    DefautDirection(Aptitudes, this)
    Aptitudes[id].StatsSupplementaire.call(this, this, Aptitudes)
    this.scene.add.existing(this)
    this.id = id
    this.lastAnim = null;
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

    this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {
      this.blesse_opposant = false
      if (anim.key == 'twitchman_punch') {
        if (frame.frame.name == 'twitchmanpunch1') {
          this.blesse_opposant = true
        }
      }
    })


    // this.timer_boss_1 = scene.time.addEvent({
    //   delay: 1000,                // ms
    //   callback: this.deplacement,
    //   //args: [],
    //   callbackScope: this,
    //   loop: true
    // });

    this.etatEnCours = 'initial'

    var timer = this.scene.time.addEvent({
      delay: 1000,                // ms
      callback: () => Aptitudes[id].A(this, {a: 4}),
      //args: [],
      callbackScope: this,
      loop: true
    });

    // this.scene.time.delayedCall(1000, () => {
      // Aptitudes[id].A(this, {a: true})
    // }, null, this);


    //attaque - deplacement
    new AnimationEnnemie(this.anims)
     this.scene.events.once('changementEtat', this.changementEtat, this);
     this.scene.events.once('mourir', this.mourir, this);

     this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
     this.zoneInteraction.action = (personnage) => {
       // personnage.s

       if (this.blesse_opposant) {

         // if (this != personnage) {
           this.blesse_opposant = false
           // console.log("BLESSE L'AUTRE")
           // if (personnage.sprite != this.sprite) {
             // console.log(personnage.sprite)
           // }
           if (typeof personnage.dommage === "function") personnage.dommage(1)
           // if (typeof personnage.dommage === "function") console.log("BLESSE JOUEUR XXXXXXXXXX")
         // }
       }

       if (this.attaque) {
         personnage.vie -= 1;
         this.attaque = false;
       }
       // console.log("ZONE ACTION ENNNEMIE ----------------------------")
     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     (this.scene as any).ennemieAttackZone.add(this.zoneInteraction);
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
        this.id,
        new Player({
          x: this.x,
          y: this.y,
          sprite: this.sprite,
          anim: animationName,
          flipX: this.flipX,
          tint: this.tintBottomLeft,
          vie: this.vie,
          particules: this.particules,
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

  dommage(puissance: number) {
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
    this.setScale(0.2);
    // (this.scene as any).room.state.presences.set(
    //   this.id,
    //   new Player({ x: this.x, y: this.y, sprite: 'boss_1', anim: '', flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie, zoneAttaque: {x: 100, y: 200}, scale: this.scale})
    // )
  }

}

// export default class EnnemyClass extends Phaser.Physics.Arcade.Sprite {
//   private EnnemyId: string;
//   private lastAnim: any;
//   private attaque: any;
//   private vie: number = 10;
//   private blesse: boolean = false
//   private etats: any
//   private etatEnCours: string
//   constructor(
//     scene: Phaser.Scene,
//     x: number,
//     y: number,
//     sprite: string,
//     EnnemyId: string
//   ) {
//     super(scene, x, y, sprite)
//
//     this.init(scene, EnnemyId)
//   }
//
//   init(scene: Phaser.Scene, EnnemyId: string) {
//
//     this.scene = scene
//     this.scene.add.existing(this)
//     this.EnnemyId = EnnemyId
//     this.lastAnim = null;
//     this.attaque = false;
//     this.blesse = false;
//     this.etats = {
//       'initial': {
//         couleur: 16777215,
//         vitesse: 600
//       },
//       'secondaire':
//       {
//         couleur: 0x000000,
//         vitesse: 1400
//       }
//     }
//
//     this.etatEnCours = 'initial'
//
//     //attaque - deplacement
//     new AnimationEnnemie(this.anims)
//      this.scene.events.once('changementEtat', this.changementEtat, this);
//      this.scene.events.once('mourir', this.mourir, this);
//   }
//
//   preUpdate(time: number, delta: number) {
//     super.preUpdate(time, delta);
//     let animationName = this.anims.getFrameName()
//     if (this.body.touching.right) {
//       this.attaquePuisDeplacement(this.flipX == true && this.blesse, 0xff0000, false)
//     } else if (this.body.touching.left) {
//       this.attaquePuisDeplacement(this.flipX == false && this.blesse, 0xff0000, true)
//     }
//
//     if (this.vie < 5) this.scene.events.emit('changementEtat');
//     if (this.vie <= 0) this.scene.events.emit('mourir');
//
//     if (this.scene) {
//       (this.scene as any).room.state.presences.set(
//         this.EnnemyId,
//         new Player({ x: this.x, y: this.y, sprite: 'boss_1', anim: animationName, flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie})
//       )
//     }
//   }
//
//
//   attaquePuisDeplacement(condition, couleur, directionFinal) {
//     if (condition) {
//       this.setTint(couleur)
//       this.vie -= 1
//     }
//     this.scene.tweens.addCounter({
//       from: 0,
//       to: 1,
//       duration: 200,
//       onComplete: () => (this.setTint(this.etats[this.etatEnCours]['couleur']), this.blesse = false),
//       repeat: 0,            // -1: infinity
//       yoyo: false,
//     })
//     this.play('attaque')
//     this.on('animationcomplete', () => {
//       this.scene.physics.moveToObject(this, this.scene.physics.closest(this, [...(this.scene as any).players.getChildren()]), this.etats[this.etatEnCours]['vitesse']);
//       this.anims.play('deplacement');
//     });
//     this.setFlipX(directionFinal)
//   }
//
//   changementEtat() {
//     this.etatEnCours = 'secondaire'
//     this.setTint(this.etats[this.etatEnCours]['couleur'])
//   }
//
//
//   mourir() {
//     this.body.stop()
//     this.body.enable = false
//     this.animationMourir(() => {
//       this.scene.events.emit('boss_KO', "ENNEMY_01");
//     })
//   }
//
//   animationMourir(callback: CallableFunction) {
//     this.scene.tweens.timeline({
//       tweens: [{
//         targets: this,
//         y: "-=300",
//         ease: 'Power1',
//         duration: 600
//       },
//       {
//         targets: this,
//         y: "+=1400",
//         ease: 'Power1',
//         duration: 900,
//       }],
//       onComplete: () => (callback())
//     });
//   }
//
// }
