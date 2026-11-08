# Resident Streamer — feuille de route de modernisation

**État :** proposition d'ingénierie, non exécutée. Basée sur le dépôt `main` consulté le 08/11/2026.
**Cible souhaitée :** Phaser 4, code maintenable et testable, gameplay serveur fiable, IA d'ennemis structurée.

## Risque directeur : Phaser tourne côté serveur

Le serveur n'utilise pas Phaser uniquement pour afficher des scènes : `src/server/game/config.ts` configure Phaser `HEADLESS` et Arcade Physics ; `Hall_01.ts` instancie un `Phaser.Game` par room via `@geckos.io/phaser-on-nodejs`. Cette dépendance se présente comme une solution pour Phaser 3 et ne documente pas de prise en charge officielle de Phaser 4. La migration cliente ne suffit donc pas à garantir la migration complète.

Ne pas mettre à jour globalement `phaser` avant d'avoir testé ce chemin serveur. Un résultat négatif peut justifier une architecture transitoire avec client et serveur sur des versions distinctes, ou le remplacement de la simulation physique serveur. Ce sont des **options à évaluer**, pas des décisions déjà prises.

## Phase 0 — Reprise et diagnostic

- [x] Créer une branche de travail et identifier un commit de référence. → `5f55b7d`, voir `docs/phase0-diagnostic.md`
- [x] Installer et démarrer le projet sur un environnement isolé reproduisant les versions historiques nécessaires. → Node 16.20.2
- [ ] Capturer les erreurs initiales : installation, client, serveur, navigateur, WebSocket et jeu.
- [ ] Documenter les flux lobby → partie → élimination des boss → classement ; vérifier ce qui est réellement fonctionnel.
- [ ] Auditer les dépendances et la compatibilité d'une version Node LTS actuelle, sans migration transversale immédiate.
- [ ] Cartographier les responsabilités et les couplages dans `Jeu.ts`, `hall.ts`, `PlayerClass.ts`, `Aptitudes/`, `RoomState.ts`.

**Sortie :** une exécution de référence reproductible, une liste de bugs observés, un premier inventaire du protocole réseau. Si le jeu ne démarre plus, documenter précisément l'environnement nécessaire et traiter d'abord ce blocage.

## Phase 1 — Sécuriser le comportement

- [ ] Installer un runner de tests adapté à la version de Node retenue ; documenter les nouvelles commandes.
- [ ] Écrire des tests de caractérisation sur les calculs purs : dégâts, cooldowns, scores et chronométrage (après extraction sans modification de comportement).
- [ ] Mettre en place des tests d'intégration pour la création, la jonction et la destruction de rooms Colyseus.
- [ ] Valider des scénarios manuels multi-clients : 2, 3 et 4 joueurs ; déconnexion/reconnexion ; quatre personnages ; combats ; boss ; fin de partie.
- [ ] Vérifier que `scores.json` ne sera pas modifié accidentellement par les tests ; isoler le stockage de test.

**Sortie :** une grille de non-régression et des tests minimum avant les changements de moteur.

## Phase 2 — Spike technique Phaser 4 (sans refonte)

- [ ] Vérifier la version Phaser 4 stable disponible au moment de la migration (4.2.1 au 08/11/2026) et la documentation officielle.
- [ ] Tester **séparément** un client minimal Phaser 4 avec une scène, un sprite, l'input et les collisions utilisées.
- [ ] Tester séparément le serveur `HEADLESS` + `@geckos.io/phaser-on-nodejs` avec Phaser 4, y compris initialisation, timer, Arcade Physics, collisions et destruction de room.
- [ ] Si incompatible, comparer : adaptation du pont Node ; simulateur physique serveur indépendant de Phaser ; stratégie temporaire de versions client/serveur distinctes.
- [ ] Identifier les `.scene` et le code généré dépendant de l'ancien Phaser Editor ; tester Phaser Editor v5 sur une copie.
- [ ] Documenter les incompatibilités TypeScript, CJS/ESM, version Node, asset packs et import dynamique des aptitudes.

**Sortie :** une décision d'architecture écrite, avec preuve de faisabilité, risques, coûts et rollback. **Aucun passage global à Phaser 4 avant cette décision.**

## Phase 3 — Migration progressive

- [ ] Migrer une scène cliente simple, en appliquant le guide officiel Phaser 3 → 4.
- [ ] Migrer l'interface et le rendu de jeu par petits lots, sans toucher aux règles de gameplay dans les mêmes commits.
- [ ] Stabiliser les assets, événements, transitions, animations, caméras, physique cliente et synchronisation.
- [ ] Mettre à jour le runtime serveur selon la décision de la phase 2, avec tests des rooms, événements, physique et performances.
- [ ] Vérifier les interactions client/serveur sur l'ensemble de la matrice multi-joueurs.
- [ ] Moderniser Node, Vite, TypeScript, Colyseus et l'outillage **par étapes séparées** pour isoler les régressions.

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

- [ ] Établir une source de vérité unique pour stats, capacités et états des personnages.
- [ ] Introduire des contrats typés de commandes, intentions et événements métier.
- [ ] Isoler les contrôles d'inputs client, les validations serveur et les snapshots de réplication.
- [ ] Extraire progressivement les règles de `PlayerClass.ts` et `hall.ts` par fonctionnalité testée.
- [ ] Remplacer le chargement fragile des aptitudes (découverte de fichiers / introspection de noms de fonctions) par un registre explicite typé si cela simplifie les dépendances.
- [ ] Centraliser la gestion des timers, du cycle de vie des rooms, de la persistance du score et des erreurs réseau.

**Sortie :** frontières explicites, dette technique mesurablement réduite, aucun comportement perdu.

## Phase 5 — IA des boss : FSM, BT ou GOAP ?

**Approche recommandée :** choisir le mécanisme le plus simple qui exprime correctement les décisions de chaque ennemi.

| Modèle | Usage pertinent | Limite |
|---|---|---|
| Machine à états (FSM) | Patrouille, poursuite, attaque, fuite, stun | Multiplication des transitions si trop d'états |
| Arbre de comportement (BT) | Priorités tactiques, séquences, conditions et replis | Peut devenir lourd avec beaucoup de branches |
| GOAP | Planifier des objectifs à partir d'actions composables, préconditions et effets | Plus coûteux à écrire, expliquer, profiler et déboguer |

- [ ] Sélectionner **un boss pilote**, décrire ses états, perceptions, priorités et comportements attendus.
- [ ] Définir une interface testable : `WorldSnapshot` → `Decision`/`Intent`, sans dépendance directe à Phaser ou Colyseus.
- [ ] Implémenter d'abord une FSM ou un BT minimal ; tester priorités, interruptions, cooldowns, perte de cible, mort et réinitialisation.
- [ ] Garder l'autorité de la simulation côté serveur : l'IA propose, les règles et la physique appliquent.
- [ ] Ajouter une trace de décision activable pour le débogage.
- [ ] Étudier GOAP **uniquement** si un besoin de planification multi-actions émerge (ex. obtenir une ressource, déclencher un mécanisme, modifier la stratégie selon le monde).

**Sortie :** IA extensible et testée sur un boss ; généralisation seulement après validation.

## Outils IA et MCP

1. **Documentation officielle Phaser 4 + skill de migration** : outils prioritaires pour les incompatibilités API. Skill : https://github.com/phaserjs/phaser/blob/master/skills/v3-to-v4-migration/SKILL.md
2. **Phaser Editor v5 MCP** (`@phaserjs/editor-mcp-server`) : recommandé seulement si le projet utilise effectivement Phaser Editor v5 et ses scènes/asset packs visuels. Un éditeur ouvert est nécessaire ; ne présume pas qu'il migre le jeu ou corrige la logique serveur. https://github.com/phaserjs/editor-mcp-server
3. **Phaser Game Agent MCP** : service différent, hébergé, avec compte/crédits ; pertinent pour générer des jeux, moins adapté au diagnostic du code de ce dépôt. https://phaser.io/news/2026/07/phaser-game-agent-mcp-setup

Ne pas inscrire des tokens d'authentification dans les fichiers suivis par Git. Configurer MCP dans l'environnement de développement après vérification des permissions.

## Journal de décision (à remplir)

- **ADR-001 — moteur/physique serveur Phaser 4 :** à décider après spike de compatibilité.
- **ADR-002 — séparation des contrats partagés :** à décider pendant la première extraction.
- **ADR-003 — modèle d'IA du premier boss :** à décider à partir du comportement désiré.

## Critère de fin de migration

Une migration n'est pas terminée quand `npm run build` réussit. Elle est terminée quand la version cible est vérifiée sur le client **et** sur le serveur, que les rooms, les boss, les collisions, les personnages et le classement fonctionnent en conditions multi-joueurs, et qu'un chemin de retour est documenté.
