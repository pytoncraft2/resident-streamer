# Intentions de conception — Resident Streamer

Ce document consigne **ce que le jeu doit faire et pourquoi**, d'après l'auteur du jeu. Il prime sur le code en cas de désaccord : un écart entre les deux est soit un bug, soit une intention à mettre à jour ici. Références techniques : `AGENTS.md`, `docs/adr/`.

Légende : ✅ conforme au code · ⚠️ écart avec le code · 🚧 inachevé · ❓ question ouverte.

## 1. Déroulement d'une partie

1. **Accueil** (`Level`) : le joueur rejoint un lobby existant ou en crée un.
2. **Lobby** (`Lobby`) : chaque joueur choisit son personnage, puis la partie démarre.
3. **Jeu** (`Jeu`) : 4 boss sont visibles et doivent être vaincus.
   - Un **boss vaincu devient un objet**.
   - **TAB** (1er appui) : le joueur ramasse l'objet (le boss rétréci le suit).
   - **TAB** (2e appui) : le joueur **devient ce boss, comme allié**, pendant quelques secondes. Pratique, **pas obligatoire**.
   - Les personnages se déplacent **librement** de pièce en pièce et d'étage en étage (rez-de-chaussée + étage) dès le départ.
   - Au départ, le rez-de-chaussée montre une **porte fermée** et la **pièce centrale de l'étage** n'est pas dévoilée.
   - Quand les **4 boss** sont vaincus : la porte devient une **porte ouverte avec un escalier** (purement visuel : on circulait déjà partout) et la pièce centrale de l'étage se **révèle**, avec le **boss final**, qui apparaît.
   - Le **boss final vaincu** termine la partie ; le **score (temps)** est ajouté au classement.
4. **Classement** (`Scores`).

### Correspondance avec le code

| Intention | Code (`PlayerClass.animationBossVaincu`, `Aptitudes/_utilitaire/fusion.ts`) | État |
|---|---|---|
| Boss vaincu → objet ramassable (TAB) | rétréci, suit le joueur (`recuperationObjetBoss`) | ✅ |
| 2e TAB → devenir le boss quelques secondes | contrôle du boss **5 s**, puis le boss disparaît et n'est plus utilisable (`inaccessible`) | ✅ |
| Les 4 boss vaincus → porte ouverte, pièce centrale révélée, boss final | `domain/progression.ts` (`bossPrincipauxVaincus`), une seule fois par partie : `RDC_OK` (image `hall` effacée), `ETAGE_OK` (image `hall_1` effacée), boss final activé. **Corrigé** : avant, `RDC_OK` suivait `twitchman` + `boss_1` et `ETAGE_OK` + boss final suivaient `troll` + `manette` | ✅ |
| Déplacement libre entre pièces et étages | aucune barrière liée à la progression | ✅ |
| Boss final | créé inactif, présent dans l'état seulement une fois activé (ancienne anomalie B2) ; **ne fait encore rien** | 🚧 |
| Fin de partie | les 5 boss vaincus → `FIN_JEU`, score enregistré par le serveur (B3) | ✅ |
| Score | temps du chronomètre serveur | ✅ |

## 2. Personnages

| Personnage | Rôle voulu | A | Z | E | TAB |
|---|---|---|---|---|---|
| fakhear | **corps à corps** | coup de poing (`cross`) | coup de pied | dash | fusion |
| akhizonah | **bombes** | couteau | bombe | — | fusion |
| huzounet | **distance** | boule chargée (maintenir puis relâcher) | kunaï | clonage, une fois par partie (voulu, B8) | fusion |
| osmosiscoop | **soin** | soin (maintenu) | attaque | — | fusion |

Communes à tous : déplacements gauche/droite, **Espace** saut, **haut/bas** changement d'étage. **R** n'est utilisée par aucun personnage. Un appui = une action pour la bombe, le kunaï et le dash (B7).

### Statistiques dans le code

| | fakhear | akhizonah | huzounet | osmosiscoop | boss |
|---|---|---|---|---|---|
| Vie | 10 | 10 | 10 | 10 | 10 (aucun boss ne la redéfinit) |
| Dégâts au contact | 2 | 1 | 0,7 (kunaï 0,7, boule selon la charge) | 1 | — |
| Vitesse | 600 | 600 | 600 | 600 | — |

fakhear inflige 2 (5 coups par boss) : la valeur 10, qui tuait un boss d'un coup, était une valeur de test. La bombe inflige 0,3. Un joueur à 0 point de vie réapparaît avec 10 ; un boss à 0 est vaincu.

**Camps** (`domain/combat.ts`, `peutBlesser` / `peutSoigner`) : une attaque au contact ne blesse que le groupe visé par l'attaquant (`cible_courante`) — **pas de tir ami** ; le soin d'osmosiscoop ne s'applique **qu'aux alliés**. Corrigé : avant, les joueurs se blessaient entre eux et le soin soignait aussi les boss. Un boss fusionné vise les boss, comme son joueur.

Le **soin est plafonné à 10** (vie maximale, `vieApresSoin`) ; une vie déjà au-dessus n'est pas réduite.

## 3. Boss et IA

- Les IA sont volontairement **basiques** pour l'instant : chaque boss **se positionne dans sa pièce** ; quand un joueur y entre (à portée), il attaque, vole, ou agit selon ses aptitudes.
- **Objectif** : remplacer le code « spaghetti » des `__auto` par une structure propre où les actions d'un boss sont **faciles à personnaliser** ; c'est un **arbre de comportement** (*behavior tree*), et non un arbre de compétences (progression d'un personnage). Décision : ADR-003.
- **Boss final** (décidé le 2026-11-09) : trois phases, sans adaptation au nombre de joueurs ; réglages dans `src/server/ia/bosses/super_boss.ts` (`REGLAGES_BOSS_FINAL`).
  1. **Trône** ✅ : assis sur un trône de 6 rangées de PC (siège « tronehaut »), invisible et **invulnérable** ; chaque coup porté au trône (corps à corps, kunaï, boule, bombe : toute attaque qui blesse un ennemi) fait tomber la rangée du bas, au plus une toutes les 400 ms (le trône descend d'un étage) ; il **lance des PC** (projectiles, 1 dégât, un toutes les 2 s) sur les joueurs de la pièce centrale ; trône détruit → siège vide (« tronehautv2 »), boss visible et vulnérable (30 points de vie).
  2. **Envol** ✅ : ailes de claviers (`bossfly`), vol au-dessus de la pièce centrale ; toutes les 4 s, **piqué** devant le joueur (impact : 2 dégâts autour), puis 1,5 s au sol, **seul moment où on peut le frapper** ; frappé, il **contre-attaque** (`contreattaque` : onde de 1 dégât autour de lui, au plus toutes les 2 s) ; il remonte ensuite planer au-dessus du joueur.
  3. **Rage** 🚧 (à mi-vie) : plus rapide, pluie de PC.
- Raccourci de développement : `BOSS_FINAL_DIRECT=1` active le boss final dès le début de la partie (recette et tests).

| Boss | IA | État |
|---|---|---|
| boss_1 | arbre de comportement (`src/server/ia/bosses/boss_1.ts`) : poursuit le joueur le plus proche dans sa pièce, sinon rejoint sa place | ✅ pilote ADR-003 |
| manette | arbre de comportement (`src/server/ia/bosses/manette.ts`) : à l'étage, se tourne vers le joueur, frappe puis s'envole s'il est proche, lance sa manette à distance moyenne, avance s'il est loin ; sinon vole jusqu'à sa place | ✅ ADR-003 |
| troll | arbre de comportement (`src/server/ia/bosses/troll.ts`) : à l'étage à gauche, se tourne vers le joueur, charge s'il est proche, lance une oie à distance moyenne, une grenouille s'il est loin ; sinon rejoint sa place | ✅ ADR-003 |
| twitchman | arbre de comportement (`src/server/ia/bosses/twitchman.ts`) : au rez-de-chaussée à gauche, charge un joueur à sa hauteur, frappe puis s'envole s'il est proche, à distance moyenne charge (à gauche) ou s'élève et tire le laser (à droite, **asymétrie voulue**), avance s'il est loin ; sinon vole jusqu'à sa place | ✅ ADR-003 |
| boss final | arbre (`src/server/ia/bosses/super_boss.ts`) : phases « Trône » et « Envol » | 🚧 phase « Rage » à faire |

## Questions ouvertes

- 🚧 **Boss final** : phase « Rage » à implémenter (spécification au §3).

## Glossaire

| Terme | Sens |
|---|---|
| Salon / lobby | groupe de 2 à 4 joueurs avant la partie (room Colyseus `lobby`, filtrée par `salon`) |
| Boss | ennemi principal : `twitchman`, `boss_1`, `troll`, `manette` ; boss final `super_boss` |
| Objet (boss vaincu) | boss vaincu rétréci, ramassable avec TAB |
| Fusion | prendre le contrôle d'un boss vaincu (allié) pendant quelques secondes |
| Arbre de comportement | structure de décision d'une IA : briques sélecteur (essayer dans l'ordre), séquence (tout dans l'ordre), condition, action ; voir ADR-003 |
| Perception / intention | ce qu'un boss voit à chaque décision / ce qu'il veut faire (appliqué par le pilote Phaser) |
| RDC / étage | rez-de-chaussée et étage, librement accessibles ; `RDC_OK` ouvre visuellement la porte (escalier), `ETAGE_OK` révèle la pièce centrale du boss final |
