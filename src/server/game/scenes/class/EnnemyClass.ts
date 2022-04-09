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
  private blesse: boolean = false
  private etats: any
  private etatEnCours: string
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

    this.etatEnCours = 'initial'

    //attaque - deplacement
    new AnimationEnnemie(this.anims)
     this.scene.events.once('changementEtat', this.changementEtat, this);
     this.scene.events.once('mourir', this.mourir, this);
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    let animationName = this.anims.getFrameName()
    if (this.body.touching.right) {
      this.attaquePuisDeplacement(this.flipX == true && this.blesse, 0xff0000, false)
    } else if (this.body.touching.left) {
      this.attaquePuisDeplacement(this.flipX == false && this.blesse, 0xff0000, true)
    }

    if (this.vie < 5) this.scene.events.emit('changementEtat');
    if (this.vie <= 0) this.scene.events.emit('mourir');

    if (this.scene) {
      (this.scene as any).room.state.presences.set(
        this.EnnemyId,
        new Player({ x: this.x, y: this.y, sprite: 'boss_1', anim: animationName, flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie, zoneAttaque: {x: 100, y: 200}})
      )
    }
  }


  attaquePuisDeplacement(condition, couleur, directionFinal) {
    if (condition) {
      this.setTint(couleur)
      this.vie -= 1
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
      this.scene.physics.moveToObject(this, this.scene.physics.closest(this, [...(this.scene as any).players.getChildren()]), this.etats[this.etatEnCours]['vitesse']);
      this.anims.play('deplacement');
    });
    this.setFlipX(directionFinal)
  }

  changementEtat() {
    this.etatEnCours = 'secondaire'
    this.setTint(this.etats[this.etatEnCours]['couleur'])
  }


  mourir() {
    this.body.stop()
    this.body.enable = false
    this.animationMourir(() => {
      this.scene.events.emit('boss_KO', "ENNEMY_01");
    })
  }

  animationMourir(callback: CallableFunction) {
    this.scene.tweens.timeline({
      tweens: [{
        targets: this,
        y: "-=300",
        ease: 'Power1',
        duration: 600
      },
      {
        targets: this,
        y: "+=1400",
        ease: 'Power1',
        duration: 900,
      }],
      onComplete: () => (callback())
    });
  }

}
