import { Player } from "../../../RoomState"
import { AnimationEnnemie } from "../../Animations/AnimationEnnemie"
import { Aptitudes } from "../../Aptitudes/base"



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
  proprietaire_objet: (id: string, id_ennemie: string) => void
  timer_boss_1: Phaser.Time.TimerEvent

  sprite: string

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
    this.sprite = 'boss_1'
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

    this.timer_boss_1 = scene.time.addEvent({
      delay: 1000,                // ms
      callback: this.deplacement,
      //args: [],
      callbackScope: this,
      loop: true
    });

    this.etatEnCours = 'initial'

    //attaque - deplacement
    new AnimationEnnemie(this.anims)
     this.scene.events.once('changementEtat', this.changementEtat, this);
     this.scene.events.once('mourir', this.mourir, this);

     this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
     this.zoneInteraction.action = (vie_ennemie) => {
     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     (this.scene as any).playersAttackZone.add(this.zoneInteraction);

     this.proprietaire_objet = (id_joueur, id_ennemie) => {
       this.scene.events.emit('boss_KO-proprietaire', {id_joueur: id_joueur, id_ennemie: this.EnnemyId});
     }
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);

    let animationName = this.anims.getFrameName()


    if (this.body.touching.right || this.body.touching.left) {
      Aptitudes[this.sprite].toucheA(this)
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

  changementEtat() {
    this.etatEnCours = 'secondaire'
    this.setTint(this.etats[this.etatEnCours]['couleur'])
  }

  blesse_ennemie(puissance: number) {
    console.log("ENNEMIE BLESSÉ")
    if (puissance >= 0) {
      this.vie -= puissance
    }
  }

  deplacement() {
      Aptitudes[this.sprite].toucheZ(this)
  }


  mourir() {
    this.vivant = false
    this.setTint(this.etats['initial']['couleur'])
    this.timer_boss_1.remove();
    this.setVelocity(0)
    this.scene.physics.world.removeCollider((this.scene as any).colisionJoueurEnnemie);
    this.scene.physics.world.removeCollider((this.scene as any).colisionShurikenEnnemie);
    this.setPosition(this.x, 779.2995484974318)
    this.scene.events.emit('boss_KO', "ENNEMY_01");
  }

}
