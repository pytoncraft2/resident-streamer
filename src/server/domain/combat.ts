/**
 * Règles de combat, indépendantes de Phaser et de Colyseus.
 */

/**
 * Points de vie après un coup de puissance donnée.
 * Une puissance négative (ou NaN) est ignorée ; la vie peut devenir négative.
 */
export function vieApresDommage(vie: number, puissance: number): number {
  return puissance >= 0 ? vie - puissance : vie;
}
