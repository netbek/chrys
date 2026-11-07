from chrys.chroma_js import contrast, contrast_apca
from chrys.palettes import (
    CONTINUOUS_PALETTE_NAMES,
    PALETTE_DATA,
    PALETTE_TO_VENDOR_MAP,
)
from collections import namedtuple
from enum import StrEnum

import math
import matplotlib as mpl


class Algorithm(StrEnum):
    APCA = "apca"
    WCAG = "wcag"


def best_color_contrast(
    bg_color: str, fg_colors: list[str], algorithm: str = Algorithm.APCA
) -> str:
    """
    Select the foreground color with the highest contrast against a background
    color.

    Parameters
    ----------
    bg_color: str
        Background color in hexadecimal format.
    fg_colors: list[str]
        Candidate foreground colors in hexadecimal format.
    algorithm: str
        Contrast algorithm to use (``"apca"`` or ``"wcag"``).

    Returns
    -------
    str
        The foreground color with the highest contrast.
    """
    if not fg_colors:
        raise ValueError("At least one foreground color is required.")

    score = contrast_apca if algorithm == Algorithm.APCA else contrast
    scores = [abs(score(bg_color, fg_color)) for fg_color in fg_colors]
    max_score = max(scores)
    max_score_index = scores.index(max_score)

    return fg_colors[max_score_index]


PaletteName = namedtuple("PaletteName", ["vendor", "palette"])


def parse_palette_name(name):
    if name not in PALETTE_TO_VENDOR_MAP:
        raise ValueError(f'Palette name "{name}" not recognized')

    vendor = PALETTE_TO_VENDOR_MAP[name]
    palette = name[len(vendor) + 1 :]

    return PaletteName._make([vendor, palette])


def _get_palette(name):
    vendor, _ = parse_palette_name(name)

    return PALETTE_DATA[vendor][name]


def _is_continuous(name):
    vendor, _ = parse_palette_name(name)

    return name in CONTINUOUS_PALETTE_NAMES[vendor]


def _validate_palette_size(n):
    if not isinstance(n, int) or isinstance(n, bool) or n < 0:
        raise ValueError(f"Palette size must be a non-negative integer, got {n}.")


def to_discrete_palette(palette, n=6, as_rgb=False):
    """
    Generate a list of discrete colors.

    Parameters
    ----------
    palette: list[str]
        A list of RGB hex color strings.
    n: int
        The size of the output palette to generate.
    as_rgb: bool
        Whether to return an RGB tuple `(r, g, b)`.

    Returns
    -------
    list[str]
        A list of RGB hex color strings or RGB tuples.
    """
    _validate_palette_size(n)

    if n == 0:
        return []

    sizes = sorted(palette)

    if not sizes:
        raise ValueError("Palette is empty.")

    min_size = sizes[0]
    max_size = sizes[-1]

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


def to_continuous_palette(palette, n=6, as_rgb=False):
    """
    Generate a list of continuous colors.

    Parameters
    ----------
    palette: list[str]
        A list of RGB hex color strings.
    n: int
        The size of the output palette to generate.
    as_rgb: bool
        Whether to return an RGB tuple `(r, g, b)`.

    Returns
    -------
    list[str]
        A list of RGB hex color strings or RGB tuples.

    Adapted from Bokeh 1.3.4 https://bokeh.org (BSD-3-Clause)
    """
    _validate_palette_size(n)

    if n > len(palette):
        raise ValueError(
            "Requested %(r)s colors, function can only return colors up to the base palette's"
            " length (%(l)s)" % dict(r=n, l=len(palette))
        )

    if n == 1:
        indices = [0.0]
    else:
        step = (len(palette) - 1) / (n - 1)
        indices = [i * step for i in range(n)]
    result = [palette[int(math.floor(i))] for i in indices]

    if as_rgb:
        result = [mpl.colors.to_rgb(color) for color in result]

    return result


def discrete_palette(name, n=6, as_rgb=False):
    return to_discrete_palette(_get_palette(name), n=n, as_rgb=as_rgb)


def continuous_palette(name, n=6, as_rgb=False):
    if not _is_continuous(name):
        raise ValueError(f'Generating continuous palettes of "{name}" is not supported')

    return to_continuous_palette(_get_palette(name)[256], n=n, as_rgb=as_rgb)
