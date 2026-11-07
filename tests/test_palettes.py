from chrys.data.bokeh_palettes import BOKEH_PALETTE_NAMES
from chrys.data.d3_palettes import D3_PALETTE_NAMES
from chrys.data.vega_palettes import VEGA_PALETTE_NAMES
from chrys.palettes import (
    CATEGORICAL_PALETTE_VENDORS,
    CYCLICAL_PALETTE_VENDORS,
    DIVERGING_PALETTE_VENDORS,
    PALETTE_DATA,
    PALETTE_TO_VENDOR_MAP,
    SEQUENTIAL_PALETTE_VENDORS,
    Vendor,
)
from chrys.utils import _is_continuous, parse_palette_name

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


class TestRegistry(unittest.TestCase):
    def test_groups_have_data(self):
        for group, mappings in PALETTE_GROUPS:
            for mapping in mappings:
                for vendor, name in mapping.items():
                    if name is None:
                        continue

                    with self.subTest(group=group, vendor=vendor, palette=name):
                        self.assertIn(name, PALETTE_DATA[vendor])

    def test_no_duplicate_names_within_group(self):
        for group, mappings in PALETTE_GROUPS:
            seen = set()

            for mapping in mappings:
                for name in mapping.values():
                    if name is None:
                        continue

                    with self.subTest(group=group, palette=name):
                        self.assertNotIn(name, seen)
                        seen.add(name)

    def test_palette_maps_cover_data(self):
        for vendor in PALETTE_DATA:
            with self.subTest(vendor=vendor):
                names = set(PALETTE_NAMES[vendor].values())
                mapped = {
                    name
                    for name, mapped_vendor in PALETTE_TO_VENDOR_MAP.items()
                    if mapped_vendor == vendor
                }

                self.assertEqual(names, set(PALETTE_DATA[vendor]))
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
            names = set(data)

            for name in names:
                with self.subTest(vendor=vendor, palette=name):
                    parsed = parse_palette_name(name)

                    self.assertEqual(parsed.vendor, vendor)
                    self.assertEqual(parsed.palette, name[len(vendor) + 1 :])
