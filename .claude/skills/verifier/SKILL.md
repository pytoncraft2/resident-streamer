---
name: verifier
description: Exécute les vérifications réellement disponibles de Resident Streamer (build client, build serveur) et produit le résumé de fin de tâche. À utiliser après une modification de code, avant de déclarer une tâche terminée.
---

# Vérifier une modification

Objectif : rapporter des faits vérifiés, pas une impression de réussite. Une compilation réussie ne prouve pas que le jeu fonctionne.

## 1. Prérequis
- Si `node_modules/` est absent, ne pas installer sans accord : signaler qu'il faut lancer `npm ci`. Environnement de référence : **Node 24** (`nvm use`, lit `.nvmrc`). Si `node_modules` a été installé avec une autre version de Node, `canvas` (module natif) peut refuser de se charger : refaire `npm ci`. Noter la version utilisée (`node -v`).

## 2. Vérifications (dans cet ordre, chacune même si la précédente échoue)
| Commande | Vérifie | Effets de bord |
|---|---|---|
| `npm run build` | typecheck client (`tsc`, `noEmit`) + bundle Vite + hash des asset packs | écrit `dist/` (ignoré par git) |
| `npm run build:server` | compilation serveur (`src/server/tsconfig.json`) | écrit `build/server/` et y copie `scores.json` (ignoré par git) |
| `npx tsc -p test/tsconfig.json` | typecheck strict des tests | aucun |
| `npm test` | recompile le serveur puis tests mocha (unitaires + intégration rooms, scores, aptitudes, ~30 s) | démarre/arrête un serveur sur un port libre |

- Il n'existe pas de lint fiable (ESLint 6 sans configuration) : le dire explicitement plutôt que d'improviser une commande.
- Ne jamais lancer `npm run clean`, ni modifier `src/server/scores.json` pour faire passer une vérification.
- Distinguer les erreurs **préexistantes** des erreurs introduites : en cas de doute, comparer avec `git stash` uniquement si l'utilisateur l'accepte.

## 3. Vérifications manuelles restantes
Si la modification touche le réseau, les rooms, le gameplay ou les scores, indiquer qu'une recette manuelle est nécessaire (`/recette-multijoueur`) et lister les cas concernés.

## 4. Résumé de fin de tâche
- Changements et fichiers principaux.
- Commandes exécutées avec leur résultat exact (succès / échec + extrait d'erreur).
- Risques et régressions possibles (contrats `RoomState`/messages Colyseus, zones générées par Phaser Editor).
- Ce qui n'a pas pu être vérifié, dit clairement.
- Prochaine étape utile.
