"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomState_1 = require("../../../RoomState");
class ManetteClass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, ClientID) {
        super(scene, x, y, sprite);
        this.vel = 400;
        this.proprietaire = '';
        this.vitesse = 0;
        this.puissance = 0;
        this.sprite = 'manette';
        this._frame = 'objet_manette';
        this.init(scene, ClientID, sprite);
    }
    init(scene, id, sprite) {
        this.scene = scene;
        this.scene.add.existing(this);
        scene.physics.add.existing(this);
        this.id = id;
        this.scale = 0.2;
        this.sprite = sprite;
        //@ts-ignore
        this.timer = this.scene.suppressionProjectileDelai(this, id, 1100, true);
        // this.setBounce(1, 1);
        this.setCollideWorldBounds(true);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.angle += 32;
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
            angle: this.angle,
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
exports.default = ManetteClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuZXR0ZUNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL3NjZW5lcy9jbGFzcy9lbGVtZW50cy9NYW5ldHRlQ2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBK0M7QUFFL0MsTUFBcUIsWUFBYSxTQUFRLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07SUFZcEUsWUFDRSxLQUFtQixFQUNuQixDQUFTLEVBQ1QsQ0FBUyxFQUNULE1BQWMsRUFDZCxRQUFnQjtRQUVoQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFqQjVCLFFBQUcsR0FBVyxHQUFHLENBQUE7UUFDakIsaUJBQVksR0FBVyxFQUFFLENBQUE7UUFJekIsWUFBTyxHQUFXLENBQUMsQ0FBQTtRQUNuQixjQUFTLEdBQVcsQ0FBQyxDQUFBO1FBQ3JCLFdBQU0sR0FBVyxTQUFTLENBQUE7UUFDMUIsV0FBTSxHQUFXLGVBQWUsQ0FBQTtRQVc5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFtQixFQUFFLEVBQVUsRUFBRSxNQUFjO1FBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixZQUFZO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBYSxDQUFDLDBCQUEwQixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRWpGLHdCQUF3QjtRQUN4QixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFbkMsQ0FBQztJQUNELFNBQVMsQ0FBQyxJQUFZLEVBQUUsS0FBYTtRQUNuQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU3QixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUVqQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO1NBQzdCO1FBQ0EsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQzVDLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxzQkFBVSxDQUFDO1lBQ2IsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQ0gsQ0FBQTtJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsTUFBb0MsRUFBRSxnQkFBeUIsS0FBSztRQUMxRSxJQUFJLGFBQWE7WUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTs7WUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUE7SUFDakMsQ0FBQztDQUVGO0FBcEVELCtCQW9FQyJ9