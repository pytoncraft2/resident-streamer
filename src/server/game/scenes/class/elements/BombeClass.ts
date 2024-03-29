import { Projectile } from "../../../RoomState"
import { AnimationBombe } from "../../Animations/AnimationJoueur"

export default class BombeClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  proprietaire: string = ''
  zoneInteraction: any

  sprite: string = 'akhizonah'
  _frame: string = 'bombe0'

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

    this.init(scene, ClientID)
  }

  init(scene: Phaser.Scene, id: string) {
    this.scene = scene
    // this.scene.add.existing(this)
    scene.physics.add.existing(this);
    this.id = id
    this.setScale(1, 3)

    // this.setCollideWorldBounds(true);

    new AnimationBombe(this.anims)

    this.zoneInteraction = {}
    this.zoneInteraction = this.scene.add.ellipse(985, 812, 128, 128);
    this.zoneInteraction.scaleX = 3.805782212727244;
    this.zoneInteraction.scaleY = 3.805782212727244;
    this.zoneInteraction.setData('degat', 3);


    this.scene.physics.add.existing(this.zoneInteraction);

    //@ts-ignore
    this.scene.physics.add.collider([this.scene.platforme, this.scene.platforme_droite, this.scene.platforme_gauche, this.scene.platforme_haut, this.scene.platforme_haut_gauche, this.scene.platforme_haut_droite], [this],
      function (_boule: Phaser.Physics.Arcade.Sprite, _j2: any) {
        (_j2.body as any).setAllowGravity(false);
      }, null, this);


    this.zoneInteraction.body.enable = false;

    //@ts-ignore
    this.fin = false;
    (this.scene as any).room.state.projectiles.set(
      this.id,
      new Projectile({
        x: this.x,
        y: this.y,
        id: this.id,
        anim: this.anims.getFrameName(),
        sprite: this.sprite,
        _frame: this._frame
      })
    )

    this.scene.physics.add.overlap(this.zoneInteraction, (this.scene as any).enemies, function (_zone_bombe: any, _ennemie: any) {
      const d = Phaser.Math.Distance.BetweenPoints({ x: _ennemie.x, y: _ennemie.y }, { x: _zone_bombe.x, y: _zone_bombe.y }); // a, b: {x, y}
      _ennemie.dommage(_zone_bombe.getData('degat') - d / 100)
      _zone_bombe.setData('degat', 0)
    }, undefined, this);

    (this.scene as any).suppressionProjectileDelai(this, id, 2000, true)

  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    //@ts-ignore
    if (this.anims.getFrameName() == "bombe4" && !this.fin) {
      this.zoneInteraction.body.enable = true;
      this.zoneInteraction.setPosition(this.x, this.y)
      //@ts-ignore
      this.fin = true
    }

    (this.scene as any).room.state.projectiles.set(
      this.id,
      new Projectile({
        x: this.x,
        y: this.y,
        alpha: this.alpha,
        id: this.id,
        anim: this.anims.getFrameName(),
        sprite: this.sprite,
        _frame: this._frame
      })
    )

  }
}
