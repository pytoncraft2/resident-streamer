
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

		// btnScore
		const btnScore = this.add.layer();

		// boutonScore_1
		const boutonScore_1 = this.add.rectangle(960, 516, 128, 128);
		boutonScore_1.scaleX = 8.45130877748806;
		boutonScore_1.scaleY = 3.5604647534054576;
		boutonScore_1.isFilled = true;
		boutonScore_1.fillColor = 0;
		boutonScore_1.fillAlpha = 0.3;
		boutonScore_1.isStroked = true;
		boutonScore_1.strokeAlpha = 0.3;
		boutonScore_1.lineWidth = 4;
		btnScore.add(boutonScore_1);

		// text
		const text = this.add.text(914, 370, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "🥉 equipe batman";
		text.setStyle({ "fontSize": "20px" });
		btnScore.add(text);

		// text_1
		const text_1 = this.add.text(926, 405, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "🥉 equipe superman";
		text_1.setStyle({ "fontSize": "20px" });
		btnScore.add(text_1);

		// text_2
		const text_2 = this.add.text(908, 437, "", {});
		text_2.setOrigin(0.5, 0.5);
		text_2.text = "🥉 equipe zorro";
		text_2.setStyle({ "fontSize": "20px" });
		btnScore.add(text_2);

		// text_3
		const text_3 = this.add.text(926, 480, "", {});
		text_3.setOrigin(0.5, 0.5);
		text_3.text = "🥉 equipe katarina";
		text_3.setStyle({ "fontSize": "20px" });
		btnScore.add(text_3);

		// text_4
		const text_4 = this.add.text(908, 525, "", {});
		text_4.setOrigin(0.5, 0.5);
		text_4.text = "🥉 equipe robin";
		text_4.setStyle({ "fontSize": "20px" });
		btnScore.add(text_4);

		// text_5
		const text_5 = this.add.text(896, 571, "", {});
		text_5.setOrigin(0.5, 0.5);
		text_5.text = "🥉 equipe 007";
		text_5.setStyle({ "fontSize": "20px" });
		btnScore.add(text_5);

		// text_6
		const text_6 = this.add.text(914, 611, "", {});
		text_6.setOrigin(0.5, 0.5);
		text_6.text = "🥇 equipe marcel";
		text_6.setStyle({ "fontSize": "20px" });
		btnScore.add(text_6);

		// voir_plus
		const voir_plus = this.add.text(960, 703, "", {});
		voir_plus.setOrigin(0.5, 0.5);
		voir_plus.text = "Voir plus...";
		voir_plus.setStyle({ "fontSize": "20px", "fontStyle": "italic", "shadow.blur":3});
		btnScore.add(voir_plus);

		// text_7
		const text_7 = this.add.text(1180, 373, "", {});
		text_7.setOrigin(0.5, 0.5);
		text_7.text = "🥇 equipe batman";
		text_7.setStyle({ "fontSize": "20px" });
		btnScore.add(text_7);

		// text_1_1
		const text_1_1 = this.add.text(1192, 408, "", {});
		text_1_1.setOrigin(0.5, 0.5);
		text_1_1.text = "🥇 equipe superman";
		text_1_1.setStyle({ "fontSize": "20px" });
		btnScore.add(text_1_1);

		// text_2_1
		const text_2_1 = this.add.text(1174, 440, "", {});
		text_2_1.setOrigin(0.5, 0.5);
		text_2_1.text = "🥇 equipe zorro";
		text_2_1.setStyle({ "fontSize": "20px" });
		btnScore.add(text_2_1);

		// text_3_1
		const text_3_1 = this.add.text(1192, 483, "", {});
		text_3_1.setOrigin(0.5, 0.5);
		text_3_1.text = "🥇 equipe katarina";
		text_3_1.setStyle({ "fontSize": "20px" });
		btnScore.add(text_3_1);

		// text_4_1
		const text_4_1 = this.add.text(1174, 528, "", {});
		text_4_1.setOrigin(0.5, 0.5);
		text_4_1.text = "🥇 equipe robin";
		text_4_1.setStyle({ "fontSize": "20px" });
		btnScore.add(text_4_1);

		// text_5_1
		const text_5_1 = this.add.text(1162, 574, "", {});
		text_5_1.setOrigin(0.5, 0.5);
		text_5_1.text = "🥇 equipe 007";
		text_5_1.setStyle({ "fontSize": "20px" });
		btnScore.add(text_5_1);

		// text_6_1
		const text_6_1 = this.add.text(1180, 614, "", {});
		text_6_1.setOrigin(0.5, 0.5);
		text_6_1.text = "🥇 equipe marcel";
		text_6_1.setStyle({ "fontSize": "20px" });
		btnScore.add(text_6_1);

		// text_8
		const text_8 = this.add.text(602, 368, "", {});
		text_8.setOrigin(0.5, 0.5);
		text_8.text = "🥇 equipe batman";
		text_8.setStyle({ "fontSize": "20px" });
		btnScore.add(text_8);

		// text_1_2
		const text_1_2 = this.add.text(614, 403, "", {});
		text_1_2.setOrigin(0.5, 0.5);
		text_1_2.text = "🥇 equipe superman";
		text_1_2.setStyle({ "fontSize": "20px" });
		btnScore.add(text_1_2);

		// text_2_2
		const text_2_2 = this.add.text(596, 435, "", {});
		text_2_2.setOrigin(0.5, 0.5);
		text_2_2.text = "🥇 equipe zorro";
		text_2_2.setStyle({ "fontSize": "20px" });
		btnScore.add(text_2_2);

		// text_3_2
		const text_3_2 = this.add.text(614, 478, "", {});
		text_3_2.setOrigin(0.5, 0.5);
		text_3_2.text = "🥈 equipe katarina";
		text_3_2.setStyle({ "fontSize": "20px" });
		btnScore.add(text_3_2);

		// text_4_2
		const text_4_2 = this.add.text(596, 523, "", {});
		text_4_2.setOrigin(0.5, 0.5);
		text_4_2.text = "🥈 equipe robin";
		text_4_2.setStyle({ "fontSize": "20px" });
		btnScore.add(text_4_2);

		// text_5_2
		const text_5_2 = this.add.text(584, 569, "", {});
		text_5_2.setOrigin(0.5, 0.5);
		text_5_2.text = "🥈 equipe 007";
		text_5_2.setStyle({ "fontSize": "20px" });
		btnScore.add(text_5_2);

		// text_6_2
		const text_6_2 = this.add.text(602, 609, "", {});
		text_6_2.setOrigin(0.5, 0.5);
		text_6_2.text = "🥈 equipe marcel";
		text_6_2.setStyle({ "fontSize": "20px" });
		btnScore.add(text_6_2);

		// titre_scores
		const titre_scores = this.add.text(960, 152, "", {});
		titre_scores.setOrigin(0.5, 0.5);
		titre_scores.text = "🏆 SCORES 🏆";
		titre_scores.setStyle({ "fontSize": "36px" });

		this.btnScore = btnScore;
		this.boutonScore_1 = boutonScore_1;
		this.voir_plus = voir_plus;

		this.events.emit("scene-awake");
	}

	public btnScore!: Phaser.GameObjects.Layer;
	public boutonScore_1!: Phaser.GameObjects.Rectangle;
	public voir_plus!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		var content = [
			"The sky above the port was the color of television, tuned to a dead channel.",
			"`It's not like I'm using,' Case heard someone say, as he shouldered his way ",
			"through the crowd around the door of the Chat. `It's like my body's developed",
			"this massive drug deficiency.' It was a Sprawl voice and a Sprawl joke.",
			"The Chatsubo was a bar for professional expatriates; you could drink there for",
			"a week and never hear two words in Japanese.",
			"",
			"Ratz was tending bar, his prosthetic arm jerking monotonously as he filled a tray",
			"of glasses with draft Kirin. He saw Case and smiled, his teeth a webwork of",
			"East European steel and brown decay. Case found a place at the bar, between the",
			"unlikely tan on one of Lonny Zone's whores and the crisp naval uniform of a tall",
			"African whose cheekbones were ridged with precise rows of tribal scars. `Wage was",
			"in here early, with two joeboys,' Ratz said, shoving a draft across the bar with",
			"his good hand. `Maybe some business with you, Case?'",
			"",
			"Case shrugged. The girl to his right giggled and nudged him.",
			"The bartender's smile widened. His ugliness was the stuff of legend. In an age of",
			"affordable beauty, there was something heraldic about his lack of it. The antique",
			"arm whined as he reached for another mug.",
			"",
			"",
			"From Neuromancer by William Gibson"
		];

		//@ts-ignore
		var graphics = this.make.graphics();

		// graphics.fillStyle(0xffffff);
		graphics.fillRect(252, 133, 320, 250);

		var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

		var text = this.add.text(160, 280, content, { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: 310 } }).setOrigin(0);

		text.setMask(mask);

		// this.boutonScore_1.setMask(mask)

		//  The rectangle they can 'drag' within
		var zone = this.add.zone(152, 130, 320, 256).setOrigin(0).setInteractive();

		zone.on('pointermove', function (pointer: any) {

			if (pointer.isDown)
			{
				text.y += (pointer.velocity.y / 10);

				text.y = Phaser.Math.Clamp(text.y, -400, 300);
			}

		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
