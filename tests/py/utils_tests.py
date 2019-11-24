import unittest

from chrys.utils import best_color_contrast


class BestColorContrastTests(unittest.TestCase):

    def test_black_on_red(self):
        self.assertEqual(best_color_contrast('#ff0000', ['#000000', '#ffffff']), '#000000')
