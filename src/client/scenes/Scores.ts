
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import axios from "axios";
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

		// retour
		const retour = this.add.rectangle(95.75, 29, 128, 128);
		retour.scaleX = 1.4616145859770209;
		retour.scaleY = 0.43173181496874335;
		retour.isFilled = true;
		retour.fillColor = 9324681;
		retour.fillAlpha = 0.4;
		btnScore.add(retour);

		// text_9
		const text_9 = this.add.text(60.25, 13, "", {});
		text_9.text = "Retour";
		text_9.setStyle({ "fontFamily": "CustomFontNormal", "fontSize": "26px" });
		btnScore.add(text_9);

		// container_scores
		const container_scores = this.add.container(584, 368);
		btnScore.add(container_scores);

		// titre_scores
		const titre_scores = this.add.text(960, 152, "", {});
		titre_scores.setOrigin(0.5, 0.5);
		titre_scores.text = "🏆 SCORES 🏆";
		titre_scores.setStyle({ "fontSize": "36px" });

		this.btnScore = btnScore;
		this.boutonScore_1 = boutonScore_1;
		this.retour = retour;
		this.container_scores = container_scores;

		this.events.emit("scene-awake");
	}

	public btnScore!: Phaser.GameObjects.Layer;
	public boutonScore_1!: Phaser.GameObjects.Rectangle;
	public retour!: Phaser.GameObjects.Rectangle;
	public container_scores!: Phaser.GameObjects.Container;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		var graphics = this.make.graphics({
			x: 300,
			y: 200
		});

    graphics.fillRect(152, 133, 1000, 350);

    var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

		this.retour.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => {
			this.scene.start("Level")
		})
		// setTimeout(() => {
		// 	const article = { title: 'Axios POST Request Example' };
		// 	axios.post('http://localhost:3000/scores', article)
		// 	    .then(response => console.log(response));
		// }, 2000);
			var zone = this.add.zone(152, 133, 1000, 250).setOrigin(0).setInteractive().setDepth(40);
		axios.get("http://localhost:3000" + "/scores").then(res => {
			var tableau: any = []
			Object.entries(res.data).forEach((element: any, index: number) => {
				tableau.push("⏱️" + element[1].score + " - " + element[0] + " (" + element[1].joueurs.join(",") + ")\n")
			});
			var text = this.add.text(0, 0, tableau, { wordWrap: { width: 410 } }).setOrigin(0.5, 0.5);
			//960
			//464
			this.container_scores.add(text)
			this.container_scores.setPosition(960, 464)
			text.setMask(mask);

			zone.on('pointermove', function (pointer: any) {
				if (pointer.isDown)
				{
					text.y += (pointer.velocity.y / 10);

					text.y = Phaser.Math.Clamp(text.y, -400, 300);
				}
			});


		}).catch(err => {
			console.log(err)
		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
