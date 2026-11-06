from chrys.data.bokeh_palettes import BOKEH_PALETTE_NAMES
from chrys.data.d3_palettes import D3_PALETTE_NAMES
from chrys.data.vega_palettes import VEGA_PALETTE_NAMES
from chrys.palettes import (
    _is_continuous,
    BOKEH_ACCENT,
    BOKEH_DOCS_PALETTE_DATA,
    BOKEH_PALETTE_DATA,
    BOKEH_VIRIDIS,
    CATEGORICAL_PALETTE_VENDORS,
    continuous_palette,
    CYCLICAL_PALETTE_VENDORS,
    D3_BLUES,
    D3_DOCS_PALETTE_DATA,
    D3_PALETTE_DATA,
    D3_VIRIDIS,
    discrete_palette,
    DIVERGING_PALETTE_VENDORS,
    docs_palette,
    DOCS_PALETTE_DATA,
    PALETTE_DATA,
    PALETTE_TO_VENDOR_MAP,
    parse_palette_name,
    SEQUENTIAL_PALETTE_VENDORS,
    to_continuous_palette,
    to_discrete_palette,
    VEGA_ACCENT,
    VEGA_DOCS_PALETTE_DATA,
    VEGA_PALETTE_DATA,
    VEGA_VIRIDIS,
    Vendor,
)

import math
import matplotlib as mpl
import pytest
import re
import unittest

HEX_COLOR = re.compile(r"^#[0-9a-f]{6}$")

PALETTE_NAMES = {
    Vendor.BOKEH: BOKEH_PALETTE_NAMES,
    Vendor.VEGA: VEGA_PALETTE_NAMES,
    Vendor.D3: D3_PALETTE_NAMES,
}

PALETTE_GROUPS = (
    ("categorical", CATEGORICAL_PALETTE_VENDORS),
    ("diverging", DIVERGING_PALETTE_VENDORS),
    ("sequential", SEQUENTIAL_PALETTE_VENDORS),
    ("cyclical", CYCLICAL_PALETTE_VENDORS),
)


def sample_continuous(colors, n):
    if n < 2:
        return colors[:n]

    step = (len(colors) - 1) / (n - 1)

    return [colors[math.floor(i * step)] for i in range(n)]


class TestParsePaletteName(unittest.TestCase):
    def test_valid_name(self):
        self.assertTupleEqual(parse_palette_name(VEGA_ACCENT), ("vega", "accent"))

    def test_invalid_name(self):
        with pytest.raises(ValueError):
            parse_palette_name("lorem ipsum")


class TestContinuousPalette(unittest.TestCase):
    def test_zero_colors(self):
        self.assertCountEqual(continuous_palette(VEGA_VIRIDIS, 0), [])

    def test_one_color(self):
        self.assertCountEqual(continuous_palette(VEGA_VIRIDIS, 1), ["#440356"])

    def test_all_colors(self):
        self.assertCountEqual(
            continuous_palette(VEGA_VIRIDIS, 256),
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
            continuous_palette(VEGA_VIRIDIS, 257)

    def test_bokeh_palette(self):
        self.assertEqual(
            continuous_palette(BOKEH_VIRIDIS, 6),
            sample_continuous(BOKEH_PALETTE_DATA[BOKEH_VIRIDIS][256], 6),
        )

    def test_d3_palette(self):
        self.assertEqual(
            continuous_palette(D3_VIRIDIS, 6),
            sample_continuous(D3_PALETTE_DATA[D3_VIRIDIS][256], 6),
        )

    def test_as_rgb(self):
        result = continuous_palette(VEGA_VIRIDIS, 6, as_rgb=True)
        expected = [
            mpl.colors.to_rgb(color)
            for color in sample_continuous(VEGA_PALETTE_DATA[VEGA_VIRIDIS][256], 6)
        ]

        self.assertEqual(result, expected)

    def test_unsupported_palette(self):
        with pytest.raises(
            ValueError,
            match='Generating continuous palettes of "vega_accent" is not supported',
        ):
            continuous_palette(VEGA_ACCENT, 6)


class TestDiscretePalette(unittest.TestCase):
    def test_no_size(self):
        self.assertCountEqual(
            discrete_palette(VEGA_ACCENT),
            ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f"],
        )

    def test_valid_size(self):
        self.assertCountEqual(
            discrete_palette(VEGA_ACCENT, 8),
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

    def test_invalid_size(self):
        self.assertCountEqual(
            discrete_palette(VEGA_ACCENT, 20),
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

    def test_invalid_name(self):
        with pytest.raises(ValueError):
            discrete_palette("lorem ipsum")

    def test_bokeh_palette(self):
        self.assertEqual(
            discrete_palette(BOKEH_ACCENT, 6),
            BOKEH_PALETTE_DATA[BOKEH_ACCENT][6],
        )

    def test_d3_palette(self):
        self.assertEqual(
            discrete_palette(D3_BLUES, 6),
            D3_PALETTE_DATA[D3_BLUES][6],
        )

    def test_as_rgb(self):
        result = discrete_palette(VEGA_ACCENT, 3, as_rgb=True)
        expected = [mpl.colors.to_rgb(color) for color in VEGA_PALETTE_DATA[VEGA_ACCENT][3]]

        self.assertEqual(result, expected)

        for color in result:
            self.assertIsInstance(color, tuple)
            self.assertEqual(len(color), 3)


class TestDocsPalette(unittest.TestCase):
    def test_bokeh_docs(self):
        self.assertEqual(docs_palette(BOKEH_ACCENT), BOKEH_DOCS_PALETTE_DATA[BOKEH_ACCENT])

    def test_vega_docs(self):
        self.assertEqual(docs_palette(VEGA_ACCENT), VEGA_DOCS_PALETTE_DATA[VEGA_ACCENT])

    def test_d3_docs(self):
        self.assertEqual(docs_palette(D3_BLUES), D3_DOCS_PALETTE_DATA[D3_BLUES])

    def test_as_rgb(self):
        result = docs_palette(VEGA_ACCENT, as_rgb=True)
        expected = [mpl.colors.to_rgb(color) for color in VEGA_DOCS_PALETTE_DATA[VEGA_ACCENT]]

        self.assertEqual(result, expected)

    def test_invalid_name(self):
        with pytest.raises(ValueError, match="not recognized"):
            docs_palette("lorem ipsum")

    def test_returns_copy(self):
        palette = docs_palette(VEGA_ACCENT)
        original = palette[0]

        palette[0] = "#000000"

        self.assertEqual(docs_palette(VEGA_ACCENT)[0], original)


class TestToDiscretePalette(unittest.TestCase):
    def test_empty_palette(self):
        with pytest.raises(ValueError, match="Palette is empty."):
            to_discrete_palette({})

    def test_zero_colors(self):
        self.assertEqual(to_discrete_palette({1: ["#000000"]}, 0), [])

    def test_default_size(self):
        palette = {6: [f"#{i}{i}{i}{i}{i}{i}" for i in range(6)]}

        self.assertEqual(to_discrete_palette(palette), palette[6])

    def test_below_minimum(self):
        palette = {3: ["#000000", "#111111", "#222222"]}

        self.assertEqual(to_discrete_palette(palette, 2), palette[3][:2])

    def test_above_maximum(self):
        palette = {2: ["#000000", "#111111"]}

        self.assertEqual(to_discrete_palette(palette, 5), palette[2])

    def test_supported_size(self):
        palette = {
            1: ["#000000"],
            3: ["#000000", "#111111", "#222222"],
        }

        self.assertEqual(to_discrete_palette(palette, 3), palette[3])

    def test_unsupported_size(self):
        palette = {
            1: ["#000000"],
            3: ["#000000", "#111111", "#222222"],
        }

        with pytest.raises(
            ValueError,
            match="Unsupported palette size 2. Supported sizes: 1, 3.",
        ):
            to_discrete_palette(palette, 2)

    def test_negative_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_discrete_palette({1: ["#000000"]}, -1)

    def test_float_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_discrete_palette({1: ["#000000"]}, 1.5)

    def test_bool_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_discrete_palette({1: ["#000000"]}, True)

    def test_as_rgb(self):
        palette = {2: ["#000000", "#ffffff"]}
        expected = [mpl.colors.to_rgb(color) for color in palette[2]]

        self.assertEqual(to_discrete_palette(palette, as_rgb=True), expected)


class TestToContinuousPalette(unittest.TestCase):
    colors = ["#000000", "#111111", "#222222", "#333333"]

    def test_zero_colors(self):
        self.assertEqual(to_continuous_palette(self.colors, 0), [])

    def test_one_color(self):
        self.assertEqual(to_continuous_palette(self.colors, 1), [self.colors[0]])

    def test_two_colors(self):
        self.assertEqual(
            to_continuous_palette(self.colors, 2),
            [self.colors[0], self.colors[-1]],
        )

    def test_all_colors(self):
        self.assertEqual(
            to_continuous_palette(self.colors, len(self.colors)),
            self.colors,
        )

    def test_too_many_colors(self):
        with pytest.raises(ValueError, match="Requested 5 colors"):
            to_continuous_palette(self.colors, 5)

    def test_negative_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_continuous_palette(self.colors, -1)

    def test_float_size(self):
        with pytest.raises(ValueError, match="non-negative integer"):
            to_continuous_palette(self.colors, 1.5)

    def test_as_rgb(self):
        expected = [mpl.colors.to_rgb(color) for color in self.colors]

        self.assertEqual(
            to_continuous_palette(self.colors, len(self.colors), as_rgb=True),
            expected,
        )


class TestRegistry(unittest.TestCase):
    def test_groups_have_data_and_docs(self):
        for group, mappings in PALETTE_GROUPS:
            for mapping in mappings:
                for vendor, name in mapping.items():
                    if name is None:
                        continue

                    with self.subTest(group=group, vendor=vendor, palette=name):
                        self.assertIn(name, PALETTE_DATA[vendor])
                        self.assertIn(name, DOCS_PALETTE_DATA[vendor])

    def test_no_duplicate_names_within_group(self):
        for group, mappings in PALETTE_GROUPS:
            seen = set()

            for mapping in mappings:
                for vendor, name in mapping.items():
                    if name is None:
                        continue

                    with self.subTest(group=group, palette=name):
                        self.assertNotIn(name, seen)
                        seen.add(name)

    def test_palette_maps_cover_data_and_docs(self):
        for vendor in PALETTE_DATA:
            with self.subTest(vendor=vendor):
                names = set(PALETTE_NAMES[vendor].values())
                mapped = {
                    name
                    for name, mapped_vendor in PALETTE_TO_VENDOR_MAP.items()
                    if mapped_vendor == vendor
                }

                self.assertEqual(names, set(PALETTE_DATA[vendor]))
                self.assertEqual(names, set(DOCS_PALETTE_DATA[vendor]))
                self.assertEqual(names, mapped)

    def test_discrete_palette_sizes(self):
        for vendor, data in PALETTE_DATA.items():
            for name, palette in data.items():
                with self.subTest(vendor=vendor, palette=name):
                    sizes = sorted(palette)
                    discrete_sizes = [size for size in sizes if size != 256]

                    self.assertTrue(discrete_sizes)
                    self.assertEqual(
                        discrete_sizes,
                        list(range(discrete_sizes[0], discrete_sizes[-1] + 1)),
                    )
                    self.assertTrue(256 not in palette or sizes[-1] == 256)

                    for size in sizes:
                        self.assertIsInstance(size, int)
                        self.assertGreaterEqual(size, 1)
                        self.assertLessEqual(size, 256)
                        self.assertEqual(len(palette[size]), size)

    def test_colors_are_hexadecimal(self):
        for vendor, data in PALETTE_DATA.items():
            for name, palette in data.items():
                for size, colors in palette.items():
                    for color in colors:
                        with self.subTest(
                            vendor=vendor,
                            palette=name,
                            size=size,
                            color=color,
                        ):
                            self.assertRegex(color, HEX_COLOR)

        for vendor, docs in DOCS_PALETTE_DATA.items():
            for name, colors in docs.items():
                self.assertTrue(colors)

                for color in colors:
                    with self.subTest(vendor=vendor, palette=name, color=color):
                        self.assertRegex(color, HEX_COLOR)

    def test_continuous_palettes(self):
        for vendor, data in PALETTE_DATA.items():
            for name, palette in data.items():
                with self.subTest(vendor=vendor, palette=name):
                    continuous = 256 in palette

                    self.assertEqual(_is_continuous(name), continuous)

                    if continuous:
                        self.assertEqual(len(palette[256]), 256)

    def test_all_names_parse(self):
        for vendor, data in PALETTE_DATA.items():
            names = set(data) | set(DOCS_PALETTE_DATA[vendor])

            for name in names:
                with self.subTest(vendor=vendor, palette=name):
                    parsed = parse_palette_name(name)

                    self.assertEqual(parsed.vendor, vendor)
                    self.assertEqual(parsed.palette, name[len(vendor) + 1 :])
