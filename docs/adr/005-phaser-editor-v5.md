# ADR-005 — Phaser Editor v5 (Core) à la place de Phaser Editor 2D v3

- **Statut :** Accepté (2026-11-09)
- **Date :** 2026-11-09

## Contexte

Les 5 scènes (`src/client/scenes/*.scene`) et `Behaviors.components` ont été créés avec **Phaser Editor 2D v3**, lancé par le paquet npm `phasereditor2d-launcher` (MIT, gratuit). Cette ligne n'évolue plus (dernière version 3.67.0, février 2024, prise en charge jusqu'à Phaser 3.80) : elle ne connaît pas Phaser 4, adopté par l'ADR-001, et apporte la vulnérabilité `adm-zip` sans correctif.

**Phaser Editor v5** (avril 2026) :
- application de bureau Electron ou **Core** (serveur servant l'éditeur dans le navigateur) ; **sur Linux, seul Core est proposé** au téléchargement ;
- prise en charge complète de Phaser 4 (Filters à la place des FX), Phaser 3 toujours accepté ;
- serveur MCP intégré (menu AI → MCP Server Configuration) ;
- **payant** : 12 $/mois ou licences ponctuelles, sans offre gratuite ; licence acquise par l'utilisateur.

Sources : [annonce v5](https://phaser.io/news/2026/04/phaser-editor-v5-release), [installation](https://docs.phaser.io/phaser-editor/first-steps/download-and-install), [tarifs](https://phaser.io/editor/pricing), [releases v3](https://github.com/PhaserEditor2D/PhaserEditor2D-v3/releases).

Aucune documentation trouvée sur l'ouverture des scènes v3 par la v5 : vérifié par un essai.

## Essai

Copie d'essai (`git worktree`, branche `spike/phaser-editor-v5`), éditeur v5 Core :

| Constat | Résultat |
|---|---|
| Ouverture des scènes v3 | sans erreur ni proposition de migration ; affichage correct (utilisateur) |
| Scènes non modifiées | **non réécrites** : elles restent au format 3 tant qu'on ne les enregistre pas |
| Scène enregistrée (`Jeu`) | format `version` 3 → **5**, listes vides (`components`, `list`) retirées |
| Code généré de `Jeu.ts` | équivalent : 7 `setStyle({  })` ajoutés, ordre des affectations et déclarations changé (mêmes 52 affectations et 51 champs) ; zones utilisateur intactes |
| Build, tests, partie | build OK, 60/60, partie en navigateur sans anomalie (utilisateur) |
| `phasereditor2d.config.json` (virgule finale) | accepté |

**Incident instructif :** le premier essai a ouvert le dépôt principal au lieu de la copie, et un rectangle de `Jeu` (`haut_milieu`, cache d'une pièce) a été déplacé en le manipulant. Changement transféré vers la copie, annulé, `main` restauré. → Toujours relire le `git diff` des `.scene` **et** des `.ts` générés après une session d'édition.

## Décision

- Utiliser **Phaser Editor v5 Core**, lancé par `npm run editor` (`scripts/editeur.sh`, variable `PHASER_EDITOR` vers l'exécutable `PhaserEditor` de Core) ou `npm run editor-remote` (`-public`).
- Retirer `phasereditor2d-launcher` (dépendance et dépendance de dev).
- Les scènes passent au format 5 **au fil de leurs modifications** ; pas de conversion massive. Une scène au format 5 n'est plus lisible par l'éditeur v3.

## Conséquences

- Éditer les scènes demande une licence Phaser Editor v5 ; le jeu, sa compilation et ses tests n'en dépendent pas (code généré versionné).
- `npm audit` : 10 → 8 vulnérabilités, plus aucune liée à l'éditeur.
- Le MCP Phaser Editor peut être relié à un agent ; il reste un outil d'édition, pas un substitut aux tests (`AGENTS.md`).

## Retour arrière

`git revert` des commits d'adoption et `npm ci` réinstallent le lanceur v3 ; les scènes déjà passées au format 5 devraient alors être restaurées depuis l'historique git.
