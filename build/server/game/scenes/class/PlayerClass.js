"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomState_1 = require("../../RoomState");
const AnimationJoueur_1 = require("../Animations/AnimationJoueur");
const base_1 = require("../Aptitudes/base");
const Defaut_1 = require("../Stats/Defaut");
/**
 * Joueur et interaction
 */
class PlayerClass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, atlas, ClientID, sprite, auto) {
        super(scene, x, y, atlas, sprite);
        this.aObtenuUnBoss = false;
        this.vel = 600;
        this.pieceCourante = 'hall';
        this.cible_courante = "enemies";
        this.compteurSaut = 0;
        this.iconSuitJoueur = false;
        this.canMove = true;
        this.attaque = false;
        this.blesse_opposant = false;
        this.soigne = false;
        this.survole = false;
        this.vie = 10;
        this.degat = 1;
        this.vole = false;
        this.init(scene, ClientID, sprite, auto);
    }
    init(scene, ClientID, sprite, auto) {
        this.scene = scene;
        this.ClientID = ClientID;
        this.particules = false;
        this.sprite = sprite;
        //initialisation de l'etat du joueur
        new AnimationJoueur_1.AnimationJoueur(this.anims);
        const self = this;
        (0, Defaut_1.DefautDirection)(base_1.Aptitudes, this);
        base_1.Aptitudes[this.sprite].StatsSupplementaire.call(self, self, base_1.Aptitudes);
        if (!this.scene.room.boss[`${this.sprite}`]) {
            this.scene.time.delayedCall(100, () => {
                this.changeInterfaceClient(this.sprite);
            }, null, this);
        }
        this.currentTarget = this;
        this.me = this;
        this.bossControllable = this.scene.add.group();
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame) {
            this.blesse_opposant = false;
            if (anim.key === 'cross') {
                if (frame.frame.name == 'cross4') {
                    this.blesse_opposant = true;
                }
            }
            if (anim.key === 'attack') {
                if (frame.frame.name == 'positiona4') {
                    this.blesse_opposant = true;
                }
            }
            if (anim.key === 'akhizonah_couteau') {
                if (frame.frame.name == 'knife2') {
                    this.blesse_opposant = true;
                }
            }
            if (anim.key === 'straightlead') {
                if (frame.frame.name == 'straightlead1') {
                    this.blesse_opposant = true;
                }
            }
            if (anim.key === 'osmo_attaque') {
                if (frame.frame.name == 'osmo_attaque3') {
                    this.blesse_opposant = true;
                }
            }
            if (anim.key === 'twitchman_punch') {
                if (frame.frame.name == 'twitchmanpunch1') {
                    this.blesse_opposant = true;
                }
            }
            if (anim.key === 'manette_punch') {
                if (frame.frame.name == 'manettepunch1') {
                    this.blesse_opposant = true;
                }
            }
            if (anim.key === 'attaque') {
                this.blesse_opposant = true;
            }
        });
        this.zoneInteraction = this.scene.add.rectangle(0, 0, 32, 64, 0xffffff, 0);
        //ACTIVER GRACE À LA FONCTION OVERLAP DE PHASER #hall.ts
        this.zoneInteraction.action = (_e) => {
            if (this.blesse_opposant) {
                this.blesse_opposant = false;
                if (typeof _e.dommage === "function" && _e.sprite != this.sprite) {
                    if (_e.vie <= 0) {
                        _e.vie = 10;
                        if (_e.cible_courante == "enemies")
                            _e.son = 'game-over';
                    }
                    else {
                        _e.dommage(this.degat);
                    }
                }
            }
            if (this.soigne) {
                _e.vie += 0.01;
            }
        };
        this.scene.physics.add.existing(this.zoneInteraction);
        this.zoneInteraction.body.enable = false;
        if (this.scene)
            this.scene.playersAttackZone.add(this.zoneInteraction);
        if (auto) {
            if (base_1.Aptitudes[this.sprite].auto)
                base_1.Aptitudes[this.sprite].auto(this, {}, base_1.Aptitudes[this.sprite]);
        }
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        const input = this.scene.room.donnes[this.ClientID].clavier;
        let { right, left, space, a, z, e, r, up, down, a_fin, left_fin, right_fin, space_fin, z_fin, left_debut, right_debut, tab, tab_fin } = input;
        let animationName = this.anims.getFrameName();
        if (this.canMove) {
            this.zoneInteraction.setPosition(this.x + (this.flipX ? -150 : 150), this.y);
            if (a || a_fin)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].A === "function" && base_1.Aptitudes[this.currentTarget.sprite].A(this.currentTarget, input);
            if (z || z_fin)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].Z === "function" && base_1.Aptitudes[this.currentTarget.sprite].Z(this.currentTarget, input);
            if (e)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].E === "function" && base_1.Aptitudes[this.currentTarget.sprite].E(this.currentTarget, input);
            if (r)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].R === "function" && base_1.Aptitudes[this.currentTarget.sprite].R(this.currentTarget, input);
            if (tab || tab_fin)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].TAB === "function" && base_1.Aptitudes[this.currentTarget.sprite].TAB(this.currentTarget, input);
            if (left || left_fin)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].toucheGauche === "function" && base_1.Aptitudes[this.currentTarget.sprite].toucheGauche(this.currentTarget, input);
            if (right || right_fin)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].toucheDroite === "function" && base_1.Aptitudes[this.currentTarget.sprite].toucheDroite(this.currentTarget, input);
            if (up)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].toucheHaut === "function" && base_1.Aptitudes[this.currentTarget.sprite].toucheHaut(this.currentTarget, input);
            if (down)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].toucheBas === "function" && base_1.Aptitudes[this.currentTarget.sprite].toucheBas(this.currentTarget, input);
            if (space)
                this.currentTarget.sprite in base_1.Aptitudes && typeof base_1.Aptitudes[this.currentTarget.sprite].toucheEspace === "function" && base_1.Aptitudes[this.currentTarget.sprite].toucheEspace(this.currentTarget, input);
            if (left_fin)
                input.left_fin = false;
            if (z_fin)
                input.z_fin = false;
            if (right_fin)
                input.right_fin = false;
            if (space_fin)
                input.space_fin = false;
            if (right_debut)
                input.right_debut = false;
            if (left_debut)
                input.left_debut = false;
            if (tab_fin)
                input.tab_fin = false;
        }
        if (this.suivre) {
            this.setPosition(this.currentTarget.getTopCenter().x, this.currentTarget.getTopCenter().y - 70);
        }
        if (this.vie <= 0) {
            this.vie = 10;
            if (this.cible_courante == "players")
                this.animationBossVaincu();
            else
                this.respawn();
        }
        this.scene.room.state.presences.set(this.ClientID, new RoomState_1.Player({
            id: this.ClientID,
            x: this.x,
            y: this.y,
            sprite: this.sprite,
            scale: this.scale,
            alpha: this.alpha,
            anim: animationName,
            flipX: this.flipX,
            tint: this.tintBottomLeft,
            vie: this.vie,
            xa: this.zoneInteraction.x,
            ya: this.zoneInteraction.y,
            son: this.son,
            particules: this.particules
        }));
        if (this.particules)
            this.particules = false;
        if (this.son)
            this.son = undefined;
    }
    /**
     * #### Description
     * Change la couleur du personnage en rouge pendant 100ms<br>
     * Puis diminue la vie selon la puissance reçu
     *
     * #### Version
     * since: V1.0.0
     * #### Example
     * ```ts
     * dommage(3)
     * ```
     *
     * Dommages player class
     * @param puissance degat de l'attaquant
     */
    dommage(puissance) {
        if (this.scene) {
            this.setTint(0xff0000);
            this.scene.time.delayedCall(100, () => {
                this.clearTint();
            }, null, this);
            if (puissance >= 0) {
                this.vie -= puissance;
            }
        }
    }
    /**
     * #### Description
     * Change la liste des commandes ou/et de l'icon selon<br>
     * selon les commandes disponibles du joueur
     *
     * #### Version
     * since: V1.0.0
     * #### Example
     * ```ts
     * changeInterfaceClient('fakhear', true);
     * ```
     *
     *
     * #### Links
     * {@link game/scenes/Aptitudes/base | fonctionnement de la construction de l'objet pour les touches }
     *
     * Changes interface client
     * @param sprite
     * @param [icon]
     */
    changeInterfaceClient(sprite, icon = false) {
        this.scene.room.state.presences.set(this.ClientID, new RoomState_1.Player(icon ? {
            sprite_fusion: sprite,
            commandes: new RoomState_1.Commandes(base_1.Aptitudes[sprite]["commandes"])
        } : {
            commandes: new RoomState_1.Commandes(base_1.Aptitudes[sprite]["commandes"])
        }));
    }
    /**
     * #### Description
     * Déplacer le joueur dans le hall + animation opacité <br>
     * Ajout du personnage dans l'objet joueur
     *
     * #### Version
     * since: V1.0.0
     *
     * Respawns player class
     */
    respawn() {
        this.scene.tweens.add({
            targets: this,
            // alpha: 0.2,
            duration: 200,
            repeat: 3,
            yoyo: true
        });
        this.scene.tweens.add({
            targets: this,
            x: 2830,
            y: 755,
            duration: 500,
            onComplete: function () {
                if (arguments[1][0].scene) {
                    arguments[1][0].scene.players.add(arguments[1][0]);
                }
            }
        });
    }
    /**
     * #### Description
     * Change l'état du boss en "vaincu"<br>
     * Emit le Débloquage d'un étage au client selon le boss vaincu<br>
     * Ajout une animation au boss et modifie sa dimension
     *
     * #### Version
     * since: V1.0.0
     *
     * Animations boss vaincu
     */
    animationBossVaincu() {
        this.setScale(0.5);
        this.particules = true;
        this.scene.room.boss[`${this.sprite}`].vaincu = true;
        if (this.scene.room.boss["twitchman"].vaincu && this.scene.room.boss["boss_1"].vaincu) {
            this.scene.room.broadcast("RDC_OK");
        }
        if (this.scene.room.boss["troll"].vaincu && this.scene.room.boss["manette"].vaincu) {
            this.scene.room.broadcast("ETAGE_OK");
            this.scene.enemiesRef[this.scene.room.boss["super_boss"].id].setActive(true);
            this.scene.enemiesRef[this.scene.room.boss["super_boss"].id].trones.setActive(true);
        }
        if (this.scene.room.boss["troll"].vaincu &&
            this.scene.room.boss["twitchman"].vaincu &&
            this.scene.room.boss["manette"].vaincu &&
            this.scene.room.boss["boss_1"].vaincu &&
            this.scene.room.boss["super_boss"].vaincu) {
            const joueur = [];
            const resultat = this.scene.StopCompteur();
            this.scene.players.getChildren().forEach((j) => {
                joueur.push(j.sprite);
            });
            this.scene.room.broadcast("FIN_JEU", { temps: resultat, joueur });
        }
        this.body.setAllowGravity(false);
        this.setVelocity(0);
        this.setPushable(false);
        this.animationBossFigurine = this.scene.tweens.add({
            targets: this,
            y: "-=90",
            alpha: 0.5,
            ease: 'Sine.inOut',
            yoyo: true,
            duration: 1000,
            repeat: -1
        });
    }
}
exports.default = PlayerClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheWVyQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvc2NlbmVzL2NsYXNzL1BsYXllckNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQW1EO0FBQ25ELG1FQUErRDtBQUMvRCw0Q0FBNkM7QUFDN0MsNENBQWlEO0FBRWpEOztHQUVHO0FBRUYsTUFBcUIsV0FBWSxTQUFRLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07SUFnQ25FLFlBQ0UsS0FBbUIsRUFDbkIsQ0FBUyxFQUNULENBQVMsRUFDVCxLQUFhLEVBQ2IsUUFBZ0IsRUFDaEIsTUFBYyxFQUNkLElBQWM7UUFFZCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBbkNuQyxrQkFBYSxHQUFZLEtBQUssQ0FBQTtRQUU5QixRQUFHLEdBQVcsR0FBRyxDQUFBO1FBQ2pCLGtCQUFhLEdBQVcsTUFBTSxDQUFBO1FBRzlCLG1CQUFjLEdBQVcsU0FBUyxDQUFBO1FBQ2xDLGlCQUFZLEdBQVcsQ0FBQyxDQUFBO1FBQ3hCLG1CQUFjLEdBQVksS0FBSyxDQUFBO1FBRS9CLFlBQU8sR0FBWSxJQUFJLENBQUE7UUFDdkIsWUFBTyxHQUFZLEtBQUssQ0FBQTtRQUd4QixvQkFBZSxHQUFZLEtBQUssQ0FBQTtRQUNoQyxXQUFNLEdBQVksS0FBSyxDQUFBO1FBTXZCLFlBQU8sR0FBWSxLQUFLLENBQUE7UUFFeEIsUUFBRyxHQUFXLEVBQUUsQ0FBQTtRQUNoQixVQUFLLEdBQVcsQ0FBQyxDQUFBO1FBQ2pCLFNBQUksR0FBWSxLQUFLLENBQUM7UUFZcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQW1CLEVBQUUs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LENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdFLElBQUksQ0FBQyxJQUFJLEtBQUs7Z0JBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksZ0JBQVMsSUFBSSxPQUFPLGdCQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxJQUFJLGdCQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1TCxJQUFJLENBQUMsSUFBSSxLQUFLO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLGdCQUFTLElBQUksT0FBTyxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUwsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLGdCQUFTLElBQUksT0FBTyxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbkwsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLGdCQUFTLElBQUksT0FBTyxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbkwsSUFBSSxHQUFHLElBQUksT0FBTztnQkFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxnQkFBUyxJQUFJLE9BQU8sZ0JBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxVQUFVLElBQUksZ0JBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BNLElBQUksSUFBSSxJQUFJLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLElBQUksZ0JBQVMsSUFBSSxPQUFPLGdCQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEtBQUssVUFBVSxJQUFJLGdCQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUN2TixJQUFJLEtBQUssSUFBSSxTQUFTO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLGdCQUFTLElBQUksT0FBTyxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxLQUFLLFVBQVUsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDek4sSUFBSSxFQUFFO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLGdCQUFTLElBQUksT0FBTyxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxLQUFLLFVBQVUsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDck0sSUFBSSxJQUFJO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLGdCQUFTLElBQUksT0FBTyxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDck0sSUFBSSxLQUFLO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLGdCQUFTLElBQUksT0FBTyxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxLQUFLLFVBQVUsSUFBSSxnQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFN00sSUFBSSxRQUFRO2dCQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JDLElBQUksS0FBSztnQkFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLFNBQVM7Z0JBQUUsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkMsSUFBSSxTQUFTO2dCQUFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLElBQUksV0FBVztnQkFBRSxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtZQUMxQyxJQUFJLFVBQVU7Z0JBQUUsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDekMsSUFBSSxPQUFPO2dCQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtTQUNqRztRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUztnQkFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTs7Z0JBQzNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNwQjtRQUVBLElBQUksQ0FBQyxLQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUMxQyxJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksa0JBQU0sQ0FBQztZQUNULEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUNqQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsYUFBYTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ3pCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDMUIsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDNUIsQ0FBQyxDQUNILENBQUE7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsR0FBRztZQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO0lBSXJDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE9BQU8sQ0FBQyxTQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBQ2xCLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDZixJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFBO2FBQ3RCO1NBQ0Y7SUFDSCxDQUFDO0lBSUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxxQkFBcUIsQ0FBQyxNQUFjLEVBQUUsT0FBZ0IsS0FBSztRQUN0RCxJQUFJLENBQUMsS0FBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDMUMsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLGtCQUFNLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqQixhQUFhLEVBQUUsTUFBTTtZQUNyQixTQUFTLEVBQUUsSUFBSSxxQkFBUyxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDekQsQ0FBQyxDQUFDLENBQUM7WUFDRixTQUFTLEVBQUUsSUFBSSxxQkFBUyxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDekQsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBR0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsT0FBTztRQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNwQixPQUFPLEVBQUUsSUFBSTtZQUNiLGNBQWM7WUFDZCxRQUFRLEVBQUUsR0FBRztZQUNiLE1BQU0sRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDcEIsT0FBTyxFQUFFLElBQUk7WUFDYixDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxHQUFHO1lBQ04sUUFBUSxFQUFFLEdBQUc7WUFDYixVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDO29CQUN4QixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ25EO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUVMLENBQUM7SUFHRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsbUJBQW1CO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUU5RCxJQUFLLElBQUksQ0FBQyxLQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLElBQUssSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFDdkc7WUFDRyxJQUFJLENBQUMsS0FBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFLLElBQUksQ0FBQyxLQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUssSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFDcEc7WUFDRyxJQUFJLENBQUMsS0FBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQWEsQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RixJQUFJLENBQUMsS0FBYSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsS0FBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2RztRQUVELElBQ0csSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07WUFDNUMsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU07WUFDaEQsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU07WUFDOUMsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU07WUFDN0MsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFFcEQ7WUFDRSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDbEIsTUFBTSxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsS0FBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBRUEsSUFBSSxDQUFDLElBQVksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakQsT0FBTyxFQUFFLElBQUk7WUFDYixDQUFDLEVBQUUsTUFBTTtZQUNULEtBQUssRUFBRSxHQUFHO1lBQ1YsSUFBSSxFQUFFLFlBQVk7WUFDbEIsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDWCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuWEQsOEJBbVhDIn0=