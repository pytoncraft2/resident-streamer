export default class Panel {
  private contenu: any;
  private titre: Phaser.GameObjects.Text;

  constructor(titre = '', contenu: string[], scene: Phaser.Scene, _callback: CallableFunction) {
    var graphics = scene.make.graphics(scene);
    // graphics.fillStyle(0x000000);
    graphics.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0.6,0.6, 0, 0);
    graphics.setAlpha(0.5)
    graphics.fillRect(0, 0, 320, window.innerHeight);

    this.titre = scene.add.text(20, 50, titre, { fontFamily: 'CustomFontNormal' }).setOrigin(0).setFontSize(39);
    this.contenu = scene.add.text(16, 100, contenu, { fontFamily: 'CustomFontItalic', wordWrap: { width: 300 }}).setOrigin(0).setFontSize(24);
  }

  setContenu(texte: string[]|String) {
    this.contenu.setText(texte)
  }

  addContenu(texte: string[]|String) {
    // return this.contenu.concat(texte)
    this.setContenu(texte.concat(this.contenu.text))
  }

  setTitre(texte: string[]) {
    this.titre.setText(texte)
  }

  getContenu() {
    return this.contenu;
  }
}
