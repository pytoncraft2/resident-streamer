---
name: adr
description: Rédige un enregistrement de décision d'architecture (ADR) dans docs/adr/ pour Resident Streamer — à utiliser quand un choix structurel est acté ou doit être instruit (moteur serveur Phaser 4, contrats partagés, modèle d'IA d'un boss…).
argument-hint: "[titre de la décision]"
---

# Rédiger un ADR

1. Lister `docs/adr/` (le créer s'il n'existe pas). Numéroter à la suite sur 3 chiffres : `docs/adr/NNN-titre-en-kebab-case.md`.
   - Les numéros ADR-001 (moteur/physique serveur Phaser 4), ADR-002 (contrats partagés) et ADR-003 (IA du premier boss) sont réservés par `ROADMAP_MODERNISATION.md` : réutiliser ces numéros pour ces sujets.
2. Remplir le modèle ci-dessous à partir du code et des essais **réellement effectués**. Ne pas inventer de résultat de spike : un point non vérifié est noté « à vérifier ».
3. Statut `Proposé` tant que l'utilisateur n'a pas validé ; ne passer à `Accepté` que sur sa demande.
4. Mettre à jour la ligne correspondante du « Journal de décision » de `ROADMAP_MODERNISATION.md`.

## Modèle

```markdown
# ADR-NNN — Titre

- **Statut :** Proposé | Accepté | Remplacé par ADR-XXX
- **Date :** AAAA-MM-JJ

## Contexte
Problème, contraintes (autorité serveur, contrats réseau, Phaser HEADLESS côté serveur…), faits constatés avec références de fichiers.

## Options étudiées
### Option A — …
Avantages / inconvénients / coût / preuve (lien vers le spike, la branche, le test).

## Décision
Option retenue et justification.

## Conséquences
Impacts sur le code, le protocole réseau, les tests ; dette acceptée.

## Plan de retour arrière
Comment revenir à l'état précédent si la décision échoue.
```
