"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phaser_1 = __importDefault(require("phaser"));
const hall_1 = __importDefault(require("./scenes/hall"));
/**
 * Configuration Phaser 3
 */
const config = {
    type: phaser_1.default.HEADLESS,
    parent: "game",
    width: 5700,
    height: 945,
    scale: {
        mode: phaser_1.default.Scale.CENTER_BOTH,
        autoCenter: phaser_1.default.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2600 },
            debug: false
        }
    },
    scene: [hall_1.default]
};
exports.default = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9nYW1lL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUEyQjtBQUMzQix5REFBZ0M7QUFHaEM7O0dBRUc7QUFFRixNQUFNLE1BQU0sR0FBaUM7SUFDM0MsSUFBSSxFQUFFLGdCQUFNLENBQUMsUUFBUTtJQUNyQixNQUFNLEVBQUUsTUFBTTtJQUNkLEtBQUssRUFBRSxJQUFJO0lBQ1gsTUFBTSxFQUFFLEdBQUc7SUFDWCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVztRQUM5QixVQUFVLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVztLQUNyQztJQUNELE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUU7WUFDcEIsS0FBSyxFQUFFLEtBQUs7U0FDYjtLQUNGO0lBQ0QsS0FBSyxFQUFFLENBQUMsY0FBSSxDQUFDO0NBQ2QsQ0FBQTtBQUVGLGtCQUFlLE1BQU0sQ0FBQSJ9