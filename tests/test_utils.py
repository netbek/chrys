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
    best_color_contrast,
    get_palette,
    get_palette_colors,
    PaletteMode,
    parse_color,
    parse_palette_name,
    to_continuous_colors,
    to_discrete_colors,
)
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
    def test_choose_white_on_red(self):
        self.assertEqual(best_color_contrast("#f00", ["#000", "#fff"]), "#fff")

    def test_six_digit_colors(self):
        self.assertEqual(
            best_color_contrast("#ff0000", ["#000000", "#ffffff"]),
            "#ffffff",
        )

    def test_tie_returns_first_candidate(self):
        self.assertEqual(best_color_contrast("#fff", ["#000", "#000"]), "#000")

    def test_single_candidate_is_returned(self):
        self.assertEqual(best_color_contrast("#000", ["#010101"]), "#010101")

    def test_absolute_apca_scores(self):
        self.assertEqual(best_color_contrast("#777", ["#fff", "#000"]), "#fff")

    def test_apca_uses_foreground_as_text(self):
        self.assertEqual(best_color_contrast("#2aabee", ["#000", "#fff"]), "#fff")
        self.assertEqual(best_color_contrast("#cf9275", ["#000", "#fff"]), "#fff")
        self.assertEqual(best_color_contrast("#31b57b", ["#000", "#fff"]), "#fff")

    def test_ignore_alpha_digits(self):
        self.assertEqual(
            best_color_contrast("#ff0000ff", ["#000000ff", "#ffffffff"]),
            "#ffffffff",
        )
        self.assertEqual(best_color_contrast("#f00f", ["#000f", "#ffff"]), "#ffff")
        self.assertEqual(
            best_color_contrast("rgb(255 0 0 / 0.5)", ["#000", "#fff"]),
            "#fff",
        )

    def test_accept_rgb_colors(self):
        for color in (
            "rgb(255, 0, 0)",
            "rgb(255 0 0 / 0.5)",
            "rgb(100% 0% 0%)",
        ):
            with self.subTest(color=color):
                self.assertEqual(best_color_contrast(color, ["#000", "#fff"]), "#fff")

    def test_invalid_background_color(self):
        with pytest.raises(ValueError, match='Color "not-a-color": unknown format.'):
            best_color_contrast("not-a-color", ["#000"])

    def test_invalid_foreground_color(self):
        with pytest.raises(ValueError, match='Color "not-a-color": unknown format.'):
            best_color_contrast("#f00", ["not-a-color"])

    def test_empty_foreground_colors(self):
        with pytest.raises(ValueError, match="At least one foreground color is required."):
            best_color_contrast("#ffffff", [])


class TestParseColor(unittest.TestCase):
    def test_hex_colors(self):
        for color in ("#f00", "#ff0000", "#f00f", "#ff000080", "#FF0000", " #f00 "):
            with self.subTest(color=color):
                self.assertEqual(parse_color(color), (255, 0, 0))

    def test_legacy_rgb_colors(self):
        for color in (
            "rgb(255, 0, 0)",
            "rgba(255, 0, 0, 1)",
            "rgb(255, 0, 0, 0.5)",
            "rgb(100%, 0%, 0%)",
            "rgba(100%, 0%, 0%, 50%)",
        ):
            with self.subTest(color=color):
                self.assertEqual(parse_color(color), (255, 0, 0))

    def test_modern_rgb_colors(self):
        for color in (
            "rgb(255 0 0)",
            "rgb(100% 0% 0%)",
            "rgb(255 0 0 / 0.5)",
            "rgb(255 0 0 / 50%)",
            " RGB( 255\t0\n0 / 0.5 ) ",
        ):
            with self.subTest(color=color):
                self.assertEqual(parse_color(color), (255, 0, 0))

    def test_mixed_modern_channels(self):
        self.assertEqual(parse_color("rgb(50% 0 0)"), (127.5, 0, 0))

    def test_none_channels(self):
        self.assertEqual(parse_color("rgb(none none none / none)"), (0, 0, 0))

    def test_clamp_channels(self):
        self.assertEqual(parse_color("rgb(300 -20 0)"), (255, 0, 0))
        self.assertEqual(parse_color("rgb(300% -20% 0%)"), (255, 0, 0))

    def test_preserve_fractional_channels(self):
        self.assertEqual(parse_color("rgb(127.5 0 0)"), (127.5, 0, 0))

    def test_clamp_alpha(self):
        for color in (
            "rgb(255 0 0 / 2)",
            "rgb(255 0 0 / -1)",
            "rgb(255 0 0 / 200%)",
        ):
            with self.subTest(color=color):
                self.assertEqual(parse_color(color), (255, 0, 0))

    def test_invalid_rgb_colors(self):
        for color in (
            "rgb(from red r g b)",
            "rgb(calc(255) 0 0)",
            "rgb(var(--r) 0 0)",
            "rgb(255, 0)",
            "rgb(255, 0, 0, 0.5, 1)",
            "rgb(255 0 0 0.5)",
            "rgb(255, 0, 0 / 0.5)",
            "rgb(255 0 0, 0.5)",
            "rgb(255, 0%, 0)",
            "rgb(none, 0, 0)",
            "rgb(255, 0, 0, none)",
            "rgb(255 0 0 /)",
            "rgb(255 0 0 / 0.5 / 1)",
            "rgb(255 0 0 / nope)",
            "rgb(255deg 0 0)",
            "rgb(255.0.0 0 0)",
            "rgb(255, nope, 0)",
            "rgb(255, 0, 0, nope)",
            "rgb(nope 0 0)",
            "rgb(255 0)",
            "hsl(0 100% 50%)",
            "rgb(255 0 0) garbage",
        ):
            with (
                self.subTest(color=color),
                pytest.raises(ValueError, match="unknown format"),
            ):
                parse_color(color)

    def test_invalid_hex_colors(self):
        for color in ("ff0000", "#ff", "#fffff", "#fffffff", "#fffffffff", "#ggg"):
            with (
                self.subTest(color=color),
                pytest.raises(ValueError, match="unknown format"),
            ):
                parse_color(color)

    def test_non_string_color(self):
        with pytest.raises(ValueError, match="unknown format"):
            parse_color(123)


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

    def test_none_returns_all_colors(self):
        palette = {
            1: ["#000000"],
            2: ["#000000", "#ffffff"],
        }

        self.assertEqual(to_discrete_colors(palette, None), ["#000000", "#ffffff"])

    def test_one_color(self):
        palette = {
            1: ["#000000"],
            3: ["#000000", "#111111", "#222222"],
        }

        self.assertEqual(to_discrete_colors(palette, 1), ["#000000"])

    def test_copy_when_n_is_none(self):
        palette = {
            1: ["#000000"],
            2: ["#000000", "#ffffff"],
        }
        colors = to_discrete_colors(palette, None)

        colors.pop(0)

        self.assertEqual(palette[2], ["#000000", "#ffffff"])

    def test_copy_when_below_minimum(self):
        palette = {3: ["#000000", "#111111", "#222222"]}
        colors = to_discrete_colors(palette, 2)

        colors.pop(0)

        self.assertEqual(palette[3], ["#000000", "#111111", "#222222"])

    def test_shorter_array_than_key(self):
        palette = {3: ["#000000"]}

        self.assertEqual(to_discrete_colors(palette), ["#000000"])
        self.assertEqual(to_discrete_colors(palette, 3), ["#000000"])

    def test_longer_array_than_key(self):
        palette = {2: ["#000000", "#111111", "#222222"]}

        self.assertEqual(
            to_discrete_colors(palette),
            ["#000000", "#111111", "#222222"],
        )
        self.assertEqual(to_discrete_colors(palette, 2), ["#000000", "#111111"])

    def test_empty_array_value(self):
        palette = {3: []}

        self.assertEqual(to_discrete_colors(palette), [])
        self.assertEqual(to_discrete_colors(palette, 3), [])

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

    def test_bokeh_palette(self):
        self.assertEqual(
            get_palette_colors(BOKEH_ACCENT),
            BOKEH_PALETTE_DATA[BOKEH_ACCENT][8],
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


class TestGetPaletteColorsContinuous(unittest.TestCase):
    def test_zero_colors(self):
        self.assertCountEqual(get_palette_colors(VEGA_VIRIDIS, 0), [])

    def test_default_returns_all_colors(self):
        self.assertCountEqual(
            get_palette_colors(VEGA_VIRIDIS),
            VEGA_PALETTE_DATA[VEGA_VIRIDIS][256],
        )

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

    def test_discrete_palette_falls_back_to_discrete_colors(self):
        self.assertEqual(
            get_palette_colors(VEGA_ACCENT, 6),
            VEGA_PALETTE_DATA[VEGA_ACCENT][6],
        )


class TestGetPaletteColorsMode(unittest.TestCase):
    def test_auto_is_default(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, mode=PaletteMode.AUTO),
            get_palette_colors(VEGA_VIRIDIS),
        )

    def test_auto_accepts_string(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, mode="auto"),
            get_palette_colors(VEGA_VIRIDIS),
        )

    def test_continuous_returns_full_ramp(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, mode=PaletteMode.CONTINUOUS),
            VEGA_PALETTE_DATA[VEGA_VIRIDIS][256],
        )

    def test_continuous_requires_ramp(self):
        with pytest.raises(
            ValueError,
            match='Palette "vega_accent" has no continuous data.',
        ):
            get_palette_colors(VEGA_ACCENT, mode=PaletteMode.CONTINUOUS)

    def test_discrete_excludes_ramp(self):
        palette = VEGA_PALETTE_DATA[VEGA_VIRIDIS]
        discrete = {size: colors for size, colors in palette.items() if size != 256}

        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, mode=PaletteMode.DISCRETE),
            to_discrete_colors(discrete),
        )

    def test_discrete_accepts_string_and_size(self):
        palette = VEGA_PALETTE_DATA[VEGA_VIRIDIS]
        discrete = {size: colors for size, colors in palette.items() if size != 256}

        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 6, mode="discrete"),
            to_discrete_colors(discrete, 6),
        )

    def test_discrete_requires_discrete_data(self):
        with (
            patch("chrys.utils.get_palette", return_value={256: ["#000000"]}),
            pytest.raises(
                ValueError,
                match='Palette "vega_accent" has no discrete data.',
            ),
        ):
            get_palette_colors(VEGA_ACCENT, mode=PaletteMode.DISCRETE)

    def test_unknown_mode(self):
        with pytest.raises(ValueError, match='Unknown palette mode "lorem ipsum"'):
            get_palette_colors(VEGA_ACCENT, mode="lorem ipsum")

    def test_continuous_zero_colors(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 0, mode=PaletteMode.CONTINUOUS),
            [],
        )

    def test_continuous_one_color(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 1, mode=PaletteMode.CONTINUOUS),
            [VEGA_PALETTE_DATA[VEGA_VIRIDIS][256][0]],
        )

    def test_continuous_all_colors(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 256, mode=PaletteMode.CONTINUOUS),
            VEGA_PALETTE_DATA[VEGA_VIRIDIS][256],
        )

    def test_continuous_accepts_string_and_size(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 7, mode="continuous"),
            sample_continuous(VEGA_PALETTE_DATA[VEGA_VIRIDIS][256], 7),
        )

    def test_continuous_too_many_colors(self):
        with pytest.raises(ValueError, match="Requested 257 colors"):
            get_palette_colors(VEGA_VIRIDIS, 257, mode=PaletteMode.CONTINUOUS)

    def test_continuous_negative_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            get_palette_colors(VEGA_VIRIDIS, -1, mode=PaletteMode.CONTINUOUS)

    def test_continuous_float_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            get_palette_colors(VEGA_VIRIDIS, 1.5, mode=PaletteMode.CONTINUOUS)

    def test_continuous_requires_ramp_with_size(self):
        with pytest.raises(
            ValueError,
            match='Palette "vega_accent" has no continuous data.',
        ):
            get_palette_colors(VEGA_ACCENT, 5, mode=PaletteMode.CONTINUOUS)

    def test_continuous_only_ramp(self):
        palette = {256: ["#000000", "#ffffff"]}

        with patch("chrys.utils.get_palette", return_value=palette):
            self.assertEqual(
                get_palette_colors(VEGA_ACCENT, mode=PaletteMode.CONTINUOUS),
                palette[256],
            )
            self.assertEqual(
                get_palette_colors(VEGA_ACCENT, 1, mode=PaletteMode.CONTINUOUS),
                ["#000000"],
            )

    def test_discrete_zero_colors(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 0, mode=PaletteMode.DISCRETE),
            [],
        )

    def test_discrete_one_color(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 1, mode=PaletteMode.DISCRETE),
            VEGA_PALETTE_DATA[VEGA_VIRIDIS][1],
        )

    def test_discrete_max_size(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 9, mode=PaletteMode.DISCRETE),
            VEGA_PALETTE_DATA[VEGA_VIRIDIS][9],
        )

    def test_discrete_above_max_size(self):
        self.assertEqual(
            get_palette_colors(VEGA_VIRIDIS, 300, mode=PaletteMode.DISCRETE),
            VEGA_PALETTE_DATA[VEGA_VIRIDIS][9],
        )

    def test_discrete_unsupported_size(self):
        palette = {
            256: ["#000000"],
            1: ["#000000"],
            3: ["#000000", "#111111", "#222222"],
        }

        with (
            patch("chrys.utils.get_palette", return_value=palette),
            pytest.raises(
                ValueError,
                match="Unsupported palette size 2. Supported sizes: 1, 3.",
            ),
        ):
            get_palette_colors(VEGA_ACCENT, 2, mode=PaletteMode.DISCRETE)

    def test_discrete_negative_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            get_palette_colors(VEGA_VIRIDIS, -1, mode=PaletteMode.DISCRETE)

    def test_discrete_float_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            get_palette_colors(VEGA_VIRIDIS, 1.5, mode=PaletteMode.DISCRETE)

    def test_discrete_on_discrete_only_palette(self):
        self.assertEqual(
            get_palette_colors(VEGA_ACCENT, mode=PaletteMode.DISCRETE),
            get_palette_colors(VEGA_ACCENT),
        )
        self.assertEqual(
            get_palette_colors(VEGA_ACCENT, 6, mode=PaletteMode.DISCRETE),
            VEGA_PALETTE_DATA[VEGA_ACCENT][6],
        )

    def test_discrete_excludes_ramp_with_single_size(self):
        palette = {
            256: ["#000000", "#111111"],
            5: ["#000000", "#111111", "#222222", "#333333", "#444444"],
        }

        with patch("chrys.utils.get_palette", return_value=palette):
            self.assertEqual(
                get_palette_colors(VEGA_ACCENT, mode=PaletteMode.DISCRETE),
                palette[5],
            )
            self.assertEqual(
                get_palette_colors(VEGA_ACCENT, 3, mode=PaletteMode.DISCRETE),
                palette[5][:3],
            )

    def test_discrete_empty_array(self):
        palette = {256: ["#000000"], 3: []}

        with patch("chrys.utils.get_palette", return_value=palette):
            self.assertEqual(
                get_palette_colors(VEGA_ACCENT, mode=PaletteMode.DISCRETE),
                [],
            )
            self.assertEqual(
                get_palette_colors(VEGA_ACCENT, 3, mode=PaletteMode.DISCRETE),
                [],
            )

    def test_auto_only_ramp(self):
        palette = {256: ["#000000", "#ffffff"]}

        with patch("chrys.utils.get_palette", return_value=palette):
            self.assertEqual(get_palette_colors(VEGA_ACCENT), palette[256])
            self.assertEqual(
                get_palette_colors(VEGA_ACCENT, mode=PaletteMode.AUTO),
                palette[256],
            )

    def test_auto_discrete_only_palette(self):
        self.assertEqual(
            get_palette_colors(VEGA_ACCENT, mode=PaletteMode.AUTO),
            get_palette_colors(VEGA_ACCENT),
        )

    def test_invalid_mode_with_size(self):
        with pytest.raises(ValueError, match='Unknown palette mode "lorem ipsum"'):
            get_palette_colors(VEGA_ACCENT, 5, mode="lorem ipsum")

    def test_invalid_mode_on_continuous_palette(self):
        with pytest.raises(ValueError, match='Unknown palette mode "lorem ipsum"'):
            get_palette_colors(VEGA_VIRIDIS, mode="lorem ipsum")

    def test_invalid_mode_before_invalid_size(self):
        with pytest.raises(ValueError, match='Unknown palette mode "lorem ipsum"'):
            get_palette_colors(VEGA_ACCENT, -1, mode="lorem ipsum")

    def test_invalid_mode_none(self):
        with pytest.raises(ValueError, match="Unknown palette mode"):
            get_palette_colors(VEGA_ACCENT, mode=None)

    def test_invalid_mode_integer(self):
        with pytest.raises(ValueError, match="Unknown palette mode"):
            get_palette_colors(VEGA_ACCENT, mode=42)

    def test_invalid_mode_case(self):
        with pytest.raises(ValueError, match='Unknown palette mode "AUTO"'):
            get_palette_colors(VEGA_ACCENT, mode="AUTO")

    def test_explicit_none_with_each_mode(self):
        for mode in (PaletteMode.AUTO, PaletteMode.CONTINUOUS, PaletteMode.DISCRETE):
            with self.subTest(mode=mode):
                self.assertEqual(
                    get_palette_colors(VEGA_VIRIDIS, None, mode=mode),
                    get_palette_colors(VEGA_VIRIDIS, mode=mode),
                )

    def test_invalid_mode_before_palette_lookup(self):
        with pytest.raises(ValueError, match='Unknown palette mode "lorem ipsum"'):
            get_palette_colors("lorem ipsum", mode="lorem ipsum")

    def test_invalid_mode_before_empty_palette_data(self):
        with (
            patch("chrys.utils.PALETTE_DATA", {Vendor.VEGA: {VEGA_ACCENT: {}}}),
            pytest.raises(ValueError, match='Unknown palette mode "lorem ipsum"'),
        ):
            get_palette_colors(VEGA_ACCENT, mode="lorem ipsum")

    def test_unknown_vendor(self):
        with pytest.raises(VendorNotFoundError, match='Vendor "unknown" not found.'):
            get_palette_colors("unknown_accent")

    def test_empty_palette_data(self):
        with (
            patch("chrys.utils.PALETTE_DATA", {Vendor.VEGA: {VEGA_ACCENT: {}}}),
            pytest.raises(
                PaletteDataEmptyError,
                match='Palette data for "vega_accent" is empty.',
            ),
        ):
            get_palette_colors(VEGA_ACCENT)


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

    def test_default_returns_all_colors(self):
        self.assertEqual(to_continuous_colors(self.colors), self.colors)

    def test_none_returns_all_colors(self):
        self.assertEqual(to_continuous_colors(self.colors, None), self.colors)

    def test_empty_colors(self):
        self.assertEqual(to_continuous_colors([]), [])
        self.assertEqual(to_continuous_colors([], 0), [])

    def test_empty_colors_one(self):
        with pytest.raises(ValueError, match="Requested 1 colors"):
            to_continuous_colors([], 1)

    def test_single_color(self):
        colors = ["#000000"]

        self.assertEqual(to_continuous_colors(colors), colors)
        self.assertEqual(to_continuous_colors(colors, 1), colors)

    def test_single_color_two(self):
        with pytest.raises(ValueError, match="Requested 2 colors"):
            to_continuous_colors(["#000000"], 2)

    def test_two_colors_one(self):
        self.assertEqual(
            to_continuous_colors(["#000000", "#ffffff"], 1),
            ["#000000"],
        )

    def test_two_colors_two(self):
        colors = ["#000000", "#ffffff"]

        self.assertEqual(to_continuous_colors(colors, 2), colors)

    def test_three_colors(self):
        self.assertEqual(
            to_continuous_colors(self.colors, 3),
            [self.colors[0], self.colors[1], self.colors[3]],
        )

    def test_bool_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_continuous_colors(self.colors, True)

    def test_copy_when_default(self):
        colors = to_continuous_colors(self.colors)

        colors.pop(0)

        self.assertEqual(
            self.colors,
            ["#000000", "#111111", "#222222", "#333333"],
        )

    def test_copy_when_one_color(self):
        colors = to_continuous_colors(self.colors, 1)

        colors.pop(0)

        self.assertEqual(
            self.colors,
            ["#000000", "#111111", "#222222", "#333333"],
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

    def test_nan_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_continuous_colors(self.colors, float("nan"))

    def test_infinite_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_continuous_colors(self.colors, float("inf"))
