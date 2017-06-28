var _ = require('lodash');
var fs = require('fs-extra');
var gulp = require('gulp');
var path = require('path');
var postcss = require('postcss');
var postcssJs = require('postcss-js');
var Promise = require('bluebird');
var through2 = require('through2');

Promise.promisifyAll(fs);

/**
 *
 * @param   {Object} config Keys: document, characterStyles, colors, swatchRect
 * @param   {String} dist
 * @returns {Promise}
 */
function illustratorSwatches(config, dist) {
  return fs.readFileAsync(path.join(__dirname, '../src/illustrator/swatches.js'), 'utf8')
    .then(function (data) {
      var str = 'var config = ' + JSON.stringify(config) + ';\n\n';

      // return Promise.resolve(str + data);
      return fs.outputFileAsync(dist, str + data, 'utf8');
    });
}

/**
 *
 * @returns {Promise}
 */
function loadColors() {
  var src = path.join(__dirname, '../css/background-color.css');
  var re = /^.chrys-background-color-(.+)-(\d+)-(\d+)$/i;

  return new Promise(function (resolve, reject) {
    var colors = {};

    gulp
      .src(src)
      .pipe(through2.obj(function (chunk, enc, callback) {
        var data = chunk.contents.toString(enc);
        var root = postcss.parse(data);
        var rules = postcssJs.objectify(root);

        _.forEach(rules, function (value, key) {
          var matches = key.match(re);

          if (matches) {
            var name = matches[1];
            var size = matches[2];
            var index = matches[3];

            _.set(colors, name + '._' + size + '._' + index, value.backgroundColor);
          }
        });

        this.emit('end');
      }))
      .on('end', function () {
        resolve(colors);
      });
  });
}

module.exports = {
  illustratorSwatches: illustratorSwatches,
  loadColors: loadColors
};
