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
  - serveur : `npm run serve:server` (port 3000 ; sous Vite, le client vise le même hôte sur ce port, voir `src/client/utils/serveur.ts`) ;
  - client : `npm run dev` (Vite).
- Ouvrir 2, 3 puis 4 onglets/navigateurs sur l'URL affichée par Vite.

## 2. Déjà couvert par `npm test` (ne pas re-tester à la main, sauf doute)

Connexion de 1 à 4 joueurs et 5ᵉ joueur dirigé vers une autre room ; refus d'un personnage hors catalogue ; synchronisation entre 2 et 3 clients (présences, déplacements) ; départ, puis retour dans le même salon (nouvelle présence, l'autre joueur non affecté) ; cadence des aptitudes (un appui = une action) ; IA des 5 boss ; boss final (trône, envol, rage) via `BOSS_FINAL_DIRECT=1` ; champs ponctuels (son, commandes) ; fin de partie et enregistrement du score côté serveur (tests unitaires) ; cohérence des ressources graphiques.

## 3. Grille manuelle (produire ce tableau, statut : OK / KO / non testé, + observation)

Ce que seuls un navigateur et de vrais joueurs vérifient : rendu, sons, ressenti, interface.

| # | Cas | 2 J | 3 J | 4 J |
|---|---|---|---|---|
| 1 | Lobby : liste des joueurs, choix (TAB, clic), Entrée sans choix affiche la consigne, lancement par l'hôte quand tous sont prêts | | | |
| 2 | Lien direct `/<salon>?p=<personnage>` (et `?p=` invalide → lobby) | | | |
| 3 | Rendu et fluidité : déplacements des autres joueurs, animations, barres de vie | | | |
| 4 | Aptitudes de chaque personnage : affichage, sons, dégâts sur les boss ; soin d'osmosiscoop sur un allié | | | |
| 5 | Pas de tir ami : un coup ou un projectile ne blesse pas un coéquipier | | | |
| 6 | Boss principaux : apparition, attaques, mort (particules), ouverture des étages | | | |
| 7 | Fusion (TAB) avec un boss vaincu : icône, commandes du boss, contrôle, fin de fusion | | | |
| 8 | Boss final : apparition après les 4 boss, trône, envol, rage, défaite | | | |
| 9 | Mort d'un joueur : réapparition dans le hall | | | |
| 10 | Déconnexion d'un joueur en pleine action (combat, fusion), puis retour par le même lien | | | |
| 11 | Fin de partie : écran de fin, chronomètre, entrée ajoutée à `donnees/scores.json` | | | |
| 12 | Écran Scores : classement cohérent | | | |

Pour tout KO : étapes de reproduction, message console navigateur et serveur.

## 4. Rapporter
Résumé : cas OK / KO / non testés, régressions par rapport à la recette précédente si elle existe, et bugs à ouvrir. Proposer d'enregistrer le résultat dans `docs/recette/AAAA-MM-JJ-<branche>.md` si l'utilisateur le veut.
