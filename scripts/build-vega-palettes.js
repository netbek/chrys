import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';
import {color} from 'd3-color';
import {quantizeInterpolator} from 'vega-scale/src/interpolate.js';
import {scheme} from 'vega-scale/src/schemes.js';
import {
  VEGA_CONTINUOUS,
  VEGA_DISCRETE,
  jsSerialize,
  pySerialize
} from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsFile = path.join(__dirname, '../data/vega-palettes.js');
const pyFile = path.join(__dirname, '../chrys/data/vega_palettes.py');
const vars = {
  constantNames: {},
  vendorNames: {},
  palettes: {}
};
let maxSize = 0;

Object.keys(VEGA_DISCRETE).forEach((vendorName) => {
  const uniqueName = 'vega_' + vendorName.toLowerCase();
  const constantName = _.snakeCase('vega_' + vendorName).toUpperCase();

  vars.constantNames[constantName] = uniqueName;
  vars.vendorNames[vendorName.toLowerCase()] = constantName;
  vars.palettes[uniqueName] = {};
  maxSize = Math.max(maxSize, scheme(vendorName).length);

  for (let i = 1; i <= scheme(vendorName).length; i++) {
    vars.palettes[uniqueName][i] = scheme(vendorName).slice(0, i);
  }
});

Object.keys(VEGA_CONTINUOUS).forEach((vendorName) => {
  const uniqueName = 'vega_' + vendorName.toLowerCase();
  const constantName = _.snakeCase('vega_' + vendorName).toUpperCase();

  vars.constantNames[constantName] = uniqueName;
  vars.vendorNames[vendorName.toLowerCase()] = constantName;
  vars.palettes[uniqueName] = {};
  maxSize = Math.max(maxSize, 9);

  for (let i = 1; i <= 9; i++) {
    vars.palettes[uniqueName][i] = quantizeInterpolator(
      scheme(vendorName),
      i
    ).map((d) => color(d).formatHex());
  }

  if (~['viridis', 'magma', 'inferno', 'plasma'].indexOf(vendorName)) {
    maxSize = Math.max(maxSize, 256);

    vars.palettes[uniqueName][256] = quantizeInterpolator(
      scheme(vendorName),
      256
    ).map((d) => color(d).formatHex());
  }
});

fs.outputFile(jsFile, jsSerialize('vega', vars, maxSize));
fs.outputFile(pyFile, pySerialize('vega', vars, maxSize));
