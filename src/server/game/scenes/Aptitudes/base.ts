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
        Aptitudes[file.substring(0, file.lastIndexOf('.'))] = {
          stats: Object.values(m)[0],
          toucheA: Object.values(m)[1],
          toucheZ: Object.values(m)[2],
          toucheE: Object.values(m)[3],
          toucheR: Object.values(m)[4]
        }
      }
    });
  });
});

setTimeout(() => {
console.log(Aptitudes)
}, 3000);

// StatsSupplementaire
