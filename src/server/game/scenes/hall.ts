import PlayerClass from "./class/PlayerClass"
import Platforme from "../../../client/scenes/Platforme"

/**
 * Serveur Phaser 3 Epreuve 1
 */

export default class Hall extends Phaser.Scene {
  players: Phaser.GameObjects.Group
  room: any
  swordHitbox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
  colisionJoueurEnnemie?: any
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
  platforme_haut: Phaser.GameObjects.Rectangle
  platforme_haut_gauche: Phaser.GameObjects.Rectangle
  platforme_haut_droite: Phaser.GameObjects.Rectangle
  platforme_gauche: Phaser.GameObjects.Rectangle
  platforme_droite: Phaser.GameObjects.Rectangle
  layerPlatforme: Phaser.GameObjects.Layer
  compteur: Phaser.Time.TimerEvent


  constructor() {
    super("GameScene")
  }

  setRoom(room: any) {
    this.room = room
  }

  /**
   * Chargement de tout les atlas avec une mini image pour le serveur<br>
   */
  preload() {
    this.load.animation('girlData', __dirname + '/../../../../static/assets/animations.json');
    this.load.atlas('liste_atlas', __dirname + '/../../../../static/assets/fakhear_atlas_serveur.png', __dirname + '/../../../../static/assets/liste_atlas.json');
  }

  /**
   * Création des groupes + platformes + colision
   * Commence le compte à rebours
   */
  create() {
    //@ts-ignore
    // console.log('anims', this.anims.anims.entries);

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
      runChildUpdate: true
    })

    this.groupeManettes = this.physics.add.group({
      runChildUpdate: true,
      allowGravity: false
    })

    this.physics.add.overlap(this.playersAttackZone, [this.enemies, this.players], this.overlapAction, undefined, this)
    this.physics.add.overlap(this.ennemieAttackZone, [this.players], this.overlapActionEnnemie, undefined, this)

    this.playersRef = {}
    this.enemiesRef = {}
  
    const layerPlatforme = this.add.layer();

		const platforme = this.add.rectangle(1837, 940, 128, 128);
    platforme.scaleX = 14.993211052385613;
    platforme.scaleY = -0.08853600509578045;
    platforme.setOrigin(0, 0.5);
    platforme.isFilled = true;
    platforme.fillColor = 10563832;
    platforme.setData('piece', 'hall')
  
    layerPlatforme.add(platforme);

    this.physics.add.existing(platforme, true);
    let listePlatforme = this.physics.add.collider(layerPlatforme.list, [this.players, this.enemies]);
    this.layerPlatforme = layerPlatforme;

    this.colisionShurikenEnnemie = this.physics.add.collider(this.groupeBoulesHuzounet, this.enemies,
      function (_boule: Phaser.Physics.Arcade.Sprite, _ennemie: any) {
      _ennemie.dommage(_boule.getData('degat'))
      _boule.setData('degat', 0)
    }, null, this);

    // this.physics.world.setBoundsCollision(true, true, false, true)
    this.CommencerCompteur()
  }


  /**
   * #### Description
   * Active la fonction du joueur 'action' quand la zone d'interaction (rectangle) overlap
   * 
   * #### Version
   * since: V1.0.0
   * 
   * Overlaps action
   * @param playerActionZone 
   * @param ennemie 
   */
  overlapAction(playerActionZone: any, ennemie: Phaser.Physics.Arcade.Sprite) {
    playerActionZone.action(ennemie)
  }

  /**
   * #### Description
   * Active la fonction 'action' de l'ennmie qui gère l'interaction
   * 
   * #### Version
   * since: V1.0.0
   * 
   * Overlaps action
   * @param ennemieActionZone 
   * @param joueur 
   */
  overlapActionEnnemie(ennemieActionZone: any, joueur: Phaser.Physics.Arcade.Sprite) {
    ennemieActionZone.action(joueur)
  }


  /**
   * #### Description
   * Retourne tout les joueurs et éléments presents dans la partie
   * #### Version
   * since: V1.0.0
   * 
   * Gets presence
   * @returns liste des joueurs/elements présents 
   */
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
    return {
      presences: response,
      presenceList: Object.keys(response),
      boulesListe: Object.keys(response),
      total: Object.keys(response).length,
    }
  }


  /**
   * #### Description
   * 
   * #### Version
   * since: V1.0.0
   * #### Example
   * 
   * #### Links
   * 
   * 
   * Creates player
   * @param ClientId id de la session colyseus
   * @param sprite nom du sprite
   * @returns liste des elements présents 
   */
  createPlayer(ClientId: any, sprite: string) {
    this.time.delayedCall(1000, () => {
      const player = this.add.existing(new PlayerClass(this, 2830, 700, "liste_atlas", ClientId, sprite).setData({ ClientId }))
      player.cible_courante = "enemies"
      this.players.add(player)
      this.playersRef[ClientId] = player
      player.setBounceX(0.2).setDragX(300)

    }, null, this);
      return this.getPresence()
  }


  /**
   * #### Description
   * 
   * #### Version
   * since: V1.0.0
   * #### Example
   * ```ts
   * createEnnemy(1234, 'manette', true, 1000, 200)
   * ```
   * #### Links
   * {@link game/Hall_01 | détail de l'objet des boss (position, nom, etat...) }
   * 
   * 
   * Creates ennemy
   * @param EnnemyId id généré au hazard
   * @param sprite nom du sprite
   * @param [auto] active ou non le mode 'bot' automatique
   * @param [x] emplacement de l'apparition généré dans l'objet des boss
   * @param [y] emplacement de l'apparition généré dans l'objet des boss
   * @returns  
   */
  createEnnemy(EnnemyId: any, sprite: string, auto: boolean = true, x: number = 1000, y: number = 0) {
    this.time.delayedCall(1000, () => {
      const ennemy = this.add.existing(new PlayerClass(this, x, y, "atlas", EnnemyId, sprite, auto).setData({ EnnemyId }))
      ennemy.cible_courante = "players"

      this.enemies.add(ennemy)
      this.enemiesRef[EnnemyId] = ennemy
      ennemy.setBounceX(0.2).setDragX(300)
    }, null, this);

    return this.getPresence()
  }

  
  /**
   * #### Description
   * Suppression de la reference de l'objet et du joueur dans son groupe
   * 
   * #### Version
   * since: V1.0.0
   * 
   * Removes player
   * @param ClientId id du joueur
   * @returns  
   */
  removePlayer(ClientId: any) {
    this.playersRef[ClientId].destroy(true)
    delete this.playersRef[ClientId]
    return this.getPresence()
  }


  /**
   * #### Description
   * Suppression de la reference de l'objet et de l'ennemie dans son groupe
   * 
   * #### Version
   * since: V1.0.0
   * 
   * Removes ennemy
   * @param ClientId 
   * @returns  
   */
  removeEnnemy(ClientId: any) {
    this.enemiesRef[ClientId].destroy(true)
    delete this.enemiesRef[ClientId]
    return this.getPresence()
  }


  /**
   * #### Description
   * Supprime un projectile avec une disparition prossif ou sans
   * #### Version
   * since: V1.0.0
   * #### Example
   * ```ts
   * this.suppressionProjectileDelai(balle, idBalle, 500, true)
   * ```
   * 
   * Suppressions projectile delai
   * @param cible element à supprimer
   * @param id id de l'element à supprimer
   * @param [delai] delai avant la suppression
   * @param [smooth] effet progessif opacité
   * @returns  
   */
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


  /**
   * #### Description
   * Suppression du joueur avec transition possible
   * #### Version
   * since: V1.0.0
   * #### Example
   * ```ts
   * this.suppressionJoueur(joueur, true, joueur.ClientID)
   * ```
   * 
   * Suppressions joueur
   * @param cible 
   * @param smooth 
   * @param id 
   * @param [delai] 
   */
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


  /**
   * #### Description
   * !Non utilisé
   * Supprimer les lignes
   * #### Version
   * since: V1.0.0
   * 
   * Suppressions ligne
   * @param cible ligne à supprimer
   * @param id id de la ligne
   * @param [delai] 
   * @param [smooth] 
   */
  suppressionLigne(cible: Phaser.Physics.Arcade.Sprite, id: number, delai: number = 1000, smooth: boolean = false) {
        this.room.broadcast("suppression", {lignesRef: id});
        this.room.state.lignes.delete(id);
        cible.destroy();
  }



  /**
   * #### Description
   * Toute les 1 secondes incrémente le compteur de 1
   * 
   * #### Version
   * since: V1.0.0
   * 
   * Commencer compteur
   */
  CommencerCompteur() {
    this.compteur = this.time.addEvent({
      delay: 1000,                // ms
      callback: function() {
        this.room.state.compteur += 1
      },
      callbackScope: this,
      loop: true
    });
  }


  /**
   * #### Description
   * Capture le resultat du compteur et convertit en heure + minute + secondes
   * Retoure le resulat en string
   * 
   * #### Version
   * since: V1.0.0
   * #### Example
   * 
   * #### Links
   * 
   * 
   * Stops compteur
   * @returns  
   */
  StopCompteur() {
    const resultat = this.room.state.compteur
    this.compteur.remove()
    return this.secondsToTime(resultat);
  }


  /**
   * #### Description
   * Convertis les millisecondes en heure + minute + secondes
   * 
   * #### Version
   * since: V1.0.0
   * #### Example
   * ```ts
   * secondsToTime(21)
   * ```
   * 
   * Seconds to time
   * @param e nombre à convertir
   * @returns heure + minutes + secondes 
   */
  secondsToTime(e: number){
      const h = Math.floor(e / 3600).toString().padStart(2,'0'),
            m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
            s = Math.floor(e % 60).toString().padStart(2,'0');

      return h + ':' + m + ':' + s;
  }
}
