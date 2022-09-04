"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoImport = exports.Aptitudes = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const nomFichierCourant = path_1.default.basename(__filename);
/**
 * Stockage des touches qui active les aptitudes du personnage
 *
 * @example
 * Activer la fonction correspondant à la touche A du personnage fakhear:
 * ```
 * Aptitudes['fakhear'].A(Sprite, {a: true})
 * //active la fonction correspondant à la touche A des aptitudes de Fakhear
 * ```
 */
exports.Aptitudes = {};
// export const Commandes: any = {};
/**
 * Import tout les fichier du dossier `./src/server/game/scenes/Aptitudes`, excepté le fichier lui-même
 *
 * @remarks
 * le nom du fichier devient la clé pour l'objet `Aptitudes`<br>
 * le dossier `_utilitaire` contient les fonctions souvent utilisable pour tout les joueurs<br>
 * Toute les fonctions comportant deux underscord sont ajouté à l'objet `Aptitudes`
 * avec pour clé la valeur qu'il y a après l'undescord
 *
 * @example
 * Activer la fonction correspondant à la touche A du personnage fakhear:
 * ```
 * //Ici la valeur situé après les 2 undescord est "A"
 * export function cross__A(sprite, input) {
 *   if (input.a) setAnimation(fakhear, 'cross')
 * }
 * //Ce qui donnes au final un objet Aptidudes comme ci dessous:
 * Aptitudes['fakhear']['A'] = fn
 *
 * //Stoquage des commandes pour l'affichage coté client:
 * Aptitudes['fakhear']['commandes'] = { A: 'cross', Z: 'kick', E: 'dash', TAB: 'fusion' }
 * ```
 */
exports.autoImport = fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(autoImport => autoImport.isFile())
    .map(file => {
    Promise.resolve().then(() => __importStar(require('./' + file.name))).then((m) => {
        if (file.name != nomFichierCourant) {
            //le nom du fichier devient la clé pour l'objet (Aptitudes)
            const personnage = file.name.substring(0, file.name.lastIndexOf('.'));
            const Commandes = {};
            Object.values(m).forEach((fn, _i) => {
                //regarde si la fonction contient un undescore
                let index = fn.toString().split(' ')[1].indexOf("__");
                let NOMFONCTION = fn.toString().split(' ')[1].split('__')[0];
                if (NOMFONCTION != '') {
                    let CLE = fn.toString().split(' ')[1].substring(index + 2).split('(')[0];
                    Commandes[`${CLE}`] = NOMFONCTION;
                }
                if (index != -1) {
                    let CLE = fn.toString().split(' ')[1].substring(index + 2).split('(')[0];
                    if (exports.Aptitudes[personnage] === undefined)
                        exports.Aptitudes[personnage] = {};
                    //la CLE correspond au mot après l'underscord (example: Aptitudes['fakhear']['A'])
                    exports.Aptitudes[personnage][CLE] = fn;
                    //fn correspond à la fonction qui active l'aptitudes
                }
            });
            //Stoquages des commandes disponibles
            exports.Aptitudes[personnage]["commandes"] = Commandes;
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvQXB0aXR1ZGVzL2Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBeUI7QUFDekIsZ0RBQXVCO0FBQ3ZCLE1BQU0saUJBQWlCLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQXdCcEQ7Ozs7Ozs7OztHQVNHO0FBQ1UsUUFBQSxTQUFTLEdBQVksRUFBRSxDQUFDO0FBQ3JDLG9DQUFvQztBQUVuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNTLFFBQUEsVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzNFLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDVixrREFBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksaUJBQWlCLEVBQ2xDO1lBQ0UsMkRBQTJEO1lBQzNELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3JFLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUVyQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDbEMsOENBQThDO2dCQUM5QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDckQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdELElBQUksV0FBVyxJQUFJLEVBQUUsRUFDckI7b0JBQ0UsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDdEUsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUE7aUJBQ2xDO2dCQUVELElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUNmO29CQUNFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ3RFLElBQUksaUJBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTO3dCQUFFLGlCQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFBO29CQUNuRSxrRkFBa0Y7b0JBQ2xGLGlCQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO29CQUMvQixvREFBb0Q7aUJBQ3JEO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDRixxQ0FBcUM7WUFDckMsaUJBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLENBQUE7U0FDL0M7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=