import ManetteClass from '../../class/objets/ManetteClass'
export function punch(manette, input) {
  if (input.a) {
    manette.play('manette_punch')
  }
}

export function lanceManette(manette, input) {

  if (!manette.kunai) {
    manette.play('manette_lance')
    const kunai = manette.scene.add.existing(new ManetteClass(manette.scene, manette.flipX ? manette.x - 80 : manette.x + 80, manette.y - 60, "manette",  `${(Math.random() + 1).toString(36).substring(7)}`)
    .setData({ ClientId: manette.ClientID, degat: manette.degat}))
    .setFlipX(manette.flipX)
    manette.scene.physics.add.existing(kunai);
    manette.scene.physics.add.overlap(kunai, (manette.scene as any).enemies, function(_kunai, _ennemie: any) {
      _ennemie.blesse_ennemie(_kunai.getData('degat'))
      _kunai.setData('degat', 0)
    }, undefined, manette);

    (kunai.body as any).setAllowGravity(false);
    manette.kunai = kunai
    manette.scene.time.delayedCall(100, () => {
      manette.kunai.setVelocityX(manette.flipX ? -2300 : 2300).setFlipX(manette.flipX)
      manette.kunai = undefined;
    }, null, manette);
  }
}

export function vole(manette, input) {

// manette.vole = true
//   console.log("vole")
//     manette.play('manette_vole')
//     manette.setVelocityY(-800)
}

export const Direction_manette = {
  toucheDroite: (manette, input) => {
    manette.setVelocityX(600)
    if (input.space) {
      manette.body.setAllowGravity(false)
      manette.setVelocityY(-500)
      manette.play('manette_vole')
    }
    if (input.space_fin) manette.body.setVelocityY(200)
    if (manette.flipX) manette.setFlipX(false)
  },
  toucheGauche: (manette, input) => {
    if (input.space) {
      manette.body.setAllowGravity(false)
      manette.setVelocityY(-500)
      manette.play('manette_vole')
    }
    if (input.space_fin) manette.body.setVelocityY(200)
    if (!manette.flipX) manette.setFlipX(true)
    manette.setFlipX(true)
    manette.setVelocityX(-600)
  }
}
