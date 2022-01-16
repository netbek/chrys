import _ from 'lodash';
import autoprefixer from 'autoprefixer';
import fs from 'fs-extra';
import jsonSass from 'json-sass';
import nunjucks from 'nunjucks';
import postcssColorRgbaFallback from 'postcss-color-rgba-fallback';
import postcssOpacity from 'postcss-opacity';
import Promise from 'bluebird';
import {config} from '../config';
import {
  BOKEH_PALETTE_DATA,
  BOKEH_PALETTE_NAMES,
  VEGA_PALETTE_DATA,
  VEGA_PALETTE_NAMES
} from '../cjs';

// TODO Replace gulp
const gulpCssmin = require('gulp-cssmin');
const gulp = require('gulp');
const gulpPostcss = require('gulp-postcss');
const gulpRename = require('gulp-rename');
const gulpSass = require('gulp-sass')(require('node-sass'));

function _buildCss(src, dist) {
  return new Promise(function (resolve, reject) {
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
      .on('end', function () {
        resolve();
      });
  });
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
  return _buildCss(['src/css/**/*.scss'], 'css/');
}

Promise.each([buildSassVars, buildSassPartials, buildCss], (task) => task());
