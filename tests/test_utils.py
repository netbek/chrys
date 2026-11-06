from chrys.utils import best_color_contrast, score_contrast

import matplotlib as mpl
import pytest
import unittest


class TestScoreContrast(unittest.TestCase):
    def test_aa_bonus(self):
        bg = mpl.colors.to_rgb("#ffffff")
        fg = mpl.colors.to_rgb("#000000")

        self.assertAlmostEqual(score_contrast(bg, fg, False, False), 121.0)

    def test_aaa_bonus(self):
        bg = mpl.colors.to_rgb("#ffffff")
        fg = mpl.colors.to_rgb("#000000")

        self.assertAlmostEqual(score_contrast(bg, fg, False, True), 121.0)

    def test_large_text_bonus(self):
        bg = mpl.colors.to_rgb("#777777")
        fg = mpl.colors.to_rgb("#ffffff")

        self.assertAlmostEqual(
            score_contrast(bg, fg, False, False),
            4.478089453577214,
            places=6,
        )
        self.assertAlmostEqual(
            score_contrast(bg, fg, True, False),
            104.47808945357721,
            places=6,
        )

    def test_failed_aaa_has_no_bonus(self):
        bg = mpl.colors.to_rgb("#ffffff")
        fg = mpl.colors.to_rgb("#777777")

        self.assertAlmostEqual(
            score_contrast(bg, fg, False, True),
            4.478089453577214,
            places=6,
        )


class TestBestColorContrast(unittest.TestCase):
    def test_black_on_red(self):
        self.assertEqual(best_color_contrast("#ff0000", ["#000000", "#ffffff"]), "#000000")

    def test_large_text(self):
        self.assertEqual(
            best_color_contrast("#ff0000", ["#000000", "#ffffff"], large=True),
            "#000000",
        )

    def test_aaa(self):
        self.assertEqual(
            best_color_contrast("#ff0000", ["#000000", "#ffffff"], AAA=True),
            "#000000",
        )

    def test_tie_returns_first_candidate(self):
        self.assertEqual(
            best_color_contrast("#ffffff", ["#000000", "#000000"]),
            "#000000",
        )

    def test_invalid_color(self):
        with pytest.raises(ValueError):
            best_color_contrast("not-a-color", ["#000000"])

    def test_empty_foreground_colors(self):
        with pytest.raises(ValueError, match="At least one foreground color is required."):
            best_color_contrast("#ffffff", [])
