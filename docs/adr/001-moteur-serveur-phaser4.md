# ADR-001 — Moteur et physique serveur : Phaser 4 via `phaser-on-nodejs`

- **Statut :** Accepté (validé le 2026-11-09)
- **Date :** 2026-11-09

## Contexte

Le serveur exécute un `Phaser.Game` HEADLESS par room (`src/server/game/config.ts`, `Hall_01.ts`) grâce au pont `@geckos.io/phaser-on-nodejs`, qui simule le DOM (jsdom) et les images (`canvas`, module natif). La Phase 0 (`docs/phase0-diagnostic.md`) a établi que :

- l'environnement de référence est Node 16.20.2 ; Node 24 échoue car `canvas@2.10` (imposé par le pont 1.2.7) ne compile pas ;
- la migration vers Phaser 4 dépend de ce même pont, documenté pour Phaser 3.

Contraintes : autorité serveur, contrats réseau (`RoomState`, messages Colyseus) inchangés, pas de réécriture globale.

Le client et le serveur partagent **un seul `package.json`** : ils utilisent donc la même version du paquet `phaser`, sauf alias npm.

## Spike réalisé

Branche locale `spike/phaser4-serveur-headless` (worktree séparé), juge : les 33 tests de `npm test` + une partie scriptée de 20 s (2 joueurs, boss actifs) comparée à la référence.

| Étape | Configuration | Résultat |
|---|---|---|
| Référence | Node 16, pont 1.2.7, Phaser 3.55.2 | 33/33 |
| 1 | **Node 24**, pont **1.3.1** (`canvas` 3.2.3 précompilé, `jsdom` 26), Phaser 3.55.2 | `npm ci` ✅, builds ✅, **33/33**, sans modification de code |
| 2a | Node 24, pont 1.3.1, **Phaser 4.2.1** | build serveur : 11 erreurs de type ; **12/33** (aucune room de jeu ne se crée) |
| 2b | idem + 2 adaptations (voir ci-dessous) | **33/33** ; 8 erreurs de type restantes (typage seul) |
| 2c | idem + `persist: true` sur le dash | partie de 20 s sans erreur d'exécution autre que celle de destruction (voir B1) |

### Écarts Phaser 3.55 → 4.2.1 constatés côté serveur

| Écart | Effet | Correctif dans le spike | Compatible Phaser 3.55 ? |
|---|---|---|---|
| `Group.children` devient un `Set` (`iterate` retiré) | `getPresence` lève une exception : **création de room impossible** | `getChildren().forEach` (`hall.ts`) | ✅ oui |
| `tweens.createTimeline()` retiré | lancer de manette cassé (2 usages) | `tweens.chain({ tweens: [...] })` (`manette.ts`) | ❌ (`chain` apparaît en 3.60) |
| Tweens détruits à la fin par défaut | **dash de fakhear utilisable une seule fois** (« Cannot restart destroyed Tween », 119 fois en 20 s) — non détecté par les tests | `persist: true` (`fakhear.ts`) | non vérifié |
| Destruction de la room | B1 subsiste sous une autre forme : `TextureManager.destroy` lève `Cannot read properties of undefined` (le pont 1.3.1 ne fournit toujours pas `cancelAnimationFrame`) | aucun | — |
| Typage plus strict (8 erreurs) | callbacks `overlap` (6), `gravity` sans `x` (1), `defaultFillColor` en lecture seule (1) | non corrigé | — |

### Client (mesure indicative, non migré)

`tsc` client sous Phaser 4 : 14 erreurs, dont 4 dans `phaser.d.ts` lui-même (`VideoFrameCallbackMetadata`… : **TypeScript 4.7 trop ancien** pour les types de Phaser 4), `Group.children.iterate`, `Geom.Point` retiré, et des points de typage. **Non testé :** rendu WebGL, scènes générées par Phaser Editor, asset packs.

## Options étudiées

### Option A — Garder `phaser-on-nodejs` et passer le serveur en Phaser 4
- ✅ Prouvé fonctionnel par le spike (33/33, partie de 20 s) avec 3 adaptations ciblées.
- ✅ Aucun changement d'architecture ni de protocole.
- ⚠️ Dépendance à un pont maintenu par une seule personne (dernière version : juin 2025), non documenté pour Phaser 4 ; B1 non résolu.
- ⚠️ Couverture des tests partielle : le dash cassé n'a été vu que dans les journaux.

### Option B — Versions distinctes : serveur Phaser 3, client Phaser 4
- ✅ Découple les deux migrations.
- ❌ Un seul `package.json` : il faudrait un alias npm (`"phaser4": "npm:phaser@4.2.1"`) et réécrire les imports d'un côté ; deux API Phaser à maintenir en parallèle.
- ❌ Inutile si l'option A tient : le spike ne montre pas de blocage serveur.

### Option C — Simulation serveur sans Phaser (physique dédiée)
- ✅ Supprime jsdom/`canvas` et le pont ; serveur plus léger et testable.
- ❌ Réécriture complète de la simulation (collisions Arcade, tweens, timers, animations utilisées pour les dégâts : `blesse_opposant` dépend des noms de frames) : contraire à la contrainte « pas de réécriture globale ».
- À reconsidérer seulement si l'option A échoue ou en Phase 4 (découplage du domaine).

## Décision proposée

**Option A**, en étapes séparées et réversibles :

1. **Node 24 d'abord, toujours en Phaser 3.55** : `@geckos.io/phaser-on-nodejs` 1.2.7 → 1.3.1 (aucune modification de code, 33/33). Mettre à jour `engines`, `AGENTS.md`, `/verifier`.
2. **Corrections compatibles avec les deux versions** sur `main` : `getChildren().forEach` dans `hall.ts` ; ajouter un test du dash répété de fakhear (régression invisible aujourd'hui).
3. **Spike client Phaser 4 séparé** (TypeScript à mettre à jour, rendu, Phaser Editor) avant toute bascule, puisque client et serveur partagent le paquet.
4. **Bascule Phaser 4 client + serveur** : `chain` dans `manette.ts`, `persist: true`, typage, puis recette multijoueur complète.
5. Traiter B1 (destruction des rooms) : contribution ou polyfill local de `cancelAnimationFrame`, à mesurer sur des parties répétées.

## Suivi

- **Étape 1 (fait) :** Node 24 via `phaser-on-nodejs` 1.3.1 (`72946ca`).
- **Étape 2 (fait) :** `getPresence` compatible, test du dash répété (`6227ae2`, `f5152f8`).
- **Étape 3 (spike client, 2026-11-09) :** branche locale `spike/phaser4-client`, partie de `main`, avec Phaser 4.2.1 + TypeScript 6.0.3.

### Résultats de l'étape 3

| Vérification | Résultat |
|---|---|
| Typecheck client / serveur / tests | 0 erreur, après corrections ci-dessous |
| `npm run build` (tsc + Vite + asset packs) | ✅ |
| `npm test` | 34/34 (2 exécutions) |
| Chrome sans interface, écran d'accueil | Phaser 4.2.1 démarre en WebGL, **aucune erreur console** ; capture bloquée sur l'écran de chargement à 100 % (la référence Phaser 3 n'atteint que 49 % dans les mêmes conditions de rendu logiciel) : **transition `Preload` → `Level` à vérifier dans un vrai navigateur** |
| Test manuel dans un navigateur (utilisateur, Node 24, 2026-11-09) | fonctionne |

**TypeScript 6** (Phaser 4.2.1 est développé avec TS ^6.0.2 ; TS 4.7 ne lit pas ses types) :
- `moduleResolution: "node"` est déprécié (bloquant sans `"ignoreDeprecations": "6.0"`). `"bundler"` côté client fait perdre les types de `colyseus.js` 0.14 : à reconsidérer avec la montée de Colyseus. À traiter avant TypeScript 7.
- `strict` devient actif par défaut : `src/server/tsconfig.json` doit déclarer `"strict": false` explicitement (sinon 155 erreurs).
- `typeRoots` du serveur (dont un chemin erroné `node_module/…`) empêche de trouver les types `phaser` : à retirer.
- Client : `skipLibCheck: true` (les `.d.ts` de `@colyseus/schema` 0.14 et de Phaser ne passent pas).
- **TS 6 seul, en Phaser 3.55 : 0 erreur, 34/34, build OK** → peut être une étape séparée avant Phaser 4.

**Écarts Phaser 4 côté client** (tous dans les zones utilisateur des fichiers Phaser Editor) :

| Écart | Impact sans correction | Correctif | Compatible Phaser 3.55 |
|---|---|---|---|
| `children.iterate` (`Jeu.ts`) | joueurs partis jamais retirés | `getChildren().forEach` | ✅ |
| `Geom.Point` retiré (`Jeu.ts`) | caméra entre pièces : exception | `Geom.Rectangle.Contains(rect, x, y)` | ✅ |
| `tweens.timeline` retiré (`Level.ts`), masqué par `any` | exception sur saisie invalide | `tweens.add` avec `yoyo`/`repeat` | ✅ |
| `add.particles` + `createEmitter` (`Jeu.ts`) | exception à l'apparition d'un joueur | `add.particles(x, y, clé, config)` | ❌ |
| `setMask` ignoré en WebGL (`Scores.ts`), masqué par `any` | classement défilant non masqué (visuel) | `enableFilters()` + `filters.external.addMask(…)`, `setMask` en Canvas | ❌ |
| Typage : `input.keyboard` nullable (×4), `make.graphics(scene)` | aucun | `!` justifié, `make.graphics({})` | ✅ |

**Écarts serveur restants** (typage seul) : `gravity` sans `x`, callbacks `overlap` (typés `GameObjectWithBody`), `defaultFillColor` en lecture seule dans les types.

**Phaser Editor :** 5 scènes et 2 composants générés par Phaser Editor 2D v3 (format `.scene` v3). Compatibilité avec Phaser Editor v5 **non testée** (nécessite l'éditeur).

### Découpage révisé de l'étape 4

- **4a — TypeScript 6** sur Phaser 3.55 (`tsconfig` ci-dessus), seul.
- **4b — Corrections compatibles** client (`getChildren`, `Rectangle.Contains`, `tweens.add`, typage), seules.
- **4c — Bascule Phaser 4.2.1** client + serveur : particules, masque, `tweens.chain`, `persist: true`, typage serveur.
- **4d — Recette navigateur multijoueur complète** (`/recette-multijoueur`), dont l'écran de chargement, les particules d'apparition et le défilement des scores.

## Conséquences

- Node 16 (fin de vie) peut être abandonné dès l'étape 1, indépendamment de Phaser 4.
- La dépendance au pont reste un risque accepté ; à surveiller (issues, versions) et à réévaluer si un blocage apparaît.
- Les tests doivent être étendus aux aptitudes basées sur des tweens (dash) avant l'étape 4.

## Plan de retour arrière

Chaque étape est un commit isolé : revenir à `package.json`/`package-lock.json` précédents (`git revert`) puis `npm ci`. L'environnement Node 16 reste disponible via nvm tant que l'étape 1 n'est pas validée en recette.

## Preuves

- Branche locale `spike/phaser4-serveur-headless` (worktree), diff : `package.json`, `package-lock.json`, `hall.ts`, `manette.ts`, `fakhear.ts`.
- Mesures : `npm test` (Node 24) et partie scriptée de 20 s comparée à la référence Node 16 / Phaser 3.55.
