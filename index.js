var palettes = require('./data/palettes');

module.exports = {
  palette: function(name, size) {
    return palettes[name].sizes[size || palettes[name].defaultSize];
  },
  palettes: palettes
};
