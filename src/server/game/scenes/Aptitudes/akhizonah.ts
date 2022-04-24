import TJoueur from "../types/Joueur";
import BombeClass from "../class/objets/BombeClass";

export function couteau(akhizonah: TJoueur, input?: any) {
  if (input.a) {
    input.a = false
    akhizonah.play('akhizonah_couteau')
    console.log("COUTEAU")
  }
}

export function bombe(akhizonah: TJoueur) {

  //@ts-ignore
  if (!akhizonah.o) {
    const bombe = akhizonah.scene.add.existing(new BombeClass(akhizonah.scene, akhizonah.flipX ? akhizonah.x - 80 : akhizonah.x + 80, akhizonah.y - 60, "atlas", "bombe0").setData({ ClientId: akhizonah.ClientID, degat: 0.3}).setTexture('atlas', 'bombe0'));
    akhizonah.scene.physics.add.existing(bombe);
    bombe.scene.time.delayedCall(100, () => {
      bombe.play('akhizonah_bombe');
    }, null, bombe);

    //@ts-ignore
    akhizonah.o = true
  }

  console.log("BOMBE")
}
