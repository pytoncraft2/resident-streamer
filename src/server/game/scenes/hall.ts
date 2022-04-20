// import { Player } from "../RoomState"

import Boss1_Class from "./class/bosses/Boss1_Class"
// import PlayerClass from "./class/PlayerClass"
// import { RegisterPlayer } from "./types/RegisterPlayer"


/**
 * Serveur Phaser 3 Epreuve 1
 */

 Phaser.GameObjects.GameObjectFactory.register(
   'slime',
   function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
     // same logic as JavaScript example
   }
 )

export class Slime extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'slime')
	}

	changeColor()
	{
		this.tint = 0xffee0d
	}

	// ... other methods and actions
}

export default class Hall extends Phaser.Scene {
  players: Phaser.GameObjects.Group
  room: any
  swordHitbox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  colisionJoueurEnnemie?: any
  // groupeBoules: any
  colisionShurikenEnnemie: any
  enemies: Phaser.GameObjects.Group
  playersAttackZone: Phaser.GameObjects.Group
  groupeBoules: Phaser.GameObjects.Group
  playersRef: any
  enemiesRef: any


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


    this.groupeBoules = this.physics.add.group({
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
this.physics.add.overlap(this.playersAttackZone, this.enemies, this.overlapAction, undefined, this)
this.physics.add.overlap(this.players, this.enemies);


    this.playersRef = {}
    this.enemiesRef = {}

    const platforme = this.add.rectangle(955, 1000, 128, 128);
    platforme.scaleX = 43.50112225681497;
    platforme.scaleY = 1.449878006775927;
    this.physics.world.setBounds(platforme.getBottomLeft().x, 0, platforme.displayWidth, 1000);
    this.physics.add.existing(platforme, true);
    this.physics.add.collider(platforme, this.players);
    this.physics.add.collider(platforme, this.enemies);
    this.colisionJoueurEnnemie = this.physics.add.collider(this.players, this.enemies);

    this.colisionShurikenEnnemie = this.physics.add.collider(this.groupeBoules, this.enemies,
      function (_boule, _ennemie: any) {
        // console.log("DDDDDDDDDDDDDDATA")
        // console.log(_boule.data.list.puissance)
      _ennemie.blesse_ennemie(_boule.data.list.puissance)
        // _boule.destroy(true)
    });
    this.events.on('boss_KO', this.boss_KO, this);
    this.events.on('boss_KO-proprietaire', this.boss_KO_proprietaire, this);

  }

  overlapAction(playerActionZone: any, ennemie: Phaser.Physics.Arcade.Sprite) {
    playerActionZone.action(ennemie)
  }

  boss_KO(id: string) {
    // this.removeEnnemy(`${id}`)
    // this.room.state.presences.delete(`${id}`)
    this.room.broadcast("boss-KO", `${id}`);

    console.log(`BOSS ${id} KO !`)
  }

  boss_KO_proprietaire(id: string) {
    this.room.broadcast("boss-KO-proprietaire", id);
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

    if (this.groupeBoules) {
      console.log("IIIIIIIIIIIIITERATE")
      this.groupeBoules.children.iterate((child: any)=> {
        if (child.data.values.ClientId) {
          response[child.data.values.ClientId] = { x: child.x, y: child.y, alpha: child.alpha}
        }
      })
    }


    return {
      presences: response,
      presenceList: Object.keys(response),
      boulesListe: Object.keys(response),
      total: Object.keys(response).length,
    }
  }

  createPlayer(ClientId: any, sprite: string) {
    // const player = this.add.existing(new PlayerClass(this, 100, 100, "atlas", ClientId).setData({ ClientId }))
    const slime: ISlime = this.add.slime()
    // slime.changeColor()
     // console.log(new RegisterPlayer(this, 100, 100, "atlas", ClientId))

    // const player = this.add.player
    // this.players.add(player)
    // this.playersRef[ClientId] = player
    // player.setBounceX(0.2)
    // player.setDragX(300)
    console.log("GOO")


    return this.getPresence()
  }

  createEnnemy(EnnemyId: any, sprite: string) {
    // const ennemy = new EnnemyClass(this, 3539, 706, "atlas", EnnemyId).setData({ EnnemyId })
    const ennemy = this.add.existing(new Boss1_Class(this, 1000, 0, "atlas", EnnemyId).setData({ EnnemyId }))
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

  update(time, deltaTime) {


  }
}
