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
    const bombe = akhizonah.scene.add.existing(new BombeClass(akhizonah.scene, akhizonah.flipX ? akhizonah.x - 80 : akhizonah.x + 80, akhizonah.y - 60, "atlas",  `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: akhizonah.ClientID, degat: 0.3}));
    akhizonah.scene.physics.add.existing(bombe);
    bombe.play('akhizonah_bombe');
    //@ts-ignore
    akhizonah.o = true
  }

  console.log("BOMBE")
}
