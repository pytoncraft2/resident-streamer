# Resident Streamer — feuille de route de modernisation

**État au 10/11/2026 :** phases 0 à 3 et 5 réalisées pour l'essentiel (détails ci-dessous) ; **prochaine étape : phase 4**, en commençant par le registre explicite des aptitudes. Feuille de route rédigée le 08/11/2026 sur `main`.

**Stack actuelle :** Node 24, TypeScript 6, Phaser 4.2.1 (client et serveur HEADLESS via `phaser-on-nodejs` 1.3.1), Colyseus 0.18, Vite 8, Express 5, mocha 12, Phaser Editor v5 Core. Anomalies B1 à B8 : toutes traitées (`docs/phase0-diagnostic.md`).
**Cible souhaitée :** Phaser 4, code maintenable et testable, gameplay serveur fiable, IA d'ennemis structurée.

## Risque directeur : Phaser tourne côté serveur

Le serveur n'utilise pas Phaser uniquement pour afficher des scènes : `src/server/game/config.ts` configure Phaser `HEADLESS` et Arcade Physics ; `Hall_01.ts` instancie un `Phaser.Game` par room via `@geckos.io/phaser-on-nodejs`. Cette dépendance se présente comme une solution pour Phaser 3 et ne documente pas de prise en charge officielle de Phaser 4. La migration cliente ne suffit donc pas à garantir la migration complète.

Ne pas mettre à jour globalement `phaser` avant d'avoir testé ce chemin serveur. Un résultat négatif peut justifier une architecture transitoire avec client et serveur sur des versions distinctes, ou le remplacement de la simulation physique serveur. Ce sont des **options à évaluer**, pas des décisions déjà prises.

→ Évalué et tranché par l'ADR-001 : le pont est conservé, Phaser 4 tourne côté serveur avec des contournements (`phaserHeadless.ts`) à réévaluer à chaque montée de Phaser ou du pont.

## Phase 0 — Reprise et diagnostic

- [x] Créer une branche de travail et identifier un commit de référence. → `5f55b7d`, voir `docs/phase0-diagnostic.md`
- [x] Installer et démarrer le projet sur un environnement isolé reproduisant les versions historiques nécessaires. → Node 16.20.2
- [x] Capturer les erreurs initiales : installation, client, serveur, navigateur, WebSocket et jeu. → anomalies B1 à B8 (`docs/phase0-diagnostic.md`), toutes traitées.
- [x] Documenter les flux lobby → partie → élimination des boss → classement ; vérifier ce qui est réellement fonctionnel. → protocole dans `docs/phase0-diagnostic.md`, flux et intentions de jeu dans `docs/conception/intentions.md` ; partie complète (4 boss, boss final, score) vérifiée manuellement le 10/11/2026.
- [x] Auditer les dépendances et la compatibilité d'une version Node LTS actuelle, sans migration transversale immédiate. → Node 24 adopté via `phaser-on-nodejs` 1.3.1, sans autre montée de version (ADR-001 étape 1).
- [ ] Cartographier les responsabilités et les couplages dans `Jeu.ts`, `hall.ts`, `PlayerClass.ts`, `Aptitudes/`, `RoomState.ts`. → reporté en phase 4 : à faire zone par zone, au moment de chaque extraction.

**Sortie :** une exécution de référence reproductible, une liste de bugs observés, un premier inventaire du protocole réseau. Si le jeu ne démarre plus, documenter précisément l'environnement nécessaire et traiter d'abord ce blocage.

## Phase 1 — Sécuriser le comportement

- [x] Installer un runner de tests adapté à la version de Node retenue ; documenter les nouvelles commandes. → mocha (12 aujourd'hui) + ts-node, `npm test` (157 tests au 10/11/2026)
- [x] Écrire des tests de caractérisation sur les calculs purs : dégâts, cooldowns, scores et chronométrage (après extraction sans modification de comportement). → dégâts, soin, camps, progression, entrées, scores, chronométrage (`src/server/domain/`, `game/camps.ts`). Cooldowns : il n'en existe pas dans le code ; la cadence réelle des aptitudes est caractérisée par `test/integration/aptitudes.test.ts` (B7, B8).
- [x] Mettre en place des tests d'intégration pour la création, la jonction et la destruction de rooms Colyseus. → `test/integration/rooms.test.ts`
- [ ] Valider des scénarios manuels multi-clients : 2, 3 et 4 joueurs ; déconnexion/reconnexion ; quatre personnages ; combats ; boss ; fin de partie. → recettes navigateur ponctuelles à chaque étape et partie complète validée ; **matrice formelle 2/3/4 joueurs et déconnexion/reconnexion jamais passée**.
- [x] Vérifier que `scores.json` ne sera pas modifié accidentellement par les tests ; isoler le stockage de test. → chaque serveur de test a son propre `SCORES_FICHIER` temporaire ; le classement réel vit dans `donnees/scores.json` (B4 corrigé).

**Sortie :** une grille de non-régression et des tests minimum avant les changements de moteur.

## Phase 2 — Spike technique Phaser 4 (sans refonte)

- [x] Vérifier la version Phaser 4 stable disponible au moment de la migration (4.2.1 au 08/11/2026) et la documentation officielle. → 4.2.1 (npm, 09/07/2026) ; incompatibilités rencontrées documentées dans l'ADR-001.
- [x] Tester **séparément** un client minimal Phaser 4 avec une scène, un sprite, l'input et les collisions utilisées. → client complet en Phaser 4 (spike, ADR-001 étape 3), vérifié manuellement dans le navigateur le 09/11/2026.
- [x] Tester séparément le serveur `HEADLESS` + `@geckos.io/phaser-on-nodejs` avec Phaser 4, y compris initialisation, timer, Arcade Physics, collisions et destruction de room. → fonctionnel avec pont 1.3.1 + 3 adaptations ; destruction de room corrigée (B1, `phaserHeadless.ts`). Voir ADR-001.
- [x] Si incompatible, comparer : adaptation du pont Node ; simulateur physique serveur indépendant de Phaser ; stratégie temporaire de versions client/serveur distinctes. → comparé dans l'ADR-001 (options A/B/C).
- [x] Identifier les `.scene` et le code généré dépendant de l'ancien Phaser Editor ; tester Phaser Editor v5 sur une copie. → identifiés (5 scènes + 2 composants) ; v5 Core testé sur une copie puis adopté (ADR-005).
- [ ] Documenter les incompatibilités TypeScript, CJS/ESM, version Node, asset packs et import dynamique des aptitudes. → TypeScript 6, Node 24, asset packs (build OK) et import dynamique des aptitudes (tests OK) documentés dans l'ADR-001 ; CJS/ESM non étudié (aucun blocage rencontré).

**Sortie :** une décision d'architecture écrite, avec preuve de faisabilité, risques, coûts et rollback. **Aucun passage global à Phaser 4 avant cette décision.** → ADR-001.

## Phase 3 — Migration progressive

- [x] Migrer une scène cliente simple, en appliquant le guide officiel Phaser 3 → 4. → corrections compatibles Phaser 3 et 4 d'abord (`30782ef`), puis bascule (ADR-001 étapes 4b-4c).
- [x] Migrer l'interface et le rendu de jeu par petits lots, sans toucher aux règles de gameplay dans les mêmes commits.
- [x] Stabiliser les assets, événements, transitions, animations, caméras, physique cliente et synchronisation. → frames manquantes (B5), adresse du serveur (B6) ; recette navigateur par l'utilisateur.
- [x] Mettre à jour le runtime serveur selon la décision de la phase 2, avec tests des rooms, événements, physique et performances. → Phaser 4.2.1 client et serveur (`4b261e2`) ; fuite mémoire par room corrigée (B1, test dédié). Performances non mesurées au-delà des parties longues.
- [ ] Vérifier les interactions client/serveur sur l'ensemble de la matrice multi-joueurs. → voir phase 1 : matrice formelle non passée.
- [x] Moderniser Node, Vite, TypeScript, Colyseus et l'outillage **par étapes séparées** pour isoler les régressions. → Node 24, TypeScript 6, Phaser 4, Colyseus 0.18 (ADR-004), Vite 8, mocha 12, Express 5, Phaser Editor v5 (ADR-005), chacun dans ses commits.

**Sortie :** jeu fonctionnel sur le stack cible, avec pipeline de vérification et liste de régressions résolues.

## Phase 4 — Architecture métier

### Découpage candidat (à adapter après audit)

```
src/
  shared/            # Contrats explicitement partagés client/serveur
  server/
    domain/          # Entités, règles, stats et capacités indépendantes de Phaser
    application/     # Cas d'usage et orchestration du gameplay
    infrastructure/  # Adaptateurs Colyseus, physique, stockage
    ai/              # Perception, décision, comportements, intents
  client/
    scenes/          # Composition Phaser et affichage
    presentation/    # HUD, feedback, effets visuels
```

Cette arborescence est **proposée**, pas existante. Ne pas créer tous ces dossiers avant d'avoir un premier cas d'extraction concret.

**Déjà extrait :** règles pures dans `src/server/domain/` (combat, progression, entrées, classement, temps), IA dans `src/server/ia/`, camps dans `src/server/game/camps.ts`, fin de partie et stockage des scores (`game/finDePartie.ts`, `stockage/`).
**En cours :** registre explicite typé des aptitudes (étapes ci-dessous) ; contrats partagés dans `src/shared/` (ADR-002).

- [ ] Établir une source de vérité unique pour stats, capacités et états des personnages.
- [ ] Introduire des contrats typés de commandes, intentions et événements métier.
- [ ] Isoler les contrôles d'inputs client, les validations serveur et les snapshots de réplication.
- [ ] Extraire progressivement les règles de `PlayerClass.ts` et `hall.ts` par fonctionnalité testée.
- [x] Remplacer le chargement fragile des aptitudes (découverte de fichiers / introspection de noms de fonctions) par un registre explicite typé si cela simplifie les dépendances. → étapes :
  1. ✅ caractérisation du registre (`test/integration/registre-aptitudes.test.ts`) ;
  2. ✅ définition typée par personnage et registre explicite synchrone (`Aptitudes/definition.ts`, `base.ts`) ;
  3. ✅ catalogue des personnages partagé client/serveur (`src/shared/personnages.ts` : lobby, validation à la connexion, registre), ADR-002 ;
  4. ✅ animations et images qui blessent dans la définition de chaque personnage (`animations`, `imageQuiBlesse`), animations communes dans `Animations/communes.ts` ;
  5. ✅ test de cohérence des ressources (`test/integration/ressources.test.ts` : atlas client déclaré, images des animations dans les atlas serveur et client, icône des jouables).
- [ ] Centraliser la gestion des timers, du cycle de vie des rooms, de la persistance du score et des erreurs réseau.

**Sortie :** frontières explicites, dette technique mesurablement réduite, aucun comportement perdu.

## Phase 5 — IA des boss : FSM, BT ou GOAP ?

**Approche recommandée :** choisir le mécanisme le plus simple qui exprime correctement les décisions de chaque ennemi.

| Modèle | Usage pertinent | Limite |
|---|---|---|
| Machine à états (FSM) | Patrouille, poursuite, attaque, fuite, stun | Multiplication des transitions si trop d'états |
| Arbre de comportement (BT) | Priorités tactiques, séquences, conditions et replis | Peut devenir lourd avec beaucoup de branches |
| GOAP | Planifier des objectifs à partir d'actions composables, préconditions et effets | Plus coûteux à écrire, expliquer, profiler et déboguer |

- [x] Sélectionner **un boss pilote**, décrire ses états, perceptions, priorités et comportements attendus. → `boss_1` (ADR-003).
- [x] Définir une interface testable : `WorldSnapshot` → `Decision`/`Intent`, sans dépendance directe à Phaser ou Colyseus. → `PerceptionBoss` → `Intention[]` (`src/server/ia/boss.ts`).
- [ ] Implémenter d'abord une FSM ou un BT minimal ; tester priorités, interruptions, cooldowns, perte de cible, mort et réinitialisation. → BT (`src/server/ia/arbre.ts`) avec recharges (`recharge`) et interruptions (contre-attaque du boss final) testées ; **perte de cible, mort et réinitialisation pas encore testées**.
- [x] Garder l'autorité de la simulation côté serveur : l'IA propose, les règles et la physique appliquent. → l'arbre produit des intentions, le pilote Phaser (`game/ia/pilote.ts`) les applique.
- [x] Généraliser après validation du pilote. → les 5 boss (boss_1, manette, troll, twitchman, boss final en 3 phases) en arbres de comportement (ADR-003).
- [ ] Ajouter une trace de décision activable pour le débogage.
- [ ] Étudier GOAP **uniquement** si un besoin de planification multi-actions émerge (ex. obtenir une ressource, déclencher un mécanisme, modifier la stratégie selon le monde).

**Sortie :** IA extensible et testée sur un boss ; généralisation seulement après validation. → atteinte ; GOAP non nécessaire à ce jour.

## Outils IA et MCP

1. **Documentation officielle Phaser 4 + skill de migration** : outils prioritaires pour les incompatibilités API. Skill : https://github.com/phaserjs/phaser/blob/master/skills/v3-to-v4-migration/SKILL.md
2. **Phaser Editor v5 MCP** (`@phaserjs/editor-mcp-server`) : recommandé seulement si le projet utilise effectivement Phaser Editor v5 et ses scènes/asset packs visuels. Un éditeur ouvert est nécessaire ; ne présume pas qu'il migre le jeu ou corrige la logique serveur. https://github.com/phaserjs/editor-mcp-server
3. **Phaser Game Agent MCP** : service différent, hébergé, avec compte/crédits ; pertinent pour générer des jeux, moins adapté au diagnostic du code de ce dépôt. https://phaser.io/news/2026/07/phaser-game-agent-mcp-setup

Ne pas inscrire des tokens d'authentification dans les fichiers suivis par Git. Configurer MCP dans l'environnement de développement après vérification des permissions.

## Journal de décision

- **ADR-001 — moteur/physique serveur Phaser 4 :** accepté — conserver `phaser-on-nodejs` (1.3.1) et passer en Phaser 4 par étapes, Node 24 d'abord. Voir `docs/adr/001-moteur-serveur-phaser4.md`.
- **ADR-002 — contrats partagés client/serveur :** proposé — dossier `src/shared/` (modules purs), premier contenu : catalogue des personnages jouables. Voir `docs/adr/002-contrats-partages.md`.
- **ADR-003 — modèle d'IA des boss :** accepté — arbre de comportement maison, pilote `boss_1`, généralisé aux 5 boss. Voir `docs/adr/003-ia-boss-arbre-comportement.md`.
- **ADR-004 — montée de Colyseus 0.14 → 0.18 :** accepté (09/11/2026). Voir `docs/adr/004-montee-colyseus.md`.
- **ADR-005 — Phaser Editor v5 Core à la place de Phaser Editor 2D v3 :** accepté (09/11/2026). Voir `docs/adr/005-phaser-editor-v5.md`.

## Critère de fin de migration

Une migration n'est pas terminée quand `npm run build` réussit. Elle est terminée quand la version cible est vérifiée sur le client **et** sur le serveur, que les rooms, les boss, les collisions, les personnages et le classement fonctionnent en conditions multi-joueurs, et qu'un chemin de retour est documenté.
