"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fusion__TAB = exports.clonage__E = exports.kunai__Z = exports.shuriken__A = exports.__StatsSupplementaire = void 0;
const AnimationJoueur_1 = require("../Animations/AnimationJoueur");
const BouleClass_1 = __importDefault(require("../class/elements/BouleClass"));
const KunaiClass_1 = __importDefault(require("../class/elements/KunaiClass"));
const CloneClass_1 = __importDefault(require("../class/elements/CloneClass"));
const fusion_1 = __importDefault(require("./_utilitaire/fusion"));
function __StatsSupplementaire(huzounet, _Aptitudes) {
    huzounet.boulesEnMain = huzounet.scene.physics.add.group({
        runChildUpdate: true,
        maxSize: 4
    });
    huzounet.degat = 0.7;
}
exports.__StatsSupplementaire = __StatsSupplementaire;
/**
 * shuriken - Logique de charge et d'envoie de la boule
 *
 * @param  {Object} huzounet: TJoueur Type
 * @param  {Object} input?: any       touche appuié
 */
function shuriken__A(huzounet, input) {
    if (input.a) {
        //creation de la boule si non créer + animation début
        if (!huzounet.boulesEnMain.getLength()) {
            huzounet.puissanceChargeBoule = 0;
            const boule = huzounet.scene.add.existing(new BouleClass_1.default(huzounet.scene, huzounet.flipX ? huzounet.x + 80 : huzounet.x - 80, huzounet.y - 160, "huzounet", `${(Math.random() + 1).toString(36).substring(7)}`).setData({ ClientId: huzounet.ClientID, puissance: 2 }));
            huzounet.boulesEnMain.add(boule);
            boule.body.setAllowGravity(false);
            (0, AnimationJoueur_1.setAnimation)(huzounet, 'huzounet_preparation_attaque');
            //grossisement de la boule
        }
        else {
            huzounet.boulesEnMain.getChildren()[0].scale += 0.02;
            huzounet.boulesEnMain.getChildren()[0].alpha += 0.01;
            huzounet.puissanceChargeBoule += 0.03;
        }
    }
    //envoie de la boule + animation envoie
    if (input.a_fin) {
        if (huzounet.boulesEnMain && huzounet.boulesEnMain.getLength()) {
            huzounet.son = 'boule';
            const boule = huzounet.boulesEnMain.getChildren()[0];
            boule.proprietaire = huzounet.ClientID;
            huzounet.scene.groupeBoulesHuzounet.add(boule.setData('degat', huzounet.puissanceChargeBoule));
            huzounet.scene.groupeBoulesHuzounet.getMatching('proprietaire', huzounet.ClientID)[0].body.setVelocityX(huzounet.flipX ? -2600 : 2600);
            huzounet.scene.groupeBoulesHuzounet.getMatching('proprietaire', huzounet.ClientID)[0].proprietaire = '';
            huzounet.boulesEnMain.clear();
            // input.a_fin = false
            (0, AnimationJoueur_1.setAnimation)(huzounet, 'huzounet_envoie_attaque');
        }
    }
}
exports.shuriken__A = shuriken__A;
function kunai__Z(huzounet) {
    (0, AnimationJoueur_1.setAnimation)(huzounet, 'huzounet_kunai_attaque');
    if (!huzounet.kunai) {
        huzounet.son = 'kunai';
        const kunai = huzounet.scene.add.existing(new KunaiClass_1.default(huzounet.scene, huzounet.flipX ? huzounet.x - 80 : huzounet.x + 80, huzounet.y - 60, "huzounet", `${(Math.random() + 1).toString(36).substring(7)}`)
            .setData({ ClientId: huzounet.ClientID, degat: huzounet.degat }))
            .setFlipX(huzounet.flipX);
        huzounet.scene.physics.add.existing(kunai);
        huzounet.scene.physics.add.overlap(kunai, huzounet.scene.enemies, function (_kunai, _ennemie) {
            _ennemie.dommage(_kunai.getData('degat'));
            _kunai.setData('degat', 0);
        }, undefined, huzounet);
        kunai.body.setAllowGravity(false);
        huzounet.kunai = kunai;
        huzounet.scene.time.delayedCall(100, () => {
            huzounet.kunai.setVelocityX(huzounet.flipX ? -2300 : 2300).setFlipX(huzounet.flipX);
            huzounet.kunai = undefined;
        }, null, huzounet);
    }
}
exports.kunai__Z = kunai__Z;
function clonage__E(huzounet) {
    if (!huzounet.clone) {
        huzounet.clone = true;
        const clone1 = huzounet.scene.add.existing(new CloneClass_1.default(huzounet.scene, huzounet.x + 100, huzounet.y - 5, "atlas", `${(Math.random() + 1).toString(36).substring(7)}`, huzounet).setData({ ClientId: huzounet.ClientID, degat: huzounet.degat / 2 })).setFlipX(huzounet.flipX);
        const clone2 = huzounet.scene.add.existing(new CloneClass_1.default(huzounet.scene, huzounet.x + 200, huzounet.y - 5, "atlas", `${(Math.random() + 1).toString(36).substring(7)}`, huzounet).setData({ ClientId: huzounet.ClientID, degat: huzounet.degat / 2 })).setFlipX(huzounet.flipX);
        const clone3 = huzounet.scene.add.existing(new CloneClass_1.default(huzounet.scene, huzounet.x - 200, huzounet.y - 5, "atlas", `${(Math.random() + 1).toString(36).substring(7)}`, huzounet).setData({ ClientId: huzounet.ClientID, degat: huzounet.degat / 2 })).setFlipX(huzounet.flipX);
        const clone4 = huzounet.scene.add.existing(new CloneClass_1.default(huzounet.scene, huzounet.x - 100, huzounet.y - 5, "atlas", `${(Math.random() + 1).toString(36).substring(7)}`, huzounet).setData({ ClientId: huzounet.ClientID, degat: huzounet.degat / 2 })).setFlipX(huzounet.flipX);
        huzounet.scene.physics.add.existing(clone1);
        huzounet.scene.physics.add.existing(clone2);
        huzounet.scene.physics.add.existing(clone3);
        huzounet.scene.physics.add.existing(clone4);
    }
}
exports.clonage__E = clonage__E;
function fusion__TAB(personnage, input) {
    (0, fusion_1.default)(personnage, input);
}
exports.fusion__TAB = fusion__TAB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHV6b3VuZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvc2NlbmVzL0FwdGl0dWRlcy9odXpvdW5ldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtRUFBNEQ7QUFDNUQsOEVBQXFEO0FBQ3JELDhFQUFxRDtBQUNyRCw4RUFBcUQ7QUFDckQsa0VBQTBDO0FBSTFDLFNBQWdCLHFCQUFxQixDQUFDLFFBQWlCLEVBQUUsVUFBZ0I7SUFDdkUsUUFBUSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3ZELGNBQWMsRUFBRSxJQUFJO1FBQ3BCLE9BQU8sRUFBRSxDQUFDO0tBQ1gsQ0FBQyxDQUFBO0lBQ0YsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUE7QUFDdEIsQ0FBQztBQU5ELHNEQU1DO0FBR0Q7Ozs7O0dBS0c7QUFDSCxTQUFnQixXQUFXLENBQUMsUUFBaUIsRUFBRSxLQUFXO0lBRXhELElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtRQUVYLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFDdEM7WUFDRSxRQUFRLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFBO1lBQ2pDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9CQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsVUFBVSxFQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdB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