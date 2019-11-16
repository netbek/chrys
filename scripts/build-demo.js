import _ from 'lodash';
import chroma from 'chroma-js';
import fs from 'fs-extra';
import nunjucks from 'nunjucks';
import Promise from 'bluebird';

// TODO Replace gulp
const gulp = require('gulp');

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

function buildDemo() {
  var context = {};

  return fs
    .mkdirp('demo/')
    .then(loadPalettes)
    .then(function(palettes) {
      const collections = _.uniq(palettes.map(palette => palette.type));

      collections.sort();

      context.collections = collections.map(function(paletteType) {
        const filtered = palettes.filter(
          palette => paletteType === palette.type
        );

        const sorted = _.sortBy(filtered, [palette => palette.name]);

        return {
          name: paletteType,
          palettes: sorted
        };
      });

      return fs.readFile('src/demo/index.njk', 'utf-8');
    })
    .then(
      data =>
        new Promise((resolve, reject) => {
          env.renderString(data, context, (err, res) => {
            if (err) {
              reject(err);
            } else {
              fs.outputFile('demo/index.html', res, 'utf-8').then(resolve);
            }
          });
        })
    )
    .then(() => buildCss(['src/demo/css/**/*.scss'], 'demo/css/'))
    .then(
      () =>
        new Promise(resolve => {
          gulp
            .src(['node_modules/normalize-css/**/*.css', 'css/**/*'])
            .pipe(gulp.dest('demo/css/'))
            .on('end', resolve);
        })
    );
}

Promise.each([buildDemo], task => task());
