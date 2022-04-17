import {cross, kick, dash, interaction} from './fakhear'
import {pique, suivre} from './boss_1'
import {kunai, shuriken} from './huzounet'


interface P {
  P: Phaser.Physics.Arcade.Sprite
}


/**
PARAMETRES GENERALE
**/

function saut(personnage: Phaser.Physics.Arcade.Sprite|any) {
  if (personnage.compteurSaut < 1 || personnage.body.touching.down) {
    personnage.play('jump')
    personnage.setVelocityY(-1400);
    personnage.compteurSaut++
    if (personnage.body.touching.down) {
      personnage.compteurSaut = 0
    }
  }
}
/**
 * -- LISTE DES PARAMETRES DE L'ACTION DES TOUCHES DES JOUEURS --
 * Aptitude générale disponible pour tout le monde
 */

 export const EtatsInitialStatique = (scene?: Phaser.Scene, personnage?: any) => {
   return {
     'fakhear': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       puissanceDeBase: 10,
       attaqueFrame: "positiona3"
     },
     'boss_1': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       puissanceDeBase: 10,
       attaqueFrame: "positiona3"
     },
     'huzounet': {
       vie: 5,
       displayWidth: 104,
       displayHeight: 302,
       masse: 30,
       puissanceDeBase: 10,
       attaqueFrame: "positiona3",
       animationCharge: personnage.scene.tweens.add({
         targets: personnage.boulePhysique,
         scale: 2,
         onUpdate: () => personnage.boulePhysique.setPosition(personnage.flipX ? personnage.x + 100 : personnage.x - 100, personnage.y - 170, personnage.flipX ? personnage.y - 170 : personnage.y + 170),
         duration: 3000,
         paused: true
       }),
       animationEnvoie: personnage.scene.tweens.addCounter({
         duration: 1000,
         // onComplete: () => (personnage.boulePhysique.retourPositionPrincipale()),
         paused: true
       }),
       boulePhysique: {
         groupeBoules: scene.physics.add.group({ allowGravity: false, runChildUpdate: true, collideWorldBounds: true }),
         creation(p) {
             return this.groupeBoules.create(p.x - 100, p.y - 170, `atlas`, 'shuriken0')
         },
         retourPositionPrincipale(boule, p) {
           // console.log('retour position')
             // this.groupeBoules.getChildren()[0].setPosition(p.flipX ? p.x + 100 : p.x - 100, p.y - 170, p.flipX ? p.y - 170 : p.y + 170)
             this.groupeBoules.getChildren()[0].setPosition(200, 200)
             this.groupeBoules.getChildren()[0].setScale(1)
             // this.groupeBoules.getChildren()[0].setAlpha(0.1)
             this.groupeBoules.getChildren()[0].setVelocity(0)
             // personnage.colisionShurikenEnnemie.active = false
         }
       }
     }
   }
 }


export const Aptitudes = {
  'fakhear': {
    toucheA: (fakhear: Pick<P,'P'>) => {
      cross(fakhear)
    },
    toucheZ: (fakhear: Pick<P,'P'>) => {
      kick(fakhear)
    },
    toucheE: (fakhear: Pick<P,'P'>) => {
      dash(fakhear)
    },
    toucheR: (fakhear: Pick<P,'P'>) => {
      interaction(fakhear)
    },
    toucheEspace: (fakhear: Pick<P, 'P'>) => {
      saut(fakhear)
    }
  },
  'boss_1': {
    toucheA: (boss_1: Pick<P, 'P'>) => {
      pique(boss_1)
    },
    toucheZ: (boss_1: Pick<P, 'P'>) => {
      suivre(boss_1)
    }
  },
  'huzounet': {
    toucheA: (huzounet: Pick<P, 'P'>, input?: Object) => {
      shuriken(huzounet, input)
    },
    toucheZ: (huzounet: Pick<P, 'P'>) => {
      kunai(huzounet)
    },
    toucheEspace: (huzounet: Pick<P, 'P'>) => {
      saut(huzounet)
    }
  }
};

// export const Aptitudes = () => parametres;
