
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformePrefab extends Phaser.GameObjects.Layer {

	constructor(scene: Phaser.Scene) {
		super(scene);

		// rectangle_2
		const rectangle_2 = scene.add.rectangle(957, 695, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_2.scaleX = 6.002917368092423;
		rectangle_2.scaleY = 0.5438118909887464;
		scene.physics.add.existing(rectangle_2, false);
		rectangle_2.body.allowGravity = false;
		rectangle_2.body.immovable = true;
		rectangle_2.body.setSize(128, 128, false);
		rectangle_2.isFilled = true;
		this.add(rectangle_2);

		// rectangle
		const rectangle = scene.add.rectangle(388, 337, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle.scaleX = 6.002917368092423;
		rectangle.scaleY = 0.5438118909887464;
		scene.physics.add.existing(rectangle, false);
		rectangle.body.allowGravity = false;
		rectangle.body.immovable = true;
		rectangle.body.setSize(128, 128, false);
		rectangle.isFilled = true;
		this.add(rectangle);

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
