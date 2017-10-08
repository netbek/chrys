var _ = require('lodash');
var path = require('path');
var Promise = require('bluebird');

function requireNoCache(filePath) {
  delete require.cache[require.resolve(filePath)];
  return require(filePath);
}

/**
 *
 * @returns {Promise}
 */
module.exports = function loadPalettes() {
  var data = requireNoCache(path.join(__dirname, '../data/palettes'));

  return Promise.resolve(
    _.map(_.values(data), function(palette) {
      return _.assign(palette, {
        sizes: _.map(
          _.filter(palette.sizes, function(values) {
            return !!values;
          }),
          function(values) {
            return {
              name: values.length,
              colors: values
            };
          }
        )
      });
    })
  );
};
