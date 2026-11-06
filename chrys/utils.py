from chrys.chroma_js import contrast, contrast_apca
from enum import StrEnum


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
