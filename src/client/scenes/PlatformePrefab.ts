
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformePrefab extends Phaser.GameObjects.Layer {

	constructor(scene: Phaser.Scene) {
		super(scene);

		// rectangle_2
		const rectangle_2 = scene.add.rectangle(993, 743, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_2.scaleX = 9.457670368221004;
		rectangle_2.scaleY = 0.16175468549654332;
		scene.physics.add.existing(rectangle_2, false);
		rectangle_2.body.allowGravity = false;
		rectangle_2.body.immovable = true;
		rectangle_2.body.setSize(128, 128, false);
		rectangle_2.isFilled = true;
		rectangle_2.fillAlpha = 0;
		this.add(rectangle_2);

		// rectangle
		const rectangle = scene.add.rectangle(228, 560, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle.scaleX = 2.707352837932574;
		rectangle.scaleY = 0.14396856145473624;
		scene.physics.add.existing(rectangle, false);
		rectangle.body.allowGravity = false;
		rectangle.body.immovable = true;
		rectangle.body.setSize(128, 128, false);
		rectangle.isFilled = true;
		rectangle.fillAlpha = 0;
		this.add(rectangle);

		// rectangle_3
		const rectangle_3 = scene.add.rectangle(939, 361, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_3.scaleX = 1.4671105764538728;
		rectangle_3.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_3, false);
		rectangle_3.body.allowGravity = false;
		rectangle_3.body.immovable = true;
		rectangle_3.body.setSize(128, 128, false);
		rectangle_3.isFilled = true;
		rectangle_3.fillAlpha = 0;
		this.add(rectangle_3);

		// rectangle_4
		const rectangle_4 = scene.add.rectangle(1656, 427, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_4.scaleX = 2.707352837932574;
		rectangle_4.scaleY = 0.14396856145473624;
		scene.physics.add.existing(rectangle_4, false);
		rectangle_4.body.allowGravity = false;
		rectangle_4.body.immovable = true;
		rectangle_4.body.setSize(128, 128, false);
		rectangle_4.isFilled = true;
		rectangle_4.fillAlpha = 0;
		this.add(rectangle_4);

		// rectangle_5
		const rectangle_5 = scene.add.rectangle(368, 846, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_5.scaleX = 1.8097526208556869;
		rectangle_5.scaleY = 0.17483819869544154;
		rectangle_5.angle = -89;
		scene.physics.add.existing(rectangle_5, false);
		rectangle_5.body.allowGravity = false;
		rectangle_5.body.immovable = true;
		rectangle_5.body.setSize(128, 128, false);
		rectangle_5.isFilled = true;
		rectangle_5.fillAlpha = 0;
		this.add(rectangle_5);

		// rectangle_6
		const rectangle_6 = scene.add.rectangle(1614, 850, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_6.scaleX = 1.8097526208556869;
		rectangle_6.scaleY = 0.17483819869544154;
		rectangle_6.angle = -89;
		scene.physics.add.existing(rectangle_6, false);
		rectangle_6.body.allowGravity = false;
		rectangle_6.body.immovable = true;
		rectangle_6.body.setSize(128, 128, false);
		rectangle_6.isFilled = true;
		rectangle_6.fillAlpha = 0;
		this.add(rectangle_6);

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
