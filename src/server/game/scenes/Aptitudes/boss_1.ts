export function StatsSupplementaire(boss, Aptitudes) {
  // Aptitudes[boss.sprite].toucheDroite
  console.log()

  var theProperty = Aptitudes[boss.sprite].toucheGauche;

  // Extending it by replacing and wrapping, in extended.js
  theProperty = (function(old) {
      function extendsInit() {
          old();
          console.log('INTEGRATION REUSSI!!!')
      }

      return extendsInit;
  })(theProperty);

  console.log(theProperty())


}

export function pique(boss_1: Phaser.Physics.Arcade.Sprite|any, input) {
  boss_1.play('attaque')
  input.a = false
}

export function suivre(boss_1: Phaser.Physics.Arcade.Sprite|any) {
  if (boss_1.scene.players.getLength() > 1)
  {
    boss_1.scene.physics.moveToObject(boss_1, boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()]), boss_1.etats[boss_1.etatEnCours]['vitesse']);
  }
}
