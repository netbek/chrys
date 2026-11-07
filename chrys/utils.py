from chrys.chroma_js import contrast, contrast_apca
from chrys.palettes import (
    CONTINUOUS_PALETTE_NAMES,
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


class PaletteName(NamedTuple):
    """A vendor and its vendor-specific palette name."""

    vendor: Vendor
    palette: str


def parse_palette_name(name: str) -> PaletteName:
    """Parse a palette name into its vendor and palette components.

    Args:
        name: Palette name, for example ``"vega_accent"``.

    Returns:
        The vendor and the vendor-specific palette name.

    Raises:
        ValueError: If the palette name is not recognized.
    """
    if name not in PALETTE_TO_VENDOR_MAP:
        raise ValueError(f'Palette name "{name}" not recognized')

    vendor = PALETTE_TO_VENDOR_MAP[name]
    palette = name[len(vendor) + 1 :]

    return PaletteName(vendor, palette)


def _get_palette(name: str) -> Palette:
    """Get the palette data for a palette name.

    Args:
        name: Palette name.

    Returns:
        Palette sizes mapped to color arrays.

    Raises:
        KeyError: If the palette data is missing.
    """
    vendor, _ = parse_palette_name(name)

    return PALETTE_DATA[vendor][name]


def _is_continuous(name: str) -> bool:
    """Return whether a palette is continuous.

    Args:
        name: Palette name.

    Returns:
        Whether the palette is continuous.

    Raises:
        ValueError: If the palette name is not recognized.
    """
    vendor, _ = parse_palette_name(name)

    return name in CONTINUOUS_PALETTE_NAMES[vendor]


def _validate_palette_size(n: int) -> None:
    """Validate that a palette size is a non-negative integer.

    Args:
        n: Palette size.

    Raises:
        ValueError: If ``n`` is not an integer or is negative.
    """
    if not isinstance(n, int) or isinstance(n, bool) or n < 0:
        raise ValueError(f"Palette size must be a non-negative integer, got {n}.")


def to_discrete_palette(palette: Palette, n: int = 6, as_rgb: bool = False) -> Colors:
    """Generate a list of discrete colors.

    Args:
        palette: Palette sizes mapped to color arrays.
        n: Number of colors to return; must be a non-negative integer.
        as_rgb: Whether to return RGB tuples ``(r, g, b)`` instead of hexadecimal strings.

    Returns:
        The discrete palette colors as hexadecimal strings, or as RGB tuples when
        ``as_rgb`` is true.

    Raises:
        ValueError: If ``n`` is invalid, the palette is empty, or the requested size is
            unsupported.
    """
    _validate_palette_size(n)

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


def to_continuous_palette(colors: HexColors, n: int = 6, as_rgb: bool = False) -> Colors:
    """Generate a list of continuous colors.

    Args:
        colors: Base colors in hexadecimal format.
        n: Number of colors to return; must be a non-negative integer.
        as_rgb: Whether to return RGB tuples ``(r, g, b)`` instead of hexadecimal strings.

    Returns:
        The continuous palette colors as hexadecimal strings, or as RGB tuples when
        ``as_rgb`` is true.

    Raises:
        ValueError: If ``n`` is invalid or exceeds the base color list's length.

    Note:
        Adapted from Bokeh 1.3.4 https://bokeh.org (BSD-3-Clause).
    """
    _validate_palette_size(n)

    if n > len(colors):
        raise ValueError(
            "Requested %(r)s colors, function can only return colors up to the base color list's"
            " length (%(l)s)" % dict(r=n, l=len(colors))
        )

    if n == 1:
        indices = [0.0]
    else:
        step = (len(colors) - 1) / (n - 1)
        indices = [i * step for i in range(n)]
    result: Colors = [colors[int(math.floor(i))] for i in indices]

    if as_rgb:
        result = [mpl.colors.to_rgb(color) for color in result]

    return result


def discrete_palette(name: str, n: int = 6, as_rgb: bool = False) -> Colors:
    """Generate a discrete palette by name.

    Args:
        name: Palette name.
        n: Number of colors to return; must be a non-negative integer.
        as_rgb: Whether to return RGB tuples ``(r, g, b)`` instead of hexadecimal strings.

    Returns:
        The discrete palette colors as hexadecimal strings, or as RGB tuples when
        ``as_rgb`` is true.

    Raises:
        ValueError: If the palette name is not recognized, ``n`` is invalid, or the
            requested size is unsupported.
    """
    return to_discrete_palette(_get_palette(name), n=n, as_rgb=as_rgb)


def continuous_palette(name: str, n: int = 6, as_rgb: bool = False) -> Colors:
    """Generate a continuous palette by name.

    Args:
        name: Palette name.
        n: Number of colors to return; must be a non-negative integer.
        as_rgb: Whether to return RGB tuples ``(r, g, b)`` instead of hexadecimal strings.

    Returns:
        The continuous palette colors as hexadecimal strings, or as RGB tuples when
        ``as_rgb`` is true.

    Raises:
        ValueError: If the palette name is not recognized, the palette does not support
            continuous generation, or ``n`` exceeds the base palette's length.
    """
    if not _is_continuous(name):
        raise ValueError(f'Generating continuous palettes of "{name}" is not supported')

    return to_continuous_palette(_get_palette(name)[256], n=n, as_rgb=as_rgb)
