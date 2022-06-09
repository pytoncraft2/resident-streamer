import * as fs from 'fs';
import path from 'path'
const nomFichierCourant = path.basename(__filename);
export const Aptitudes = {};

//import de toute les Aptitudes des personnages
fs.readdir('./src/server/game/scenes/Aptitudes', (_err, files) => {
  files.forEach((file) => {
    import('./' + file).then((m) => {
      if (file != nomFichierCourant)
      {
        //capture d'un tableau
        Object.values(m).forEach(element => {
          //capture de tout les element d'un tableau (fichier)
          const sym1 = element
          const o = {
            [sym1]: element
          };
          
          console.log(o[sym1].name)
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

// setTimeout(() => {
// console.log(Aptitudes)
// }, 3000);

// StatsSupplementaire
