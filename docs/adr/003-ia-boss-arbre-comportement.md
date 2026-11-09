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

## Deuxième boss : manette

Arbre `src/server/ia/bosses/manette.ts` (pièce à l'étage) : se tourner vers la cible ; à moins de 400, frapper puis s'envoler vers le coin de son côté ; à moins de 900, lancer la manette (aptitude Z) ; sinon avancer ; hors de la pièce, voler jusqu'à sa place.

Vocabulaire ajouté (`src/server/ia/boss.ts`) : `distance`, intentions `orienter`, `vitesseX`, `aptitude` (appel d'une aptitude du boss avec une entrée), `animation`, et `rejoindre` enrichi (`delai`, `courbe`, `animationAuDepart`, **`attendreLaFin`** : action longue, la décision suivante attend l'arrivée). Le pilote applique les intentions dans l'ordre et programme la décision suivante après une action longue.

**Différences voulues** avec l'ancien `__auto` : il cessait définitivement de décider quand la distance valait exactement 400 ou 900, quand la cible avait la même abscisse, ou sans aucun joueur ; l'arbre continue de décider (400 → lancer, 900 → avancer).

Vérifications : 3 tests de caractérisation (place, lancer orienté, envol puis retour) passant sur l'ancien et le nouveau code, échouant si le lancer ou l'envol est cassé ; tests unitaires de l'arbre.

## Troisième boss : troll

Arbre `src/server/ia/bosses/troll.ts` (pièce à l'étage, à gauche ; décision toutes les 800 ms) : se tourner vers la cible ; à moins de 400, **charger** de 1300 px vers elle ; à moins de 900, lancer une oie (A) ; sinon une grenouille (Z) ; hors de la pièce, rejoindre sa place.

Vocabulaire ajouté : intention **`charger`** (déplacement horizontal relatif, résolu au départ comme l'ancien `x: "-=1300"`, puis arrêt et animation de fin ; action longue). Mêmes différences voulues que pour manette (plus de blocage aux distances limites).

Vérifications : 2 tests de caractérisation (place, tirs orientés vers le joueur entré dans la pièce) passant sur l'ancien et le nouveau code, échouant si les tirs sont cassés ; la charge, inatteignable de façon fiable en intégration (le joueur est repoussé avant), est couverte par les tests unitaires ; sonde identique à l'ancien code (positions et nombre de projectiles).

## Quatrième boss : twitchman

Arbre `src/server/ia/bosses/twitchman.ts` (pièce au rez-de-chaussée, à gauche) : se tourner vers la cible ; **exactement à sa hauteur** → charger (Z) et la percuter 500 ms ; à moins de 400 → frapper puis s'envoler vers le coin de son côté ; à moins de 900 → **à gauche** charger (Z), **à droite** s'élever puis tirer le laser (E) ; sinon avancer ; hors de la pièce, voler jusqu'à sa place.

Vocabulaire ajouté : intention **`collisionTemporaire`** ; `rejoindre` accepte **`relatifX`** (décalage résolu au départ, comme l'ancien `x: "-=40"`) et **`ensuite`** (intentions appliquées à l'arrivée, ici le laser).

L'**asymétrie** à distance moyenne (charge à gauche, laser à droite) vient de l'ancien code ; elle est reproduite à l'identique, en attente d'une décision de l'auteur. Mêmes différences voulues que pour les autres boss (plus de blocage aux distances limites).

Vérifications : 3 tests de caractérisation (place, charge qui projette le joueur hors de la pièce, retour) passant sur l'ancien et le nouveau code, échouant si la charge est cassée ; laser, envols et asymétrie couverts par les tests unitaires ; sonde équivalente à l'ancien code.

**Bilan** : les 4 boss principaux sont pilotés par des arbres (environ 330 lignes de `if` imbriqués remplacées par quatre déclarations et un pilote commun) ; plus aucun `reactiveBoucle`.

## Boss final : phase « Trône »

Arbre `src/server/ia/bosses/super_boss.ts` : tant qu'il reste des rangées de trône et qu'une cible est dans la pièce centrale de l'étage → lancer un PC (aptitude Z), au plus toutes les 2 s.

Ajouts :
- brique **`recharge(nom, ms, enfant)`** ; sa mémoire est **propre à chaque boss** (fournie par le pilote), les arbres étant partagés entre les rooms ;
- perception : `temps` (heure de la scène) et `tronesRestants` (fourni par l'option `percevoir` du pilote) ;
- le pilote **ne décide rien pour un boss inactif** (le boss final avant sa révélation) ;
- côté jeu : `PcClass` (projectile), invulnérabilité (`PlayerClass.dommage` et zone d'attaque, qui ignore une cible invulnérable sans consommer le coup — sinon le boss invisible « mangeait » les coups destinés au trône), éléments du trône ajoutés au groupe `enemies` avec une méthode `dommage` (toutes les attaques des joueurs les touchent ; 400 ms minimum entre deux chutes, car une explosion touche plusieurs fois ; corps aux dimensions des images de l'atlas pour qu'aucun projectile ne passe entre deux rangées), révélation factorisée (`game/bossFinal.ts`, crochet `surRevelation`), raccourci `BOSS_FINAL_DIRECT=1`.

Vérifications : tests unitaires (recharge, arbre) ; tests d'intégration avec le raccourci (trône complet, PC qui blessent, rangées détruites par des kunaïs, destruction en six coups puis boss vulnérable) ; partie normale inchangée.

## Suite

1. ~~Migrer les boss principaux~~ : `boss_1`, `manette`, `troll` et `twitchman` faits.
2. Briques nouvelles au besoin (recharge, attente…), testées unitairement.
3. Pièces nommées dans une table commune (aujourd'hui `PIECE_BOSS_1` dans l'arbre de boss_1).
4. Boss final : phase « Trône » faite ; phases « Envol » et « Rage » à suivre.

## Retour arrière

Le `__auto` historique de `boss_1` est dans l'historique git ; le pilote ne change ni le protocole réseau ni le client.
