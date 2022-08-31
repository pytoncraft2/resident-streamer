"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomState_1 = require("../../../RoomState");
class LigneClass extends Phaser.GameObjects.Graphics {
    constructor(scene, closest, personnage, lineColor, lineHeight, id) {
        // super(scene, [x, y, x1, y1, x2, y2, strokeColor, strokeAlpha])
        super(scene, {
            x: 0,
            y: 0,
            lineStyle: {
                width: 5,
                color: 0xff3300,
                alpha: 1
            },
            fillStyle: {
                color: 0xff3300,
                alpha: 1
            }
        });
        this.init(scene, id, closest, personnage);
    }
    init(scene, id, closest, personnage) {
        this.scene = scene;
        this.scene.add.existing(this);
        this.id = id;
        this.closest = closest;
        this.personnage = personnage;
        this.scene.time.delayedCall(10000, () => {
            this.defaultFillColor = 0x03bb03;
        }, null, this);
        // this.scene.tweens.add({
        //   targets: this.lineHeight,
        //   height: 9,
        //   // alpha: '+=1',
        //   // alpha: { from: 0, to: 1 },
        //   // alpha: { start: 0, to: 1 },
        //   // alpha: { start: value0, from: value1, to: value2 },
        //   // alpha: function(target, key, value, targetIndex, totalTargets, tween)  { return newValue; },
        //   // alpha: {
        //   //      getActive: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; },
        //   //      getStart: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; },
        //   //      getEnd: function (target, key, value, targetIndex, totalTargets, tween) { return newValue; }
        //   // },
        //   ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        //   duration: 2000,
        //   repeat: 0,            // -1: infinity
        //   yoyo: false
        // });
        this.lineHeight = this.scene.tweens.addCounter({
            from: 0,
            to: 20,
            ease: 'Linear',
            duration: 150,
            repeat: -1,
            yoyo: true,
        });
    }
    preUpdate(time, delta) {
        this.scene.room.state.lignes.set(this.id, new RoomState_1.Ligne({
            id: this.id,
            x: 600,
            y: 200,
            x1: this.closest.x,
            y1: this.closest.y,
            x2: this.personnage.x,
            y2: this.personnage.y,
            couleur: this.defaultFillColor,
            lineHeight: this.lineHeight.getValue(),
        }));
    }
}
exports.default = LigneClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlnbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvc2VydmVyL2dhbWUvc2NlbmVzL2NsYXNzL2VsZW1lbnRzL0xpZ25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQTBDO0FBRTFDLE1BQXFCLFVBQVcsU0FBUSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVE7SUFPakUsWUFDRSxLQUFtQixFQUNuQixPQUFZLEVBQ1osVUFBZSxFQUNmLFNBQWMsRUFDZCxVQUFrQixFQUNsQixFQUFVO1FBRVYsaUVBQWlFO1FBQ2pFLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDWCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxRQUFRO2dCQUNmLEtBQUssRUFBRSxDQUFDO2FBQ1Q7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLENBQUM7YUFDVDtTQUNGLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFtQixFQUFFLEVBQVUsRUFBRSxPQUFZLEVBQUUsVUFBZTtRQUNqRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQTtRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFBO1FBQ2xDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFZiwwQkFBMEI7UUFDMUIsOEJBQThCO1FBQzlCLGVBQWU7UUFDZixxQkFBcUI7UUFDckIsa0NBQWtDO1FBQ2xDLG1DQUFtQztRQUNuQywyREFBMkQ7UUFDM0Qsb0dBQW9HO1FBQ3BHLGdCQUFnQjtRQUNoQiw2R0FBNkc7UUFDN0csNEdBQTRHO1FBQzVHLHlHQUF5RztRQUN6RyxVQUFVO1FBQ1Ysa0VBQWtFO1FBQ2xFLG9CQUFvQjtRQUNwQiwwQ0FBMEM7UUFDMUMsZ0JBQWdCO1FBQ2hCLE1BQU07UUFFTixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUM3QyxJQUFJLEVBQUUsQ0FBQztZQUNQLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsR0FBRztZQUNiLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDVixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztJQUdMLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUs7UUFFbEIsSUFBSSxDQUFDLEtBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3ZDLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxpQkFBSyxDQUFDO1lBQ1IsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1gsQ0FBQyxFQUFFLEdBQUc7WUFDTixDQUFDLEVBQUUsR0FBRztZQUNOLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEIsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQixFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JCLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDOUIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO1NBQ3ZDLENBQUMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQztDQUNGO0FBMUZELDZCQTBGQyJ9