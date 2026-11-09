#!/bin/sh
# Lance Phaser Editor v5 (Core) sur ce projet : http://127.0.0.1:1959/editor
# PHASER_EDITOR doit pointer vers l'exécutable PhaserEditor du Core décompressé, par exemple :
#   export PHASER_EDITOR="$HOME/outils/PhaserEditor/PhaserEditor"
# Options supplémentaires transmises telles quelles (ex. -public pour un accès depuis le réseau).
set -eu
: "${PHASER_EDITOR:?Définissez PHASER_EDITOR=/chemin/vers/PhaserEditor (Phaser Editor v5 Core, https://phaser.io/editor)}"
racine=$(cd "$(dirname "$0")/.." && pwd)
exec "$PHASER_EDITOR" -project "$racine" "$@"
