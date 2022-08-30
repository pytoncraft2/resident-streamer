"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__auto = exports.grenouille__Z = exports.oie__A = exports.__StatsSupplementaire = void 0;
const GrenouilleClass_1 = __importDefault(require("../class/elements/GrenouilleClass"));
const OieClass_1 = __importDefault(require("../class/elements/OieClass"));
function __StatsSupplementaire(personnage, Aptitudes) {
    personnage.anims.create({
        key: 'troll_run',
        frames: personnage.anims.generateFrameNames('atlas', { prefix: 'trollrun', start: 0, end: 5 }),
        frameRate: 30,
        repeat: -1
    });
    personnage.anims.create({
        key: 'troll_idle',
        frames: personnage.anims.generateFrameNames('atlas', { prefix: 'troll', start: 0, end: 0 }),
        frameRate: 1,
        repeat: 0
    });
    personnage.anims.create({
        key: 'troll_attaque',
        frames: personnage.anims.generateFrameNames('atlas', { prefix: 'trollattack', start: 0, end: 1 }),
        frameRate: 6,
        repeat: 1
    });
    personnage.cible_courante = "players";
    Aptitudes[personnage.sprite].toucheEspace = (_personnage, _input) => { };
    Aptitudes[personnage.sprite].toucheDroite = (personnage, _input) => {
        if (_input.right_fin) {
            personnage.play('troll_idle');
            personnage.setVelocityX(0);
        }
        else {
            personnage.play('troll_run', true);
            personnage.setVelocityX(1800);
            if (personnage.flipX)
                personnage.setFlipX(false);
        }
    };
    Aptitudes[personnage.sprite].toucheGauche = (personnage, _input) => {
        if (_input.left_fin) {
            personnage.play('troll_idle');
            personnage.setVelocityX(0);
        }
        else {
            personnage.play('troll_run', true);
            personnage.setVelocityX(-1800);
            if (!personnage.flipX)
                personnage.setFlipX(true);
        }
    };
}
exports.__StatsSupplementaire = __StatsSupplementaire;
function oie__A(troll, input) {
    if (input.a) {
        input.a = false;
        troll.play("troll_attaque");
        troll.son = 'troll_bouton';
        const oie = troll.scene.add.existing(new OieClass_1.default(troll.scene, troll.flipX ? troll.x - 180 : troll.x + 180, troll.y, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.9 }));
        troll.scene.physics.add.existing(oie);
        troll.scene.physics.add.collider(troll.scene[`${troll.cible_courante}`].getChildren(), oie);
        oie.setPushable(false);
    }
}
exports.oie__A = oie__A;
function grenouille__Z(troll, input) {
    if (input.z) {
        input.z = false;
        troll.son = 'troll_bouton2';
        troll.play("troll_attaque");
        const grenouille = troll.scene.add.existing(new GrenouilleClass_1.default(troll.scene, troll.flipX ? troll.x - Phaser.Math.Between(380, 180) : troll.x + Phaser.Math.Between(380, 180), troll.y - 400, "troll", `${(Math.random() + 1).toString(36).substring(7)}`, !troll.flipX, troll.cible_courante).setData({ ClientId: troll.ClientID, degat: 0.3 }));
        troll.scene.physics.add.existing(grenouille);
    }
}
exports.grenouille__Z = grenouille__Z;
function __auto(troll, _input, aptitudes) {
    if (troll.scene) {
        if (troll.scene.room.boss[`${troll.sprite}`].vaincu)
            return;
        const positionJoueurProche = troll.scene.physics.closest(troll, [...troll.scene.players.getChildren()]);
        if (positionJoueurProche) {
            var dist = Phaser.Math.Distance.BetweenPoints(troll, positionJoueurProche);
            if (positionJoueurProche.x < 1789 && positionJoueurProche.y < -249) {
                if (positionJoueurProche.x < troll.x) {
                    troll.setFlipX(true);
                    if (dist > 400 && dist < 900) {
                        if (troll.body)
                            oie__A(troll, { a: true });
                        reactiveBoucle(troll, aptitudes);
                    }
                    else if (dist > 900) {
                        if (troll.body)
                            grenouille__Z(troll, { z: true });
                        reactiveBoucle(troll, aptitudes);
                    }
                    else if (dist < 400) {
                        troll.scene.tweens.add({
                            delay: 500,
                            onStart: () => troll.play("troll_run", true),
                            targets: troll,
                            x: "-=1300",
                            duration: 700,
                            onComplete: () => {
                                troll.body.setVelocityX(0);
                                troll.play("troll_idle");
                                reactiveBoucle(troll, aptitudes);
                            }
                        });
                    }
                }
                else if (positionJoueurProche.x > troll.x) {
                    troll.setFlipX(false);
                    if (dist > 400 && dist < 900) {
                        if (troll.body)
                            oie__A(troll, { a: true });
                        reactiveBoucle(troll, aptitudes);
                    }
                    else if (dist > 900) {
                        if (troll.body) {
                            if (troll.body)
                                grenouille__Z(troll, { z: true });
                        }
                        reactiveBoucle(troll, aptitudes);
                    }
                    else if (dist < 400) {
                        // troll.play("troll_punch")
                        troll.scene.tweens.add({
                            delay: 500,
                            onStart: () => troll.play("troll_run", true),
                            targets: troll,
                            x: "+=1300",
                            duration: 700,
                            onComplete: () => {
                                troll.body.setVelocityX(0);
                                troll.play("troll_idle");
                                reactiveBoucle(troll, aptitudes);
                            }
                        });
                    }
                }
            }
            else {
                if (troll.x != 427) {
                    troll.scene.tweens.add({
                        targets: troll,
                        x: 427,
                        y: -249,
                        onStart: () => troll.play("troll_idle"),
                        onComplete: () => {
                            reactiveBoucle(troll, aptitudes);
                        },
                        duration: 900,
                    });
                }
                else
                    reactiveBoucle(troll, aptitudes);
            }
        }
    }
}
exports.__auto = __auto;
function reactiveBoucle(troll, aptitudes) {
    if (troll.scene) {
        if (troll.scene.room.boss[`${troll.sprite}`].vaincu)
            return;
        troll.scene.time.delayedCall(800, () => {
            if (troll.scene.room.boss[`${troll.sprite}`].vaincu)
                return;
            __auto(troll, {}, aptitudes);
        }, null, this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJvbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvc2NlbmVzL0FwdGl0dWRlcy90cm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx3RkFBZ0U7QUFDaEUsMEVBQWtEO0FBRWxELFNBQWdCLHFCQUFxQixDQUFDLFVBQW1CLEVBQUUsU0FBYztJQUN2RSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUN0QixHQUFHLEVBQUUsV0FBVztRQUNoQixNQUFNLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzlGLFNBQVMsRUFBRSxFQUFFO1FBQ2IsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUNYLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3RCLEdBQUcsRUFBRSxZQUFZO1FBQ2pCLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDM0YsU0FBUyxFQUFFLENBQUM7UUFDWixNQUFNLEVBQUUsQ0FBQztLQUNWLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3RCLEdBQUcsRUFBRSxlQUFlO1FBQ3BCLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDakcsU0FBUyxFQUFFLENB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