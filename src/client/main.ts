import Phaser from "phaser";
import Level from "./scenes/Level";
import Preload from "./scenes/Preload";
import Lobby from "./scenes/Lobby";
import Jeu from "./scenes/Jeu";

class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", "assets/preload-asset-pack.json");
    }

    create() {

       this.scene.start("Preload");
    }
}

window.addEventListener('load', function () {

	const game = new Phaser.Game({
		width: 1920,
		height: 945,
		backgroundColor: "#2f2f2f",
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH
		},
		scene: [Boot, Preload, Level, Lobby, Jeu]
	});

	game.scene.start("Boot");

});
