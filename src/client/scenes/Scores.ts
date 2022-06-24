
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Scores extends Phaser.Scene {

	constructor() {
		super("Scores");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// rectangle
		const rectangle = this.add.rectangle(960, 472.5, 128, 128);
		rectangle.scaleX = 8.851222842091397;
		rectangle.scaleY = 5.217553620115069;
		rectangle.isFilled = true;

		// text
		const text = this.add.text(840.3665359625106, 34, "", {});
		text.scaleX = 4.125291863361701;
		text.scaleY = 4.125291863361701;
		text.text = "Scores";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
