import { setAnimation } from "../Animations/AnimationJoueur"
import TJoueur from "../types/Joueur";
import { AnimationPersonnage, definirPersonnage } from "./definition";
import { aptitudeFusion } from "./_utilitaire/fusion";

export function cross(fakhear: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a) {
    input.a = false
    fakhear.son = 'quick-punch'
    fakhear.setVelocityX(0)
    setAnimation(fakhear, 'cross')
  }
}

export function kick(fakhear: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.z)
  {
  fakhear.son = 'kick'
  fakhear.play('attack')
  fakhear.setVelocityX(0);
  }
  input.z = false
}

export function dash(fakhear: Phaser.Physics.Arcade.Sprite|any, input: { e_debut?: boolean }) {
  // Un appui = un dash (B7) : front montant calculé par le serveur, consommé ici.
  if (!input.e_debut) return;
  input.e_debut = false;
  fakhear.play('straightlead')
  fakhear.setVelocityX(0);

  if (!fakhear.animation_dash)  {
    fakhear.son = 'punch_fast'
    fakhear.animation_dash = fakhear.scene.tweens.addCounter({
      duration: 300,
      onUpdate: () => (fakhear.setVelocity((fakhear.flipX ? -1700 : 1700), -70)),
      onComplete: () => (fakhear.setVelocityX(0), fakhear.play('idle_attack')),
      repeat: 0,
      yoyo: false,
      // Phaser ≥ 3.60 : sans persist, le tween est détruit à la fin et restart() échoue.
      persist: true,
    })
  } else if (!fakhear.animation_dash.isPlaying()) {
    fakhear.son = 'punch_fast'
    fakhear.animation_dash.restart()
  }
}

/** Animations propres à fakhear (en plus des animations communes, `Animations/communes.ts`). */
const ANIMATIONS: readonly AnimationPersonnage[] = [
  { cle: "cross", prefixe: "cross", images: { debut: 0, fin: 5 }, frameRate: 23, repeat: 0, imageQuiBlesse: "cross4" },
  { cle: "attack", prefixe: "positiona", images: { debut: 0, fin: 5 }, frameRate: 15, repeat: 0, imageQuiBlesse: "positiona4" },
  // l'atlas n'a pas straightlead2 et 3 : images listées (B5)
  { cle: "straightlead", prefixe: "straightlead", images: [0, 1], frameRate: 15, repeat: 0, imageQuiBlesse: "straightlead1" },
  { cle: "idle_attack", prefixe: "positiona", images: { debut: 0, fin: 0 }, frameRate: 1, repeat: 0 },
];

export default definirPersonnage<TJoueur>({
  // Corps à corps : 2 dégâts, soit 5 coups par boss (intentions §2 ; 10 était une valeur de test).
  stats: { degat: 2 },
  touches: {
    A: { nom: "cross", action: cross },
    Z: { nom: "kick", action: kick },
    E: { nom: "dash", action: dash },
    TAB: aptitudeFusion,
  },
  animations: ANIMATIONS,
});
