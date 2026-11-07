import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';
import {color} from 'd3-color';
import {
  D3_CONTINUOUS,
  D3_DISCRETE,
  jsSerialize,
  pySerialize,
  quantizeInterpolator,
  toVegaName
} from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsFile = path.join(__dirname, '../data/d3-palettes.js');
const pyFile = path.join(__dirname, '../chrys/data/d3_palettes.py');
const vars = {
  constantNames: {},
  vendorNames: {},
  palettes: {}
};
let maxSize = 0;

_.forEach(D3_DISCRETE, (scheme, schemeName) => {
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
});

_.forEach(D3_CONTINUOUS, (interpolator, schemeName) => {
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
});

fs.outputFile(jsFile, jsSerialize('d3', vars, maxSize));
fs.outputFile(pyFile, pySerialize('d3', vars, maxSize));
