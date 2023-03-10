import { Player } from "../../../RoomState"
import { kunai__Z, __StatsSupplementaire, shuriken__A } from '././../../Aptitudes/huzounet'
import { AnimationJoueur, setAnimation } from "../../Animations/AnimationJoueur"
import TJoueur from "../../types/Joueur"

export default class CloneClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  proprietaire: string = ''
  sprite: string = 'huzounet'
  vie: number = 10
  degat: number = 0.2

  ClientID: string

  createur: any

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
    //@ts-ignore
    this.scene.physics.add.collider([this.scene.platforme, this.scene.platforme_droite, this.scene.platforme_gauche, this.scene.platforme_haut, this.scene.platforme_haut_gauche, this.scene.platforme_haut_droite], this)

    new AnimationJoueur(this.anims)
    //@ts-ignore
    __StatsSupplementaire(this)

    this.setDrag(1900)

  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    this.vie -= 0.02
    if (this.vie < 0) {
      (this.scene as any).suppressionJoueur(this, true, this.ClientID, 1000)
      this.vie = 10;
    }

    let animationName = this.anims.getFrameName();

    if ((this.scene as any).room.donnes[this.createur.ClientID].clavier) {

      shuriken__A(this as unknown as TJoueur, { a: (this.scene as any).room.donnes[this.createur.ClientID].clavier.a, a_fin: (this.scene as any).room.donnes[this.createur.ClientID].clavier.a_fin })

      if ((this.scene as any).room.donnes[this.createur.ClientID].clavier.z) {
        kunai__Z(this as any, {})
      }

      if ((this.scene as any).room.donnes[this.createur.ClientID].clavier.right) {
        setAnimation(this, 'walk')
        this.setFlipX(false)
        this.setVelocityX(this.createur.vel)
      }

      if ((this.scene as any).room.donnes[this.createur.ClientID].clavier.left) {
        setAnimation(this, 'walk')
        this.setFlipX(true)
        this.setVelocityX(-this.createur.vel)
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
        alpha: this.alpha,
        tint: this.tintBottomLeft,
        vie: this.vie
      })
    )
  }

  auto() {
  }

}
