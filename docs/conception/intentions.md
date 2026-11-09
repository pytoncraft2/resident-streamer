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

## 3. Boss et IA

- Les IA sont volontairement **basiques** pour l'instant : chaque boss **se positionne dans sa pièce** ; quand un joueur y entre (à portée), il attaque, vole, ou agit selon ses aptitudes.
- **Objectif** : remplacer le code « spaghetti » des `__auto` par une structure propre où les actions d'un boss sont **faciles à personnaliser** ; c'est un **arbre de comportement** (*behavior tree*), et non un arbre de compétences (progression d'un personnage). Décision : ADR-003.
- **Boss final** : rien n'est décidé ; il sera conçu avec ces briques pour être un boss de qualité, facilement personnalisable.

| Boss | IA | État |
|---|---|---|
| boss_1 | arbre de comportement (`src/server/ia/bosses/boss_1.ts`) : poursuit le joueur le plus proche dans sa pièce, sinon rejoint sa place | ✅ pilote ADR-003 |
| manette | arbre de comportement (`src/server/ia/bosses/manette.ts`) : à l'étage, se tourne vers le joueur, frappe puis s'envole s'il est proche, lance sa manette à distance moyenne, avance s'il est loin ; sinon vole jusqu'à sa place | ✅ ADR-003 |
| troll | arbre de comportement (`src/server/ia/bosses/troll.ts`) : à l'étage à gauche, se tourne vers le joueur, charge s'il est proche, lance une oie à distance moyenne, une grenouille s'il est loin ; sinon rejoint sa place | ✅ ADR-003 |
| twitchman | ancien `__auto` | 🚧 à migrer |
| boss final | inactif tant que les 4 boss ne sont pas vaincus ; aucun comportement | 🚧 à concevoir |

## Questions ouvertes

- ❓ **Plafond du soin** : le soin (`+0,01` vie par image) n'a pas de limite au-delà de 10 ; non tranché.
- 🚧 **Boss final** : à concevoir avec les briques de l'ADR-003 (le code contient des « trônes » à détruire, `Aptitudes/super_boss.ts`, en partie commentés).

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
