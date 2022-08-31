"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fusion(personnage, input) {
    if (input.tab) {
        if (personnage.bossControllable.getLength() == 1) {
            fusionAvecBoss(personnage.bossControllable.getChildren()[0], personnage);
            personnage.son = 'fusion2';
        }
        else {
            const ennemieProche = closest(personnage, 'enemies');
            if (!ennemieProche)
                return;
            if (Phaser.Math.Distance.Between(ennemieProche.x, ennemieProche.y, personnage.x, personnage.y) < 270) {
                if (personnage.scene.room.boss[`${ennemieProche.sprite}`].vaincu) {
                    personnage.son = 'fusion';
                    recuperationObjetBoss(ennemieProche, personnage);
                    personnage.bossControllable.add(ennemieProche);
                }
            }
        }
        input.tab = false;
    }
}
exports.default = fusion;
/**
 * #### Description
 * L'ennemie se place au dessus du joueur en petit<br>
 * L'ennemie suit le joueur
 *
 * #### Version
 * since: V1.0.0
 *
 * Recuperations objet boss
 * @param ennemie
 * @param joueur
 */
function recuperationObjetBoss(ennemie, joueur) {
    ennemie.currentTarget = joueur;
    ennemie.suivre = true;
    ennemie.setScale(0.2);
}
/**
 * #### Description
 * Si la fusion avec le boss est possible, Change l'inerface coté client<br>
 * pour que l'interface (icon, commandes...) corresponde bien à celui que le joueur controlle
 *
 * Redimensionne correctement l'ennemie et son alpha
 * Le joueur prend le controlle de l'ennemie et suit l'ennemie en petit au dessus de lui
 *
 * Au bout d'un certain temps l'ennemie devient innacessible au joueur
 * Le joueur reprend sa taille initial
 * L'ennemie et détruit du groupe et de colyseus
 *
 * #### Version
 * since: V1.0.0
 *
 * Fusions avec boss
 * @param ennemie
 * @param joueur
 * @returns
 */
function fusionAvecBoss(ennemie, joueur) {
    if (joueur.scene.room.boss[`${ennemie.sprite}`].inaccessible)
        return;
    joueur.scene.time.delayedCall(1, () => {
        joueur.changeInterfaceClient(ennemie.sprite, true);
    }, null, joueur);
    ennemie.animationBossFigurine.remove();
    ennemie.setAlpha(1);
    ennemie.body.setAllowGravity(true);
    ennemie.cible_courante = "enemies";
    ennemie.currentTarget = ennemie;
    ennemie.suivre = false;
    ennemie.setScale(1);
    joueur.currentTarget = ennemie;
    joueur.suivre = true;
    joueur.setScale(0.2);
    joueur.scene.time.delayedCall(5000, () => {
        joueur.scene.room.boss[`${ennemie.sprite}`].inaccessible = true;
        joueur.son = "ejection";
        joueur.suivre = false;
        joueur.scene.suppressionJoueur(ennemie, true, ennemie.ClientID);
        joueur.currentTarget = joueur;
        joueur.changeInterfaceClient(joueur.sprite, true);
        joueur.setScale(1);
    }, null, joueur);
}
function closest(personnage, type) {
    let groueCible = personnage.scene[type].getChildren();
    return personnage.scene.physics.closest(personnage, groueCible);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL3NjZW5lcy9BcHRpdHVkZXMvX3V0aWxpdGFpcmUvZnVzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsU0FBd0IsTUFBTSxDQUFDLFVBQWUsRUFBRSxLQUFVO0lBQ3hELElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUNiLElBQUksVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFDaEQ7WUFDRSxjQUFjLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO1lBQ3hFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFBO1NBQzNCO2FBRUQ7WUFDRSxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBWSxDQUFDO1lBQ2hFLElBQUksQ0FBQyxhQUFhO2dCQUFFLE9BQU87WUFDM0IsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFDcEc7Z0JBQ0UsSUFBSyxVQUFVLENBQUMsS0FBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQ3pFO29CQUNFLFVBQVUsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFBO29CQUN6QixxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUE7b0JBQ2hELFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7aUJBQy9DO2FBQ0Y7U0FDRjtRQUNE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