import TJoueur from "../types/Joueur";

export function soin(osmo, input) {
  if (input.a)
  {
    osmo.soigne = true;
    osmo.play('osmo_soin')
  }

  if (input.a_fin)
  {
    osmo.soigne = false;
  }

}

export function blesse(osmo) {
  // if (input.z) osmo.vie += 1;
}

export function osmo_saut(osmo: TJoueur) {
  if (osmo.body.touching.down) {
    osmo.play('osmo_saut')
    osmo.body.setVelocityY(-1400);
    osmo.compteurSaut++
    if (osmo.body.touching.down) {
      osmo.compteurSaut = 0
    }
  }
}
