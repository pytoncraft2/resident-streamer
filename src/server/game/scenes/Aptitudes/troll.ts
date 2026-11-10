import TJoueur from "../types/Joueur";
import { AnimationPersonnage, definirPersonnage } from "./definition";
import { arbreTroll } from "../../../ia/bosses/troll";
import { demarrerIA } from "../../ia/pilote";
import GrenouilleClass from "../class/elements/GrenouilleClass";
import OieClass from "../class/elements/OieClass";

export function initialiser(personnage: TJoueur, _Aptitudes: any) {
  personnage.cible_courante = "players"
}

/** Course du troll vers la droite (1800 px/s), arrêt au relâchement. */
export function courirADroite(personnage: TJoueur & Phaser.Physics.Arcade.Sprite, _input: any) {
  if (_input.right_fin)
  {
    personnage.play('troll_idle')
    personnage.setVelocityX(0)
  }
  else
  {
    personnage.play('troll_run', true)
    personnage.setVelocityX(1800)
    if (personnage.flipX) personnage.setFlipX(false)
  }
}

/** Course du troll vers la gauche (1800 px/s), arrêt au relâchement. */
export function courirAGauche(personnage: TJoueur & Phaser.Physics.Arcade.Sprite, _input: any) {
  if (_input.left_fin)
  {
    personnage.play('troll_idle')
    personnage.setVelocityX(0)
  }
  else
  {
    personnage.play('troll_run', true)
    personnage.setVelocityX(-1800)
    if (!personnage.flipX) personnage.setFlipX(true)
  }
}

export function oie(troll: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a) {
    input.a = false
    troll.play("troll_attaque")

    troll.son = 'troll_bouton'
    const oie = troll.scene.add.existing(new OieClass(troll.scene, troll.flipX ? troll.x - 180 : troll.x + 180, troll.y, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.9}));
    troll.scene.physics.add.existing(oie);
    troll.scene.physics.add.collider(troll.scene[`${troll.cible_courante}`].getChildren(), oie)
    oie.setPushable(false);
  }
}

export function grenouille(troll: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.z) {
    input.z = false
    troll.son = 'troll_bouton2'
    troll.play("troll_attaque")
    const grenouille = troll.scene.add.existing(new GrenouilleClass(troll.scene, troll.flipX ? troll.x - Phaser.Math.Between(380, 180) : troll.x + Phaser.Math.Between(380, 180), troll.y - 400, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, !troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.3}));
    troll.scene.physics.add.existing(grenouille);
  }
}

/**
 * IA de troll : arbre de comportement (src/server/ia/bosses/troll.ts) piloté toutes les 800 ms (ADR-003).
 */
export function auto(troll: TJoueur, _input: any, aptitudes: any) {
  demarrerIA(troll as any, arbreTroll, { periode: 800, aptitudes });
}

/** Animations propres à troll (en plus des animations communes, `Animations/communes.ts`). */
const ANIMATIONS: readonly AnimationPersonnage[] = [
  { cle: "troll_run", prefixe: "trollrun", images: { debut: 0, fin: 5 }, frameRate: 30, repeat: -1 },
  { cle: "troll_idle", prefixe: "troll", images: { debut: 0, fin: 0 }, frameRate: 1, repeat: 0 },
  { cle: "troll_attaque", prefixe: "trollattack", images: { debut: 0, fin: 1 }, frameRate: 6, repeat: 1 },
];

export default definirPersonnage<TJoueur>({
  initialiser,
  // Le troll court au lieu de marcher et ne saute pas.
  deplacements: {
    toucheDroite: courirADroite,
    toucheGauche: courirAGauche,
    toucheEspace: () => undefined,
  },
  touches: {
    A: { nom: "oie", action: oie },
    Z: { nom: "grenouille", action: grenouille },
  },
  auto,
  animations: ANIMATIONS,
});
