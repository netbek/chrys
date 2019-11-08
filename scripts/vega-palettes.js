import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {color} from 'd3-color';
import {scaleQuantile} from 'd3-scale';
import {discrete, continuous} from 'vega-scale/src/palettes';
import {scheme, quantizeInterpolator} from 'vega-scale';

function getColors(palette) {
  var n = (palette.length / 6) | 0;
  var c = new Array(n);
  var i = 0;
  while (i < n) c[i] = '#' + palette.slice(i * 6, ++i * 6);
  return c;
}

function continuousPalette(colors, count) {
  const scale = scaleQuantile(_.times(count, i => i), colors);
  return _.times(count, i => scale(i));
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

// Documentation palettes
data +=
  (basename + '_docs_data').toUpperCase() +
  ' = ' +
  JSON.stringify(vars.docsPalettes, null, 2) +
  '\n';
_.times(docsMaxSize, i => {
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
data += '\n';

// Documentation palettes
data += `${(basename + '_docs').toUpperCase()} = {}\n`;
_.forEach(vars.vendorNames, (v, k) => {
  data += `${(basename + '_docs').toUpperCase()}['${k}'] = ${(
    basename + '_docs_data'
  ).toUpperCase()}[${v}]\n`;
});

fs.outputFile(file, data);
