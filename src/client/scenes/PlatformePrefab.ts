
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformePrefab extends Phaser.GameObjects.Layer {

	constructor(scene: Phaser.Scene) {
		super(scene);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(640, 483, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_1.scaleX = 8.229435023633062;
		rectangle_1.scaleY = 0.28159317834804076;
		scene.physics.add.existing(rectangle_1, false);
		rectangle_1.body.moves = false;
		rectangle_1.body.allowGravity = false;
		rectangle_1.body.immovable = true;
		rectangle_1.body.setSize(128, 128, false);
		rectangle_1.isFilled = true;
		this.add(rectangle_1);

		// rectangle
		const rectangle = scene.add.rectangle(2870, 932, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle.scaleX = 44.7283739822158;
		rectangle.scaleY = 0.166360961320806;
		scene.physics.add.existing(rectangle, false);
		rectangle.body.moves = false;
		rectangle.body.allowGravity = false;
		rectangle.body.immovable = true;
		rectangle.body.setSize(128, 128, false);
		rectangle.isFilled = true;
		this.add(rectangle);

		// rectangle_2
		const rectangle_2 = scene.add.rectangle(2865, -18, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_2.scaleX = 44.7283739822158;
		rectangle_2.scaleY = 0.166360961320806;
		scene.physics.add.existing(rectangle_2, false);
		rectangle_2.body.moves = false;
		rectangle_2.body.allowGravity = false;
		rectangle_2.body.immovable = true;
		rectangle_2.body.setSize(128, 128, false);
		rectangle_2.isFilled = true;
		this.add(rectangle_2);

		// rectangle_3
		const rectangle_3 = scene.add.rectangle(2046, 656, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_3.scaleX = 8.229435023633062;
		rectangle_3.scaleY = 0.28159317834804076;
		scene.physics.add.existing(rectangle_3, false);
		rectangle_3.body.moves = false;
		rectangle_3.body.allowGravity = false;
		rectangle_3.body.immovable = true;
		rectangle_3.body.setSize(128, 128, false);
		rectangle_3.isFilled = true;
		this.add(rectangle_3);

		// rectangle_4
		const rectangle_4 = scene.add.rectangle(3109.8893861369424, 290.86233614781355, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_4.scaleX = 8.229435023633062;
		rectangle_4.scaleY = 0.28159317834804076;
		scene.physics.add.existing(rectangle_4, false);
		rectangle_4.body.moves = false;
		rectangle_4.body.allowGravity = false;
		rectangle_4.body.immovable = true;
		rectangle_4.body.setSize(128, 128, false);
		rectangle_4.isFilled = true;
		this.add(rectangle_4);

		// rectangle_5
		const rectangle_5 = scene.add.rectangle(3291.987005428948, -425.37878995089045, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_5.scaleX = 8.229435023633062;
		rectangle_5.scaleY = 0.28159317834804076;
		scene.physics.add.existing(rectangle_5, false);
		rectangle_5.body.moves = false;
		rectangle_5.body.allowGravity = false;
		rectangle_5.body.immovable = true;
		rectangle_5.body.setSize(128, 128, false);
		rectangle_5.isFilled = true;
		this.add(rectangle_5);

		// rectangle_6
		const rectangle_6 = scene.add.rectangle(1351.2559448896711, -306.3376654196709, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_6.scaleX = 8.229435023633062;
		rectangle_6.scaleY = 0.28159317834804076;
		scene.physics.add.existing(rectangle_6, false);
		rectangle_6.body.moves = false;
		rectangle_6.body.allowGravity = false;
		rectangle_6.body.immovable = true;
		rectangle_6.body.setSize(128, 128, false);
		rectangle_6.isFilled = true;
		this.add(rectangle_6);

		// rectangle_7
		const rectangle_7 = scene.add.rectangle(449.40220340104867, -818.4975782863513, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_7.scaleX = 8.229435023633062;
		rectangle_7.scaleY = 0.28159317834804076;
		scene.physics.add.existing(rectangle_7, false);
		rectangle_7.body.moves = false;
		rectangle_7.body.allowGravity = false;
		rectangle_7.body.immovable = true;
		rectangle_7.body.setSize(128, 128, false);
		rectangle_7.isFilled = true;
		this.add(rectangle_7);

		// rectangle_8
		const rectangle_8 = scene.add.rectangle(1856.521190396406, -1103.9268158935042, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_8.scaleX = 8.229435023633062;
		rectangle_8.scaleY = 0.28159317834804076;
		scene.physics.add.existing(rectangle_8, false);
		rectangle_8.body.moves = false;
		rectangle_8.body.allowGravity = false;
		rectangle_8.body.immovable = true;
		rectangle_8.body.setSize(128, 128, false);
		rectangle_8.isFilled = true;
		this.add(rectangle_8);

		// rectangle_9
		const rectangle_9 = scene.add.rectangle(4380.0280500365825, -745.828221744176, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_9.scaleX = 8.229435023633062;
		rectangle_9.scaleY = 0.28159317834804076;
		scene.physics.add.existing(rectangle_9, false);
		rectangle_9.body.moves = false;
		rectangle_9.body.allowGravity = false;
		rectangle_9.body.immovable = true;
		rectangle_9.body.setSize(128, 128, false);
		rectangle_9.isFilled = true;
		this.add(rectangle_9);

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
