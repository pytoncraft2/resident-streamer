# ADR-002 — Contrats partagés client/serveur : dossier `src/shared/`

- **Statut :** Accepté (validé le 2026-11-10)
- **Date :** 2026-11-10

## Contexte

Le client (Vite, `tsconfig.json` à la racine, `include: src/client`) et le serveur (`src/server/tsconfig.json`, compilé vers `build/server`) ne partageaient aucun code. Les données communes étaient dupliquées ou implicites :

- la liste des personnages jouables était en dur dans `src/client/scenes/Lobby.ts` (`['fakhear', 'akhizonah', 'huzounet', 'osmosiscoop']`) ;
- le serveur ne vérifiait pas le personnage reçu à la connexion (`Hall_01.onJoin`, `options.sprite`). Sondé le 2026-11-10 : un nom inconnu levait `TypeError: Cannot set properties of undefined (setting 'toucheDroite')` à la création du joueur, qui restait sans présence ; un nom de boss (`super_boss`) était accepté. Contraire à l'autorité serveur (AGENTS.md, contrainte 3) ;
- le registre des aptitudes (`Aptitudes/base.ts`) ne pouvait pas vérifier qu'il couvre chaque personnage jouable.

Premier cas concret d'extraction de la phase 4 (registre des aptitudes, étape 3 de `ROADMAP_MODERNISATION.md`).

## Options étudiées

### Option A — dossier `src/shared/`, importé par les deux côtés (retenue)

Module pur `src/shared/personnages.ts`, importé par le client et le serveur.
Le serveur compile désormais depuis `src/` : `rootDir: ".."`, `outDir: "../../build"` dans `src/server/tsconfig.json`. Ainsi `src/server/x` → `build/server/x` (inchangé) et `src/shared/x` → `build/shared/x`.

- Avantages : une seule source de vérité ; pas de dépendance du client vers le dossier serveur ; base pour les futurs contrats (messages, schémas).
- Inconvénients : configuration de compilation modifiée ; un module partagé doit rester pur (ni Phaser, ni Colyseus, ni DOM, ni Node).
- Preuve : `npm run build:server` produit `build/server/server.js` (inchangé) et `build/shared/personnages.js` ; `npm start`, les chemins `__dirname` (dist, classement, atlas serveur) et nodemon (`serve:server`, ts-node) sont inchangés ; `npm run build` (client) inclut le catalogue dans le bundle ; `npm test` vert.

### Option B — catalogue dans `src/server/domain/`, importé par le client

Aucune configuration modifiée, mais le client dépend du dossier serveur (dépendance inversée), à ne pas généraliser.

### Option C — deux listes et un test d'égalité

Aucune configuration modifiée, mais la duplication demeure ; le test ne fait que la détecter.

## Décision

Option A, choisie par l'utilisateur le 2026-11-10. Règles :

1. `src/shared/` ne contient que des modules **purs** (types, constantes, fonctions sans effet de bord), sans dépendance à Phaser, Colyseus, au DOM ni à Node.
2. N'y déplacer un contrat que lorsqu'il est réellement utilisé par les deux côtés.
3. Premier contenu : `personnages.ts` — `PERSONNAGES_JOUABLES` (ordre du lobby), `PersonnageJouable`, `estPersonnageJouable`.

## Conséquences

- **Client :** `Lobby.ts` lit `PERSONNAGES_JOUABLES` (import dans la zone `START-USER-IMPORTS`, préservée par Phaser Editor).
- **Serveur :** `Hall_01.onAuth` refuse un personnage hors catalogue (`ServerError` 400 « personnage inconnu »). **Changement de comportement voulu** : la connexion échoue au lieu d'aboutir à un joueur cassé ; le client actuel n'envoie que des noms du catalogue.
- `Hall_01.onDispose` tolère une room détruite avant le démarrage de sa scène (cas d'un seul joueur refusé) : groupes absents, mais le jeu Phaser est quand même détruit. Libération mémoire de ce cas précis (jeu jamais démarré) **à vérifier** ; le test B1 couvre les jeux démarrés.
- **Registre des aptitudes :** `PERSONNAGES` est typé `Record<PersonnageJouable | boss, …>` : TypeScript exige une définition par personnage jouable du catalogue.
- **Tests :** `test/unit/personnages.test.ts` ; `test/integration/rooms.test.ts` (refus de « inconnu », « super_boss », « », sans erreur serveur ; acceptation des 4 jouables).
- Protocole réseau inchangé (mêmes options de connexion, mêmes schémas).

## Suivi

- **2026-11-10 — contrats des messages réseau** (`src/shared/messages.ts`) : nom et contenu de chaque message par room et par sens (`MessagesVersJeu`, `MessagesDuJeu`, `MessagesVersLobby`, `MessagesDuLobby`), options de connexion (`OptionsJeu`, `OptionsLobby`) et canaux typés `canalJeu` / `canalLobby` (`envoyer`, `ecouter`, `diffuser`), qui lient le nom d'un message à son contenu sans dépendre de Colyseus. Le serveur reçoit les messages du client comme non fiables (`Recu<T>`). Protocole inchangé (mêmes noms, mêmes contenus). Au passage, le lobby ignore un `etatJoueur` dont l'index est hors catalogue (`domain/lobby.ts`) au lieu de lever une exception. Tests : `test/unit/messages.test.ts` (dont erreurs de compilation attendues), `test/unit/lobby.test.ts`, `test/integration/messages.test.ts`.

## Plan de retour arrière

Revenir au commit précédent : liste en dur dans `Lobby.ts`, `outDir: "../../build/server"` sans `rootDir`, pas d'`onAuth`. Supprimer `build/shared/` (ou `npm run clean`). Aucune donnée ni protocole à migrer.
