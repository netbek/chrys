from chrys.data.bokeh_palettes import (
    BOKEH_ACCENT,
    BOKEH_BLUE_GREEN,
    BOKEH_BLUE_PURPLE,
    BOKEH_BLUES,
    BOKEH_BROWN_BLUE_GREEN,
    BOKEH_CATEGORY_10,
    BOKEH_CATEGORY_20,
    BOKEH_CATEGORY_20_B,
    BOKEH_CATEGORY_20_C,
    BOKEH_COLORBLIND,
    BOKEH_DARK_2,
    BOKEH_GREEN_BLUE,
    BOKEH_GREENS,
    BOKEH_GREYS,
    BOKEH_INFERNO,
    BOKEH_MAGMA,
    BOKEH_ORANGE_RED,
    BOKEH_ORANGES,
    BOKEH_PAIRED,
    BOKEH_PALETTE_DATA,
    BOKEH_PALETTE_NAMES,
    BOKEH_PALETTES,
    BOKEH_PASTEL_1,
    BOKEH_PASTEL_2,
    BOKEH_PINK_YELLOW_GREEN,
    BOKEH_PLASMA,
    BOKEH_PURPLE_BLUE,
    BOKEH_PURPLE_BLUE_GREEN,
    BOKEH_PURPLE_GREEN,
    BOKEH_PURPLE_ORANGE,
    BOKEH_PURPLE_RED,
    BOKEH_PURPLES,
    BOKEH_RED_BLUE,
    BOKEH_RED_GREY,
    BOKEH_RED_PURPLE,
    BOKEH_RED_YELLOW_BLUE,
    BOKEH_RED_YELLOW_GREEN,
    BOKEH_REDS,
    BOKEH_SET_1,
    BOKEH_SET_2,
    BOKEH_SET_3,
    BOKEH_SPECTRAL,
    BOKEH_VIRIDIS,
    BOKEH_YELLOW_GREEN,
    BOKEH_YELLOW_GREEN_BLUE,
    BOKEH_YELLOW_ORANGE_BROWN,
    BOKEH_YELLOW_ORANGE_RED,
)
from chrys.data.d3_palettes import (
    D3_ACCENT,
    D3_BLUE_GREEN,
    D3_BLUE_PURPLE,
    D3_BLUES,
    D3_BROWN_BLUE_GREEN,
    D3_CATEGORY_10,
    D3_CIVIDIS,
    D3_COOL,
    D3_CUBEHELIX_DEFAULT,
    D3_DARK_2,
    D3_GREEN_BLUE,
    D3_GREENS,
    D3_GREYS,
    D3_INFERNO,
    D3_MAGMA,
    D3_OBSERVABLE_10,
    D3_ORANGE_RED,
    D3_ORANGES,
    D3_PAIRED,
    D3_PALETTE_DATA,
    D3_PASTEL_1,
    D3_PASTEL_2,
    D3_PINK_YELLOW_GREEN,
    D3_PLASMA,
    D3_PURPLE_BLUE,
    D3_PURPLE_BLUE_GREEN,
    D3_PURPLE_GREEN,
    D3_PURPLE_ORANGE,
    D3_PURPLE_RED,
    D3_PURPLES,
    D3_RAINBOW,
    D3_RED_BLUE,
    D3_RED_GREY,
    D3_RED_PURPLE,
    D3_RED_YELLOW_BLUE,
    D3_RED_YELLOW_GREEN,
    D3_REDS,
    D3_SET_1,
    D3_SET_2,
    D3_SET_3,
    D3_SINEBOW,
    D3_SPECTRAL,
    D3_TABLEAU_10,
    D3_TURBO,
    D3_VIRIDIS,
    D3_WARM,
    D3_YELLOW_GREEN,
    D3_YELLOW_GREEN_BLUE,
    D3_YELLOW_ORANGE_BROWN,
    D3_YELLOW_ORANGE_RED,
)
from chrys.data.vega_palettes import (
    VEGA_ACCENT,
    VEGA_BLUE_GREEN,
    VEGA_BLUE_ORANGE,
    VEGA_BLUE_PURPLE,
    VEGA_BLUES,
    VEGA_BROWN_BLUE_GREEN,
    VEGA_BROWNS,
    VEGA_CATEGORY_10,
    VEGA_CATEGORY_20,
    VEGA_CATEGORY_20_B,
    VEGA_CATEGORY_20_C,
    VEGA_CIVIDIS,
    VEGA_DARK_2,
    VEGA_DARK_BLUE,
    VEGA_DARK_GOLD,
    VEGA_DARK_GREEN,
    VEGA_DARK_MULTI,
    VEGA_DARK_RED,
    VEGA_GOLD_GREEN,
    VEGA_GOLD_ORANGE,
    VEGA_GOLD_RED,
    VEGA_GREEN_BLUE,
    VEGA_GREENS,
    VEGA_GREYS,
    VEGA_INFERNO,
    VEGA_LIGHT_GREY_RED,
    VEGA_LIGHT_GREY_TEAL,
    VEGA_LIGHT_MULTI,
    VEGA_LIGHT_ORANGE,
    VEGA_LIGHT_TEAL_BLUE,
    VEGA_MAGMA,
    VEGA_OBSERVABLE_10,
    VEGA_ORANGE_RED,
    VEGA_ORANGES,
    VEGA_PAIRED,
    VEGA_PALETTE_DATA,
    VEGA_PALETTE_NAMES,
    VEGA_PALETTES,
    VEGA_PASTEL_1,
    VEGA_PASTEL_2,
    VEGA_PINK_YELLOW_GREEN,
    VEGA_PLASMA,
    VEGA_PURPLE_BLUE,
    VEGA_PURPLE_BLUE_GREEN,
    VEGA_PURPLE_GREEN,
    VEGA_PURPLE_ORANGE,
    VEGA_PURPLE_RED,
    VEGA_PURPLES,
    VEGA_RAINBOW,
    VEGA_RED_BLUE,
    VEGA_RED_GREY,
    VEGA_RED_PURPLE,
    VEGA_RED_YELLOW_BLUE,
    VEGA_RED_YELLOW_GREEN,
    VEGA_REDS,
    VEGA_SET_1,
    VEGA_SET_2,
    VEGA_SET_3,
    VEGA_SINEBOW,
    VEGA_SPECTRAL,
    VEGA_TABLEAU_10,
    VEGA_TABLEAU_20,
    VEGA_TEAL_BLUES,
    VEGA_TEALS,
    VEGA_TURBO,
    VEGA_VIRIDIS,
    VEGA_WARM_GREYS,
    VEGA_YELLOW_GREEN,
    VEGA_YELLOW_GREEN_BLUE,
    VEGA_YELLOW_ORANGE_BROWN,
    VEGA_YELLOW_ORANGE_RED,
)
from enum import StrEnum


class Vendor(StrEnum):
    BOKEH = "bokeh"
    VEGA = "vega"
    D3 = "d3"


CATEGORICAL_PALETTE_VENDORS = (
    {
        Vendor.BOKEH: BOKEH_ACCENT,
        Vendor.VEGA: VEGA_ACCENT,
        Vendor.D3: D3_ACCENT,
    },
    {
        Vendor.BOKEH: BOKEH_CATEGORY_10,
        Vendor.VEGA: VEGA_CATEGORY_10,
        Vendor.D3: D3_CATEGORY_10,
    },
    {
        Vendor.BOKEH: BOKEH_CATEGORY_20,
        Vendor.VEGA: VEGA_CATEGORY_20,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: BOKEH_CATEGORY_20_B,
        Vendor.VEGA: VEGA_CATEGORY_20_B,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: BOKEH_CATEGORY_20_C,
        Vendor.VEGA: VEGA_CATEGORY_20_C,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: BOKEH_DARK_2,
        Vendor.VEGA: VEGA_DARK_2,
        Vendor.D3: D3_DARK_2,
    },
    {
        Vendor.BOKEH: BOKEH_PAIRED,
        Vendor.VEGA: VEGA_PAIRED,
        Vendor.D3: D3_PAIRED,
    },
    {
        Vendor.BOKEH: BOKEH_PASTEL_1,
        Vendor.VEGA: VEGA_PASTEL_1,
        Vendor.D3: D3_PASTEL_1,
    },
    {
        Vendor.BOKEH: BOKEH_PASTEL_2,
        Vendor.VEGA: VEGA_PASTEL_2,
        Vendor.D3: D3_PASTEL_2,
    },
    {
        Vendor.BOKEH: BOKEH_SET_1,
        Vendor.VEGA: VEGA_SET_1,
        Vendor.D3: D3_SET_1,
    },
    {
        Vendor.BOKEH: BOKEH_SET_2,
        Vendor.VEGA: VEGA_SET_2,
        Vendor.D3: D3_SET_2,
    },
    {
        Vendor.BOKEH: BOKEH_SET_3,
        Vendor.VEGA: VEGA_SET_3,
        Vendor.D3: D3_SET_3,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_TABLEAU_10,
        Vendor.D3: D3_TABLEAU_10,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_TABLEAU_20,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_OBSERVABLE_10,
        Vendor.D3: D3_OBSERVABLE_10,
    },
    {
        Vendor.BOKEH: BOKEH_COLORBLIND,
        Vendor.VEGA: None,
        Vendor.D3: None,
    },
)

DIVERGING_PALETTE_VENDORS = (
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_BLUE_ORANGE,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: BOKEH_BROWN_BLUE_GREEN,
        Vendor.VEGA: VEGA_BROWN_BLUE_GREEN,
        Vendor.D3: D3_BROWN_BLUE_GREEN,
    },
    {
        Vendor.BOKEH: BOKEH_PURPLE_GREEN,
        Vendor.VEGA: VEGA_PURPLE_GREEN,
        Vendor.D3: D3_PURPLE_GREEN,
    },
    {
        Vendor.BOKEH: BOKEH_PINK_YELLOW_GREEN,
        Vendor.VEGA: VEGA_PINK_YELLOW_GREEN,
        Vendor.D3: D3_PINK_YELLOW_GREEN,
    },
    {
        Vendor.BOKEH: BOKEH_PURPLE_ORANGE,
        Vendor.VEGA: VEGA_PURPLE_ORANGE,
        Vendor.D3: D3_PURPLE_ORANGE,
    },
    {
        Vendor.BOKEH: BOKEH_RED_BLUE,
        Vendor.VEGA: VEGA_RED_BLUE,
        Vendor.D3: D3_RED_BLUE,
    },
    {
        Vendor.BOKEH: BOKEH_RED_GREY,
        Vendor.VEGA: VEGA_RED_GREY,
        Vendor.D3: D3_RED_GREY,
    },
    {
        Vendor.BOKEH: BOKEH_RED_YELLOW_BLUE,
        Vendor.VEGA: VEGA_RED_YELLOW_BLUE,
        Vendor.D3: D3_RED_YELLOW_BLUE,
    },
    {
        Vendor.BOKEH: BOKEH_RED_YELLOW_GREEN,
        Vendor.VEGA: VEGA_RED_YELLOW_GREEN,
        Vendor.D3: D3_RED_YELLOW_GREEN,
    },
    {
        Vendor.BOKEH: BOKEH_SPECTRAL,
        Vendor.VEGA: VEGA_SPECTRAL,
        Vendor.D3: D3_SPECTRAL,
    },
)

SEQUENTIAL_PALETTE_VENDORS = (
    # Single hue
    {
        Vendor.BOKEH: BOKEH_BLUES,
        Vendor.VEGA: VEGA_BLUES,
        Vendor.D3: D3_BLUES,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_TEAL_BLUES,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_TEALS,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: BOKEH_GREENS,
        Vendor.VEGA: VEGA_GREENS,
        Vendor.D3: D3_GREENS,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_BROWNS,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: BOKEH_ORANGES,
        Vendor.VEGA: VEGA_ORANGES,
        Vendor.D3: D3_ORANGES,
    },
    {
        Vendor.BOKEH: BOKEH_REDS,
        Vendor.VEGA: VEGA_REDS,
        Vendor.D3: D3_REDS,
    },
    {
        Vendor.BOKEH: BOKEH_PURPLES,
        Vendor.VEGA: VEGA_PURPLES,
        Vendor.D3: D3_PURPLES,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_WARM_GREYS,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: BOKEH_GREYS,
        Vendor.VEGA: VEGA_GREYS,
        Vendor.D3: D3_GREYS,
    },
    # Multiple hues
    {
        Vendor.BOKEH: BOKEH_VIRIDIS,
        Vendor.VEGA: VEGA_VIRIDIS,
        Vendor.D3: D3_VIRIDIS,
    },
    {
        Vendor.BOKEH: BOKEH_MAGMA,
        Vendor.VEGA: VEGA_MAGMA,
        Vendor.D3: D3_MAGMA,
    },
    {
        Vendor.BOKEH: BOKEH_INFERNO,
        Vendor.VEGA: VEGA_INFERNO,
        Vendor.D3: D3_INFERNO,
    },
    {
        Vendor.BOKEH: BOKEH_PLASMA,
        Vendor.VEGA: VEGA_PLASMA,
        Vendor.D3: D3_PLASMA,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_CIVIDIS,
        Vendor.D3: D3_CIVIDIS,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_TURBO,
        Vendor.D3: D3_TURBO,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: None,
        Vendor.D3: D3_CUBEHELIX_DEFAULT,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: None,
        Vendor.D3: D3_WARM,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: None,
        Vendor.D3: D3_COOL,
    },
    {
        Vendor.BOKEH: BOKEH_BLUE_GREEN,
        Vendor.VEGA: VEGA_BLUE_GREEN,
        Vendor.D3: D3_BLUE_GREEN,
    },
    {
        Vendor.BOKEH: BOKEH_BLUE_PURPLE,
        Vendor.VEGA: VEGA_BLUE_PURPLE,
        Vendor.D3: D3_BLUE_PURPLE,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_GOLD_GREEN,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_GOLD_ORANGE,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_GOLD_RED,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: BOKEH_GREEN_BLUE,
        Vendor.VEGA: VEGA_GREEN_BLUE,
        Vendor.D3: D3_GREEN_BLUE,
    },
    {
        Vendor.BOKEH: BOKEH_ORANGE_RED,
        Vendor.VEGA: VEGA_ORANGE_RED,
        Vendor.D3: D3_ORANGE_RED,
    },
    {
        Vendor.BOKEH: BOKEH_PURPLE_BLUE_GREEN,
        Vendor.VEGA: VEGA_PURPLE_BLUE_GREEN,
        Vendor.D3: D3_PURPLE_BLUE_GREEN,
    },
    {
        Vendor.BOKEH: BOKEH_PURPLE_BLUE,
        Vendor.VEGA: VEGA_PURPLE_BLUE,
        Vendor.D3: D3_PURPLE_BLUE,
    },
    {
        Vendor.BOKEH: BOKEH_PURPLE_RED,
        Vendor.VEGA: VEGA_PURPLE_RED,
        Vendor.D3: D3_PURPLE_RED,
    },
    {
        Vendor.BOKEH: BOKEH_RED_PURPLE,
        Vendor.VEGA: VEGA_RED_PURPLE,
        Vendor.D3: D3_RED_PURPLE,
    },
    {
        Vendor.BOKEH: BOKEH_YELLOW_GREEN_BLUE,
        Vendor.VEGA: VEGA_YELLOW_GREEN_BLUE,
        Vendor.D3: D3_YELLOW_GREEN_BLUE,
    },
    {
        Vendor.BOKEH: BOKEH_YELLOW_GREEN,
        Vendor.VEGA: VEGA_YELLOW_GREEN,
        Vendor.D3: D3_YELLOW_GREEN,
    },
    {
        Vendor.BOKEH: BOKEH_YELLOW_ORANGE_BROWN,
        Vendor.VEGA: VEGA_YELLOW_ORANGE_BROWN,
        Vendor.D3: D3_YELLOW_ORANGE_BROWN,
    },
    {
        Vendor.BOKEH: BOKEH_YELLOW_ORANGE_RED,
        Vendor.VEGA: VEGA_YELLOW_ORANGE_RED,
        Vendor.D3: D3_YELLOW_ORANGE_RED,
    },
    # For dark backgrounds
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_DARK_BLUE,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_DARK_GOLD,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_DARK_GREEN,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_DARK_MULTI,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_DARK_RED,
        Vendor.D3: None,
    },
    # For light backgrounds
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_LIGHT_GREY_RED,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_LIGHT_GREY_TEAL,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_LIGHT_MULTI,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_LIGHT_ORANGE,
        Vendor.D3: None,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_LIGHT_TEAL_BLUE,
        Vendor.D3: None,
    },
)

CYCLICAL_PALETTE_VENDORS = (
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_RAINBOW,
        Vendor.D3: D3_RAINBOW,
    },
    {
        Vendor.BOKEH: None,
        Vendor.VEGA: VEGA_SINEBOW,
        Vendor.D3: D3_SINEBOW,
    },
)

PALETTE_TO_VENDOR_MAP = {}
mappings = (
    DIVERGING_PALETTE_VENDORS,
    CATEGORICAL_PALETTE_VENDORS,
    SEQUENTIAL_PALETTE_VENDORS,
    CYCLICAL_PALETTE_VENDORS,
)
for mapping in mappings:
    for palette in mapping:
        for vendor, name in palette.items():
            if name:
                PALETTE_TO_VENDOR_MAP[name] = vendor

BOKEH_CONTINUOUS_PALETTE_NAMES = [
    name
    for name, palette in BOKEH_PALETTE_DATA.items()
    if [x for x in list(palette.keys()) if x == 256]
]

VEGA_CONTINUOUS_PALETTE_NAMES = [
    name
    for name, palette in VEGA_PALETTE_DATA.items()
    if [x for x in list(palette.keys()) if x == 256]
]

D3_CONTINUOUS_PALETTE_NAMES = [
    name
    for name, palette in D3_PALETTE_DATA.items()
    if [x for x in list(palette.keys()) if x == 256]
]

PALETTE_DATA = {
    Vendor.BOKEH: BOKEH_PALETTE_DATA,
    Vendor.VEGA: VEGA_PALETTE_DATA,
    Vendor.D3: D3_PALETTE_DATA,
}

CONTINUOUS_PALETTE_NAMES = {
    Vendor.BOKEH: BOKEH_CONTINUOUS_PALETTE_NAMES,
    Vendor.VEGA: VEGA_CONTINUOUS_PALETTE_NAMES,
    Vendor.D3: D3_CONTINUOUS_PALETTE_NAMES,
}
