"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__auto = exports.laser__E = exports.charge__Z = exports.punch__A = exports.__StatsSupplementaire = void 0;
const LaserClass_1 = __importDefault(require("../class/elements/LaserClass"));
function __StatsSupplementaire(twitchman, Aptitudes) {
    Aptitudes[twitchman.sprite].toucheEspace = function (_twitchman) {
        _twitchman.body.setVelocityY(-500);
        _twitchman.play('twitchman_vole', true);
        _twitchman.survole = true;
        _twitchman.scene.time.delayedCall(410, () => {
            _twitchman.survole = false;
        });
    };
    twitchman.cible_courante = "players";
    twitchman.laser = new LaserClass_1.default(twitchman.scene, twitchman.x + 80, twitchman.y - 185, 0, 28, 1902222, 1, `${(Math.random() + 1).toString(36).substring(7)}`, twitchman, twitchman.cible_courante);
}
exports.__StatsSupplementaire = __StatsSupplementaire;
function punch__A(twitchman, input) {
    if (input.a) {
        twitchman.play('twitchman_punch');
        input.a = false;
    }
}
exports.punch__A = punch__A;
function charge__Z(twitchman, input) {
    if (input.z) {
        twitchman.play('twitchman_charge');
        twitchman.body.setVelocityX(twitchman.flipX ? -5000 : 5000);
        input.z = false;
    }
    if (input.z_fin) {
        twitchman.body.setVelocity(0);
        twitchman.play('twitchman_vole', true);
    }
}
exports.charge__Z = charge__Z;
function laser__E(twitchman, input) {
    twitchman.son = 'laser';
    twitchman.laser.charge();
    input.e = false;
}
exports.laser__E = laser__E;
function __auto(twitchman, _input, aptitudes) {
    if (twitchman.scene) {
        if (twitchman.scene.room.boss[`${twitchman.sprite}`].vaincu)
            return;
        const positionJoueurProche = twitchman.scene.physics.closest(twitchman, [...twitchman.scene[`${twitchman.cible_courante}`].getChildren()]);
        if (positionJoueurProche) {
            var dist = Phaser.Math.Distance.BetweenPoints(twitchman, positionJoueurProche);
            if (positionJoueurProche.x < 1789 && positionJoueurProche.y > -249) {
                if (positionJoueurProche.x < twitchman.x) {
                    twitchman.setFlipX(true);
                    if (positionJoueurProche.y == twitchman.y) {
                        if (twitchman.body)
                            charge__Z(twitchman, { z: true });
                        const colision = twitchman.scene.physics.add.collider(positionJoueurProche, twitchman);
                        twitchman.scene.time.delayedCall(500, () => {
                            twitchman.scene.physics.world.removeCollider(colision);
                        }, null, this);
                        reactiveBoucle(twitchman, aptitudes);
                    }
                    else if (dist > 400 && dist < 900) {
                        if (twitchman.body)
                            charge__Z(twitchman, { z: true });
                        reactiveBoucle(twitchman, aptitudes);
                    }
                    else if (dist > 900) {
                        if (twitchman.body) {
                            twitchman.body.setVelocityX(-340);
                            aptitudes.toucheGauche(twitchman, { left_debut: true });
                        }
                        reactiveBoucle(twitchman, aptitudes);
                    }
                    else if (dist < 400) {
                        twitchman.play("twitchman_punch");
                        twitchman.scene.tweens.add({
                            delay: 500,
                            onStart: () => {
                                if (twitchman)
                                    twitchman.play("twitchman_vole");
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
                else if (positionJoueurProche.x > twitchman.x) {
                    twitchman.setFlipX(false);
                    if (positionJoueurProche.y == twitchman.y) {
                        if (twitchman.body)
                            charge__Z(twitchman, { z: true });
                        const colision = twitchman.scene.physics.add.collider(positionJoueurProche, twitchman);
                        twitchman.scene.time.delayedCall(500, () => {
                            twitchman.scene.physics.world.removeCollider(colision);
                        }, null, this);
                        reactiveBoucle(twitchman, aptitudes);
                    }
                    else if (dist > 400 && dist < 900) {
                        twitchman.scene.tweens.add({
                            onStart: () => twitchman.play("twitchman_vole"),
                            targets: twitchman,
                            y: 0,
                            x: "-=40",
                            duration: 1000,
                            ease: 'Sine.inOut',
                            onComplete: () => {
                                laser__E(twitchman, { e: true });
                                reactiveBoucle(twitchman, aptitudes);
                            }
                        });
                    }
                    else if (dist > 900) {
                        if (twitchman.body) {
                            twitchman.body.setVelocityX(340);
                            aptitudes.toucheDroite(twitchman, { right_debut: true });
                        }
                        reactiveBoucle(twitchman, aptitudes);
                    }
                    else if (dist < 400) {
                        twitchman.play("twitchman_punch");
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
            else {
                if (twitchman.x != 427) {
                    twitchman.scene.tweens.add({
                        targets: twitchman,
                        x: 427,
                        y: 755,
                        onStart: () => twitchman.play("twitchman_vole"),
                        onComplete: () => {
                            reactiveBoucle(twitchman, aptitudes);
                        },
                        duration: 900,
                    });
                }
                else
                    reactiveBoucle(twitchman, aptitudes);
            }
        }
    }
}
exports.__auto = __auto;
function reactiveBoucle(twitchman, aptitudes) {
    if (twitchman.scene) {
        if (twitchman.scene.room.boss[`${twitchman.sprite}`].vaincu)
            return;
        twitchman.scene.time.delayedCall(500, () => {
            if (twitchman.scene.room.boss[`${twitchman.sprite}`].vaincu)
                return;
            __auto(twitchman, {}, aptitudes);
        }, null, this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdpdGNobWFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL3NjZW5lcy9BcHRpdHVkZXMvdHdpdGNobWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDhFQUFzRDtBQUV0RCxTQUFnQixxQkFBcUIsQ0FBQyxTQUFrQixFQUFFLFNBQWM7SUFDdEUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxVQUFtQjtRQUN0RSxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDdkMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFDekIsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDMUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUE7SUFFRCxTQUFTLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQTtJQUNwQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksb0JBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBRXBNLENBQUM7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