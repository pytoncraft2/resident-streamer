import { Projectile } from "../../../RoomState"

export class Balle extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400

  sprite: string = 'balle'
  _frame: string = 'balle'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sprite: string,
    ClientID: string,
    flipX: boolean,
    cible: string
  ) {
    super(scene, x, y, sprite)

    this.init(scene, ClientID, flipX, cible)
  }

  init(scene: Phaser.Scene, id: string, flipX: boolean, cible: string) {
    this.scene = scene
    this.setData('degat', 0.2)
    scene.physics.add.existing(this);
    this.id = id;
    //@ts-ignore
    this.body.setAllowGravity(false);

    scene.physics.add.overlap(this, (scene as any)[cible], function(_kunai, _ennemie: any) {
      _ennemie.dommage(_kunai.getData('degat'))
      _kunai.setData('degat', 0)
      //@ts-ignore
    }, undefined, this);

      // (this.scene as any).suppressionProjectileDelai(this, id, 1000, false)

    // this.setCollideWorldBounds(true);


    (this.scene as any).room.state.projectiles.set(
      this.id,
      new Projectile({
        x: this.x,
        y: this.y,
        id: this.id,
        sprite: this.sprite,
        _frame: this._frame
      })
    );
    // (this.scene as any).suppressionProjectileDelai(this, id, 1300, true);
    this.setVelocityX(flipX ? -1900 : 1900);

  }
  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

      (this.scene as any).room.state.projectiles.set(
        this.id,
        new Projectile({
          x: this.x,
          y: this.y,
          id: this.id,
          sprite: this.sprite,
          _frame: this._frame
        })
      )
  }
}
