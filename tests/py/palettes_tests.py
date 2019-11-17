import unittest

from chrys.palettes import VEGA_ACCENT, discrete_palette, parse_palette_name
from nose.tools import raises


class ParsePaletteNameTests(unittest.TestCase):

    def test_valid_name(self):
        self.assertEqual(parse_palette_name(VEGA_ACCENT), ('vega', 'accent'))

    @raises(ValueError)
    def test_invalid_name(self):
        parse_palette_name('lorem ipsum')


class DiscretePaletteTests(unittest.TestCase):

    def test_no_size(self):
        self.assertEqual(discrete_palette(VEGA_ACCENT),
                         ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f'])

    def test_valid_size(self):
        self.assertEqual(discrete_palette(VEGA_ACCENT, 8),
                         ['#7fc97f', '#beaed4', '#fdc086', '#ffff99',
                          '#386cb0', '#f0027f', '#bf5b17', '#666666'])

    def test_invalid_size(self):
        self.assertEqual(discrete_palette(VEGA_ACCENT, 20),
                         ['#7fc97f', '#beaed4', '#fdc086', '#ffff99',
                          '#386cb0', '#f0027f', '#bf5b17', '#666666'])

    @raises(ValueError)
    def test_invalid_name(self):
        discrete_palette('lorem ipsum')
