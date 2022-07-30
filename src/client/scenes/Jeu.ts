
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
		const text = this.add.text(2751, 447, "", {});
		text.text = "Jeu";
		text.setStyle({ "fontSize": "50px" });

		// platforme
		const platforme = this.add.rectangle(2791, 862, 128, 128);
		platforme.scaleX = 43.50112225681497;
		platforme.scaleY = 1.449878006775927;
		platforme.isFilled = true;

		// map_boss1
		const map_boss1 = this.add.image(4656, 489, "map_boss1");
		map_boss1.scaleX = 2.868376959115476;
		map_boss1.scaleY = 2.7049866133838867;

		// map_boss2
		const map_boss2 = this.add.image(922, 489, "maptwitchman2");
		map_boss2.scaleX = 2.90778858976818;
		map_boss2.scaleY = 2.5991763141421007;

		// map_hall1
		const map_hall1 = this.add.image(2793, 476, "map_hall1");
		map_hall1.scaleX = 3.0081506873206445;
		map_hall1.scaleY = 2.5829543078030315;

		// hall
		const hall = this.add.image(1851, 473, "map_hall0");
		hall.scaleX = 3.0088107725356585;
		hall.scaleY = 2.634116448848351;
		hall.setOrigin(0, 0.5);

		// barreHautContainer
		const barreHautContainer = this.add.container(1836, 0);

		// barreHaut
		const barreHaut = this.add.rectangle(960, 29, 128, 128);
		barreHaut.scaleX = 15.008021207026625;
		barreHaut.scaleY = 0.5105435510788869;
		barreHaut.isFilled = true;
		barreHaut.fillColor = 0;
		barreHaut.fillAlpha = 0.4;
		barreHautContainer.add(barreHaut);

		// compteur
		const compteur = this.add.text(1649, 7, "", {});
		compteur.text = "00:00:00";
		compteur.setStyle({ "fontSize": "45px" });
		barreHautContainer.add(compteur);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(957, 28, 128, 128);
		rectangle_1.scaleX = 10.37106099308064;
		rectangle_1.scaleY = 0.1495388434982044;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;
		rectangle_1.fillAlpha = 0.6;
		barreHautContainer.add(rectangle_1);

		// vie_boss_1
		const vie_boss_1 = this.add.rectangle(958, 28, 128, 128);
		vie_boss_1.scaleX = 10.362184539568688;
		vie_boss_1.scaleY = 0.1777486358833607;
		vie_boss_1.isFilled = true;
		vie_boss_1.fillColor = 10882574;
		vie_boss_1.fillAlpha = 0.8;
		barreHautContainer.add(vie_boss_1);

		// barre_etat_joueur
		const barre_etat_joueur = this.add.container(2231, 466);

		// barre_etat
		const barre_etat = this.add.container(-39, 21);
		barre_etat_joueur.add(barre_etat);

		// p1
		const p1 = this.add.rectangle(1837, 939, 128, 128);
		p1.scaleX = 14.993211052385613;
		p1.scaleY = -0.08853600509578045;
		p1.setOrigin(0, 0.5);
		p1.isFilled = true;
		p1.fillColor = 12757972;

		// p2
		const p2 = this.add.rectangle(5, 940, 128, 128);
		p2.scaleX = 14.310196671161355;
		p2.scaleY = -0.09826542861018456;
		p2.setOrigin(0, 0.5);
		p2.isFilled = true;
		p2.fillColor = 10563832;

		// platforme_droite
		const platforme_droite = this.add.rectangle(3756, 940, 128, 128);
		platforme_droite.scaleX = 14.310196671161355;
		platforme_droite.scaleY = -0.09826542861018456;
		platforme_droite.setOrigin(0, 0.5);
		platforme_droite.isFilled = true;
		platforme_droite.fillColor = 10563832;

		// platforme_haut
		const platforme_haut = this.add.rectangle(1833, -200, 128, 128);
		platforme_haut.scaleX = 14.993211052385613;
		platforme_haut.scaleY = -0.08853600509578045;
		platforme_haut.setOrigin(0, 0.5);
		platforme_haut.isFilled = true;
		platforme_haut.fillColor = 10563832;

		// platforme_haut_droite
		const platforme_haut_droite = this.add.rectangle(3752, -199, 128, 128);
		platforme_haut_droite.scaleX = 14.310196671161355;
		platforme_haut_droite.scaleY = -0.09826542861018456;
		platforme_haut_droite.setOrigin(0, 0.5);
		platforme_haut_droite.isFilled = true;
		platforme_haut_droite.fillColor = 10563832;

		// platforme_haut_gauche
		const platforme_haut_gauche = this.add.rectangle(1, -199, 128, 128);
		platforme_haut_gauche.scaleX = 14.310196671161355;
		platforme_haut_gauche.scaleY = -0.09826542861018456;
		platforme_haut_gauche.setOrigin(0, 0.5);
		platforme_haut_gauche.isFilled = true;
		platforme_haut_gauche.fillColor = 10563832;

		// map_manetteman
		const map_manetteman = this.add.image(4685, -499, "map_manetteman");
		map_manetteman.scaleX = 2.9102765585148034;
		map_manetteman.scaleY = 2.6616391385535185;

		// interface_joueur
		const interface_joueur = this.add.container(541, 973);

		// rectangle_2
		const rectangle_2 = this.add.rectangle(419, 48, 128, 128);
		rectangle_2.scaleX = 7.706419353393023;
		rectangle_2.scaleY = 0.995444225494233;
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 0;
		rectangle_2.fillAlpha = 0.6;
		interface_joueur.add(rectangle_2);

		// ellipse_5_1
		const ellipse_5_1 = this.add.ellipse(72, 80, 128, 128);
		ellipse_5_1.scaleX = 0.37184784435596524;
		ellipse_5_1.scaleY = 0.37184784435596524;
		ellipse_5_1.isFilled = true;
		ellipse_5_1.fillColor = 3602747;
		ellipse_5_1.fillAlpha = 0;
		interface_joueur.add(ellipse_5_1);

		// ellipse_5
		const ellipse_5 = this.add.ellipse(0, 45, 128, 128);
		ellipse_5.scaleX = 0.8179399157486755;
		ellipse_5.scaleY = 0.8179399157486755;
		ellipse_5.isFilled = true;
		ellipse_5.fillColor = 3602747;
		interface_joueur.add(ellipse_5);

		// sous_barre_vie_joueur
		const sous_barre_vie_joueur = this.add.rectangle(171, 82, 128, 128);
		sous_barre_vie_joueur.scaleX = 5.150602609693634;
		sous_barre_vie_joueur.scaleY = 0.21267753602571016;
		sous_barre_vie_joueur.setOrigin(0, 0.5);
		sous_barre_vie_joueur.isFilled = true;
		sous_barre_vie_joueur.fillColor = 13372942;
		interface_joueur.add(sous_barre_vie_joueur);

		// vie_joueur
		const vie_joueur = this.add.rectangle(171, 82, 128, 128);
		vie_joueur.scaleX = 5.150602609693634;
		vie_joueur.scaleY = 0.21267753602571016;
		vie_joueur.setOrigin(0, 0.5);
		vie_joueur.isFilled = true;
		vie_joueur.fillColor = 15554289;
		interface_joueur.add(vie_joueur);

		// groupe_touches
		const groupe_touches = this.add.container(184, 0);
		interface_joueur.add(groupe_touches);

		// touche_A
		const touche_A = this.add.container(190, 24);
		groupe_touches.add(touche_A);

		// rectangle_4
		const rectangle_4 = this.add.rectangle(20, 5, 128, 128);
		rectangle_4.scaleX = 0.4926742586809625;
		rectangle_4.scaleY = 0.4926742586809625;
		rectangle_4.isFilled = true;
		rectangle_4.fillColor = 9965769;
		rectangle_4.fillAlpha = 0.1;
		rectangle_4.isStroked = true;
		touche_A.add(rectangle_4);

		// commande_A
		const commande_A = this.add.text(20, 5, "", {});
		commande_A.setOrigin(0.5, 0.5);
		commande_A.text = "A";
		commande_A.setStyle({ "fontSize": "26px" });
		touche_A.add(commande_A);

		// description_commande_A
		const description_commande_A = this.add.text(19, 25, "", {});
		description_commande_A.scaleX = 0.8383656155133609;
		description_commande_A.scaleY = 0.8383656155133609;
		description_commande_A.setOrigin(0.5, 0.5);
		description_commande_A.text = "cross";
		touche_A.add(description_commande_A);

		// touche_Z
		const touche_Z = this.add.container(261, 24);
		groupe_touches.add(touche_Z);

		// rectangle_4_1
		const rectangle_4_1 = this.add.rectangle(18, 5, 128, 128);
		rectangle_4_1.scaleX = 0.4926742586809625;
		rectangle_4_1.scaleY = 0.4926742586809625;
		rectangle_4_1.isFilled = true;
		rectangle_4_1.fillColor = 9965769;
		rectangle_4_1.fillAlpha = 0.1;
		rectangle_4_1.isStroked = true;
		touche_Z.add(rectangle_4_1);

		// commande_Z
		const commande_Z = this.add.text(18, 5, "", {});
		commande_Z.setOrigin(0.5, 0.5);
		commande_Z.text = "Z";
		commande_Z.setStyle({ "fontSize": "26px" });
		touche_Z.add(commande_Z);

		// description_commande_Z
		const description_commande_Z = this.add.text(19, 25, "", {});
		description_commande_Z.scaleX = 0.8383656155133609;
		description_commande_Z.scaleY = 0.8383656155133609;
		description_commande_Z.setOrigin(0.5, 0.5);
		description_commande_Z.text = "dash";
		touche_Z.add(description_commande_Z);

		// touche_TAB
		const touche_TAB = this.add.container(0, 0);
		groupe_touches.add(touche_TAB);

		// rectangle_4_3
		const rectangle_4_3 = this.add.rectangle(71, 20, 128, 128);
		rectangle_4_3.scaleX = 1.3025571558163676;
		rectangle_4_3.scaleY = 0.3373770596916607;
		rectangle_4_3.isFilled = true;
		rectangle_4_3.fillColor = 9965769;
		rectangle_4_3.fillAlpha = 0.1;
		rectangle_4_3.isStroked = true;
		rectangle_4_3.strokeColor = 3155237;
		touche_TAB.add(rectangle_4_3);

		// rectangle_5_1
		const rectangle_5_1 = this.add.rectangle(93, 29, 128, 128);
		rectangle_5_1.scaleX = 0.6564311464079737;
		rectangle_5_1.scaleY = 0.03844827137887741;
		rectangle_5_1.isFilled = true;
		touche_TAB.add(rectangle_5_1);

		// triangle_2
		const triangle_2 = this.add.triangle(143, 29, 0, 128, 64, 0, 128, 128);
		triangle_2.scaleX = 0.12492350627216228;
		triangle_2.scaleY = 0.12492350627216228;
		triangle_2.angle = 90;
		triangle_2.isFilled = true;
		touche_TAB.add(triangle_2);

		// triangle_2_1
		const triangle_2_1 = this.add.triangle(0, 9, 0, 128, 64, 0, 128, 128);
		triangle_2_1.scaleX = 0.12492350627216228;
		triangle_2_1.scaleY = 0.12492350627216228;
		triangle_2_1.angle = -90;
		triangle_2_1.isFilled = true;
		touche_TAB.add(triangle_2_1);

		// description_commande_TAB
		const description_commande_TAB = this.add.text(72, 51, "", {});
		description_commande_TAB.setOrigin(0.5, 0.5);
		description_commande_TAB.text = "Fusionner";
		touche_TAB.add(description_commande_TAB);

		// commande_TAB
		const commande_TAB = this.add.text(115, 0, "", {});
		commande_TAB.text = "TAB";
		touche_TAB.add(commande_TAB);

		// rectangle
		const rectangle = this.add.rectangle(50, 9, 128, 128);
		rectangle.scaleX = 0.6564311464079737;
		rectangle.scaleY = 0.03844827137887741;
		rectangle.isFilled = true;
		touche_TAB.add(rectangle);

		// touche_E
		const touche_E = this.add.container(331, 29);
		groupe_touches.add(touche_E);

		// rectangle_4_2
		const rectangle_4_2 = this.add.rectangle(17, 0, 128, 128);
		rectangle_4_2.scaleX = 0.4926742586809625;
		rectangle_4_2.scaleY = 0.4926742586809625;
		rectangle_4_2.isFilled = true;
		rectangle_4_2.fillColor = 9965769;
		rectangle_4_2.fillAlpha = 0.1;
		rectangle_4_2.isStroked = true;
		touche_E.add(rectangle_4_2);

		// commande_E
		const commande_E = this.add.text(17, 0, "", {});
		commande_E.setOrigin(0.5, 0.5);
		commande_E.text = "E";
		commande_E.setStyle({ "fontSize": "26px" });
		touche_E.add(commande_E);

		// description_commande_E
		const description_commande_E = this.add.text(17, 20, "", {});
		description_commande_E.scaleX = 0.8383656155133609;
		description_commande_E.scaleY = 0.8383656155133609;
		description_commande_E.setOrigin(0.5, 0.5);
		description_commande_E.text = "kick";
		touche_E.add(description_commande_E);

		// touche_R
		const touche_R = this.add.container(393, 29);
		groupe_touches.add(touche_R);

		// rectangle_4_2_1
		const rectangle_4_2_1 = this.add.rectangle(24, 0, 128, 128);
		rectangle_4_2_1.scaleX = 0.4926742586809625;
		rectangle_4_2_1.scaleY = 0.4926742586809625;
		rectangle_4_2_1.isFilled = true;
		rectangle_4_2_1.fillColor = 9965769;
		rectangle_4_2_1.fillAlpha = 0.1;
		rectangle_4_2_1.isStroked = true;
		touche_R.add(rectangle_4_2_1);

		// commande_R
		const commande_R = this.add.text(24, 0, "", {});
		commande_R.setOrigin(0.5, 0.5);
		commande_R.text = "R";
		commande_R.setStyle({ "fontSize": "26px" });
		touche_R.add(commande_R);

		// description_commande_R
		const description_commande_R = this.add.text(0, 13, "", {});
		description_commande_R.scaleX = 0.8383656155133609;
		description_commande_R.scaleY = 0.8383656155133609;
		description_commande_R.text = "ultime";
		touche_R.add(description_commande_R);

		// hall_1
		const hall_1 = this.add.image(1878, -506, "map_hall0");
		hall_1.scaleX = 3.0088107725356585;
		hall_1.scaleY = 2.634116448848351;
		hall_1.setOrigin(0, 0.5);

		// hall_2
		const hall_2 = this.add.image(-24, -504, "mapstreamdeck");
		hall_2.scaleX = 3.0088107725356585;
		hall_2.scaleY = 2.634116448848351;
		hall_2.setOrigin(0, 0.5);

		// text_1
		const text_1 = this.add.text(2826, 116, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "HALL";
		text_1.setStyle({ "fontSize": "29px" });

		// bas_droite
		const bas_droite = this.add.rectangle(4719, 480, 128, 128);
		bas_droite.scaleX = 15.168831928777566;
		bas_droite.scaleY = 7.5675971976646315;
		bas_droite.isFilled = true;
		bas_droite.fillColor = 0;
		bas_droite.fillAlpha = 0.8;

		// haut_gauche
		const haut_gauche = this.add.rectangle(901, -507, 128, 128);
		haut_gauche.scaleX = 14.495720628453666;
		haut_gauche.scaleY = 7.392235139173692;
		haut_gauche.isFilled = true;
		haut_gauche.fillColor = 0;
		haut_gauche.fillAlpha = 0.8;

		// haut_milieu
		const haut_milieu = this.add.rectangle(2791, -495, 128, 128);
		haut_milieu.scaleX = 15.03295778960996;
		haut_milieu.scaleY = 7.562543454428133;
		haut_milieu.isFilled = true;
		haut_milieu.fillColor = 0;
		haut_milieu.fillAlpha = 0.8;

		// cache_gauche_bas
		const cache_gauche_bas = this.add.container(1836, 0);

		// bas_gauche
		const bas_gauche = this.add.rectangle(-920, 488, 128, 128);
		bas_gauche.scaleX = 14.332672621910074;
		bas_gauche.scaleY = 7.392235139173692;
		bas_gauche.isFilled = true;
		bas_gauche.fillColor = 0;
		bas_gauche.fillAlpha = 0.8;
		cache_gauche_bas.add(bas_gauche);

		// haut_droite
		const haut_droite = this.add.rectangle(2880, -496, 128, 128);
		haut_droite.scaleX = 15.03295778960996;
		haut_droite.scaleY = 7.562543454428133;
		haut_droite.isFilled = true;
		haut_droite.fillColor = 0;
		haut_droite.fillAlpha = 0.8;
		cache_gauche_bas.add(haut_droite);

		// bas_milieu
		const bas_milieu = this.add.rectangle(954, 478, 128, 128);
		bas_milieu.scaleX = 14.756294006927739;
		bas_milieu.scaleY = 7.474275561173832;
		bas_milieu.isFilled = true;
		bas_milieu.fillColor = 0;
		bas_milieu.fillAlpha = 0.8;
		cache_gauche_bas.add(bas_milieu);

		// mapbossfinal
		const mapbossfinal = this.add.image(2714, -1488, "mapbossfinal");
		mapbossfinal.scaleX = 2.709638779885017;
		mapbossfinal.scaleY = 2.709638779885017;

		this.map_boss1 = map_boss1;
		this.map_boss2 = map_boss2;
		this.map_hall1 = map_hall1;
		this.hall = hall;
		this.barreHautContainer = barreHautContainer;
		this.barreHaut = barreHaut;
		this.compteur = compteur;
		this.vie_boss_1 = vie_boss_1;
		this.barre_etat_joueur = barre_etat_joueur;
		this.barre_etat = barre_etat;
		this.interface_joueur = interface_joueur;
		this.sous_barre_vie_joueur = sous_barre_vie_joueur;
		this.vie_joueur = vie_joueur;
		this.groupe_touches = groupe_touches;
		this.touche_A = touche_A;
		this.rectangle_4 = rectangle_4;
		this.commande_A = commande_A;
		this.description_commande_A = description_commande_A;
		this.touche_Z = touche_Z;
		this.rectangle_4_1 = rectangle_4_1;
		this.commande_Z = commande_Z;
		this.description_commande_Z = description_commande_Z;
		this.touche_TAB = touche_TAB;
		this.description_commande_TAB = description_commande_TAB;
		this.commande_TAB = commande_TAB;
		this.touche_E = touche_E;
		this.rectangle_4_2 = rectangle_4_2;
		this.commande_E = commande_E;
		this.description_commande_E = description_commande_E;
		this.touche_R = touche_R;
		this.rectangle_4_2_1 = rectangle_4_2_1;
		this.commande_R = commande_R;
		this.description_commande_R = description_commande_R;
		this.hall_1 = hall_1;
		this.hall_2 = hall_2;
		this.bas_droite = bas_droite;
		this.haut_gauche = haut_gauche;
		this.haut_milieu = haut_milieu;
		this.bas_gauche = bas_gauche;
		this.haut_droite = haut_droite;
		this.bas_milieu = bas_milieu;

		this.events.emit("scene-awake");
	}

	public map_boss1!: Phaser.GameObjects.Image;
	public map_boss2!: Phaser.GameObjects.Image;
	public map_hall1!: Phaser.GameObjects.Image;
	public hall!: Phaser.GameObjects.Image;
	public barreHautContainer!: Phaser.GameObjects.Container;
	public barreHaut!: Phaser.GameObjects.Rectangle;
	public compteur!: Phaser.GameObjects.Text;
	public vie_boss_1!: Phaser.GameObjects.Rectangle;
	public barre_etat_joueur!: Phaser.GameObjects.Container;
	public barre_etat!: Phaser.GameObjects.Container;
	public interface_joueur!: Phaser.GameObjects.Container;
	public sous_barre_vie_joueur!: Phaser.GameObjects.Rectangle;
	public vie_joueur!: Phaser.GameObjects.Rectangle;
	public groupe_touches!: Phaser.GameObjects.Container;
	public touche_A!: Phaser.GameObjects.Container;
	public rectangle_4!: Phaser.GameObjects.Rectangle;
	public commande_A!: Phaser.GameObjects.Text;
	public description_commande_A!: Phaser.GameObjects.Text;
	public touche_Z!: Phaser.GameObjects.Container;
	public rectangle_4_1!: Phaser.GameObjects.Rectangle;
	public commande_Z!: Phaser.GameObjects.Text;
	public description_commande_Z!: Phaser.GameObjects.Text;
	public touche_TAB!: Phaser.GameObjects.Container;
	public description_commande_TAB!: Phaser.GameObjects.Text;
	public commande_TAB!: Phaser.GameObjects.Text;
	public touche_E!: Phaser.GameObjects.Container;
	public rectangle_4_2!: Phaser.GameObjects.Rectangle;
	public commande_E!: Phaser.GameObjects.Text;
	public description_commande_E!: Phaser.GameObjects.Text;
	public touche_R!: Phaser.GameObjects.Container;
	public rectangle_4_2_1!: Phaser.GameObjects.Rectangle;
	public commande_R!: Phaser.GameObjects.Text;
	public description_commande_R!: Phaser.GameObjects.Text;
	public hall_1!: Phaser.GameObjects.Image;
	public hall_2!: Phaser.GameObjects.Image;
	public bas_droite!: Phaser.GameObjects.Rectangle;
	public haut_gauche!: Phaser.GameObjects.Rectangle;
	public haut_milieu!: Phaser.GameObjects.Rectangle;
	public bas_gauche!: Phaser.GameObjects.Rectangle;
	public haut_droite!: Phaser.GameObjects.Rectangle;
	public bas_milieu!: Phaser.GameObjects.Rectangle;

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
    // this.cameras.main.fadeIn(2000);
    // this.cameras.main.setZoom(0.1)

    // this.cameras.main.on('camerapancomplete', () => {
      // self.cameras.main.startFollow(self.fontaine1);



    // var epic_musique = this.sound.add('epic_musique');

		// epic_musique.play({
			// loop: true
		// });

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
      bas_gauche: {
        w: this.map_boss2.getLeftCenter().x - 100
      },
      bas_droite: {
        w: this.hall.displayWidth
      }
    }

    // this.time.delayedCall(5000, () => {
    //   // this.fade('bas_gauche')
    //   this.cameras.main.pan(-900, -700, 2500);
    //
    // }, undefined, this);
    //
    // this.time.delayedCall(10000, () => {
    //   this.fade('bas_droite')
    // }, undefined, this);
    // this.time.delayedCall(15000, () => {
    //   this.fade('hall')
    // }, undefined, this);



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

      room.onMessage("suppression", (objet: number) => {
        const cle = Object.entries(objet)[0][0];
        const id = Object.entries(objet)[0][1];
        if (cle === "playersRef") (this as any)[cle][id].barre.destroy();
        (this as any)[cle][id].destroy(true);

        delete (this as any)[cle][id];
      });

      room.onMessage("RDC_OK", () => {
        this.tweens.add({
          targets: this.hall,
          alpha: 0,
          ease: 'Sine.inOut',
          duration: 800,
        });
      });

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

    //@ts-ignore
    // this.minimap = this.cameras.add(1140, 829, 800, 400).setZoom(0.07).setName('mini');
    this.minimap = this.cameras.add(-230, 200, 1700, 800).setZoom(0.17).setName('mini');
    //@ts-ignore
    // this.minimap.setAlpha(0.4)
    // this.cameras.main.setAlpha(0.3)
    // this.cameras.main.fadeFrom(1000, 255, 255, 255);
    this.cameras.main.centerOn(2800, 390)
    // this.cameras.main.fadeO(2000)
    this.interface_joueur.setScrollFactor(0)


    var keyObj = this.input.keyboard.addKey('T');  // Get key object
    keyObj.on('down', function(this: any) {
      this.cameras.main.setAlpha(0.1)
    }, this);
    keyObj.on('up', function(this: any) {
      this.cameras.main.setAlpha(1)
    }, this);



	}


	async patchPlayer(list: any) {

    list.projectilesListe.map((item: string) => {
      if (this.projectilesRef[list.projectiles[item].id] === undefined)
      {
          const projectile = this.groupeProjectiles.create(list.projectiles[item].x, list.projectiles[item].y, `${list.projectiles[item].sprite}_atlas`, `${list.projectiles[item]._frame}`)
          .setAlpha(list.projectiles[item].alpha)
          projectile.id = list.projectiles[item].id;
          if (list.projectiles[item].flipX) projectile.setFlipX(list.projectiles[item].flipX)
          if (list.projectiles[item].scale) projectile.setScale(list.projectiles[item].scale)
          if (list.projectiles[item].depth) projectile.setDepth(list.projectiles[item].depth)
          if (list.projectiles[item].anim) projectile.setFrame(list.projectiles[item].anim)
          if (list.projectiles[item]._frame === "bombe0") this.animBombe(item, list)
          this.projectilesRef[item] = projectile
      }
      else
      {
        this.projectilesRef[item].setPosition(list.projectiles[item].x, list.projectiles[item].y);
        if (list.projectiles[item].scale) this.projectilesRef[item].setScale(list.projectiles[item].scale);
        if (list.projectiles[item].scaleX) this.projectilesRef[item].setScale(list.projectiles[item].scaleX, list.projectiles[item].scaleY);
        if (list.projectiles[item].alpha) this.projectilesRef[item].setAlpha(list.projectiles[item].alpha);
        if (list.projectiles[item].angle) this.projectilesRef[item].angle = list.projectiles[item].angle;
        if (list.projectiles[item].anim) this.projectilesRef[item].setFrame(list.projectiles[item].anim)
      }
    })


    list.lignesListe.map((item: string) => {
      if (this.lignesRef[item] === undefined)
      {
        const l = list.lignes[item]
        let ligne = this.add.graphics();
        ligne.lineStyle(l.lineHeight, l.couleur)
        ligne.setDepth(5)
        //@ts-ignore
        ligne.id = l.id
        this.groupeLignes.add(ligne)
        this.lignesRef[item] = ligne
      }
      else
      {
        this.lignesRef[item].clear()
        .lineStyle(list.lignes[item].lineHeight, list.lignes[item].couleur)
        .lineBetween(list.lignes[item].x1, list.lignes[item].y1, list.lignes[item].x2, list.lignes[item].y2)
        console.log(this.groupeLignes.getLength())
      }
    })


    list.rectanglesListe.map((item: string) => {
      if (this.rectanglesRef[item] === undefined)
      {
        const r = list.rectangles[item]
        const rectangle = this.add.rectangle(r.x, r.y, r.width, r.height, r.fillColor, r.fillAlpha)

        this.groupeRectangles.add(rectangle)
        this.rectanglesRef[item] = rectangle
      }
      else
      {
        this.rectanglesRef[item].setPosition(list.rectangles[item].x, list.rectangles[item].y)
        if (list.rectangles[item].width) this.rectanglesRef[item].setSize(list.rectangles[item].width, list.rectangles[item].height);
        if (list.rectangles[item].angle) this.rectanglesRef[item].setAngle(list.rectangles[item].angle);
        if (list.rectangles[item].scale) this.rectanglesRef[item].setScale(list.rectangles[item].scale);
      }
    })

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

          if (this.session === list.presenceList[idx]) {

          // this.cameras.main.startFollow(player, false, 1, 0.1, 0, 190);  //
            (player as any).sprite_fusion = this.add
            .sprite(0, 45, `icons_atlas`, `icon_${sprite}`)
            .setScale(0.3983080418637645, 0.3983080418637645);

            this.interface_joueur.add((player as any).sprite_fusion)

            const petitIconJoueur = this.add
            .sprite(75, 80, `icons_atlas`, `icon_${sprite}`)
            .setScale(0.16275708974409425, 0.16275708974409425)
            this.interface_joueur.add(petitIconJoueur)


          //BAS
          var bas_gauche = new Phaser.Geom.Rectangle(-20, 20, 128, 128);
          Phaser.Geom.Rectangle.Scale(bas_gauche, 14.296694695311434, 7.392235139173692)

          var bas_milieu = new Phaser.Geom.Rectangle(1900, 20, 128, 128);
          Phaser.Geom.Rectangle.Scale(bas_milieu, 14.296694695311434, 7.392235139173692)

          var bas_droite = new Phaser.Geom.Rectangle(3800, 20, 128, 128);
          Phaser.Geom.Rectangle.Scale(bas_droite, 14.296694695311434, 7.392235139173692)


          //HAUT

          var haut_gauche = new Phaser.Geom.Rectangle(-20, -940, 128, 128);
          Phaser.Geom.Rectangle.Scale(haut_gauche, 14.296694695311434, 7.392235139173692)

          var haut_milieu = new Phaser.Geom.Rectangle(1900, -940, 128, 128);
          Phaser.Geom.Rectangle.Scale(haut_milieu, 14.296694695311434, 7.392235139173692)

          var haut_droite = new Phaser.Geom.Rectangle(3800, -940, 128, 128);
          Phaser.Geom.Rectangle.Scale(haut_droite, 14.296694695311434, 7.392235139173692)


          // let graphics = this.add.graphics()
          // graphics.fillRectShape(bas_droite);
          // graphics.fillStyle(0x000000, 0.5)
          // graphics.fillRectShape(bas_milieu);
          //@ts-ignore
          player.bas_gauche = bas_gauche;
          //@ts-ignore
          player.bas_milieu = bas_milieu;
          //@ts-ignore
          player.bas_droite = bas_droite;

          //@ts-ignore
          player.haut_gauche = haut_gauche;
          //@ts-ignore
          player.haut_milieu = haut_milieu;
          //@ts-ignore
          player.haut_droite = haut_droite;

            // this.input.keyboard.on('keydown-' + 'W', function (this: Phaser.Scene, event: Phaser.Events.EventEmitter) {
            // console.log("WWW")
            // this.cameras.main.startFollow(player);
            // this.cameras.main.setBounds(0, 0, 720 * 2, 176);
            // this.cameras.main.setBounds(0, y - 80, 9660, 2090)

            // this.cameras.main.startFollow(player, false);  //



            // this.cameras.main.setDeadzone(200, 200);

            // this.cameras.main.setBounds(0, 0, this.hall.displayWidth, this.hall.displayHeight);
            // },this);


          }



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
        if (list.presences[item].sprite == 'boss_1') this.vie_boss_1.setScale(Phaser.Math.Clamp(list.presences[item].vie, 0, 10.36) , 0.1777486358833607)
        this.playersRef[item].setFrame(list.presences[item].anim)
        this.playersRef[item].flipX = list.presences[item].flipX
        this.playersRef[item].setTint(list.presences[item].tint)
        if (this.playersRef[item].barre.last)
        {
          this.playersRef[item].barre.last.setScale(Phaser.Math.Clamp(list.presences[item].vie/(this.playersRef[item].barre.first.scaleX*10), 0, 1) , 0.0881985701178345)
          this.playersRef[item].barre.setPosition(this.playersRef[item].getTopCenter().x - 45, this.playersRef[item].getTopCenter().y - 25)
          if (list.presences[item].alpha)
          {
            this.playersRef[item].barre.setAlpha(list.presences[item].alpha)
            this.playersRef[item].setAlpha(list.presences[item].alpha)
          }
        }
        if (list.presences[item].scale) this.playersRef[item].setScale(list.presences[item].scale)

        if (list.presences[item].particules) this.animationBossKO(`${item}`)

        if (this.session === this.playersRef[item].ClientId) {
          this.vie_joueur.scaleX = list.presences[item].vie / 2 + 0.15
          if (list.presences[item].sprite_fusion) this.animIcon(this.playersRef[item].sprite_fusion, list.presences[item].sprite_fusion)

          if (list.presences[item].commandes)
          {
            for (const [key, value] of Object.entries(list.presences[item].commandes))
            {
              if (!value) (this as any)[`touche_${key}`].alpha = 0.2
              else (this as any)[`touche_${key}`].alpha = 1
              if ((this as any)[`description_commande_${key}`]) (this as any)[`description_commande_${key}`].setText(value)
              console.log("COMMANDES !!!")
            }

            // if (list.presences[item].sprite_cible)
            // {
            //   this.cameras.main.stopFollow();
            //   this.cameras.main.startFollow(this.playersRef[list.presences[item].sprite_cible], false, 1, 0.1, 190);  //
            // }
            // else
            // {
            //   this.cameras.main.stopFollow();
              // this.cameras.main.startFollow(this.playersRef[item], false, 1, 0.1, 190);  //
            // }
          }
          this.cameraDeplacement(this.playersRef[item], 'bas_gauche', 1851/2, 543)
          this.cameraDeplacement(this.playersRef[item], 'bas_milieu', 2791, 543)
          this.cameraDeplacement(this.playersRef[item], 'bas_droite', 4700, 543)

          this.cameraDeplacement(this.playersRef[item], 'haut_gauche', 1851/2, -443)
          this.cameraDeplacement(this.playersRef[item], 'haut_milieu', 2791, -443)
          this.cameraDeplacement(this.playersRef[item], 'haut_droite', 4700, -443)

          // if(Phaser.Geom.Rectangle.ContainsPoint(this.playersRef[item].bas_gauche, new Phaser.Geom.Point(this.playersRef[item].x, this.playersRef[item].y)))
          // {
          //   if (this.bas_gauche.alpha)
          //   {
          //     this.bas_gauche.setAlpha(0)
          //     // this.cameras.main.setBounds(0, 0, 1024, 2048);
          //
          //     // this.cameras.main.centerOn(0, 0);
          //     this.cameras.main.pan(1851/2, 543, 1000, 'Sine.easeInOut');
          //   }
          // }
          // else
          // {
          //   if (!this.bas_gauche.alpha) this.bas_gauche.setAlpha(1)
          // }






          // if(Phaser.Geom.Rectangle.ContainsPoint(this.playersRef[item].bas_milieu, new Phaser.Geom.Point(this.playersRef[item].x, this.playersRef[item].y)))
          // {
          //   if (this.bas_milieu.alpha)
          //   {
          //     this.bas_milieu.setAlpha(0)
          //     // this.cameras.main.setBounds(0, 0, 1024, 2048);
          //
          //     // this.cameras.main.centerOn(0, 0);
          //     this.cameras.main.pan(2791, 543, 1000, 'Sine.easeInOut');
          //   }
          // }
          // else
          // {
          //   if (!this.bas_milieu.alpha) this.bas_milieu.setAlpha(1)
          // }






          // if(Phaser.Geom.Rectangle.ContainsPoint(this.playersRef[item].bas_droite, new Phaser.Geom.Point(this.playersRef[item].x, this.playersRef[item].y)))
          // {
          //   if (this.bas_droite.alpha)
          //   {
          //     this.bas_droite.setAlpha(0)
          //     // this.cameras.main.setBounds(0, 0, 1024, 2048);
          //
          //     // this.cameras.main.centerOn(0, 0);
          //     this.cameras.main.pan(4700, 543, 1000, 'Sine.easeInOut');
          //   }
          // }
          // else
          // {
          //   if (!this.bas_droite.alpha) this.bas_droite.setAlpha(1)
          // }



//HAUT


          // if(Phaser.Geom.Rectangle.ContainsPoint(this.playersRef[item].haut_milieu, new Phaser.Geom.Point(this.playersRef[item].x, this.playersRef[item].y)))
          // {
          //   if (this.haut_milieu.alpha)
          //   {
          //     this.haut_milieu.setAlpha(0)
          //     // this.cameras.main.setBounds(0, 0, 1024, 2048);
          //
          //     // this.cameras.main.centerOn(0, 0);
          //     this.cameras.main.pan(2791, -443, 1000, 'Sine.easeInOut');
          //   }
          // }
          // else
          // {
          //   if (!this.haut_milieu.alpha) this.haut_milieu.setAlpha(1)
          // }








          // if (list.presences[item].pieceCourante)
          // {
          //   this.fade(list.presences[item].pieceCourante)
          // }
          // if () {

          // Phaser.Geom.Rectangle.ContainsRect(this.rectangle_5_test, 4)
            // this.rectangle_
          // }
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
	}

  cameraDeplacement(joueur: any, emplacement: any, x: number, y: number, temps: number = 900, animation: string = 'Sine.easeInOut') {
    if(Phaser.Geom.Rectangle.ContainsPoint(joueur[emplacement], new Phaser.Geom.Point(joueur.x, joueur.y + 100)))
    {
      if ((this as any)[emplacement].alpha)
      {
        // (this as any)[emplacement].setAlpha(0)
        this.tweens.add({
          targets: (this as any)[emplacement],
          alpha: 0,
          duration: 400,
        });

        this.cameras.main.pan(x, y, temps, animation);
      }
    }
    else
    {
      if (!(this as any)[emplacement].alpha)
      {
        this.tweens.add({
          targets: (this as any)[emplacement],
          alpha: 1,
          duration: 400,
        });
      }
    }
  }

  fade(room: any) {
    console.log(room)
    // this.cameras.main.fadeOut(250, 0, 0, 0, (_camera: any, progress: any) => {
    //   // this.player.canMove = false;
    //   if (progress === 1) {
    //     // Change camera boundaries when fade out complete.
    //     this.cameras.main.setBounds(this.listCurrentRoom[room].w,
    //       -1200,
    //       2000,
    //       945,
    //       true);
    //
    //       // Fade back in with new boundareis.
    //       this.cameras.main.fadeIn(500, 0, 0, 0, function(_camera: any, _progress: any) {
    //       }, this);
    //     }
    //   }, this);
    // this.time.delayedCall(5000, () => {
  // this.cameras.main.pan(this.listCurrentRoom[room].w, -1000, 2500);
// }, undefined, this);


  }

  animBombe(item: any, list: any) {
    const effet_choc = this.add.ellipse(list.projectiles[item].x, list.projectiles[item].y + 200, 128, 128);
    effet_choc.setScale(0);
    effet_choc.isFilled = true;
    effet_choc.fillAlpha = 0.3;

    this.tweens.add({
      targets: effet_choc,
      scale: "+=6",
      alpha: 0,
      ease: 'Sine.inOut',
      duration: 400,
      delay: 1600,
      repeat: 0,
      onUpdate: () => {
        if (this.projectilesRef[item]) effet_choc.setPosition(this.projectilesRef[item].x, this.projectilesRef[item].y)
      },
      onComplete: function() {
        arguments[1][0].destroy(true)
      }
    });
  }

  animIcon(icon: any, sprite_fusion: string) {



    console.log("ANIM ICON-----------------")
    this.tweens.add({
      targets: icon,
      angle: -660,
      alpha: 0.5,
      scale: 0,
      ease: 'Sine.inOut',
      duration: 800,
      yoyo: true,
      onYoyo: () => {
        icon.setFrame(`icon_${sprite_fusion}`)
      }
    });
  }

  animationBossKO(id: any) {
    // this.playersRef[id].setDepth(0.1)
    const ellipse_5_1 = this.add.ellipse(280, 256, 128, 128);
    ellipse_5_1.scaleX = 0.9012990507210408;
    ellipse_5_1.scaleY = 0.21224071572889464;
    ellipse_5_1.isFilled = true;
    ellipse_5_1.fillColor = 7473815;
    ellipse_5_1.fillAlpha = 0.8;
    ellipse_5_1.isStroked = true;
    ellipse_5_1.lineWidth = 4;
    ellipse_5_1.setPosition(this.playersRef[id].getBottomCenter().x, this.playersRef[id].getBottomCenter().y + 25)
    this.playersRef[id].barre.destroy()
    this.playersRef[id].ellipse_5_1 = ellipse_5_1
    // this.animationBoosFigurine = this.tweens.add({
    //   targets: this.playersRef[id],
    //   y: "-=90",
    //   alpha: 0.5,
    //   ease: 'Sine.inOut',
    //   yoyo: true,
    //   duration: 1000,
    //   repeat: -1
    // });

    var particles = this.add.particles('flares');

    this.emitter = particles.createEmitter({
      frame: 'blue',
      x: this.playersRef[id].getBottomCenter().x,
      y: this.playersRef[id].getBottomCenter().y + 25,
      speedY: { min: -200, max: -400 },
      lifespan: 2000,
      scale: { start: 0.4, end: 0 },
      quantity: 2,
      blendMode: 'ADD',
    });


    this.time.delayedCall(7000, () => {
      particles.destroy();
      ellipse_5_1.destroy();
    }, undefined, this);

    console.log("message received from server");
  }

finAnimationBossKO(id: string) {
  this.playersRef[id].setAlpha(0)
  this.playersRef[id].ellipse_5_1.setAlpha(0)
}


  update() {
    if (this.room) {
      const { right, left, space, A, Z, E, R, TAB } = this.keyboard

      const inputs = {
        a: A.isDown ? true : false,
        z: Z.isDown ? true : false,
        e: E.isDown ? true : false,
        r: R.isDown ? true : false,
        space: space.isDown ? true : false,
        right: right.isDown ? true : false,
        left: left.isDown ? true : false,
        tab: TAB.isDown ? true : false
      }

      if (!deepEqual(inputs, this.prevInputs)) {
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
