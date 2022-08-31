"use strict";
//@ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomState = exports.Compteur = exports.Rectangle = exports.Ligne = exports.Player = exports.Commandes = exports.Projectile = void 0;
/**
 * Schema Colyseus
 */
const schema_1 = require("@colyseus/schema");
class Projectile extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("number")
], Projectile.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], Projectile.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)("number")
], Projectile.prototype, "alpha", void 0);
__decorate([
    (0, schema_1.type)("string")
], Projectile.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)("string")
], Projectile.prototype, "anim", void 0);
__decorate([
    (0, schema_1.type)("number")
], Projectile.prototype, "scale", void 0);
__decorate([
    (0, schema_1.type)("number")
], Projectile.prototype, "scaleX", void 0);
__decorate([
    (0, schema_1.type)("number")
], Projectile.prototype, "scaleY", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Projectile.prototype, "active", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Projectile.prototype, "flipX", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Projectile.prototype, "laser", void 0);
__decorate([
    (0, schema_1.type)("number")
], Projectile.prototype, "depth", void 0);
__decorate([
    (0, schema_1.type)("number")
], Projectile.prototype, "angle", void 0);
__decorate([
    (0, schema_1.type)("string")
], Projectile.prototype, "sprite", void 0);
__decorate([
    (0, schema_1.type)("string")
], Projectile.prototype, "_frame", void 0);
exports.Projectile = Projectile;
class Commandes extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("string")
], Commandes.prototype, "A", void 0);
__decorate([
    (0, schema_1.type)("string")
], Commandes.prototype, "Z", void 0);
__decorate([
    (0, schema_1.type)("string")
], Commandes.prototype, "E", void 0);
__decorate([
    (0, schema_1.type)("string")
], Commandes.prototype, "R", void 0);
__decorate([
    (0, schema_1.type)("string")
], Commandes.prototype, "TAB", void 0);
exports.Commandes = Commandes;
class Player extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "sprite", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "anim", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Player.prototype, "flipX", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], Player.prototype, "particules", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "vie", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "tint", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "scale", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "alpha", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "xa", void 0);
__decorate([
    (0, schema_1.type)("number")
], Player.prototype, "ya", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "sprite_fusion", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "sprite_cible", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "pieceCourante", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "son", void 0);
__decorate([
    (0, schema_1.type)(Commandes)
], Player.prototype, "commandes", void 0);
exports.Player = Player;
class Ligne extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "x1", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "y1", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "x2", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "y2", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "strokeColor", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "strokeAlpha", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "couleur", void 0);
__decorate([
    (0, schema_1.type)("number")
], Ligne.prototype, "lineHeight", void 0);
exports.Ligne = Ligne;
class Rectangle extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("number")
], Rectangle.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], Rectangle.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)("number")
], Rectangle.prototype, "fillColor", void 0);
__decorate([
    (0, schema_1.type)("number")
], Rectangle.prototype, "fillAlpha", void 0);
__decorate([
    (0, schema_1.type)("number")
], Rectangle.prototype, "width", void 0);
__decorate([
    (0, schema_1.type)("number")
], Rectangle.prototype, "height", void 0);
__decorate([
    (0, schema_1.type)("number")
], Rectangle.prototype, "angle", void 0);
__decorate([
    (0, schema_1.type)("number")
], Rectangle.prototype, "scale", void 0);
exports.Rectangle = Rectangle;
class Compteur extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("number")
], Compteur.prototype, "temps", void 0);
exports.Compteur = Compteur;
class RoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        //@ts-ignore
        this.presences = new schema_1.MapSchema();
        this.projectiles = new schema_1.MapSchema();
        this.lignes = new schema_1.MapSchema();
        this.rectangles = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)({ map: Player })
], RoomState.prototype, "presences", void 0);
__decorate([
    (0, schema_1.type)({ map: Projectile })
], RoomState.prototype, "projectiles", void 0);
__decorate([
    (0, schema_1.type)({ map: Ligne })
], RoomState.prototype, "lignes", void 0);
__decorate([
    (0, schema_1.type)({ map: Rectangle })
], RoomState.prototype, "rectangles", void 0);
__decorate([
    (0, schema_1.type)("number")
], RoomState.prototype, "compteur", void 0);
exports.RoomState = RoomState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vbVN0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL1Jvb21TdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsYUFBYTs7Ozs7Ozs7O0FBRWI7O0dBRUc7QUFDSCw2Q0FJeUI7QUFFekIsTUFBYSxVQUFXLFNBQVEsZUFBTTtDQWdCckM7QUFmaUI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7cUNBQVc7QUFDVjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztxQ0FBVztBQUNWO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO3lDQUFnQjtBQUNmO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO3NDQUFhO0FBQ1o7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7d0NBQWM7QUFDYjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzt5Q0FBZ0I7QUFDZjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzswQ0FBaUI7QUFDaEI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7MENBQWlCO0FBQ2Y7SUFBaEIsSUFBQSxhQUFJLEVBQUMsU0FBUyxDQUFDOzBDQUFrQjtBQUNqQjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7eUNBQWlCO0FBQ2hCO0lBQWhCLElBQUEsYUFBSSxFQUFDLFNBQVMsQ0FBQzt5Q0FBaUI7QUFDakI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7eUNBQWdCO0FBQ2Y7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7eUNBQWdCO0FBQ2Y7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7MENBQWlCO0FBQ2hCO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDOzBDQUFpQjtBQWZsQyxnQ0FnQkM7QUFFRCxNQUFhLFNBQVUsU0FBUSxlQUFNO0NBZXBDO0FBYkc7SUFEQyxJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7b0NBQ0w7QUFHVjtJQURDLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztvQ0FDSjtBQUdYO0lBREMsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO29DQUNKO0FBR1g7SUFEQyxJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7b0NBQ0o7QUFHWDtJQURDLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztzQ0FDRjtBQWRqQiw4QkFlQztBQUVELE1BQWEsTUFBTyxTQUFRLGVBQU07Q0FtQmpDO0FBbEJpQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztpQ0FBVztBQUNWO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO2lDQUFXO0FBQ1Y7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7a0NBQWE7QUFDWjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztzQ0FBZ0I7QUFDZjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztvQ0FBYztBQUNaO0lBQWhCLElBQUEsYUFBSSxFQUFDLFNBQVMsQ0FBQztxQ0FBZ0I7QUFDZjtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7MENBQXNCO0FBQ3RCO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO21DQUFhO0FBQ1o7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7b0NBQWM7QUFDYjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztxQ0FBZ0I7QUFDZjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztxQ0FBZ0I7QUFDZjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztrQ0FBWTtBQUNYO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO2tDQUFZO0FBQ1g7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7NkNBQXVCO0FBQ3RCO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDOzRDQUFzQjtBQUNyQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs2Q0FBdUI7QUFDdEI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7bUNBQWE7QUFDWDtJQUFoQixJQUFBLGFBQUksRUFBQyxTQUFTLENBQUM7eUNBQXVCO0FBbEJ6Qyx3QkFtQkM7QUFHRCxNQUFhLEtBQU0sU0FBUSxlQUFNO0NBV2hDO0FBVmlCO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO2dDQUFXO0FBQ1Y7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7Z0NBQVc7QUFDVjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztpQ0FBWTtBQUNYO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO2lDQUFZO0FBQ1g7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7aUNBQWE7QUFDWjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztpQ0FBYztBQUNiO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDOzBDQUFxQjtBQUNwQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzswQ0FBcUI7QUFDcEI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7c0NBQWlCO0FBQ2hCO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO3lDQUFvQjtBQVZyQyxzQkFXQztBQUVELE1BQWEsU0FBVSxTQUFRLGVBQU07Q0FTcEM7QUFSaUI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7b0NBQVc7QUFDVjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQztvQ0FBVztBQUNWO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDOzRDQUFvQjtBQUNuQjtJQUFmLElBQUEsYUFBSSxFQUFDLFFBQVEsQ0FBQzs0Q0FBb0I7QUFDbkI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7d0NBQWdCO0FBQ2Y7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7eUNBQWlCO0FBQ2hCO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO3dDQUFnQjtBQUNmO0lBQWYsSUFBQSxhQUFJLEVBQUMsUUFBUSxDQUFDO3dDQUFnQjtBQVJqQyw4QkFTQztBQUVELE1BQWEsUUFBUyxTQUFRLGVBQU07Q0FFbkM7QUFEaUI7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7dUNBQWU7QUFEaEMsNEJBRUM7QUFHRCxNQUFhLFNBQVUsU0FBUSxlQUFNO0lBQXJDOztRQUNFLFlBQVk7UUFDVyxjQUFTLEdBQUcsSUFBSSxrQkFBUyxFQUFVLENBQUE7UUFDL0IsZ0JBQVcsR0FBRyxJQUFJLGtCQUFTLEVBQWMsQ0FBQTtRQUM5QyxXQUFNLEdBQUcsSUFBSSxrQkFBUyxFQUFTLENBQUE7UUFDM0IsZUFBVSxHQUFHLElBQUksa0JBQVMsRUFBYSxDQUFBO0lBRW5FLENBQUM7Q0FBQTtBQUx3QjtJQUF0QixJQUFBLGFBQUksRUFBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQzs0Q0FBb0M7QUFDL0I7SUFBMUIsSUFBQSxhQUFJLEVBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUM7OENBQTBDO0FBQzlDO0lBQXJCLElBQUEsYUFBSSxFQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDO3lDQUFnQztBQUMzQjtJQUF6QixJQUFBLGFBQUksRUFBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQzs2Q0FBd0M7QUFDakQ7SUFBZixJQUFBLGFBQUksRUFBQyxRQUFRLENBQUM7MkNBQWtCO0FBTm5DLDhCQU9DIn0=