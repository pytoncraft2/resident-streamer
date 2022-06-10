import * as fs from 'fs';
import path from 'path'
const nomFichierCourant = path.basename(__filename);
export const Aptitudes = {};
const touche = {}
const lesTouches = {}

//import de toute les Aptitudes des personnages
fs.readdir('./src/server/game/scenes/Aptitudes', (_err, files) => {
  files.forEach((file) => {
    import('./' + file).then((m) => {
      if (file != nomFichierCourant)
      {
        //capture d'un tableau
        Object.values(m).forEach((element, i) => {
          //capture de tout les element d'un tableau (fichier)
          // const sym1 = element
          // const o = {
            // [sym1]: element
          // };

          let index = element.toString().split(' ')[1].indexOf("__")
          if (index != -1) {
            let CLE = element.toString().split(' ')[1].substr(index+2).split('(')[0]
            const personnage = file.substring(0, file.lastIndexOf('.'))

            if (lesTouches[personnage] === undefined) lesTouches[personnage] = {}
            lesTouches[personnage][CLE] = element
            // lesTouches[personnage][CLE] = element
            // console.log(file.substring(0, file.lastIndexOf('.')))
          }
          let underscoreRecherche = element.toString().split(' ')[1].substr(index+2)[0]

            // console.log("INDEX:", i)
            touche[`${underscoreRecherche}`] = Object.values(m)[i]
          // toString()[0]
        })
        Aptitudes[file.substring(0, file.lastIndexOf('.'))] = {
          stats: Object.values(m)[0],
          toucheA: Object.values(m)[1],
          toucheZ: Object.values(m)[2],
          toucheE: Object.values(m)[3],
          toucheR: Object.values(m)[4],
          toucheEspace: Object.values(m)[5]
        }

      }
    });
  });
});

setTimeout(() => {
console.log(lesTouches)
}, 4000);

// StatsSupplementaire
