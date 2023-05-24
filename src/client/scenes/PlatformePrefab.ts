
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PlatformePrefab extends Phaser.GameObjects.Layer {

	constructor(scene: Phaser.Scene) {
		super(scene);

		// rectangle
		const rectangle = scene.add.rectangle(1739, 937, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle.scaleX = 26.84807838572651;
		rectangle.scaleY = 0.13079179707439897;
		scene.physics.add.existing(rectangle, false);
		rectangle.body.allowGravity = false;
		rectangle.body.immovable = true;
		rectangle.body.setSize(128, 128, false);
		rectangle.isFilled = true;
		this.add(rectangle);

		// rectangle_3
		const rectangle_3 = scene.add.rectangle(746, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_3.scaleX = 1.4671105764538728;
		rectangle_3.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_3, false);
		rectangle_3.body.allowGravity = false;
		rectangle_3.body.immovable = true;
		rectangle_3.body.setSize(128, 128, false);
		rectangle_3.isFilled = true;
		this.add(rectangle_3);

		// rectangle_1
		const rectangle_1 = scene.add.rectangle(964, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_1.scaleX = 1.4671105764538728;
		rectangle_1.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_1, false);
		rectangle_1.body.allowGravity = false;
		rectangle_1.body.immovable = true;
		rectangle_1.body.setSize(128, 128, false);
		rectangle_1.isFilled = true;
		this.add(rectangle_1);

		// rectangle_2
		const rectangle_2 = scene.add.rectangle(1181, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_2.scaleX = 1.4671105764538728;
		rectangle_2.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_2, false);
		rectangle_2.body.allowGravity = false;
		rectangle_2.body.immovable = true;
		rectangle_2.body.setSize(128, 128, false);
		rectangle_2.isFilled = true;
		this.add(rectangle_2);

		// rectangle_4
		const rectangle_4 = scene.add.rectangle(1181, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_4.scaleX = 1.4671105764538728;
		rectangle_4.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_4, false);
		rectangle_4.body.allowGravity = false;
		rectangle_4.body.immovable = true;
		rectangle_4.body.setSize(128, 128, false);
		rectangle_4.isFilled = true;
		this.add(rectangle_4);

		// rectangle_5
		const rectangle_5 = scene.add.rectangle(746, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_5.scaleX = 1.4671105764538728;
		rectangle_5.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_5, false);
		rectangle_5.body.allowGravity = false;
		rectangle_5.body.immovable = true;
		rectangle_5.body.setSize(128, 128, false);
		rectangle_5.isFilled = true;
		this.add(rectangle_5);

		// rectangle_6
		const rectangle_6 = scene.add.rectangle(1399, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_6.scaleX = 1.4671105764538728;
		rectangle_6.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_6, false);
		rectangle_6.body.allowGravity = false;
		rectangle_6.body.immovable = true;
		rectangle_6.body.setSize(128, 128, false);
		rectangle_6.isFilled = true;
		this.add(rectangle_6);

		// rectangle_7
		const rectangle_7 = scene.add.rectangle(528, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_7.scaleX = 1.4671105764538728;
		rectangle_7.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_7, false);
		rectangle_7.body.allowGravity = false;
		rectangle_7.body.immovable = true;
		rectangle_7.body.setSize(128, 128, false);
		rectangle_7.isFilled = true;
		this.add(rectangle_7);

		// rectangle_8
		const rectangle_8 = scene.add.rectangle(310, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_8.scaleX = 1.4671105764538728;
		rectangle_8.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_8, false);
		rectangle_8.body.allowGravity = false;
		rectangle_8.body.immovable = true;
		rectangle_8.body.setSize(128, 128, false);
		rectangle_8.isFilled = true;
		this.add(rectangle_8);

		// rectangle_9
		const rectangle_9 = scene.add.rectangle(528, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_9.scaleX = 1.4671105764538728;
		rectangle_9.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_9, false);
		rectangle_9.body.allowGravity = false;
		rectangle_9.body.immovable = true;
		rectangle_9.body.setSize(128, 128, false);
		rectangle_9.isFilled = true;
		this.add(rectangle_9);

		// rectangle_10
		const rectangle_10 = scene.add.rectangle(92, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_10.scaleX = 1.4671105764538728;
		rectangle_10.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_10, false);
		rectangle_10.body.allowGravity = false;
		rectangle_10.body.immovable = true;
		rectangle_10.body.setSize(128, 128, false);
		rectangle_10.isFilled = true;
		this.add(rectangle_10);

		// rectangle_11
		const rectangle_11 = scene.add.rectangle(746, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_11.scaleX = 1.4671105764538728;
		rectangle_11.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_11, false);
		rectangle_11.body.allowGravity = false;
		rectangle_11.body.immovable = true;
		rectangle_11.body.setSize(128, 128, false);
		rectangle_11.isFilled = true;
		this.add(rectangle_11);

		// rectangle_12
		const rectangle_12 = scene.add.rectangle(1181, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_12.scaleX = 1.4671105764538728;
		rectangle_12.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_12, false);
		rectangle_12.body.allowGravity = false;
		rectangle_12.body.immovable = true;
		rectangle_12.body.setSize(128, 128, false);
		rectangle_12.isFilled = true;
		this.add(rectangle_12);

		// rectangle_13
		const rectangle_13 = scene.add.rectangle(1399, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_13.scaleX = 1.4671105764538728;
		rectangle_13.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_13, false);
		rectangle_13.body.allowGravity = false;
		rectangle_13.body.immovable = true;
		rectangle_13.body.setSize(128, 128, false);
		rectangle_13.isFilled = true;
		this.add(rectangle_13);

		// rectangle_14
		const rectangle_14 = scene.add.rectangle(1399, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_14.scaleX = 1.4671105764538728;
		rectangle_14.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_14, false);
		rectangle_14.body.allowGravity = false;
		rectangle_14.body.immovable = true;
		rectangle_14.body.setSize(128, 128, false);
		rectangle_14.isFilled = true;
		this.add(rectangle_14);

		// rectangle_15
		const rectangle_15 = scene.add.rectangle(1617, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_15.scaleX = 1.4671105764538728;
		rectangle_15.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_15, false);
		rectangle_15.body.allowGravity = false;
		rectangle_15.body.immovable = true;
		rectangle_15.body.setSize(128, 128, false);
		rectangle_15.isFilled = true;
		this.add(rectangle_15);

		// rectangle_16
		const rectangle_16 = scene.add.rectangle(1835, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_16.scaleX = 1.4671105764538728;
		rectangle_16.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_16, false);
		rectangle_16.body.allowGravity = false;
		rectangle_16.body.immovable = true;
		rectangle_16.body.setSize(128, 128, false);
		rectangle_16.isFilled = true;
		this.add(rectangle_16);

		// rectangle_17
		const rectangle_17 = scene.add.rectangle(1181, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_17.scaleX = 1.4671105764538728;
		rectangle_17.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_17, false);
		rectangle_17.body.allowGravity = false;
		rectangle_17.body.immovable = true;
		rectangle_17.body.setSize(128, 128, false);
		rectangle_17.isFilled = true;
		this.add(rectangle_17);

		// rectangle_18
		const rectangle_18 = scene.add.rectangle(1617, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_18.scaleX = 1.4671105764538728;
		rectangle_18.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_18, false);
		rectangle_18.body.allowGravity = false;
		rectangle_18.body.immovable = true;
		rectangle_18.body.setSize(128, 128, false);
		rectangle_18.isFilled = true;
		this.add(rectangle_18);

		// rectangle_19
		const rectangle_19 = scene.add.rectangle(964, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_19.scaleX = 1.4671105764538728;
		rectangle_19.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_19, false);
		rectangle_19.body.allowGravity = false;
		rectangle_19.body.immovable = true;
		rectangle_19.body.setSize(128, 128, false);
		rectangle_19.isFilled = true;
		this.add(rectangle_19);

		// rectangle_20
		const rectangle_20 = scene.add.rectangle(528, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_20.scaleX = 1.4671105764538728;
		rectangle_20.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_20, false);
		rectangle_20.body.allowGravity = false;
		rectangle_20.body.immovable = true;
		rectangle_20.body.setSize(128, 128, false);
		rectangle_20.isFilled = true;
		this.add(rectangle_20);

		// rectangle_21
		const rectangle_21 = scene.add.rectangle(310, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_21.scaleX = 1.4671105764538728;
		rectangle_21.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_21, false);
		rectangle_21.body.allowGravity = false;
		rectangle_21.body.immovable = true;
		rectangle_21.body.setSize(128, 128, false);
		rectangle_21.isFilled = true;
		this.add(rectangle_21);

		// rectangle_22
		const rectangle_22 = scene.add.rectangle(92, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_22.scaleX = 1.4671105764538728;
		rectangle_22.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_22, false);
		rectangle_22.body.allowGravity = false;
		rectangle_22.body.immovable = true;
		rectangle_22.body.setSize(128, 128, false);
		rectangle_22.isFilled = true;
		this.add(rectangle_22);

		// rectangle_23
		const rectangle_23 = scene.add.rectangle(310, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_23.scaleX = 1.4671105764538728;
		rectangle_23.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_23, false);
		rectangle_23.body.allowGravity = false;
		rectangle_23.body.immovable = true;
		rectangle_23.body.setSize(128, 128, false);
		rectangle_23.isFilled = true;
		this.add(rectangle_23);

		// rectangle_24
		const rectangle_24 = scene.add.rectangle(92, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_24.scaleX = 1.4671105764538728;
		rectangle_24.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_24, false);
		rectangle_24.body.allowGravity = false;
		rectangle_24.body.immovable = true;
		rectangle_24.body.setSize(128, 128, false);
		rectangle_24.isFilled = true;
		this.add(rectangle_24);

		// rectangle_25
		const rectangle_25 = scene.add.rectangle(310, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_25.scaleX = 1.4671105764538728;
		rectangle_25.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_25, false);
		rectangle_25.body.allowGravity = false;
		rectangle_25.body.immovable = true;
		rectangle_25.body.setSize(128, 128, false);
		rectangle_25.isFilled = true;
		this.add(rectangle_25);

		// rectangle_26
		const rectangle_26 = scene.add.rectangle(92, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_26.scaleX = 1.4671105764538728;
		rectangle_26.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_26, false);
		rectangle_26.body.allowGravity = false;
		rectangle_26.body.immovable = true;
		rectangle_26.body.setSize(128, 128, false);
		rectangle_26.isFilled = true;
		this.add(rectangle_26);

		// rectangle_27
		const rectangle_27 = scene.add.rectangle(92, 786, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_27.scaleX = 1.4671105764538728;
		rectangle_27.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_27, false);
		rectangle_27.body.allowGravity = false;
		rectangle_27.body.immovable = true;
		rectangle_27.body.setSize(128, 128, false);
		rectangle_27.isFilled = true;
		this.add(rectangle_27);

		// rectangle_28
		const rectangle_28 = scene.add.rectangle(528, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_28.scaleX = 1.4671105764538728;
		rectangle_28.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_28, false);
		rectangle_28.body.allowGravity = false;
		rectangle_28.body.immovable = true;
		rectangle_28.body.setSize(128, 128, false);
		rectangle_28.isFilled = true;
		this.add(rectangle_28);

		// rectangle_29
		const rectangle_29 = scene.add.rectangle(1399, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_29.scaleX = 1.4671105764538728;
		rectangle_29.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_29, false);
		rectangle_29.body.allowGravity = false;
		rectangle_29.body.immovable = true;
		rectangle_29.body.setSize(128, 128, false);
		rectangle_29.isFilled = true;
		this.add(rectangle_29);

		// rectangle_30
		const rectangle_30 = scene.add.rectangle(964, 186, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_30.scaleX = 1.4671105764538728;
		rectangle_30.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_30, false);
		rectangle_30.body.allowGravity = false;
		rectangle_30.body.immovable = true;
		rectangle_30.body.setSize(128, 128, false);
		rectangle_30.isFilled = true;
		this.add(rectangle_30);

		// rectangle_31
		const rectangle_31 = scene.add.rectangle(1835, 386, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_31.scaleX = 1.4671105764538728;
		rectangle_31.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_31, false);
		rectangle_31.body.allowGravity = false;
		rectangle_31.body.immovable = true;
		rectangle_31.body.setSize(128, 128, false);
		rectangle_31.isFilled = true;
		this.add(rectangle_31);

		// rectangle_32
		const rectangle_32 = scene.add.rectangle(1617, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_32.scaleX = 1.4671105764538728;
		rectangle_32.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_32, false);
		rectangle_32.body.allowGravity = false;
		rectangle_32.body.immovable = true;
		rectangle_32.body.setSize(128, 128, false);
		rectangle_32.isFilled = true;
		this.add(rectangle_32);

		// rectangle_33
		const rectangle_33 = scene.add.rectangle(1617, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_33.scaleX = 1.4671105764538728;
		rectangle_33.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_33, false);
		rectangle_33.body.allowGravity = false;
		rectangle_33.body.immovable = true;
		rectangle_33.body.setSize(128, 128, false);
		rectangle_33.isFilled = true;
		this.add(rectangle_33);

		// rectangle_34
		const rectangle_34 = scene.add.rectangle(964, 786, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_34.scaleX = 1.4671105764538728;
		rectangle_34.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_34, false);
		rectangle_34.body.allowGravity = false;
		rectangle_34.body.immovable = true;
		rectangle_34.body.setSize(128, 128, false);
		rectangle_34.isFilled = true;
		this.add(rectangle_34);

		// rectangle_35
		const rectangle_35 = scene.add.rectangle(528, 786, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_35.scaleX = 1.4671105764538728;
		rectangle_35.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_35, false);
		rectangle_35.body.allowGravity = false;
		rectangle_35.body.immovable = true;
		rectangle_35.body.setSize(128, 128, false);
		rectangle_35.isFilled = true;
		this.add(rectangle_35);

		// rectangle_36
		const rectangle_36 = scene.add.rectangle(746, 786, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_36.scaleX = 1.4671105764538728;
		rectangle_36.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_36, false);
		rectangle_36.body.allowGravity = false;
		rectangle_36.body.immovable = true;
		rectangle_36.body.setSize(128, 128, false);
		rectangle_36.isFilled = true;
		this.add(rectangle_36);

		// rectangle_37
		const rectangle_37 = scene.add.rectangle(310, 786, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_37.scaleX = 1.4671105764538728;
		rectangle_37.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_37, false);
		rectangle_37.body.allowGravity = false;
		rectangle_37.body.immovable = true;
		rectangle_37.body.setSize(128, 128, false);
		rectangle_37.isFilled = true;
		this.add(rectangle_37);

		// rectangle_38
		const rectangle_38 = scene.add.rectangle(1181, 786, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_38.scaleX = 1.4671105764538728;
		rectangle_38.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_38, false);
		rectangle_38.body.allowGravity = false;
		rectangle_38.body.immovable = true;
		rectangle_38.body.setSize(128, 128, false);
		rectangle_38.isFilled = true;
		this.add(rectangle_38);

		// rectangle_39
		const rectangle_39 = scene.add.rectangle(964, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_39.scaleX = 1.4671105764538728;
		rectangle_39.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_39, false);
		rectangle_39.body.allowGravity = false;
		rectangle_39.body.immovable = true;
		rectangle_39.body.setSize(128, 128, false);
		rectangle_39.isFilled = true;
		this.add(rectangle_39);

		// rectangle_40
		const rectangle_40 = scene.add.rectangle(746, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_40.scaleX = 1.4671105764538728;
		rectangle_40.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_40, false);
		rectangle_40.body.allowGravity = false;
		rectangle_40.body.immovable = true;
		rectangle_40.body.setSize(128, 128, false);
		rectangle_40.isFilled = true;
		this.add(rectangle_40);

		// rectangle_41
		const rectangle_41 = scene.add.rectangle(1835, 586, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_41.scaleX = 1.4671105764538728;
		rectangle_41.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_41, false);
		rectangle_41.body.allowGravity = false;
		rectangle_41.body.immovable = true;
		rectangle_41.body.setSize(128, 128, false);
		rectangle_41.isFilled = true;
		this.add(rectangle_41);

		// rectangle_42
		const rectangle_42 = scene.add.rectangle(1835, -14, 128, 128) as Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
		rectangle_42.scaleX = 1.4671105764538728;
		rectangle_42.scaleY = 0.1173690026501619;
		scene.physics.add.existing(rectangle_42, false);
		rectangle_42.body.allowGravity = false;
		rectangle_42.body.immovable = true;
		rectangle_42.body.setSize(128, 128, false);
		rectangle_42.isFilled = true;
		this.add(rectangle_42);

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
