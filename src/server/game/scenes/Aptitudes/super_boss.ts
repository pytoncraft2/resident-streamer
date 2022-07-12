import TJoueur from "../types/Joueur";
import Trone from "../class/elements/TroneClass";
export function __StatsSupplementaire(personnage: TJoueur, Aptitudes: any) {
  // const groupeTrone = personnage.scene.physics.add.group({
  //   runChildUpdate: true,
  //   collideWorldBounds: true
  // })

  const trone1 = personnage.scene.add.existing(new Trone(personnage.scene, personnage.flipX ? personnage.x - 180 : personnage.x + 180, personnage.y, "personnage", `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: personnage.ClientID, degat: 0.9}));
  personnage.scene.physics.add.existing(trone1);

  // personnage.scene.time.delayedCall(2000, () => {
    const trone2 = personnage.scene.add.existing(new Trone(personnage.scene, personnage.flipX ? personnage.x - 180 : personnage.x + 180, -900, "personnage", `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: personnage.ClientID, degat: 0.9}));
    personnage.scene.physics.add.existing(trone2);
    personnage.scene.physics.add.collider(trone1, trone2);
  // }, null, personnage);

  // const trone3 = personnage.scene.add.existing(new Trone(personnage.scene, personnage.flipX ? personnage.x - 180 : personnage.x + 180, personnage.y, "personnage", `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: personnage.ClientID, degat: 0.9}));
  // const trone4 = personnage.scene.add.existing(new Trone(personnage.scene, personnage.flipX ? personnage.x - 180 : personnage.x + 180, personnage.y, "personnage", `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: personnage.ClientID, degat: 0.9}));
  // personnage.scene.physics.add.existing(trone3);
  // personnage.scene.physics.add.existing(trone4);


  // personnage.scene.physics.add(trone1, trone2);

// personnage.scene.physics.add.collider(personnage.scene[`${personnage.cible_courante}`].getChildren(), trone)
trone1.setPushable(false);
trone2.setPushable(false);

}


export function ok__A(personnage: Phaser.Physics.Arcade.Sprite|any, input: any) {
}
