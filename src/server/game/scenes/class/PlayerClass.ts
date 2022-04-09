import { Player } from "../../RoomState"
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
   swordHitbox!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody


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
     // this.on('animationcomplete_attack', function () {console.log("ANIMATION ATTACK COMPLETED")});
     this.on('animationcomplete_cross', function () {
         this.play('idle_attack')
         this.attaque = false
     });

     this.on('animationcomplete_straightlead', function () {
       this.play('idle_attack')
       this.attaque = false
     });
     this.on('animationcomplete', function (anim, frame) {
       this.emit('animationcomplete_' + anim.key, anim, frame);
     }, this);

       this.swordHitbox = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
       this.scene.physics.add.overlap(this.swordHitbox, this, () => {
  console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOVELAP")
}, undefined, this)

   }
   preUpdate(time, delta) {
     // console.log(this.anims.msPerFrame += 300)
     super.preUpdate(time, delta);
     const input = (this.scene as any).room.donnes[this.ClientID].clavier
     let { up, right, down, left, space, preparationA, a, directeA, z, e, saut, chargeSaut } = input
     let animationName = this.anims.getFrameName()


     if (this.canMove) {


       if (a) {
         this.cross()
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


       if (this.body.velocity.x < 204 && this.body.velocity.x > 0 && this.body.touching.down || this.body.velocity.x > -204 && this.body.velocity.x < 0 && this.body.touching.down) {
         setAnimation(this, 'idle_attack')
       }

       // if(this.lastAnim !== animationName) {
       //   this.lastAnim = animationName;
       // } else {
       //   animationName = undefined
       // }
     }

     (this.scene as any).room.state.presences.set(
       this.ClientID,
       new Player({ x: this.x, y: this.y, sprite: this.sprite, anim: animationName, flipX: this.flipX, tint: this.tintBottomLeft, vie: this.vie})
     )
   }

   cross() {
     // setAnimation(this,'cross')
     // const swordHitbox = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0) as unknown as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
     // this.scene.physics.add.existing(swordHitbox)
     // swordHitbox.body.enable = false
     // this.scene.physics.world.remove(swordHitbox.body)
     // console.log(swordHitbox.body)

     // this.physics.add.collider(this, this.box)

     this.play('cross')
     this.setVelocityX(0)

     const startHit = (anim: Phaser.Animations.Animation, frame: Phaser.Animations.AnimationFrame) => {
       // if (frame.index < 5)
       // {
       //   return
       // }

       this.off(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)
this.scene.physics.add.existing(this.swordHitbox)
this.swordHitbox.body.enable = true

this.scene.physics.world.remove(this.swordHitbox.body)
// console.log(this.swordHitbox.body)

// console.log('AIA---------')


       this.swordHitbox.x = this.flipX
       ? this.x - this.width * 0.25
       : this.x + this.width * 0.25

       this.swordHitbox.y = this.y + this.height * 0.2

       this.swordHitbox.body.enable = false
       this.scene.physics.world.add(this.swordHitbox.body)
     }

     this.on(Phaser.Animations.Events.ANIMATION_UPDATE, startHit)

     this.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'attack', () => {
       // this.knightStateMachine.setState('idle')

       // TODO: hide and remove the sword swing hitbox
       this.swordHitbox.body.enable = false
       this.scene.physics.world.remove(this.swordHitbox.body)
     })

     // TODO: move sword swing hitbox into place
     // does it need to start part way into the animation?
   }

   straightlead() {
     setAnimation(this,'straightlead')
     this.scene.tweens.addCounter({
       from: 0,
       to: 1,
       duration: 300,
       onUpdate: () => (this.anims.getFrameName() == 'straightlead0' && this.setVelocity((this.flipX ? -1700 : 1700), -70), this.attaque = true),
       onComplete: () => (this.setVelocity(0), this.attaque = false),
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
