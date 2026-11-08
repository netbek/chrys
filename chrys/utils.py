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

# A hexadecimal color string.
type HexColor = str

# A list of hexadecimal color strings.
type HexColors = list[HexColor]

# Palette sizes mapped to color arrays.
type Palette = Mapping[int, HexColors]

# A qualified palette name: includes its vendor prefix, for example "vega_accent".
type QualifiedPaletteName = str


class ParsedPaletteName(NamedTuple):
    """A qualified palette name parsed into its vendor and vendor-specific palette name."""

    vendor: Vendor
    palette: str


# Contrast algorithms: APCA 0.0.98G-4g and WCAG 2.0, ported from chroma.js 3.2.0.
class Algorithm(StrEnum):
    """Contrast algorithm."""

    APCA = "apca"
    WCAG = "wcag"


class PaletteMode(StrEnum):
    """How to resolve palette colors."""

    AUTO = "auto"
    CONTINUOUS = "continuous"
    DISCRETE = "discrete"


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
    # APCA is polarity-sensitive: the foreground is the text color.
    scores = [abs(score(fg_color, bg_color)) for fg_color in fg_colors]
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


def to_discrete_colors(palette: Palette, n: int | None = None) -> HexColors:
    """Generate a list of discrete colors.

    Args:
        palette: Palette sizes mapped to color arrays.
        n: Number of colors to return; must be a non-negative integer. Defaults to the
            largest palette size, returning all available colors.

    Returns:
        The discrete colors as hexadecimal strings.

    Raises:
        ValueError: If ``n`` is invalid, the palette is empty, or the requested size is
            unsupported.
    """
    if n is not None:
        _validate_color_count(n)

    sizes = sorted(palette)

    if not sizes:
        raise ValueError("Palette is empty.")

    if n is None:
        return list(palette[sizes[-1]])

    if n == 0:
        return []

    min_size = sizes[0]
    max_size = sizes[-1]
    result: HexColors

    if n <= min_size:
        result = palette[min_size][:n]
    elif n > max_size:
        result = palette[max_size][:n]
    elif n in palette:
        result = palette[n][:n]
    else:
        supported = ", ".join(str(size) for size in sizes)
        raise ValueError(f"Unsupported palette size {n}. Supported sizes: {supported}.")

    return result


def to_continuous_colors(colors: HexColors, n: int | None = None) -> HexColors:
    """Generate a list of continuous colors.

    Args:
        colors: Base colors in hexadecimal format.
        n: Number of colors to return; must be a non-negative integer. Defaults to the
            number of base colors, returning all available colors.

    Returns:
        The continuous colors as hexadecimal strings.

    Raises:
        ValueError: If ``n`` is invalid or exceeds the base color list's length.

    References:
        Bokeh v1.3.4, ``linear_palette`` (BSD-3-Clause):
        https://github.com/bokeh/bokeh/blob/1.3.4/bokeh/palettes.py#L1144-L1166
    """
    if n is None:
        n = len(colors)
    else:
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
    result: HexColors = [colors[math.floor(i)] for i in indices]

    return result


def get_palette_colors(
    name: QualifiedPaletteName,
    n: int | None = None,
    mode: str = PaletteMode.AUTO,
) -> HexColors:
    """Get a list of colors from a palette by name.

    Continuous palettes generate colors from their 256-color ramp; other palettes return
    discrete colors. The ``mode`` argument overrides this automatic selection.

    Args:
        name: Qualified palette name.
        n: Number of colors to return; must be a non-negative integer. Defaults to all
            available colors.
        mode: Palette resolution mode: ``"auto"`` (default), ``"continuous"``, or
            ``"discrete"``.

    Returns:
        The palette colors as hexadecimal strings.

    Raises:
        VendorNotFoundError: If the qualified palette name has an unknown vendor.
        PaletteNotFoundError: If the qualified palette name is not recognized.
        PaletteDataEmptyError: If the palette data is empty.
        ValueError: If ``n`` or ``mode`` is invalid, the requested size is unsupported,
            or the palette lacks data for the requested mode.
    """
    try:
        resolved_mode = PaletteMode(mode)
    except ValueError:
        valid = ", ".join(option.value for option in PaletteMode)
        raise ValueError(f'Unknown palette mode "{mode}". Expected one of: {valid}.') from None

    palette = get_palette(name)

    if resolved_mode == PaletteMode.CONTINUOUS:
        try:
            ramp = palette[256]
        except KeyError:
            raise ValueError(f'Palette "{name}" has no continuous data.') from None

        return to_continuous_colors(ramp, n=n)

    if resolved_mode == PaletteMode.DISCRETE:
        discrete_palette = {size: colors for size, colors in palette.items() if size != 256}

        if not discrete_palette:
            raise ValueError(f'Palette "{name}" has no discrete data.')

        return to_discrete_colors(discrete_palette, n=n)

    if 256 in palette:
        return to_continuous_colors(palette[256], n=n)

    return to_discrete_colors(palette, n=n)
