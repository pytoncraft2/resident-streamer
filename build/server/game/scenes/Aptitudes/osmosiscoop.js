"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fusion__TAB = exports.blesse__Z = exports.soin__A = exports.__StatsSupplementaire = void 0;
const fusion_1 = __importDefault(require("./_utilitaire/fusion"));
function __StatsSupplementaire(personnage) { }
exports.__StatsSupplementaire = __StatsSupplementaire;
function soin__A(osmo, input) {
    if (input.a) {
        osmo.soigne = true;
        osmo.play('osmo_soin', true);
        osmo.son = 'soin';
        input.a = false;
    }
    if (input.a_fin) {
        osmo.soigne = false;
    }
}
exports.soin__A = soin__A;
function blesse__Z(osmo, input) {
    if (input.z) {
        osmo.son = 'attaque';
        osmo.play('osmo_attaque', true);
        input.z = false;
    }
}
exports.blesse__Z = blesse__Z;
function fusion__TAB(personnage, input) {
    (0, fusion_1.default)(personnage, input);
}
exports.fusion__TAB = fusion__TAB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Ntb3Npc2Nvb3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvc2NlbmVzL0FwdGl0dWRlcy9vc21vc2lzY29vcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxrRUFBMEM7QUFFMUMsU0FBZ0IscUJBQXFCLENBQUMsVUFBbUIsSUFBRyxDQUFDO0FBQTdELHNEQUE2RDtBQUU3RCxTQUFnQixPQUFPLENBQUMsSUFBYSxFQUFFLEtBQVU7SUFDL0MsSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUNYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUE7UUFDakIsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7S0FDaEI7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQ2Y7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUNyQjtBQUNILENBQUM7QUFiRCwwQkFhQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxJQUFhLEVBQUUsS0FBVTtJQUNqRCxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDWCxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMvQixLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUNqQjtBQUNILENBQUM7QUFORCw4QkFNQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxVQUFtQixFQUFFLEtBQVU7SUFDekQsSUFBQSxnQkFBTSxFQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUMzQixDQUFDO0FBRkQsa0NBRUMifQ==