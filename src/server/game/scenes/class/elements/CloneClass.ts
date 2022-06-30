import { Player } from "../../../RoomState"
import { kunai__Z } from '././../../Aptitudes/huzounet'
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

  init(scene: Phaser.Scene, id: string, createur: Phaser.Physics.Arcade.Sprite) {

    this.scene = scene
    this.createur = createur
    // this.degat = createur.degat/2
    // this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.ClientID = id
    this.setCollideWorldBounds(true);
    new AnimationJoueur(this.anims)

    this.setDrag(1900)
    this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    this.zoneInteraction.action = (_e: Phaser.Physics.Arcade.Sprite) => {
    };

    this.scene.physics.add.existing(this.zoneInteraction);
    this.zoneInteraction.body.enable = false;
    (this.scene as any).playersAttackZone.add(this.zoneInteraction);

    this.randomVitesse = Phaser.Math.Between(800, 1200)
    this.scene.events.once('repositionnement', this.repositionnement, this);


  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    this.vie -= 0.04

    let animationName = this.anims.getFrameName();
    this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);

if ((this.scene as any).room.donnes[this.createur.ClientID].clavier) {

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
  }

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
  }

  repositionnement() {
    this.scene.physics.moveToObject(this, {x: this.x + 200, y: this.y}, this.randomVitesse);
  }
}
