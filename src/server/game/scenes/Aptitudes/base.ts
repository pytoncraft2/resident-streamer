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
        const personnage = file.substring(0, file.lastIndexOf('.'))
        Object.values(m).forEach((element, i) => {
          let index = element.toString().split(' ')[1].indexOf("__")
          // let indexStat = element.toString().split(' ')[1].indexOf("StatsSupplementaire")
          if (index != -1)
          {
            let CLE = element.toString().split(' ')[1].substr(index+2).split('(')[0]
            if (Aptitudes[personnage] === undefined) Aptitudes[personnage] = {}
            Aptitudes[personnage][CLE] = element
            console.log(CLE)
          }

          // if (indexStat != -1) {
          //   if (Aptitudes[personnage] === undefined) Aptitudes[personnage] = {}
          //   Aptitudes[personnage]['stats'] = element
          //   console.log("STAT SUPPLEMENTAIRE TROUVÉ!!")
          // }
        })
        // Aptitudes[file.substring(0, file.lastIndexOf('.'))] = {
        //   stats: Object.values(m)[0],
        //   toucheA: Object.values(m)[1],
        //   toucheZ: Object.values(m)[2],
        //   toucheE: Object.values(m)[3],
        //   toucheR: Object.values(m)[4],
        //   toucheEspace: Object.values(m)[5]
        // }

      }
    });
  });
});

setTimeout(() => {
console.log(lesTouches)
}, 4000);

setTimeout(() => {
console.log(Aptitudes)
}, 9000);

// StatsSupplementaire
