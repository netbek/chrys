from chrys.utils import best_color_contrast

import pytest
import unittest


class TestBestColorContrast(unittest.TestCase):
    def test_default_is_apca(self):
        self.assertEqual(best_color_contrast("#f00", ["#000", "#fff"]), "#fff")

    def test_explicit_apca(self):
        self.assertEqual(best_color_contrast("#f00", ["#000", "#fff"], "apca"), "#fff")

    def test_wcag(self):
        self.assertEqual(best_color_contrast("#f00", ["#000", "#fff"], "wcag"), "#000")

    def test_unknown_algorithm_falls_back_to_wcag(self):
        self.assertEqual(best_color_contrast("#f00", ["#000", "#fff"], "unknown"), "#000")

    def test_tie_returns_first_candidate(self):
        self.assertEqual(best_color_contrast("#fff", ["#000", "#000"]), "#000")

    def test_single_candidate_is_returned(self):
        self.assertEqual(best_color_contrast("#000", ["#010101"]), "#010101")

    def test_absolute_apca_scores_can_differ_from_wcag(self):
        self.assertEqual(best_color_contrast("#777", ["#fff", "#000"]), "#fff")
        self.assertEqual(best_color_contrast("#777", ["#fff", "#000"], "wcag"), "#000")

    def test_invalid_background_color(self):
        with pytest.raises(ValueError):
            best_color_contrast("not-a-color", ["#000"])

    def test_invalid_foreground_color(self):
        with pytest.raises(ValueError):
            best_color_contrast("#f00", ["not-a-color"])

    def test_empty_foreground_colors(self):
        with pytest.raises(ValueError, match="At least one foreground color is required."):
            best_color_contrast("#ffffff", [])
