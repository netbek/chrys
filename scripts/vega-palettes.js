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
const vars = {names: {}, originalNames: {}, palettes: {}};
let maxSize = 9;

Object.keys(discrete).forEach(name => {
  const paletteName = _.snakeCase('vega_' + name).toLowerCase();

  vars.names[paletteName.toUpperCase()] = paletteName;
  vars.originalNames[name] = paletteName.toUpperCase();
  vars.palettes[paletteName] = {};
  maxSize = Math.max(maxSize, scheme(name).length);

  for (let i = 1; i <= scheme(name).length; i++) {
    vars.palettes[paletteName][i] = scheme(name).slice(0, i);
  }
});

Object.keys(continuous).forEach(name => {
  const paletteName = _.snakeCase('vega_' + name).toLowerCase();

  vars.names[paletteName.toUpperCase()] = paletteName;
  vars.originalNames[name] = paletteName.toUpperCase();
  vars.palettes[paletteName] = {};
  maxSize = Math.max(maxSize, continuous[name].length / 6);

  for (let i = 1; i <= 9; i++) {
    vars.palettes[paletteName][i] = quantizeInterpolator(scheme(name), i).map(
      d => color(d).formatHex()
    );
  }

  if (~['viridis', 'magma', 'inferno', 'plasma'].indexOf(name)) {
    maxSize = Math.max(maxSize, 256);

    vars.palettes[paletteName][256] = quantizeInterpolator(
      scheme(name),
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
_.forEach(vars.names, (v, k) => {
  data += k + ' = "' + v + '"\n';
});
data += '\n';

// Original names
data += `${basename.toUpperCase()} = {}\n`;
_.forEach(vars.originalNames, (v, k) => {
  data += `${basename.toUpperCase()}['${k}'] = ${(
    basename + '_data'
  ).toUpperCase()}[${v}]\n`;
});

fs.outputFile(file, data);
