from chrys.apca_w3 import apca_contrast, srgb_to_y
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
from typing import cast, NamedTuple

import math
import re

# A CSS color string.
type CssColor = str

# A list of CSS color strings.
type CssColors = list[CssColor]

# An 8-bit sRGB color expressed as channel values.
type RgbColor = tuple[float, float, float]

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


class PaletteMode(StrEnum):
    """How to resolve palette colors."""

    AUTO = "auto"
    CONTINUOUS = "continuous"
    DISCRETE = "discrete"


# Matches #rgb, #rgba, #rrggbb, and #rrggbbaa.
_HEX_COLOR = re.compile(r"^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$", re.IGNORECASE)

# Matches the rgb() and rgba() functional notation.
_RGB_COLOR = re.compile(r"rgba?\((.*)\)", re.IGNORECASE | re.DOTALL)

# Matches a CSS number.
_NUMBER = r"[+-]?(?:[0-9]+(?:\.[0-9]+)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?"
_NUMBER_COLOR = re.compile(_NUMBER)
_PERCENTAGE_COLOR = re.compile(rf"{_NUMBER}%")


def _clamp(value: float, minimum: float, maximum: float) -> float:
    """Clamp a value to the inclusive range."""
    return min(max(value, minimum), maximum)


def _channel_type(token: str) -> str | None:
    """Classify a color channel token."""
    if _NUMBER_COLOR.fullmatch(token):
        return "number"

    if _PERCENTAGE_COLOR.fullmatch(token):
        return "percentage"

    return None


def _parse_channel(token: str, allow_none: bool) -> float | None:
    """Parse a color channel into an 8-bit sRGB value."""
    if allow_none and token.lower() == "none":
        return 0.0

    channel_type = _channel_type(token)

    if channel_type == "number":
        return _clamp(float(token), 0.0, 255.0)

    if channel_type == "percentage":
        return _clamp(float(token[:-1]) / 100.0 * 255.0, 0.0, 255.0)

    return None


def _parse_alpha(token: str, allow_none: bool) -> float | None:
    """Parse an alpha channel. Alpha is validated but ignored by the caller."""
    if allow_none and token.lower() == "none":
        return 1.0

    channel_type = _channel_type(token)

    if channel_type == "number":
        return _clamp(float(token), 0.0, 1.0)

    if channel_type == "percentage":
        return _clamp(float(token[:-1]) / 100.0, 0.0, 1.0)

    return None


def _parse_hex_color(color: str) -> RgbColor:
    """Parse a validated hexadecimal color into its 8-bit sRGB channels."""
    hex_digits = color[1:]

    if len(hex_digits) <= 4:
        hex_digits = "".join(digit * 2 for digit in hex_digits)

    return (
        int(hex_digits[0:2], 16),
        int(hex_digits[2:4], 16),
        int(hex_digits[4:6], 16),
    )


def _parse_legacy_rgb(body: str) -> RgbColor | None:
    """Parse the legacy comma-separated rgb() syntax."""
    parts = [part.strip() for part in body.split(",")]

    if len(parts) not in (3, 4):
        return None

    channels = parts[:3]
    channel_type = _channel_type(channels[0])

    if channel_type is None or any(_channel_type(channel) != channel_type for channel in channels):
        return None

    rgb = tuple(_parse_channel(channel, allow_none=False) for channel in channels)

    if len(parts) == 4 and _parse_alpha(parts[3], allow_none=False) is None:
        return None

    return cast("RgbColor", rgb)


def _parse_modern_rgb(body: str) -> RgbColor | None:
    """Parse the modern space-separated rgb() syntax."""
    parts = body.split("/")

    if len(parts) > 2:
        return None

    channels = parts[0].strip().split()

    if len(channels) != 3:
        return None

    rgb = tuple(_parse_channel(channel, allow_none=True) for channel in channels)

    if any(channel is None for channel in rgb):
        return None

    if len(parts) == 2 and _parse_alpha(parts[1].strip(), allow_none=True) is None:
        return None

    return cast("RgbColor", rgb)


def _parse_rgb_color(color: str) -> RgbColor | None:
    """Parse an absolute rgb() or rgba() color."""
    match = _RGB_COLOR.fullmatch(color)

    if match is None:
        return None

    body = match.group(1).strip()

    if "," in body:
        return _parse_legacy_rgb(body)

    return _parse_modern_rgb(body)


def parse_color(color: CssColor) -> RgbColor:
    """Parse a CSS color into its 8-bit sRGB channels.

    Supports hexadecimal colors and absolute ``rgb()``/``rgba()`` colors.
    Relative colors, ``calc()``, ``var()``, and other color functions are not
    supported.

    Raises:
        ValueError: If ``color`` is not a supported color.
    """
    if not isinstance(color, str):
        raise ValueError(f'Color "{color}": unknown format.')  # noqa: TRY004

    value = color.strip()

    if _HEX_COLOR.fullmatch(value):
        return _parse_hex_color(value)

    rgb = _parse_rgb_color(value)

    if rgb is not None:
        return rgb

    raise ValueError(f'Color "{color}": unknown format.')


def best_color_contrast(bg_color: CssColor, fg_colors: CssColors) -> CssColor:
    """Select the foreground color with the highest APCA contrast against a background color.

    Accepts hexadecimal colors and absolute ``rgb()``/``rgba()`` colors. Alpha is
    ignored. APCA is polarity-sensitive: each foreground is scored as the text color
    and the background as the background color. Absolute scores are compared so a
    foreground is never penalised for being lighter or darker; only the magnitude of
    the contrast matters.

    Args:
        bg_color: Background color.
        fg_colors: Candidate foreground colors.

    Returns:
        The foreground color with the highest contrast.

    Raises:
        ValueError: If ``fg_colors`` is empty or a color is invalid.
    """
    if not fg_colors:
        raise ValueError("At least one foreground color is required.")

    bg_y = srgb_to_y(parse_color(bg_color))

    best_index = 0
    best_score = -1.0

    for index, fg_color in enumerate(fg_colors):
        fg_y = srgb_to_y(parse_color(fg_color))
        score = abs(apca_contrast(fg_y, bg_y))

        if score > best_score:
            best_score = score
            best_index = index

    return fg_colors[best_index]


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
