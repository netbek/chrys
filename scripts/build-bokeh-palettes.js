import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';
import {
  BOKEH_CONTINUOUS,
  BOKEH_DISCRETE,
  jsSerialize,
  pySerialize,
  toVegaName
} from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsFile = path.join(__dirname, '../data/bokeh-palettes.js');
const pyFile = path.join(__dirname, '../chrys/data/bokeh_palettes.py');
const vars = {
  constantNames: {},
  vendorNames: {},
  palettes: {}
};
let maxSize = 0;

_.forEach(BOKEH_DISCRETE, (palettes, vendorName) => {
  const uniqueName = 'bokeh_' + vendorName;
  const constantName = _.snakeCase(
    'bokeh_' + toVegaName(vendorName)
  ).toUpperCase();

  vars.constantNames[constantName] = uniqueName;
  vars.vendorNames[vendorName] = constantName;
  vars.palettes[uniqueName] = {};

  _.forEach(palettes, (palette) => {
    maxSize = Math.max(maxSize, palette.length);
    vars.palettes[uniqueName][palette.length] = palette.map(
      (d) => '#' + _.padStart(d.toString(16), 8, '0').substring(0, 6)
    );
  });
});

_.forEach(BOKEH_CONTINUOUS, (palettes, vendorName) => {
  const uniqueName = 'bokeh_' + vendorName;
  const constantName = _.snakeCase(
    'bokeh_' + toVegaName(vendorName)
  ).toUpperCase();

  vars.constantNames[constantName] = uniqueName;
  vars.vendorNames[vendorName] = constantName;
  vars.palettes[uniqueName] = {};

  _.forEach(palettes, (palette) => {
    maxSize = Math.max(maxSize, palette.length);
    vars.palettes[uniqueName][palette.length] = palette.map(
      (d) => '#' + _.padStart(d.toString(16), 8, '0').substring(0, 6)
    );
  });
});

fs.outputFile(jsFile, jsSerialize('bokeh', vars, maxSize));
fs.outputFile(pyFile, pySerialize('bokeh', vars, maxSize));
