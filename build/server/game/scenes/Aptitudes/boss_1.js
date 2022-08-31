"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__auto = exports.suivre__Z = exports.pique__A = exports.__StatsSupplementaire = void 0;
function __StatsSupplementaire(boss_1, Aptitudes) {
    Aptitudes[boss_1.sprite].toucheDroite = function (_boss_1) {
        boss_1.setVelocityX(400);
    };
    Aptitudes[boss_1.sprite].toucheGauche = function (_boss_1) {
        boss_1.setVelocityX(-400);
    };
    var compteurAttaque = 0;
    boss_1.auto_colision = boss_1.scene.physics.add.collider(boss_1.scene.players, boss_1, function (_ennemie, _joueur) {
        if (_ennemie.body.touching.right) {
            compteurAttaque += 1;
            if (compteurAttaque > 3) {
                _ennemie.play("attaque");
                compteurAttaque = 0;
            }
            if (_ennemie.flipX) {
                _ennemie.setFlipX(false);
                _ennemie.play("attaque");
            }
        }
        else if (boss_1.body.touching.left) {
            compteurAttaque += 1;
            if (compteurAttaque > 3) {
                _ennemie.play("attaque");
                compteurAttaque = 0;
            }
            if (!_ennemie.flipX) {
                _ennemie.setFlipX(true);
                _ennemie.play("attaque");
            }
        }
    }, null, this);
}
exports.__StatsSupplementaire = __StatsSupplementaire;
function pique__A(boss_1, input) {
    if (input.a) {
        boss_1.son = 'boss_attaque';
        input.a = false;
        boss_1.play('attaque');
    }
}
exports.pique__A = pique__A;
function suivre__Z(boss_1) {
    if (boss_1.scene.players.getLength() > 1) {
        boss_1.scene.physics.moveToObject(boss_1, boss_1.scene.physics.closest(boss_1, [...boss_1.scene.players.getChildren()]), 600);
    }
}
exports.suivre__Z = suivre__Z;
function __auto(boss_1, input, aptitudes) {
    if (boss_1.scene.room.boss[`${boss_1.sprite}`].vaincu)
        return boss_1.scene.physics.world.removeCollider(boss_1.auto_colision);
    if (boss_1 && boss_1.body) {
        if (boss_1.scene.players.getLength() > 0 && boss_1) {
            let joueuProche = boss_1.scene.physics.closest(boss_1, [...boss_1.scene.players.getChildren()]);
            if (joueuProche) {
                if (joueuProche.x < 5627 && joueuProche.x > 3802 && joueuProche.y > -249) {
                    boss_1.scene.physics.moveToObject(boss_1, joueuProche, 800);
                    boss_1.play('deplacement');
                }
                else {
                    if (boss_1.x != 5010) {
                        boss_1.scene.tweens.add({
                            targets: boss_1,
                            x: 5010,
                            y: 755,
                            duration: 500,
                        });
                    }
                }
            }
        }
        reactiveBoucle(boss_1, aptitudes);
    }
    else
        reactiveBoucle(boss_1, aptitudes);
}
exports.__auto = __auto;
function reactiveBoucle(boss_1, aptitudes) {
    if (boss_1.scene && boss_1.scene.time) {
        boss_1.scene.time.delayedCall(500, () => {
            __auto(boss_1, {}, aptitudes);
        }, null, this);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9zc18xLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL3NjZW5lcy9BcHRpdHVkZXMvYm9zc18xLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLFNBQWdCLHFCQUFxQixDQUFDLE1BQVcsRUFBRSxTQUFjO0lBQy9ELFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsT0FBWTtRQUM1RCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzFCLENBQUMsQ0FBQTtJQUNELFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsT0FBWTtRQUM1RCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDM0IsQ0FBQyxDQUFBO0lBRUQsSUFBSSxlQUFlLEdBQVcsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQ25GLFVBQVUsUUFBYSxFQUFFLE9BQVk7UUFDbkMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ2hDO1lBQ0UsZUFBZSxJQUFJLENBQUMsQ0FBQztZQUNyQixJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3hCLGVBQWUsR0FBRyxDQUFDLENBQUM7YUFDckI7WUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7YUFDekI7U0FDRjth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