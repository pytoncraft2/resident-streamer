import PlayerClass from "../class/PlayerClass"

/**
  * Enregistre la fonction dans l'objet joueur
  * https://blog.ourcade.co/posts/2020/organize-phaser-3-code-game-object-factory-methods/
  */

export function RegisterPlayer(scene: Phaser.Scene, _x: any, _y: number, sprite: string, ID: string) {
  // Phaser.GameObjects.GameObjectFactory.register(
  //   'player',
  //   function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
  //     // same logic as JavaScript example
  //     const player = new PlayerClass(scene, x, y, sprite, ID).setData({ ID })
  //     // this.players.add(player)
  //     // this.playersRef[ClientId] = player
  //
  //     this.displayList.add(player)
  //     this.updateList.add(player)
  //
  //     return player
  //   }
  // )
}

// export function RegisterPlayerZoneAction(scene: Phaser.Scene, _x: any, _y: number, sprite: string, ID: string) {
//   Phaser.GameObjects.GameObjectFactory.register(
//     'player',
//     function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
//       // same logic as JavaScript example
//       const player = new PlayerClass(scene, x, y, sprite, ID).setData({ ID })
//       // this.players.add(player)
//       // this.playersRef[ClientId] = player
//
//       this.displayList.add(player)
//       this.updateList.add(player)
//
//       return player
//     }
//   )
// }
