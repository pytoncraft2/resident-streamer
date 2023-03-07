import TJoueur from "../types/Joueur";

export function __StatsSupplementaire(fakhear: TJoueur, _Aptitudes: any) {
  fakhear.flipX = !fakhear.flipX
}

export function cross__A(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a)
  {
    console.log("SPIDER A");
    input.a = false
  }
}

export function kick__Z(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
    console.log("SPIDER Z");
}

export function dash__E(huipat: Phaser.Physics.Arcade.Sprite | any) {
  console.log("SPIDER E");
}

export function fusion__TAB(huipat: TJoueur, input: any) {
  console.log("FUSION TAB SPIDER");
}

 export function __auto(manette: TJoueur, _input: any, aptitudes: any) {
   if (manette.scene)
   {
    
     const positionJoueurProche: any = manette.scene.physics.closest(manette, [...(manette.scene as any).players.getChildren()])
     if (positionJoueurProche)
     {

       var dist = Phaser.Math.Distance.BetweenPoints(manette, positionJoueurProche);

       if (positionJoueurProche.x < manette.x)
       {
         manette.setFlipX(true)
         
         
         console.log(dist);
         if (dist > 400 && dist < 900) manette.body?.setVelocityX(-200)
         else manette.body?.setVelocity(-500, -800)

         
         reactiveBoucle(manette, aptitudes)
       }
       else if (positionJoueurProche.x > manette.x)
       {
         manette.setFlipX(false)
         manette.body?.setVelocityX(200)
         reactiveBoucle(manette, aptitudes)
       }
     }
    } 
 }

function reactiveBoucle(manette: TJoueur, aptitudes: any) {
  if ((manette.scene as any).room.boss[`${manette.sprite}`].vaincu) return;
  manette.scene.time.delayedCall(500, () => {
    if ((manette.scene as any).room.boss[`${manette.sprite}`].vaincu) return;
    __auto(manette, {}, aptitudes)
  }, null, this);
}