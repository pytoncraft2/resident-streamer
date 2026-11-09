/**
 * PC lancé par le boss final (phase « Trône ») : part en ligne droite vers un point, blesse le premier
 * joueur touché puis disparaît, ou disparaît au bout de sa durée de vie. Publié dans
 * `state.projectiles` (sprite « super_boss », frame « pc ») comme les autres projectiles.
 */
import Phaser from "phaser";
import { Projectile } from "../../../RoomState";

interface ScenePc extends Phaser.Scene {
  room: { state: { projectiles: { set(id: string, projectile: Projectile): unknown } } };
  players: Phaser.Physics.Arcade.Group;
  suppressionProjectileDelai(cible: Phaser.Physics.Arcade.Sprite, id: string, delai?: number, smooth?: boolean): Phaser.Time.TimerEvent;
}

interface Blessable {
  dommage(puissance: number): void;
}

export default class PcClass extends Phaser.Physics.Arcade.Sprite {
  readonly id: string;
  readonly sprite = "super_boss";
  readonly _frame = "pc";
  private touche = false;

  constructor(scene: ScenePc, x: number, y: number, id: string, cible: { x: number; y: number }, vitesse: number, degat: number, duree: number) {
    super(scene, x, y, "atlas");
    this.id = id;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    scene.physics.moveTo(this, cible.x, cible.y, vitesse);

    // Expiration programmée, annulée si le PC touche avant : une seule suppression envoyée au client
    // (le client plante sur un second message « suppression » pour le même projectile).
    const expiration = scene.suppressionProjectileDelai(this, this.id, duree);
    scene.physics.add.overlap(this, scene.players, (_pc, joueur) => {
      if (this.touche) return;
      this.touche = true;
      expiration.remove(false);
      (joueur as unknown as Blessable).dommage(degat);
      scene.suppressionProjectileDelai(this, this.id, 0);
    });
    this.publier();
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.publier();
  }

  private publier(): void {
    (this.scene as ScenePc | undefined)?.room.state.projectiles.set(
      this.id,
      new Projectile({ x: this.x, y: this.y, id: this.id, sprite: this.sprite, _frame: this._frame }),
    );
  }
}
