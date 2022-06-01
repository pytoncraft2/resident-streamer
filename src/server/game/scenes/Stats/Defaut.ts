export const DefautStats = (personnage?: any) => {
      personnage.vie = 10;
      personnage.degat = 1;
}

export const DefautDirection = (Aptitudes: any, personnage: any) => {
  Aptitudes[personnage.sprite].toucheDroite = (personnage: any, input: any) => {
      // personnage.setVelocityX((personnage as any).vel);
      // personnage.setDragX(1400)
      // if (personnage.flipX) personnage.setFlipX(false);
      // if (input.right && !personnage.survole) {
      //   personnage.play('walk', true)
      // }
      // if (input.right_fin && !personnage.survole) {
      //   personnage.play('idle_walk')
      // }
    }
  Aptitudes[personnage.sprite].toucheGauche = (personnage: any, input: any) => {
      // personnage.setVelocityX(-(personnage as any).vel);
      // personnage.setDragX(1400)
      // if (!personnage.flipX) personnage.setFlipX(true);
      // if (input.left && !personnage.survole) {
      //   personnage.play('walk', true)
      // }
      // if (input.left_fin && !personnage.survole) {
      //   personnage.play('idle_walk')
      // }
    }
    Aptitudes[personnage.sprite].toucheEspace = (personnage: Phaser.Physics.Arcade.Sprite, input: any) => {
      // personnage.setVelocityY(-900);
      // input.space = false
    }
}

function direction() {
    throw new Error("Not implemented yet");
}
