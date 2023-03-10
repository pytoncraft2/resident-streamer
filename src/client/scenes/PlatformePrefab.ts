
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformePrefab extends Phaser.GameObjects.Layer {

	constructor(scene: Phaser.Scene) {
		super(scene);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(640, 244, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_1.scaleX = 8.229435023633062;
		rectangle_1.scaleY = 0.5936332970450903;
		scene.physics.add.existing(rectangle_1, false);
		rectangle_1.body.moves = false;
		rectangle_1.body.allowGravity = false;
		rectangle_1.body.immovable = true;
		rectangle_1.body.setSize(128, 128, false);
		rectangle_1.isFilled = true;
		this.add(rectangle_1);

		// rectangle
		const rectangle = scene.add.rectangle(1378, 744, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle.scaleX = 8.229435023633062;
		rectangle.scaleY = 0.5936332970450903;
		scene.physics.add.existing(rectangle, false);
		rectangle.body.moves = false;
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
