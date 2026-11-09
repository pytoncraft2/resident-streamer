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

## Questions ouvertes

- 🚧 **Boss final** : comportement prévu (le code contient des « trônes » à détruire, `Aptitudes/super_boss.ts`, en partie commentés).

## Glossaire

| Terme | Sens |
|---|---|
| Salon / lobby | groupe de 2 à 4 joueurs avant la partie (room Colyseus `lobby`, filtrée par `salon`) |
| Boss | ennemi principal : `twitchman`, `boss_1`, `troll`, `manette` ; boss final `super_boss` |
| Objet (boss vaincu) | boss vaincu rétréci, ramassable avec TAB |
| Fusion | prendre le contrôle d'un boss vaincu (allié) pendant quelques secondes |
| RDC / étage | rez-de-chaussée et étage, librement accessibles ; `RDC_OK` ouvre visuellement la porte (escalier), `ETAGE_OK` révèle la pièce centrale du boss final |
