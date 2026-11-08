/**
 * Règles de temps, indépendantes de Phaser et de Colyseus.
 */

/**
 * Formate une durée en secondes sous la forme `HH:MM:SS`.
 * Les fractions de seconde sont tronquées ; au-delà de 99 h, les heures s'allongent.
 *
 * @example formaterDuree(102) // "00:01:42"
 */
export function formaterDuree(secondes: number): string {
  const h = Math.floor(secondes / 3600).toString().padStart(2, "0");
  const m = Math.floor((secondes % 3600) / 60).toString().padStart(2, "0");
  const s = Math.floor(secondes % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}
