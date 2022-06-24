
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

		// btnScore
		const btnScore = this.add.layer();

		// boutonScore
		const boutonScore = this.add.rectangle(1616, 814, 128, 128);
		boutonScore.scaleX = 2.140625073525671;
		boutonScore.scaleY = 0.5781249831011019;
		boutonScore.isFilled = true;
		boutonScore.fillColor = 0;
		boutonScore.fillAlpha = 0.3;
		boutonScore.isStroked = true;
		boutonScore.strokeAlpha = 0.3;
		boutonScore.lineWidth = 4;
		btnScore.add(boutonScore);

		// texte_score
		const texte_score = this.add.text(1616, 814, "", {});
		texte_score.setOrigin(0.5, 0.5);
		texte_score.text = "Scores";
		texte_score.setStyle({ "fontFamily": "CustomFontItalic", "fontSize": "28px" });
		btnScore.add(texte_score);

		this.btnScore = btnScore;
		this.boutonScore = boutonScore;
		this.texte_score = texte_score;

		this.events.emit("scene-awake");
	}

	public btnScore!: Phaser.GameObjects.Layer;
	public boutonScore!: Phaser.GameObjects.Rectangle;
	public texte_score!: Phaser.GameObjects.Text;

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

		console.log("INIT")
		console.log(this.boutonScore.y)
		this.boutonScore
		.setInteractive({ useHandCursor: true })
		.on('pointerdown', () => {
			if (this.boutonScore.height !== 1200)
			{
				this.tweens.add({ targets: [this.boutonScore, this.texte_score], height: 1200, y: 200, duration: 1000, ease: 'Power3' });
			}
			else
			{
				this.tweens.add({ targets: [this.boutonScore, this.texte_score], height: 128,y: 814, duration: 500, ease: 'Power3' });
			}
		})

		// this.tweens.add({ targets: this.btnScore, y: 0, duration: 1000, ease: 'Power3' });


	this.client = new Colyseus.Client("ws://localhost:3000")
	const client = this.client

	this.listeRoom = 0;
	this.listeLobby = []

	this.add.text(window.innerWidth/2, 100, 'RESIDENT STREAMER', { fontFamily: 'CustomFontNormal' }).setOrigin(0.5).setFontSize(45);

	let intro = ["Combatter le plus rapidement possible les 5 Boss du manoirs.", "De 1 à 4 joueurs !", "__________________", "Lobby disponible", "__________________"];

	var text = new Panel("Bienvenue !",intro , this, () => {
	})


	const lobby = await client.joinOrCreate("acceuil");

	let allRooms: RoomAvailable[] = [];

	lobby.onMessage("rooms", (rooms) => {
		allRooms = rooms;
		this.miseAjourListe(self, allRooms, text, intro)
	});

	lobby.onMessage("+", ([roomId, room]) => {
		const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
		if (roomIndex !== -1) {
			allRooms[roomIndex] = room;
		} else {
			allRooms.push(room);
		}
		this.miseAjourListe(self, allRooms, text, intro)
	});

	lobby.onMessage("-", (roomId) => {
		allRooms = allRooms.filter((room) => room.roomId !== roomId);
		this.miseAjourListe(self, allRooms, text, intro)
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
miseAjourListe(self: any, allRooms: Object[]|string[], text: any, intro: string[]) {
self.listeLobby = []
allRooms.map((val: any) => {
	if (val.metadata) {
		self.listeLobby.push(`${val.metadata.nomRoom} (${val.clients} / ${val.maxClients})`)
	}
})
text.setContenu(intro.concat(self.listeLobby))
}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
