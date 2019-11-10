import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {color} from 'd3-color';
import {discrete, continuous} from 'vega-scale/src/palettes';
import {scheme, quantizeInterpolator} from 'vega-scale';
import {continuousPalette} from './utils';

function getColors(palette) {
  var n = (palette.length / 6) | 0;
  var c = new Array(n);
  var i = 0;
  while (i < n) c[i] = '#' + palette.slice(i * 6, ++i * 6);
  return c;
}

const basename = _.snakeCase(
  path.basename(__filename, path.extname(__filename))
);
const file = path.join(__dirname, '../chrys/data/' + basename + '.py');
const vars = {
  constantNames: {},
  vendorNames: {},
  palettes: {},
  docsPalettes: {}
};
let maxSize = 0;
const docsMaxSize = 11;

Object.keys(discrete).forEach(vendorName => {
  const uniqueName = 'vega_' + vendorName.toLowerCase();
  const constantName = _.snakeCase('vega_' + vendorName).toUpperCase();

  vars.constantNames[constantName] = uniqueName;
  vars.vendorNames[vendorName.toLowerCase()] = constantName;
  vars.palettes[uniqueName] = {};
  maxSize = Math.max(maxSize, scheme(vendorName).length);

  for (let i = 1; i <= scheme(vendorName).length; i++) {
    vars.palettes[uniqueName][i] = scheme(vendorName).slice(0, i);
  }

  vars.docsPalettes[uniqueName] = scheme(vendorName);
});

Object.keys(continuous).forEach(vendorName => {
  const uniqueName = 'vega_' + vendorName.toLowerCase();
  const constantName = _.snakeCase('vega_' + vendorName).toUpperCase();
  const docsPalette = getColors(continuous[vendorName]);

  vars.constantNames[constantName] = uniqueName;
  vars.vendorNames[vendorName.toLowerCase()] = constantName;
  vars.palettes[uniqueName] = {};
  maxSize = Math.max(maxSize, 9);

  for (let i = 1; i <= 9; i++) {
    vars.palettes[uniqueName][i] = quantizeInterpolator(
      scheme(vendorName),
      i
    ).map(d => color(d).formatHex());
  }

  if (~['viridis', 'magma', 'inferno', 'plasma'].indexOf(vendorName)) {
    maxSize = Math.max(maxSize, 256);

    vars.palettes[uniqueName][256] = quantizeInterpolator(
      scheme(vendorName),
      256
    ).map(d => color(d).formatHex());
  }

  vars.docsPalettes[uniqueName] = continuousPalette(docsPalette, docsMaxSize);
});

// Serialise data
const VEGA_PALETTES = 'VEGA_PALETTES';
const VEGA_PALETTE_DATA = 'VEGA_PALETTE_DATA';
const VEGA_PALETTE_NAMES = 'VEGA_PALETTE_NAMES';
const VEGA_DOCS_PALETTES = 'VEGA_DOCS_PALETTES';
const VEGA_DOCS_PALETTE_DATA = 'VEGA_DOCS_PALETTE_DATA';

let data = '';

data +=
  VEGA_PALETTE_DATA + ' = ' + JSON.stringify(vars.palettes, null, 2) + '\n';
_.times(maxSize, i => {
  data = data.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
});
data += '\n';

data +=
  VEGA_DOCS_PALETTE_DATA +
  ' = ' +
  JSON.stringify(vars.docsPalettes, null, 2) +
  '\n';
_.times(docsMaxSize, i => {
  data = data.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
});
data += '\n';

_.forEach(vars.constantNames, (v, k) => {
  data += k + ' = "' + v + '"\n';
});
data += '\n';

data += `${VEGA_PALETTE_NAMES} = {}\n`;
_.forEach(vars.constantNames, (v, k) => {
  data += `${VEGA_PALETTE_NAMES}['${k}'] = '${v}'\n`;
});
data += '\n';

data += `${VEGA_PALETTES} = {}\n`;
_.forEach(vars.vendorNames, (v, k) => {
  data += `${VEGA_PALETTES}['${k}'] = ${VEGA_PALETTE_DATA}[${v}]\n`;
});
data += '\n';

data += `${VEGA_DOCS_PALETTES} = {}\n`;
_.forEach(vars.vendorNames, (v, k) => {
  data += `${VEGA_DOCS_PALETTES}['${k}'] = ${VEGA_DOCS_PALETTE_DATA}[${v}]\n`;
});

fs.outputFile(file, data);
