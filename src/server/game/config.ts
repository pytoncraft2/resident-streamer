import Phaser from "phaser"
import Hall from "./scenes/hall"


/**
 * Configuration Phaser 3
 */

 const config: Phaser.Types.Core.GameConfig = {
   type: Phaser.HEADLESS,
   parent: "game",
   width: 5700,
   height: 945,
   scale: {
     mode: Phaser.Scale.CENTER_BOTH,
     autoCenter: Phaser.Scale.CENTER_BOTH,
   },
   physics: {
     default: 'arcade',
     arcade: {
       gravity: { y: 2600 },
       debug: false
     }
   },
   scene: [Hall]
 }

export default config
