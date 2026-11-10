/**
 * Définition typée d'un personnage (jouable ou boss) et construction du registre des aptitudes.
 * Module pur (ni Phaser, ni Colyseus) : `P` est le type du personnage manipulé par les actions.
 *
 * Chaque fichier `Aptitudes/<personnage>.ts` exporte par défaut `definirPersonnage({ … })` ;
 * `base.ts` les liste explicitement et en construit le registre `Aptitudes` utilisé par `PlayerClass`.
 */

/** Touches d'action, affichées au joueur avec le nom de leur aptitude (`Commandes` de RoomState). */
export const TOUCHES_COMMANDE = ["A", "Z", "E", "R", "TAB"] as const;
export type ToucheCommande = (typeof TOUCHES_COMMANDE)[number];

/** Clavier du joueur transmis à une action (touches, fronts `*_debut`, relâchements `*_fin`). */
export type Entree = Record<string, boolean | undefined>;

export type Action<P> = (personnage: P, entree: Entree) => void;

/** Aptitude liée à une touche : son nom (affiché au joueur) et son action. */
export interface Aptitude<P> {
  readonly nom: string;
  readonly action: Action<P>;
}

/** Entrée du registre pour un personnage : forme historique lue par `PlayerClass`. */
export type AptitudesPersonnage<P> = {
  /** Réglages à la création du personnage (vie, dégâts, déplacements propres…). */
  StatsSupplementaire: (personnage: P, registre: RegistreAptitudes<P>) => void;
  A?: Action<P>;
  Z?: Action<P>;
  E?: Action<P>;
  R?: Action<P>;
  TAB?: Action<P>;
  /** Déplacements : installés à la création du personnage (`DefautDirection`, réglages des boss). */
  toucheGauche?: Action<P>;
  toucheDroite?: Action<P>;
  toucheHaut?: Action<P>;
  toucheBas?: Action<P>;
  toucheEspace?: Action<P>;
  /** IA d'un boss, démarrée à sa création. */
  auto?: (personnage: P, entree: Entree, aptitudes: AptitudesPersonnage<P>) => void;
  /** Nom de l'aptitude de chaque touche, envoyé au client pour l'interface. */
  commandes: Partial<Record<ToucheCommande, string>>;
  /** Animations propres au personnage (sans les animations communes). */
  animations: readonly AnimationPersonnage[];
};

export type RegistreAptitudes<P> = Record<string, AptitudesPersonnage<P>>;

/**
 * Animation d'un personnage : images `<prefixe><n>` de l'atlas serveur, de `debut` à `fin` ou
 * listées explicitement (quand l'atlas a des trous).
 */
export interface AnimationPersonnage {
  readonly cle: string;
  readonly prefixe: string;
  readonly images: { readonly debut: number; readonly fin: number } | readonly number[];
  readonly frameRate: number;
  readonly repeat?: number;
  readonly yoyo?: boolean;
  /**
   * Image où le coup porte (la zone d'attaque blesse à cet instant), ou `"toutes"` pour chaque
   * image de l'animation. Absente : l'animation ne blesse pas.
   */
  readonly imageQuiBlesse?: string;
}

/** Valeur de `imageQuiBlesse` pour une animation qui blesse à chaque image. */
export const TOUTES_LES_IMAGES = "toutes";

/** Noms des images d'une animation (`<prefixe><n>`), dans l'ordre. */
export function nomsDesImages(animation: AnimationPersonnage): string[] {
  const { images, prefixe } = animation;
  const numeros = "debut" in images
    ? Array.from({ length: images.fin - images.debut + 1 }, (_, i) => images.debut + i)
    : [...images];
  return numeros.map((n) => `${prefixe}${n}`);
}

/** Vrai si l'image `image` de l'animation `cle` porte un coup, d'après les animations du personnage. */
export function imageQuiBlesse(animations: readonly AnimationPersonnage[], cle: string, image: string): boolean {
  const animation = animations.find((a) => a.cle === cle);
  if (animation?.imageQuiBlesse === undefined) return false;
  return animation.imageQuiBlesse === TOUTES_LES_IMAGES || animation.imageQuiBlesse === image;
}

export interface DefinitionPersonnage<P> {
  /** Réglages à la création (vie, dégâts, déplacements propres…) ; reçoit le registre complet. */
  readonly initialiser?: (personnage: P, registre: RegistreAptitudes<P>) => void;
  /** Aptitudes par touche d'action. */
  readonly touches: Readonly<Partial<Record<ToucheCommande, Aptitude<P>>>>;
  /** IA d'un boss. */
  readonly auto?: (personnage: P, entree: Entree, aptitudes: AptitudesPersonnage<P>) => void;
  /** Animations propres au personnage (en plus des animations communes). */
  readonly animations?: readonly AnimationPersonnage[];
}

/** Identité typée : TypeScript vérifie la définition (touches connues, aptitudes complètes). */
export function definirPersonnage<P>(definition: DefinitionPersonnage<P>): DefinitionPersonnage<P> {
  return definition;
}

const rienAInitialiser = (): void => undefined;

/** Registre des aptitudes, une entrée par personnage (clé : nom du personnage, `sprite`). */
export function construireRegistre<P>(definitions: Readonly<Record<string, DefinitionPersonnage<P>>>): RegistreAptitudes<P> {
  const registre: RegistreAptitudes<P> = {};
  for (const [personnage, definition] of Object.entries(definitions)) {
    const entree: AptitudesPersonnage<P> = {
      StatsSupplementaire: definition.initialiser ?? rienAInitialiser,
      commandes: {},
      animations: definition.animations ?? [],
    };
    for (const touche of TOUCHES_COMMANDE) {
      const aptitude = definition.touches[touche];
      if (!aptitude) continue;
      entree[touche] = aptitude.action;
      entree.commandes[touche] = aptitude.nom;
    }
    if (definition.auto) entree.auto = definition.auto;
    registre[personnage] = entree;
  }
  return registre;
}
