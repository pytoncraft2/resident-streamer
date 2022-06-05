import TJoueur from "../types/Joueur";
import LaserClass from "../class/elements/LaserClass";

export function StatsSupplementaire(twitchman: TJoueur, Aptitudes: any) {
  Aptitudes[twitchman.sprite].toucheEspace = function (_twitchman: TJoueur) {
    _twitchman.body.setVelocityY(-500)
    _twitchman.play('twitchman_vole', true)
    _twitchman.survole = true
    _twitchman.scene.time.delayedCall(410, () => {
      _twitchman.survole = false
    })
  }
}


export function punch(twitchman: TJoueur, input) {
  if (input.a)
  {
  twitchman.play('twitchman_punch')
  }
}

export function charge(twitchman, input) {
  if (input.z)
  {
    twitchman.play('twitchman_charge')
    twitchman.body.setVelocityX(twitchman.flipX ? -5000 : 5000)
    input.z = false
  }

  if (input.z_fin)
  {
    twitchman.setVelocity(0)
    twitchman.play('twitchman_vole', true)
  }
}

export function laser(twitchman, input) {
  console.log("LAZER")

  input.e = false

  var laser = new LaserClass(twitchman.scene, twitchman.x + 80, twitchman.y - 185, 128, 128, 4332301, 1, `${(Math.random() + 1).toString(36).substring(7)}`, twitchman)
  // lazer.scaleX = 8.29461186764485;
  // lazer.scaleY = 0.12225173083106433;

  // var rect = new Phaser.GameObjects.Rectangle(twitchman.scene, twitchman.x, twitchman.y, 1000, 400, 4332301, 1);
  // twitchman.scene.add.existing(rect);
  // twitchman.scene.physics.add.existing(rect);
  // twitchman.scene.groupeBoulesHuzounet.add(rect)

}
