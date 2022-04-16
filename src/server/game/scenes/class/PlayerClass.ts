import { Player, ZoneAttaque } from "../../RoomState"
import { AnimationJoueur, setAnimation } from "../Animations/AnimationJoueur"
import { AnimationEnnemie } from "../Animations/AnimationEnnemie"
import { Aptitudes } from "../Aptitudes/index"

interface Deplacement {
  marche: boolean,
  stop: boolean
}

/**
 * Joueur et interaction
 */

 export default class PlayerClass extends Phaser.Physics.Arcade.Sprite {
   ClientID: any
   sprite: string
   vel: number = 400
   vie: number = 10
   compteurSaut: number = 0
   canMove: boolean = true
   attaque: boolean = false
   action: any
   zoneInteraction: any
   etats: any
   etatEnCours: any
   blesse_opposant: boolean = false
   interaction_objet: boolean = false
   constructor(
     scene: Phaser.Scene,
     x: number,
     y: number,
     sprite: string,
     ClientID: string
   ) {
     super(scene, x, y, sprite)

     this.init(scene, ClientID)
   }

   init(scene: Phaser.Scene, ClientID: string) {
     this.scene = scene
     this.scene.add.existing(this)
     this.ClientID = ClientID
     this.sprite = (scene as any).room.donnes[this.ClientID].sprite
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

     // this.displayWidth += 40

     this.etatEnCours = 'initial'



     new AnimationJoueur(this.anims)
     new AnimationEnnemie(this.anims)

     this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {
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

       if (anim.key == 'straightlead') {
         if (frame.frame.name == 'straightlead1') {
           this.blesse_opposant = true
         }
       }
     })

     this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody

     //ACTIVER GRACE À LA FONCTION OVERLAP DE PHASER #hall.ts
     this.zoneInteraction.action = (_e) => {

       if (this.blesse_opposant) {
         this.blesse_opposant = false
         _e.blesse_ennemie()
       }

       if (this.interaction_objet) {
         // this.interaction_objet = false
         console.log("INTERACTION")
         // if (!_e.vivant) {
         // console.log("RECUPERATION ENNEMIE")
         // _e.proprietaire_objet(this.ClientID)
         // }
       }

     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     (this.scene as any).playersAttackZone.add(this.zoneInteraction);
   }
   preUpdate(time, delta) {
     // console.log(this.anims.msPerFrame += 300)
     super.preUpdate(time, delta);
     const input = (this.scene as any).room.donnes[this.ClientID].clavier
     let { up, right, down, left, space, preparationA, a, directeA, z, e, r, saut, chargeSaut } = input
     let animationName = this.anims.getFrameName()


     if (this.canMove) {
         this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);
       if (a) {
         this.sprite in Aptitudes() && typeof Aptitudes()[this.sprite].toucheA === "function" && Aptitudes()[this.sprite].toucheA(this)
         input['a'] = false
       }

       if (z) {
         this.sprite in Aptitudes() && typeof Aptitudes()[this.sprite].toucheZ === "function" && Aptitudes()[this.sprite].toucheZ(this)
         input['z'] = false
       }

       if (e) {
         this.sprite in Aptitudes() && typeof Aptitudes()[this.sprite].toucheE === "function" && Aptitudes()[this.sprite].toucheE(this)
         input['e'] = false
       }

       if (saut) {
         this.sprite in Aptitudes() && typeof Aptitudes()[this.sprite].toucheEspace === "function" && Aptitudes()[this.sprite].toucheEspace(this)
         input['saut'] = false
       }

       if (r) {
         this.sprite in Aptitudes() && typeof Aptitudes()[this.sprite].toucheR === "function" && Aptitudes()[this.sprite].toucheR(this)
         input['r'] = false
       }

       if (left) {
         this.deplacement('left', left)
       }

       if (right) {
         this.deplacement('right', right)
       }

     }

     (this.scene as any).room.state.presences.set(
       this.ClientID,
       new Player({ x: this.x, y: this.y, sprite: this.sprite, anim: animationName, flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie, xa: this.zoneInteraction.x, ya: this.zoneInteraction.y})
     )
   }


   deplacement(direction: 'left'|'right', objet: Deplacement) {
     if (objet.stop) {
       setAnimation(this, 'idle_walk')
       objet.stop = false
       objet.marche = false
       this.setVelocityX(0);
     }
     if (objet.marche) {
       setAnimation(this, 'walk')
       this.setVelocityX(direction == 'right' ? this.vel : -this.vel);
       this.setFlipX(direction == 'right' ? false : true);
       this.setDragX(0)
     }
   }

 }
