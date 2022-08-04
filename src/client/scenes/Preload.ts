
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// progress
		const progress = this.add.text(960, 540, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "fontSize": "30px" });

		this.progress = progress;

		this.events.emit("scene-awake");
	}

	public progress!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();
		const self = this;

		this.load.html('nameform', '/assets/loginform.html');

		this.load.pack("asset-pack", "assets/asset-pack.json");

		document.body.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"

		this.load.audio('epic_musique', [
			'assets/epic_musique.mp3'
		]);

		this.load.audio('punch_fast', [
			'assets/punch_fast.mp3'
		]);

		var progress = this.add.graphics();
		const gameSize = this.scale.gameSize;

		this.load.on('progress', function (value: number) {
			progress.clear();
			progress.fillStyle(0xffffff, 1);
			progress.fillRect(0, 0, gameSize.width * value, 60);
			const percent = value * 100;

			self.progress.text = `${Math.floor(percent)}%`
		});

		this.load.on(Phaser.Loader.Events.COMPLETE, () => {
			progress.destroy(true)
			this.scene.start("Level")
		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
