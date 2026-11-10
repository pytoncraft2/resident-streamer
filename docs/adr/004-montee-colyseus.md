# ADR-004 — Montée de Colyseus 0.14 → 0.18

- **Statut :** Accepté (validé le 2026-11-09)
- **Date :** 2026-11-09

## Contexte

Le serveur utilise `colyseus` 0.14 (méta-paquet), `@colyseus/schema` 1.x et `@colyseus/monitor` ; le client et les tests `colyseus.js` 0.14. `npm audit` signale des vulnérabilités hautes et critiques dans cette chaîne, corrigées seulement en 0.18 (changements majeurs). Les schémas d'état (`RoomState`, `LobbyState`) et les messages font partie des contrats réseau à préserver (`AGENTS.md`).

Guides officiels lus : [0.15](https://docs.colyseus.io/migrating/0.15), [0.16](https://docs.colyseus.io/migrating/0.16), [0.17](https://docs.colyseus.io/migrating/0.17), [0.18](https://docs.colyseus.io/migrating/0.18).

### Surface utilisée par le projet

- Serveur : `Server` + `WebSocketTransport`, `define(...).filterBy(['salon'])`, `enableRealtimeListing()`, `LobbyRoom`, `setState`, `setPatchRate`, `setMetadata`, `onMessage`, `broadcast`, `clock`, `client.id`, schémas `@type` primitifs, `MapSchema`, `ArraySchema`, constructeurs `new Player({...})`.
- Client : `joinOrCreate`, `onMessage` (dont `rooms`, `+`, `-` du `LobbyRoom`), `onStateChange` avec l'état complet parcouru par `MapSchema.forEach` / `ArraySchema.forEach`. **Aucun** `onAdd` / `listen` / `onChange`, l'API la plus touchée en 0.15-0.16.

### Ruptures applicables (guides + spike)

| Rupture | Version | Impact constaté | Traitement |
|---|---|---|---|
| `client.id` supprimé | 0.18 | 18 usages serveur | `client.sessionId` (même valeur en 0.14) — **fait sur `main`, compatible** |
| `setMetadata` remplace au lieu de fusionner ; `filterBy` remplit les métadonnées | 0.18 | **écran d'accueil cassé** : `metadata.nomRoom` absent → « undefined » et salon `undefined` au clic ; non détecté par les tests existants | test de caractérisation ajouté + `setMetadata({ ...this.metadata, nomRoom })` — **fait sur `main`, compatible** |
| Client : `colyseus.js` → `@colyseus/sdk` ; `room.id` → `room.roomId` ; génériques `Room<T, State>` | 0.17-0.18 | 3 scènes, 2 fichiers de tests | imports et typage |
| Méta-paquet `colyseus` (auth, tools, redis, mongoose…) | — | dépendances inutiles, source de la plupart des alertes | dépendre directement de `@colyseus/core`, `ws-transport`, `schema` |
| État de `LobbyRoom` typé `object` | 0.17 | `acceuil.ts` | référence typée vers l'état |
| `setState`, `setPatchRate` dépréciés | 0.18 | fonctionnent encore | à remplacer par `.state =` / `.patchRate =` ultérieurement |
| Bannière de démarrage | 0.18 | journal pollué | option `greet: false` du `Server` (vérifiée dans `Server.d.ts`) |
| Décodeur schema 5 sans constructeurs côté client | 0.18 | aucun : le client ne fait que lire l'état | — |

## Spike réalisé

Branche locale `spike/colyseus-018` (worktree), à partir de `main` + préalables compatibles :

- `@colyseus/core` 0.18.23, `@colyseus/ws-transport` 0.18.4, `@colyseus/schema` 5.0.42, `@colyseus/sdk` 0.18.6 — **dernières versions publiées depuis plus de deux semaines** (les plus récentes datent de fin octobre / début novembre 2026), figées par `overrides` pour que les dépendances en `^` ne remontent pas aux versions plus jeunes ; `@colyseus/monitor` retiré (import inutilisé).

| Vérification | 0.14 (`main`) | 0.18 (spike) |
|---|---|---|
| Typecheck client / serveur / tests | 0 erreur | 0 erreur |
| `npm test` | 55/55 | 55/55 (54/55 avant le correctif des métadonnées) |
| Partie longue 20 s + test de fumée 4 joueurs | journal sans erreur | journal sans erreur |
| Liste des salons (`acceuil`) | `nomRoom` présent | `nomRoom` présent après correctif |
| Client en navigateur | — | démarre sans erreur console ; recette manuelle de l'utilisateur (accueil, lobby, partie) : fonctionne |
| `npm audit` | 57 (35 hautes, 5 critiques) | 48 (30 hautes, 4 critiques), **aucune haute/critique venant de Colyseus** |

## Suivi

- **Étape 1 (fait) :** préalables compatibles sur 0.14 (`b4d91dd`, `c939fe2`, `8ec63b7`).
- **Étape 2 (fait) :** bascule 0.18 sur `chore/colyseus-018`, avec `greet: false` ; `npm ci` propre, typecheck 0 erreur, 55/55 (×2), partie longue et liste des salons sans erreur, journal serveur sans bannière.
- **Étape 3 :** recette navigateur faite sur le spike (identique à la bascule hors `greet: false`).
- **Étape 4 (fait) :** `setState` / `setPatchRate` remplacés par `state =` / `patchRate =` (les méthodes dépréciées ne faisaient que ces affectations).

## Options

- **A — Saut direct 0.14 → 0.18** (spike) : un seul passage, protocole client/serveur cohérent, versions maintenues.
- **B — Étapes 0.15, 0.16, 0.17** : déploiements intermédiaires sans intérêt pour le jeu (client et serveur sont livrés ensemble), et chaque version intermédiaire porte des alertes de sécurité ; plus long.

## Décision proposée

**Option A**, en conservant les étapes compatibles déjà faites (`client.sessionId`, métadonnées fusionnées) :

1. Fusion des préalables compatibles sur `main` (0.14).
2. Bascule 0.18 sur une branche : dépendances directes et `overrides`, imports `@colyseus/core` / `@colyseus/sdk`, `acceuil.ts`, tests.
3. Recette navigateur multijoueur complète (accueil, lobby, partie, fin de partie et classement).
4. Plus tard : remplacer les API dépréciées (`setState`, `setPatchRate`) ; désactiver la bannière (`greet: false`) dès l'étape 2.

**Client et serveur doivent être déployés ensemble** : un client 0.14 ne peut pas parler à un serveur 0.18 (protocole et schémas différents). Le serveur servant lui-même le client, un déploiement unique suffit ; prévoir que des onglets restés ouverts sur l'ancienne version devront être rechargés.

## Chargement CommonJS / ESM (étudié le 2026-11-10)

- Le serveur est compilé en CommonJS (`src/server/tsconfig.json`, `module: commonjs`) et fait `require("@colyseus/core")`. Les paquets Colyseus 0.18 sont publiés aux deux formats, mais leur table `exports` place la condition **`module-sync`** avant `require` : Node 24 la retient aussi pour `require`, si bien que **seule la version ESM** (`build/*.mjs`) est chargée, en un seul exemplaire. Relevé au démarrage du serveur (crochet `module.registerHooks`) : 70 modules `@colyseus/*`, tous en `.mjs` ; aucun double chargement CJS + ESM (qui dédoublerait l'état interne de Colyseus, ex. le matchmaker).
- Conséquence : Node doit accepter `require()` d'un module ESM (`process.features.require_module`), ce qui est le cas de Node 24 (`.nvmrc`, `engines`). Un Node plus ancien sans cette capacité retomberait sur les versions `.cjs`, sans risque de mélange tant que tous les paquets Colyseus suivent la même table.
- Phaser est chargé en CommonJS (`dist/phaser.js`), comme l'attend le pont `phaser-on-nodejs`. Le client (Vite) charge tout en ESM. Les tests (ts-node, CommonJS) suivent la même résolution que le serveur.
- Garde : `test/unit/modules.test.ts` (capacité de Node, résolution ESM des paquets Colyseus, CommonJS pour Phaser).

## Plan de retour arrière

Revenir au commit précédant la bascule (`git revert`) puis `npm ci` : les préalables compatibles restent valides en 0.14.
