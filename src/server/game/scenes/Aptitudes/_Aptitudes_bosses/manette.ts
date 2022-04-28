export function punch(manette, input) {
  if (input.a) {
    manette.play('manette_punch')
  }
}

export function vole(manette, input) {
    manette.play('manette_punch')
  manette.setVelocityY(-200)
}
