# Ported from Chroma.js — Copyright (c) 2011-2025 Gregor Aisch (BSD 3-Clause)
# Source: https://github.com/gka/chroma.js/blob/v3.2.0/test/contrast.test.js
from chrys.vendor.chroma_js import contrast, contrast_apca

import unittest


class TestContrast(unittest.TestCase):
    def test_maximum_contrast_is_21_to_1(self):
        self.assertEqual(contrast("#000", "#fff"), 21)

    def test_minimum_contrast_is_1_to_1(self):
        self.assertEqual(contrast("#fff", "#fff"), 1)

    def test_contrast_between_white_and_red_is_4_to_1(self):
        self.assertEqual(f"{contrast('#fff', '#f00'):.1f}", "4.0")

    def test_contrast_between_black_and_red_is_5_25_to_1(self):
        self.assertEqual(f"{contrast('#000', '#f00'):.2f}", "5.25")

    def test_contrast_between_black_and_darkgrey_is_1_32_to_1(self):
        self.assertEqual(f"{contrast('#000', '#222'):.2f}", "1.32")


class TestContrastAPCA(unittest.TestCase):
    def test_maximum_contrast(self):
        self.assertEqual(round(contrast_apca("#000", "#fff"), 1), 106.0)
        self.assertEqual(round(contrast_apca("#fff", "#000"), 1), -107.9)

    def test_minimum_contrast(self):
        self.assertEqual(round(contrast_apca("#808080", "#808080"), 1), 0.0)

    def test_contrast_without_alpha(self):
        self.assertEqual(round(contrast_apca("#594d45", "#ffd4d4"), 1), 69.0)
        self.assertEqual(round(contrast_apca("#b04646", "#d6d6d6"), 1), 52.9)
        self.assertEqual(round(contrast_apca("#c2afaf", "#d6d6d6"), 1), 17.0)

    def test_contrast_with_alpha(self):
        self.assertEqual(round(contrast_apca("#00000044", "#fff"), 1), 37.3)
        self.assertEqual(round(contrast_apca("#ffffffc0", "#000"), 1), -68.0)
        self.assertEqual(round(contrast_apca("#0004", "#fff"), 1), 37.3)

    def test_inverse_contrast(self):
        self.assertEqual(round(contrast_apca("#f5f5b3", "#614f63"), 1), -81.7)
        self.assertEqual(round(contrast_apca("#67a7d6", "#4f6357"), 1), -30.5)
        self.assertEqual(round(contrast_apca("#d667cb", "#b04646"), 1), -17.9)
