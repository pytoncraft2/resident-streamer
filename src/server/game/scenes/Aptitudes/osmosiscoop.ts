import TJoueur from "../types/Joueur";

export function soin(osmo, input) {
  if (input.a)
  {
    osmo.soigne = true;
    osmo.play('osmo_soin', true)
  }

  if (input.a_fin)
  {
    osmo.soigne = false;
  }
}

export function blesse(osmo, input) {
  if (input.z) {
    osmo.play('osmo_attaque', true)
    input.z = false;
  console.log("--------------------------------------------------YES")
  }
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
