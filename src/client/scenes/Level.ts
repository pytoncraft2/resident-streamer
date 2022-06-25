
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import * as Colyseus from "colyseus.js"
import { RoomAvailable } from "colyseus.js";
import Button from "../utils/bouton"
import Panel from "../utils/panel";
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
		const panel_score = this.add.ellipse(1734, 540, 128, 128);
		panel_score.scaleX = 1.5286248291719469;
		panel_score.scaleY = 1.5286248291719469;
		panel_score.angle = -46;
		panel_score.isFilled = true;
		panel_score.fillColor = 0;
		panel_score.fillAlpha = 0.3;

		// texte_score
		const texte_score = this.add.text(1734, 540, "", {});
		texte_score.setOrigin(0.5, 0.5);
		texte_score.text = "Scores";
		texte_score.setStyle({ "fontFamily": "CustomFontItalic", "fontSize": "28px" });

		// panel_score_1
		const panel_score_1 = this.add.rectangle(202.70499105187486, 540, 128, 128);
		panel_score_1.scaleX = 3.068905970371089;
		panel_score_1.scaleY = 8.514712616914972;
		panel_score_1.isFilled = true;
		panel_score_1.fillColor = 0;
		panel_score_1.fillAlpha = 0.3;

		// CustomFontNormal
		const customFontNormal = this.add.text(202.70499105187486, 88, "", {});
		customFontNormal.setOrigin(0.5, 0.5);
		customFontNormal.text = "Bienvenue !";
		customFontNormal.setStyle({ "align": "center", "fontFamily": "CustomFontNormal", "fontSize": "56px", "fontStyle": "bold" });

		this.panel_score = panel_score;
		this.texte_score = texte_score;
		this.panel_score_1 = panel_score_1;

		this.events.emit("scene-awake");
	}

	public panel_score!: Phaser.GameObjects.Ellipse;
	public texte_score!: Phaser.GameObjects.Text;
	public panel_score_1!: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */
	client!: Colyseus.Client
	listeLobby: any
	listeRoom: any

	// Write your code here

	create() {

		this.editorCreate();

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
				this.tweens.add({ targets: [this.panel_score], scale: 2, duration: 400, ease: 'Power3' })
			})
			.on('pointerout', () => {
				this.tweens.add({ targets: [this.panel_score], scale: 1, duration: 540, ease: 'Power3' })
			})
			.on('pointerdown', () => {
				this.scene.start("Scores")
			})

	this.client = new Colyseus.Client("ws://localhost:3000")
	const client = this.client

	this.listeRoom = 0;
	this.listeLobby = []

	// this.add.text(window.innerWidth/2, 100, 'RESIDENT STREAMER', { fontFamily: 'CustomFontNormal' }).setOrigin(0.5).setFontSize(45);

	// let intro = ["Combatter le plus rapidement possible les 5 Boss du manoirs.", "De 1 à 4 joueurs !", "__________________", "Lobby disponible", "__________________"];

	// var text = new Panel("Bienvenue !",[""] , this, () => {
	// })
	var text = this.add.text(20, 50, [""], { fontFamily: 'CustomFontNormal' }).setOrigin(0).setFontSize(39);



	const lobby = await client.joinOrCreate("acceuil");

	let allRooms: RoomAvailable[] = [];

	lobby.onMessage("rooms", (rooms) => {
		allRooms = rooms;
		this.miseAjourListe(self, allRooms, text)
	});

	lobby.onMessage("+", ([roomId, room]) => {
		const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
		if (roomIndex !== -1) {
			allRooms[roomIndex] = room;
		} else {
			allRooms.push(room);
		}
		this.miseAjourListe(self, allRooms, text)
	});

	lobby.onMessage("-", (roomId) => {
		allRooms = allRooms.filter((room) => room.roomId !== roomId);
		this.miseAjourListe(self, allRooms, text)
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

				this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 1000, ease: 'Power3' });

				this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 1000, ease: 'Power3',
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
miseAjourListe(self: any, allRooms: Object[]|string[], text: any) {
self.listeLobby = []
allRooms.map((val: any) => {
	if (val.metadata) {
		self.listeLobby.push(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`)
	}
})
text.setText(self.listeLobby)
}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
