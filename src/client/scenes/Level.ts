
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
		const boutonScore = this.add.rectangle(1610, 296, 128, 128);
		boutonScore.scaleX = 2.2270445356590725;
		boutonScore.scaleY = 0.6321953827491891;
		boutonScore.isFilled = true;
		boutonScore.fillColor = 0;
		boutonScore.fillAlpha = 0.3;
		boutonScore.isStroked = true;
		boutonScore.strokeAlpha = 0.3;
		boutonScore.lineWidth = 4;
		btnScore.add(boutonScore);

		// texte_score
		const texte_score = this.add.text(1610, 296, "", {});
		texte_score.setOrigin(0.5, 0.5);
		texte_score.text = "Scores";
		texte_score.setStyle({ "fontFamily": "CustomFontItalic", "fontSize": "28px" });
		btnScore.add(texte_score);

		// boutonScore_1
		const boutonScore_1 = this.add.rectangle(1611, 556, 128, 128);
		boutonScore_1.scaleX = 2.2270445356590725;
		boutonScore_1.scaleY = 3.0228413760726456;
		boutonScore_1.isFilled = true;
		boutonScore_1.fillColor = 0;
		boutonScore_1.fillAlpha = 0.3;
		boutonScore_1.isStroked = true;
		boutonScore_1.strokeAlpha = 0.3;
		boutonScore_1.lineWidth = 4;
		btnScore.add(boutonScore_1);

		// text
		const text = this.add.text(1598, 404, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "🥇 equipe batman";
		text.setStyle({ "fontSize": "20px" });
		btnScore.add(text);

		// text_1
		const text_1 = this.add.text(1610, 439, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "🥇 equipe superman";
		text_1.setStyle({ "fontSize": "20px" });
		btnScore.add(text_1);

		// text_2
		const text_2 = this.add.text(1592, 471, "", {});
		text_2.setOrigin(0.5, 0.5);
		text_2.text = "🥇 equipe zorro";
		text_2.setStyle({ "fontSize": "20px" });
		btnScore.add(text_2);

		// text_3
		const text_3 = this.add.text(1610, 514, "", {});
		text_3.setOrigin(0.5, 0.5);
		text_3.text = "🥇 equipe katarina";
		text_3.setStyle({ "fontSize": "20px" });
		btnScore.add(text_3);

		// text_4
		const text_4 = this.add.text(1592, 559, "", {});
		text_4.setOrigin(0.5, 0.5);
		text_4.text = "🥇 equipe robin";
		text_4.setStyle({ "fontSize": "20px" });
		btnScore.add(text_4);

		// text_5
		const text_5 = this.add.text(1580, 605, "", {});
		text_5.setOrigin(0.5, 0.5);
		text_5.text = "🥇 equipe 007";
		text_5.setStyle({ "fontSize": "20px" });
		btnScore.add(text_5);

		// text_6
		const text_6 = this.add.text(1598, 645, "", {});
		text_6.setOrigin(0.5, 0.5);
		text_6.text = "🥇 equipe marcel";
		text_6.setStyle({ "fontSize": "20px" });
		btnScore.add(text_6);

		// voir_plus
		const voir_plus = this.add.text(1616, 717, "", {});
		voir_plus.setOrigin(0.5, 0.5);
		voir_plus.text = "Voir plus...";
		voir_plus.setStyle({ "fontSize": "20px", "fontStyle": "italic", "shadow.blur":3});
		btnScore.add(voir_plus);

		this.btnScore = btnScore;
		this.boutonScore = boutonScore;
		this.texte_score = texte_score;
		this.boutonScore_1 = boutonScore_1;
		this.voir_plus = voir_plus;

		this.events.emit("scene-awake");
	}

	public btnScore!: Phaser.GameObjects.Layer;
	public boutonScore!: Phaser.GameObjects.Rectangle;
	public texte_score!: Phaser.GameObjects.Text;
	public boutonScore_1!: Phaser.GameObjects.Rectangle;
	public voir_plus!: Phaser.GameObjects.Text;

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
		const btn = [this.boutonScore, this.voir_plus]
		for (let key of btn)
			key.setInteractive({ useHandCursor: true })
			.on('pointerdown', () => {
				this.scene.start("Scores")
			})

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
