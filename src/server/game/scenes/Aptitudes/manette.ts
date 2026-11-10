import ManetteClass from '../class/elements/ManetteClass'

import TJoueur from "../types/Joueur";
import { AnimationPersonnage, definirPersonnage } from "./definition";
import { arbreManette } from "../../../ia/bosses/manette";
import { demarrerIA } from "../../ia/pilote";

export function initialiser(personnage: TJoueur, Aptitudes: any) {
  Aptitudes[personnage.sprite].toucheEspace = (personnage: Phaser.Physics.Arcade.Sprite, _input: any) => {
      personnage.setVelocityY(-1250);
      personnage.setVelocityX(personnage.flipX ? (-1400) : (1400));
      personnage.play("manette_vole")
  }
  personnage.cible_courante = "players"
}

export function punch(manette: TJoueur, input: any) {
  if (input.a) {
    manette.body.setVelocityY(1000)
    manette.play('manette_punch')
  }
}

export function lancer(manette: TJoueur, _input: any) {

  if (!manette.obj_manette) {
    manette.son = 'manette'
    manette.play('manette_lance')
      manette.body.setVelocityY(1000)
    const obj_manette = manette.scene.add.existing(new ManetteClass(manette.scene, manette.flipX ? manette.x - 80 : manette.x + 80, manette.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
    .setData({ ClientId: manette.ClientID, degat: manette.degat}))
    .setFlipX(manette.flipX)
    manette.scene.physics.add.existing(obj_manette);
    manette.scene.physics.add.overlap(obj_manette, (manette.scene as any)[`${manette.cible_courante}`], function(_obj_manette: Phaser.Types.Physics.Arcade.GameObjectWithBody, _ennemie: any) {
      if (_ennemie.sprite !== manette.sprite) {
        _ennemie.dommage(_obj_manette.getData('degat'))
        _obj_manette.setData('degat', 0)
      }
    }, undefined, manette);

    (obj_manette.body as any).setAllowGravity(false);
    // manette.scene.groupeManettes.add(obj_manette);
    manette.obj_manette = obj_manette;

    manette.scene.time.delayedCall(200, () => {

        // Phaser ≥ 3.60 : tweens.createTimeline a disparu, tweens.chain enchaîne les tweens.
        var timeline = manette.scene.tweens.chain({
          tweens: [
            {
              targets: manette.obj_manette,
              x: manette.flipX ? manette.x -1000 : manette.x + 1000,
              ease: 'Power2',
              duration: 500,
              onComplete: function(_tw, tg: any) {
                tg[0].setData('degat', 1)
              }
            },
            {
              targets: manette.obj_manette,
              props: {
                x: { value: function () { return manette.x; }, ease: 'Power1' },
                y: { value: function () { return manette.y; }, ease: 'Power3' }
              },
              ease: 'Power2',
              duration: 800
            }
          ]
        });

        //@ts-ignore
        manette.obj_manette.tweenManette = timeline;
      manette.obj_manette = undefined;
    }, null, manette);
  }
}

export function animationLancerManette(manette: TJoueur) {
  // Phaser ≥ 3.60 : tweens.createTimeline a disparu, tweens.chain enchaîne les tweens.
  manette.scene.tweens.chain({
    tweens: [
      {
        targets: manette.groupeManettes.getChildren()[0],
        x: manette.flipX ? manette.x -1000 : manette.x + 1000,
        ease: 'Power2',
        duration: 500,
        onComplete: function(_tw, _tg: any) {
          // tg[0].setData('degat', 1)
        }
      },
      {
        targets: manette.groupeManettes.getChildren()[0],
        props: {
          x: { value: function () { return manette.x; }, ease: 'Power1' },
          y: { value: function () { return manette.y; }, ease: 'Power3' }
        },
        ease: 'Power2',
        duration: 800
      }
    ]
  });
}

/**
 * @see {@link game/scenes/Aptitudes/base} pour un example
 */
/**
 * IA de manette : arbre de comportement (src/server/ia/bosses/manette.ts) piloté toutes les 500 ms (ADR-003).
 */
export function auto(manette: TJoueur, _input: any, aptitudes: any) {
  demarrerIA(manette as any, arbreManette, { periode: 500, aptitudes });
}

/** Animations propres à manette (en plus des animations communes, `Animations/communes.ts`). */
const ANIMATIONS: readonly AnimationPersonnage[] = [
  { cle: "manette_punch", prefixe: "manettepunch", images: { debut: 0, fin: 1 }, frameRate: 10, repeat: 0, imageQuiBlesse: "manettepunch1" },
  { cle: "manette_vole", prefixe: "manettevole", images: { debut: 0, fin: 0 }, frameRate: 4, repeat: 0 },
  { cle: "manette_lance", prefixe: "manettelance", images: { debut: 0, fin: 3 }, frameRate: 10, repeat: 0 },
];

export default definirPersonnage<TJoueur>({
  initialiser,
  touches: {
    A: { nom: "punch", action: punch },
    Z: { nom: "lancer", action: lancer },
  },
  auto,
  animations: ANIMATIONS,
});
