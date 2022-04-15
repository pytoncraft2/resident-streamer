import { Player } from "../../RoomState"
import { AnimationEnnemie } from "../Animations/AnimationEnnemie"


/**
 * Joueur et interaction
 */

export default class EnnemyClass extends Phaser.Physics.Arcade.Sprite {
  private EnnemyId: string;
  private lastAnim: any;
  private attaque: any;
  private vie: number = 10;
  public blesse: boolean = false
  private etats: any
  private etatEnCours: string
  private zoneInteraction: any
  blesse_ennemie: VoidFunction

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
    this.scene.add.existing(this)
    this.EnnemyId = EnnemyId
    this.lastAnim = null;
    this.attaque = false;
    this.blesse = false;
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

    // this.displayWidth += 40

    this.etatEnCours = 'initial'

    //attaque - deplacement
    new AnimationEnnemie(this.anims)
     this.scene.events.once('changementEtat', this.changementEtat, this);
     this.scene.events.once('mourir', this.mourir, this);

     this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
     this.zoneInteraction.action = (vie_ennemie) => {
       // console.log("ACTION VIE ENNEMIE")
       // console.log(vie_ennemie)
     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     (this.scene as any).playersAttackZone.add(this.zoneInteraction);
     this.blesse_ennemie = () => {
       this.vie -= 1
       // this.setTint(0xff0000)
       // this.animationRecevoirDegats()


       if (this.body.touching.right) {
         console.log("TOUCHE DROITE !!!!!!!!!!!!!!!!!")
       } else if (this.body.touching.left) {
         console.log("TOUCHE GAUCHE !!!!!!!!!!!!!!!!!")
       }
     }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);

    let animationName = this.anims.getFrameName()


    if (this.vie < 5) this.scene.events.emit('changementEtat');
    if (this.vie <= 0) this.scene.events.emit('mourir');
    console.log("xxxxx")
    console.log(this.body.y)
    console.log(this.body.x)

    if (this.scene) {
      (this.scene as any).room.state.presences.set(
        this.EnnemyId,
        new Player({ x: this.x, y: this.y, sprite: 'boss_1', anim: animationName, flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie, zoneAttaque: {x: 100, y: 200}})
      )
    }
  }


  attaquePuisDeplacement(condition, couleur, directionFinal) {
    if (condition) {
      // this.setTint(couleur)
      // this.blesse = true
    }
    this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 200,
      onComplete: () => (this.setTint(this.etats[this.etatEnCours]['couleur']), this.blesse = false),
      repeat: 0,            // -1: infinity
      yoyo: false,
    })
    this.play('attaque')
    this.on('animationcomplete', () => {
      // this.scene.physics.moveToObject(this, this.scene.physics.closest(this, [...(this.scene as any).players.getChildren()]), this.etats[this.etatEnCours]['vitesse']);
      this.anims.play('deplacement');
    });
    this.setFlipX(directionFinal)
  }

  changementEtat() {
    this.etatEnCours = 'secondaire'
    // this.setTint(this.etats[this.etatEnCours]['couleur'])
  }


  mourir() {
    this.body.stop()
    this.body.enable = false
    this.setScale(0.15956409567640198, 0.15956409567640198)
    // this.setPosition(this.x, 779.2995484974318)
    this.setPosition(this.x, 879)

    this.scene.events.emit('boss_KO', "ENNEMY_01");

    // this.setTint(this.etats.initial.couleur)
    // this.setPosition(this.body.x, 717)
    // this.animationMourir(() => {
    // })
  }

  animationMourir(callback: CallableFunction) {
    this.scene.tweens.timeline({
      tweens: [{
        targets: this,
        setVelocityX: 300,
        ease: 'Power1',
        duration: 600
      },
      {
        targets: this,
        setVelocityX: 1400,
        ease: 'Power1',
        duration: 900,
      }],
      onComplete: () => (callback())
    });
  }

  animationRecevoirDegats() {
    this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 100,
      // onComplete: () => this.setTint(this.etats[this.etatEnCours]['couleur']),
      repeat: 0,
      yoyo: false,
    })
  }

}
