import { Player } from "../../RoomState"
import { AnimationJoueur } from "../Animations/AnimationJoueur"
import { AnimationEnnemie } from "../Animations/AnimationEnnemie"
import { Aptitudes } from "../Aptitudes/base"
import TJoueur from "../types/Joueur"
import { DefautStats, DefautDirection } from "../Stats/Defaut"

/**
 * Joueur et interaction
 */

 export default class PlayerClass extends Phaser.Physics.Arcade.Sprite {
   ClientID: any
   sprite: string
   particules: boolean
   gfx: Phaser.GameObjects.Graphics
   vel: number = 600
   pilotes: any
   fusionner: boolean
   suivre: boolean
   compteurSaut: number = 0
   iconSuitJoueur: boolean = false
   tweenIcon: Phaser.Tweens.Tween
   canMove: boolean = true
   attaque: boolean = false
   action: any
   zoneInteraction: any
   etats: any
   etatEnCours: any
   blesse_opposant: boolean = false
   soigne: boolean = false
   groupeBoules: any
   bossControlable: any
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
     sprite: string
   ) {
     super(scene, x, y, atlas, sprite)

     this.init(scene, ClientID, sprite)
   }

   init(scene: Phaser.Scene, ClientID: string, sprite: string) {
     this.scene = scene
     this.ClientID = ClientID
     this.particules = false
     // this.sprite = (scene as any).room.donnes[this.ClientID].sprite
     this.sprite = sprite
     this.pilotes = {}
     this.action = () => {
       console.log("AAAAAAAAAAACTIONNNN !!!!")
     };

     this.etats = {
       'initial': {
         couleur: 16777215,
         vitesse: 600
       },
       'secondaire':
       {
         couleur: 0x000000,
         vitesse: 1400
       }
     }

     this.etatEnCours = 'initial'

     this.bossControlable = this.scene.add.group();

     new AnimationJoueur(this.anims)
     new AnimationEnnemie(this.anims)
     const self = this;
     DefautDirection(Aptitudes, this)
     Aptitudes[this.sprite].StatsSupplementaire.call(self, self, Aptitudes)

     this.currentTarget = this
     this.me = this
     // Aptitudes[this.sprite].stats.StatsSupplementaire(this)
     // new Aptitudes[this.sprite].StatsSupplementaire(this)

     this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) {
       this.blesse_opposant = false
       if (anim.key == 'cross') {
         if (frame.frame.name == 'cross4') {
           this.blesse_opposant = true
         }
       }

       if (anim.key == 'attack') {
         if (frame.frame.name == 'positiona4') {
           this.blesse_opposant = true
         }
       }

       if (anim.key == 'akhizonah_couteau') {
         if (frame.frame.name == 'knife2') {
           this.blesse_opposant = true
         }
       }


       if (anim.key == 'straightlead') {
         if (frame.frame.name == 'straightlead1') {
           this.blesse_opposant = true
         }
       }

       if (anim.key == 'osmo_attaque') {
         if (frame.frame.name == 'osmo_attaque3') {
           this.blesse_opposant = true
         }
       }

       if (anim.key == 'twitchman_punch') {
         if (frame.frame.name == 'twitchmanpunch1') {
           this.blesse_opposant = true
         }
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
         console.log("SOIN")
         _e.vie += 0.01
       }

       if (this.fusionner && _e.sprite != this.sprite) {
        this.fusionner = false;
         this.nouveauPilote(_e);
       }

     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     if (this.scene) (this.scene as any).playersAttackZone.add(this.zoneInteraction);
   }
   preUpdate(time: number, delta: number) {
     // console.log(this.anims.msPerFrame += 300)
     super.preUpdate(time, delta);

     const input = (this.scene as any).room.donnes[this.ClientID].clavier
     let { right, left, space, a, z, e, r, a_fin, left_fin, right_fin, space_fin, z_fin, left_debut, right_debut, tab, tab_fin } = input
     let animationName = this.anims.getFrameName()


     if (this.canMove) {
       this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);

       // console.log(this.currentTarget.sprite)

       if (a || a_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].A === "function" && Aptitudes[this.currentTarget.sprite].A(this.currentTarget, input);
       if (z || z_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].Z === "function" && Aptitudes[this.currentTarget.sprite].Z(this.currentTarget, input);
       if (e) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].E === "function" && Aptitudes[this.currentTarget.sprite].E(this.currentTarget, input);
       if (r) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].R === "function" && Aptitudes[this.currentTarget.sprite].R(this.currentTarget, input);
       if (tab || tab_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].TAB === "function" && Aptitudes[this.currentTarget.sprite].TAB(this.currentTarget, input);
       /*this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheR === "function" && Aptitudes[this.currentTarget.sprite].toucheR(this.currentTarget);*/
       if (left || left_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheGauche === "function" && Aptitudes[this.currentTarget.sprite].toucheGauche(this.currentTarget, input)
       if (right || right_fin) this.currentTarget.sprite in Aptitudes && typeof Aptitudes[this.currentTarget.sprite].toucheDroite === "function" && Aptitudes[this.currentTarget.sprite].toucheDroite(this.currentTarget, input)
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
      console.log("SUIVRE---------");
      
     }

     // if (this.body.touching.none) {
     //   this.vole = true;
     // } else {
     //   this.vole = false;
     // }

     (this.scene as any).room.state.presences.set(
       this.ClientID,
       new Player({
         x: this.x,
         y: this.y,
         sprite: this.sprite,
         scale: this.scale,
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

   test() {
     console.log("TEST OK")
   }

   dommage(puissance: number) {
     //   this.play('attaque')
     //   this.setFlipX(directionFinal)
     this.setTint(0xff0000)
     this.scene.time.delayedCall(100, () => {
       this.clearTint()
     }, null, this);
     if (puissance >= 0) {
       this.vie -= puissance
     }
   }

   nouveauPilote(nouveauPilote: TJoueur) {
     console.log("NOUVEAU PILOTE !!!")
     nouveauPilote.particules = true;
     (this.scene as any).enemies.remove(nouveauPilote);

     this.currentTarget = nouveauPilote
     this.suivre = true
     this.setScale(0.2)

     this.scene.time.delayedCall(40000, () => {
       this.suivre = false
       nouveauPilote.particules = false;
       this.currentTarget = this
       this.setScale(1)
     }, null, this);
   }

   suppresionPilote(suppresionJoueur: TJoueur) {
   }

 }
