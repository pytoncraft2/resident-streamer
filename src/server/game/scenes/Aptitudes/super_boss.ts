import TJoueur from "../types/Joueur";
import Trone from "../class/elements/TroneClass";
export function __StatsSupplementaire(personnage: TJoueur, Aptitudes: any) {
  personnage.setActive(false)

  personnage.trones = personnage.scene.physics.add.group({
    runChildUpdate: true,
    collideWorldBounds: false,
    allowGravity: false,
    setXY:
    {
      x: 3000,
      y: -880,
      stepY: 1000
    }
  })

  const trone1 = creerTrone(personnage, 'tronetest', -100);
  const trone2 = creerTrone(personnage, 'tronetest2', -230);
  const trone3 = creerTrone(personnage, 'tronetest3', -360);
  const trone4 = creerTrone(personnage, 'tronetest4', -490);
  const trone5 = creerTrone(personnage, 'tronetest5', -620);
  const trone6 = creerTrone(personnage, 'tronetest6', -750);
  const trone = creerTrone(personnage, 'tronehautv2', -880);

  personnage.trones.addMultiple([trone1, trone2, trone3, trone4, trone5, trone6, trone]); 

  personnage.scene.physics.add.overlap(personnage.trones, personnage.scene.players, function (_trone:TJoueur, _joueur: any) {
    if (_joueur.blesse_opposant) {
      const cible = personnage.trones.getFirstAlive()
      if (personnage.trones.getLength() == 2) 
      {
        // const dernier: any = personnage.trones.getChildren()[1];
        // personnage.setActive(true);
        // personnage.play('super_boss_vole')
        // personnage.setY(-750)
        // personnage.body.setAllowGravity(false);
        // personnage.scene.time.delayedCall(2000, () => {
        //   personnage.play('super_boss_contreattaque');
        // }, null, this);


        // personnage.trones.remove(dernier, true);
        // (personnage.scene as any).suppressionProjectileDelai(dernier, dernier._frame, 100);
        // (personnage.scene as any).suppressionProjectileDelai(cible, cible._frame, 100);
      }
      else
      {
      // personnage.trones.remove(personnage.trones.getFirstAlive(), true);
      // personnage.trones.setVelocityY(340)
      // personnage.scene.time.delayedCall(350, () => {
      //   personnage.trones.setVelocityY(0);
      //   (personnage.scene as any).suppressionProjectileDelai(cible, cible._frame, 100)
      // }, null, this);
    }
      _joueur.blesse_opposant = false;
    }
  }, undefined, personnage.scene)

  personnage.cible_courante = "players"
}

function creerTrone(personnage: TJoueur, etageTrone: string, positionY: number) {
  const trone = personnage.scene.add.existing(new Trone(personnage.scene, personnage.flipX ? personnage.x - 180 : personnage.x + 180, -900, "personnage", `${etageTrone}`, etageTrone, positionY).setData({ ClientId: personnage.ClientID, degat: 0.9 }));
  trone.setPushable(false);
  trone.setSize(1000, 100)
  trone.setActive(false)

  return personnage.scene.physics.add.existing(trone);
}

function transformation() {

}