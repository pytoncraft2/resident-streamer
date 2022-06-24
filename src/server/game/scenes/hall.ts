// import { Player } from "../RoomState"

import BossClass from "./class/bosses/BossClass"
import { Compteur } from "../RoomState"
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
  playersRef: any
  enemiesRef: any
  containerColision: Phaser.GameObjects.Container
  rect: any


  constructor() {
    super("GameScene")
  }

  setRoom(room: any) {
    this.room = room
  }

  preload() {
    this.load.atlas('atlas', __dirname + '/../../../../static/assets/fakhear_atlas.png', __dirname + '/../../../../static/assets/fakhear_atlas.json');
  }

  create() {

    this.players = this.physics.add.group({
      runChildUpdate: true,
      collideWorldBounds: true
    })

    this.enemies = this.physics.add.group({
      runChildUpdate: true,
      collideWorldBounds: true
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




    // this.swordHitbox = this.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
// this.physics.add.existing(this.swordHitbox)
// this.swordHitbox.body.enable = false
// this.physics.world.remove(this.swordHitbox.body)
// console.log(this.swordHitbox.body)

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

    const platforme = this.add.rectangle(1, 939, 128, 128);
    platforme.scaleX = 14.993211052385613;
    platforme.scaleY = -0.08853600509578045;
    platforme.setOrigin(0, 0.5);
    platforme.isFilled = true;
    platforme.fillColor = 10563832;

    // const platforme = this.add.rectangle(955, 1200, 40000, 10);
    // this.physics.world.setBounds(platforme.getBottomLeft().x, 0, platforme.displayWidth, 1000);
    this.physics.add.existing(platforme, true);
    this.physics.add.collider(platforme, [this.players, this.enemies]);

    // this.physics.add.collider(platforme, this.enemies);
    // this.colisionJoueurEnnemie = this.physics.add.collider(this.players, this.enemies);

    // this.containerColision = this.add.container(0,0);


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
      console.log("IIIIIIIIIIIIITERATE")
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
    const player = this.add.existing(new PlayerClass(this, 100, 100, "atlas", ClientId, sprite).setData({ ClientId }))
    this.players.add(player)
    this.playersRef[ClientId] = player
    player.setBounceX(0.2)
    player.setDragX(300)


    return this.getPresence()
  }

  createEnnemy(EnnemyId: any, sprite: string) {
    // const ennemy = new EnnemyClass(this, 3539, 706, "atlas", EnnemyId).setData({ EnnemyId })
    const ennemy = this.add.existing(new PlayerClass(this, 1000, 0, "atlas", EnnemyId, sprite).setData({ EnnemyId }))
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

  CommencerCompteur() {
    var timer = this.time.addEvent({
      delay: 1000,                // ms
      callback: function() {
        this.room.state.compteur += 1
      },
      callbackScope: this,
      loop: true
    });
  }

  callback(r) {
    console.log("AUGMENTATION")
      // r.compteur += 1
  }
}
