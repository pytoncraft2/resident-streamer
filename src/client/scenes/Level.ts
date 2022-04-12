
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import PushOnClick from "../components/PushOnClick";
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

		// fufuSuperDino
		const fufuSuperDino = this.add.image(400, 235, "FufuSuperDino");

		// text
		const text = this.add.text(400, 436, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Phaser 3 + Phaser Editor 2D\nWebpack + TypeScript";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// fufuSuperDino (components)
		new PushOnClick(fufuSuperDino);

		this.fufuSuperDino = fufuSuperDino;
		this.text = text;

		this.events.emit("scene-awake");
	}

	public fufuSuperDino!: Phaser.GameObjects.Image;
	public text!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		let salonURL = window.location.pathname.slice(1)

		const params = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop as any),
		});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
console.log(params)
// let value = params.some_key; // "some_value"
		var parts = window.location.href.split('-');
		console.log("PPPPPPPARTS")
		console.log(parts)
		var lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash

console.log("LAST")
console.log(lastSegment);
		if (salonURL != '') {
			this.scene.start('Lobby', {salon: `${salonURL}`, personnage: `${lastSegment}`})
		} else {
			// this.afficheAcceuil()
			// console.log("RIEN A FAIRE")
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
