"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fusion__TAB = exports.dash__E = exports.kick__Z = exports.cross__A = exports.__StatsSupplementaire = void 0;
const AnimationJoueur_1 = require("../Animations/AnimationJoueur");
const fusion_1 = __importDefault(require("./_utilitaire/fusion"));
function __StatsSupplementaire(fakhear, _Aptitudes) {
    fakhear.degat = 10;
}
exports.__StatsSupplementaire = __StatsSupplementaire;
function cross__A(fakhear, input) {
    if (input.a) {
        input.a = false;
        fakhear.son = 'quick-punch';
        fakhear.setVelocityX(0);
        (0, AnimationJoueur_1.setAnimation)(fakhear, 'cross');
    }
}
exports.cross__A = cross__A;
function kick__Z(fakhear, input) {
    if (input.z) {
        fakhear.son = 'kick';
        fakhear.play('attack');
        fakhear.setVelocityX(0);
    }
    input.z = false;
}
exports.kick__Z = kick__Z;
function dash__E(fakhear) {
    fakhear.play('straightlead');
    fakhear.setVelocityX(0);
    if (!fakhear.animation_dash) {
        fakhear.son = 'punch_fast';
        fakhear.animation_dash = fakhear.scene.tweens.addCounter({
            duration: 300,
            onUpdate: () => (fakhear.setVelocity((fakhear.flipX ? -1700 : 1700), -70)),
            onComplete: () => (fakhear.setVelocityX(0), fakhear.play('idle_attack')),
            repeat: 0,
            yoyo: false,
        });
    }
    else if (!fakhear.animation_dash.isPlaying()) {
        fakhear.son = 'punch_fast';
        fakhear.animation_dash.restart();
    }
}
exports.dash__E = dash__E;
function fusion__TAB(personnage, input) {
    (0, fusion_1.default)(personnage, input);
}
exports.fusion__TAB = fusion__TAB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFraGVhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvQXB0aXR1ZGVzL2Zha2hlYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUVBQTREO0FBRTVELGtFQUEwQztBQUUxQyxTQUFnQixxQkFBcUIsQ0FBQyxPQUFnQixFQUFFLFVBQWU7SUFDckUsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7QUFDcEIsQ0FBQztBQUZELHNEQUVDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLE9BQXlDLEVBQUUsS0FBVTtJQUM1RSxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDWCxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtRQUNmLE9BQU8sQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFBO1FBQzNCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkIsSUFBQSw4QkFBWSxFQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUMvQjtBQUNILENBQUM7QUFQRCw0QkFPQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxPQUF5QyxFQUFFLEtBQVU7SUFDM0UsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUNYO1FBQ0EsT0FBTyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUE7UUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN0QixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZCO0lBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7QUFDakIsQ0FBQztBQVJELDBCQVFDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLE9BQXlDO0lBQy9ELE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRztRQUM1QixPQUFPLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQTtRQUMxQixPQUFPLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUN2RCxRQUFRLEVBQUUsR0FBRztZQUNiLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDeEUsTUFBTSxFQUFFLENBQUM7WUFDVCxJQUFJLEVBQUUsS0FBSztTQUNaLENBQUMsQ0FBQTtLQUNIO1NBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDOUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUE7UUFDMUIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtLQUNqQztBQUNILENBQUM7QUFqQkQsMEJBaUJDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLFVBQW1CLEVBQUUsS0FBVTtJQUN6RCxJQUFBLGdCQUFNLEVBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQzNCLENBQUM7QUFGRCxrQ0FFQyJ9