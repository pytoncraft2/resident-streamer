# Resident Streamer — consignes pour agents de programmation

## Mission et état actuel
Resident Streamer est un jeu de speedrun coopératif en ligne pour 2 à 4 joueurs. L'équipe affronte les boss de plusieurs pièces ; son temps sert au classement. Les quatre personnages jouables ont des aptitudes distinctes.

**État sur `main` (mis à jour le 09/11/2026) :** TypeScript 6, **Phaser 4.2.1** (client et serveur, ADR-001), Colyseus 0.18 (`@colyseus/core`, `@colyseus/schema` 5, client `@colyseus/sdk` ; versions figées par `overrides`, ADR-004), Vite 8 (`vite.config.mjs`), Express 5, scènes générées par Phaser Editor (v5 Core depuis l'ADR-005, scènes encore au format v3 tant qu'elles ne sont pas réenregistrées). Environnement de référence : **Node 24** (`.nvmrc`, `engines`), depuis le passage à `@geckos.io/phaser-on-nodejs` 1.3.1 (`canvas` 3) — ADR-001 étape 1. Node 16 n'est plus supporté (`canvas` 3 exige Node ≥ 18).

**Objectif :** retrouver une base exécutable et testée, migrer prudemment vers Phaser 4, corriger les régressions, puis moderniser progressivement l'architecture du gameplay, de l'IA et du réseau. Ne pas confondre objectif futur et architecture déjà en place.

## Carte du dépôt (vérifiée)
- `src/client/index.ts` : création du jeu Phaser et déclaration des scènes.
- `src/client/scenes/` : écrans et jeu (`Jeu.ts`, `Level.ts`, `Lobby.ts`, `Preload.ts`, `Scores.ts`) ; plusieurs fichiers `.ts` sont associés à des fichiers `.scene` de Phaser Editor.
- `src/server/server.ts` : Express, Colyseus, `GET /scores` (lecture seule du classement).
- Classement : **`donnees/scores.json`** (ignoré par git, remplaçable par la variable `SCORES_FICHIER`), créé au premier démarrage depuis `src/server/scores.json`, qui reste le classement initial versionné et n'est jamais modifié (anomalie B4). Avant de déployer sur un serveur existant, copier une fois l'ancien `build/server/scores.json` vers `donnees/scores.json`.
- `src/server/game/finDePartie.ts`, `src/server/stockage/fichierScores.ts` : fin de partie décidée par le serveur (temps, nom d'équipe) et enregistrement sérialisé du score ; **aucune route n'accepte de score venant du client** (anomalie B3).
- `src/server/game/Hall_01.ts` : room Colyseus `game_instance`, entrées des joueurs, création des boss et synchronisation.
- `src/server/game/RoomState.ts` : schémas réseau Colyseus ; contrat critique à préserver.
- `src/server/game/phaserHeadless.ts` : contournements indispensables à la destruction des rooms en HEADLESS (anomalie B1) ; à réévaluer à chaque montée de Phaser ou du pont.
- `src/server/game/config.ts`, `src/server/game/scenes/hall.ts` : **Phaser exécuté côté serveur en mode HEADLESS**, physique Arcade et collisions.
- `src/server/game/scenes/class/PlayerClass.ts` : logique actuelle mêlant entité, déplacements, attaques, collisions et progression.
- `src/server/game/scenes/Aptitudes/` : capacités par personnage ; chaque fichier exporte une définition typée (`definirPersonnage`, `definition.ts`) listée explicitement dans `base.ts`, qui construit le registre `Aptitudes` (touches, IA des boss, noms des commandes envoyés au client). Ajouter un personnage : son fichier + une ligne dans `PERSONNAGES`.
- `src/client/utils/serveur.ts` : adresse du serveur pour le client — origine de la page en production, même hôte port 3000 sous Vite, ou `VITE_SERVEUR_URL` ; ne jamais réintroduire d'URL en dur (anomalie B6).
- `static/assets/` : ressources utilisées par le jeu ; `doc_client/` et `doc_server/` sont des exports de documentation existants.

## Contraintes non négociables
1. **Préserver le jeu existant avant de restructurer.** Établir le comportement de référence : connexion de 2 à 4 joueurs, lobby, mouvements, quatre personnages, aptitudes, boss, dégâts, fin de partie et scores. Distinguer fonctionnalités confirmées, incomplètes et cassées.
2. **Ne jamais monter Phaser ou `@geckos.io/phaser-on-nodejs` à l'aveugle.** Le serveur exécute Phaser en HEADLESS via ce pont (jsdom + `canvas` natif), non documenté officiellement pour Phaser 4 (ADR-001). À chaque montée de version : `npm test` vert, partie longue sans nouvelle erreur dans le journal serveur, puis recette navigateur. Les tests ne couvrent pas tout (ex. tweens détruits à leur fin).
3. **Maintenir l'autorité serveur.** Le client transmet des intentions ; la simulation et les décisions de gameplay critiques sont validées côté serveur. Ne pas faire confiance aux positions, dégâts ou scores annoncés par le client.
4. **Préserver les contrats réseau** (`RoomState`, messages Colyseus, IDs d'entités, création/destruction, input, progression). Documenter les changements de protocole et prévoir la compatibilité de chaque étape.
5. **Ne pas réécrire les zones générées par Phaser Editor sans vérification.** Identifier les blocs générés (`START OF COMPILED CODE` … `END OF COMPILED CODE`) et leurs zones utilisateur (`START-USER-CODE`, `START-USER-IMPORTS`) dans `src/client/scenes/*.ts`, ainsi que les fichiers `.scene`. Éditeur : **Phaser Editor v5 Core** (`npm run editor`, variable `PHASER_EDITOR`, ADR-005) ; une scène enregistrée passe au format 5, illisible par l'ancien éditeur v3. Après toute session d'édition, relire le `git diff` des `.scene` et des `.ts` générés : un objet déplacé par erreur change le jeu.
6. **Ne pas remplacer un monolithe par de l'abstraction gratuite.** Refactoriser par comportements observables et extractions testables ; pas de migration globale vers ECS, GOAP ou un nouveau framework sans preuve du besoin.

## Architecture cible : principes, pas décision prématurée
- Séparer les **données de gameplay** (stats, cooldowns, capacités, états), les **règles** (mouvement, combat, dommages, progression), les **adaptateurs** (Phaser/Colyseus/stockage) et la **présentation cliente**.
- Sortir progressivement les décisions d'IA de `PlayerClass`/`hall.ts` vers des unités indépendantes du moteur, recevant un état du monde explicite et produisant une intention/action. L'exécution et la validation restent côté serveur.
- Commencer les comportements simples par machine à états ou arbre de comportement ; considérer **GOAP seulement** pour des ennemis nécessitant une planification de buts/actions avec préconditions et effets. Ne pas mélanger BT et GOAP par défaut.
- Déterminer et documenter le pas de simulation, la gestion du temps, le hasard et la synchronisation avant d'introduire une IA complexe. Favoriser des tests reproductibles sans renderer.
- Éviter les `any` et `@ts-nocheck` dans le nouveau code. Assainir l'existant progressivement ; ne pas cacher les incompatibilités de migration par des assertions massives.

## Commandes existantes (à vérifier localement)
- Installer : `npm ci` (sur la base du `package-lock.json` actuel ; Node historique à isoler si nécessaire).
- Client : `npm run dev`.
- Serveur en développement : `npm run serve:server` (terminal séparé).
- Compiler le serveur : `npm run build:server`.
- Vérifier/compiler le client : `npm run build`.
- Documentation existante : `npm run doc`.
- Recette du boss final : `BOSS_FINAL_DIRECT=1 npm start` l'active dès le début de la partie (raccourci de développement, inactif par défaut).
- Éditeur de scènes : `PHASER_EDITOR=/chemin/vers/PhaserEditor npm run editor` (Phaser Editor v5 Core, licence requise ; `editor-remote` ajoute `-public`).
- Tests : `npm test` (compile le serveur puis lance mocha + ts-node sur `test/**/*.test.ts`, config `.mocharc.cjs`, types stricts `test/tsconfig.json`). Les tests d'intégration démarrent le serveur compilé sur un port libre (suite complète ~30 s). Compléter par des tests de caractérisation avant toute refonte.

## Méthode exigée pour chaque intervention
1. Lire le code concerné et les contrats adjacents ; expliquer l'état actuel et le comportement à préserver.
2. Proposer la plus petite modification fonctionnelle ; pour une migration, séparer le diagnostic, les corrections et les refactorings.
3. Définir un critère d'acceptation observable et idéalement un test avant de modifier le comportement.
4. Modifier sans déplacer/renommer inutilement les autres modules ; conserver le format des fichiers générés.
5. Exécuter les contrôles disponibles, tester le flux touché avec plusieurs clients si le réseau est impliqué, puis fournir résultats, limites et régressions possibles.
6. Mettre à jour la documentation des décisions d'architecture lorsqu'un choix structurel est acté.

## Priorités de modernisation
Consulter `ROADMAP_MODERNISATION.md` avant de traiter une phase entière. Ordre recommandé : **audit et baseline → tests de caractérisation → preuve de compatibilité Phaser 4 côté serveur → migration incrémentale → découplage gameplay/réseau/rendu → IA par comportements testables**.

## Documentation de référence
- Phaser 3 → 4 : https://github.com/phaserjs/phaser/blob/master/changelog/v4/4.0/MIGRATION-GUIDE.md
- Compétence officielle Phaser pour agents IA : https://github.com/phaserjs/phaser/blob/master/skills/v3-to-v4-migration/SKILL.md
- Compatibilité actuelle de `phaser-on-nodejs` : https://github.com/geckosio/phaser-on-nodejs
- MCP Phaser Editor v5 : intégré à l'éditeur (menu AI → MCP Server Configuration) ; utile pour les scènes éditées visuellement, pas un substitut aux tests et à l'audit de migration.
