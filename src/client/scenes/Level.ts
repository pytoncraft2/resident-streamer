
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(332, 64, "", {});
		text.text = "RESIDENT STREAMER";
		text.setStyle({ "fontFamily": "LeagueGothic-CondensedRegular" });

		// layer
		const layer = this.add.layer();

		// rectangle
		const rectangle = this.add.rectangle(0, 300, 128, 128);
		rectangle.scaleX = 1.4032183308683686;
		rectangle.scaleY = 4.670844628920915;
		rectangle.setOrigin(0, 0.5);
		rectangle.isFilled = true;
		rectangle.fillColor = 10882223;
		rectangle.fillAlpha = 0.4;
		layer.add(rectangle);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(510, 229, 128, 128);
		rectangle_1.isFilled = true;
		layer.add(rectangle_1);

		// rectangle_2
		const rectangle_2 = this.add.rectangle(726, 336, 128, 128);
		rectangle_2.isFilled = true;
		layer.add(rectangle_2);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		let salonURL = window.location.pathname.slice(1)
		const params = new URLSearchParams(window.location.search)

		// if (salonURL != '') {
			// this.scene.start('Lobby', {salon: `${salonURL}`, personnage: `${params.get('p')}`})
		// } else {
			// this.afficheAcceuil()
			// console.log("RIEN A FAIRE")
		// }
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
