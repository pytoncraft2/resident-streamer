import TJoueur from "../types/Joueur";
import fusion from "./_utilitaire/fusion";

export function __StatsSupplementaire(personnage: TJoueur) {}

export function soin__A(osmo: TJoueur, input: any) {
  if (input.a)
  {
    osmo.soigne = true;
    osmo.play('osmo_soin', true)
    osmo.son = 'soin'
    input.a = false
  }

  if (input.a_fin)
  {
    osmo.soigne = false;
  }
}

export function blesse__Z(osmo: TJoueur, input: any) {
  if (input.z) {
    osmo.son = 'attaque'
    osmo.play('osmo_attaque', true)
    input.z = false;
  }
}

export function fusion__TAB(personnage: TJoueur, input: any) {
  fusion(personnage, input)
}
