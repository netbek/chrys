from chrys.apca_w3 import (
    alpha_blend,
    apca_contrast,
    calc_apca,
    srgb_to_y,
)

import pytest
import unittest


class TestSrgbToY(unittest.TestCase):
    def test_default(self):
        self.assertEqual(srgb_to_y(), 0.0)

    def test_black(self):
        self.assertEqual(srgb_to_y((0, 0, 0)), 0.0)

    def test_white(self):
        self.assertEqual(srgb_to_y((255, 255, 255)), 1.0000001)

    def test_primaries(self):
        self.assertEqual(srgb_to_y((255, 0, 0)), 0.2126729)
        self.assertEqual(srgb_to_y((0, 255, 0)), 0.7151522)
        self.assertEqual(srgb_to_y((0, 0, 255)), 0.072175)

    def test_ignores_alpha(self):
        self.assertEqual(srgb_to_y((255, 255, 255, 0.5)), 1.0000001)


class TestApcaContrast(unittest.TestCase):
    def test_black_on_white(self):
        self.assertEqual(apca_contrast(0.0, 1.0), 106.04066682868873)

    def test_white_on_black(self):
        self.assertEqual(apca_contrast(1.0, 0.0), -107.8847261150986)

    def test_rounded_string(self):
        self.assertEqual(apca_contrast(0.0, 1.0, 0), "106<sub>BoW</sub>")
        self.assertEqual(apca_contrast(1.0, 0.0, 0), "108<sub>WoB</sub>")

    def test_fixed_string(self):
        self.assertEqual(apca_contrast(0.0, 1.0, 2), "106.04")
        self.assertEqual(apca_contrast(1.0, 0.0, 2), "-107.88")

    def test_negative_places_returns_float(self):
        self.assertEqual(apca_contrast(0.0, 1.0, -2), 106.04066682868873)

    def test_non_integer_places(self):
        self.assertEqual(apca_contrast(0.0, 1.0, 2.5), 0.0)
        self.assertEqual(apca_contrast(0.0, 1.0, True), 0.0)
        self.assertEqual(apca_contrast(0.0, 1.0, "2"), 0.0)

    def test_out_of_range(self):
        self.assertEqual(apca_contrast(-0.1, 0.5), 0.0)
        self.assertEqual(apca_contrast(0.5, 1.2), 0.0)

    def test_nan(self):
        self.assertEqual(apca_contrast(float("nan"), 0.5), 0.0)
        self.assertEqual(apca_contrast(0.5, float("nan")), 0.0)

    def test_non_numeric(self):
        self.assertEqual(apca_contrast("0.5", 0.5), 0.0)
        self.assertEqual(apca_contrast(0.5, None), 0.0)

    def test_low_delta_y(self):
        self.assertEqual(apca_contrast(0.5, 0.5), 0.0)
        self.assertEqual(apca_contrast(0.01, 0.011), 0.0)

    def test_low_clip_normal(self):
        self.assertEqual(apca_contrast(0.5, 0.51), 0.0)

    def test_low_clip_reverse(self):
        self.assertEqual(apca_contrast(0.51, 0.5), 0.0)

    def test_black_soft_clamp(self):
        self.assertEqual(apca_contrast(0.0001, 0.9), 99.46227815888588)
        self.assertEqual(apca_contrast(0.9, 0.0001), -100.64121627275297)


class TestAlphaBlend(unittest.TestCase):
    def test_default(self):
        self.assertEqual(alpha_blend(), [0, 0, 0, 1.0])

    def test_blend(self):
        self.assertEqual(
            alpha_blend([0, 0, 0, 0.4], [255, 255, 255]),
            [153, 153, 153, 1.0],
        )

    def test_unrounded(self):
        self.assertEqual(
            alpha_blend([0, 0, 0, 0.4], [255, 255, 255], rounded=False),
            [153.0, 153.0, 153.0, 1.0],
        )

    def test_rounds_half_up(self):
        self.assertEqual(
            alpha_blend([0, 0, 0, 0.5], [255, 255, 255]),
            [128, 128, 128, 1.0],
        )

    def test_alpha_clamped_high(self):
        self.assertEqual(
            alpha_blend([0, 0, 0, 2.0], [255, 255, 255]),
            [0, 0, 0, 1.0],
        )

    def test_alpha_clamped_low(self):
        self.assertEqual(
            alpha_blend([0, 0, 0, -1.0], [255, 255, 255]),
            [255, 255, 255, 1.0],
        )

    def test_channel_capped(self):
        self.assertEqual(
            alpha_blend([300, 0, 0, 1.0], [300, 0, 0]),
            [255, 0, 0, 1.0],
        )


class TestCalcApca(unittest.TestCase):
    def test_reference_values(self):
        cases = (
            ("#888", "#FFF", 63.056469930209424),
            ("#FFF", "#888", -68.54146436644962),
            ("#000", "#aaa", 58.146262578561334),
            ("#123", "#def", 91.66830811481631),
            ("#123", "#444", 8.32326136957393),
            ("#0006", "#fff", 54.62184067441377),
        )

        for text, bg, expected in cases:
            with self.subTest(text=text, bg=bg):
                self.assertEqual(calc_apca(text, bg), expected)

    def test_hex_without_hash(self):
        self.assertEqual(calc_apca("000", "fff"), calc_apca("#000", "#fff"))

    def test_alpha_blending(self):
        self.assertEqual(
            calc_apca("#00000066", "#fff"),
            calc_apca("#0006", "#fff"),
        )

    def test_opaque_alpha_is_not_blended(self):
        self.assertEqual(calc_apca("#000000ff", "#fff"), calc_apca("#000", "#fff"))

    def test_places(self):
        self.assertEqual(calc_apca("#000", "#fff", 2), "106.04")

    def test_rounded(self):
        self.assertNotEqual(
            calc_apca("#fefefe7f", "#000000", rounded=False),
            calc_apca("#fefefe7f", "#000000"),
        )

    def test_invalid_color(self):
        with pytest.raises(ValueError, match="unknown format"):
            calc_apca("not-a-color", "#fff")

    def test_non_string_color(self):
        with pytest.raises(ValueError, match="unknown format"):
            calc_apca(123, "#fff")
