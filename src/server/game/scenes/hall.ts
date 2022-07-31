// import { Player } from "../RoomState"

import PlayerClass from "./class/PlayerClass"



/**
 * Serveur Phaser 3 Epreuve 1
 */

export default class Hall extends Phaser.Scene {
  players: Phaser.GameObjects.Group
  room: any
  swordHitbox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  colisionJoueurEnnemie?: any
  // groupeBoules: any
  colisionShurikenEnnemie: any
  enemies: Phaser.GameObjects.Group
  playersAttackZone: Phaser.GameObjects.Group
  ennemieAttackZone: Phaser.GameObjects.Group
  groupeBoulesHuzounet: Phaser.GameObjects.Group
  groupeManettes: Phaser.GameObjects.Group
  playersRef: any
  enemiesRef: any
  platforme: Phaser.GameObjects.Rectangle
  rect: any


  constructor() {
    super("GameScene")
  }

  setRoom(room: any) {
    this.room = room
  }

  preload() {
    this.load.atlas('atlas', __dirname + '/../../../../static/assets/fakhear_atlas_serveur.png', __dirname + '/../../../../static/assets/fakhear_atlas.json');
  }

  create() {

    var customBounds = new Phaser.Geom.Rectangle(-3700 / 2, 20, 5660, 945);




    this.players = this.physics.add.group({
      runChildUpdate: true,
      // customBoundsRectangle: customBounds,
      // collideWorldBounds: true
    })

    // Phaser.Actions.RandomRectangle(this.players.getChildren(), customBounds);
    this.enemies = this.physics.add.group({
      runChildUpdate: true,
      // collideWorldBounds: true
    })

    this.playersAttackZone = this.physics.add.group({
      allowGravity: false
    })

    this.ennemieAttackZone = this.physics.add.group({
      allowGravity: false
    })

    this.groupeBoulesHuzounet = this.physics.add.group({
      runChildUpdate: true,
      collideWorldBounds: true
    })

    this.groupeManettes = this.physics.add.group({
      runChildUpdate: true,
      collideWorldBounds: true,
      allowGravity: false
    })


    // this.swordHitbox = this.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
// this.physics.add.existing(this.swordHitbox)
// this.swordHitbox.body.enable = false
// this.physics.world.remove(this.swordHitbox.body)

// this.physics.add.collider(this.players.getChildren()[0], this.box)

// TODO: add physics overlap with dummy box; show box damaged on overlap
// this.boxStateMachine.setState('damage')
this.physics.add.overlap(this.playersAttackZone, [this.enemies, this.players], this.overlapAction, undefined, this)
this.physics.add.overlap(this.ennemieAttackZone, [this.players], this.overlapActionEnnemie, undefined, this)
// this.physics.add.overlap(this.players, this.enemies);


    this.playersRef = {}
    this.enemiesRef = {}
    // const platforme = this.add.rectangle(716.7470889640784, 894.3987579810794, 128, 128);
    // platforme.scaleX = 4.6929101228048555;
    // platforme.scaleY = 0.11649497828162556;
    // platforme.setOrigin(0, 0.5);
    // platforme.isFilled = true;
    // platforme.fillColor = 0x000000;

		const platforme = this.add.rectangle(1837, 939, 128, 128);
    platforme.scaleX = 14.993211052385613;
    platforme.scaleY = -0.08853600509578045;
    platforme.setOrigin(0, 0.5);
    platforme.isFilled = true;
    platforme.fillColor = 10563832;
    platforme.setData('piece', 'hall')
    this.platforme = platforme;

		const platforme_gauche = this.add.rectangle(5, 940, 128, 128);
		platforme_gauche.scaleX = 14.310196671161355;
		platforme_gauche.scaleY = -0.09826542861018456;
		platforme_gauche.setOrigin(0, 0.5);
		platforme_gauche.isFilled = true;
		platforme_gauche.fillColor = 10563832;
    platforme_gauche.setData('piece', 'bas_gauche')

		const platforme_droite = this.add.rectangle(3756, 940, 128, 128);
    platforme_droite.scaleX = 14.310196671161355;
    platforme_droite.scaleY = -0.09826542861018456;
    platforme_droite.setOrigin(0, 0.5);
    platforme_droite.isFilled = true;
    platforme_droite.fillColor = 10563832;
    platforme_droite.setData('piece', 'boss1')

		const platforme_haut = this.add.rectangle(1833, -66, 128, 128);
		platforme_haut.scaleX = 14.993211052385613;
		platforme_haut.scaleY = -0.08853600509578045;
		platforme_haut.setOrigin(0, 0.5);
		platforme_haut.isFilled = true;
		platforme_haut.fillColor = 10563832;
    platforme_droite.setData('piece', 'haut')

		// platforme_haut_droite
		const platforme_haut_droite = this.add.rectangle(3752, -66, 128, 128);
		platforme_haut_droite.scaleX = 14.310196671161355;
		platforme_haut_droite.scaleY = -0.09826542861018456;
		platforme_haut_droite.setOrigin(0, 0.5);
		platforme_haut_droite.isFilled = true;
		platforme_haut_droite.fillColor = 10563832;
    platforme_droite.setData('piece', 'haut_droite')

		// platforme_haut_gauche
		const platforme_haut_gauche = this.add.rectangle(1, -66, 128, 128);
		platforme_haut_gauche.scaleX = 14.310196671161355;
		platforme_haut_gauche.scaleY = -0.09826542861018456;
		platforme_haut_gauche.setOrigin(0, 0.5);
		platforme_haut_gauche.isFilled = true;
		platforme_haut_gauche.fillColor = 10563832;
    platforme_droite.setData('piece', 'bas_droite')


    // this.colisionShurikenEnnemie = this.physics.add.collider(this.groupeBoulesHuzounet, this.enemies,
      // function (_p: Phaser.Physics.Arcade.Sprite, _joueur: any) {
        // _joueur.pieceCourante = _p.getData('piece')
      // }, null, this);


    // const platforme = this.add.rectangle(955, 1200, 40000, 10);
    // this.physics.world.setBounds(platforme.getBottomLeft().x, 0, platforme.displayWidth, 1000);
    this.physics.add.existing(platforme, true);
    this.physics.add.existing(platforme_gauche, true);
    this.physics.add.existing(platforme_droite, true);
    this.physics.add.existing(platforme_haut, true);
    this.physics.add.existing(platforme_haut_gauche, true);
    this.physics.add.existing(platforme_haut_droite, true);
    let listePlatforme = this.physics.add.collider([platforme, platforme_droite, platforme_gauche, platforme_haut, platforme_haut_gauche, platforme_haut_droite], [this.players, this.enemies]);

    // this.physics.add.collider(platforme, this.enemies);
    // this.colisionJoueurEnnemie = this.physics.add.collider(this.players, this.enemies);


    this.colisionShurikenEnnemie = this.physics.add.collider(this.groupeBoulesHuzounet, this.enemies,
      function (_boule: Phaser.Physics.Arcade.Sprite, _ennemie: any) {
      _ennemie.dommage(_boule.getData('degat'))
      _boule.setData('degat', 0)
    }, null, this);

    this.CommencerCompteur()
  }

  overlapAction(playerActionZone: any, ennemie: Phaser.Physics.Arcade.Sprite) {
    playerActionZone.action(ennemie)
  }

  overlapActionEnnemie(ennemieActionZone: any, joueur: Phaser.Physics.Arcade.Sprite) {
    ennemieActionZone.action(joueur)
  }

  getPresence() {
    let response = {}
    if (this.players) {
      this.players.children.iterate((child: any) => {
        if (child.data.values.ClientId) {
          // response[child.data.values.ClientId] = { x: child.x, y: child.y, sprite: child.sprite, vie: child.vie}
          response[child.data.values.ClientId] = { x: child.x, y: child.y }
        }
      })
    }

    if (this.groupeBoulesHuzounet) {
      // this.groupeBoulesHuzounet.children.iterate((child: any)=> {
      //   if (child.data.values.ClientId) {
      //     response[child.data.values.ClientId] = { x: child.x, y: child.y, alpha: child.alpha}
      //   }
      // })
    }


    return {
      presences: response,
      presenceList: Object.keys(response),
      boulesListe: Object.keys(response),
      total: Object.keys(response).length,
    }
  }

  createPlayer(ClientId: any, sprite: string) {
    const player = this.add.existing(new PlayerClass(this, 2830, 700, "atlas", ClientId, sprite).setData({ ClientId }))
    this.players.add(player)
    this.playersRef[ClientId] = player
    player.setBounceX(0.2)
    player.setDragX(300)


    return this.getPresence()
  }

  createEnnemy(EnnemyId: any, sprite: string, auto: boolean = true, x: number = 1000, y: number = 0) {
    // const ennemy = new EnnemyClass(this, 3539, 706, "atlas", EnnemyId).setData({ EnnemyId })
    const ennemy = this.add.existing(new PlayerClass(this, x, y, "atlas", EnnemyId, sprite, auto).setData({ EnnemyId }))
    // ennemy.setPushable(false)
    // ennemy.setDisplaySize(335, 540.4)
    // ennemy.setBounceX(40)

    this.enemies.add(ennemy)
    this.enemiesRef[EnnemyId] = ennemy
    ennemy.setBounceX(0.2)
    ennemy.setDragX(300)

    return this.getPresence()
  }

  removePlayer(ClientId: any) {
    this.playersRef[ClientId].destroy(true)
    delete this.playersRef[ClientId]
    return this.getPresence()
  }

  removeEnnemy(ClientId: any) {
    this.enemiesRef[ClientId].destroy(true)
    delete this.enemiesRef[ClientId]
    return this.getPresence()
  }

  suppressionProjectileDelai(cible: Phaser.Physics.Arcade.Sprite, id: number, delai: number = 1000, smooth: boolean = false) {
    return this.time.delayedCall(delai, () => {
      if (smooth)
      {
        this.tweens.add({
          targets: cible,
          alpha: 0,
          duration: 400,
          onCompleteParams: [this],
          onComplete: function(_tw, _target, scene) {
            scene.room.broadcast("suppression", {projectilesRef: id});
            scene.room.state.projectiles.delete(id);
            arguments[1][0].destroy(true);
          }
        });
      }
      else
      {
        this.room.broadcast("suppression", {projectilesRef: id});
        this.room.state.projectiles.delete(id);
        cible.destroy(true);
      }
    }, null, this);
  }

  suppressionJoueur(cible: Phaser.Physics.Arcade.Sprite, smooth: boolean, id: number, delai: number = 1000) {

    if (smooth)
    {
      this.tweens.add({
        targets: cible,
        alpha: 0,
        duration: delai,
        onCompleteParams: [this],
        onComplete: function(_tw, _target, scene) {
          scene.room.broadcast("suppression", {playersRef: id});
          scene.room.state.presences.delete(id);
          arguments[1][0].destroy(true);
        }
      });
    }
    else
    {
      this.room.broadcast("suppression", {playersRef: id});
      this.room.state.presences.delete(id);
      cible.destroy(true);
    }

  }

  suppressionLigne(cible: Phaser.Physics.Arcade.Sprite, id: number, delai: number = 1000, smooth: boolean = false) {
    // return this.time.delayedCall(delai, () => {
        this.room.broadcast("suppression", {lignesRef: id});
        this.room.state.lignes.delete(id);
        cible.destroy();
    // }, null, this);
  }


  CommencerCompteur() {
    this.time.addEvent({
      delay: 1000,                // ms
      callback: function() {
        this.room.state.compteur += 1
      },
      callbackScope: this,
      loop: true
    });
  }
}
