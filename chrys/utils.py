from chrys.chroma_js import contrast, contrast_apca
from chrys.exceptions import (
    PaletteDataEmptyError,
    PaletteNotFoundError,
    VendorNotFoundError,
)
from chrys.palettes import (
    PALETTE_DATA,
    PALETTE_TO_VENDOR_MAP,
    Vendor,
)
from collections.abc import Mapping
from enum import StrEnum
from typing import NamedTuple

import math
import matplotlib as mpl

# A hexadecimal color string.
type HexColor = str

# A list of hexadecimal color strings.
type HexColors = list[HexColor]

# Palette sizes mapped to color arrays.
type Palette = Mapping[int, HexColors]

# An RGB color as red, green, and blue channels.
type RGBColor = tuple[float, float, float]

# A list of RGB colors.
type RGBColors = list[RGBColor]

# Colors represented as hexadecimal strings or RGB tuples.
type Colors = HexColors | RGBColors

# A qualified palette name: includes its vendor prefix, for example "vega_accent".
type QualifiedPaletteName = str


class ParsedPaletteName(NamedTuple):
    """A qualified palette name parsed into its vendor and vendor-specific palette name."""

    vendor: Vendor
    palette: str


class Algorithm(StrEnum):
    """Contrast algorithm."""

    APCA = "apca"
    WCAG = "wcag"


def best_color_contrast(
    bg_color: HexColor, fg_colors: HexColors, algorithm: str = Algorithm.APCA
) -> HexColor:
    """Select the foreground color with the highest contrast against a background color.

    Args:
        bg_color: Background color.
        fg_colors: Candidate foreground colors.
        algorithm: Contrast algorithm to use (``"apca"`` or ``"wcag"``).

    Returns:
        The foreground color with the highest contrast.

    Raises:
        ValueError: If ``fg_colors`` is empty or a color is invalid.
    """
    if not fg_colors:
        raise ValueError("At least one foreground color is required.")

    score = contrast_apca if algorithm == Algorithm.APCA else contrast
    scores = [abs(score(bg_color, fg_color)) for fg_color in fg_colors]
    max_score = max(scores)
    max_score_index = scores.index(max_score)

    return fg_colors[max_score_index]


def parse_palette_name(name: QualifiedPaletteName) -> ParsedPaletteName:
    """Parse a qualified palette name into its vendor and vendor-specific palette name.

    Args:
        name: Qualified palette name, for example ``"vega_accent"``.

    Returns:
        The parsed palette name: the vendor and its vendor-specific palette name.

    Raises:
        VendorNotFoundError: If the qualified palette name has an unknown vendor.
        PaletteNotFoundError: If the qualified palette name is not recognized.
    """
    if name not in PALETTE_TO_VENDOR_MAP:
        vendor_name, separator, _ = name.partition("_")

        if not separator:
            raise PaletteNotFoundError(name)

        try:
            Vendor(vendor_name)
        except ValueError:
            raise VendorNotFoundError(vendor_name) from None

        raise PaletteNotFoundError(name)

    vendor = PALETTE_TO_VENDOR_MAP[name]
    palette = name[len(vendor) + 1 :]

    return ParsedPaletteName(vendor, palette)


def get_palette(name: QualifiedPaletteName) -> Palette:
    """Get the palette data for a qualified palette name.

    Args:
        name: Qualified palette name.

    Returns:
        Palette sizes mapped to color arrays.

    Raises:
        VendorNotFoundError: If the vendor is not found.
        PaletteNotFoundError: If the palette is not found.
        PaletteDataEmptyError: If the palette data is empty.
    """
    vendor, _ = parse_palette_name(name)

    try:
        vendor_palettes = PALETTE_DATA[vendor]
    except KeyError:
        raise VendorNotFoundError(vendor) from None

    try:
        palette = vendor_palettes[name]
    except KeyError:
        raise PaletteNotFoundError(name) from None

    if not palette:
        raise PaletteDataEmptyError(name)

    return palette


def _validate_color_count(n: int) -> None:
    """Validate that a color count is a non-negative integer.

    Args:
        n: Color count.

    Raises:
        ValueError: If ``n`` is not an integer or is negative.
    """
    if not isinstance(n, int) or isinstance(n, bool) or n < 0:
        raise ValueError(f"Color count must be a non-negative integer, got {n}.")


def to_discrete_colors(palette: Palette, n: int = 6, as_rgb: bool = False) -> Colors:
    """Generate a list of discrete colors.

    Args:
        palette: Palette sizes mapped to color arrays.
        n: Number of colors to return; must be a non-negative integer.
        as_rgb: Whether to return RGB tuples ``(r, g, b)`` instead of hexadecimal strings.

    Returns:
        The discrete colors as hexadecimal strings, or as RGB tuples when ``as_rgb`` is
        true.

    Raises:
        ValueError: If ``n`` is invalid, the palette is empty, or the requested size is
            unsupported.
    """
    _validate_color_count(n)

    if n == 0:
        return []

    sizes = sorted(palette)

    if not sizes:
        raise ValueError("Palette is empty.")

    min_size = sizes[0]
    max_size = sizes[-1]
    result: Colors

    if n <= min_size:
        result = palette[min_size][:n]
    elif n > max_size:
        result = palette[max_size][:n]
    elif n in palette:
        result = palette[n][:n]
    else:
        supported = ", ".join(str(size) for size in sizes)
        raise ValueError(f"Unsupported palette size {n}. Supported sizes: {supported}.")

    if as_rgb:
        result = [mpl.colors.to_rgb(color) for color in result]

    return result


def to_continuous_colors(colors: HexColors, n: int = 6, as_rgb: bool = False) -> Colors:
    """Generate a list of continuous colors.

    Args:
        colors: Base colors in hexadecimal format.
        n: Number of colors to return; must be a non-negative integer.
        as_rgb: Whether to return RGB tuples ``(r, g, b)`` instead of hexadecimal strings.

    Returns:
        The continuous colors as hexadecimal strings, or as RGB tuples when ``as_rgb`` is
        true.

    Raises:
        ValueError: If ``n`` is invalid or exceeds the base color list's length.

    References:
        Bokeh v1.3.4, ``linear_palette`` (BSD-3-Clause):
        https://github.com/bokeh/bokeh/blob/1.3.4/bokeh/palettes.py#L1144-L1166
    """
    _validate_color_count(n)

    if n > len(colors):
        raise ValueError(
            f"Requested {n} colors, function can only return colors up to the base color list's"
            f" length ({len(colors)})"
        )

    if n == 1:
        indices = [0.0]
    else:
        step = (len(colors) - 1) / (n - 1)
        indices = [i * step for i in range(n)]
    result: Colors = [colors[math.floor(i)] for i in indices]

    if as_rgb:
        result = [mpl.colors.to_rgb(color) for color in result]

    return result


def get_palette_colors(name: QualifiedPaletteName, n: int = 6, as_rgb: bool = False) -> Colors:
    """Get a list of colors from a palette by name.

    Continuous palettes generate colors from their 256-color ramp; other palettes return
    discrete colors.

    Args:
        name: Qualified palette name.
        n: Number of colors to return; must be a non-negative integer.
        as_rgb: Whether to return RGB tuples ``(r, g, b)`` instead of hexadecimal strings.

    Returns:
        The palette colors as hexadecimal strings, or as RGB tuples when ``as_rgb`` is
        true.

    Raises:
        VendorNotFoundError: If the qualified palette name has an unknown vendor.
        PaletteNotFoundError: If the qualified palette name is not recognized.
        PaletteDataEmptyError: If the palette data is empty.
        ValueError: If ``n`` is invalid or unsupported by the palette.
    """
    palette = get_palette(name)

    if 256 in palette:
        return to_continuous_colors(palette[256], n=n, as_rgb=as_rgb)

    return to_discrete_colors(palette, n=n, as_rgb=as_rgb)
