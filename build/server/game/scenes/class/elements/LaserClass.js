"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomState_1 = require("../../../RoomState");
class LaserClass extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, fillColor, fillAlpha, ClientID, proprietaire, cible) {
        super(scene, x, y, width, height, fillColor, fillAlpha);
        this.sprite = 'laser';
        this._frame = 'laser';
        this.init(scene, ClientID, proprietaire, cible);
    }
    init(scene, id, proprietaire, cible) {
        this.scene = scene;
        this.proprietaireID = proprietaire.ClientID;
        this.proprietaire = proprietaire;
        this.agrandissement = false;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.id = id;
        this.cible = cible;
        // this.height = 200
    }
    preUpdate(_time, _delta) {
        if (this.agrandissement) {
            this.width += 200;
            if (this.proprietaire.body)
                this.proprietaire.setVelocity(0);
        }
        this.x = this.proprietaire.x + 80;
        this.y = this.proprietaire.y - 185;
        var within = this.scene.physics.overlapRect(this.proprietaire.x + 80, this.proprietaire.y - 185, this.width, this.height + 500);
        within.forEach(function (body) {
            if (body.gameObject.type == "Sprite") {
                if (body.gameObject.ClientID != this.proprietaireID) {
                    if (body.gameObject.dommage && this.agrandissement)
                        body.gameObject.dommage(0.08);
                }
            }
        }, this);
        this.scene.room.state.rectangles.set(this.id, new RoomState_1.Rectangle({
            x: this.x,
            y: this.y,
            id: this.id,
            width: -this.width,
            height: this.height,
            fillColor: this.fillColor,
            fillAlpha: this.fillColor,
            angle: this.angle
        }));
    }
    charge() {
        if (!this.proprietaire.flipX) {
            const e = this.scene.physics.closest(this.proprietaire, [...this.scene[`players`].getChildren()]);
            if (e) {
                var rad = Phaser.Math.Angle.Between(e.x, e.y, this.proprietaire.x, this.proprietaire.y);
                // var rad = Phaser.Math.Angle.BetweenPoints({x: e.x, y: e.y}, {x: this.proprietaire.x, y: this.proprietaire.y});
                var deg = Phaser.Math.RadToDeg(rad); // deg : -180 ~ 180
                this.setAngle(deg);
                // this.rotation = rad
            }
            this.agrandissement = true;
            // this.setSize(1000, 300)
            // this.height = 200
            // this.setOrigin(0, 6)
            this.scene.time.delayedCall(400, () => {
                this.agrandissement = false;
                this.setSize(1, this.height);
            }, null, this);
        }
    }
}
exports.default = LaserClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFzZXJDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvY2xhc3MvZWxlbWVudHMvTGFzZXJDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUE4QztBQUc5QyxNQUFxQixVQUFXLFNBQVEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTO0lBV2xFLFlBQ0UsS0FBbUIsRUFDbkIsQ0FBUyxFQUNULENBQVMsRUFDVCxLQUFhLEVBQ2IsTUFBYyxFQUNkLFNBQWMsRUFDZCxTQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsWUFBaUIsRUFDakIsS0FBYTtRQUViLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQXRCekQsV0FBTSxHQUFXLE9BQU8sQ0FBQTtRQUN4QixXQUFNLEdBQVcsT0FBTyxDQUFBO1FBdUJ0QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ2pELENBQUM7SUFFRCxJQUFJLENBQUMsS0FBbUIsRUFBRSxFQUFVLEVBQUUsWUFBcUIsRUFBRSxLQUFhO1FBQ3hFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQTtRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0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