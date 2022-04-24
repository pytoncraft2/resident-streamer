import TJoueur from "../types/Joueur";

export function couteau(akhizonah: TJoueur, input?: any) {
  if (input.a) {
    input.a = false
    akhizonah.play('akhizonah_couteau')
    console.log("COUTEAU")
  }
}

export function bombe(akhizonah: TJoueur) {
  console.log("BOMBE")
}
