import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';
import {color} from 'd3-color';
import {
  schemeAccent,
  schemeCategory10,
  schemeDark2,
  schemeObservable10,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
  schemeTableau10,
  schemeBrBG,
  schemePRGn,
  schemePiYG,
  schemePuOr,
  schemeRdBu,
  schemeRdGy,
  schemeRdYlBu,
  schemeRdYlGn,
  schemeSpectral,
  schemeBuGn,
  schemeBuPu,
  schemeGnBu,
  schemeOrRd,
  schemePuBuGn,
  schemePuBu,
  schemePuRd,
  schemeRdPu,
  schemeYlGnBu,
  schemeYlGn,
  schemeYlOrBr,
  schemeYlOrRd,
  schemeBlues,
  schemeGreens,
  schemeGreys,
  schemeOranges,
  schemePurples,
  schemeReds,
  interpolateCividis,
  interpolateCubehelixDefault,
  interpolateRainbow,
  interpolateWarm,
  interpolateCool,
  interpolateSinebow,
  interpolateTurbo,
  interpolateViridis,
  interpolateMagma,
  interpolateInferno,
  interpolatePlasma
} from 'd3-scale-chromatic';
import {
  continuousPalette,
  jsSerialize,
  pySerialize,
  toVegaName
} from './utils.js';

const discrete = {
  Accent: [schemeAccent],
  Category10: [schemeCategory10],
  Dark2: [schemeDark2],
  Observable10: [schemeObservable10],
  Paired: [schemePaired],
  Pastel1: [schemePastel1],
  Pastel2: [schemePastel2],
  Set1: [schemeSet1],
  Set2: [schemeSet2],
  Set3: [schemeSet3],
  Tableau10: [schemeTableau10],
  BrBG: schemeBrBG,
  PRGn: schemePRGn,
  PiYG: schemePiYG,
  PuOr: schemePuOr,
  RdBu: schemeRdBu,
  RdGy: schemeRdGy,
  RdYlBu: schemeRdYlBu,
  RdYlGn: schemeRdYlGn,
  Spectral: schemeSpectral,
  BuGn: schemeBuGn,
  BuPu: schemeBuPu,
  GnBu: schemeGnBu,
  OrRd: schemeOrRd,
  PuBuGn: schemePuBuGn,
  PuBu: schemePuBu,
  PuRd: schemePuRd,
  RdPu: schemeRdPu,
  YlGnBu: schemeYlGnBu,
  YlGn: schemeYlGn,
  YlOrBr: schemeYlOrBr,
  YlOrRd: schemeYlOrRd,
  Blues: schemeBlues,
  Greens: schemeGreens,
  Greys: schemeGreys,
  Oranges: schemeOranges,
  Purples: schemePurples,
  Reds: schemeReds
};

const continuous = {
  Cividis: interpolateCividis,
  CubehelixDefault: interpolateCubehelixDefault,
  Rainbow: interpolateRainbow,
  Warm: interpolateWarm,
  Cool: interpolateCool,
  Sinebow: interpolateSinebow,
  Turbo: interpolateTurbo,
  Viridis: interpolateViridis,
  Magma: interpolateMagma,
  Inferno: interpolateInferno,
  Plasma: interpolatePlasma
};

function quantizeInterpolator(interpolator, count) {
  return _.times(count, (i) =>
    color(interpolator((i + 1) / (count + 1))).formatHex()
  );
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsFile = path.join(__dirname, '../data/d3-palettes.js');
const pyFile = path.join(__dirname, '../chrys/data/d3_palettes.py');
const vars = {
  constantNames: {},
  vendorNames: {},
  palettes: {},
  docsPalettes: {}
};
let maxSize = 0;
const docsMaxSize = 11;

_.forEach(discrete, (scheme, schemeName) => {
  const vendorName = toVegaName(schemeName);
  const uniqueName = 'd3_' + vendorName.toLowerCase();
  const constantName = 'D3_' + _.snakeCase(vendorName).toUpperCase();
  const palettes = _.compact(scheme);

  vars.constantNames[constantName] = uniqueName;
  vars.vendorNames[vendorName.toLowerCase()] = constantName;
  vars.palettes[uniqueName] = {};

  _.forEach(palettes, (palette) => {
    maxSize = Math.max(maxSize, palette.length);
    vars.palettes[uniqueName][palette.length] = palette.map((d) =>
      color(d).formatHex()
    );
  });

  const x = _.max(palettes.map((p) => p.length));
  const docsPalette = _.first(
    palettes.filter((p) => p.length === x)
  ).map((d) => color(d).formatHex());
  vars.docsPalettes[uniqueName] = docsPalette;
});

_.forEach(continuous, (interpolator, schemeName) => {
  const vendorName = toVegaName(schemeName);
  const uniqueName = 'd3_' + vendorName.toLowerCase();
  const constantName = 'D3_' + _.snakeCase(vendorName).toUpperCase();

  vars.constantNames[constantName] = uniqueName;
  vars.vendorNames[vendorName.toLowerCase()] = constantName;
  vars.palettes[uniqueName] = {};
  maxSize = Math.max(maxSize, 9);

  for (let i = 1; i <= 9; i++) {
    vars.palettes[uniqueName][i] = quantizeInterpolator(interpolator, i);
  }

  if (~['viridis', 'magma', 'inferno', 'plasma'].indexOf(vendorName)) {
    maxSize = Math.max(maxSize, 256);

    vars.palettes[uniqueName][256] = quantizeInterpolator(interpolator, 256);
  }

  vars.docsPalettes[uniqueName] = continuousPalette(
    quantizeInterpolator(interpolator, 256),
    docsMaxSize
  );
});

fs.outputFile(jsFile, jsSerialize('d3', vars, maxSize, docsMaxSize));
fs.outputFile(pyFile, pySerialize('d3', vars, maxSize, docsMaxSize));
