Phaser.GameObjects.GameObjectFactory.register(
  'player',
  function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
    // same logic as JavaScript example
    const player = new PlayerClass(this, 100, 100, "atlas", ClientId).setData({ ClientId })
    // this.players.add(player)
    // this.playersRef[ClientId] = player
    player.setBounceX(0.2)
    player.setDragX(300)

this.displayList.add(player)
this.updateList.add(player)

return player
  }
)
