"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerClass_1 = __importDefault(require("./class/PlayerClass"));
/**
 * Serveur Phaser 3 Epreuve 1
 */
class Hall extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    setRoom(room) {
        this.room = room;
    }
    /**
     * Chargement de tout les atlas avec une mini image pour le serveur<br>
     */
    preload() {
        this.load.atlas('atlas', __dirname + '/fakhear_atlas_serveur.png', __dirname + '/fakhear_atlas.json');
    }
    /**
     * Création des groupes + platformes + colision
     * Commence le compte à rebours
     */
    create() {
        var customBounds = new Phaser.Geom.Rectangle(-3700 / 2, 20, 5660, 945);
        this.players = this.physics.add.group({
            runChildUpdate: true,
            collideWorldBounds: true
        });
        this.enemies = this.physics.add.group({
            runChildUpdate: true,
            collideWorldBounds: true
        });
        this.playersAttackZone = this.physics.add.group({
            allowGravity: false
        });
        this.ennemieAttackZone = this.physics.add.group({
            allowGravity: false
        });
        this.groupeBoulesHuzounet = this.physics.add.group({
            runChildUpdate: true
        });
        this.groupeManettes = this.physics.add.group({
            runChildUpdate: true,
            allowGravity: false
        });
        this.physics.add.overlap(this.playersAttackZone, [this.enemies, this.players], this.overlapAction, undefined, this);
        this.physics.add.overlap(this.ennemieAttackZone, [this.players], this.overlapActionEnnemie, undefined, this);
        this.playersRef = {};
        this.enemiesRef = {};
        const platforme = this.add.rectangle(1837, 940, 128, 128);
        platforme.scaleX = 14.993211052385613;
        platforme.scaleY = -0.08853600509578045;
        platforme.setOrigin(0, 0.5);
        platforme.isFilled = true;
        platforme.fillColor = 10563832;
        platforme.setData('piece', 'hall');
        this.platforme = platforme;
        const platforme_gauche = this.add.rectangle(5, 940, 128, 128);
        platforme_gauche.scaleX = 14.310196671161355;
        platforme_gauche.scaleY = -0.09826542861018456;
        platforme_gauche.setOrigin(0, 0.5);
        platforme_gauche.isFilled = true;
        platforme_gauche.fillColor = 10563832;
        platforme_gauche.setData('piece', 'bas_gauche');
        this.platforme_gauche = platforme_gauche;
        const platforme_droite = this.add.rectangle(3756, 940, 128, 128);
        platforme_droite.scaleX = 14.310196671161355;
        platforme_droite.scaleY = -0.09826542861018456;
        platforme_droite.setOrigin(0, 0.5);
        platforme_droite.isFilled = true;
        platforme_droite.fillColor = 10563832;
        platforme_droite.setData('piece', 'boss1');
        this.platforme_droite = platforme_droite;
        const platforme_haut = this.add.rectangle(1833, -66, 128, 128);
        platforme_haut.scaleX = 14.993211052385613;
        platforme_haut.scaleY = -0.08853600509578045;
        platforme_haut.setOrigin(0, 0.5);
        platforme_haut.isFilled = true;
        platforme_haut.fillColor = 10563832;
        platforme_droite.setData('piece', 'haut');
        this.platforme_haut = platforme_haut;
        // platforme_haut_droite
        const platforme_haut_droite = this.add.rectangle(3752, -66, 128, 128);
        platforme_haut_droite.scaleX = 14.310196671161355;
        platforme_haut_droite.scaleY = -0.09826542861018456;
        platforme_haut_droite.setOrigin(0, 0.5);
        platforme_haut_droite.isFilled = true;
        platforme_haut_droite.fillColor = 10563832;
        platforme_droite.setData('piece', 'haut_droite');
        this.platforme_haut_droite = platforme_haut_droite;
        // platforme_haut_gauche
        const platforme_haut_gauche = this.add.rectangle(1, -66, 128, 128);
        platforme_haut_gauche.scaleX = 14.310196671161355;
        platforme_haut_gauche.scaleY = -0.09826542861018456;
        platforme_haut_gauche.setOrigin(0, 0.5);
        platforme_haut_gauche.isFilled = true;
        platforme_haut_gauche.fillColor = 10563832;
        platforme_droite.setData('piece', 'bas_droite');
        this.platforme_haut_gauche = platforme_haut_gauche;
        this.physics.add.existing(platforme, true);
        this.physics.add.existing(platforme_gauche, true);
        this.physics.add.existing(platforme_droite, true);
        this.physics.add.existing(platforme_haut, true);
        this.physics.add.existing(platforme_haut_gauche, true);
        this.physics.add.existing(platforme_haut_droite, true);
        let listePlatforme = this.physics.add.collider([platforme, platforme_droite, platforme_gauche, platforme_haut, platforme_haut_gauche, platforme_haut_droite], [this.players, this.enemies]);
        this.colisionShurikenEnnemie = this.physics.add.collider(this.groupeBoulesHuzounet, this.enemies, function (_boule, _ennemie) {
            _ennemie.dommage(_boule.getData('degat'));
            _boule.setData('degat', 0);
        }, null, this);
        this.physics.world.setBoundsCollision(true, true, false, true);
        this.CommencerCompteur();
    }
    /**
     * #### Description
     * Active la fonction du joueur 'action' quand la zone d'interaction (rectangle) overlap
     *
     * #### Version
     * since: V1.0.0
     *
     * Overlaps action
     * @param playerActionZone
     * @param ennemie
     */
    overlapAction(playerActionZone, ennemie) {
        playerActionZone.action(ennemie);
    }
    /**
     * #### Description
     * Active la fonction 'action' de l'ennmie qui gère l'interaction
     *
     * #### Version
     * since: V1.0.0
     *
     * Overlaps action
     * @param ennemieActionZone
     * @param joueur
     */
    overlapActionEnnemie(ennemieActionZone, joueur) {
        ennemieActionZone.action(joueur);
    }
    /**
     * #### Description
     * Retourne tout les joueurs et éléments presents dans la partie
     * #### Version
     * since: V1.0.0
     *
     * Gets presence
     * @returns liste des joueurs/elements présents
     */
    getPresence() {
        let response = {};
        if (this.players) {
            this.players.children.iterate((child) => {
                if (child.data.values.ClientId) {
                    // response[child.data.values.ClientId] = { x: child.x, y: child.y, sprite: child.sprite, vie: child.vie}
                    response[child.data.values.ClientId] = { x: child.x, y: child.y };
                }
            });
        }
        return {
            presences: response,
            presenceList: Object.keys(response),
            boulesListe: Object.keys(response),
            total: Object.keys(response).length,
        };
    }
    /**
     * #### Description
     *
     * #### Version
     * since: V1.0.0
     * #### Example
     *
     * #### Links
     *
     *
     * Creates player
     * @param ClientId id de la session colyseus
     * @param sprite nom du sprite
     * @returns liste des elements présents
     */
    createPlayer(ClientId, sprite) {
        this.time.delayedCall(8000, () => {
            const player = this.add.existing(new PlayerClass_1.default(this, 2830, 700, "atlas", ClientId, sprite).setData({ ClientId }));
            player.cible_courante = "enemies";
            this.players.add(player);
            this.playersRef[ClientId] = player;
            player.setBounceX(0.2).setDragX(300);
        }, null, this);
        return this.getPresence();
    }
    /**
     * #### Description
     *
     * #### Version
     * since: V1.0.0
     * #### Example
     * ```ts
     * createEnnemy(1234, 'manette', true, 1000, 200)
     * ```
     * #### Links
     * {@link game/Hall_01 | détail de l'objet des boss (position, nom, etat...) }
     *
     *
     * Creates ennemy
     * @param EnnemyId id généré au hazard
     * @param sprite nom du sprite
     * @param [auto] active ou non le mode 'bot' automatique
     * @param [x] emplacement de l'apparition généré dans l'objet des boss
     * @param [y] emplacement de l'apparition généré dans l'objet des boss
     * @returns
     */
    createEnnemy(EnnemyId, sprite, auto = true, x = 1000, y = 0) {
        this.time.delayedCall(8000, () => {
            const ennemy = this.add.existing(new PlayerClass_1.default(this, x, y, "atlas", EnnemyId, sprite, auto).setData({ EnnemyId }));
            ennemy.cible_courante = "players";
            this.enemies.add(ennemy);
            this.enemiesRef[EnnemyId] = ennemy;
            ennemy.setBounceX(0.2).setDragX(300);
        }, null, this);
        return this.getPresence();
    }
    /**
     * #### Description
     * Suppression de la reference de l'objet et du joueur dans son groupe
     *
     * #### Version
     * since: V1.0.0
     *
     * Removes player
     * @param ClientId id du joueur
     * @returns
     */
    removePlayer(ClientId) {
        this.playersRef[ClientId].destroy(true);
        delete this.playersRef[ClientId];
        return this.getPresence();
    }
    /**
     * #### Description
     * Suppression de la reference de l'objet et de l'ennemie dans son groupe
     *
     * #### Version
     * since: V1.0.0
     *
     * Removes ennemy
     * @param ClientId
     * @returns
     */
    removeEnnemy(ClientId) {
        this.enemiesRef[ClientId].destroy(true);
        delete this.enemiesRef[ClientId];
        return this.getPresence();
    }
    /**
     * #### Description
     * Supprime un projectile avec une disparition prossif ou sans
     * #### Version
     * since: V1.0.0
     * #### Example
     * ```ts
     * this.suppressionProjectileDelai(balle, idBalle, 500, true)
     * ```
     *
     * Suppressions projectile delai
     * @param cible element à supprimer
     * @param id id de l'element à supprimer
     * @param [delai] delai avant la suppression
     * @param [smooth] effet progessif opacité
     * @returns
     */
    suppressionProjectileDelai(cible, id, delai = 1000, smooth = false) {
        return this.time.delayedCall(delai, () => {
            if (smooth) {
                this.tweens.add({
                    targets: cible,
                    alpha: 0,
                    duration: 400,
                    onCompleteParams: [this],
                    onComplete: function (_tw, _target, scene) {
                        scene.room.broadcast("suppression", { projectilesRef: id });
                        scene.room.state.projectiles.delete(id);
                        arguments[1][0].destroy(true);
                    }
                });
            }
            else {
                this.room.broadcast("suppression", { projectilesRef: id });
                this.room.state.projectiles.delete(id);
                cible.destroy(true);
            }
        }, null, this);
    }
    /**
     * #### Description
     * Suppression du joueur avec transition possible
     * #### Version
     * since: V1.0.0
     * #### Example
     * ```ts
     * this.suppressionJoueur(joueur, true, joueur.ClientID)
     * ```
     *
     * Suppressions joueur
     * @param cible
     * @param smooth
     * @param id
     * @param [delai]
     */
    suppressionJoueur(cible, smooth, id, delai = 1000) {
        if (smooth) {
            this.tweens.add({
                targets: cible,
                alpha: 0,
                duration: delai,
                onCompleteParams: [this],
                onComplete: function (_tw, _target, scene) {
                    scene.room.broadcast("suppression", { playersRef: id });
                    scene.room.state.presences.delete(id);
                    arguments[1][0].destroy(true);
                }
            });
        }
        else {
            this.room.broadcast("suppression", { playersRef: id });
            this.room.state.presences.delete(id);
            cible.destroy(true);
        }
    }
    /**
     * #### Description
     * !Non utilisé
     * Supprimer les lignes
     * #### Version
     * since: V1.0.0
     *
     * Suppressions ligne
     * @param cible ligne à supprimer
     * @param id id de la ligne
     * @param [delai]
     * @param [smooth]
     */
    suppressionLigne(cible, id, delai = 1000, smooth = false) {
        this.room.broadcast("suppression", { lignesRef: id });
        this.room.state.lignes.delete(id);
        cible.destroy();
    }
    /**
     * #### Description
     * Toute les 1 secondes incrémente le compteur de 1
     *
     * #### Version
     * since: V1.0.0
     *
     * Commencer compteur
     */
    CommencerCompteur() {
        this.compteur = this.time.addEvent({
            delay: 1000,
            callback: function () {
                this.room.state.compteur += 1;
            },
            callbackScope: this,
            loop: true
        });
    }
    /**
     * #### Description
     * Capture le resultat du compteur et convertit en heure + minute + secondes
     * Retoure le resulat en string
     *
     * #### Version
     * since: V1.0.0
     * #### Example
     *
     * #### Links
     *
     *
     * Stops compteur
     * @returns
     */
    StopCompteur() {
        const resultat = this.room.state.compteur;
        this.compteur.remove();
        return this.secondsToTime(resultat);
    }
    /**
     * #### Description
     * Convertis les millisecondes en heure + minute + secondes
     *
     * #### Version
     * since: V1.0.0
     * #### Example
     * ```ts
     * secondsToTime(21)
     * ```
     *
     * Seconds to time
     * @param e nombre à convertir
     * @returns heure + minutes + secondes
     */
    secondsToTime(e) {
        const h = Math.floor(e / 3600).toString().padStart(2, '0'), m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'), s = Math.floor(e % 60).toString().padStart(2, '0');
        return h + ':' + m + ':' + s;
    }
}
exports.default = Hall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvaGFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUE2QztBQUU3Qzs7R0FFRztBQUVILE1BQXFCLElBQUssU0FBUSxNQUFNLENBQUMsS0FBSztJQXVCNUM7UUFDRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFTO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLEdBQUcsc0RBQXNELEVBQUUsU0FBUyxHQUFHLCtDQUErQyxDQUFDLENBQUM7SUFDNUosQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU07UUFFSixJQUFJLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3BDLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGtCQUFrQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDcEMsY0FBYyxFQUFFLElBQUk7WUFDcEIsa0JBQWtCLEVBQUUsSUFBSTtTQUN6QixDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQzlDLFlBQVksRUFB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