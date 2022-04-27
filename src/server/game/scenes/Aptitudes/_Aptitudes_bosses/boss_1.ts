export function pique(boss_1: Phaser.Physics.Arcade.Sprite|any) {
  boss_1.play('attaque')
}

export function suivre(boss_1: Phaser.Physics.Arcade.Sprite|any) {
  boss_1.scene.physics.moveToObject(boss_1, boss_1.scene.physics.closest(boss_1, [...(boss_1.scene as any).players.getChildren()]), boss_1.etats[boss_1.etatEnCours]['vitesse']);
}
