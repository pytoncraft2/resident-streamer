import { Bombe } from "../../../RoomState"
import { AnimationBombe } from "../../Animations/AnimationJoueur"

export default class BombeClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
  animationCharge: Phaser.Tweens.Tween
  animationEnvoie: Phaser.Tweens.Tween
  proprietaire: string  = ''
  actif: boolean = true
  zoneInteraction: any
  explosion: boolean

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

    this.setCollideWorldBounds(true);

    new AnimationBombe(this.anims)

    this.zoneInteraction = {}
    this.zoneInteraction = this.scene.add.ellipse(985, 812, 128, 128);
    this.zoneInteraction.scaleX = 3.805782212727244;
    this.zoneInteraction.scaleY = 3.805782212727244;
    this.zoneInteraction.setData('degat', 3);


    //ACTIVER GRACE À LA FONCTION OVERLAP DE PHASER #hall.ts
    this.scene.physics.add.existing(this.zoneInteraction);
    this.zoneInteraction.body.enable = false;
    // (this.scene as any).playersAttackZone.add(this.zoneInteraction);

    //@ts-ignore
    this.fin = false
    this.explosion = false

    this.scene.physics.add.overlap(this.zoneInteraction, (this.scene as any).enemies, function(_zone_bombe: any, _ennemie: any) {
      const d = Phaser.Math.Distance.BetweenPoints({x: _ennemie.x, y: _ennemie.y}, {x: _zone_bombe.x, y: _zone_bombe.y}); // a, b: {x, y}
      _ennemie.blesse_ennemie(_zone_bombe.getData('degat') - d / 100)
      _zone_bombe.setData('degat', 0)
    }, undefined, this);


  }
  preUpdate(time: number, delta: number) {
    // console.log(this.anims.msPerFrame += 300)
    super.preUpdate(time, delta);

    //@ts-ignore
    if (this.anims.getFrameName() == "bombe4" && !this.fin) {
      console.log("KABOUM -------------------------")
      this.explosion = true
      this.zoneInteraction.body.enable = true;
      this.zoneInteraction.setPosition(this.x, this.y)
    //@ts-ignore
      this.fin = true
    }


      (this.scene as any).room.state.bombes.set(
        this.id,
        new Bombe({
          x: this.x,
          y: this.y,
          alpha: this.alpha,
          id: this.id,
          active: this.active,
          anim: this.anims.getFrameName(),
          explosion: this.explosion
        })
      )

      this.explosion = false

  }
}
