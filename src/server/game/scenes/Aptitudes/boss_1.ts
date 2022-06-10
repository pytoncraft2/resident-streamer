export function __StatsSupplementaire(boss_1: any, Aptitudes: any) {
  Aptitudes[boss_1.sprite].toucheDroite = function (_boss_1: any) {
    boss_1.setVelocityX(400)
  }
  Aptitudes[boss_1.sprite].toucheGauche = function (_boss_1: any) {
    boss_1.setVelocityX(-400)
  }
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
