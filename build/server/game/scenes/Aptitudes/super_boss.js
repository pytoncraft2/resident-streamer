"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__StatsSupplementaire = void 0;
const TroneClass_1 = __importDefault(require("../class/elements/TroneClass"));
function __StatsSupplementaire(personnage, Aptitudes) {
    personnage.setActive(false);
    personnage.trones = personnage.scene.physics.add.group({
        runChildUpdate: true,
        collideWorldBounds: false,
        allowGravity: false,
        setXY: {
            x: 3000,
            y: -880,
            stepY: 1000
        }
    });
    const trone1 = creerTrone(personnage, 'tronetest', -100);
    const trone2 = creerTrone(personnage, 'tronetest2', -230);
    const trone3 = creerTrone(personnage, 'tronetest3', -360);
    const trone4 = creerTrone(personnage, 'tronetest4', -490);
    const trone5 = creerTrone(personnage, 'tronetest5', -620);
    const trone6 = creerTrone(personnage, 'tronetest6', -750);
    const trone = creerTrone(personnage, 'tronehautv2', -880);
    personnage.trones.addMultiple([trone1, trone2, trone3, trone4, trone5, trone6, trone]);
    personnage.scene.physics.add.overlap(personnage.trones, personnage.scene.players, function (_trone, _joueur) {
        if (_joueur.blesse_opposant) {
            const cible = personnage.trones.getFirstAlive();
            if (personnage.trones.getLength() == 2) {
                // const dernier: any = personnage.trones.getChildren()[1];
                // personnage.setActive(true);
                // personnage.play('super_boss_vole')
                // personnage.setY(-750)
                // personnage.body.setAllowGravity(false);
                // personnage.scene.time.delayedCall(2000, () => {
                //   personnage.play('super_boss_contreattaque');
                // }, null, this);
                // personnage.trones.remove(dernier, true);
                // (personnage.scene as any).suppressionProjectileDelai(dernier, dernier._frame, 100);
                // (personnage.scene as any).suppressionProjectileDelai(cible, cible._frame, 100);
            }
            else {
                // personnage.trones.remove(personnage.trones.getFirstAlive(), true);
                // personnage.trones.setVelocityY(340)
                // personnage.scene.time.delayedCall(350, () => {
                //   personnage.trones.setVelocityY(0);
                //   (personnage.scene as any).suppressionProjectileDelai(cible, cible._frame, 100)
                // }, null, this);
            }
            _joueur.blesse_opposant = false;
        }
    }, undefined, personnage.scene);
    personnage.cible_courante = "players";
}
exports.__StatsSupplementaire = __StatsSupplementaire;
function creerTrone(personnage, etageTrone, positionY) {
    const trone = personnage.scene.add.existing(new TroneClass_1.default(personnage.scene, personnage.flipX ? personnage.x - 180 : personnage.x + 180, -900, "personnage", `${etageTrone}`, etageTrone, positionY).setData({ ClientId: personnage.ClientID, degat: 0.9 }));
    trone.setPushable(false);
    trone.setSize(1000, 100);
    trone.setActive(false);
    return personnage.scene.physics.add.existing(trone);
}
function transformation() {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJfYm9zcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvQXB0aXR1ZGVzL3N1cGVyX2Jvc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsOEVBQWlEO0FBQ2pELFNBQWdCLHFCQUFxQixDQUFDLFVBQW1CLEVBQUUsU0FBYztJQUN2RSxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRTNCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNyRCxjQUFjLEVBQUUsSUFBSTtRQUNwQixrQkFBa0IsRUFBRSxLQUFLO1FBQ3pCLFlBQVksRUFBRSxLQUFLO1FBQ25CLEtBQUssRUFDTDtZQUNFLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLENBQUMsR0FBRztZQUNQLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxRCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FB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