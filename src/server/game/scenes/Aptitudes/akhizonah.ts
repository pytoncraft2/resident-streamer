import TJoueur from "../types/Joueur";
import BombeClass from "../class/elements/BombeClass";

export function __StatsSupplementaire() {}

export function couteau__A(akhizonah: TJoueur, input?: any) {
  if (input.a) {
    input.a = false
    akhizonah.play('akhizonah_couteau')
  }
}

export function bombe__Z(akhizonah: TJoueur) {

  if (!akhizonah.bombe) {
    const bombe = akhizonah.scene.add.existing(new BombeClass(akhizonah.scene, akhizonah.flipX ? akhizonah.x - 80 : akhizonah.x + 80, akhizonah.y - 60, "akhizonah", `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: akhizonah.ClientID, degat: 0.3}));
    akhizonah.scene.physics.add.existing(bombe);
    akhizonah.bombe = bombe
    bombe.scene.time.delayedCall(100, () => {
      bombe.play('akhizonah_bombe');
      akhizonah.bombe = undefined
    }, null, bombe);
  }

}
