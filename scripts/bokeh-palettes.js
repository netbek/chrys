import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import {
  YlGn,
  YlGnBu,
  GnBu,
  BuGn,
  PuBuGn,
  PuBu,
  BuPu,
  RdPu,
  PuRd,
  OrRd,
  YlOrRd,
  YlOrBr,
  Purples,
  Blues,
  Greens,
  Oranges,
  Reds,
  Greys,
  PuOr,
  BrBG,
  PRGn,
  PiYG,
  RdBu,
  RdGy,
  RdYlBu,
  Spectral,
  RdYlGn,
  Inferno,
  Magma,
  Plasma,
  Viridis,
  Accent,
  Dark2,
  Paired,
  Pastel1,
  Pastel2,
  Set1,
  Set2,
  Set3,
  Category10,
  Category20,
  Category20b,
  Category20c,
  Colorblind
} from 'bokehjs/build/js/lib/api/palettes';

const discrete = {
  Category10,
  Category20,
  Category20b,
  Category20c,
  Colorblind,
  Accent,
  Dark2,
  Paired,
  Pastel1,
  Pastel2,
  Set1,
  Set2,
  Set3
};

const continuous = {
  YlGn,
  YlGnBu,
  GnBu,
  BuGn,
  PuBuGn,
  PuBu,
  BuPu,
  RdPu,
  PuRd,
  OrRd,
  YlOrRd,
  YlOrBr,
  Purples,
  Blues,
  Greens,
  Oranges,
  Reds,
  Greys,
  PuOr,
  BrBG,
  PRGn,
  PiYG,
  RdBu,
  RdGy,
  RdYlBu,
  Spectral,
  RdYlGn,
  Inferno,
  Magma,
  Plasma,
  Viridis
};

const basename = _.snakeCase(
  path.basename(__filename, path.extname(__filename))
);
const file = path.join(__dirname, '../chrys/data/' + basename + '.py');
const vars = {names: {}, palettes: {}};
let maxSize = 0;

_.forEach(discrete, (palettes, name) => {
  vars.palettes[name.toLowerCase()] = {};
  vars.names[_.snakeCase('bokeh_' + name).toUpperCase()] = name.toLowerCase();

  _.forEach(palettes, palette => {
    maxSize = Math.max(maxSize, palette.length);
    vars.palettes[name.toLowerCase()][palette.length] = palette.map(
      d => '#' + _.padStart(d.toString(16), 6, '0')
    );
  });
});

_.forEach(continuous, (palettes, name) => {
  vars.palettes[name.toLowerCase()] = {};
  vars.names[_.snakeCase('bokeh_' + name).toUpperCase()] = name.toLowerCase();

  _.forEach(palettes, palette => {
    maxSize = Math.max(maxSize, palette.length);
    vars.palettes[name.toLowerCase()][palette.length] = palette.map(
      d => '#' + _.padStart(d.toString(16), 6, '0')
    );
  });
});

// Serialise data
let data = '';

_.forEach(vars.names, (v, k) => {
  data += k + ' = "' + v + '"\n';
});
data += '\n';

data += basename.toUpperCase() + ' = ' + JSON.stringify(vars.palettes, null, 2);

// Remove quotes from numeric keys
_.times(maxSize, i => {
  data = data.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
});

fs.outputFile(file, data);
