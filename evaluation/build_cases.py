"""Build the shared evaluation corpus for the best-color-contrast packages.

The generated ``cases.json`` is read by every environment harness so that the
same text/background pairs and the same foreground candidate lists are used in
Sass, TypeScript/JavaScript and Python.

Run from the repository root:

    uv run python evaluation/build_cases.py
"""

from __future__ import annotations

from chrys.palettes import PALETTE_DATA
from pathlib import Path

import json
import random
import re

ROOT = Path(__file__).resolve().parent.parent
OUT = Path(__file__).resolve().parent / "cases.json"

SEED = 20261107

HEX6 = re.compile(r"^#[0-9a-fA-F]{6}$")
HEX3 = re.compile(r"^#[0-9a-fA-F]{3}$")

# Canonical vectors from the upstream test suites. The first color is the text
# color and the second is the background color; APCA is polarity-sensitive.
CANONICAL: list[tuple[str, str, str]] = [
    # apca-w3 test/index.js (0.1.9, 0.0.98G-4g)
    ("#888", "#fff", "apca-w3"),
    ("#fff", "#888", "apca-w3"),
    ("#000", "#aaa", "apca-w3"),
    ("#aaa", "#000", "apca-w3"),
    ("#123", "#def", "apca-w3"),
    ("#def", "#123", "apca-w3"),
    ("#123", "#444", "apca-w3"),
    ("#444", "#123", "apca-w3"),
    # chroma.js test/contrast.test.js
    ("#000", "#fff", "chroma"),
    ("#fff", "#fff", "chroma"),
    ("#fff", "#f00", "chroma"),
    ("#000", "#f00", "chroma"),
    ("#000", "#222", "chroma"),
    ("#594d45", "#ffd4d4", "chroma"),
    ("#b04646", "#d6d6d6", "chroma"),
    ("#c2afaf", "#d6d6d6", "chroma"),
    ("#f5f5b3", "#614f63", "chroma"),
    ("#67a7d6", "#4f6357", "chroma"),
    ("#d667cb", "#b04646", "chroma"),
    # color.js test/contrast.js (WCAG 2.1 / CSS Color 4)
    ("#ffe", "#fff", "colorjs"),
    ("#afbaae", "#fff", "colorjs"),
    ("#8b9986", "#fff", "colorjs"),
    ("#765", "#fff", "colorjs"),
    # coloraide tests/test_contrast.py
    ("#fff", "#00f", "coloraide"),
]

EDGE: list[tuple[str, str, str]] = [
    ("#010101", "#000000", "edge"),
    ("#000000", "#010101", "edge"),
    ("#767676", "#ffffff", "edge"),
    ("#777777", "#ffffff", "edge"),
    ("#777777", "#000000", "edge"),
    ("#808080", "#808080", "edge"),
    ("#ffffff", "#2aabee", "edge"),
    ("#000000", "#2aabee", "edge"),
    ("#ffffff", "#cf9275", "edge"),
    ("#000000", "#cf9275", "edge"),
    ("#FFFFFF", "#000000", "edge"),
    ("#F00", "#FFFFFF", "edge"),
]

# Alpha is optional and is reported separately. It is never part of the
# acceptance gate because the packages disagree on whether alpha is blended,
# ignored, or rounded.
ALPHA: list[tuple[str, str, str]] = [
    ("#00000044", "#ffffff", "alpha"),
    ("#ffffffc0", "#000000", "alpha"),
    ("#0004", "#ffffff", "alpha"),
    ("#ff000080", "#000000", "alpha"),
    ("#00000000", "#ffffff", "alpha"),
    ("#000000ff", "#ffffff", "alpha"),
    # apca-w3 canonical alpha vector: calcAPCA("#0006", "#fff") == 54.6218
    ("#0006", "#ffffff", "alpha"),
]

EDGE_BEST: list[tuple[str, list[str]]] = [
    ("#ffffff", ["#000000", "#ffffff"]),
    ("#000000", ["#ffffff", "#000000"]),
    ("#f00", ["#000", "#fff"]),
    ("#2aabee", ["#ffffff", "#000000"]),
    ("#cf9275", ["#ffffff", "#000000"]),
    ("#777777", ["#ffffff", "#000000"]),
    ("#808080", ["#808080", "#000000", "#ffffff"]),
    ("#777777", ["#000000", "#000000"]),
    ("#000000", ["#010101"]),
]


def normalize_hex(value: str) -> str:
    """Return a lower-case six-digit hex color."""
    if HEX6.fullmatch(value):
        return value.lower()
    if HEX3.fullmatch(value):
        return "#" + "".join(channel * 2 for channel in value[1:]).lower()
    raise ValueError(f"Not a three- or six-digit hex color: {value!r}")


def palette_colors() -> list[str]:
    """Return every unique palette color as a lower-case six-digit hex color."""
    colors: set[str] = set()
    for vendor_palettes in PALETTE_DATA.values():
        for palette in vendor_palettes.values():
            for color_list in palette.values():
                for color in color_list:
                    if not isinstance(color, str):
                        continue
                    if HEX6.fullmatch(color) or HEX3.fullmatch(color):
                        colors.add(normalize_hex(color))
    return sorted(colors)


def sample(colors: list[str], count: int, rng: random.Random) -> list[str]:
    """Return a deterministic sample of ``count`` colors."""
    if count >= len(colors):
        return list(colors)
    return sorted(rng.sample(colors, count))


def build() -> dict:
    colors = palette_colors()
    rng = random.Random(SEED)

    pairs: list[dict] = []
    for index, (text, bg, source) in enumerate(CANONICAL):
        pairs.append(
            {
                "id": f"pair-canonical-{index:03d}",
                "group": "canonical",
                "source": source,
                "text": text,
                "bg": bg,
            }
        )
    for index, (text, bg, source) in enumerate(EDGE):
        pairs.append(
            {
                "id": f"pair-edge-{index:03d}",
                "group": "edge",
                "source": source,
                "text": text,
                "bg": bg,
            }
        )

    # Seeded random opaque pairs for numeric-agreement stress testing.
    for index in range(2000):
        text = f"#{rng.randrange(1 << 24):06x}"
        bg = f"#{rng.randrange(1 << 24):06x}"
        pairs.append(
            {
                "id": f"pair-random-{index:04d}",
                "group": "random",
                "source": "seed",
                "text": text,
                "bg": bg,
            }
        )

    best_cases: list[dict] = []
    for index, bg in enumerate(colors):
        best_cases.append(
            {
                "id": f"best-wb-{index:04d}",
                "group": "wb",
                "bg": bg,
                "fg": ["#ffffff", "#000000"],
            }
        )

    greys = ["#ffffff", "#000000", "#808080", "#333333", "#cccccc"]
    for index, bg in enumerate(sample(colors, 500, rng)):
        best_cases.append(
            {
                "id": f"best-greys-{index:04d}",
                "group": "greys",
                "bg": bg,
                "fg": greys,
            }
        )

    for index, bg in enumerate(sample(colors, 200, rng)):
        fg = ["#ffffff", "#000000"]
        for candidate in rng.sample(colors, 3):
            if candidate not in fg:
                fg.append(candidate)
        best_cases.append(
            {
                "id": f"best-mixed-{index:04d}",
                "group": "mixed",
                "bg": bg,
                "fg": fg,
            }
        )

    for index, (bg, fg) in enumerate(EDGE_BEST):
        best_cases.append(
            {
                "id": f"best-edge-{index:03d}",
                "group": "edge",
                "bg": bg,
                "fg": fg,
            }
        )

    alpha_pairs = [
        {
            "id": f"pair-alpha-{index:03d}",
            "group": "alpha",
            "source": source,
            "text": text,
            "bg": bg,
        }
        for index, (text, bg, source) in enumerate(ALPHA)
    ]

    return {
        "meta": {
            "version": 1,
            "seed": SEED,
            "palette_colors": len(colors),
            "pairs": len(pairs),
            "best_cases": len(best_cases),
            "alpha_pairs": len(alpha_pairs),
            "tolerances": {"apca": 0.01, "wcag": 0.001},
            "algorithms": ["apca", "wcag"],
        },
        "pairs": pairs,
        "best_cases": best_cases,
        "alpha_pairs": alpha_pairs,
    }


def main() -> None:
    data = build()
    OUT.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(
        f"Wrote {OUT} "
        f"({data['meta']['pairs']} pairs, "
        f"{data['meta']['best_cases']} best cases, "
        f"{data['meta']['alpha_pairs']} alpha pairs, "
        f"{data['meta']['palette_colors']} palette colors)"
    )


if __name__ == "__main__":
    main()
