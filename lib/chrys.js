var _ = require('lodash');
var fs = require('fs-extra');
var gulp = require('gulp');
var path = require('path');
var postcss = require('postcss');
var postcssJs = require('postcss-js');
var Promise = require('bluebird');
var through2 = require('through2');

Promise.promisifyAll(fs);

var gulpConfig = require('../gulp-config');

/**
 *
 * @param   {Object} config Keys: document, characterStyles, colors, swatchRect
 * @param   {String} dist
 * @returns {Promise}
 */
function illustratorSwatches(config, dist) {
  return fs
    .readFileAsync(
      path.join(__dirname, '../src/illustrator/swatches.js'),
      'utf8'
    )
    .then(function(data) {
      var str = 'var config = ' + JSON.stringify(config) + ';\n\n';

      // return Promise.resolve(str + data);
      return fs.outputFileAsync(dist, str + data, 'utf8');
    });
}

/**
 *
 * @returns {Promise}
 */
function loadPalettes() {
  return fs
    .readFileAsync(path.join(__dirname, '../data/palettes.json'), 'utf8')
    .then(function(data) {
      return Promise.resolve(JSON.parse(data));
    });
}

/**
 *
 * @returns {Promise}
 */
function loadPalettesFromCss() {
  var src = path.join(__dirname, '../css/background-color.css');
  var re = /^.chrys-background-color-(.+)-(\d+)-(\d+)$/i;

  return new Promise(function(resolve, reject) {
    var palettes = gulpConfig.palettes.map(function(palette) {
      return Object.assign({}, palette, {
        sizes: []
      });
    });

    var temp = {};

    gulp
      .src(src)
      .pipe(
        through2.obj(function(chunk, enc, callback) {
          var data = chunk.contents.toString(enc);
          var root = postcss.parse(data);
          var rules = postcssJs.objectify(root);

          _.forEach(rules, function(value, key) {
            var matches = key.match(re);

            if (matches) {
              var name = matches[1];
              var size = matches[2];
              var index = matches[3];

              _.set(
                temp,
                name + '._' + size + '._' + index,
                value.backgroundColor
              );
            }
          });

          _.forEach(temp, function(sizes, name) {
            var sizeKeys = _.keys(sizes).map(function(value) {
              return Number(value.substring(1));
            });

            sizeKeys.sort(function(a, b) {
              return a - b;
            });

            var paletteIndex = _.findIndex(palettes, {
              name: name
            });

            palettes[paletteIndex].sizes = sizeKeys.map(function(size) {
              var colors = sizes['_' + size];

              var colorKeys = _.keys(colors).map(function(value) {
                return Number(value.substring(1));
              });

              colorKeys.sort(function(a, b) {
                return a - b;
              });

              return {
                name: size,
                colors: colorKeys.map(function(colorKey) {
                  return colors['_' + colorKey];
                })
              };
            });
          });

          this.emit('end');
        })
      )
      .on('end', function() {
        resolve(palettes);
      });
  });
}

module.exports = {
  illustratorSwatches: illustratorSwatches,
  loadPalettes: loadPalettes,
  loadPalettesFromCss: loadPalettesFromCss
};
