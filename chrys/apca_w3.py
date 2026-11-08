"""Python port of the APCA-W3 contrast algorithm.

This module ports the contrast core only: ``sRGBtoY``, ``APCAcontrast``,
``alphaBlend``, and ``calcAPCA``.

Based on ``apca-w3`` 0.1.9 (APCA 0.0.98G-4g), copyright © 2019-2022 by Andrew
Somers. Licensed to the W3/AGWG for use with WCAG accessibility guidelines.

APCA is a method for predicting text contrast on self-illuminated displays for
web-based content. Some use-cases are prohibited by license, including use in
medical, clinical evaluation, human safety related, aerospace, transportation,
and military applications.

References:
    https://github.com/Myndex/apca-w3/blob/0216410d119f4c99a61f144d9cd42e3962bb84bc/src/apca-w3.js
"""

from collections.abc import Sequence

import math
import re

# SAPC-8, 0.0.98G-series constant 4g.
_MAIN_TRC = 2.4

# sRGB coefficients.
_SRCO = 0.2126729
_SGCO = 0.7151522
_SBCO = 0.0721750

# G-4g constants for use with the 2.4 exponent.
_NORM_BG = 0.56
_NORM_TXT = 0.57
_REV_TXT = 0.62
_REV_BG = 0.65

# G-4g clamps and scalers.
_BLK_THRS = 0.022
_BLK_CLMP = 1.414
_SCALE_BOW = 1.14
_SCALE_WOB = 1.14
_LO_BOW_OFFSET = 0.027
_LO_WOB_OFFSET = 0.027
_DELTA_Y_MIN = 0.0005
_LO_CLIP = 0.1

_HEX_COLOR = re.compile(r"^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$", re.IGNORECASE)


def srgb_to_y(rgb: Sequence[float] = (0, 0, 0)) -> float:
    """Return the estimated screen luminance of an 8-bit sRGB color.

    Args:
        rgb: Red, green, and blue channels in the range 0-255. A fourth alpha
            channel is ignored.

    Returns:
        The estimated screen luminance.
    """
    return (
        _SRCO * (rgb[0] / 255.0) ** _MAIN_TRC
        + _SGCO * (rgb[1] / 255.0) ** _MAIN_TRC
        + _SBCO * (rgb[2] / 255.0) ** _MAIN_TRC
    )


def apca_contrast(txt_y: float, bg_y: float, places: float = -1) -> float | str:
    """Return the signed APCA Lc contrast for text on a background.

    Args:
        txt_y: Estimated screen luminance of the text color, in the range
            0.0-1.0.
        bg_y: Estimated screen luminance of the background color, in the range
            0.0-1.0.
        places: Output format. Negative values return a float, ``0`` returns a
            rounded string with a polarity suffix, and positive integers return
            a fixed-point string.

    Returns:
        The signed Lc contrast, or ``0.0`` for invalid input.
    """
    if (
        not isinstance(txt_y, (int, float))
        or not isinstance(bg_y, (int, float))
        or math.isnan(txt_y)
        or math.isnan(bg_y)
        or min(txt_y, bg_y) < 0.0
        or max(txt_y, bg_y) > 1.1
    ):
        return 0.0

    # Soft clamp black levels.
    txt_y = txt_y if txt_y > _BLK_THRS else txt_y + (_BLK_THRS - txt_y) ** _BLK_CLMP
    bg_y = bg_y if bg_y > _BLK_THRS else bg_y + (_BLK_THRS - bg_y) ** _BLK_CLMP

    # Return early for extremely low delta Y.
    if abs(bg_y - txt_y) < _DELTA_Y_MIN:
        return 0.0

    pol_cat = "BoW"

    if bg_y > txt_y:
        # Normal polarity: black text on white.
        sapc = (bg_y**_NORM_BG - txt_y**_NORM_TXT) * _SCALE_BOW
        output_contrast = 0.0 if sapc < _LO_CLIP else sapc - _LO_BOW_OFFSET
    else:
        # Reverse polarity: light text on dark. Always returns a negative value.
        pol_cat = "WoB"
        sapc = (bg_y**_REV_BG - txt_y**_REV_TXT) * _SCALE_WOB
        output_contrast = 0.0 if sapc > -_LO_CLIP else sapc + _LO_WOB_OFFSET

    if not isinstance(places, (int, float)) or isinstance(places, bool):
        return 0.0

    if places < 0:
        return output_contrast * 100.0

    if places == 0:
        rounded = math.floor(abs(output_contrast) * 100.0 + 0.5)
        return f"{rounded}<sub>{pol_cat}</sub>"

    if float(places).is_integer():
        return f"{output_contrast * 100.0:.{int(places)}f}"

    return 0.0


def alpha_blend(
    fg: Sequence[float] = (0, 0, 0, 1.0),
    bg: Sequence[float] = (0, 0, 0),
    rounded: bool = True,
) -> list[float]:
    """Blend a foreground color with alpha over a background color.

    Args:
        fg: Foreground red, green, blue, and alpha channels.
        bg: Background red, green, and blue channels.
        rounded: Round the blended channels to integers.

    Returns:
        The blended red, green, blue, and alpha channels.
    """
    alpha = max(min(fg[3], 1.0), 0.0)
    complement = 1.0 - alpha
    result: list[float] = []

    for index in range(3):
        channel = bg[index] * complement + fg[index] * alpha

        if rounded:
            channel = min(math.floor(channel + 0.5), 255)

        result.append(channel)

    result.append(1.0)

    return result


def _parse_hex_color(color: str) -> tuple[int, int, int, float]:
    """Parse a hexadecimal color into 8-bit sRGB channels and alpha."""
    match = _HEX_COLOR.fullmatch(color) if isinstance(color, str) else None

    if match is None:
        raise ValueError(f'Color "{color}": unknown format.')

    value = match.group(1)

    if len(value) in (3, 4):
        value = "".join(digit * 2 for digit in value)

    return (
        int(value[0:2], 16),
        int(value[2:4], 16),
        int(value[4:6], 16),
        int(value[6:8], 16) / 255.0 if len(value) == 8 else 1.0,
    )


def calc_apca(
    text_color: str,
    bg_color: str,
    places: float = -1,
    rounded: bool = True,
) -> float | str:
    """Return the signed APCA Lc contrast for two hexadecimal colors.

    Accepts ``#rgb``, ``#rgba``, ``#rrggbb``, and ``#rrggbbaa``; the leading
    ``#`` is optional. Alpha in ``text_color`` is blended over ``bg_color``
    before calculating the contrast.

    Args:
        text_color: Text color as a hexadecimal string.
        bg_color: Background color as a hexadecimal string.
        places: Output format, passed to :func:`apca_contrast`.
        rounded: Round the alpha-blended text channels to integers.

    Returns:
        The signed Lc contrast.
    """
    bg = _parse_hex_color(bg_color)
    text = _parse_hex_color(text_color)

    if text[3] != 1.0:
        text = alpha_blend(text, bg, rounded)

    return apca_contrast(srgb_to_y(text), srgb_to_y(bg), places)
