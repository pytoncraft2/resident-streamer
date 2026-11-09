---
name: recette-multijoueur
description: Grille de recette manuelle multijoueur de Resident Streamer (2 à 4 joueurs, lobby, personnages, boss, scores). À lancer avant/après une migration ou un changement touchant le réseau ou le gameplay.
argument-hint: "[périmètre ou nom de branche]"
disable-model-invocation: true
---

# Recette multijoueur

Cette recette est **manuelle** : Claude prépare l'environnement et la grille, l'utilisateur joue et rapporte. Ne jamais cocher un cas qui n'a pas été observé.

## 1. Préparer
- Noter la branche, le commit (`git rev-parse --short HEAD`) et `node -v`.
- Sauvegarder `donnees/scores.json` (copie dans le scratchpad) : une partie terminée y ajoute une entrée. Le restaurer en fin de recette si l'utilisateur le souhaite. Pour une recette isolée, lancer le serveur avec `SCORES_FICHIER=<fichier temporaire>`.
- Lancer dans deux terminaux séparés (l'utilisateur, ou Claude en arrière-plan) :
  - serveur : `npm run serve:server` (port 3000, codé en dur dans `Lobby.ts` et `Jeu.ts`) ;
  - client : `npm run dev` (Vite).
- Ouvrir 2, 3 puis 4 onglets/navigateurs sur l'URL affichée par Vite.

## 2. Grille (produire ce tableau, statut : OK / KO / non testé, + observation)

| # | Cas | 2 J | 3 J | 4 J |
|---|---|---|---|---|
| 1 | Connexion au lobby, affichage des joueurs | | | |
| 2 | Choix des 4 personnages (pas de doublon / comportement attendu) | | | |
| 3 | Lancement de la partie, synchronisation des positions | | | |
| 4 | Déplacements et collisions | | | |
| 5 | Aptitudes de chaque personnage (dégâts, cooldowns) | | | |
| 6 | Boss de chaque pièce : apparition, attaques, dégâts, mort | | | |
| 7 | Mort / élimination d'un joueur | | | |
| 8 | Déconnexion puis reconnexion d'un joueur en cours de partie | | | |
| 9 | Fin de partie, chronomètre, enregistrement du score | | | |
| 10 | Écran Scores : classement cohérent | | | |

Pour tout KO : étapes de reproduction, message console navigateur et serveur.

## 3. Rapporter
Résumé : cas OK / KO / non testés, régressions par rapport à la recette précédente si elle existe, et bugs à ouvrir. Proposer d'enregistrer le résultat dans `docs/recette/AAAA-MM-JJ-<branche>.md` si l'utilisateur le veut.
