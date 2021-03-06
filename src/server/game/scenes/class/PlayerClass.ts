import { Player } from "../../RoomState"
import { AnimationJoueur } from "../Animations/AnimationJoueur"
import { Aptitudes } from "../Aptitudes/base"
import TJoueur from "../types/Joueur"
import { DefautDirection } from "../Stats/Defaut"

/**
 * Joueur et interaction
 */

 export default class PlayerClass extends Phaser.Physics.Arcade.Sprite {
   ClientID: any
   sprite: string
   particules: boolean
   gfx: Phaser.GameObjects.Graphics
   vel: number = 600
   fusionner: boolean
   suivre: boolean
   cible_courante: string
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

   survole: boolean = false

   vie: number = 10
   degat: number = 1
   vole: boolean = false;
   constructor(
     scene: Phaser.Scene,
     x: number,
     y: number,
     atlas: string,
     ClientID: string,
     sprite: string,
     auto?: boolean
   ) {
     super(scene, x, y, atlas, sprite)

     this.init(scene, ClientID, sprite, auto)
   }

   init(scene: Phaser.Scene, ClientID: string, sprite: string, auto: boolean) {
     this.scene = scene
     this.ClientID = ClientID
     this.particules = false
     this.sprite = sprite

     new AnimationJoueur(this.anims)
     const self = this;
     DefautDirection(Aptitudes, this)
     Aptitudes[this.sprite].StatsSupplementaire.call(self, self, Aptitudes)

     this.currentTarget = this
     this.me = this

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

     //ACTIVER GRACE ?? LA FONCTION OVERLAP DE PHASER #hall.ts
     this.zoneInteraction.action = (_e: any) => {

       if (this.blesse_opposant) {
         this.blesse_opposant = false
         if (typeof _e.dommage === "function" && _e.sprite != this.sprite) {
           if (_e.vie <= 0) {

             _e.vie = 10

             this.nouveauPilote(_e);
             // (this.scene as any).players.add(_e);
           }
           else
           {
           _e.dommage(1)
           }

         }
       }

       if (this.soigne) {
         _e.vie += 0.01
       }

       if (this.fusionner && _e.sprite != this.sprite) {
        console.log("FUSION !!!!!!!!!!!!!!");
        _e.cible_courante = "enemies";
        (this.scene as any).room.state.presences.set(
          this.ClientID,
          new Player({
            sprite_fusion: _e.sprite,
          })
        )
        this.fusionner = false;
         this.nouveauPilote(_e);
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
     let { right, left, space, a, z, e, r, a_fin, left_fin, right_fin, space_fin, z_fin, left_debut, right_debut, tab, tab_fin } = input
     let animationName = this.anims.getFrameName()


     if (this.canMove) {
       this.zoneInteraction.setPosition(this.x + (this.flipX ? -150 : 150), this.y);

       if (a || a_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].A === "function" && Aptitudes[this.currentTarget.sprite].A(this.currentTarget, input);
       if (z || z_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].Z === "function" && Aptitudes[this.currentTarget.sprite].Z(this.currentTarget, input);
       if (e) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].E === "function" && Aptitudes[this.currentTarget.sprite].E(this.currentTarget, input);
       if (r) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].R === "function" && Aptitudes[this.currentTarget.sprite].R(this.currentTarget, input);
       if (tab??|| tab_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].TAB === "function" && Aptitudes[this.currentTarget.sprite].TAB(this.currentTarget, input);
       /*this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheR === "function" && Aptitudes[this.currentTarget.sprite].toucheR(this.currentTarget);*/
       if (left??|| left_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheGauche === "function" && Aptitudes[this.currentTarget.sprite].toucheGauche(this.currentTarget, input)
       if (right??|| right_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheDroite === "function" && Aptitudes[this.currentTarget.sprite].toucheDroite(this.currentTarget, input)
       if (space) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheEspace === "function" && Aptitudes[this.currentTarget.sprite].toucheEspace(this.currentTarget, input);

       if (left_fin) input.left_fin = false;
       if (z_fin) input.z_fin = false;
       // if (a_fin) input.a_fin = false;
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
       this.setAlpha(0.2);
       this.respawn();
       // (this.scene as any).players.remove(this)
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
         particules: this.particules,
         xa: this.zoneInteraction.x,
         ya: this.zoneInteraction.y
       })
     )

   }

   dommage(puissance: number) {
     //   this.play('attaque')
     //   this.setFlipX(directionFinal)
     if (this.scene) {
     this.setTint(0xff0000)
       this.scene.time.delayedCall(100, () =>??{
         this.clearTint()
       }, null, this);
       if (puissance >= 0) {
         this.vie -= puissance
       }
     }
   }

   nouveauPilote(nouveauPilote: TJoueur) {
     nouveauPilote.particules = true;
     this.currentTarget = nouveauPilote
     this.suivre = true
     this.setScale(0.2)

     this.scene.time.delayedCall(20000, () =>??{

       this.suivre = false
       nouveauPilote.particules = false;
       // (this.scene as any).enemies.remove(nouveauPilote)
       (this.scene as any).suppressionJoueur(nouveauPilote, true, nouveauPilote.ClientID)
       this.currentTarget = this;
       (this.scene as any).room.state.presences.set(
         this.ClientID,
         new Player({
           sprite_fusion: this.sprite,
         })
       );
       (this.scene as any).room.broadcast("RDC_OK");


       this.setScale(1)
     }, null, this);
   }

   respawn() {
     this.scene.tweens.add({
       targets: this,
       alpha: 1,
       x: 987,
       y: 755,
       duration: 500,
       onComplete: function() {
         if (arguments[1][0].scene){
           arguments[1][0].scene.players.add(arguments[1][0])
         }
       }
     });

   }

 }
