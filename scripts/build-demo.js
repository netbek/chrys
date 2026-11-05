import _ from 'lodash';
import fs from 'fs-extra';
import {globby} from 'globby';
import nunjucks from 'nunjucks';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  BOKEH,
  VEGA,
  BOKEH_PALETTE_NAMES,
  VEGA_PALETTE_NAMES,
  CATEGORICAL_PALETTE_VENDORS,
  DIVERGING_PALETTE_VENDORS,
  SEQUENTIAL_PALETTE_VENDORS,
  CYCLICAL_PALETTE_VENDORS,
  bestColorContrast,
  docsPalette,
  parsePaletteName,
  discretePalette
} from '../src/js/index.ts';

/**
 * Copies vendor and demo assets, builds the palette context, and renders the
 * demo page.
 *
 * @param {string} packageDir Package directory containing the demo sources.
 * @param {string} destDir Directory to write the built demo to.
 * @returns {Promise<void>}
 */
async function buildDemo(packageDir, destDir) {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(packageDir)
  );

  env.addFilter('best_color_contrast', bestColorContrast);

  const copyFiles = [
    {
      patterns: [path.join(packageDir, 'node_modules/jquery/dist/*.js')],
      base: 'node_modules',
      destBase: 'vendor'
    },
    {
      patterns: [path.join(packageDir, 'node_modules/normalize-css/*.css')],
      base: 'node_modules',
      destBase: 'vendor'
    },
    {
      patterns: [
        path.join(packageDir, 'node_modules/prismjs/**/*.js'),
        path.join(packageDir, 'node_modules/prismjs/themes/*.css')
      ],
      base: 'node_modules',
      destBase: 'vendor'
    },
    {
      patterns: [
        path.join(packageDir, 'node_modules/prism-themes/themes/*.css')
      ],
      base: 'node_modules',
      destBase: 'vendor'
    },
    {
      patterns: [path.join(packageDir, 'css/**/*.css')],
      base: 'css'
    },
    {
      patterns: [path.join(packageDir, 'src/demo/**/*.css')],
      base: 'src/demo',
      destBase: ''
    },
    {
      patterns: [path.join(packageDir, 'src/demo/**/*.js')],
      base: 'src/demo',
      destBase: ''
    }
  ];

  const BOKEH_PALETTE_NAMES_MAP = _.zipObject(
    Object.keys(BOKEH_PALETTE_NAMES).map((k) => BOKEH_PALETTE_NAMES[k]),
    Object.keys(BOKEH_PALETTE_NAMES)
  );

  const VEGA_PALETTE_NAMES_MAP = _.zipObject(
    Object.keys(VEGA_PALETTE_NAMES).map((k) => VEGA_PALETTE_NAMES[k]),
    Object.keys(VEGA_PALETTE_NAMES)
  );

  /**
   * Builds the demo data for a single palette.
   *
   * @param {string} name Palette name.
   * @param {number[]} [discreteSizes] Sizes of the discrete palettes to build.
   * @returns {object|undefined} The demo item, or `undefined` if no name is
   * given.
   */
  function getItem(name, discreteSizes) {
    if (!name) {
      return undefined;
    }

    const {vendor, palette: vendorName} = parsePaletteName(name);
    let jsVar;
    let discretePalettes;

    if (vendor === BOKEH) {
      jsVar = BOKEH_PALETTE_NAMES_MAP[name];
    } else if (vendor === VEGA) {
      jsVar = VEGA_PALETTE_NAMES_MAP[name];
    }

    const pythonVar = jsVar;
    const sassVar = _.kebabCase(jsVar);

    if (discreteSizes) {
      discretePalettes = discreteSizes.map((i) => discretePalette(name, i));
    }

    const palette = docsPalette(name);

    return {
      jsVar,
      pythonVar,
      sassVar,
      name,
      vendorName,
      palette,
      discretePalettes
    };
  }

  const categoricalPalettes = CATEGORICAL_PALETTE_VENDORS.filter(
    (x) => x[BOKEH] || x[VEGA]
  ).map((x) => ({
    [BOKEH]: getItem(x[BOKEH]),
    [VEGA]: getItem(x[VEGA])
  }));

  const divergingPalettes = DIVERGING_PALETTE_VENDORS.filter(
    (x) => x[BOKEH] || x[VEGA]
  ).map((x) => ({
    [BOKEH]: getItem(x[BOKEH], [3, 5, 7, 9]),
    [VEGA]: getItem(x[VEGA], [3, 5, 7, 9])
  }));

  const sequentialPalettes = SEQUENTIAL_PALETTE_VENDORS.filter(
    (x) => x[BOKEH] || x[VEGA]
  ).map((x) => ({
    [BOKEH]: getItem(x[BOKEH], [3, 4, 5, 6, 7, 8, 9]),
    [VEGA]: getItem(x[VEGA], [3, 4, 5, 6, 7, 8, 9])
  }));

  const cyclicalPalettes = CYCLICAL_PALETTE_VENDORS.filter(
    (x) => x[BOKEH] || x[VEGA]
  ).map((x) => ({
    [BOKEH]: getItem(x[BOKEH]),
    [VEGA]: getItem(x[VEGA])
  }));

  const context = {
    categoricalPalettes,
    divergingPalettes,
    sequentialPalettes,
    cyclicalPalettes
  };

  for (const d of copyFiles) {
    const files = await globby(d.patterns);

    for (const file of files) {
      const x = file.substring(path.join(packageDir, d.base).length);
      const y = path.join(destDir, _.get(d, 'destBase', d.base), x);
      const z = path.dirname(y);

      await fs.mkdirp(z);
      await fs.copy(file, y);
    }
  }

  const data = await fs.readFile(
    path.join(packageDir, 'src/demo/index.njk'),
    'utf-8'
  );

  const res = await new Promise((resolve, reject) => {
    env.renderString(data, context, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

  await fs.outputFile(path.join(destDir, 'index.html'), res.trim(), 'utf-8');
}

const packageDir = fileURLToPath(new URL('..', import.meta.url));
const destDir = path.join(packageDir, 'dist/demo');

await fs.remove(destDir);
await buildDemo(packageDir, destDir);
