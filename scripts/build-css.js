import _ from 'lodash';
import autoprefixer from 'autoprefixer';
import esbuild from 'esbuild';
import fs from 'fs-extra';
import globby from 'globby';
import jsonSass from 'json-sass';
import nunjucks from 'nunjucks';
import path from 'path';
import postcss from 'postcss';
import postcssColorRgbaFallback from 'postcss-color-rgba-fallback';
import postcssOpacity from 'postcss-opacity';
import Promise from 'bluebird';
import sass from 'sass-embedded';
import {config} from '../config/index.js';
import {
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES,
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../cjs/index.js';

async function _buildCss(src, destDir) {
  const files = await globby(src);

  for (const file of files) {
    let css = (await sass.compileAsync(file, config.sass)).css;

    css = (
      await postcss([
        autoprefixer(config.autoprefixer),
        postcssColorRgbaFallback,
        postcssOpacity
      ]).process(css, {
        from: undefined,
        to: destDir
      })
    ).css;

    const cssMin = (
      await esbuild.transform(css, {
        loader: 'css',
        minify: true,
        legalComments: 'none'
      })
    ).code;

    const basename = path.basename(file);
    const destPath = path.join(destDir, basename.replace(/\.scss$/, '.css'));
    const destMinPath = path.join(
      destDir,
      basename.replace(/\.scss$/, '.min.css')
    );

    await fs.outputFile(destPath, css, 'utf-8');
    await fs.outputFile(destMinPath, cssMin, 'utf-8');
  }
}

function buildSassVars() {
  const sassVars = {
    '$chrys-palettes': {}
  };

  Object.keys(BOKEH_PALETTE_NAMES).forEach((varName) => {
    const sassName = _.kebabCase(varName);

    sassVars['$chrys-palettes'][sassName] = {};

    Object.values(BOKEH_PALETTE_DATA[BOKEH_PALETTE_NAMES[varName]]).forEach(
      (values) => {
        sassVars['$chrys-palettes'][sassName][values.length] = values;
      }
    );
  });

  Object.keys(VEGA_PALETTE_NAMES).forEach((varName) => {
    const sassName = _.kebabCase(varName);

    sassVars['$chrys-palettes'][sassName] = {};

    Object.values(VEGA_PALETTE_DATA[VEGA_PALETTE_NAMES[varName]]).forEach(
      (values) => {
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

function buildSassPartials() {
  const varNames = [
    ...Object.keys(BOKEH_PALETTE_NAMES),
    ...Object.keys(VEGA_PALETTE_NAMES)
  ];
  const sassNames = varNames.map((varName) => _.kebabCase(varName));

  return Promise.each(
    ['background-color', 'color'],
    (task) =>
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
    sassNames.forEach((sassName) => {
      tasks.push(['color', sassName]);
      tasks.push(['background-color', sassName]);
    });

    return Promise.each(
      tasks,
      (task) =>
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

function buildCss() {
  return _buildCss(['src/css/**/*.scss'], 'css');
}

Promise.each([buildSassVars, buildSassPartials, buildCss], (task) => task());
