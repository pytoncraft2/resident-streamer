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

## Conséquences

- Node 16 (fin de vie) peut être abandonné dès l'étape 1, indépendamment de Phaser 4.
- La dépendance au pont reste un risque accepté ; à surveiller (issues, versions) et à réévaluer si un blocage apparaît.
- Les tests doivent être étendus aux aptitudes basées sur des tweens (dash) avant l'étape 4.

## Plan de retour arrière

Chaque étape est un commit isolé : revenir à `package.json`/`package-lock.json` précédents (`git revert`) puis `npm ci`. L'environnement Node 16 reste disponible via nvm tant que l'étape 1 n'est pas validée en recette.

## Preuves

- Branche locale `spike/phaser4-serveur-headless` (worktree), diff : `package.json`, `package-lock.json`, `hall.ts`, `manette.ts`, `fakhear.ts`.
- Mesures : `npm test` (Node 24) et partie scriptée de 20 s comparée à la référence Node 16 / Phaser 3.55.
