const chai = require('chai');
const {assert} = chai;
const chaiAsPromised = require('chai-as-promised');
const {
  VEGA_ACCENT,
  discretePalette,
  parsePaletteName
} = require('../../src/js');

chai.use(chaiAsPromised);

describe('chrys', () => {
  describe('parsePaletteName', () => {
    it('Should parse a valid palette name', () => {
      assert.deepEqual(parsePaletteName(VEGA_ACCENT), {
        vendor: 'vega',
        palette: 'accent'
      });
    });

    it('Should throw an error for an invalid palette name', () => {
      assert.throws(() => parsePaletteName('lorem ipsum'));
    });
  });

  describe('discretePalette', () => {
    it('Should generate a palette with 6 colors if size not given', () => {
      assert.sameMembers(discretePalette(VEGA_ACCENT), [
        '#7fc97f',
        '#beaed4',
        '#fdc086',
        '#ffff99',
        '#386cb0',
        '#f0027f'
      ]);
    });

    it('Should generate a palette if size given', () => {
      assert.sameMembers(discretePalette(VEGA_ACCENT, 8), [
        '#7fc97f',
        '#beaed4',
        '#fdc086',
        '#ffff99',
        '#386cb0',
        '#f0027f',
        '#bf5b17',
        '#666666'
      ]);
    });

    it('Should generate a palette with the maximum number of colors that the palette supports if the given size is larger', () => {
      assert.sameMembers(discretePalette(VEGA_ACCENT, 20), [
        '#7fc97f',
        '#beaed4',
        '#fdc086',
        '#ffff99',
        '#386cb0',
        '#f0027f',
        '#bf5b17',
        '#666666'
      ]);
    });

    it('Should throw an error for an invalid palette name', () => {
      assert.throws(() => discretePalette('lorem ipsum'));
    });
  });
});
