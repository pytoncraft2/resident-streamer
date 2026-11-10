/**
 * Cohérence des ressources graphiques avec les personnages : « tout matche » est vérifié ici plutôt
 * qu'espéré. Pour chaque personnage du registre des aptitudes (serveur compilé) :
 * - son atlas client `<nom>_atlas` est déclaré dans l'asset pack et son fichier existe ;
 * - chaque image de ses animations existe dans l'atlas serveur (`fakhear_atlas.json`, chargé sous
 *   la clé `atlas` par hall.ts) et dans son atlas client (le client affiche le nom d'image publié) ;
 * - un personnage jouable a son icône `icon_<nom>` et les images des animations communes jouées.
 *
 * Écarts connus, sans effet en jeu aujourd'hui (non exigés) : les animations communes jamais jouées
 * (`goback`, `front`, `jump`, `saut`, `sautPreparation`) manquent à plusieurs atlas client ; boss_1,
 * troll et super_boss n'ont pas d'images de marche (boss_1 et troll remplacent la marche par leur
 * déplacement) ; super_boss n'a pas d'icône (elle ne sert qu'à la fusion avec un boss vaincu, et la
 * défaite du boss final termine la partie).
 */
import { strict as assert } from "assert";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { PERSONNAGES_JOUABLES } from "../../src/shared/personnages";
import { lireRegistre, RegistreLu } from "../helpers/registre";

const ASSETS = path.resolve(__dirname, "../../static/assets");

/** Animations communes réellement jouées (Stats/Defaut.ts : `walk`, `idle_walk`). */
const COMMUNES_JOUEES = ["walk", "idle_walk"];

interface FichierAssetPack {
  readonly type?: string;
  readonly key?: string;
  readonly atlasURL?: string;
}

/** Noms des images d'un atlas JSON (formats « textures » multi-atlas ou « frames »). */
function imagesDe(fichier: string): Set<string> {
  const json = JSON.parse(readFileSync(path.join(ASSETS, fichier), "utf-8")) as {
    textures?: { frames: { filename: string }[] }[];
    frames?: { filename: string }[] | Record<string, unknown>;
  };
  if (json.textures) return new Set(json.textures.flatMap((t) => t.frames.map((f) => f.filename)));
  if (Array.isArray(json.frames)) return new Set(json.frames.map((f) => f.filename));
  return new Set(Object.keys(json.frames ?? {}));
}

const manquantes = (images: readonly string[], atlas: Set<string>): string[] => images.filter((i) => !atlas.has(i));

describe("ressources graphiques des personnages (cohérence)", function () {
  this.timeout(90000);
  let lu: RegistreLu;
  let atlasClients: Map<string, string>;
  const atlasServeur = imagesDe("fakhear_atlas.json");
  const icones = imagesDe("icons_atlas.json");

  before(async function () {
    lu = await lireRegistre();
    const pack = JSON.parse(readFileSync(path.join(ASSETS, "asset-pack.json"), "utf-8")) as Record<string, { files?: FichierAssetPack[] }>;
    atlasClients = new Map(
      Object.values(pack)
        .flatMap((section) => section.files ?? [])
        .filter((f) => f.type === "atlas" && f.key !== undefined && f.atlasURL !== undefined)
        .map((f) => [f.key as string, path.basename(f.atlasURL as string)]),
    );
  });

  it("le registre contient chaque personnage jouable du catalogue partagé", function () {
    for (const nom of PERSONNAGES_JOUABLES) assert.ok(lu.registre[nom], `${nom} absent du registre des aptitudes`);
  });

  it("chaque personnage a son atlas client déclaré dans l'asset pack, et le fichier existe", function () {
    for (const nom of Object.keys(lu.registre)) {
      const fichier = atlasClients.get(`${nom}_atlas`);
      assert.ok(fichier, `${nom}_atlas absent de static/assets/asset-pack.json`);
      assert.ok(existsSync(path.join(ASSETS, fichier)), `fichier ${fichier} introuvable`);
    }
  });

  it("chaque image d'animation existe dans l'atlas serveur (communes comprises)", function () {
    const animations = [...lu.communes, ...Object.values(lu.registre).flatMap((e) => e.animations ?? [])];
    for (const a of animations) assert.deepEqual(manquantes(a.images, atlasServeur), [], `animation ${a.cle}`);
  });

  it("chaque image où le coup porte fait partie de son animation", function () {
    for (const [nom, e] of Object.entries(lu.registre)) {
      for (const a of e.animations ?? []) {
        if (a.imageQuiBlesse === undefined || a.imageQuiBlesse === "toutes") continue;
        assert.ok(a.images.includes(a.imageQuiBlesse), `${nom} · ${a.cle} : ${a.imageQuiBlesse} hors de ${a.images.join(", ")}`);
      }
    }
  });

  for (const nom of ["fakhear", "akhizonah", "huzounet", "osmosiscoop", "boss_1", "manette", "troll", "twitchman", "super_boss"]) {
    it(`${nom} : les images de ses animations sont dans son atlas client`, function () {
      const fichier = atlasClients.get(`${nom}_atlas`);
      assert.ok(fichier);
      const atlas = imagesDe(fichier);
      for (const a of lu.registre[nom]?.animations ?? []) assert.deepEqual(manquantes(a.images, atlas), [], `animation ${a.cle}`);
    });
  }

  for (const nom of PERSONNAGES_JOUABLES) {
    it(`${nom} (jouable) : icône et images des animations communes jouées`, function () {
      assert.ok(icones.has(`icon_${nom}`), `icon_${nom} absente de icons_atlas.json`);
      const fichier = atlasClients.get(`${nom}_atlas`);
      assert.ok(fichier);
      const atlas = imagesDe(fichier);
      for (const a of lu.communes.filter((c) => COMMUNES_JOUEES.includes(c.cle))) {
        assert.deepEqual(manquantes(a.images, atlas), [], `animation commune ${a.cle}`);
      }
    });
  }
});
