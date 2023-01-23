## Resident Streamer
### Un jeu 2D speedrun multijoueur de 2 à 4 joueurs
Jeu multijoueur en ligne 🥷 - speedrun Phaser 3 + Colyseus + Phaser Editor 2D + Typescript
disponible sur le site:
- http://resident-streamer.herokuapp.com/

### Description

La scène se passe dans une maison composée de plusieurs pièces.

A travers cette maison votre équipe composée de 2 à 4 personnes a pour mission de supprimer les boss dans chaque pièce le plus rapidement possible.

Vous pouvez incarner 4 personnages streamers :

- Fakhear: personnage résistant et spécialisé aux corps-à-corps
- Huzounet: personnage qui attaquent à distance et dont ça résistance laisse à désirer.
- Akhizonah: personnage poseur de pièges
- Osmosiscoop : personnage qui consiste à soigner ses alliés

Le temps sera arrêté lorsque vous aurez vaincu tous les boss des pièces. Ce temps sera le score de l’équipe qui sera ajouté à la liste du classement avec le nom de l’équipe choisi et ses membres. Pour être le premier dans le classement il faut avoir le temps le plus petit.

## Vidéos 🎥 & Images

__(cliquez pour voir la vidéo)__

[![Démo 1](https://img.youtube.com/vi/VZUTvlFXNag/maxresdefault.jpg)](https://youtu.be/2GCkF1rgLWI)

[![Démo 2](https://img.youtube.com/vi/2GCkF1rgLWI/maxresdefault.jpg)](https://youtu.be/VZUTvlFXNag)

## Images

![Image démo](static/c4.png?raw=true "Jeu")
![Image démo](static/ce1.png?raw=true "Jeu")
![Image démo](static/c5.png?raw=true "Jeu")
![Image démo](static/c3.png?raw=true "Jeu")

## TODO 📋

- [ ] Boss final
- [ ] Optimisation code
- [ ] Choisir un nom d'équipe
- [ ] Choisir un pseudo

## Démarrer le projet 🧪

```
npm i
npm run serve:server
npm run dev
```

installer PhaserEditor https://phasereditor2d.com/downloads/ (facultatif)

## Autre

Produire la documentation

```
npm run doc:client
npm run doc:server

ou

npm run doc
```

### Tester tous les personnages (boss ou joueurs)

__JOUEURS__

http://localhost:3001/test?p=fakhear

http://localhost:3001/test?p=huzounet

http://localhost:3001/test?p=akhizonah

http://localhost:3001/test?p=osmosiscoop

__BOSS__

http://localhost:3001/test?p=manette

http://localhost:3001/test?p=boss_1

http://localhost:3001/test?p=twitchman

http://localhost:3001/test?p=troll

## Sources

https://github.com/geckosio/phaser3-multiplayer-game-example

https://www.colyseus.io/

https://phasereditor2d.com/

https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/

https://typedoc.org/

https://tsdoc.org/

https://vitejs.dev/
