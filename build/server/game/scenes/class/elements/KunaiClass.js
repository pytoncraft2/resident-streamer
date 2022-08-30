"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomState_1 = require("../../../RoomState");
class KunaiClass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, ClientID) {
        super(scene, x, y, sprite);
        this.vel = 400;
        this.proprietaire = '';
        this.sprite = 'huzounet';
        this._frame = 'kunai';
        this.vitesse = 0;
        this.puissance = 0;
        this.init(scene, ClientID);
    }
    init(scene, id) {
        this.scene = scene;
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        this.id = id;
        this.scale = 0.2;
        this.scene.suppressionProjectileDelai(this, id, 1300, true);
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
exports.default = KunaiClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS3VuYWlDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvY2xhc3MvZWxlbWVudHMvS3VuYWlDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUErQztBQUcvQyxNQUFxQixVQUFXLFNBQVEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTTtJQVlsRSxZQUNFLEtBQW1CLEVBQ25CLENBQVMsRUFDVCxDQUFTLEVBQ1QsTUFBYyxFQUNkLFFBQWdCO1FBRWhCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQWpCNUIsUUFBRyxHQUFXLEdBQUcsQ0FBQTtRQUNqQixpQkFBWSxHQUFXLEVBQUUsQ0FBQTtRQUd6QixXQUFNLEdBQVcsVUFBVSxDQUFBO1FBQzNCLFdBQU0sR0FBVyxPQUFPLENBQUE7UUFFeEIsWUFBTyxHQUFXLENBQUMsQ0FBQTtRQUNuQixjQUFTLEdBQVcsQ0FBQyxDQUFBO1FBV25CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBbUIsRUFBRSxFQUFVO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUVoQixJQUFJLENBQUMsS0FBYSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXBFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVuQyxDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQVksRUFBRSxLQUFhO1FBQ25DLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTdCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7U0FDN0I7UUFFQSxJQUFJLENBQUMsS0FBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDNUMsSUFBSSxDQUFDLEVBQUUsRUFDUCxJQUFJLHNCQUFVLENBQUM7WUFDYixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUNILENBQUE7SUFDSCxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQW9DLEVBQUUsZ0JBQXlCLEtBQUs7UUFDMUUsSUFBSSxhQUFhO1lBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7O1lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFBO0lBQ2pDLENBQUM7Q0FDRjtBQTlERCw2QkE4REMifQ==