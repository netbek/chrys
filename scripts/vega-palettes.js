import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {color} from 'd3-color';
import {discrete, continuous} from 'vega-scale/src/palettes';
import {scheme, quantizeInterpolator} from 'vega-scale';

const basename = _.snakeCase(
  path.basename(__filename, path.extname(__filename))
);
const file = path.join(__dirname, '../chrys/data/' + basename + '.py');
const vars = {constantNames: {}, vendorNames: {}, palettes: {}};
let maxSize = 0;

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
});

Object.keys(continuous).forEach(vendorName => {
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
    ).map(d => color(d).formatHex());
  }

  if (~['viridis', 'magma', 'inferno', 'plasma'].indexOf(vendorName)) {
    maxSize = Math.max(maxSize, 256);

    vars.palettes[uniqueName][256] = quantizeInterpolator(
      scheme(vendorName),
      256
    ).map(d => color(d).formatHex());
  }
});

// Serialise data
let data = '';

// Palettes
data +=
  (basename + '_data').toUpperCase() +
  ' = ' +
  JSON.stringify(vars.palettes, null, 2) +
  '\n';
_.times(maxSize, i => {
  data = data.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
});
data += '\n';

// Names
_.forEach(vars.constantNames, (v, k) => {
  data += k + ' = "' + v + '"\n';
});
data += '\n';

// Vendor names
data += `${basename.toUpperCase()} = {}\n`;
_.forEach(vars.vendorNames, (v, k) => {
  data += `${basename.toUpperCase()}['${k}'] = ${(
    basename + '_data'
  ).toUpperCase()}[${v}]\n`;
});

fs.outputFile(file, data);
