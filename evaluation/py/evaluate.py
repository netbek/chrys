"""Python evaluation harness.

Runs the hand-written chroma.js port and coloraide against the shared corpus.

Run from the repository root:

    uv run python evaluation/py/evaluate.py
"""

from __future__ import annotations

from chrys.chroma_js import contrast, contrast_apca
from chrys.utils import best_color_contrast
from coloraide import Color
from pathlib import Path
from typing import Any

import json

EVAL = Path(__file__).resolve().parent.parent
RESULTS = EVAL / "results"

Algorithm = str
Variant = str
PackageName = str

CASES = json.loads((EVAL / "cases.json").read_text(encoding="utf-8"))

COMBOS: list[tuple[PackageName, Algorithm]] = [
    ("chroma-port", "apca"),
    ("chroma-port", "wcag"),
    ("coloraide", "wcag"),
]

VARIANTS: list[Variant] = ["current", "corrected"]


def raw_score(package: PackageName, algorithm: Algorithm, text: str, bg: str) -> float | None:
    """Score a text color against a background color in the native order."""
    if package == "chroma-port":
        return contrast_apca(text, bg) if algorithm == "apca" else contrast(text, bg)
    if package == "coloraide":
        if algorithm != "wcag":
            return None
        return Color(text).contrast(Color(bg), method="wcag21")
    raise ValueError(f"Unknown package: {package}")


def score(
    package: PackageName,
    algorithm: Algorithm,
    variant: Variant,
    bg: str,
    fg: str,
) -> float | None:
    """Score a foreground candidate against a background.

    ``current`` mirrors the library: the background is passed as the APCA text
    color. ``corrected`` passes the candidate as text.
    """
    if variant == "current":
        return raw_score(package, algorithm, bg, fg)
    return raw_score(package, algorithm, fg, bg)


def best_index(
    package: PackageName,
    algorithm: Algorithm,
    variant: Variant,
    bg: str,
    fg_colors: list[str],
) -> int:
    """Return the index of the candidate with the highest absolute score."""
    best = 0
    best_score = abs(score(package, algorithm, variant, bg, fg_colors[0]) or 0.0)
    for index in range(1, len(fg_colors)):
        candidate = abs(score(package, algorithm, variant, bg, fg_colors[index]) or 0.0)
        if candidate > best_score:
            best = index
            best_score = candidate
    return best


def main() -> None:
    scores: list[dict[str, Any]] = []
    choices: list[dict[str, Any]] = []

    for pair in [*CASES["pairs"], *CASES["alpha_pairs"]]:
        for package, algorithm in COMBOS:
            for variant in VARIANTS:
                value = score(package, algorithm, variant, pair["bg"], pair["text"])
                if value is None:
                    continue
                scores.append(
                    {
                        "case_id": pair["id"],
                        "package": package,
                        "algorithm": algorithm,
                        "variant": variant,
                        "value": value,
                    }
                )

    for best_case in CASES["best_cases"]:
        for package, algorithm in COMBOS:
            for variant in VARIANTS:
                choices.append(
                    {
                        "case_id": best_case["id"],
                        "package": package,
                        "algorithm": algorithm,
                        "variant": variant,
                        "value": best_index(
                            package,
                            algorithm,
                            variant,
                            best_case["bg"],
                            best_case["fg"],
                        ),
                    }
                )

    # Sanity check: the harness "current" variant should reproduce the library
    # function exactly.
    sanity_checked = 0
    sanity_mismatches = 0
    sanity_examples: list[dict[str, Any]] = []
    sanity_sample = [
        best_case
        for index, best_case in enumerate(CASES["best_cases"])
        if index % 50 == 0 or best_case["group"] == "edge"
    ]
    for best_case in sanity_sample:
        for algorithm in ("apca", "wcag"):
            expected = best_color_contrast(
                best_case["bg"],
                best_case["fg"],
                algorithm,
            )
            actual = best_case["fg"][
                best_index("chroma-port", algorithm, "corrected", best_case["bg"], best_case["fg"])
            ]
            sanity_checked += 1
            if expected != actual:
                sanity_mismatches += 1
                if len(sanity_examples) < 5:
                    sanity_examples.append(
                        {
                            "case_id": best_case["id"],
                            "algorithm": algorithm,
                            "expected": expected,
                            "actual": actual,
                        }
                    )

    RESULTS.mkdir(parents=True, exist_ok=True)
    (RESULTS / "py.json").write_text(
        json.dumps(
            {
                "env": "py",
                "generated_by": "evaluation/py/evaluate.py",
                "scores": scores,
                "choices": choices,
                "sanity": {
                    "checked": sanity_checked,
                    "mismatches": sanity_mismatches,
                    "examples": sanity_examples,
                },
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )

    print(
        f"Wrote evaluation/results/py.json: {len(scores)} scores, "
        f"{len(choices)} choices, sanity {sanity_mismatches}/{sanity_checked} mismatches"
    )


if __name__ == "__main__":
    main()
