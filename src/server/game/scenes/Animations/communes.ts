/**
 * Animations communes à tous les personnages : images génériques (`marche<n>`, `jump<n>`…) présentes
 * dans l'atlas de chaque personnage côté client. Les animations propres à un personnage sont dans sa
 * définition (`Aptitudes/<personnage>.ts`).
 */
import { AnimationPersonnage } from "../Aptitudes/definition";

export const ANIMATIONS_COMMUNES: readonly AnimationPersonnage[] = [
  // jamais jouée aujourd'hui
  { cle: "goback", prefixe: "dos", images: { debut: 0, fin: 6 }, frameRate: 7, repeat: 0 },
  // jamais jouée aujourd'hui
  { cle: "front", prefixe: "face", images: { debut: 0, fin: 5 }, frameRate: 6, repeat: 0 },
  { cle: "walk", prefixe: "marche", images: { debut: 1, fin: 7 }, frameRate: 5, repeat: -1 },
  { cle: "jump", prefixe: "jump", images: { debut: 0, fin: 6 }, frameRate: 12, repeat: 0 },
  { cle: "idle_walk", prefixe: "marche", images: { debut: 0, fin: 0 }, frameRate: 1, repeat: 0 },
  // jamais jouée aujourd'hui
  { cle: "saut", prefixe: "jumpface", images: { debut: 0, fin: 5 }, frameRate: 7, repeat: 0 },
  // jamais jouée aujourd'hui
  { cle: "sautPreparation", prefixe: "jumpface", images: { debut: 5, fin: 5 }, frameRate: 1, repeat: 0 },
];
