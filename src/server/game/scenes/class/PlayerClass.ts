import { Player, Commandes } from "../../RoomState"
import { AnimationJoueur } from "../Animations/AnimationJoueur"
import { Aptitudes } from "../Aptitudes/base"
import { DefautDirection } from "../Stats/Defaut"

/**
 * Joueur et interaction
 */

 export default class PlayerClass extends Phaser.Physics.Arcade.Sprite {
   ClientID: any
   sprite: string
   particules: boolean
   animationBossFigurine: Phaser.Tweens.Tween
   bossControllable: Phaser.GameObjects.Group
   aObtenuUnBoss: boolean = false
   gfx: Phaser.GameObjects.Graphics
   vel: number = 600
   pieceCourante: string = 'hall'
   firstFrame: string
   fusionner: boolean
   suivre: boolean
   cible_courante: string = "enemies"
   compteurSaut: number = 0
   iconSuitJoueur: boolean = false
   tweenIcon: Phaser.Tweens.Tween
   canMove: boolean = true
   attaque: boolean = false
   action: any
   zoneInteraction: any
   blesse_opposant: boolean = false
   soigne: boolean = false
   groupeBoules: any
   currentTarget: any
   me: any
   son: string

   survole: boolean = false

   vie: number = 10
   degat: number = 1
   vole: boolean = false;
   constructor(
     scene: Phaser.Scene,
     x: number,
     y: number,
     atlas: string,
     sprite: string,
     frame: string,
     ClientID: string,
     auto?: boolean,
   ) {
     super(scene, x, y, atlas, frame)

     this.init(scene, atlas, sprite, frame, ClientID, auto)
   }

   init(scene: Phaser.Scene, atlas: string, sprite: string, frame: string, ClientID: string, auto: boolean) {
     this.scene = scene
     this.ClientID = ClientID
     this.particules = false
     this.firstFrame = frame;
    
     this.sprite = sprite.substring(0, sprite.indexOf('_'))
    //  this.play(this.sprite + '_idle_walk')

     //initialisation de l'etat du joueur
    //  new AnimationJoueur(this.anims)
     const self = this;
     DefautDirection(Aptitudes, this)
     Aptitudes[this.sprite].StatsSupplementaire.call(self, self, Aptitudes)
     if (!(this.scene as any).room.boss[`${this.sprite}`]) {
       this.scene.time.delayedCall(100, () => {
         this.changeInterfaceClient(this.sprite);
       }, null, this);
     }


     this.currentTarget = this
     this.me = this
     

     this.bossControllable = this.scene.add.group();

     this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {
       this.blesse_opposant = false
       if (anim.key === 'cross') {
         if (frame.frame.name == 'cross4') {
           this.blesse_opposant = true
         }
       }

       if (anim.key === 'attack') {
         if (frame.frame.name == 'positiona4') {
           this.blesse_opposant = true
         }
       }

       if (anim.key === 'akhizonah_couteau') {
         if (frame.frame.name == 'knife2') {
           this.blesse_opposant = true
         }
       }


       if (anim.key === 'straightlead') {
         if (frame.frame.name == 'straightlead1') {
           this.blesse_opposant = true
         }
       }

       if (anim.key === 'osmo_attaque') {
         if (frame.frame.name == 'osmo_attaque3') {
           this.blesse_opposant = true
         }
       }

       if (anim.key === 'twitchman_punch') {
         if (frame.frame.name == 'twitchmanpunch1') {
           this.blesse_opposant = true
         }
       }

       if (anim.key === 'manette_punch') {
         if (frame.frame.name == 'manettepunch1') {
           this.blesse_opposant = true
         }
       }

       if (anim.key === 'attaque') {
         this.blesse_opposant = true
       }
     })

     this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody

     //ACTIVER GRACE À LA FONCTION OVERLAP DE PHASER #hall.ts
     this.zoneInteraction.action = (_e: any) => {

       if (this.blesse_opposant) {
         this.blesse_opposant = false
         if (typeof _e.dommage === "function" && _e.sprite != this.sprite) {
           if (_e.vie <= 0) {
             _e.vie = 10
             if (_e.cible_courante == "enemies") _e.son = 'game-over';
           }
           else
           {
           _e.dommage(this.degat)
           }
         }
       }

       if (this.soigne) {
         _e.vie += 0.01
       }
     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     if (this.scene) (this.scene as any).playersAttackZone.add(this.zoneInteraction);

     if (auto) {
       if (Aptitudes[this.sprite].auto) Aptitudes[this.sprite].auto((this as any), {}, Aptitudes[this.sprite]);
     }

   }
   preUpdate(time: number, delta: number) {
     super.preUpdate(time, delta);

     const input = (this.scene as any).room.donnes[this.ClientID].clavier
     let { right, left, space, a, z, e, r, up, down, a_fin, left_fin, right_fin, space_fin, z_fin, left_debut, right_debut, tab, tab_fin } = input
     let animationName = this.anims.getFrameName()


     if (this.canMove) {
       this.zoneInteraction.setPosition(this.x + (this.flipX ? -150 : 150), this.y);

       if (a || a_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].A === "function" && Aptitudes[this.currentTarget.sprite].A(this.currentTarget, input);
       if (z || z_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].Z === "function" && Aptitudes[this.currentTarget.sprite].Z(this.currentTarget, input);
       if (e) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].E === "function" && Aptitudes[this.currentTarget.sprite].E(this.currentTarget, input);
       if (r) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].R === "function" && Aptitudes[this.currentTarget.sprite].R(this.currentTarget, input);
       if (tab || tab_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].TAB === "function" && Aptitudes[this.currentTarget.sprite].TAB(this.currentTarget, input);
       if (left || left_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheGauche === "function" && Aptitudes[this.currentTarget.sprite].toucheGauche(this.currentTarget, input)
       if (right || right_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheDroite === "function" && Aptitudes[this.currentTarget.sprite].toucheDroite(this.currentTarget, input)
       if (up) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheHaut === "function" && Aptitudes[this.currentTarget.sprite].toucheHaut(this.currentTarget, input)
       if (down) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheBas === "function" && Aptitudes[this.currentTarget.sprite].toucheBas(this.currentTarget, input)
       if (space) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheEspace === "function" && Aptitudes[this.currentTarget.sprite].toucheEspace(this.currentTarget, input);

       if (left_fin) input.left_fin = false;
       if (z_fin) input.z_fin = false;
       if (right_fin) input.right_fin = false;
       if (space_fin) input.space_fin = false;
       if (right_debut) input.right_debut = false
       if (left_debut) input.left_debut = false;
       if (tab_fin) input.tab_fin = false;
     }

     if (this.suivre) {
        this.setPosition(this.currentTarget.getTopCenter().x, this.currentTarget.getTopCenter().y - 70)
     }

     if (this.vie <= 0) {
       this.vie = 10;
       if (this.cible_courante == "players") this.animationBossVaincu()
       else this.respawn()
     }

     (this.scene as any).room.state.presences.set(
       this.ClientID,
       new Player({
         id: this.ClientID,
         x: this.x,
         y: this.y,
         sprite: this.sprite,
         scale: this.scale,
         alpha: this.alpha,
         anim: animationName,
         flipX: this.flipX,
         tint: this.tintBottomLeft,
         vie: this.vie,
         xa: this.zoneInteraction.x,
         ya: this.zoneInteraction.y,
         son: this.son,
         particules: this.particules,
         firstFrame: this.firstFrame
       })
     )

     if (this.particules) this.particules = false;
     if (this.son) this.son = undefined;



   }

   /**
    * #### Description
    * Change la couleur du personnage en rouge pendant 100ms<br>
    * Puis diminue la vie selon la puissance reçu
    * 
    * #### Version
    * since: V1.0.0
    * #### Example
    * ```ts
    * dommage(3)
    * ```
    * 
    * Dommages player class
    * @param puissance degat de l'attaquant
    */
   dommage(puissance: number) {
     if (this.scene) {
     this.setTint(0xff0000)
       this.scene.time.delayedCall(100, () => {
         this.clearTint()
       }, null, this);
       if (puissance >= 0) {
         this.vie -= puissance
       }
     }
   }



   /**
    * #### Description
    * Change la liste des commandes ou/et de l'icon selon<br>
    * selon les commandes disponibles du joueur
    * 
    * #### Version
    * since: V1.0.0
    * #### Example
    * ```ts
    * changeInterfaceClient('fakhear', true);
    * ```
    * 
    * 
    * #### Links
    * {@link game/scenes/Aptitudes/base | fonctionnement de la construction de l'objet pour les touches }
    * 
    * Changes interface client
    * @param sprite 
    * @param [icon] 
    */
   changeInterfaceClient(sprite: string, icon: boolean = false) {
       (this.scene as any).room.state.presences.set(
         this.ClientID,
         new Player( icon ? {
           sprite_fusion: sprite,
           commandes: new Commandes(Aptitudes[sprite]["commandes"])
         } : {
           commandes: new Commandes(Aptitudes[sprite]["commandes"])
         })
       );
   }


   /**
    * #### Description
    * Déplacer le joueur dans le hall + animation opacité <br>
    * Ajout du personnage dans l'objet joueur
    * 
    * #### Version
    * since: V1.0.0
    * 
    * Respawns player class
    */
   respawn() {
     this.scene.tweens.add({
       targets: this,
       // alpha: 0.2,
       duration: 200,
       repeat: 3,
       yoyo: true
     });
     this.scene.tweens.add({
       targets: this,
       x: 2830,
       y: 755,
       duration: 500,
       onComplete: function() {
         if (arguments[1][0].scene){
           arguments[1][0].scene.players.add(arguments[1][0])
         }
       }
     });

   }


   /**
    * #### Description
    * Change l'état du boss en "vaincu"<br>
    * Emit le Débloquage d'un étage au client selon le boss vaincu<br>
    * Ajout une animation au boss et modifie sa dimension
    * 
    * #### Version
    * since: V1.0.0
    * 
    * Animations boss vaincu
    */
   animationBossVaincu() {
     this.setScale(0.5);
     this.particules = true;
     (this.scene as any).room.boss[`${this.sprite}`].vaincu = true;

     if ((this.scene as any).room.boss["twitchman"].vaincu && (this.scene as any).room.boss["boss_1"].vaincu)
     {
       (this.scene as any).room.broadcast("RDC_OK");
     }

     if ((this.scene as any).room.boss["troll"].vaincu && (this.scene as any).room.boss["manette"].vaincu)
     {
       (this.scene as any).room.broadcast("ETAGE_OK");
       (this.scene as any).enemiesRef[(this.scene as any).room.boss["super_boss"].id].setActive(true);
       (this.scene as any).enemiesRef[(this.scene as any).room.boss["super_boss"].id].trones.setActive(true);
     }

     if (
       (this.scene as any).room.boss["troll"].vaincu &&
       (this.scene as any).room.boss["twitchman"].vaincu &&
       (this.scene as any).room.boss["manette"].vaincu &&
       (this.scene as any).room.boss["boss_1"].vaincu &&
       (this.scene as any).room.boss["super_boss"].vaincu
     )
     {
       const joueur = [];
       const resultat = (this.scene as any).StopCompteur();
       (this.scene as any).players.getChildren().forEach((j: any) => {
         joueur.push(j.sprite);
       });
       (this.scene as any).room.broadcast("FIN_JEU", {temps: resultat, joueur});
     }

     (this.body as any).setAllowGravity(false);
     this.setVelocity(0)
     this.setPushable(false);
     this.animationBossFigurine = this.scene.tweens.add({
       targets: this,
       y: "-=90",
       alpha: 0.5,
       ease: 'Sine.inOut',
       yoyo: true,
       duration: 1000,
       repeat: -1
     });
   }
 }
