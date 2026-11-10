import LaserClass from "../class/elements/LaserClass";
import Hall from "../hall";
import { Camp } from "../../../domain/combat";

export interface Scene extends Phaser.Scene {
  room: any
  groupeBoulesHuzounet: Phaser.Physics.Arcade.Group;
}


interface TJoueur extends Phaser.GameObjects.Sprite
{
  ClientID?: string
  vie: number,
  displayWidth: number,
  displayHeight: number,
  /** Camp visé par ses attaques : "enemies" pour un joueur (ou un boss qu'il pilote), "players" pour un boss. */
  cible_courante: Camp,


  kunai?: Phaser.Physics.Arcade.Sprite|undefined
  compteurSaut: number;
  degat: number
  sprite: string
  particules: boolean
  son: string
  groupeManettes?: Phaser.GameObjects.Group
  gfx: Phaser.GameObjects.Graphics

  tweenIcon: Phaser.Tweens.Tween
  iconSuitJoueur: boolean

  body: Phaser.Physics.Arcade.Body
  scene: Hall

  //huzounet
  puissanceChargeBoule?: number,
  boulesEnMain?: Phaser.Physics.Arcade.Group
  clone?: boolean

  //akhizonah
  bombe?: Phaser.Physics.Arcade.Sprite|undefined

  //osmosiscoop
  soigne: boolean

  //mannette
  obj_manette?: Phaser.Physics.Arcade.Sprite

  //twitchman
  survole?: boolean
  laser?: LaserClass

  //super_boss
  trones?: Phaser.Physics.Arcade.Group

  //bosses
  animationBossFigurine: Phaser.Tweens.Tween
  suivre: boolean
  currentTarget: TJoueur

  //degat
  dommage(puissance: number): void

  nouveauPilote(joueur: Phaser.Physics.Arcade.Sprite): void

  changeInterfaceClient(sprite: string, icon?: boolean): void

  //bot
  auto?(joueur: Phaser.Physics.Arcade.Sprite): void


}

  export default TJoueur;
