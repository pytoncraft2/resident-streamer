"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomState_1 = require("../../../RoomState");
const huzounet_1 = require("././../../Aptitudes/huzounet");
const AnimationJoueur_1 = require("../../Animations/AnimationJoueur");
class CloneClass extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, ClientID, createur) {
        super(scene, x, y, sprite);
        this.vel = 400;
        this.proprietaire = '';
        this.sprite = 'huzounet';
        this.vie = 10;
        this.degat = 0.2;
        this.init(scene, ClientID, createur);
    }
    init(scene, id, createur) {
        this.scene = scene;
        this.createur = createur;
        // this.degat = createur.degat/2
        // this.scene.add.existing(this)
        scene.physics.add.existing(this);
        this.ClientID = id;
        //@ts-ignore
        this.scene.physics.add.collider([this.scene.platforme, this.scene.platforme_droite, this.scene.platforme_gauche, this.scene.platforme_haut, this.scene.platforme_haut_gauche, this.scene.platforme_haut_droite], this);
        new AnimationJoueur_1.AnimationJoueur(this.anims);
        //@ts-ignore
        (0, huzounet_1.__StatsSupplementaire)(this);
        this.setDrag(1900);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.vie -= 0.02;
        if (this.vie < 0) {
            this.scene.suppressionJoueur(this, true, this.ClientID, 1000);
            this.vie = 10;
        }
        let animationName = this.anims.getFrameName();
        if (this.scene.room.donnes[this.createur.ClientID].clavier) {
            (0, huzounet_1.shuriken__A)(this, { a: this.scene.room.donnes[this.createur.ClientID].clavier.a, a_fin: this.scene.room.donnes[this.createur.ClientID].clavier.a_fin });
            if (this.scene.room.donnes[this.createur.ClientID].clavier.z) {
                (0, huzounet_1.kunai__Z)(this);
            }
            if (this.scene.room.donnes[this.createur.ClientID].clavier.right) {
                (0, AnimationJoueur_1.setAnimation)(this, 'walk');
                this.setFlipX(false);
                this.setVelocityX(this.createur.vel);
            }
            if (this.scene.room.donnes[this.createur.ClientID].clavier.left) {
                (0, AnimationJoueur_1.setAnimation)(this, 'walk');
                this.setFlipX(true);
                this.setVelocityX(-this.createur.vel);
            }
        }
        this.scene.room.state.presences.set(this.ClientID, new RoomState_1.Player({
            x: this.x,
            y: this.y,
            sprite: this.sprite,
            anim: animationName,
            flipX: this.flipX,
            alpha: this.alpha,
            tint: this.tintBottomLeft,
            vie: this.vie
        }));
    }
    auto() {
    }
}
exports.default = CloneClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xvbmVDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ2FtZS9zY2VuZXMvY2xhc3MvZWxlbWVudHMvQ2xvbmVDbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUEyQztBQUMzQywyREFBMkY7QUFDM0Ysc0VBQWdGO0FBR2hGLE1BQXFCLFVBQVcsU0FBUSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNO0lBWWxFLFlBQ0UsS0FBbUIsRUFDbkIsQ0FBUyxFQUNULENBQVMsRUFDVCxNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsUUFBYTtRQUViLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQWxCNUIsUUFBRyxHQUFXLEdBQUcsQ0FBQTtRQUNqQixpQkFBWSxHQUFXLEVBQUUsQ0FBQTtRQUN6QixXQUFNLEdBQVcsVUFBVSxDQUFBO1FBQzNCLFFBQUcsR0FBVyxFQUFFLENBQUE7UUFDaEIsVUFBSyxHQUFXLEdBQUcsQ0FBQTtRQWdCakIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBbUIsRUFBRSxFQUFVLEVBQUUsUUFBc0M7UUFFMUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7UUFDeEIsZ0NBQWdDO1FBQ2hDLGdDQUFnQztRQUNoQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDbEIsWUFBWTtRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJ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