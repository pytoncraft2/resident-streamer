
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import * as Colyseus from "colyseus.js"
import { RoomAvailable } from "colyseus.js";
import dotenv from "dotenv"
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// panel_score
		const panel_score = this.add.rectangle(1725.5065221655457, 951.0340658281718, 128, 128);
		panel_score.scaleX = 2.508579222484304;
		panel_score.scaleY = 0.6942479428696319;
		panel_score.isFilled = true;
		panel_score.fillColor = 0;
		panel_score.fillAlpha = 0.3;

		// texte_score
		const texte_score = this.add.text(1725.5065221655457, 951.0340658281718, "", {});
		texte_score.setOrigin(0.5, 0.5);
		texte_score.text = "Meilleurs classement 🏆";
		texte_score.setStyle({ "fontFamily": "CustomFontItalic", "fontSize": "28px" });

		// panel_score_1
		const panel_score_1 = this.add.rectangle(196.40998210374968, 540, 128, 128);
		panel_score_1.scaleX = 3.068905970371089;
		panel_score_1.scaleY = 8.514712616914972;
		panel_score_1.isFilled = true;
		panel_score_1.fillColor = 0;
		panel_score_1.fillAlpha = 0.21;

		// CustomFontNormal
		const customFontNormal = this.add.text(202.70499105187486, 88, "", {});
		customFontNormal.setOrigin(0.5, 0.5);
		customFontNormal.text = "Bienvenue !";
		customFontNormal.setStyle({ "align": "center", "fontFamily": "CustomFontItalic", "fontSize": "56px", "fontStyle": "bold" });

		// text
		const text = this.add.text(960, 68, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "🧟 COUCOU 🦾";
		text.setStyle({ "fontFamily": "CustomFontNormal", "fontSize": "49px" });

		// rectangle
		const rectangle = this.add.rectangle(-0.7049910518748277, 349, 128, 128);
		rectangle.scaleX = 3.068905970371089;
		rectangle.scaleY = 0.4845245709072934;
		rectangle.setOrigin(0, 0.5);
		rectangle.isFilled = true;
		rectangle.fillColor = 0;
		rectangle.fillAlpha = 0.1;

		// rectangle_1
		const rectangle_1 = this.add.rectangle(0, 419.01914507613355, 128, 128);
		rectangle_1.scaleX = 3.068905970371089;
		rectangle_1.scaleY = 0.4845245709072934;
		rectangle_1.setOrigin(0, 0.5);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		rectangle_1.fillAlpha = 0;

		// rectangle_2
		const rectangle_2 = this.add.rectangle(196.40998210374968, 312, 128, 128);
		rectangle_2.scaleX = 3.068905970371089;
		rectangle_2.scaleY = 0.021258305447056074;
		rectangle_2.isFilled = true;

		// rectangle_3
		const rectangle_3 = this.add.rectangle(0, 489.0382901522671, 128, 128);
		rectangle_3.scaleX = 3.068905970371089;
		rectangle_3.scaleY = 0.4845245709072934;
		rectangle_3.setOrigin(0, 0.5);
		rectangle_3.isFilled = true;
		rectangle_3.fillColor = 0;
		rectangle_3.fillAlpha = 0;

		// rectangle_1_1
		const rectangle_1_1 = this.add.rectangle(0, 559.0574352284007, 128, 128);
		rectangle_1_1.scaleX = 3.068905970371089;
		rectangle_1_1.scaleY = 0.4845245709072934;
		rectangle_1_1.setOrigin(0, 0.5);
		rectangle_1_1.isFilled = true;
		rectangle_1_1.fillColor = 0;
		rectangle_1_1.fillAlpha = 0;

		// text_1
		const text_1 = this.add.text(195.70499105187486, 347, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Salons";
		text_1.setStyle({ "fontFamily": "CustomFontItalic", "fontSize": "26px" });

		// lists
		const list: Array<any> = [];

		this.panel_score = panel_score;
		this.texte_score = texte_score;
		this.panel_score_1 = panel_score_1;
		this.list = list;

		this.events.emit("scene-awake");
	}

	public panel_score!: Phaser.GameObjects.Rectangle;
	public texte_score!: Phaser.GameObjects.Text;
	public panel_score_1!: Phaser.GameObjects.Rectangle;
	public list!: Array<any>;

	/* START-USER-CODE */
	client!: Colyseus.Client
	groupSalon!: Phaser.GameObjects.Group

	// Write your code here

	create() {

		this.editorCreate();

		
		dotenv.config()
		console.log(process.env.PORT);
		const group = this.add.group();
		this.groupSalon = group;

		let salonURL = window.location.pathname.slice(1)
		const params = new URLSearchParams(window.location.search)

		if (salonURL != '')
			if (params.get('p')) this.scene.start('Jeu', {salon: `${salonURL}`, personnage: `${params.get('p')}`})
			else this.scene.start('Lobby', {salon: `${salonURL}`, personnage: `${params.get('p')}`})
		else this.afficheAcceuil()
	}

	async afficheAcceuil() {

		const btn = [this.panel_score]
		for (let key of btn)
			key.setInteractive({ useHandCursor: true })
			.on('pointerover', () => {
				this.tweens.add({ targets: [this.panel_score], scaleX: 2, duration: 400, ease: 'Power3' })
			})
			.on('pointerout', () => {
				this.tweens.add({ targets: [this.panel_score], scaleX: 2.508579222484304, duration: 540, ease: 'Power3' })
			})
			.on('pointerdown', () => {
				this.scene.start("Scores")
			})

	this.client = new Colyseus.Client("wss://resident-streamer.servegame.com:3000")
	const client = this.client

	const lobby = await client.joinOrCreate("acceuil");

	let allRooms: RoomAvailable[] = [];

	lobby.onMessage("rooms", (rooms) => {
		allRooms = rooms;
		this.miseAjourListe(self, allRooms)
	});

	lobby.onMessage("+", ([roomId, room]) => {
		const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
		if (roomIndex !== -1) {
			allRooms[roomIndex] = room;
		} else {
			allRooms.push(room);
		}
		if (this.groupSalon) this.miseAjourListe(self, allRooms)
	});

	lobby.onMessage("-", (roomId) => {
		allRooms = allRooms.filter((room) => room.roomId !== roomId);
		this.miseAjourListe(self, allRooms)
	});

	const self = this;
	var element = this.add.dom(window.innerWidth / 2, window.innerHeight / 2).createFromCache('loginform');

	element.addListener('click');

	element.on('click', async function (this: any, event: Phaser.Input.Mouse.MouseManager) {

		if (event.target.name === 'loginButton')
		{
			var inputUsername = this.getChildByName('salon');

			//  Have they entered anything?
			if (inputUsername.value !== '')
			{
				//  Turn off the click events
				this.removeListener('click');

				this.scene.tweens.add({ targets: element, alpha: 0, duration: 200, ease: 'Power3',
				onComplete: async function ()
				{
					element.setVisible(false);
					const salon = inputUsername.value;
					lobby.leave()
					self.scene.start('Lobby', {salon: salon, id: false});
				}
			});
		}
		else
		{
			//  Flash the prompt
			this.scene.tweens.timeline({
				tweens: [{
					targets: element,
					x: element.x - 10,
					ease: 'Power1',
					duration: 50
				}],
				repeat: 4,
				yoyo: true
			});
		}
	}
});

this.tweens.add({
	targets: element,
	y: 300,
	duration: 3000,
	ease: 'Power3'
});

}



/**
* miseAjourListe - Met à jour la liste des lobby disponible
*
* @param  {Phaser.Scene} self: Phaser.Scene    Scene Phaser
* @param  {Object} allRooms: Object[]|string[] liste des rooms disponible
* @param  {String} text: any                   texte phaser et contenu à mettre à jour
* @param  {String} intro: string[]             texte de bienvenue
*/
miseAjourListe(self: any, allRooms: Object[]|string[]) {
	self.groupSalon.clear(true);
	allRooms.map((val: any) => {
		if (val.metadata) {
			let nomSalon = this.add.text(0, 0, [`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients}) 🔥`], { fontFamily: 'CustomFontNormal' }).setOrigin(0, 0.5).setFontSize(39);
			nomSalon.setInteractive({ useHandCursor: true })
			.on('pointerover', () => {
				this.tweens.add({ targets: this, alpha: 0.5, duration: 200, ease: 'Power3' })
			})
			.on('pointerout', () => {
				this.tweens.add({ targets: this, alpha: 1, duration: 500, ease: 'Power3' })
			})
			.on('pointerdown', () => {
				self.scene.stop('Level');
				self.scene.start('Lobby', {salon: val.metadata.nomRoom});
			})
			this.groupSalon.add(nomSalon);
			this.alignCorrectementListe(this.groupSalon)
		}
	})
}

alignCorrectementListe(group: Phaser.GameObjects.Group) {
	Phaser.Actions.GridAlign(group.getChildren(), {
		width: 1,
		height: 10,
		cellWidth: 200,
		cellHeight: 72,
		x: 164,
		y: 441
	});
}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
