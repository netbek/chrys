import _ from 'lodash';
import {scaleQuantile} from 'd3-scale';
import log from 'fancy-log';
import path from 'path';
import Promise from 'bluebird';
import webpack from 'webpack';
import gulpConfig from '../gulp-config';
import webpackConfig from '../webpack.config.prod';
import {name as globalName} from '../package';

const BOKEH_TO_VEGA = {
  YlGn: 'yellowGreen',
  YlGnBu: 'yellowGreenBlue',
  GnBu: 'greenBlue',
  BuGn: 'blueGreen',
  PuBuGn: 'purpleBlueGreen',
  PuBu: 'purpleBlue',
  BuPu: 'bluePurple',
  RdPu: 'redPurple',
  PuRd: 'purpleRed',
  OrRd: 'orangeRed',
  YlOrRd: 'yellowOrangeRed',
  YlOrBr: 'yellowOrangeBrown',
  Purples: 'purples',
  Blues: 'blues',
  Greens: 'greens',
  Oranges: 'oranges',
  Reds: 'reds',
  Greys: 'greys',
  PuOr: 'purpleOrange',
  BrBG: 'brownBlueGreen',
  PRGn: 'purpleGreen',
  PiYG: 'pinkYellowGreen',
  RdBu: 'redBlue',
  RdGy: 'redGrey',
  RdYlBu: 'redYellowBlue',
  Spectral: 'spectral',
  RdYlGn: 'redYellowGreen',
  Inferno: 'inferno',
  Magma: 'magma',
  Plasma: 'plasma',
  Viridis: 'viridis',
  Accent: 'accent',
  Dark2: 'dark2',
  Paired: 'paired',
  Pastel1: 'pastel1',
  Pastel2: 'pastel2',
  Set1: 'set1',
  Set2: 'set2',
  Set3: 'set3',
  Category10: 'category10',
  Category20: 'category20',
  Category20b: 'category20b',
  Category20c: 'category20c',
  Colorblind: 'colorblind'
};
const VEGA_TO_BOKEH = _.invert(BOKEH_TO_VEGA);

export function continuousPalette(colors, count) {
  const scale = scaleQuantile(
    _.times(count, i => i),
    colors
  );
  return _.times(count, i => scale(i));
}

export function bokehToVega(name) {
  return BOKEH_TO_VEGA[name];
}

export function vegaToBokeh(name) {
  return VEGA_TO_BOKEH[name];
}

export function jsSerialize(vendor, vars, maxSize, docsMaxSize) {
  const VENDOR_PALETTES = `${vendor.toUpperCase()}_PALETTES`;
  const VENDOR_PALETTE_DATA = `${vendor.toUpperCase()}_PALETTE_DATA`;
  const VENDOR_PALETTE_NAMES = `${vendor.toUpperCase()}_PALETTE_NAMES`;
  const VENDOR_DOCS_PALETTES = `${vendor.toUpperCase()}_DOCS_PALETTES`;
  const VENDOR_DOCS_PALETTE_DATA = `${vendor.toUpperCase()}_DOCS_PALETTE_DATA`;

  let result = '';

  result +=
    'export const ' +
    VENDOR_PALETTE_DATA +
    ' = ' +
    JSON.stringify(vars.palettes, null, 2) +
    '\n';
  _.times(maxSize, i => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });
  result += '\n';

  result +=
    'export const ' +
    VENDOR_DOCS_PALETTE_DATA +
    ' = ' +
    JSON.stringify(vars.docsPalettes, null, 2) +
    '\n';
  _.times(docsMaxSize, i => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });
  result += '\n';

  _.forEach(vars.constantNames, (v, k) => {
    result += 'export const ' + k + ' = "' + v + '"\n';
  });
  result += '\n';

  result += `const _${VENDOR_PALETTE_NAMES} = {}\n`;
  _.forEach(vars.constantNames, (v, k) => {
    result += `_${VENDOR_PALETTE_NAMES}['${k}'] = '${v}'\n`;
  });
  result += `export const ${VENDOR_PALETTE_NAMES} = _${VENDOR_PALETTE_NAMES}\n`;
  result += '\n';

  result += `const _${VENDOR_PALETTES} = {}\n`;
  _.forEach(vars.vendorNames, (v, k) => {
    result += `_${VENDOR_PALETTES}['${k}'] = ${VENDOR_PALETTE_DATA}[${v}]\n`;
  });
  result += `export const ${VENDOR_PALETTES} = _${VENDOR_PALETTES}\n`;
  result += '\n';

  result += `const _${VENDOR_DOCS_PALETTES} = {}\n`;
  _.forEach(vars.vendorNames, (v, k) => {
    result += `_${VENDOR_DOCS_PALETTES}['${k}'] = ${VENDOR_DOCS_PALETTE_DATA}[${v}]\n`;
  });
  result += `export const ${VENDOR_DOCS_PALETTES} = _${VENDOR_DOCS_PALETTES}\n`;

  return result;
}

export function pySerialize(vendor, vars, maxSize, docsMaxSize) {
  const VENDOR_PALETTES = `${vendor.toUpperCase()}_PALETTES`;
  const VENDOR_PALETTE_DATA = `${vendor.toUpperCase()}_PALETTE_DATA`;
  const VENDOR_PALETTE_NAMES = `${vendor.toUpperCase()}_PALETTE_NAMES`;
  const VENDOR_DOCS_PALETTES = `${vendor.toUpperCase()}_DOCS_PALETTES`;
  const VENDOR_DOCS_PALETTE_DATA = `${vendor.toUpperCase()}_DOCS_PALETTE_DATA`;

  let result = '';

  result +=
    VENDOR_PALETTE_DATA + ' = ' + JSON.stringify(vars.palettes, null, 2) + '\n';
  _.times(maxSize, i => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });
  result += '\n';

  result +=
    VENDOR_DOCS_PALETTE_DATA +
    ' = ' +
    JSON.stringify(vars.docsPalettes, null, 2) +
    '\n';
  _.times(docsMaxSize, i => {
    result = result.replace(new RegExp('"' + (i + 1) + '"', 'g'), i + 1);
  });
  result += '\n';

  _.forEach(vars.constantNames, (v, k) => {
    result += k + ' = "' + v + '"\n';
  });
  result += '\n';

  result += `${VENDOR_PALETTE_NAMES} = {}\n`;
  _.forEach(vars.constantNames, (v, k) => {
    result += `${VENDOR_PALETTE_NAMES}['${k}'] = '${v}'\n`;
  });
  result += '\n';

  result += `${VENDOR_PALETTES} = {}\n`;
  _.forEach(vars.vendorNames, (v, k) => {
    result += `${VENDOR_PALETTES}['${k}'] = ${VENDOR_PALETTE_DATA}[${v}]\n`;
  });
  result += '\n';

  result += `${VENDOR_DOCS_PALETTES} = {}\n`;
  _.forEach(vars.vendorNames, (v, k) => {
    result += `${VENDOR_DOCS_PALETTES}['${k}'] = ${VENDOR_DOCS_PALETTE_DATA}[${v}]\n`;
  });

  return result;
}

export function buildJs(config) {
  return new Promise((resolve, reject) => {
    webpack(config, function(err, stats) {
      if (err) {
        log('[webpack]', err);
        reject();
      } else {
        log(
          '[webpack]',
          stats.toString({
            cached: false,
            cachedAssets: false,
            children: true,
            chunks: false,
            chunkModules: false,
            chunkOrigins: true,
            colors: true,
            entrypoints: false,
            errorDetails: false,
            hash: false,
            modules: false,
            performance: true,
            reasons: true,
            source: false,
            timings: true,
            version: true,
            warnings: true
          })
        );
        resolve();
      }
    });
  });
}

/**
 *
 * @returns {Promise}
 */
export function buildModuleJs() {
  const configs = [
    {
      ...webpackConfig,
      entry: {
        [globalName]: path.join(gulpConfig.module.src, 'js/index.js'),
        [globalName + '.min']: path.join(gulpConfig.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(gulpConfig.module.dist.cjs),
        libraryTarget: 'commonjs'
      }
    },
    {
      ...webpackConfig,
      entry: {
        [globalName]: path.join(gulpConfig.module.src, 'js/index.js'),
        [globalName + '.min']: path.join(gulpConfig.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(gulpConfig.module.dist.umd),
        library: globalName,
        libraryTarget: 'umd'
      }
    }
  ];

  return Promise.mapSeries(configs, config => buildJs(config));
}
