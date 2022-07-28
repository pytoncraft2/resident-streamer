import TJoueur from "../types/Joueur";
import LaserClass from "../class/elements/LaserClass";

export function __StatsSupplementaire(twitchman: TJoueur, Aptitudes: any) {
  Aptitudes[twitchman.sprite].toucheEspace = function (_twitchman: TJoueur) {
    _twitchman.body.setVelocityY(-500)
    _twitchman.play('twitchman_vole', true)
    _twitchman.survole = true
    _twitchman.scene.time.delayedCall(410, () => {
      _twitchman.survole = false
    })
  }

  twitchman.cible_courante = "players"
  twitchman.laser = new LaserClass(twitchman.scene, twitchman.x + 80, twitchman.y - 185, 0, 28, 1902222, 1, `${(Math.random() + 1).toString(36).substring(7)}`, twitchman, twitchman.cible_courante)

}


export function punch__A(twitchman: TJoueur, input: any) {
  if (input.a)
  {
  twitchman.play('twitchman_punch')
  input.a = false
  }
}

export function charge__Z(twitchman: TJoueur, input: any) {
  if (input.z)
  {
    twitchman.play('twitchman_charge')
    twitchman.body.setVelocityX(twitchman.flipX ? -5000 : 5000)
    input.z = false
  }

  if (input.z_fin)
  {
    twitchman.body.setVelocity(0)
    twitchman.play('twitchman_vole', true)
  }
}

export function laser__E(twitchman: TJoueur, input: any) {
  twitchman.laser.charge()
  input.e = false
}

export function __auto(twitchman: TJoueur, _input: any, aptitudes: any) {
  if (twitchman.scene)
  {
   const positionJoueurProche: any = twitchman.scene.physics.closest(twitchman, [...(twitchman.scene as any)[`${twitchman.cible_courante}`].getChildren()])
   if (positionJoueurProche)
   {
     var dist = Phaser.Math.Distance.BetweenPoints(twitchman, positionJoueurProche);


     if (positionJoueurProche.x < twitchman.x)
     {
       twitchman.setFlipX(true)

       if (positionJoueurProche.y == twitchman.y) {
         if (twitchman.body) charge__Z(twitchman, {z: true})
         const colision = twitchman.scene.physics.add.collider(positionJoueurProche, twitchman)
         twitchman.scene.time.delayedCall(500, () => {
           twitchman.scene.physics.world.removeCollider(colision);
         }, null, this);
         reactiveBoucle(twitchman, aptitudes)
       } else if (dist > 400 && dist < 900)
       {
         if (twitchman.body) charge__Z(twitchman, {z: true})
         reactiveBoucle(twitchman, aptitudes)
       } else if (dist > 900)
       {
         if (twitchman.body)
         {
           twitchman.body.setVelocityX(-340)
           aptitudes.toucheGauche(twitchman, {left_debut: true})
         }

         reactiveBoucle(twitchman, aptitudes)
       }
       else if (dist < 400)
       {
         twitchman.play("twitchman_punch")
         twitchman.scene.tweens.add({
           delay: 500,
           onStart: () => {
             if (twitchman) twitchman.play("twitchman_vole")
           },
           targets: twitchman,
           x: 0,
           y: 0,
           duration: 1000,
           ease: 'Sine.inOut',
           onComplete: () => reactiveBoucle(twitchman, aptitudes)
         });
       }
     }
     else if (positionJoueurProche.x > twitchman.x)
     {
       twitchman.setFlipX(false)

       if (positionJoueurProche.y == twitchman.y) {
         if (twitchman.body) charge__Z(twitchman, {z: true})
         const colision = twitchman.scene.physics.add.collider(positionJoueurProche, twitchman)
         twitchman.scene.time.delayedCall(500, () => {
           twitchman.scene.physics.world.removeCollider(colision);
         }, null, this);
         reactiveBoucle(twitchman, aptitudes)
       } else if (dist > 400 && dist < 900)
       {
         twitchman.scene.tweens.add({
           onStart: () => twitchman.play("twitchman_vole"),
           targets: twitchman,
           y: 0,
           x: "-=40",
           duration: 1000,
           ease: 'Sine.inOut',
           onComplete: () => {
             laser__E(twitchman, {e: true})
             reactiveBoucle(twitchman, aptitudes)
           }
         });
         // if (twitchman.body) lanceManette__Z(twitchman, {z: true})
         // reactiveBoucle(twitchman, aptitudes)
       }
       else if (dist > 900)
       {
         if (twitchman.body)
         {
           twitchman.body.setVelocityX(340)
           aptitudes.toucheDroite(twitchman, {right_debut: true})
         }
         reactiveBoucle(twitchman, aptitudes)
       }
       else if (dist < 400)
       {
         twitchman.play("twitchman_punch")
         twitchman.scene.tweens.add({
           delay: 500,
           onStart: () => twitchman.play("twitchman_vole"),
           targets: twitchman,
           x: 1960,
           y: 0,
           duration: 1000,
           ease: 'Sine.inOut',
           onComplete: () => reactiveBoucle(twitchman, aptitudes)
         });
       }
     }
   }
  }
}

function reactiveBoucle(twitchman: TJoueur, aptitudes: any) {
  if (twitchman.scene)
  {
    twitchman.scene.time.delayedCall(500, () => {
      __auto(twitchman, {}, aptitudes)
    }, null, this);
  }
}
