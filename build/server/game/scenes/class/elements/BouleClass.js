"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomState_1 = require("../../../RoomState");
class BouleClass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, ClientID) {
        super(scene, x, y, sprite);
        this.vel = 400;
        this.proprietaire = '';
        this.sprite = 'huzounet';
        this._frame = 'shuriken0';
        this.vitesse = 0;
        this.puissance = 0;
        this.init(scene, ClientID, sprite);
    }
    init(scene, id, sprite) {
        this.scene = scene;
        scene.physics.add.existing(this);
        this.id = id;
        this.scale = 0.2;
        this.alpha = 0.3;
        this.sprite = sprite;
        this.scene.suppressionProjectileDelai(this, id, 2000, true);
        this.setBounce(1, 1);
        this.setCollideWorldBounds(true);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.traqueJoueur) {
            this.x = this.traqueJoueur.x;
            this.y = this.traqueJoueur.y;
        }
        this.scene.room.state.projectiles.set(this.id, new RoomState_1.Projectile({
            x: this.x,
            y: this.y,
            scale: this.scale,
            alpha: this.alpha,
            id: this.id,
            sprite: this.sprite,
            _frame: this._frame
        }));
    }
    traquer(joueur, desactivation = false) {
        if (desactivation)
            this.traqueJoueur = null;
        else
            this.traqueJoueur = joueur;
    }
}
exports.default = BouleClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm91bGVDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvY2xhc3MvZWxlbWVudHMvQm91bGVDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUErQztBQUcvQyxNQUFxQixVQUFXLFNBQVEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTtJQVlsRSxZQUNFLEtBQW1CLEVBQ25CLENBQVMsRUFDVCxDQUFTLEVBQ1QsTUFBYyxFQUNkLFFBQWdCO1FBRWhCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQWpCNUIsUUFBRyxHQUFXLEdBQUcsQ0FBQTtRQUNqQixpQkFBWSxHQUFXLEVBQUUsQ0FBQTtRQUd6QixXQUFNLEdBQVcsVUFBVSxDQUFBO1FBQzNCLFdBQU0sR0FBVyxXQUFXLENBQUE7UUFFNUIsWUFBTyxHQUFXLENBQUMsQ0FBQTtRQUNuQixjQUFTLEdBQVcsQ0FBQyxDQUFBO1FBV25CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQW1CLEVBQUUsRUFBVSxFQUFFLE1BQWM7UUFDbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUE7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUE7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFcEIsSUFBSSxDQUFDLEtBQWEsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUVwRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELFNBQVMsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUNuQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU3QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1NBQzdCO1FBR0EsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQzVDLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxzQkFBVSxDQUFDO1lBQ2IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFvQyxFQUFFLGdCQUF5QixLQUFLO1FBQzFFLElBQUksYUFBYTtZQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBOztZQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQTtJQUNqQyxDQUFDO0NBQ0Y7QUFoRUQsNkJBZ0VDIn0=