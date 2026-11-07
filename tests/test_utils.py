from chrys.data.bokeh_palettes import BOKEH_PALETTE_NAMES
from chrys.data.d3_palettes import D3_PALETTE_NAMES
from chrys.data.vega_palettes import VEGA_PALETTE_NAMES
from chrys.exceptions import (
    PaletteDataEmptyError,
    PaletteNotFoundError,
    VendorNotFoundError,
)
from chrys.palettes import (
    BOKEH_ACCENT,
    BOKEH_PALETTE_DATA,
    BOKEH_VIRIDIS,
    D3_ACCENT,
    D3_BLUES,
    D3_PALETTE_DATA,
    D3_VIRIDIS,
    PALETTE_DATA,
    VEGA_ACCENT,
    VEGA_BROWN_BLUE_GREEN,
    VEGA_PALETTE_DATA,
    VEGA_VIRIDIS,
    Vendor,
)
from chrys.utils import (
    _to_rgb,
    best_color_contrast,
    get_palette,
    get_palette_colors,
    parse_palette_name,
    to_continuous_colors,
    to_discrete_colors,
)
from typing import Any
from unittest.mock import patch

import math
import pytest
import unittest

PALETTE_NAME_MAPS = (
    (Vendor.BOKEH, BOKEH_PALETTE_NAMES),
    (Vendor.VEGA, VEGA_PALETTE_NAMES),
    (Vendor.D3, D3_PALETTE_NAMES),
)


def sample_continuous(colors, n):
    if n < 2:
        return colors[:n]

    step = (len(colors) - 1) / (n - 1)

    return [colors[math.floor(i * step)] for i in range(n)]


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
        with pytest.raises(ValueError, match='Invalid color "not-a-color".'):
            best_color_contrast("not-a-color", ["#000"])

    def test_invalid_foreground_color(self):
        with pytest.raises(ValueError, match='Invalid color "not-a-color".'):
            best_color_contrast("#f00", ["not-a-color"])

    def test_empty_foreground_colors(self):
        with pytest.raises(ValueError, match="At least one foreground color is required."):
            best_color_contrast("#ffffff", [])


class TestParsePaletteName(unittest.TestCase):
    def test_valid_name(self):
        self.assertTupleEqual(parse_palette_name(VEGA_ACCENT), ("vega", "accent"))

    def test_d3_name(self):
        self.assertTupleEqual(parse_palette_name(D3_ACCENT), ("d3", "accent"))

    def test_bokeh_name(self):
        self.assertTupleEqual(parse_palette_name(BOKEH_ACCENT), ("bokeh", "Accent"))

    def test_multi_word_name(self):
        self.assertTupleEqual(
            parse_palette_name(VEGA_BROWN_BLUE_GREEN),
            ("vega", "brownbluegreen"),
        )

    def test_invalid_name(self):
        with pytest.raises(PaletteNotFoundError, match='Palette "lorem ipsum" not found.'):
            parse_palette_name("lorem ipsum")

    def test_unknown_vendor(self):
        with pytest.raises(VendorNotFoundError, match='Vendor "unknown" not found.'):
            parse_palette_name("unknown_accent")

    def test_vendor_without_palette(self):
        with pytest.raises(PaletteNotFoundError, match='Palette "vega" not found.'):
            parse_palette_name("vega")

        with pytest.raises(PaletteNotFoundError, match='Palette "vega_" not found.'):
            parse_palette_name("vega_")

    def test_known_vendor_with_unknown_palette(self):
        with pytest.raises(PaletteNotFoundError, match='Palette "vega_unknown" not found.'):
            parse_palette_name("vega_unknown")


class TestPaletteNameMaps(unittest.TestCase):
    def test_upper_snake_case_variable_names(self):
        for vendor, names in PALETTE_NAME_MAPS:
            prefix = vendor.upper()

            for variable in names:
                with self.subTest(vendor=vendor, variable=variable):
                    self.assertRegex(variable, rf"^{prefix}_[A-Z0-9_]+$")

    def test_constant_names_map_to_palette_names(self):
        self.assertEqual(BOKEH_PALETTE_NAMES["BOKEH_BROWN_BLUE_GREEN"], "bokeh_BrBG")
        self.assertEqual(VEGA_PALETTE_NAMES["VEGA_BROWN_BLUE_GREEN"], "vega_brownbluegreen")
        self.assertEqual(D3_PALETTE_NAMES["D3_BROWN_BLUE_GREEN"], "d3_brownbluegreen")

    def test_unique_palette_names(self):
        for vendor, names in PALETTE_NAME_MAPS:
            with self.subTest(vendor=vendor):
                palette_names = list(names.values())

                self.assertEqual(len(set(palette_names)), len(palette_names))


class TestGetPalette(unittest.TestCase):
    def test_returns_palette_data(self):
        self.assertEqual(get_palette(VEGA_ACCENT), VEGA_PALETTE_DATA[VEGA_ACCENT])

    def test_invalid_name(self):
        with pytest.raises(PaletteNotFoundError, match='Palette "lorem ipsum" not found.'):
            get_palette("lorem ipsum")

    def test_unknown_vendor(self):
        with pytest.raises(VendorNotFoundError, match='Vendor "unknown" not found.'):
            get_palette("unknown_accent")

    def test_unknown_palette(self):
        with pytest.raises(PaletteNotFoundError, match='Palette "vega_unknown" not found.'):
            get_palette("vega_unknown")

    def test_missing_vendor_data(self):
        with (
            patch("chrys.utils.PALETTE_DATA", {}),
            pytest.raises(VendorNotFoundError, match='Vendor "vega" not found.'),
        ):
            get_palette(VEGA_ACCENT)

    def test_missing_palette_data(self):
        with (
            patch("chrys.utils.PALETTE_DATA", {Vendor.VEGA: {}}),
            pytest.raises(PaletteNotFoundError, match='Palette "vega_accent" not found.'),
        ):
            get_palette(VEGA_ACCENT)

    def test_empty_palette_data(self):
        with (
            patch("chrys.utils.PALETTE_DATA", {Vendor.VEGA: {VEGA_ACCENT: {}}}),
            pytest.raises(
                PaletteDataEmptyError,
                match='Palette data for "vega_accent" is empty.',
            ),
        ):
            get_palette(VEGA_ACCENT)


class TestToDiscreteColors(unittest.TestCase):
    def test_empty_palette(self):
        with pytest.raises(ValueError, match="Palette is empty."):
            to_discrete_colors({})

    def test_zero_colors(self):
        self.assertEqual(to_discrete_colors({1: ["#000000"]}, 0), [])

    def test_default_size(self):
        palette = {6: [f"#{i}{i}{i}{i}{i}{i}" for i in range(6)]}

        self.assertEqual(to_discrete_colors(palette), palette[6])

    def test_default_size_returns_maximum_available(self):
        palette = {
            1: ["#000000"],
            2: ["#000000", "#ffffff"],
        }

        self.assertEqual(to_discrete_colors(palette), ["#000000", "#ffffff"])

    def test_below_minimum(self):
        palette = {3: ["#000000", "#111111", "#222222"]}

        self.assertEqual(to_discrete_colors(palette, 2), palette[3][:2])

    def test_above_maximum(self):
        palette = {2: ["#000000", "#111111"]}

        self.assertEqual(to_discrete_colors(palette, 5), palette[2])

    def test_copy_when_size_equals_minimum(self):
        palette = {3: ["#000000", "#111111", "#222222"]}
        colors = to_discrete_colors(palette, 3)

        self.assertIsNot(colors, palette[3])

        colors.pop(0)

        self.assertEqual(palette[3], ["#000000", "#111111", "#222222"])

    def test_copy_when_size_exceeds_maximum(self):
        palette = {2: ["#000000", "#111111"]}
        colors = to_discrete_colors(palette, 5)

        self.assertEqual(len(colors), 2)

        colors.pop(0)

        self.assertEqual(palette[2], ["#000000", "#111111"])

    def test_copy_for_supported_size(self):
        palette = {
            3: ["#000000", "#111111", "#222222"],
            6: ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555"],
            9: [
                "#000000",
                "#111111",
                "#222222",
                "#333333",
                "#444444",
                "#555555",
                "#666666",
                "#777777",
                "#888888",
            ],
        }
        colors = to_discrete_colors(palette, 6)

        self.assertIsNot(colors, palette[6])

        self.assertEqual(len(colors), 6)

        colors.pop(0)

        self.assertEqual(
            palette[6],
            ["#000000", "#111111", "#222222", "#333333", "#444444", "#555555"],
        )

    def test_supported_size(self):
        palette = {
            1: ["#000000"],
            3: ["#000000", "#111111", "#222222"],
        }

        self.assertEqual(to_discrete_colors(palette, 3), palette[3])

    def test_unsupported_size(self):
        palette = {
            1: ["#000000"],
            3: ["#000000", "#111111", "#222222"],
        }

        with pytest.raises(
            ValueError,
            match="Unsupported palette size 2. Supported sizes: 1, 3.",
        ):
            to_discrete_colors(palette, 2)

    def test_supported_sizes_listed_ascending(self):
        with pytest.raises(
            ValueError,
            match="Unsupported palette size 3. Supported sizes: 1, 6.",
        ):
            to_discrete_colors({6: ["#000000"], 1: ["#000000"]}, 3)

    def test_negative_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_discrete_colors({1: ["#000000"]}, -1)

    def test_float_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_discrete_colors({1: ["#000000"]}, 1.5)

    def test_bool_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_discrete_colors({1: ["#000000"]}, True)

    def test_nan_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_discrete_colors({1: ["#000000"]}, float("nan"))

    def test_infinite_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_discrete_colors({1: ["#000000"]}, float("inf"))

    def test_as_rgb(self):
        palette = {2: ["#000000", "#ffffff"]}
        expected = [_to_rgb(color) for color in palette[2]]

        self.assertEqual(to_discrete_colors(palette, as_rgb=True), expected)

    def test_matches_registry_data(self):
        for vendor, names in PALETTE_NAME_MAPS:
            for constant, palette_name in names.items():
                with self.subTest(vendor=vendor, constant=constant):
                    palette = PALETTE_DATA[vendor][palette_name]
                    expected = (
                        to_continuous_colors(palette[256], 6)
                        if 256 in palette
                        else to_discrete_colors(palette, 6)
                    )

                    self.assertEqual(get_palette_colors(palette_name, 6), expected)


class TestGetPaletteColorsDiscrete(unittest.TestCase):
    def test_no_size(self):
        self.assertEqual(
            get_palette_colors(VEGA_ACCENT),
            ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f"],
        )

    def test_bokeh_palette(self):
        self.assertEqual(
            get_palette_colors(BOKEH_ACCENT),
            BOKEH_PALETTE_DATA[BOKEH_ACCENT][6],
        )

    def test_d3_blues_palette(self):
        self.assertEqual(
            get_palette_colors(D3_BLUES, 6),
            ["#eff3ff", "#c6dbef", "#9ecae1", "#6baed6", "#3182bd", "#08519c"],
        )

    def test_d3_accent_below_minimum(self):
        self.assertEqual(
            get_palette_colors(D3_ACCENT, 3),
            D3_PALETTE_DATA[D3_ACCENT][8][:3],
        )

    def test_valid_size(self):
        self.assertEqual(
            get_palette_colors(VEGA_ACCENT, 8),
            [
                "#7fc97f",
                "#beaed4",
                "#fdc086",
                "#ffff99",
                "#386cb0",
                "#f0027f",
                "#bf5b17",
                "#666666",
            ],
        )

    def test_size_above_maximum(self):
        self.assertEqual(
            get_palette_colors(VEGA_ACCENT, 20),
            [
                "#7fc97f",
                "#beaed4",
                "#fdc086",
                "#ffff99",
                "#386cb0",
                "#f0027f",
                "#bf5b17",
                "#666666",
            ],
        )

    def test_zero_colors(self):
        self.assertEqual(get_palette_colors(VEGA_ACCENT, 0), [])

    def test_negative_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            get_palette_colors(VEGA_ACCENT, -1)

    def test_float_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            get_palette_colors(VEGA_ACCENT, 4.5)

    def test_unsupported_size_between_palette_sizes(self):
        palette = {
            1: ["#000000"],
            3: ["#000000", "#111111", "#222222"],
        }

        with (
            patch("chrys.utils.get_palette", return_value=palette),
            pytest.raises(ValueError, match="Unsupported palette size 2"),
        ):
            get_palette_colors(VEGA_ACCENT, 2)

    def test_clamp_to_maximum_supported_size(self):
        self.assertEqual(len(get_palette_colors(VEGA_ACCENT, 300)), 8)
        self.assertEqual(len(get_palette_colors(D3_ACCENT, 300)), 8)

    def test_invalid_name(self):
        with pytest.raises(PaletteNotFoundError, match='Palette "lorem ipsum" not found.'):
            get_palette_colors("lorem ipsum")

    def test_as_rgb(self):
        result = get_palette_colors(VEGA_ACCENT, 3, as_rgb=True)
        expected = [_to_rgb(color) for color in VEGA_PALETTE_DATA[VEGA_ACCENT][3]]

        self.assertEqual(result, expected)

        for color in result:
            self.assertIsInstance(color, tuple)
            self.assertEqual(len(color), 3)


class TestGetPaletteColorsContinuous(unittest.TestCase):
    def test_zero_colors(self):
        self.assertCountEqual(get_palette_colors(VEGA_VIRIDIS, 0), [])

    def test_one_color(self):
        self.assertCountEqual(get_palette_colors(VEGA_VIRIDIS, 1), ["#440356"])

    def test_all_colors(self):
        self.assertCountEqual(
            get_palette_colors(VEGA_VIRIDIS, 256),
            [
                "#440356",
                "#450457",
                "#450659",
                "#45075a",
                "#46095c",
                "#460a5d",
                "#460c5f",
                "#470d60",
                "#470f62",
                "#471063",
                "#471164",
                "#471365",
                "#481467",
                "#481668",
                "#481769",
                "#48186b",
                "#481a6c",
                "#481b6d",
                "#481c6e",
                "#481e6f",
                "#481f70",
                "#482071",
                "#482272",
                "#482373",
                "#482474",
                "#482575",
                "#482776",
                "#482877",
                "#482978",
                "#472a79",
                "#472b7a",
                "#472c7b",
                "#472e7c",
                "#472f7d",
                "#47307e",
                "#46317e",
                "#46337f",
                "#463480",
                "#453580",
                "#453681",
                "#453882",
                "#443982",
                "#443a83",
                "#443b84",
                "#433d84",
                "#433e84",
                "#433f85",
                "#424085",
                "#424186",
                "#414286",
                "#414487",
                "#414587",
                "#404688",
                "#404788",
                "#3f4888",
                "#3f4989",
                "#3e4b89",
                "#3e4c89",
                "#3d4d8a",
                "#3d4e8a",
                "#3d4f8a",
                "#3c508a",
                "#3c518b",
                "#3b528b",
                "#3b538b",
                "#3a548b",
                "#3a558c",
                "#39568c",
                "#39578c",
                "#38588c",
                "#38598c",
                "#375a8c",
                "#375b8d",
                "#365c8d",
                "#365e8d",
                "#365f8d",
                "#35608d",
                "#35618d",
                "#34628d",
                "#34638d",
                "#33648d",
                "#33658e",
                "#32668e",
                "#32668e",
                "#31678e",
                "#31688e",
                "#30698e",
                "#306a8e",
                "#2f6b8e",
                "#2f6c8e",
                "#2f6d8e",
                "#2e6e8e",
                "#2e6f8e",
                "#2d708e",
                "#2d718e",
                "#2c728e",
                "#2c738e",
                "#2c748e",
                "#2b748e",
                "#2b758e",
                "#2b768e",
                "#2a778e",
                "#2a788e",
                "#2a798e",
                "#297a8e",
                "#297b8e",
                "#297c8e",
                "#287d8e",
                "#287f8e",
                "#27808e",
                "#27818e",
                "#27828e",
                "#26828e",
                "#26838e",
                "#25848e",
                "#25858e",
                "#24868e",
                "#24868e",
                "#23878e",
                "#23888e",
                "#23898e",
                "#238a8e",
                "#228b8e",
                "#228c8e",
                "#228d8d",
                "#228e8d",
                "#218f8d",
                "#21908d",
                "#21918d",
                "#21928d",
                "#20938c",
                "#20948c",
                "#20958c",
                "#20958c",
                "#1f968b",
                "#1f978b",
                "#1f988b",
                "#1f998b",
                "#1f9a8a",
                "#1f9b8a",
                "#1f9c8a",
                "#1f9d89",
                "#1f9e89",
                "#1f9e89",
                "#1f9f88",
                "#1fa088",
                "#1fa187",
                "#20a287",
                "#20a386",
                "#21a486",
                "#21a585",
                "#21a685",
                "#22a785",
                "#22a884",
                "#23a984",
                "#24aa83",
                "#25ab82",
                "#26ac82",
                "#26ac81",
                "#27ad81",
                "#28ae80",
                "#29af7f",
                "#2ab07f",
                "#2cb17e",
                "#2db27d",
                "#2eb37d",
                "#2fb37c",
                "#31b47b",
                "#32b57b",
                "#33b67a",
                "#35b779",
                "#36b878",
                "#38b977",
                "#39b977",
                "#3bba76",
                "#3dbb75",
                "#3ebc74",
                "#40bd73",
                "#42be72",
                "#43bf71",
                "#45c070",
                "#47c06f",
                "#49c16e",
                "#4bc26d",
                "#4dc36c",
                "#4fc36b",
                "#51c46a",
                "#53c568",
                "#55c567",
                "#57c666",
                "#59c765",
                "#5bc863",
                "#5ec962",
                "#60ca61",
                "#62ca60",
                "#64cb5e",
                "#66cc5d",
                "#68cd5c",
                "#6bcd5a",
                "#6dce59",
                "#6fce57",
                "#72cf56",
                "#74cf55",
                "#76d053",
                "#79d152",
                "#7bd150",
                "#7dd24f",
                "#80d34d",
                "#82d34c",
                "#85d44a",
                "#87d549",
                "#8ad547",
                "#8cd646",
                "#8fd744",
                "#91d743",
                "#94d841",
                "#96d83f",
                "#99d93e",
                "#9bd93c",
                "#9eda3a",
                "#a1da39",
                "#a3db37",
                "#a6db36",
                "#a8dc34",
                "#abdc32",
                "#aedd30",
                "#b0dd2f",
                "#b3dd2d",
                "#b6de2b",
                "#b9de29",
                "#bbdf28",
                "#bedf26",
                "#c0e025",
                "#c3e023",
                "#c6e022",
                "#c8e120",
                "#cbe11f",
                "#cde11e",
                "#d0e21c",
                "#d2e21b",
                "#d5e21b",
                "#d8e31b",
                "#dae31b",
                "#dde31b",
                "#e0e41a",
                "#e2e41a",
                "#e5e41a",
                "#e8e51a",
                "#eae51b",
                "#ede51c",
                "#efe61d",
                "#f1e61f",
                "#f4e620",
                "#f6e621",
                "#f8e722",
                "#fbe724",
            ],
        )

    def test_invalid_size(self):
        with pytest.raises(ValueError):
            get_palette_colors(VEGA_VIRIDIS, 257)

    def test_bokeh_palette(self):
        self.assertEqual(
            get_palette_colors(BOKEH_VIRIDIS, 6),
            sample_continuous(BOKEH_PALETTE_DATA[BOKEH_VIRIDIS][256], 6),
        )

    def test_d3_palette(self):
        self.assertEqual(
            get_palette_colors(D3_VIRIDIS, 6),
            sample_continuous(D3_PALETTE_DATA[D3_VIRIDIS][256], 6),
        )

    def test_as_rgb(self):
        result = get_palette_colors(VEGA_VIRIDIS, 6, as_rgb=True)
        expected = [
            _to_rgb(color) for color in sample_continuous(VEGA_PALETTE_DATA[VEGA_VIRIDIS][256], 6)
        ]

        self.assertEqual(result, expected)

    def test_discrete_palette_falls_back_to_discrete_colors(self):
        self.assertEqual(
            get_palette_colors(VEGA_ACCENT, 6),
            VEGA_PALETTE_DATA[VEGA_ACCENT][6],
        )


class TestToContinuousColors(unittest.TestCase):
    def setUp(self):
        self.colors = ["#000000", "#111111", "#222222", "#333333"]
        return super().setUp()

    def test_zero_colors(self):
        self.assertEqual(to_continuous_colors(self.colors, 0), [])

    def test_one_color(self):
        self.assertEqual(to_continuous_colors(self.colors, 1), [self.colors[0]])

    def test_two_colors(self):
        self.assertEqual(
            to_continuous_colors(self.colors, 2),
            [self.colors[0], self.colors[-1]],
        )

    def test_all_colors(self):
        self.assertEqual(
            to_continuous_colors(self.colors, len(self.colors)),
            self.colors,
        )

    def test_too_many_colors(self):
        with pytest.raises(ValueError, match="Requested 5 colors"):
            to_continuous_colors(self.colors, 5)

    def test_negative_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_continuous_colors(self.colors, -1)

    def test_float_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_continuous_colors(self.colors, 1.5)

    def test_as_rgb(self):
        expected = [_to_rgb(color) for color in self.colors]

        self.assertEqual(
            to_continuous_colors(self.colors, len(self.colors), as_rgb=True),
            expected,
        )


class TestToRgb(unittest.TestCase):
    def test_six_digit_hex(self):
        self.assertEqual(_to_rgb("#7fc97f"), (127 / 255, 201 / 255, 127 / 255))

    def test_three_digit_hex(self):
        self.assertEqual(_to_rgb("#abc"), (10 / 15, 11 / 15, 12 / 15))

    def test_eight_digit_hex_drops_alpha(self):
        self.assertEqual(_to_rgb("#7fc97f80"), _to_rgb("#7fc97f"))

    def test_four_digit_hex_drops_alpha(self):
        self.assertEqual(_to_rgb("#abc8"), _to_rgb("#abc"))

    def test_shorthand_equivalence(self):
        self.assertEqual(_to_rgb("#123"), _to_rgb("#112233"))
        self.assertEqual(_to_rgb("#123a"), _to_rgb("#112233"))
        self.assertEqual(_to_rgb("#1234abcd"), _to_rgb("#1234ab"))

    def test_uppercase_hex(self):
        self.assertEqual(_to_rgb("#ABCDEF"), _to_rgb("#abcdef"))

    def test_returns_rgb_tuple(self):
        result = _to_rgb("#7fc97f")

        self.assertIsInstance(result, tuple)
        self.assertEqual(len(result), 3)
        self.assertTrue(all(0.0 <= channel <= 1.0 for channel in result))

    def test_invalid_hex_length(self):
        for color in ("#12345", "#1234567"):
            with (
                self.subTest(color=color),
                pytest.raises(ValueError, match="Invalid hex color specifier"),
            ):
                _to_rgb(color)

    def test_invalid_hex_characters(self):
        with pytest.raises(ValueError, match="Invalid RGBA argument"):
            _to_rgb("#gggggg")

    def test_invalid_string(self):
        with pytest.raises(ValueError, match="Invalid RGBA argument"):
            _to_rgb("not-a-color")

    def test_non_string(self):
        color: Any = (0, 0, 0)

        with pytest.raises(ValueError, match="Invalid RGBA argument"):
            _to_rgb(color)
