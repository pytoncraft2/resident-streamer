import { setAnimation } from "../Animations/AnimationJoueur"
import TJoueur from "../types/Joueur";
import { definirPersonnage } from "./definition";
import { aptitudeFusion } from "./_utilitaire/fusion";

export function initialiser(fakhear: TJoueur, _Aptitudes: any) {
  // Corps à corps : 2 dégâts, soit 5 coups par boss (intentions §2 ; 10 était une valeur de test).
  fakhear.degat = 2
}

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

export default definirPersonnage<TJoueur>({
  initialiser,
  touches: {
    A: { nom: "cross", action: cross },
    Z: { nom: "kick", action: kick },
    E: { nom: "dash", action: dash },
    TAB: aptitudeFusion,
  },
});
