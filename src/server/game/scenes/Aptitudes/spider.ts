import TJoueur from "../types/Joueur";

export function __StatsSupplementaire(personnage: TJoueur, Aptitudes: any) {
  // fakhear.flipX = !fakhear.flipX
  const speed = 500;
  const jumpSpeed = 2800;
      // personnage.scene.physics.add.overlap(personnage, personnage.scene.players.getChildren(),
      // (a:any, b:any) => {
      //   // b.setAlpha(0.3);
      // });

  personnage.cible_courante = "players"


  Aptitudes[personnage.sprite].toucheHaut = (personnage: Phaser.Physics.Arcade.Sprite, _input: any) => {
    if (personnage.body?.touching.down) 
    {
      personnage.body.checkCollision.none = true;
      personnage.setVelocityY(-jumpSpeed);
      personnage.scene.time.delayedCall(200, () => personnage.body.checkCollision.none = false);
    }
  }
  Aptitudes[personnage.sprite].toucheDroite = (personnage: Phaser.Physics.Arcade.Sprite, _input: any) => {
    if (_input.right_fin)
    {
      personnage.setVelocityX(0)
    }
    else
    {
      // personnage.play('troll_run', true)
      personnage.setVelocityX(speed)
      if (personnage.flipX) personnage.setFlipX(false)
    }
  }

  Aptitudes[personnage.sprite].toucheGauche = (personnage: Phaser.Physics.Arcade.Sprite, _input: any) => {
    if (_input.left_fin)
    {
      // personnage.play('troll_idle')
      personnage.setVelocityX(0)
    }
    else
    {
      // personnage.play('troll_run', true)
      personnage.setVelocityX(-speed)
      if (!personnage.flipX) personnage.setFlipX(true)
    }
  }
}

export function cross__A(girl: Phaser.Physics.Arcade.Sprite|any, input: any) {
  if (input.a)
  {
    console.log("SPIDER A");
    input.a = false
  }
}

 export function __auto(manette: TJoueur, _input: any, aptitudes: any) {
   if (manette.scene)
   {
    console.log((manette.scene as any).room.boss[`${manette.sprite}`]);
    
     if ((manette.scene as any).room.boss[`${manette.sprite}`].vaincu) return;
    
     const positionJoueurProche: any = manette.scene.physics.closest(manette, [...(manette.scene as any).players.getChildren()])
     if (positionJoueurProche)
     {

       var dist = Phaser.Math.Distance.BetweenPoints(manette, positionJoueurProche);

       if (positionJoueurProche.x < manette.x)
       {
         manette.setFlipX(true)
         manette.body?.setVelocityX(-200)
         if (dist < 434 && dist > 394 && manette.body?.touching.down) manette.body?.setVelocity(-700, -800)
         
         reactiveBoucle(manette, aptitudes)
       }
       else if (positionJoueurProche.x > manette.x)
       {
         manette.setFlipX(false)
         manette.body?.setVelocityX(200)

         if (dist < 434 && dist > 394 && manette.body?.touching.down) manette.body?.setVelocity(900, -600)
         reactiveBoucle(manette, aptitudes)
       }
     }
    } 
 }

function reactiveBoucle(manette: TJoueur, aptitudes: any) {
  if ((manette.scene as any).room.boss[`${manette.sprite}`].vaincu) return;
  manette.scene.time.delayedCall(300, () => {
    if ((manette.scene as any).room.boss[`${manette.sprite}`].vaincu) return;
    __auto(manette, {}, aptitudes)
  }, null, this);
}