import TJoueur from "../types/Joueur";
import { definirPersonnage } from "./definition";
import BombeClass from "../class/elements/BombeClass";
import { aptitudeFusion } from "./_utilitaire/fusion";

export function initialiser() {}

export function couteau(akhizonah: TJoueur, input?: any) {
  if (input.a) {
    input.a = false
    akhizonah.son = 'couteau'
    akhizonah.play('akhizonah_couteau')
  }
}


export function bombe(akhizonah: TJoueur, input: { z_debut?: boolean }) {
  // Un appui = une bombe (B7) : front montant calculé par le serveur, consommé ici.
  if (!input.z_debut) return;
  input.z_debut = false;

  if (!akhizonah.bombe) {
    const bombe = akhizonah.scene.add.existing(new BombeClass(akhizonah.scene, akhizonah.flipX ? akhizonah.x - 80 : akhizonah.x + 80, akhizonah.y - 60, "akhizonah", `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: akhizonah.ClientID, degat: 0.3}));
    akhizonah.scene.physics.add.existing(bombe);
    akhizonah.bombe = bombe
    bombe.scene.time.delayedCall(1470, () => {
      akhizonah.son = 'explosion'
    }, null, akhizonah);

    bombe.scene.time.delayedCall(100, () => {
      bombe.play('akhizonah_bombe');
      akhizonah.bombe = undefined
    }, null, bombe);
  }

}

export default definirPersonnage<TJoueur>({
  initialiser,
  touches: {
    A: { nom: "couteau", action: couteau },
    Z: { nom: "bombe", action: bombe },
    TAB: aptitudeFusion,
  },
});
