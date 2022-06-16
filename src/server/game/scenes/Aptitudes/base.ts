import * as fs from 'fs';
import path from 'path'
const nomFichierCourant = path.basename(__filename);

export const Aptitudes = {};

//import de toute les Aptitudes des personnages selon les touches disponibles
//import toute les fonction du dossier "Aptitudes"

const dirents = fs.readdirSync('./src/server/game/scenes/Aptitudes', { withFileTypes: true })
.filter(dirent => dirent.isFile())
    .map(file => {
      import('./' + file.name).then((m) => {
        //Excepté le fichier lui-meme
        if (file.name != nomFichierCourant)
        {
          //le nom du fichier devient la clé pour l'objet (Aptitudes)
          const personnage = file.name.substring(0, file.name.lastIndexOf('.'))
          Object.values(m).forEach((fn, i) => {
            console.log(m)
            //regarde si la fonction contien un undescord
            let index = fn.toString().split(' ')[1].indexOf("__")
            if (index != -1)
            {
              let CLE = fn.toString().split(' ')[1].substr(index+2).split('(')[0]
              if (Aptitudes[personnage] === undefined) Aptitudes[personnage] = {}
              //la CLE correspond au mot après l'underscord (example: Aptitudes['fakhear']['A'])
              Aptitudes[personnage][CLE] = fn
              //fn correspond à la fonction qui active l'aptitudes
            }
          })
        }
      });
    });
