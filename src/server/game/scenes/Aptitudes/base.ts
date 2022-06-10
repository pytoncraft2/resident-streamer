import * as fs from 'fs';
import path from 'path'
const nomFichierCourant = path.basename(__filename);

export const Aptitudes = {};

//import de toute les Aptitudes des personnages selon les touches disponibles
//import toute les fonction du dossier "Aptitudes"

fs.readdir('./src/server/game/scenes/Aptitudes', (_err, files) => {
  files.forEach((file) => {
    import('./' + file).then((m) => {
      //Excepté le fichier lui-meme
      if (file != nomFichierCourant)
      {
        //le nom du fichier devient la clé pour l'objet (Aptitudes)
        const personnage = file.substring(0, file.lastIndexOf('.'))
        Object.values(m).forEach((fn, i) => {
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
});
