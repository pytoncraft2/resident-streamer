import { Player, ZoneAttaque } from "../../RoomState"
import { AnimationJoueur, setAnimation } from "../Animations/AnimationJoueur"



/**
 * Joueur et interaction
 */

 export default class PlayerClass extends Phaser.Physics.Arcade.Sprite {
   ClientID: any
   sprite: string
   compteurSaut: number = 0
   lastAnim: any
   vel: number = 400
   vie: number = 100
   canMove: boolean = true
   tweenA: any
   finChargeA: boolean
   puissanceA: any
   attaque: boolean = false
   indexAnimA: string[] = ['cross', 'attack', 'straightlead']
   indexCompte: number = 0
   directeA: boolean = false
   zoneAttaque: any
   zoneA: any
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
     this.lastAnim = null
     this.tweenA = null;
     this.finChargeA = false
     this.puissanceA = 0

     new AnimationJoueur(this.anims)
     this.on('animationcomplete_attack', function () {
         // this.play('idle_attack')
         this.zoneAttaque.attaque = false
         this.attaque = false
     });
     this.on('animationcomplete_cross', function () {
         this.play('idle_attack')
         // this.zoneAttaque.body.enable = false
         // this.scene.physics.world.remove(this.zoneAttaque.body)
         this.zoneAttaque.attaque = false
         this.attaque = false
     });

     this.on('animationcomplete_straightlead', function () {
       this.play('idle_attack')

       this.zoneAttaque.attaque = false
       this.attaque = false
     });
     this.on('animationcomplete', function (anim, frame) {
       this.emit('animationcomplete_' + anim.key, anim, frame);
     }, this);

     this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {
       if (anim.key == 'cross') {
         if (frame.frame.name == 'cross4') {
           this.zoneAttaque.attaque = true
           this.attaque = true;
         }
       }

       if (anim.key == 'attack') {
         if (frame.frame.name == 'positiona4') {
           // this.zoneAttaque.attaque = true
           // this.attaque = true;
         }
       }
     })

     this.zoneAttaque = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
     this.zoneAttaque.attaque = false
     this.scene.physics.add.existing(this.zoneAttaque);
     this.zoneAttaque.body.enable = false;
     (this.scene as any).playersAttackZone.add(this.zoneAttaque);
   }
   preUpdate(time, delta) {
     // console.log(this.anims.msPerFrame += 300)
     super.preUpdate(time, delta);
     const input = (this.scene as any).room.donnes[this.ClientID].clavier
     let { up, right, down, left, space, preparationA, a, directeA, z, e, saut, chargeSaut } = input
     let animationName = this.anims.getFrameName()


     if (this.canMove) {


         this.zoneAttaque.setPosition(this.x + (this.flipX ? -100 : 100), this.y);
       if (a) {
         this.cross();
         input['a'] = false
       }

       if (z) {
         this.kick()
         input['z'] = false
       }

       if (e) {
         this.straightlead()
         input['e'] = false
       }

       if (preparationA) {
           if (this.tweenA == null) {
             this.puissanceA = this.scene.tweens.addCounter({
               from: 500,
               to: 1900,
               duration: 2000
             })
           }

         input['preparationA'] = false
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

       if (saut) {
         this.saut()
         input['saut'] = false
       }




       // if (this.body.velocity.x < 204 && this.body.velocity.x > 0 && this.body.touching.down || this.body.velocity.x > -204 && this.body.velocity.x < 0 && this.body.touching.down) {
       //   setanimation(this, 'idle_attack')
       // }

       // if(this.lastAnim !== animationName) {
       //   this.lastAnim = animationName;
       // } else {
       //   animationName = undefined
       // }
     }

     (this.scene as any).room.state.presences.set(
       this.ClientID,
       new Player({ x: this.x, y: this.y, sprite: this.sprite, anim: animationName, flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie, xa: this.zoneAttaque.x, ya: this.zoneAttaque.y})
     )
   }

   cross() {
     setAnimation(this,'cross')
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

   kick() {
     setAnimation(this, 'attack')
     this.setVelocityX(0);
   }

   saut() {
     if (this.compteurSaut < 2 || this.body.touching.down) {
       this.play('jump')
       this.setVelocityY(-1000);
       this.compteurSaut++
       if (this.body.touching.down) {
         this.compteurSaut = 0
       }
     }
   }

   mourir() {

   }

   reapparaitre() {

   }
 }
