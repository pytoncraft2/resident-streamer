import Phaser from "phaser";
import TJoueur from "../types/Joueur";
import Trone from "../class/elements/TroneClass";
import PcClass from "../class/elements/PcClass";
import { arbreBossFinal, REGLAGES_BOSS_FINAL } from "../../../ia/bosses/super_boss";
import { demarrerIA } from "../../ia/pilote";

/**
 * Boss final, phase « Trône » (intentions §3) : assis sur un trône de 6 rangées de PC surmonté d'un
 * siège, invisible en tant que sprite (le siège « tronehaut » le montre assis) et invulnérable.
 * Chaque coup porté au trône (corps à corps, kunaï, boule, bombe… : tout ce qui blesse un ennemi)
 * fait tomber la rangée du bas et descendre le reste d'un étage.
 * Rangées détruites : le siège devient vide (« tronehautv2 »), le boss apparaît, vulnérable, et
 * passe en phase « Envol » : il plane, pique sur les joueurs (A) et contre-attaque quand on le frappe (E).
 */
export function __StatsSupplementaire(personnage: TJoueur | any, _Aptitudes: any) {
  personnage.setActive(false)
  personnage.vie = REGLAGES_BOSS_FINAL.vie
  personnage.invulnerable = true
  personnage.setAlpha(0)

  personnage.trones = personnage.scene.physics.add.group({
    runChildUpdate: true,
    collideWorldBounds: false,
    allowGravity: false,
  })

  // Rangées de PC, du bas (la plus large) vers le haut, puis le siège avec le boss assis.
  personnage.rangees = [
    creerTrone(personnage, 'tronetest', -100),
    creerTrone(personnage, 'tronetest2', -230),
    creerTrone(personnage, 'tronetest3', -360),
    creerTrone(personnage, 'tronetest4', -490),
    creerTrone(personnage, 'tronetest5', -620),
    creerTrone(personnage, 'tronetest6', -750),
  ]
  personnage.siege = creerTrone(personnage, 'tronehaut', -880)
  personnage.trones.addMultiple([...personnage.rangees, personnage.siege]);

  // Le trône encaisse les coups comme un ennemi : chaque élément a une vie et une méthode dommage
  // (appelée par la zone d'attaque, les kunaïs, les boules, les bombes…), qui fait tomber une rangée.
  for (const element of [...personnage.rangees, personnage.siege]) {
    element.vie = 1
    element.dommage = (puissance: number) => {
      if (puissance > 0) coupSurLeTrone(personnage)
    }
  }

  // Appelé par revelerBossFinal (game/bossFinal.ts) : le corps physique n'existe qu'après la création.
  personnage.surRevelation = () => {
    personnage.trones.getChildren().forEach((element: any) => {
      element.setActive(true)
      // Dans le groupe des ennemis pour être touché par toutes les attaques des joueurs ; ce groupe
      // impose ses réglages (gravité), d'où l'immobilité rétablie juste après.
      personnage.scene.enemies.add(element)
      element.body.setAllowGravity(false)
      element.setImmovable(true)
      element.setVelocity(0)
    })
    personnage.body.setAllowGravity(false)
    personnage.setVelocity(0)
    personnage.setPosition(personnage.siege.x, personnage.siege.y)
  }

  personnage.cible_courante = "players"
}

/** Un coup porté au trône : une rangée tombe, au plus une fois par `delaiEntreChutes`. */
function coupSurLeTrone(personnage: any) {
  // Le siège vide survit au boss (détruit après une fusion) et reste touchable par les attaques qui
  // visent tout corps physique (laser de twitchman) : plus rien à faire tomber dans ces cas.
  if (!personnage.scene || personnage.rangees.length === 0) return
  const maintenant = personnage.scene.time.now
  if (personnage.derniereChute !== undefined && maintenant - personnage.derniereChute < REGLAGES_BOSS_FINAL.delaiEntreChutes) return
  personnage.derniereChute = maintenant
  faireTomberRangee(personnage)
}

function faireTomberRangee(personnage: any) {
  const rangee = personnage.rangees.shift()
  if (!rangee) return
  const scene = personnage.scene
  scene.suppressionProjectileDelai(rangee, rangee.id, 0)
  scene.tweens.add({
    targets: [...personnage.rangees, personnage.siege, personnage],
    y: `+=${REGLAGES_BOSS_FINAL.hauteurRangee}`,
    duration: 350,
  })
  if (personnage.rangees.length === 0) finDuTrone(personnage)
}

/** Trône détruit : le boss quitte son siège, apparaît, devient vulnérable et s'envole (phase « Envol »). */
function finDuTrone(personnage: any) {
  personnage.siege._frame = 'tronehautv2'
  // Le siège vide reste décoratif : il ne doit plus intercepter les coups destinés au boss.
  personnage.scene.enemies.remove(personnage.siege)
  personnage.invulnerable = false
  personnage.setAlpha(1)
  // La dernière rangée est sous le sol de l'étage : le boss réapparaît en vol au-dessus du siège.
  personnage.setPosition(personnage.siege.x, REGLAGES_BOSS_FINAL.yVol)
  // Les frames du vol et de la contre-attaque sont bien plus larges que le boss (jusqu'à 779 px, ailes
  // comprises) : sans recentrage, le corps physique reste décalé de plusieurs centaines de px.
  const recentrer = () => personnage.body?.setSize(...TAILLE_CORPS_BOSS, true)
  for (const evenement of [Phaser.Animations.Events.ANIMATION_START, Phaser.Animations.Events.ANIMATION_UPDATE, Phaser.Animations.Events.ANIMATION_COMPLETE])
    personnage.on(evenement, recentrer)
  personnage.play('super_boss_vole')
  recentrer()
  // Heure du dernier coup reçu, perçue par l'IA pour contre-attaquer.
  const dommage = personnage.dommage.bind(personnage)
  personnage.dommage = (puissance: number) => {
    dommage(puissance)
    if (puissance > 0 && personnage.scene) personnage.dernierCoup = personnage.scene.time.now
  }
}

/** Joueurs à moins de `rayon` px du boss. */
function joueursProches(personnage: any, rayon: number): any[] {
  return personnage.scene.players.getChildren().filter((joueur: any) =>
    Math.hypot(joueur.x - personnage.x, joueur.y - personnage.y) < rayon)
}

/** Phase « Envol » : impact du piqué, qui blesse les joueurs proches. */
export function impact__A(personnage: TJoueur | any, _input: any) {
  if (!personnage.scene) return
  for (const joueur of joueursProches(personnage, REGLAGES_BOSS_FINAL.rayonPique)) joueur.dommage(REGLAGES_BOSS_FINAL.degatPique)
}

/** Phase « Envol » : contre-attaque après un coup reçu, une onde qui blesse les joueurs proches. */
export function contreattaque__E(personnage: TJoueur | any, _input: any) {
  const scene = personnage.scene
  if (!scene) return
  personnage.play('super_boss_contreattaque')
  scene.time.delayedCall(REGLAGES_BOSS_FINAL.delaiContreAttaque, () => {
    if (!personnage.scene) return
    for (const joueur of joueursProches(personnage, REGLAGES_BOSS_FINAL.rayonContreAttaque)) joueur.dommage(REGLAGES_BOSS_FINAL.degatContreAttaque)
  })
}

/** Phase « Trône » : lance un PC vers le joueur le plus proche, depuis le siège. */
export function pc__Z(personnage: TJoueur | any, _input: any) {
  const scene = personnage.scene
  const cible = scene.physics.closest(personnage, scene.players.getChildren())
  if (!cible) return
  new PcClass(scene, personnage.x, personnage.y, `pc-${(Math.random() + 1).toString(36).substring(7)}`, { x: cible.x, y: cible.y },
    REGLAGES_BOSS_FINAL.vitessePc, REGLAGES_BOSS_FINAL.degatPc, REGLAGES_BOSS_FINAL.dureePc)
}

/**
 * IA du boss final : arbre de comportement (src/server/ia/bosses/super_boss.ts, ADR-003).
 * Inactive tant que le boss n'est pas révélé (le pilote ignore les boss inactifs).
 */
export function __auto(personnage: TJoueur | any, _input: any, aptitudes: any) {
  demarrerIA(personnage, arbreBossFinal, {
    periode: 500,
    aptitudes,
    percevoir: () => ({ tronesRestants: personnage.rangees?.length ?? 0, dernierCoup: personnage.dernierCoup }),
  });
}

/**
 * Taille de chaque élément du trône dans l'atlas (static/assets/super_boss_atlas.json) : le corps
 * physique correspond à l'image, sans trou entre les rangées (espacées de 130 px, hautes de ~150 px),
 * pour que les projectiles ne passent pas entre deux rangées.
 */
const TAILLES_TRONE: Record<string, readonly [number, number]> = {
  tronetest: [1147, 150],
  tronetest2: [1046, 157],
  tronetest3: [938, 157],
  tronetest4: [832, 157],
  tronetest5: [730, 148],
  tronetest6: [313, 148],
  tronehaut: [579, 428],
}

/** Corps physique du boss hors du trône : la silhouette de la frame « super_boss » (sans les ailes). */
const TAILLE_CORPS_BOSS = [218, 379] as const

function creerTrone(personnage: TJoueur, etageTrone: string, positionY: number) {
  const trone = personnage.scene.add.existing(new Trone(personnage.scene, personnage.flipX ? personnage.x - 180 : personnage.x + 180, -900, "personnage", `${etageTrone}`, etageTrone, positionY).setData({ ClientId: personnage.ClientID, degat: 0.9 }));
  trone.setPushable(false);
  const [largeur, hauteur] = TAILLES_TRONE[etageTrone] ?? [1000, 100]
  trone.setSize(largeur, hauteur)
  trone.setActive(false)

  return personnage.scene.physics.add.existing(trone);
}
