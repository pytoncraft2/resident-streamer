"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomState_1 = require("../../../RoomState");
class TroneClass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, ClientID, frame, positionY) {
        super(scene, x, y, sprite);
        this.vel = 400;
        this.proprietaire = '';
        this.sprite = 'super_boss';
        this._frame = 'tronetest';
        this.vitesse = 0;
        this.puissance = 0;
        this.init(scene, ClientID, frame, positionY);
    }
    init(scene, id, frame, positionY) {
        this.scene = scene;
        this._frame = frame;
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        this.id = id;
        this.setPosition(3000, positionY);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.scene.room.state.projectiles.set(this.id, new RoomState_1.Projectile({
            x: this.x,
            y: this.y,
            id: this.id,
            flipX: this.flipX,
            sprite: this.sprite,
            alpha: this.alpha,
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
exports.default = TroneClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJvbmVDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvY2xhc3MvZWxlbWVudHMvVHJvbmVDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUErQztBQUUvQyxNQUFxQixVQUFXLFNBQVEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTtJQVdsRSxZQUNFLEtBQW1CLEVBQ25CLENBQVMsRUFDVCxDQUFTLEVBQ1QsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLEtBQWEsRUFDYixTQUFpQjtRQUVqQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFsQjVCLFFBQUcsR0FBVyxHQUFHLENBQUE7UUFDakIsaUJBQVksR0FBVyxFQUFFLENBQUE7UUFHekIsV0FBTSxHQUFXLFlBQVksQ0FBQTtRQUM3QixXQUFNLEdBQVcsV0FBVyxDQUFBO1FBQzVCLFlBQU8sR0FBVyxDQUFDLENBQUE7UUFDbkIsY0FBUyxHQUFXLENBQUMsQ0FBQTtRQWFuQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBbUIsRUFBRSxFQUFVLEVBQUUsS0FBYSxFQUFFLFNBQVM7UUFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUVaLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRXBDLENBQUM7SUFDRCxTQUFTLENBQUMsSUFBWSxFQUFFLEtBQWE7UUFDbkMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFNUIsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQzVDLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxzQkFBVSxDQUFDO1lBQ2IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFvQyxFQUFFLGdCQUF5QixLQUFLO1FBQzFFLElBQUksYUFBYTtZQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBOztZQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQTtJQUNqQyxDQUFDO0NBQ0Y7QUF4REQsNkJBd0RDIn0=