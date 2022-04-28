
// You can write more code here
interface Initialisation {
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
  prevInputs?: { a: boolean, z: boolean, e: boolean, r: boolean, space: boolean, right: boolean, left: boolean }
  attaqueDirecte: boolean = false
  directeA: boolean = false
  emitter: any
  animationBoosFigurine: any



	init(info: Initialisation)  {
		this.salon = info.salon
		this.personnage = info.personnage
	}


	async create() {

		this.editorCreate();

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

    this.time.addEvent({
      delay: 1000,
      callback: () => (this.compte += 1, this.compteur.setText(`${this.compte+1}`)),
      callbackScope: this,
      loop: true
    });

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
    this.projectilesRef = {}

		this.playersRef = {}
		this.ennemyRef = {}
		this.boulesRef = {}
		this.kunaisRef = {}
    this.bombesRef = {}

		this.keyboard = this.input.keyboard.addKeys("up,right,left,down,space,A,Z,E,R")

    this.barreHautContainer.setScrollFactor(0)


		const client = new Colyseus.Client("ws://localhost:3000")
		const salon = this.salon;
		const sprite = this.personnage;

		await client
		.joinOrCreate("game_instance", { salon: salon, sprite: sprite })
		.then((room) => {
			self.room = room
			self.session = room.sessionId

      room.onMessage("boss-KO", (id) => {

        this.animationBossKO(id)

      });

      room.onMessage("boss-KO-proprietaire", (id) => {

        this.finAnimationBossKO(id.id_ennemie)
        this.animationBoosFigurine.stop()

        this.emitter.startFollow(this.playersRef[id.id_joueur])

      });

			room.onStateChange((changes: any) => {
				let presences : any = {}
				let boules : any = {}
				let kunais : any = {}
				let bombes : any = {}
        let projectiles: any = {}

        changes.projectiles.forEach((value: any, key: any) => {
					projectiles[key] = value
				})

				changes.presences.forEach((value: any, key: any) => {
					presences[key] = value
				})
        changes.boules.forEach((value: any, key: any) => {
          boules[key] = value
        })
        changes.kunais.forEach((value: any, key: any) => {
          kunais[key] = value
        })
        changes.bombes.forEach((value: any, key: any) => {
          bombes[key] = value
        })
				self.patchPlayer({
					presences: presences,
					presenceList: Object.keys(presences),
					boulesListe: Object.keys(boules),
					kunaisListe: Object.keys(kunais),
					bombesListe: Object.keys(bombes),
          projectilesListe: Object.keys(projectiles),
          boules: boules,
          kunais: kunais,
          bombes: bombes,
          projectiles: projectiles,
				})
			})

		})
		.catch((err) => {
			console.error(err)
		})


	}


	async patchPlayer(list: any) {


    // console.log(list.projectilesListe)
    list.projectilesListe.map((item: string) => {
        if (this.projectilesRef[list.projectiles[item].id] === undefined) {
          console.log("NNNNNNNNNNNNNNNNNNADA")  
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

          (player as any).zoneAttaque = this.add.rectangle(0, 0 ,player.displayWidth, player.displayHeight, 0x0e88bd, 0.5).setDepth(400);

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
          barre.add(vie);
          barre.add(rectangle);

          (player as any).barre = barre

          if (sprite == 'boss_1') player.setScale(0.6);
          (player as any).ClientId = list.presenceList[idx];
					this.players.add(player)
					this.playersRef[item] = player

				}
			} else {
				if (list.presences[item].sprite) {
					this.playersRef[item].x = list.presences[item].x
					this.playersRef[item].y = list.presences[item].y
            if (list.presences[item].sprite == 'boss_1') this.vie_boss_1.setScale(Phaser.Math.Clamp(list.presences[item].vie, 0, 9.47) , 0.30320712838431607)
            this.playersRef[item].setFrame(list.presences[item].anim)
            this.playersRef[item].flipX = list.presences[item].flipX
            this.playersRef[item].setTint(list.presences[item].tint)
            this.playersRef[item].zoneAttaque.setPosition(list.presences[item].xa, list.presences[item].ya)
            this.playersRef[item].barre.last.setScale(Phaser.Math.Clamp(list.presences[item].vie/(this.playersRef[item].barre.first.scaleX*10), 0, 1) , 0.0881985701178345)
            this.playersRef[item].barre.setPosition(this.playersRef[item].getTopCenter().x - 45, this.playersRef[item].getTopCenter().y - 25)
				}
			}
		})

		this.players.children.iterate((child) => {
			if (list.presences[child.data.values.ClientId] === undefined) {
				this.playersRef[child.data.values.ClientId].destroy(true)
				delete this.playersRef[child.data.values.ClientId]
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

  animationBossKO(id: string) {
    this.playersRef[id].setScale(0.15956409567640198, 0.15956409567640198).clearTint().setDepth(0.1)
    const ellipse_5_1 = this.add.ellipse(280, 256, 128, 128);
    ellipse_5_1.scaleX = 0.9012990507210408;
    ellipse_5_1.scaleY = 0.21224071572889464;
    ellipse_5_1.isFilled = true;
    ellipse_5_1.fillColor = 7473815;
    ellipse_5_1.fillAlpha = 0.8;
    ellipse_5_1.isStroked = true;
    ellipse_5_1.lineWidth = 4;
    ellipse_5_1.setPosition(this.playersRef[id].getBottomCenter().x, 879)
    this.playersRef[id].barre.setAlpha(0)
    this.playersRef[id].ellipse_5_1 = ellipse_5_1
    this.animationBoosFigurine = this.tweens.add({
      targets: this.playersRef[id],
      y: "-=90",
      alpha: 0.5,
      ease: 'Sine.inOut',
      yoyo: true,
      duration: 1000,
      repeat: -1
    });

    var particles = this.add.particles('flares');

    this.emitter = particles.createEmitter({
      frame: 'blue',
      x: this.playersRef[id].getBottomCenter().x,
      y: 879,
      speedY: { min: -200, max: -400 },
      lifespan: 2000,
      scale: { start: 0.4, end: 0 },
      quantity: 2,
      blendMode: 'ADD',
    });
    console.log("message received from server");
  }

  finAnimationBossKO(id: string) {
    this.playersRef[id].setAlpha(0)
    this.playersRef[id].ellipse_5_1.setAlpha(0)
  }

  update() {
    if (this.room) {
      const { right, left, space, A, Z, E, R } = this.keyboard

      const inputs = {
        a: A.isDown ? true : false,
        // a_fin: A.isUp ? true : false,
        z: Z.isDown ? true : false,
        e: E.isDown ? true : false,
        r: R.isDown ? true : false,
        space: space.isDown ? true : false,
        right: right.isDown ? true : false,
        // right_fin: Phaser.Input.Keyboard.JustUp(right),
        left: left.isDown ? true : false,
        // left_fin: Phaser.Input.Keyboard.JustUp(left)
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
          right_fin: Phaser.Input.Keyboard.JustUp(right),
          left_fin: Phaser.Input.Keyboard.JustUp(left)
        })
      }
    }
  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
