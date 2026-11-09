# ADR-003 — IA des boss : arbre de comportement maison

- **Statut :** Accepté (pilote `boss_1`, 2026-11-09)
- **Date :** 2026-11-09

## Contexte

Chaque boss a une fonction `__auto` (`src/server/game/scenes/Aptitudes/<boss>.ts`) de 32 à 110 lignes qui se reprogramme toutes les 500 ms (`reactiveBoucle`). Elle mélange :

- la **perception** (joueur le plus proche, distances, côté) ;
- la **décision** (une vingtaine de `if` imbriqués) ;
- l'**exécution** (déplacements Phaser, tweens, aptitudes appelées avec une fausse entrée `{ z: true }`).

Les pièces sont des coordonnées recopiées en dur dans chaque boss. Rien n'est testable sans Phaser, et créer un boss (le boss final est à concevoir) revient à tout recopier.

Intention de l'auteur (`docs/conception/intentions.md` §3) : des IA « basiques » aujourd'hui (rester dans sa pièce, attaquer quand un joueur y entre), à rendre propres et **facilement personnalisables**, en vue d'un boss final de qualité.

## Options

| Option | Pour | Contre |
|---|---|---|
| A. Garder les `__auto` | aucun travail | illisible, intestable, chaque boss recopié |
| B. Machine à états (FSM) | simple pour des modes exclusifs (patrouille, poursuite, retour) | transitions qui se multiplient quand on combine priorités et attaques |
| **C. Arbre de comportement (BT)** | priorités et repli naturels (sélecteur), composition par briques réutilisables, lecture proche de l'intention | un peu plus abstrait qu'une FSM |
| D. GOAP | planification d'objectifs | disproportionné ici (`AGENTS.md` : seulement si un besoin de planification apparaît) |
| E. Bibliothèque de BT (npm) | prête à l'emploi | dépendance pour une centaine de lignes ; moins lisible pour l'auteur |

## Décision

**Option C, arbre de comportement maison, sans dépendance**, en trois couches :

1. **`src/server/ia/arbre.ts`** — briques génériques : `selecteur`, `sequence`, `condition`, `action`. Aucune dépendance au jeu. D'autres briques (recharge, attente, aléatoire…) seront ajoutées **quand un boss en aura besoin**.
2. **`src/server/ia/boss.ts`** — vocabulaire des boss : `PerceptionBoss` (données simples), `Intention` (ce que le boss veut faire), `Zone` / `contient`, `decider(arbre, perception)`. **Testable sans Phaser.**
3. **`src/server/game/ia/pilote.ts`** — adaptateur Phaser : construit la perception, évalue l'arbre, applique les intentions ; reprend la boucle des `__auto` (tick toutes les `periode` ms, arrêt quand le boss est vaincu).

Un boss = une déclaration d'arbre dans `src/server/ia/bosses/<boss>.ts` ; son `__auto` se réduit à `demarrerIA(boss, arbre, options)`.

## Pilote : boss_1

Arbre repris **à l'identique** de l'ancien `__auto` :

```
boss_1 : sélecteur
  ├─ chasser : [cible la plus proche dans ma pièce ?] → poursuivre (vitesse 800, animation « deplacement »)
  └─ rentrer : [une cible existe et x ≠ 5010 ?]      → rejoindre (5010, 755) en 500 ms
```

Vérifications :
- tests unitaires de l'arbre et des briques (sans Phaser) ;
- test d'intégration de caractérisation (`test/integration/ia-boss.test.ts`) : place au repos, poursuite d'un joueur arrêté dans la pièce, retour quand il ressort — **passe avec l'ancien `__auto` et avec l'arbre**, **échoue** si la poursuite est cassée (vitesse 0).

Hors périmètre du pilote : l'attaque au contact de `boss_1` (collisionneur dans `__StatsSupplementaire`), reprise telle quelle.

## Suite

1. `manette`, `troll`, `twitchman`, un boss à la fois, même méthode (caractérisation → arbre → recette).
2. Briques nouvelles au besoin (recharge, attente…), testées unitairement.
3. Pièces nommées dans une table commune (aujourd'hui `PIECE_BOSS_1` dans l'arbre de boss_1).
4. Boss final conçu avec l'auteur à partir des briques.

## Retour arrière

Le `__auto` historique de `boss_1` est dans l'historique git ; le pilote ne change ni le protocole réseau ni le client.
