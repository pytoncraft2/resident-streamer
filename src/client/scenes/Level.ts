
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import * as Colyseus from "colyseus.js"
import { RoomAvailable } from "colyseus.js";
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

		// layer
		const layer = this.add.layer();

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */
	client!: Colyseus.Client
	listeLobby: any
	listeRoom: any

	// Write your code here

	create() {

		this.editorCreate();

		let salonURL = window.location.pathname.slice(1)
		const params = new URLSearchParams(window.location.search)

		if (salonURL != '') {
			this.scene.start('Jeu', {salon: `${salonURL}`, personnage: `${params.get('p')}`})
		} else {
			this.afficheAcceuil()
			// console.log("RIEN A FAIRE")
		}
	}

	async afficheAcceuil() {

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

	document.body.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"
	// div.style.background = "radial-gradient(circle, rgba(101,9,121,1) 0%, rgba(114,1,151,1) 35%, rgba(52,2,89,1) 100%)"
	// div!.style.background = "url(https://geeko-media.lesoir.be/wp-content/uploads/2018/08/Resident-Evil-2-remake-1068x580.png) no-repeat center/cover";
	const self = this;
	var element = this.add.dom(window.innerWidth / 2, window.innerHeight / 2).createFromCache('loginform');

	console.log(element)
	element.addListener('click');

	element.on('click', async function (event: Phaser.Input.Mouse.MouseManager) {

		if (event.target.name === 'loginButton')
		{
			//@ts-ignore
			var inputUsername = this.getChildByName('salon');

			//  Have they entered anything?
			if (inputUsername.value !== '')
			{
				//  Turn off the click events
			//@ts-ignore
				this.removeListener('click');

				//@ts-ignore
				this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 1000, ease: 'Power3' });

				//@ts-ignore
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
			//@ts-ignore
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
