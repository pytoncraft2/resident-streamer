
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Platforme extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 397, y ?? 524.4367298681091);

		// map_hall0
		const map_hall0 = scene.add.image(571, 23.56327013189093, "map_hall0");
		map_hall0.scaleX = 3.060777824192423;
		map_hall0.scaleY = 3.060777824192423;
		this.add(map_hall0);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(0, 393.56327013189093, 128, 128);
		rectangle_1.scaleX = 6.111305753984601;
		rectangle_1.scaleY = 0.44985684163535844;
		rectangle_1.isFilled = true;
		this.add(rectangle_1);

		// rectangle
		const rectangle = scene.add.rectangle(1124, -73, 128, 128);
		rectangle.scaleX = 6.111305753984601;
		rectangle.scaleY = 0.44985684163535844;
		rectangle.isFilled = true;
		this.add(rectangle);

		// rectangle_2
		const rectangle_2 = scene.add.rectangle(-3, -242, 128, 128);
		rectangle_2.scaleX = 6.111305753984601;
		rectangle_2.scaleY = 0.44985684163535844;
		rectangle_2.isFilled = true;
		this.add(rectangle_2);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
