"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefautDirection = exports.DefautStats = void 0;
const DefautStats = (personnage) => {
    personnage.vie = 10;
    personnage.degat = 1;
};
exports.DefautStats = DefautStats;
const DefautDirection = (Aptitudes, personnage) => {
    Aptitudes[personnage.sprite].toucheDroite = (personnage, input) => {
        direction(input.right_debut, input.right_fin, personnage, input, true);
    };
    Aptitudes[personnage.sprite].toucheGauche = (personnage, input) => {
        direction(input.left_debut, input.left_fin, personnage, input, false);
    };
    Aptitudes[personnage.sprite].toucheEspace = (personnage, input) => {
        // if (personnage.body.touching.down) {
        personnage.setVelocityY(-1150);
        // personnage.play("jump")
        // }
        // input.space = false
    };
    Aptitudes[personnage.sprite].toucheHaut = (personnage, input) => {
        changementEtage(personnage, -2600, 1000);
        input.up = false;
    };
    Aptitudes[personnage.sprite].toucheBas = (personnage, input) => {
        changementEtage(personnage, 900, 500);
        input.down = false;
    };
};
exports.DefautDirection = DefautDirection;
function direction(debut, fin, personnage, _input, dir) {
    if (debut) {
        personnage.setFlipX(!dir);
        personnage.play('walk', true);
    }
    else if (fin) {
        personnage.setVelocityX(0);
        personnage.play('idle_walk', true);
    }
    else
        personnage.setVelocityX(dir ? personnage.vel : -personnage.vel);
}
function changementEtage(personnage, velocite, delai) {
    personnage.body.checkCollision.none = true;
    personnage.setVelocityY(velocite);
    personnage.scene.time.delayedCall(delai, () => {
        personnage.body.checkCollision.none = false;
    }, null, personnage);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVmYXV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL3NjZW5lcy9TdGF0cy9EZWZhdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxXQUFXLEdBQUcsQ0FBQyxVQUFnQixFQUFFLEVBQUU7SUFDMUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDcEIsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFBO0FBSFksUUFBQSxXQUFXLGVBR3ZCO0FBRU0sTUFBTSxlQUFlLEdBQUcsQ0FBQyxTQUFjLEVBQUUsVUFBZSxFQUFFLEVBQUU7SUFDakUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxVQUFlLEVBQUUsS0FBVSxFQUFFLEVBQUU7UUFDMUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3hFLENBQUMsQ0FBQTtJQUNELFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsVUFBZSxFQUFFLEtBQVUsRUFBRSxFQUFFO1FBQzFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN2RSxDQUFDLENBQUE7SUFDQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLFVBQXdDLEVBQUUsS0FBVSxFQUFFLEVBQUU7UUFDbkcsdUNBQXVDO1FBQ3JDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQiwwQkFBMEI7UUFDNUIsSUFBSTtRQUNKLHNCQUFzQjtJQUN4QixDQUFDLENBQUE7SUFDSCxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLFVBQWUsRUFBRSxLQUFVLEVBQUUsRUFBRTtRQUN4RSxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3hDLEtBQUssQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO0lBQ25CLENBQUMsQ0FBQTtJQUNELFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsVUFBZSxFQUFFLEtBQVUsRUFBRSxFQUFFO1FBQ3ZFLGVBQWUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUMsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQXRCWSxRQUFBLGVBQWUsbUJBc0IzQjtBQUVELFNBQVMsU0FBUyxDQUFDLEtBQWMsRUFBRSxHQUFZLEVBQUUsVUFBZSxFQUFFLE1BQVcsRUFBRSxHQUFZO0lBQ3pGLElBQUksS0FBSyxFQUFFO1FBQ1QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pCLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0tBQzlCO1NBQ0ksSUFBSSxHQUFHLEVBQUU7UUFDWixVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzFCLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO0tBQ25DOztRQUNJLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBRSxVQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxVQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3hGLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUs7SUFDaEQsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUMzQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1FBQzVDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDOUMsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN6QixDQUFDIn0=