"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fusion__TAB = exports.bombe__Z = exports.couteau__A = exports.__StatsSupplementaire = void 0;
const BombeClass_1 = __importDefault(require("../class/elements/BombeClass"));
const fusion_1 = __importDefault(require("./_utilitaire/fusion"));
function __StatsSupplementaire() { }
exports.__StatsSupplementaire = __StatsSupplementaire;
function couteau__A(akhizonah, input) {
    if (input.a) {
        input.a = false;
        akhizonah.son = 'couteau';
        akhizonah.play('akhizonah_couteau');
    }
}
exports.couteau__A = couteau__A;
function bombe__Z(akhizonah) {
    if (!akhizonah.bombe) {
        const bombe = akhizonah.scene.add.existing(new BombeClass_1.default(akhizonah.scene, akhizonah.flipX ? akhizonah.x - 80 : akhizonah.x + 80, akhizonah.y - 60, "akhizonah", `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: akhizonah.ClientID, degat: 0.3 }));
        akhizonah.scene.physics.add.existing(bombe);
        akhizonah.bombe = bombe;
        bombe.scene.time.delayedCall(1470, () => {
            akhizonah.son = 'explosion';
        }, null, akhizonah);
        bombe.scene.time.delayedCall(100, () => {
            bombe.play('akhizonah_bombe');
            akhizonah.bombe = undefined;
        }, null, bombe);
    }
}
exports.bombe__Z = bombe__Z;
function fusion__TAB(personnage, input) {
    (0, fusion_1.default)(personnage, input);
}
exports.fusion__TAB = fusion__TAB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWtoaXpvbmFoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL3NjZW5lcy9BcHRpdHVkZXMvYWtoaXpvbmFoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDhFQUFzRDtBQUN0RCxrRUFBMEM7QUFFMUMsU0FBZ0IscUJBQXFCLEtBQUksQ0FBQztBQUExQyxzREFBMEM7QUFFMUMsU0FBZ0IsVUFBVSxDQUFDLFNBQWtCLEVBQUUsS0FBVztJQUN4RCxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDWCxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtRQUNmLFNBQVMsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFBO1FBQ3pCLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtLQUNwQztBQUNILENBQUM7QUFORCxnQ0FNQztBQUdELFNBQWdCLFFBQVEsQ0FBQyxTQUFrQjtJQUV6QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtRQUNwQixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxvQkFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM1EsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxTQUFTLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUN2QixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUN0QyxTQUFTLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQTtRQUM3QixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXBCLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO1lBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM5QixTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQTtRQUM3QixDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2pCO0FBRUgsQ0FBQztBQWhCRCw0QkFnQkM7QUFFRCxTQUFnQixXQUFXLENBQUMsVUFBbUIsRUFBRSxLQUFVO0lBQ3pELElBQUEsZ0JBQU0sRUFBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDM0IsQ0FBQztBQUZELGtDQUVDIn0=