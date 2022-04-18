import { Boule } from "../../RoomState"

export default class BouleClass extends Phaser.Physics.Arcade.Sprite {
  id: any
  vel: number = 400
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

    this.setBounce(1, 1);
    this.setCollideWorldBounds(true);
  }
  preUpdate(time, delta) {
    // console.log(this.anims.msPerFrame += 300)
    super.preUpdate(time, delta);


    if (this.alpha == 0)
    {
      (this.scene as any).room.state.boules.delete(this.id);
      this.destroy(true);
    }

    if ((this.scene as any)) {
      (this.scene as any).room.state.boules.set(
        this.id,
        new Boule({
          x: this.x,
          y: this.y,
          scale: this.scale,
          alpha: this.alpha
        })
      )
    } else {
      console.log("NOOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
    }
  }

  test() {
    // console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSUPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPERTEST")
  }
}
