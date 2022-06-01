export const DefautStats = (personnage?: any) => {
      personnage.vie = 10;
      personnage.degat = 1;
}

export const DefautDirection = (Aptitudes: any, personnage: any) => {
  Aptitudes[personnage.sprite].toucheDroite = (personnage: any, input: any) => {
    direction(input.right_debut, input.right_fin, personnage, input, true)
  }
  Aptitudes[personnage.sprite].toucheGauche = (personnage: any, input: any) => {
    direction(input.left_debut, input.left_fin, personnage, input, false)
  }
    Aptitudes[personnage.sprite].toucheEspace = (personnage: Phaser.Physics.Arcade.Sprite, input: any) => {
      personnage.setVelocityY(-900);
      input.space = false
    }
}

function direction(debut, fin, personnage: any, input: any, dir) {
  if (debut) {
    personnage.setFlipX(!dir)
    personnage.play('walk', true)
  }
  else if (fin) {
    personnage.setVelocityX(0)
    personnage.play('idle_walk', true)
  }
  else personnage.setVelocityX(dir ? (personnage as any).vel : -(personnage as any).vel)
}
