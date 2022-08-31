"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__auto = exports.__animationLancerManette = exports.lancer__Z = exports.punch__A = exports.__StatsSupplementaire = void 0;
const ManetteClass_1 = __importDefault(require("../class/elements/ManetteClass"));
function __StatsSupplementaire(personnage, Aptitudes) {
    Aptitudes[personnage.sprite].toucheEspace = (personnage, _input) => {
        personnage.setVelocityY(-1250);
        personnage.setVelocityX(personnage.flipX ? (-1400) : (1400));
        personnage.play("manette_vole");
    };
    personnage.cible_courante = "players";
}
exports.__StatsSupplementaire = __StatsSupplementaire;
function punch__A(manette, input) {
    if (input.a) {
        manette.body.setVelocityY(1000);
        manette.play('manette_punch');
    }
}
exports.punch__A = punch__A;
function lancer__Z(manette, _input) {
    if (!manette.obj_manette) {
        manette.son = 'manette';
        manette.play('manette_lance');
        manette.body.setVelocityY(1000);
        const obj_manette = manette.scene.add.existing(new ManetteClass_1.default(manette.scene, manette.flipX ? manette.x - 80 : manette.x + 80, manette.y - 60, "manette", `${(Math.random() + 1).toString(36).substring(7)}`)
            .setData({ ClientId: manette.ClientID, degat: manette.degat }))
            .setFlipX(manette.flipX);
        manette.scene.physics.add.existing(obj_manette);
        manette.scene.physics.add.overlap(obj_manette, manette.scene[`${manette.cible_courante}`], function (_obj_manette, _ennemie) {
            if (_ennemie.sprite !== manette.sprite) {
                _ennemie.dommage(_obj_manette.getData('degat'));
                _obj_manette.setData('degat', 0);
            }
        }, undefined, manette);
        obj_manette.body.setAllowGravity(false);
        // manette.scene.groupeManettes.add(obj_manette);
        manette.obj_manette = obj_manette;
        manette.scene.time.delayedCall(200, () => {
            var timeline = manette.scene.tweens.createTimeline();
            timeline.add({
                targets: manette.obj_manette,
                x: manette.flipX ? manette.x - 1000 : manette.x + 1000,
                ease: 'Power2',
                duration: 500,
                onComplete: function (_tw, tg) {
                    tg[0].setData('degat', 1);
                }
            });
            timeline.add({
                targets: manette.obj_manette,
                props: {
                    x: { value: function () { return manette.x; }, ease: 'Power1' },
                    y: { value: function () { return manette.y; }, ease: 'Power3' }
                },
                ease: 'Power2',
                duration: 800
            });
            //@ts-ignore
            manette.obj_manette.tweenManette = timeline;
            timeline.play();
            manette.obj_manette = undefined;
        }, null, manette);
    }
}
exports.lancer__Z = lancer__Z;
function __animationLancerManette(manette) {
    var timeline = manette.scene.tweens.createTimeline();
    timeline.add({
        targets: manette.groupeManettes.getChildren()[0],
        x: manette.flipX ? manette.x - 1000 : manette.x + 1000,
        ease: 'Power2',
        duration: 500,
        onComplete: function (_tw, _tg) {
            // tg[0].setData('degat', 1)
        }
    });
    timeline.add({
        targets: manette.groupeManettes.getChildren()[0],
        props: {
            x: { value: function () { return manette.x; }, ease: 'Power1' },
            y: { value: function () { return manette.y; }, ease: 'Power3' }
        },
        ease: 'Power2',
        duration: 800
    });
    timeline.play();
}
exports.__animationLancerManette = __animationLancerManette;
/**
 * @see {@link game/scenes/Aptitudes/base} pour un example
 */
function __auto(manette, _input, aptitudes) {
    if (manette.scene) {
        if (manette.scene.room.boss[`${manette.sprite}`].vaincu)
            return;
        const positionJoueurProche = manette.scene.physics.closest(manette, [...manette.scene.players.getChildren()]);
        if (positionJoueurProche) {
            if (positionJoueurProche.x < 5627 && positionJoueurProche.x > 3802 && positionJoueurProche.y < -249) {
                var dist = Phaser.Math.Distance.BetweenPoints(manette, positionJoueurProche);
                if (positionJoueurProche.x < manette.x) {
                    manette.setFlipX(true);
                    if (dist > 400 && dist < 900) {
                        if (manette.body)
                            lancer__Z(manette, { z: true });
                        reactiveBoucle(manette, aptitudes);
                    }
                    else if (dist > 900) {
                        if (manette.body) {
                            manette.body.setVelocityX(-340);
                            aptitudes.toucheGauche(manette, { left_debut: true });
                        }
                        reactiveBoucle(manette, aptitudes);
                    }
                    else if (dist < 400) {
                        manette.play("manette_punch");
                        manette.scene.tweens.add({
                            delay: 500,
                            onStart: () => manette.play("manette_vole"),
                            targets: manette,
                            x: 3970,
                            y: -950,
                            duration: 1000,
                            ease: 'Sine.inOut',
                            onComplete: () => reactiveBoucle(manette, aptitudes)
                        });
                    }
                }
                else if (positionJoueurProche.x > manette.x) {
                    manette.setFlipX(false);
                    if (dist > 400 && dist < 900) {
                        if (manette.body)
                            lancer__Z(manette, { z: true });
                        reactiveBoucle(manette, aptitudes);
                    }
                    else if (dist > 900) {
                        if (manette.body) {
                            manette.body.setVelocityX(340);
                            aptitudes.toucheDroite(manette, { right_debut: true });
                        }
                        reactiveBoucle(manette, aptitudes);
                    }
                    else if (dist < 400) {
                        manette.play("manette_punch");
                        manette.scene.tweens.add({
                            delay: 500,
                            onStart: () => manette.play("manette_vole"),
                            targets: manette,
                            x: 5337,
                            y: -950,
                            duration: 1000,
                            ease: 'Sine.inOut',
                            onComplete: () => reactiveBoucle(manette, aptitudes)
                        });
                    }
                }
            }
            else {
                if (manette.x != 4800) {
                    manette.scene.tweens.add({
                        targets: manette,
                        x: 4800,
                        y: -249,
                        onStart: () => manette.play("manette_vole"),
                        onComplete: () => {
                            reactiveBoucle(manette, aptitudes);
                        },
                        duration: 900,
                    });
                }
                else
                    reactiveBoucle(manette, aptitudes);
            }
        }
    }
}
exports.__auto = __auto;
function reactiveBoucle(manette, aptitudes) {
    if (manette.scene.room.boss[`${manette.sprite}`].vaincu)
        return;
    manette.scene.time.delayedCall(500, () => {
        if (manette.scene.room.boss[`${manette.sprite}`].vaincu)
            return;
        __auto(manette, {}, aptitudes);
    }, null, this);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuZXR0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvQXB0aXR1ZGVzL21hbmV0dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0ZBQXlEO0FBSXpELFNBQWdCLHFCQUFxQixDQUFDLFVBQW1CLEVBQUUsU0FBYztJQUN2RSxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLFVBQXdDLEVBQUUsTUFBVyxFQUFFLEVBQUU7UUFDbEcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0QsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUNuQyxDQUFDLENBQUE7SUFDRCxVQUFVLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQTtBQUN2QyxDQUFDO0FBUEQsc0RBT0M7QUFFRCxTQUFnQixRQUFRLENBQUMsT0FBZ0IsRUFBRSxLQUFVO0lBQ25ELElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7S0FDOUI7QUFDSCxDQUFDO0FBTEQsNEJBS0M7QUFFRCxTQUFnQixTQUFTLENBQUMsT0FBZ0IsRUFBRSxNQUFXO0lBRXJELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFBO1FBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7UUFD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