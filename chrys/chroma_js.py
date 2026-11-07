# Ported from Chroma.js — Copyright (c) 2011-2025 Gregor Aisch (BSD 3-Clause)
# Source: https://github.com/gka/chroma.js/blob/v3.2.0/src/utils/contrast.js
# Source: https://github.com/gka/chroma.js/blob/v3.2.0/src/utils/contrastAPCA.js
import math
import re

_HEX_RE = re.compile(r"#?([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})")

# APCA constants
_W_OFFSET = 0.027
_P_IN = 0.0005
_P_OUT = 0.1
_R_SCALE = 1.14
_B_THRESHOLD = 0.022
_B_EXP = 1.414


def _parse_hex(color):
    """Parse a hexadecimal color into red, green, blue, and alpha channels."""
    match = _HEX_RE.fullmatch(color) if isinstance(color, str) else None
    if match is None:
        raise ValueError(f'Invalid color "{color}".')

    value = match.group(1)
    if len(value) in (3, 4):
        value = "".join(channel * 2 for channel in value)

    red = int(value[0:2], 16)
    green = int(value[2:4], 16)
    blue = int(value[4:6], 16)

    if len(value) == 8:
        alpha = math.floor((int(value[6:8], 16) / 255) * 100 + 0.5) / 100
    else:
        alpha = 1.0

    return red, green, blue, alpha


def _linearize(channel):
    channel /= 255
    if channel <= 0.03928:
        return channel / 12.92
    return ((channel + 0.055) / 1.055) ** 2.4


def _relative_luminance(red, green, blue):
    return 0.2126 * _linearize(red) + 0.7152 * _linearize(green) + 0.0722 * _linearize(blue)


def contrast(a, b):
    """Return the WCAG contrast ratio for two hexadecimal colors."""
    l1 = _relative_luminance(*_parse_hex(a)[:3])
    l2 = _relative_luminance(*_parse_hex(b)[:3])

    if l1 > l2:
        return (l1 + 0.05) / (l2 + 0.05)
    return (l2 + 0.05) / (l1 + 0.05)


def _apca_luminance(red, green, blue):
    return (
        0.2126729 * (red / 255) ** 2.4
        + 0.7151522 * (green / 255) ** 2.4
        + 0.072175 * (blue / 255) ** 2.4
    )


def _round_channel(channel):
    return math.floor(channel + 0.5)


def contrast_apca(text, bg):
    """Return the signed APCA contrast score for text on a background."""
    text_red, text_green, text_blue, alpha = _parse_hex(text)
    bg_red, bg_green, bg_blue, _ = _parse_hex(bg)

    if alpha < 1:
        text_red = _round_channel(bg_red + alpha * (text_red - bg_red))
        text_green = _round_channel(bg_green + alpha * (text_green - bg_green))
        text_blue = _round_channel(bg_blue + alpha * (text_blue - bg_blue))

    l_text = _apca_luminance(text_red, text_green, text_blue)
    l_bg = _apca_luminance(bg_red, bg_green, bg_blue)

    # soft clamp black levels
    y_text = l_text if l_text >= _B_THRESHOLD else l_text + (_B_THRESHOLD - l_text) ** _B_EXP
    y_bg = l_bg if l_bg >= _B_THRESHOLD else l_bg + (_B_THRESHOLD - l_bg) ** _B_EXP

    # normal polarity (dark text on light background)
    s_norm = y_bg**0.56 - y_text**0.57
    # reverse polarity (light text on dark background)
    s_rev = y_bg**0.65 - y_text**0.62

    # clamp noise then scale
    if abs(y_bg - y_text) < _P_IN:
        c = 0
    elif y_text < y_bg:
        c = s_norm * _R_SCALE
    else:
        c = s_rev * _R_SCALE

    # clamp minimum contrast then offset
    if abs(c) < _P_OUT:
        s_apc = 0
    elif c > 0:
        s_apc = c - _W_OFFSET
    else:
        s_apc = c + _W_OFFSET

    return s_apc * 100
