import _ from 'lodash';
import {illustratorSwatches} from 'chrys-cli';
import {scaleQuantile} from 'd3-scale';
import * as bokehPalettes from 'bokehjs/build/js/lib/api/palettes';
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
import gulpConfig from '../gulp-config';
import webpackConfig from '../webpack.config.prod';
import {name as globalName} from '../package';
import {
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES,
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../cjs/chrys';

const loadPalettes = require('../utils/loadPalettes');

// TODO Replace gulp
const gulpCssmin = require('gulp-cssmin');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass');

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

function _buildCss(src, dist) {
  return new Promise(function(resolve, reject) {
    gulp
      .src(src)
      .pipe(gulpSass(gulpConfig.css.params).on('error', gulpSass.logError))
      .pipe(
        gulpPostcss([
          autoprefixer(gulpConfig.autoprefixer),
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

function _buildJs(config) {
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

export function buildClean() {
  return Promise.mapSeries(
    [
      gulpConfig.module.dist.cjs,
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

  return Promise.mapSeries(configs, config => _buildJs(config));
}

export function buildSassVars() {
  const sassVars = {
    // '$chrys-color-map': {}, // Deprecated
    '$chrys-palettes': {}
  };

  // // Deprecated
  // gulpConfig.palettes.forEach(function(palette) {
  //   let bokehPalette = _.values(bokehPalettes[palette.bokehName]);

  //   // Exclude palettes with 256 colors.
  //   bokehPalette = bokehPalette.filter(function(value) {
  //     return value.length < 256;
  //   });

  //   bokehPalette = _.sortBy(bokehPalette, function(values) {
  //     return values.length;
  //   });

  //   sassVars['$chrys-' + palette.name] = _.last(bokehPalette).map(function(
  //     value
  //   ) {
  //     return '#' + _.padStart(value.toString(16), 6, '0');
  //   });

  //   sassVars['$chrys-color-map'][palette.name] = {};

  //   bokehPalette.forEach(function(values) {
  //     var hexValues = values.map(function(value) {
  //       return '#' + _.padStart(value.toString(16), 6, '0');
  //     });

  //     sassVars['$chrys-color-map'][palette.name][values.length] = hexValues;
  //   });
  // });

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
  // const legacySassNames = gulpConfig.palettes.map(palette => palette.name); // Deprecated
  const sassNames = varNames.map(varName => _.kebabCase(varName));

  return (
    Promise.mapSeries(
      ['background-color', 'color'],
      task =>
        new Promise((resolve, reject) => {
          nunjucks.render(
            'src/templates/css/' + task + '.scss.njk',
            {
              names: [
                // ...legacySassNames,
                ...sassNames
              ]
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
    )
      // .then(() => {
      //   // Deprecated
      //   const tasks = [];
      //   legacySassNames.forEach(sassName => {
      //     tasks.push(['color', sassName]);
      //     tasks.push(['background-color', sassName]);
      //   });

      //   return Promise.mapSeries(
      //     tasks,
      //     task =>
      //       new Promise((resolve, reject) => {
      //         nunjucks.render(
      //           'src/templates/css/chrys-color-map-' +
      //             task[0] +
      //             '/index.scss.njk',
      //           {
      //             name: task[1]
      //           },
      //           (err, data) => {
      //             if (err) {
      //               console.log(err);
      //               reject();
      //             } else {
      //               fs.outputFile(
      //                 'src/css/' + task[0] + '/' + task[1] + '.scss',
      //                 data,
      //                 'utf-8'
      //               ).then(resolve);
      //             }
      //           }
      //         );
      //       })
      //   );
      // })
      .then(() => {
        const tasks = [];
        sassNames.forEach(sassName => {
          tasks.push(['color', sassName]);
          tasks.push(['background-color', sassName]);
        });

        return Promise.mapSeries(
          tasks,
          task =>
            new Promise((resolve, reject) => {
              nunjucks.render(
                'src/templates/css/chrys-palettes-' +
                  task[0] +
                  '/index.scss.njk',
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
      })
  );
}

export function buildCss() {
  return _buildCss(['src/css/**/*.scss'], 'css/');
}

export function buildIllustrator() {
  return loadPalettes().then(function(palettes) {
    const illustratorPalettes = [];

    // Deprecated
    // palettes.forEach(function(palette) {
    //   palette.sizes.forEach(function(size) {
    //     const group = palette.name + '-' + size.name;

    //     illustratorPalettes.push({
    //       name: group,
    //       colors: size.colors.map((color, index) => ({
    //         group: group,
    //         name: group + '-' + (index + 1),
    //         rgb: chroma(color).rgb()
    //       }))
    //     });
    //   });
    // });

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

    return Promise.mapSeries(illustratorPalettes, palette => {
      const config = _.cloneDeep(gulpConfig.illustratorTasks.swatches);
      config.document.mode = 'rgb';
      config.colors = palette.colors;

      const dist = path.resolve('illustrator/' + palette.name + '.js');

      return illustratorSwatches(config, dist);
    });
  });
}
