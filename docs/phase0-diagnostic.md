# Phase 0 — Diagnostic de reprise

- **Date :** 2026-11-09
- **Commit de référence :** `5f55b7d` (`main`)
- **Machine :** Linux x64, Node via nvm

## 1. Environnement de référence

| Étape | Node 16.20.2 / npm 8.19.4 | Node 24.20.0 / npm 11.19.0 |
|---|---|---|
| `npm ci` | ✅ (avertissement `EBADENGINE` : 16.17.0 attendu, sans effet) | ❌ échec de compilation de `canvas` |
| `npm run build` (client) | ✅ | ✅ (avec `node_modules` installés sous Node 16) |
| `npm run build:server` | ✅ | ✅ (idem) |
| `npm start` (serveur compilé) | ✅ écoute sur `0.0.0.0:3000` | ❌ `canvas.node` incompatible |
| Rooms Colyseus + Phaser HEADLESS | ✅ (voir §2) | non testable |

**Environnement de référence retenu : Node 16.20.2** (`PATH=$HOME/.nvm/versions/node/v16.20.2/bin:$PATH`, ou `nvm use 16`).

### Blocage Node 24 : `canvas`
- `@geckos.io/phaser-on-nodejs@1.2.7` dépend **directement** de `canvas@^2.4.1` (résolu en 2.10.0) et de `jsdom@^19`.
- `canvas@2.10.0` ne publie pas de binaire pour l'ABI Node 24 (`node-v137`, 404), et la compilation depuis les sources échoue : l'API `nan` utilisée n'est plus compatible avec le V8 de Node 24 (`'AccessorSignature' is not a member of 'v8'`).
- Conséquence : le passage à une version LTS de Node dépend du pont `phaser-on-nodejs`, comme la migration vers Phaser 4. **Les deux questions sont à instruire ensemble dans le spike de la Phase 2** (ADR-001). Pistes à évaluer, non testées : `overrides` de `canvas` en 3.x (N-API), autre version du pont, ou simulation serveur sans Phaser.

## 2. Test de fumée multijoueur (Node 16)

Script exécuté hors dépôt (client `colyseus.js` du projet, 4 clients, salon unique) :

| Vérification | Résultat |
|---|---|
| `GET /`, `GET /scores`, `GET /colyseus/` | ✅ 200 |
| 4 clients → `lobby` (filtre `salon`) | ✅ même room |
| 4 clients → `game_instance` avec les 4 personnages | ✅ même room, 4 présences à t=2 s |
| Message `inputs` (droite) → position serveur | ✅ x 2830 → ~4579 en 3 s |
| Apparition des boss (timers 1–7 s) | ⚠️ 4 boss sur 5 dans l'état à t=10 s : `manette`, `twitchman`, `boss_1`, `troll` ; **`super_boss` absent** (cause non identifiée) |
| Départ d'un client | ✅ présence retirée |
| Départ de tous les clients → `onDispose` | ❌ exception, voir B1 |
| `src/server/scores.json` | ✅ inchangé |

**Non vérifié (recette manuelle navigateur nécessaire, `/recette-multijoueur`) :** rendu client, lobby graphique, aptitudes, dégâts, mort des boss, fin de partie, enregistrement du score, écran Scores.

## 3. Anomalies constatées

| # | Gravité | Constat | Preuve |
|---|---|---|---|
| B1 | Haute — **corrigé** (`src/server/game/phaserHeadless.ts`, ADR-001 étape 5) | À la destruction d'une room, `Game.destroy()` lève `TypeError: window.cancelAnimationFrame is not a function` : le polyfill de `phaser-on-nodejs` définit `requestAnimationFrame` mais pas `cancelAnimationFrame`. La destruction Phaser est interrompue ; risque de ressources non libérées à chaque partie (à mesurer sur une longue durée). | `node_modules/@geckos.io/phaser-on-nodejs/lib/index.js`, pile `TimeStep.stop` ← `Hall_01.onDispose` ; impact réel mesuré en Phase 2 : la boucle s'arrête, mais **chaque jeu détruit restait en mémoire** (40/40 retenus après GC), d'où une fuite par room. |
| B2 | **Comportement voulu** | `super_boss` n'apparaît pas dans `state.presences` à t=10 s alors que son timer est de 1 s. | test de fumée ; explication : `super_boss` est créé inactif (`Aptitudes/super_boss.ts`, `setActive(false)`) et n'exécute donc pas `preUpdate`, qui publie la présence ; il est activé quand `troll` et `manette` sont vaincus (`ETAGE_OK`, `PlayerClass.ts`). |
| B3 | Haute (sécurité / autorité serveur) — **corrigé** | `POST /scores` enregistre l'équipe, les joueurs et le temps **envoyés par le client**, sans validation. N'importe qui peut écrire dans le classement, et le nom d'équipe sert de clé d'objet. | `src/server/server.ts` (`app.post('/scores')`) ; correction : le serveur enregistre lui-même une entrée par partie à `FIN_JEU` (`src/server/game/finDePartie.ts`), `POST /scores` supprimé. Effet de bord voulu : une seule entrée par partie au lieu d'une par client. |
| B4 | Moyenne (en fait haute : perte du classement à chaque build) — **corrigé** | `scores.json` est lu et écrit dans `__dirname` : en production, `build/server/scores.json` (copie écrasée à chaque `build:server`) ; en dev (`serve:server`), `src/server/scores.json`, donc un fichier versionné modifié par les parties. | `server.ts`, script `build:server` ; correction : classement dans `donnees/scores.json` (ou `SCORES_FICHIER`), initialisé depuis `src/server/scores.json`, plus de copie au build ; nodemon ignore `donnees/` (chaque écriture relançait le serveur de dev). |
| B5 | Basse | Serveur : nombreux `Texture.frame missing` / `generateFrameNames: Frame missing` (atlas non chargé côté serveur HEADLESS). Probablement sans effet sur la physique, à confirmer. | journal serveur |
| B6 | Basse | URL serveur codée en dur `ws://localhost:3000` / `http://localhost:3000` côté client. | `Lobby.ts:180`, `Jeu.ts:665`, `Jeu.ts:708` |
| B7 | Moyenne (équilibrage / autorité serveur) | Aucune aptitude n'a de temps de recharge. Les touches non consommées (bombe d'akhizonah, kunaï de huzounet) relancent l'action ~8 fois/s tant qu'elles sont maintenues ; le serveur accepte n'importe quel flux d'`inputs`. Constaté en phase 1. | `test/integration/aptitudes.test.ts` |
| B8 | À vérifier (intention de design ?) | Le clonage de huzounet (E) ne fonctionne qu'une fois par partie : `huzounet.clone` n'est jamais remis à `false`, et les 4 clones persistent. | `Aptitudes/huzounet.ts` (`clonage__E`) |

## 4. Dépendances

`npm audit` (Node 16) : 61 vulnérabilités (7 basses, 11 modérées, 37 hautes, 6 critiques). Dépendances **directes** hautes/critiques :

| Paquet | Correctif proposé par npm |
|---|---|
| colyseus | 0.18 (majeure, change le protocole) |
| vite | 8.x (majeure) |
| axios | 1.x (majeure) |
| express, nodemon | mineure disponible |
| eslint, mocha | majeures (outillage) |
| phasereditor2d-launcher | aucun |

Ne pas lancer `npm audit fix --force` : plusieurs correctifs sont des montées majeures à traiter séparément (Phase 3).

`@ts-nocheck` / `@ts-ignore` présents dans 14 fichiers (dont `RoomState.ts`, `LobbyState.ts`, `Lobby.ts` ×12, `Jeu.ts` ×7).

## 5. Inventaire du protocole réseau (premier relevé)

**Rooms :** `lobby` (filtre `salon`, liste temps réel), `game_instance` (filtre `salon`, max 4 clients, `patchRate` 1 ms), `acceuil`.

| Sens | Message | Room |
|---|---|---|
| client → serveur | `etatJoueur`, `demandeCommencerJeu` | lobby |
| client → serveur | `inputs` (`{up,right,down,left,space,a,a_fin,z,e,r}`) | game_instance |
| serveur → clients | `commencerJeu` | lobby |
| serveur → clients | `RDC_OK`, `ETAGE_OK`, `FIN_JEU`, `suppression` (`{<ref>: id}`) | game_instance |
| serveur → client | `rooms`, `+`, `-` (liste temps réel des salons, `LobbyRoom` Colyseus, écoutée par `Level.ts`) | acceuil |

**État synchronisé :** `RoomState { presences: Map<Player>, projectiles: Map<Projectile>, lignes: Map<Ligne>, rectangles: Map<Rectangle>, compteur }` ; `LobbyState { joueurs: Map<Joueur>, … }`. Les détails des champs sont dans `src/server/game/RoomState.ts` et `LobbyState.ts`.

## 6. Reste à faire pour clore la Phase 0

- [ ] Recette manuelle navigateur 2/3/4 joueurs (`/recette-multijoueur`) pour confirmer le flux lobby → partie → boss → classement.
- [ ] Expliquer B2 (`super_boss`).
- [ ] Cartographier les responsabilités et couplages de `Jeu.ts`, `hall.ts`, `PlayerClass.ts`, `Aptitudes/`, `RoomState.ts`.
