import _ from 'lodash';
import {illustratorSwatches} from 'chrys-cli';
import {scaleQuantile} from 'd3-scale';
import autoprefixer from 'autoprefixer';
import chroma from 'chroma-js';
import fs from 'fs-extra';
import jsonSass from 'json-sass';
import log from 'fancy-log';
import nunjucks from 'nunjucks';
import path from 'path';
import postcssColorRgbaFallback from 'postcss-color-rgba-fallback';
import postcssOpacity from 'postcss-opacity';
import Promise from 'bluebird';
import webpack from 'webpack';
import {BOKEH_TO_VEGA, VEGA_TO_BOKEH, config} from '../config';
import webpackConfig from '../webpack.config.prod';
import {name as globalName} from '../package';
import {
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES,
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../cjs/chrys';

// TODO Replace gulp
const gulpCssmin = require('gulp-cssmin');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('.'));

/**
 * Adapted from https://github.com/voxpelli/sass-color-helpers/blob/a32cfd607ca6479318452461a70a7a9ffd886eb1/stylesheets/color-helpers/_contrast.scss#L35
 *
 * @param   {String} base
 * @param   {Array} colors
 * @param   {Number} tolerance
 * @returns {String}
 */
env.addFilter('bestContrast', function(
  base,
  colors = ['#000', '#fff'],
  tolerance = 0
) {
  var bestColor = colors[0];
  var bestContrast = chroma.contrast(base, bestColor);
  var color;
  var contrast;

  for (var i = 1, il = colors.length; i < il; i++) {
    color = colors[i];
    contrast = chroma.contrast(base, color);

    if (contrast - bestContrast > tolerance) {
      bestColor = color;
      bestContrast = contrast;
    }
  }

  return bestColor;
});

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

function _buildCss(src, dist) {
  return new Promise(function(resolve, reject) {
    gulp
      .src(src)
      .pipe(gulpSass(config.css.params).on('error', gulpSass.logError))
      .pipe(
        gulpPostcss([
          autoprefixer(config.autoprefixer),
          postcssColorRgbaFallback,
          postcssOpacity
        ])
      )
      .pipe(gulp.dest(dist))
      .pipe(
        gulpCssmin({
          advanced: false
        })
      )
      .pipe(
        gulpRename({
          suffix: '.min'
        })
      )
      .pipe(gulp.dest(dist))
      .on('end', function() {
        resolve();
      });
  });
}

function _buildJs(buildConfig) {
  return new Promise((resolve, reject) => {
    webpack(buildConfig, function(err, stats) {
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

export function buildClean() {
  return Promise.each(
    [
      config.module.dist.cjs,
      'css/',
      'demo/',
      'illustrator/',
      'src/css/background-color/',
      'src/css/color/',
      'src/css/background-color.scss',
      'src/css/color.scss'
    ],
    file => fs.remove(file)
  );
}

export function buildJsModules() {
  const buildConfigs = [
    {
      ...webpackConfig,
      entry: {
        [globalName]: path.join(config.module.src, 'js/index.js'),
        [globalName + '.min']: path.join(config.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(config.module.dist.cjs),
        libraryTarget: 'commonjs'
      }
    },
    {
      ...webpackConfig,
      entry: {
        [globalName]: path.join(config.module.src, 'js/index.js'),
        [globalName + '.min']: path.join(config.module.src, 'js/index.js')
      },
      output: {
        filename: '[name].js',
        path: path.join(config.module.dist.umd),
        library: globalName,
        libraryTarget: 'umd'
      }
    }
  ];

  return Promise.each(buildConfigs, buildConfig => _buildJs(buildConfig));
}

export function buildSassVars() {
  const sassVars = {
    '$chrys-palettes': {}
  };

  Object.keys(BOKEH_PALETTE_NAMES).forEach(varName => {
    const sassName = _.kebabCase(varName);

    sassVars['$chrys-palettes'][sassName] = {};

    Object.values(BOKEH_PALETTE_DATA[BOKEH_PALETTE_NAMES[varName]]).forEach(
      values => {
        sassVars['$chrys-palettes'][sassName][values.length] = values;
      }
    );
  });

  Object.keys(VEGA_PALETTE_NAMES).forEach(varName => {
    const sassName = _.kebabCase(varName);

    sassVars['$chrys-palettes'][sassName] = {};

    Object.values(VEGA_PALETTE_DATA[VEGA_PALETTE_NAMES[varName]]).forEach(
      values => {
        sassVars['$chrys-palettes'][sassName][values.length] = values;
      }
    );
  });

  const sassData = _.map(
    sassVars,
    (value, name) => name + ': ' + jsonSass.convertJs(value) + ';'
  ).join('\n\n');

  return fs.outputFile('src/css/_variables.scss', sassData, 'utf-8');
}

export function buildSassPartials() {
  const varNames = [
    ...Object.keys(BOKEH_PALETTE_NAMES),
    ...Object.keys(VEGA_PALETTE_NAMES)
  ];
  const sassNames = varNames.map(varName => _.kebabCase(varName));

  return Promise.each(
    ['background-color', 'color'],
    task =>
      new Promise((resolve, reject) => {
        nunjucks.render(
          'src/templates/css/' + task + '.scss.njk',
          {
            names: sassNames
          },
          (err, data) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              fs.outputFile('src/css/' + task + '.scss', data, 'utf-8').then(
                resolve
              );
            }
          }
        );
      })
  ).then(() => {
    const tasks = [];
    sassNames.forEach(sassName => {
      tasks.push(['color', sassName]);
      tasks.push(['background-color', sassName]);
    });

    return Promise.each(
      tasks,
      task =>
        new Promise((resolve, reject) => {
          nunjucks.render(
            'src/templates/css/' + task[0] + '/index.scss.njk',
            {
              name: task[1]
            },
            (err, data) => {
              if (err) {
                console.log(err);
                reject();
              } else {
                fs.outputFile(
                  'src/css/' + task[0] + '/' + task[1] + '.scss',
                  data,
                  'utf-8'
                ).then(resolve);
              }
            }
          );
        })
    );
  });
}

export function buildCss() {
  return _buildCss(['src/css/**/*.scss'], 'css/');
}

export function buildIllustrator() {
  const illustratorPalettes = [];

  Object.keys(BOKEH_PALETTE_NAMES).forEach(varName => {
    const sassName = _.kebabCase(varName);

    Object.values(BOKEH_PALETTE_DATA[BOKEH_PALETTE_NAMES[varName]]).forEach(
      values => {
        const group = sassName + '-' + values.length;

        illustratorPalettes.push({
          name: group,
          colors: values.map((color, index) => ({
            group: group,
            name: group + '-' + (index + 1),
            rgb: chroma(color).rgb()
          }))
        });
      }
    );
  });

  Object.keys(VEGA_PALETTE_NAMES).forEach(varName => {
    const sassName = _.kebabCase(varName);

    Object.values(VEGA_PALETTE_DATA[VEGA_PALETTE_NAMES[varName]]).forEach(
      values => {
        const group = sassName + '-' + values.length;

        illustratorPalettes.push({
          name: group,
          colors: values.map((color, index) => ({
            group: group,
            name: group + '-' + (index + 1),
            rgb: chroma(color).rgb()
          }))
        });
      }
    );
  });

  return Promise.each(illustratorPalettes, palette => {
    const illustratorConfig = _.cloneDeep(config.illustratorTasks.swatches);
    illustratorConfig.document.mode = 'rgb';
    illustratorConfig.colors = palette.colors;

    const dist = path.resolve('illustrator/' + palette.name + '.js');

    return illustratorSwatches(illustratorConfig, dist);
  });
}

// export function buildDemo() {
//   var context = {};

//   return fs
//     .mkdirp('demo/')
//     .then(loadPalettes)
//     .then(function(palettes) {
//       const collections = _.uniq(palettes.map(palette => palette.type));

//       collections.sort();

//       context.collections = collections.map(function(paletteType) {
//         const filtered = palettes.filter(
//           palette => paletteType === palette.type
//         );

//         const sorted = _.sortBy(filtered, [palette => palette.name]);

//         return {
//           name: paletteType,
//           palettes: sorted
//         };
//       });

//       return fs.readFile('src/demo/index.njk', 'utf-8');
//     })
//     .then(
//       data =>
//         new Promise((resolve, reject) => {
//           env.renderString(data, context, (err, res) => {
//             if (err) {
//               reject(err);
//             } else {
//               fs.outputFile('demo/index.html', res, 'utf-8').then(resolve);
//             }
//           });
//         })
//     )
//     .then(() => buildCss(['src/demo/css/**/*.scss'], 'demo/css/'))
//     .then(
//       () =>
//         new Promise(resolve => {
//           gulp
//             .src(['node_modules/normalize-css/**/*.css', 'css/**/*'])
//             .pipe(gulp.dest('demo/css/'))
//             .on('end', resolve);
//         })
//     );
// }
