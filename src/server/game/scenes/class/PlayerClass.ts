import { Player, ZoneAttaque } from "../../RoomState"
import { AnimationJoueur, setAnimation } from "../Animations/AnimationJoueur"



/**
 * Joueur et interaction
 */

 export default class PlayerClass extends Phaser.Physics.Arcade.Sprite {
   ClientID: any
   sprite: string
   vel: number = 400
   vie: number = 100
   canMove: boolean = true
   attaque: boolean = false
   action: any
   zoneInteraction: any
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


     new AnimationJoueur(this.anims)

     this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {
       if (anim.key == 'cross') {
         if (frame.frame.name != 'cross4') {
           this.zoneInteraction.attaque = false
           return
         }
         this.zoneInteraction.attaque = true
       }

       if (anim.key == 'attack') {

         if (frame.frame.name != 'positiona4') {
           this.zoneInteraction.attaque = false
           return
         } else {
           this.zoneInteraction.attaque = true
         }
       }
     })

     this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
     this.zoneInteraction.attaque = false
     this.zoneInteraction.action = (_e) => {
       // _e.vie = 2
       // console.log(_e.etats)
       // _e.setVelocityX(400)
       _e.fete()

       // console.log("VIE OVERLAP ZONE")
       // console.log(_vie_overlap_zone)
       // console.log(_blesse)
       // _blesse = true
       // _vie_overlap_zone = 1
     };
     this.scene.physics.add.existing(this.zoneInteraction);
     this.zoneInteraction.body.enable = false;
     (this.scene as any).playersAttackZone.add(this.zoneInteraction);
   }
   preUpdate(time, delta) {
     // console.log(this.anims.msPerFrame += 300)
     super.preUpdate(time, delta);
     const input = (this.scene as any).room.donnes[this.ClientID].clavier
     let { up, right, down, left, space, preparationA, a, directeA, z, e, saut, chargeSaut } = input
     let animationName = this.anims.getFrameName()


     if (this.canMove) {


         this.zoneInteraction.setPosition(this.x + (this.flipX ? -100 : 100), this.y);
       if (a) {
         this.cross();
         input['a'] = false
       }

       if (z) {
         this.kick()
         input['z'] = false
       }

       if (e) {
         // this.straightlead()
         input['e'] = false
       }

       if (left) {
         setAnimation(this, 'walk')
         this.setVelocityX(-this.vel);
         this.setFlipX(true);
         this.setDragX(0)
         // input['left'] = false
       } else if (right) {
         setAnimation(this, 'walk')
         this.setVelocityX(this.vel);
         this.setFlipX(false);
         this.setDragX(0)
         // input['right'] = false
       } else {
         this.setDragX(1300)
       }

     }

     (this.scene as any).room.state.presences.set(
       this.ClientID,
       new Player({ x: this.x, y: this.y, sprite: this.sprite, anim: animationName, flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie, xa: this.zoneInteraction.x, ya: this.zoneInteraction.y})
     )
   }

   cross() {
     setAnimation(this,'cross')
     this.setVelocityX(0);
   }

   kick() {
     setAnimation(this, 'attack')
     this.setVelocityX(0);
   }

   straightlead() {
     setAnimation(this,'straightlead')
     this.setVelocityX(0);
     this.scene.tweens.addCounter({
       from: 0,
       to: 1,
       duration: 300,
       onUpdate: () => (this.setVelocity((this.flipX ? -1700 : 1700), -70)),
       repeat: 0,            // -1: infinity
       yoyo: false,
     })
   }


 }
