"use strict";
//@ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyState = exports.Proprietaire = exports.ListeJoueurIndex = exports.Joueur = void 0;
/**
 * Schema Colyseus
 */
const schema_1 = require("@colyseus/schema");
class Joueur extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("boolean")
], Joueur.prototype, "pret", void 0);
__decorate([
    (0, schema_1.type)("number")
], Joueur.prototype, "indexConfirmation", void 0);
__decorate([
    (0, schema_1.type)("number")
], Joueur.prototype, "ancienIndexConfirmation", void 0);
exports.Joueur = Joueur;
class ListeJoueurIndex extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("string")
], ListeJoueurIndex.prototype, "liste", void 0);
exports.ListeJoueurIndex = ListeJoueurIndex;
class Proprietaire extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("string")
], Proprietaire.prototype, "proprietaire", void 0);
exports.Proprietaire = Proprietaire;
class LobbyState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        //@ts-ignore
        this.joueurs = new schema_1.MapSchema();
        this.listeJoueurIndex = new schema_1.ArraySchema();
        this.proprietaire = new schema_1.ArraySchema();
    }
}
__decorate([
    (0, schema_1.type)({ map: Joueur })
], LobbyState.prototype, "joueurs", void 0);
__decorate([
    (0, schema_1.type)(["string"])
], LobbyState.prototype, "listeJoueurIndex", void 0);
__decorate([
    (0, schema_1.type)(["string"])
], LobbyState.prototype, "proprietaire", void 0);
exports.LobbyState = LobbyState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnlTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9Mb2JieVN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxhQUFhOzs7Ozs7Ozs7QUFFYjs7R0FFRztBQUNILDZDQUt5QjtBQUV6QixNQUFhLE1BQU8sU0FBUSxlQUFNO0NBSWpDO0FBSGtCO0lBQWhCLElBQUEsYUFBSSxFQUFDLFNBQVMsQ0FBQztvQ0FBYztBQUNkO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO2lEQUEwQjtBQUN6QjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzt1REFBZ0M7QUFIakQsd0JBSUM7QUFFRCxNQUFhLGdCQUFpQixTQUFRLGVBQU07Q0FFM0M7QUFEaUI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7K0NBQWM7QUFEL0IsNENBRUM7QUFFRCxNQUFhLFlBQWEsU0FBUSxlQUFNO0NBRXZDO0FBRGlCO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO2tEQUFxQjtBQUR0QyxvQ0FFQztBQUVELE1BQWEsVUFBVyxTQUFRLGVBQU07SUFBdEM7O1FBQ0UsWUFBWTtRQUNXLFlBQU8sR0FBRyxJQUFJLGtCQUFTLEVBQVUsQ0FBQTtRQUNwQyxxQkFBZ0IsR0FBRyxJQUFJLG9CQUFXLEVBQVUsQ0FBQTtRQUM1QyxpQkFBWSxHQUFHLElBQUksb0JBQVcsRUFBVSxDQUFBO0lBQzlELENBQUM7Q0FBQTtBQUh3QjtJQUF0QixJQUFBLGFBQUksRUFBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQzsyQ0FBa0M7QUFDcEM7SUFBbkIsSUFBQSxhQUFJLEVBQUMsQ0FBRSxRQUFRLENBQUUsQ0FBQztvREFBNkM7QUFDNUM7SUFBbkIsSUFBQSxhQUFJLEVBQUMsQ0FBRSxRQUFRLENBQUUsQ0FBQztnREFBeUM7QUFKOUQsZ0NBS0MifQ==