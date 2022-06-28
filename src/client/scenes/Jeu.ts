
// You can write more code here
export interface Initialisation {
    salon: string;
    personnage: string;
};

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import * as Colyseus from "colyseus.js"
import { deepEqual } from "../components/deepEqual"
/* END-USER-IMPORTS */

export default class Jeu extends Phaser.Scene {

	constructor() {
		super("Jeu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(914.5, 446.5, "", {});
		text.text = "Jeu";
		text.setStyle({ "fontSize": "50px" });

		// platforme
		const platforme = this.add.rectangle(955, 862, 128, 128);
		platforme.scaleX = 43.50112225681497;
		platforme.scaleY = 1.449878006775927;
		platforme.isFilled = true;

		// map_boss1
		const map_boss1 = this.add.image(2820, 486, "map_boss1");
		map_boss1.scaleX = 2.868376959115476;
		map_boss1.scaleY = 2.7049866133838867;

		// map_boss2
		const map_boss2 = this.add.image(-914, 489, "map_hall0");
		map_boss2.scaleX = 2.90778858976818;
		map_boss2.scaleY = 2.5991763141421007;

		// map_hall1
		const map_hall1 = this.add.image(-2589, 488, "map_hall1");
		map_hall1.scaleX = 2.244013013382078;
		map_hall1.scaleY = 2.4560336835205145;

		// hall
		const hall = this.add.image(965, 472, "map_hall0");
		hall.scaleX = 3.050716137046624;
		hall.scaleY = 2.6263611373944493;

		// barreHautContainer
		const barreHautContainer = this.add.container(0, 0);

		// barreHaut
		const barreHaut = this.add.rectangle(960, 49.668697357177734, 128, 128);
		barreHaut.scaleX = 15.008021207026625;
		barreHaut.scaleY = 0.7760734119973385;
		barreHaut.isFilled = true;
		barreHaut.fillColor = 0;
		barreHaut.fillAlpha = 0.4;
		barreHautContainer.add(barreHaut);

		// ellipse
		const ellipse = this.add.ellipse(212.21864318847656, 44, 128, 128);
		ellipse.scaleX = 0.559447842259604;
		ellipse.scaleY = 0.5348936558907118;
		ellipse.isFilled = true;
		barreHautContainer.add(ellipse);

		// ellipse_1
		const ellipse_1 = this.add.ellipse(130.6093292236328, 44, 128, 128);
		ellipse_1.scaleX = 0.559447842259604;
		ellipse_1.scaleY = 0.5348936558907118;
		ellipse_1.isFilled = true;
		barreHautContainer.add(ellipse_1);

		// ellipse_3
		const ellipse_3 = this.add.ellipse(293.8279724121094, 44, 128, 128);
		ellipse_3.scaleX = 0.559447842259604;
		ellipse_3.scaleY = 0.5348936558907118;
		ellipse_3.isFilled = true;
		barreHautContainer.add(ellipse_3);

		// ellipse_2
		const ellipse_2 = this.add.ellipse(375.4372863769531, 44, 128, 128);
		ellipse_2.scaleX = 0.559447842259604;
		ellipse_2.scaleY = 0.5348936558907118;
		ellipse_2.isFilled = true;
		barreHautContainer.add(ellipse_2);

		// ellipse_4
		const ellipse_4 = this.add.ellipse(49, 44, 128, 128);
		ellipse_4.scaleX = 0.559447842259604;
		ellipse_4.scaleY = 0.5348936558907118;
		ellipse_4.isFilled = true;
		barreHautContainer.add(ellipse_4);

		// text_2
		const text_2 = this.add.text(362, 22, "", {});
		text_2.text = "?";
		text_2.setStyle({ "color": "#000000ff", "fontSize": "45px" });
		barreHautContainer.add(text_2);

		// text_2_1
		const text_2_1 = this.add.text(280.5, 24, "", {});
		text_2_1.text = "?";
		text_2_1.setStyle({ "color": "#000000ff", "fontSize": "45px" });
		barreHautContainer.add(text_2_1);

		// text_2_2
		const text_2_2 = this.add.text(198, 25, "", {});
		text_2_2.text = "?";
		text_2_2.setStyle({ "color": "#000000ff", "fontSize": "45px" });
		barreHautContainer.add(text_2_2);

		// text_2_3
		const text_2_3 = this.add.text(117, 23, "", {});
		text_2_3.text = "?";
		text_2_3.setStyle({ "color": "#000000ff", "fontSize": "45px" });
		barreHautContainer.add(text_2_3);

		// movechaiseboss1
		const movechaiseboss1 = this.add.image(50, 46, "movechaiseboss1");
		movechaiseboss1.scaleX = 0.08199632417946795;
		movechaiseboss1.scaleY = 0.08199632417946795;
		barreHautContainer.add(movechaiseboss1);

		// compteur
		const compteur = this.add.text(1676, 20, "", {});
		compteur.text = "00:00:00";
		compteur.setStyle({ "fontSize": "45px" });
		barreHautContainer.add(compteur);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(446, 44, 128, 128);
		rectangle_1.scaleX = 9.471436955268851;
		rectangle_1.scaleY = -0.3281694373032557;
		rectangle_1.setOrigin(0, 0.5);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		rectangle_1.fillAlpha = 0.6;
		barreHautContainer.add(rectangle_1);

		// vie_boss_1
		const vie_boss_1 = this.add.rectangle(447, 44, 128, 128);
		vie_boss_1.scaleX = 9.458194301370158;
		vie_boss_1.scaleY = 0.30320712838431607;
		vie_boss_1.setOrigin(0, 0.5);
		vie_boss_1.isFilled = true;
		vie_boss_1.fillColor = 10882574;
		vie_boss_1.fillAlpha = 0.8;
		barreHautContainer.add(vie_boss_1);

		// indicationGauche
		const indicationGauche = this.add.container(0, 0);

		// triangle
		const triangle = this.add.triangle(29, 473, 0, 128, 64, 0, 128, 128);
		triangle.scaleX = 0.4380104140019478;
		triangle.scaleY = 0.4380104140019478;
		triangle.angle = -90;
		triangle.isFilled = true;
		triangle.fillColor = 2330047;
		indicationGauche.add(triangle);

		// ellipse_1_1
		const ellipse_1_1 = this.add.ellipse(76, 472.5, 128, 128);
		ellipse_1_1.scaleX = 0.559447842259604;
		ellipse_1_1.scaleY = 0.5348936558907118;
		ellipse_1_1.isFilled = true;
		indicationGauche.add(ellipse_1_1);

		// text_2_3_1
		const text_2_3_1 = this.add.text(63, 449.5, "", {});
		text_2_3_1.text = "?";
		text_2_3_1.setStyle({ "color": "#000000ff", "fontSize": "45px" });
		indicationGauche.add(text_2_3_1);

		// indicationDroite
		const indicationDroite = this.add.container(0, 0);

		// triangle_1
		const triangle_1 = this.add.triangle(1857, 473, 0, 128, 64, 0, 128, 128);
		triangle_1.scaleX = 0.4380104140019478;
		triangle_1.scaleY = 0.4380104140019478;
		triangle_1.angle = 90;
		triangle_1.isFilled = true;
		triangle_1.fillColor = 2330047;
		indicationDroite.add(triangle_1);

		// ellipse_4_1
		const ellipse_4_1 = this.add.ellipse(1809, 472.5, 128, 128);
		ellipse_4_1.scaleX = 0.559447842259604;
		ellipse_4_1.scaleY = 0.5348936558907118;
		ellipse_4_1.isFilled = true;
		indicationDroite.add(ellipse_4_1);

		// movechaiseboss1_1
		const movechaiseboss1_1 = this.add.image(1810, 472.5, "movechaiseboss1");
		movechaiseboss1_1.scaleX = 0.08199632417946795;
		movechaiseboss1_1.scaleY = 0.08199632417946795;
		indicationDroite.add(movechaiseboss1_1);

		// barre_etat_joueur
		const barre_etat_joueur = this.add.container(395, 466);

		// barre_etat
		const barre_etat = this.add.container(-39, 21);
		barre_etat_joueur.add(barre_etat);

		// p1
		const p1 = this.add.rectangle(1, 939, 128, 128);
		p1.scaleX = 14.993211052385613;
		p1.scaleY = -0.08853600509578045;
		p1.setOrigin(0, 0.5);
		p1.isFilled = true;
		p1.fillColor = 10563832;

		// rectangle_2
		const rectangle_2 = this.add.rectangle(960, 1021, 128, 128);
		rectangle_2.scaleX = 7.706419353393023;
		rectangle_2.scaleY = 0.995444225494233;
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 0;
		rectangle_2.fillAlpha = 0.6;

		// ellipse_5_1
		const ellipse_5_1 = this.add.ellipse(613, 1053, 128, 128);
		ellipse_5_1.scaleX = 0.37184784435596524;
		ellipse_5_1.scaleY = 0.37184784435596524;
		ellipse_5_1.isFilled = true;
		ellipse_5_1.fillColor = 3602747;
		ellipse_5_1.fillAlpha = 0;

		// ellipse_5
		const ellipse_5 = this.add.ellipse(541, 1018, 128, 128);
		ellipse_5.scaleX = 0.8179399157486755;
		ellipse_5.scaleY = 0.8179399157486755;
		ellipse_5.isFilled = true;
		ellipse_5.fillColor = 3602747;

		// profilFakhear
		const profilFakhear = this.add.image(541, 1018, "profilFakhear");
		profilFakhear.scaleX = 0.3983080418637645;
		profilFakhear.scaleY = 0.3983080418637645;

		// profilFakhear_1
		const profilFakhear_1 = this.add.image(613, 1053, "profilFakhear");
		profilFakhear_1.scaleX = 0.16275708974409425;
		profilFakhear_1.scaleY = 0.16275708974409425;

		// sous_barre_vie_joueur
		const sous_barre_vie_joueur = this.add.rectangle(712, 1055, 128, 128);
		sous_barre_vie_joueur.scaleX = 5.150602609693634;
		sous_barre_vie_joueur.scaleY = 0.21267753602571016;
		sous_barre_vie_joueur.setOrigin(0, 0.5);
		sous_barre_vie_joueur.isFilled = true;
		sous_barre_vie_joueur.fillColor = 13372942;

		// vie_joueur
		const vie_joueur = this.add.rectangle(712, 1055, 128, 128);
		vie_joueur.scaleX = 5.150602609693634;
		vie_joueur.scaleY = 0.21267753602571016;
		vie_joueur.setOrigin(0, 0.5);
		vie_joueur.isFilled = true;
		vie_joueur.fillColor = 15554289;

		// rectangle_4
		const rectangle_4 = this.add.rectangle(935, 997, 128, 128);
		rectangle_4.scaleX = 0.4926742586809625;
		rectangle_4.scaleY = 0.4926742586809625;
		rectangle_4.isFilled = true;
		rectangle_4.fillColor = 9965769;
		rectangle_4.fillAlpha = 0.1;
		rectangle_4.isStroked = true;

		// text_3
		const text_3 = this.add.text(935, 997, "", {});
		text_3.setOrigin(0.5, 0.5);
		text_3.text = "A";
		text_3.setStyle({ "fontSize": "26px" });

		// rectangle_4_1
		const rectangle_4_1 = this.add.rectangle(1004, 997, 128, 128);
		rectangle_4_1.scaleX = 0.4926742586809625;
		rectangle_4_1.scaleY = 0.4926742586809625;
		rectangle_4_1.isFilled = true;
		rectangle_4_1.fillColor = 9965769;
		rectangle_4_1.fillAlpha = 0.1;
		rectangle_4_1.isStroked = true;

		// text_3_1
		const text_3_1 = this.add.text(1004, 997, "", {});
		text_3_1.setOrigin(0.5, 0.5);
		text_3_1.text = "Z";
		text_3_1.setStyle({ "fontSize": "26px" });

		// rectangle_4_2
		const rectangle_4_2 = this.add.rectangle(1073, 997.0000000000001, 128, 128);
		rectangle_4_2.scaleX = 0.4926742586809625;
		rectangle_4_2.scaleY = 0.4926742586809625;
		rectangle_4_2.isFilled = true;
		rectangle_4_2.fillColor = 9965769;
		rectangle_4_2.fillAlpha = 0.1;
		rectangle_4_2.isStroked = true;

		// text_E
		const text_E = this.add.text(1073, 997, "", {});
		text_E.setOrigin(0.5, 0.5);
		text_E.text = "E";
		text_E.setStyle({ "fontSize": "26px" });

		// rectangle_4_2_1
		const rectangle_4_2_1 = this.add.rectangle(1142, 997, 128, 128);
		rectangle_4_2_1.scaleX = 0.4926742586809625;
		rectangle_4_2_1.scaleY = 0.4926742586809625;
		rectangle_4_2_1.isFilled = true;
		rectangle_4_2_1.fillColor = 9965769;
		rectangle_4_2_1.fillAlpha = 0.1;
		rectangle_4_2_1.isStroked = true;
		rectangle_4_2_1.strokeColor = 3155237;

		// text_3_2_1
		const text_3_2_1 = this.add.text(1142, 998, "", {});
		text_3_2_1.setOrigin(0.5, 0.5);
		text_3_2_1.text = "R";
		text_3_2_1.setStyle({ "color": "#5a4747ff", "fontSize": "26px" });

		// rectangle_4_3
		const rectangle_4_3 = this.add.rectangle(796, 993, 128, 128);
		rectangle_4_3.scaleX = 1.3025571558163676;
		rectangle_4_3.scaleY = 0.3373770596916607;
		rectangle_4_3.isFilled = true;
		rectangle_4_3.fillColor = 9965769;
		rectangle_4_3.fillAlpha = 0.1;
		rectangle_4_3.isStroked = true;
		rectangle_4_3.strokeColor = 3155237;

		// rectangle_5
		const rectangle_5 = this.add.rectangle(780, 982, 128, 128);
		rectangle_5.scaleX = 0.7998016954981302;
		rectangle_5.scaleY = 0.04630570216976848;
		rectangle_5.isFilled = true;
		rectangle_5.fillColor = 5916487;

		// rectangle_5_1
		const rectangle_5_1 = this.add.rectangle(818, 1002, 128, 128);
		rectangle_5_1.scaleX = 0.7998016954981302;
		rectangle_5_1.scaleY = 0.04630570216976848;
		rectangle_5_1.isFilled = true;
		rectangle_5_1.fillColor = 5916487;

		// triangle_2
		const triangle_2 = this.add.triangle(868, 1002, 0, 128, 64, 0, 128, 128);
		triangle_2.scaleX = 0.12492350627216228;
		triangle_2.scaleY = 0.12492350627216228;
		triangle_2.angle = 90;
		triangle_2.isFilled = true;
		triangle_2.fillColor = 5916487;

		// triangle_2_1
		const triangle_2_1 = this.add.triangle(725, 982, 0, 128, 64, 0, 128, 128);
		triangle_2_1.scaleX = 0.12492350627216228;
		triangle_2_1.scaleY = 0.12492350627216228;
		triangle_2_1.angle = -90;
		triangle_2_1.isFilled = true;
		triangle_2_1.fillColor = 5916487;

		// text_4
		const text_4 = this.add.text(754, 1018, "", {});
		text_4.text = "Fusionner";
		text_4.setStyle({ "color": "#5a4747ff" });

		// text_5
		const text_5 = this.add.text(915, 1012, "", {});
		text_5.scaleX = 0.8383656155133609;
		text_5.scaleY = 0.8383656155133609;
		text_5.text = "cross";

		// text_5_1
		const text_5_1 = this.add.text(986, 1012, "", {});
		text_5_1.scaleX = 0.8383656155133609;
		text_5_1.scaleY = 0.8383656155133609;
		text_5_1.text = "dash";

		// text_5_1_1
		const text_5_1_1 = this.add.text(1056, 1012, "", {});
		text_5_1_1.scaleX = 0.8383656155133609;
		text_5_1_1.scaleY = 0.8383656155133609;
		text_5_1_1.text = "kick";

		// text_4_1
		const text_4_1 = this.add.text(840, 973, "", {});
		text_4_1.text = "Tab";
		text_4_1.setStyle({ "color": "#5a4747ff" });

		this.map_boss1 = map_boss1;
		this.map_boss2 = map_boss2;
		this.hall = hall;
		this.barreHautContainer = barreHautContainer;
		this.barreHaut = barreHaut;
		this.compteur = compteur;
		this.vie_boss_1 = vie_boss_1;
		this.indicationGauche = indicationGauche;
		this.indicationDroite = indicationDroite;
		this.barre_etat_joueur = barre_etat_joueur;
		this.barre_etat = barre_etat;
		this.sous_barre_vie_joueur = sous_barre_vie_joueur;
		this.vie_joueur = vie_joueur;

		this.events.emit("scene-awake");
	}

	public map_boss1!: Phaser.GameObjects.Image;
	public map_boss2!: Phaser.GameObjects.Image;
	public hall!: Phaser.GameObjects.Image;
	public barreHautContainer!: Phaser.GameObjects.Container;
	public barreHaut!: Phaser.GameObjects.Rectangle;
	public compteur!: Phaser.GameObjects.Text;
	public vie_boss_1!: Phaser.GameObjects.Rectangle;
	public indicationGauche!: Phaser.GameObjects.Container;
	public indicationDroite!: Phaser.GameObjects.Container;
	public barre_etat_joueur!: Phaser.GameObjects.Container;
	public barre_etat!: Phaser.GameObjects.Container;
	public sous_barre_vie_joueur!: Phaser.GameObjects.Rectangle;
	public vie_joueur!: Phaser.GameObjects.Rectangle;

	/* START-USER-CODE */

	// Write your code here


	client!: Colyseus.Client
  players!: Phaser.GameObjects.Group
  enemies!: Phaser.GameObjects.Group
  groupeBoules!: Phaser.GameObjects.Group
  groupeKunais!: Phaser.GameObjects.Group
  groupeBombes!: Phaser.GameObjects.Group
  groupeProjectiles!: Phaser.GameObjects.Group
  projectilesRef: any
  session?: string
  playersRef: any
  bombesRef: any
  lignesRef: any
  rectanglesRef: any
  groupeLignes!: Phaser.GameObjects.Group
  groupeRectangles!: Phaser.GameObjects.Group
  currentRoom: string = 'hall'
  listCurrentRoom: any
  ennemyRef: any
  boulesRef: any
  kunaisRef: any
  salon?: string
  keyboard!: any
  room?: Colyseus.Room<unknown>
  rooms: any
  personnage?: string
  compte: number = 0
  prevInputs?: { a: boolean, z: boolean, e: boolean, r: boolean, space: boolean, right: boolean, left: boolean, tab: boolean }
  attaqueDirecte: boolean = false
  directeA: boolean = false
  emitter: any
  animationBoosFigurine: any
  rect: any
  gfx!: Phaser.GameObjects.Graphics



	init(info: Initialisation)  {
		this.salon = info.salon
		this.personnage = info.personnage
	}


	async create() {

		this.editorCreate();
    this.cameras.main.fadeIn(4000);

/*
    var epic_musique = this.sound.add('epic_musique');

		epic_musique.play({
			loop: true
		});
    */

    // new Ligne(fakhear.scene, 600, 200, 0, 0, 140, 0, 0x1a65ac, 1, '12345')
    // var r3 = this.add.line(600, 200, 0, 0, 140, 0, 0x7fff00, 1)

    // const rectangle_2 = this.add.rectangle(716.7470889640784, 894.3987579810794, 128, 128);
    // rectangle_2.scaleX = 4.6929101228048555;
    // rectangle_2.scaleY = 0.11649497828162556;
    // rectangle_2.setOrigin(0, 0.5);
    // rectangle_2.isFilled = true;
    // rectangle_2.fillColor = 0x000000;


    const p1 = this.add.rectangle(1, 939, 128, 128);
    p1.scaleX = 14.993211052385613;
    p1.scaleY = -0.08853600509578045;
    p1.setOrigin(0, 0.5);
    p1.isFilled = true;
    p1.fillColor = 10563832;


    this.anims.create({
      key: "huzounet_shuriken",
      frames: this.anims.generateFrameNames('huzounet_atlas', { prefix: 'shuriken', start: 0, end: 3 }),
      frameRate: 23,
      repeat: -1
    })


    this.rooms = []
    this.listCurrentRoom = {
      hall: {
        w: this.hall.getLeftCenter().x - 30
      },
      boss1: {
        w: this.hall.displayWidth
      },
      boss2: {
        w: this.map_boss2.getLeftCenter().x - 100
      }
    }

    // this.time.addEvent({
    //   delay: 1000,
    //   callback: () => (this.compte += 1, this.compteur.setText(`${this.compte+1}`)),
    //   callbackScope: this,
    //   loop: true
    // });

    this.tweens.add({
        targets: this.indicationDroite,
        x: 100,
        alpha: 0.5,
        ease: 'Sine.inOut',
        yoyo: true,
        duration: 1000,
        repeat: 10
    });

		const self = this;
		this.players = this.add.group()
		this.enemies= this.add.group()
    this.groupeBoules = this.add.group();
    this.groupeKunais = this.add.group();
    this.groupeBombes = this.add.group();

    this.groupeProjectiles = this.add.group();
    this.groupeLignes = this.add.group();
    this.groupeRectangles = this.add.group();
    this.projectilesRef = {}
    this.lignesRef = {}
    this.rectanglesRef = {}

		this.playersRef = {}
		this.ennemyRef = {}
		this.boulesRef = {}
		this.kunaisRef = {}
    this.bombesRef = {}

		this.keyboard = this.input.keyboard.addKeys("up,right,left,down,space,A,Z,E,R,TAB")

    this.barreHautContainer.setScrollFactor(0)
    this.gfx = this.add.graphics();


		const client = new Colyseus.Client("ws://localhost:3000")
		const salon = this.salon;
		const sprite = this.personnage;

		await client
		.joinOrCreate("game_instance", { salon: salon, sprite: sprite })
		.then((room) => {
			self.room = room
			self.session = room.sessionId

      //   this.emitter.startFollow(this.playersRef[id.id_joueur])

			room.onStateChange((changes: any) => {
				let presences : any = {}
        let projectiles: any = {}
        let lignes: any = {}
        let rectangles: any = {}

        changes.projectiles.forEach((value: any, key: any) => {
					projectiles[key] = value
				})

        changes.lignes.forEach((value: any, key: any) => {
          lignes[key] = value
        })

        changes.rectangles.forEach((value: any, key: any) => {
          rectangles[key] = value
        })

        // changes.compteur.forEach((value: any, key: any) => {
          // rectangles[key] = value
        // })

        // console.log(changes.compteur)
        if (this.compteur.text !== `${changes.compteur}`) {
          this.compteur.setText(`${changes.compteur}`)
        }
				changes.presences.forEach((value: any, key: any) => {
					presences[key] = value
				})

				self.patchPlayer({
					presences: presences,
					presenceList: Object.keys(presences),
          projectilesListe: Object.keys(projectiles),
          projectiles: projectiles,
          lignesListe: Object.keys(lignes),
          lignes: lignes,
          rectanglesListe: Object.keys(rectangles),
          rectangles: rectangles
				})
			})

		})
		.catch((err) => {
			console.error(err)
		})


	}


	async patchPlayer(list: any) {

    list.projectilesListe.map((item: string) => {
      if (this.projectilesRef[list.projectiles[item].id] === undefined)
      {
          const projectile = this.groupeProjectiles.create(list.projectiles[item].x, list.projectiles[item].y, `${list.projectiles[item].sprite}_atlas`, `${list.projectiles[item]._frame}`).setAlpha(list.projectiles[item].alpha)
          if (list.projectiles[item].flipX) projectile.setFlipX(list.projectiles[item].flipX)
          if (list.projectiles[item].scale) projectile.setScale(list.projectiles[item].scale)
          if (list.projectiles[item].depth) projectile.setDepth(list.projectiles[item].depth)
          this.projectilesRef[item] = projectile
      }
      else
      {
        this.projectilesRef[item].setPosition(list.projectiles[item].x, list.projectiles[item].y);
        if (list.projectiles[item].scale) this.projectilesRef[item].setScale(list.projectiles[item].scale);
        if (list.projectiles[item].scaleX) this.projectilesRef[item].setScale(list.projectiles[item].scaleX, list.projectiles[item].scaleY);
        if (list.projectiles[item].alpha) this.projectilesRef[item].setAlpha(list.projectiles[item].alpha);
        if (list.projectiles[item].angle) this.projectilesRef[item].angle = list.projectiles[item].angle;
      }
    })


    list.lignesListe.map((item: string) => {
      if (this.lignesRef[item] === undefined)
      {
        const l = list.lignes[item]
        let ligne = this.add.graphics();
        ligne.lineStyle(l.lineHeight, l.couleur)
        this.groupeLignes.add(ligne)
        this.lignesRef[item] = ligne
        console.log("NOUVEAU")
      }
      else
      {
        this.lignesRef[item].clear()
        .lineStyle(list.lignes[item].lineHeight, list.lignes[item].couleur)
        .lineBetween(list.lignes[item].x1, list.lignes[item].y1, list.lignes[item].x2, list.lignes[item].y2)
      }
    })


    list.rectanglesListe.map((item: string) => {
      if (this.rectanglesRef[item] === undefined)
      {
        const r = list.rectangles[item]
        console.log("NOUVEAU RECTANGLE")
        const rectangle = this.add.rectangle(r.x, r.y, r.width, r.height, r.fillColor, r.fillAlpha);
        this.groupeRectangles.add(rectangle)
        this.rectanglesRef[item] = rectangle
      }
      else
      {
        this.rectanglesRef[item].setPosition(list.rectangles[item].x, list.rectangles[item].y)
        if (list.rectangles[item].width) this.rectanglesRef[item].setSize(list.rectangles[item].width, list.rectangles[item].height);
        // if (list.rectangles[item].height) this.rectanglesRef[item].height = list.rectangles[item].height;
        if (list.rectangles[item].angle) this.rectanglesRef[item].setAngle(list.rectangles[item].angle);
        // if (list.rectangles[item].fillColor) this.rectanglesRef[item].setFillStyle(list.rectangles[item].fillColor);
        // if (list.rectangles[item].fillAlpha) this.rectanglesRef[item].setFillStyle(list.rectangles[item].fillColor, list.rectangles[item].fillAlpha);
      }
    })



















    // console.log(this.groupeBoules.getLength())
    // console.log(list.boulesListe)
    // list.boulesListe.map((item: string) => {
    //   if (this.boulesRef[list.boules[item].id] === undefined && list.boules[item].active) {
    //     const b = this.groupeBoules.create(list.boules[item].x, list.boules[item].y, `huzounet_atlas`, 'shuriken0')
    //     .setDepth(2)
    //     .setScale(list.boules[item].scale)
    //     .setAlpha(list.boules[item].alpha)
    //     .play(`huzounet_shuriken`);
    //     this.boulesRef[item] = b
    //   } else if (list.boules[item].active) {
    //     this.boulesRef[item].setPosition(list.boules[item].x, list.boules[item].y);
    //     this.boulesRef[item].setScale(list.boules[item].scale);
    //     this.boulesRef[item].setAlpha(list.boules[item].alpha)
    //     // console.log(list.boules[item].actif)
    //     // console.log(list.boules[item].active)
    //
    //   }
    //
    //   if (!list.boules[item].active) {
    //     // console.log("PASSS AAACTIF")
    //     // console.log(this.groupeBoules.getFirstDead())
    //
    //     if (this.boulesRef[list.boules[item].id]) {
    //       this.boulesRef[list.boules[item].id].destroy()
    //       delete this.boulesRef[list.boules[item].id]
    //     }
    //     // console.log(this.boulesRef[list.boules[item].id])
    //     // console.log(list.boules[item].id)
    //     // this.boulesRef[list.boules[item].id].destroy(true)
    //     // console.log(this.boulesRef[list.boules[item].id])
    //   }
    // })

    // list.kunaisListe.map((item: string) => {
    //   if (this.kunaisRef[list.kunais[item].id] === undefined && list.kunais[item].active) {
    //     const b = this.groupeKunais.create(list.kunais[item].x, list.kunais[item].y, `huzounet_atlas`, 'kunai')
    //     .setDepth(2)
    //     .setAlpha(list.kunais[item].alpha)
    //     .setFlipX(list.kunais[item].flipX)
    //     // .play(`huzounet_shuriken`);
    //     this.kunaisRef[item] = b
    //   } else if (list.kunais[item].active) {
    //     this.kunaisRef[item].setPosition(list.kunais[item].x, list.kunais[item].y);
    //     // console.log(list.boules[item].actif)
    //     // console.log(list.boules[item].active)
    //
    //   }
    //
    //   if (!list.kunais[item].active) {
    //     // console.log("PASSS AAACTIF")
    //     // console.log(this.groupeBoules.getFirstDead())
    //
    //     if (this.kunaisRef[list.kunais[item].id]) {
    //       this.kunaisRef[list.kunais[item].id].destroy()
    //       delete this.kunaisRef[list.kunais[item].id]
    //     }
    //     // console.log(this.boulesRef[list.boules[item].id])
    //     // console.log(list.boules[item].id)
    //     // this.boulesRef[list.boules[item].id].destroy(true)
    //     // console.log(this.boulesRef[list.boules[item].id])
    //   }
    // })

    // list.bombesListe.map((item: string) => {
    //   if (this.bombesRef[list.bombes[item].id] === undefined) {
    //     const b = this.groupeBombes.create(list.bombes[item].x, list.bombes[item].y, `akhizonah_atlas`, 'bombe0')
    //     this.bombesRef[item] = b;
    //
    //     b.effet_choc = this.add.ellipse(list.bombes[item].x, list.bombes[item].y, 128, 128);
    //     b.effet_choc.setScale(0);
    //     b.effet_choc.isFilled = true;
    //     b.effet_choc.fillAlpha = 0.3;
    //
    //     this.tweens.add({
    //       targets: b.effet_choc,
    //       scale: "+=6",
    //       alpha: 0,
    //       ease: 'Sine.inOut',
    //       duration: 400,
    //       delay: 1600,
    //       repeat: 0,
    //       onUpdate: () => {
    //         b.effet_choc.setPosition(this.bombesRef[item].x, this.bombesRef[item].y)
    //       },
    //       onComplete: function() {
    //         arguments[1][0].destroy(true)
    //       }
    //     });
    //
    //   } else {
    //     if (list.bombes[item].anim) {
    //       this.bombesRef[item].setPosition(list.bombes[item].x, list.bombes[item].y);
    //
    //       this.bombesRef[item].setFrame(list.bombes[item].anim);
    //
    //       if (list.bombes[item].explosion) {
    //         this.bombesRef[item].effet_choc.setPosition(list.bombes[item].x, list.bombes[item].y);
    //       }
    //     }
    //   }
    // })


		list.presenceList.map((item: string, idx: number) => {

			if (this.playersRef[item] === undefined) {

				const x = list.presences[item].x
				const y = list.presences[item].y
				const sprite = list.presences[item].sprite
				if (list.presences[item].sprite) {

					const player = this.add
					.sprite(x, y, `${sprite}_atlas`)
					.setData({ ClientId: list.presenceList[idx] })
          .setDepth(1);

          const barre = this.add.container(-39, 21);

          const rectangle = this.add.rectangle(0, -8, 128, 128);
          rectangle.scaleX = 1;
          rectangle.scaleY = 0.0881985701178345;
          rectangle.setOrigin(0, 0.5);
          rectangle.isFilled = true;
          rectangle.fillColor = 10247126;

          const vie = this.add.rectangle(0, -8, 128, 128);
          vie.scaleX = 1;
          vie.scaleY = 0.0881985701178345;
          vie.setOrigin(0, 0.5);
          vie.isFilled = true;
          vie.fillColor = 10882574;

          const pseudo = this.add.text(0, 0, "HELLO", {});

          pseudo.text = `${sprite}`;
          pseudo.setOrigin(-0.3, 0)
          pseudo.setStyle({ "color": "#5dcefcff", "fontStyle": "italic", "fontSize": "18px", "strokeThickness":1,"shadow.color": "#ffffffff", "shadow.blur":0.3,"shadow.stroke":false});

          barre.add(pseudo);
          barre.add(vie);
          barre.add(rectangle);

          (player as any).barre = barre;
          (player as any).ClientId = list.presenceList[idx];

					this.players.add(player)
					this.playersRef[item] = player

				}


			} else {
          this.playersRef[item].setPosition(list.presences[item].x, list.presences[item].y)
            if (list.presences[item].sprite == 'boss_1') this.vie_boss_1.setScale(Phaser.Math.Clamp(list.presences[item].vie, 0, 9.47) , 0.30320712838431607)
            this.playersRef[item].setFrame(list.presences[item].anim)
            this.playersRef[item].flipX = list.presences[item].flipX
            this.playersRef[item].setTint(list.presences[item].tint)
            this.playersRef[item].barre.last.setScale(Phaser.Math.Clamp(list.presences[item].vie/(this.playersRef[item].barre.first.scaleX*10), 0, 1) , 0.0881985701178345)
            this.playersRef[item].barre.setPosition(this.playersRef[item].getTopCenter().x - 45, this.playersRef[item].getTopCenter().y - 25)
            if (list.presences[item].scale) this.playersRef[item].setScale(list.presences[item].scale)
            if (list.presences[item].alpha) this.playersRef[item].setAlpha(list.presences[item].alpha)

            if (this.session === this.playersRef[item].ClientId) {
              this.vie_joueur.scaleX = list.presences[item].vie / 2 + 0.15
            }

			}
		})

		this.players.children.iterate((child) => {
			if (list.presences[child.data.values.ClientId] === undefined) {
        const id = child.data.values.ClientId;
				this.playersRef[child.data.values.ClientId].destroy(true)
				delete this.playersRef[id]
			}
		})

    // this.groupeBoules.getChildren().forEach((element, idx) => {
    //   // console.log(element)
    //   if ((element as Phaser.Physics.Arcade.Sprite).active == false) {
    //     console.log("DDDDDDDDDDDDDDDDDDDDDDDDDESSSSTRUCTION")
    //     this.boulesRef[(element as any).bouleID].destroy(true)
    //     delete this.boulesRef[(element as any).bouleID]
    //   }
    // });
	}

  fade(room: any) {
    this.cameras.main.fadeOut(250, 0, 0, 0, (_camera: any, progress: any) => {
      // this.player.canMove = false;
      if (progress === 1) {
        // Change camera boundaries when fade out complete.
        this.cameras.main.setBounds(this.listCurrentRoom[room].w,
          0,
          2000,
          945,
          true);

          // Fade back in with new boundareis.
          this.cameras.main.fadeIn(500, 0, 0, 0, function(_camera: any, _progress: any) {
          }, this);
        }
      }, this);
  }

  update() {
    if (this.room) {

      // blocks.forEach(function (block) {
    // block.setTint(0xffffff);
// });
//  We need the top-left of the rect

      const { right, left, space, A, Z, E, R, TAB } = this.keyboard

      const inputs = {
        a: A.isDown ? true : false,
        // a_fin: A.isUp ? true : false,
        z: Z.isDown ? true : false,
        e: E.isDown ? true : false,
        r: R.isDown ? true : false,
        space: space.isDown ? true : false,
        right: right.isDown ? true : false,
        left: left.isDown ? true : false,
        tab: TAB.isDown ? true : false
      }

      //ATTAQUE
      // if (Phaser.Input.Keyboard.JustDown(A)) this.room.send("inputs", { ...inputs, charge: true, envoie: false })
      // if (Phaser.Input.Keyboard.JustUp(A)) this.room.send("inputs", { ...inputs, charge: false, envoie: true })

      // if (Phaser.Input.Keyboard.JustDown(space)) this.room.send("inputs", { ...inputs, saut: true})
      //
      // //DROITE
      // if (Phaser.Input.Keyboard.JustDown(right)) this.room.send("inputs", { ...inputs, right: {stop: false, marche: true}})
      // if (Phaser.Input.Keyboard.JustUp(right)) this.room.send("inputs", { ...inputs, right: {stop: true, marche: false}})
      //
      // //GAUCHE
      // if (Phaser.Input.Keyboard.JustDown(left)) this.room.send("inputs", { ...inputs, left: {stop: false, marche: true}})
      // if (Phaser.Input.Keyboard.JustUp(left)) this.room.send("inputs", { ...inputs, left: {stop: true, marche: false}})
      //
      if (!deepEqual(inputs, this.prevInputs)) {
        console.log("ENVOIE")
        this.prevInputs = inputs
        this.room.send("inputs", {
          ...inputs,
          a_fin: A.isUp ? true : false,
          z_fin: Phaser.Input.Keyboard.JustUp(Z),
          space_fin: space.isUp ? true : false,
          right_fin: Phaser.Input.Keyboard.JustUp(right),
          left_fin: Phaser.Input.Keyboard.JustUp(left),
          right_debut: Phaser.Input.Keyboard.JustDown(right),
          left_debut: Phaser.Input.Keyboard.JustDown(left),
          tab_fin: Phaser.Input.Keyboard.JustUp(TAB)
        })
      }
    }
  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
