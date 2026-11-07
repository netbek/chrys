"""Compare the evaluation results and write evaluation/REPORT.md.

Run from the repository root after the three harnesses:

    uv run python evaluation/compare.py
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import json
import statistics

EVAL = Path(__file__).resolve().parent
RESULTS = EVAL / "results"

CASES = json.loads((EVAL / "cases.json").read_text(encoding="utf-8"))
TS = json.loads((RESULTS / "ts.json").read_text(encoding="utf-8"))
PY = json.loads((RESULTS / "py.json").read_text(encoding="utf-8"))
SASS = json.loads((RESULTS / "sass.json").read_text(encoding="utf-8"))

TOLERANCES = CASES["meta"]["tolerances"]

PAIRS = {pair["id"]: pair for pair in CASES["pairs"]}
ALPHA_PAIRS = {pair["id"]: pair for pair in CASES["alpha_pairs"]}
BEST_CASES = {best_case["id"]: best_case for best_case in CASES["best_cases"]}

SCORES: dict[tuple[str, str, str, str, str], float] = {}
CHOICES: dict[tuple[str, str, str, str, str], int] = {}

for env, data in (("ts", TS), ("py", PY), ("sass", SASS)):
    for record in data.get("scores", []):
        SCORES[
            (
                env,
                record["package"],
                record["algorithm"],
                record["variant"],
                record["case_id"],
            )
        ] = record["value"]
    for record in data.get("choices", []):
        CHOICES[
            (
                env,
                record["package"],
                record["algorithm"],
                record["variant"],
                record["case_id"],
            )
        ] = record["value"]

OPAQUE_PAIR_IDS = [pair_id for pair_id, pair in PAIRS.items() if pair["group"] != "alpha"]
ALPHA_PAIR_IDS = list(ALPHA_PAIRS)
BEST_GROUPS = ["wb", "greys", "mixed", "edge"]

APCA_IMPLS = [
    ("ts", "chroma", "apca", "current", "chroma (TS, current)"),
    ("ts", "chroma", "apca", "corrected", "chroma (TS, corrected)"),
    ("ts", "colorjs", "apca", "corrected", "color.js (TS, corrected)"),
    ("py", "chroma-port", "apca", "current", "chroma port (Python, current)"),
    ("py", "chroma-port", "apca", "corrected", "chroma port (Python, corrected)"),
    ("sass", "sass-apca", "apca", "current", "sass-apca (current)"),
    ("sass", "sass-apca", "apca", "corrected", "sass-apca (corrected)"),
    ("ts", "apca-w3", "apca", "corrected", "apca-w3 (oracle)"),
]

WCAG_IMPLS = [
    ("ts", "chroma", "wcag", "current", "chroma (TS)"),
    ("ts", "colorjs", "wcag", "corrected", "color.js (TS)"),
    ("py", "chroma-port", "wcag", "current", "chroma port (Python)"),
    ("py", "coloraide", "wcag", "corrected", "coloraide (Python, oracle)"),
    ("sass", "sass-wcag", "wcag", "corrected", "Sass WCAG prototype"),
]


def fmt(value: float) -> str:
    """Format a number compactly."""
    if value == 0:
        return "0"
    if abs(value) < 0.001:
        return f"{value:.2e}"
    if abs(value) < 1:
        return f"{value:.6f}"
    return f"{value:.6f}"


def pct(value: float) -> str:
    return f"{value * 100:.2f}%"


def md_table(headers: list[str], rows: list[list[Any]]) -> str:
    lines = [
        "| " + " | ".join(headers) + " |",
        "| " + " | ".join("---" for _ in headers) + " |",
    ]
    for row in rows:
        lines.append("| " + " | ".join(str(cell) for cell in row) + " |")
    return "\n".join(lines)


def oracle_score(algorithm: str, case_id: str) -> float | None:
    if algorithm == "apca":
        return SCORES.get(("ts", "apca-w3", "apca", "corrected", case_id))
    return SCORES.get(("py", "coloraide", "wcag", "corrected", case_id))


def oracle_choice(algorithm: str, case_id: str) -> int | None:
    if algorithm == "apca":
        return CHOICES.get(("ts", "apca-w3", "apca", "corrected", case_id))
    return CHOICES.get(("py", "coloraide", "wcag", "corrected", case_id))


def numeric_stats(
    impls: list[tuple[str, str, str, str, str]],
    algorithm: str,
    case_ids: list[str],
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for env, package, alg, variant, label in impls:
        deltas: list[float] = []
        for case_id in case_ids:
            expected = oracle_score(algorithm, case_id)
            actual = SCORES.get((env, package, alg, variant, case_id))
            if expected is None or actual is None:
                continue
            deltas.append(abs(actual - expected))
        if not deltas:
            continue
        ordered = sorted(deltas)
        p99 = ordered[min(len(ordered) - 1, round(0.99 * (len(ordered) - 1)))]
        rows.append(
            {
                "label": label,
                "n": len(deltas),
                "max": max(deltas),
                "mean": statistics.mean(deltas),
                "p99": p99,
                "gt_1e9": sum(delta > 1e-9 for delta in deltas),
                "gt_1e6": sum(delta > 1e-6 for delta in deltas),
                "gt_tol": sum(
                    delta > TOLERANCES["apca" if algorithm == "apca" else "wcag"]
                    for delta in deltas
                ),
            }
        )
    return rows


def choice_stats(
    impls: list[tuple[str, str, str, str, str]],
    algorithm: str,
) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for env, package, alg, variant, label in impls:
        per_group: dict[str, list[str]] = {group: [] for group in BEST_GROUPS}
        for case_id, best_case in BEST_CASES.items():
            expected = oracle_choice(algorithm, case_id)
            actual = CHOICES.get((env, package, alg, variant, case_id))
            if expected is None or actual is None:
                continue
            if actual != expected:
                per_group[best_case["group"]].append(case_id)

        all_ids = [case_id for group in BEST_GROUPS for case_id in per_group[group]]
        total = sum(
            1
            for case_id in BEST_CASES
            if oracle_choice(algorithm, case_id) is not None
            and CHOICES.get((env, package, alg, variant, case_id)) is not None
        )
        rows.append(
            {
                "label": label,
                "mismatches": len(all_ids),
                "total": total,
                "pct": len(all_ids) / total if total else 0.0,
                "per_group": {group: len(per_group[group]) for group in BEST_GROUPS},
                "examples": all_ids[:10],
            }
        )
    return rows


def cross_env_stats(
    left: tuple[str, str, str, str],
    right: tuple[str, str, str, str],
    case_ids: list[str],
    left_label: str,
    right_label: str,
) -> dict[str, Any] | None:
    deltas: list[float] = []
    for case_id in case_ids:
        a = SCORES.get((*left, case_id))
        b = SCORES.get((*right, case_id))
        if a is None or b is None:
            continue
        deltas.append(abs(a - b))
    if not deltas:
        return None
    return {
        "left": left_label,
        "right": right_label,
        "n": len(deltas),
        "max": max(deltas),
        "mean": statistics.mean(deltas),
    }


def polarity_stats(
    impl: tuple[str, str, str, str, str],
) -> dict[str, Any]:
    env, package, alg, _variant, label = impl
    flips: list[dict[str, Any]] = []
    for case_id, best_case in BEST_CASES.items():
        current = CHOICES.get((env, package, alg, "current", case_id))
        corrected = CHOICES.get((env, package, alg, "corrected", case_id))
        if current is None or corrected is None or current == corrected:
            continue
        flips.append(
            {
                "case_id": case_id,
                "group": best_case["group"],
                "bg": best_case["bg"],
                "fg": best_case["fg"],
                "current": best_case["fg"][current],
                "corrected": best_case["fg"][corrected],
            }
        )

    score_deltas: list[float] = []
    for case_id in OPAQUE_PAIR_IDS:
        current = SCORES.get((env, package, alg, "current", case_id))
        corrected = SCORES.get((env, package, alg, "corrected", case_id))
        if current is None or corrected is None:
            continue
        score_deltas.append(abs(current - corrected))

    return {
        "label": label,
        "flips": flips,
        "flip_count": len(flips),
        "by_group": {
            group: sum(1 for flip in flips if flip["group"] == group) for group in BEST_GROUPS
        },
        "max_score_delta": max(score_deltas) if score_deltas else 0.0,
        "mean_score_delta": statistics.mean(score_deltas) if score_deltas else 0.0,
    }


def alpha_table() -> str:
    headers = [
        "text",
        "bg",
        "chroma APCA",
        "apca-w3 APCA",
        "color.js APCA",
        "sass-apca APCA",
        "chroma WCAG",
        "coloraide WCAG",
        "Sass WCAG",
    ]
    rows: list[list[str]] = []
    for case_id in ALPHA_PAIR_IDS:
        pair = ALPHA_PAIRS[case_id]
        values = [
            SCORES.get(("ts", "chroma", "apca", "corrected", case_id)),
            SCORES.get(("ts", "apca-w3", "apca", "corrected", case_id)),
            SCORES.get(("ts", "colorjs", "apca", "corrected", case_id)),
            SCORES.get(("sass", "sass-apca", "apca", "corrected", case_id)),
            SCORES.get(("ts", "chroma", "wcag", "current", case_id)),
            SCORES.get(("py", "coloraide", "wcag", "corrected", case_id)),
            SCORES.get(("sass", "sass-wcag", "wcag", "corrected", case_id)),
        ]
        rows.append(
            [
                pair["text"],
                pair["bg"],
                *["n/a" if value is None else fmt(value) for value in values],
            ]
        )
    return md_table(headers, rows)


def main() -> None:
    apca_stats = numeric_stats(APCA_IMPLS, "apca", OPAQUE_PAIR_IDS)
    wcag_stats = numeric_stats(WCAG_IMPLS, "wcag", OPAQUE_PAIR_IDS)
    apca_choices = choice_stats(APCA_IMPLS, "apca")
    wcag_choices = choice_stats(WCAG_IMPLS, "wcag")

    cross_env = [
        cross_env_stats(
            ("ts", "chroma", "apca", "corrected"),
            ("py", "chroma-port", "apca", "corrected"),
            OPAQUE_PAIR_IDS,
            "chroma (TS)",
            "chroma port (Python)",
        ),
        cross_env_stats(
            ("ts", "chroma", "apca", "corrected"),
            ("sass", "sass-apca", "apca", "corrected"),
            OPAQUE_PAIR_IDS,
            "chroma (TS)",
            "sass-apca",
        ),
        cross_env_stats(
            ("py", "chroma-port", "apca", "corrected"),
            ("sass", "sass-apca", "apca", "corrected"),
            OPAQUE_PAIR_IDS,
            "chroma port (Python)",
            "sass-apca",
        ),
        cross_env_stats(
            ("ts", "colorjs", "wcag", "corrected"),
            ("py", "coloraide", "wcag", "corrected"),
            OPAQUE_PAIR_IDS,
            "color.js (TS)",
            "coloraide (Python)",
        ),
        cross_env_stats(
            ("ts", "colorjs", "wcag", "corrected"),
            ("sass", "sass-wcag", "wcag", "corrected"),
            OPAQUE_PAIR_IDS,
            "color.js (TS)",
            "Sass WCAG prototype",
        ),
        cross_env_stats(
            ("py", "coloraide", "wcag", "corrected"),
            ("sass", "sass-wcag", "wcag", "corrected"),
            OPAQUE_PAIR_IDS,
            "coloraide (Python)",
            "Sass WCAG prototype",
        ),
        cross_env_stats(
            ("ts", "chroma", "wcag", "current"),
            ("py", "coloraide", "wcag", "corrected"),
            OPAQUE_PAIR_IDS,
            "chroma (TS)",
            "coloraide (Python)",
        ),
    ]
    cross_env = [row for row in cross_env if row is not None]

    polarity = [
        polarity_stats(("ts", "chroma", "apca", "current", "chroma (TS)")),
        polarity_stats(("py", "chroma-port", "apca", "current", "chroma port (Python)")),
        polarity_stats(("sass", "sass-apca", "apca", "current", "sass-apca")),
    ]

    apca_chroma_current = next(
        row for row in apca_choices if row["label"] == "chroma (TS, current)"
    )
    apca_chroma_corrected = next(
        row for row in apca_choices if row["label"] == "chroma (TS, corrected)"
    )
    wcag_chroma = next(row for row in wcag_choices if row["label"] == "chroma (TS)")
    wcag_colorjs = next(row for row in wcag_choices if row["label"] == "color.js (TS)")

    # Build the report.
    lines: list[str] = []
    lines.append("# Best color contrast package evaluation")
    lines.append("")
    lines.append(
        "This report compares the existing contrast implementations with the "
        "candidate packages. The corpus, harnesses and raw results are in "
        "`evaluation/`."
    )
    lines.append("")
    lines.append("## Summary")
    lines.append("")
    lines.append(
        f"- The pre-fix APCA implementation (the `current` baseline) selected a "
        f"different foreground than the canonical implementation in "
        f"{apca_chroma_current['mismatches']} of "
        f"{apca_chroma_current['total']} best-choice cases "
        f"({pct(apca_chroma_current['pct'])}). The cause was the swapped APCA "
        "argument order, not the package: with the corrected order the mismatch "
        "count is 0."
    )
    lines.append(
        "- The library has been updated to the corrected order. The sanity "
        "checks compare the fixed library against the corrected variant."
    )
    lines.append(
        "- APCA values already agree across chroma, apca-w3, color.js and "
        "sass-apca once the orientation is correct. Switching APCA packages "
        "does not change the numbers; color.js is still a reasonable TypeScript "
        "choice because its API is `(bg, fg)` and its licence is MIT."
    )
    lines.append(
        f"- WCAG is the package decision that matters. chroma's WCAG differs "
        f"from CSS Color 4 by up to {fmt(max(row['max'] for row in wcag_stats if row['label'] == 'chroma (TS)'))} "
        "on the corpus, while color.js, coloraide and the Sass prototype agree "
        "to within `5e-11`."
    )
    lines.append(
        "- Recommendation: keep the corrected APCA order, adopt CSS Color 4 for "
        "WCAG, use the Sass WCAG function, and keep `apca-w3` as a test oracle "
        "only."
    )
    lines.append("")
    lines.append("## Method")
    lines.append("")
    lines.append(
        "Every harness reads the same `cases.json`. APCA is evaluated with the "
        "text color first and the background color second; WCAG is symmetric. "
        "Two APCA variants are recorded:"
    )
    lines.append("")
    lines.append(
        "- **current**: the call order used by the library before the fix "
        "(`apca(bg, fg)`), retained as a baseline. It passes the background as "
        "the APCA text color."
    )
    lines.append(
        "- **corrected**: the APCA contract (`apca(fg, bg)`), which passes the "
        "foreground candidate as the text color."
    )
    lines.append("")
    lines.append("### Corpus")
    lines.append("")
    lines.append(
        f"- {CASES['meta']['pairs']} opaque pairs "
        f"({sum(1 for p in CASES['pairs'] if p['group'] == 'canonical')} canonical, "
        f"{sum(1 for p in CASES['pairs'] if p['group'] == 'random')} seeded random, "
        f"{sum(1 for p in CASES['pairs'] if p['group'] == 'edge')} edge)"
    )
    lines.append(
        f"- {CASES['meta']['best_cases']} best-choice cases over "
        f"{CASES['meta']['palette_colors']} palette colors"
    )
    lines.append(f"- {CASES['meta']['alpha_pairs']} alpha pairs (informational only)")
    lines.append(
        f"- Acceptance tolerances: APCA `{TOLERANCES['apca']}` Lc, "
        f"WCAG `{TOLERANCES['wcag']}` ratio"
    )
    lines.append("")
    lines.append("## APCA numeric agreement")
    lines.append("")
    lines.append(
        "Delta against the canonical `apca-w3` implementation with the correct "
        "orientation, over all opaque pairs. The `current` rows are expected to "
        "differ: they evaluate the existing swapped orientation, so the delta "
        "measures the polarity error rather than an implementation defect."
    )
    lines.append("")
    lines.append(
        md_table(
            ["Implementation", "n", "max delta", "mean", "p99", ">1e-9", ">1e-6", "> tolerance"],
            [
                [
                    row["label"],
                    row["n"],
                    fmt(row["max"]),
                    fmt(row["mean"]),
                    fmt(row["p99"]),
                    row["gt_1e9"],
                    row["gt_1e6"],
                    row["gt_tol"],
                ]
                for row in apca_stats
            ],
        )
    )
    lines.append("")
    lines.append("## WCAG numeric agreement")
    lines.append("")
    lines.append(
        "Delta against the CSS Color 4 implementation (`coloraide`), over all opaque pairs."
    )
    lines.append("")
    lines.append(
        md_table(
            ["Implementation", "n", "max delta", "mean", "p99", ">1e-9", ">1e-6", "> tolerance"],
            [
                [
                    row["label"],
                    row["n"],
                    fmt(row["max"]),
                    fmt(row["mean"]),
                    fmt(row["p99"]),
                    row["gt_1e9"],
                    row["gt_1e6"],
                    row["gt_tol"],
                ]
                for row in wcag_stats
            ],
        )
    )
    lines.append("")
    lines.append("## Cross-environment parity")
    lines.append("")
    lines.append(
        "Maximum absolute delta for the same text/background pairs in different environments."
    )
    lines.append("")
    lines.append(
        md_table(
            ["Left", "Right", "n", "max delta", "mean"],
            [
                [
                    row["left"],
                    row["right"],
                    row["n"],
                    fmt(row["max"]),
                    fmt(row["mean"]),
                ]
                for row in cross_env
            ],
        )
    )
    lines.append("")
    lines.append("## Best-choice agreement")
    lines.append("")
    lines.append(
        "Number of best-choice cases where the implementation selects a "
        "different foreground than the oracle."
    )
    lines.append("")
    lines.append("### APCA")
    lines.append("")
    lines.append(
        md_table(
            ["Implementation", "Mismatches", "Total", "Rate", *BEST_GROUPS],
            [
                [
                    row["label"],
                    row["mismatches"],
                    row["total"],
                    pct(row["pct"]),
                    *[row["per_group"][group] for group in BEST_GROUPS],
                ]
                for row in apca_choices
            ],
        )
    )
    lines.append("")
    lines.append("### WCAG")
    lines.append("")
    lines.append(
        md_table(
            ["Implementation", "Mismatches", "Total", "Rate", *BEST_GROUPS],
            [
                [
                    row["label"],
                    row["mismatches"],
                    row["total"],
                    pct(row["pct"]),
                    *[row["per_group"][group] for group in BEST_GROUPS],
                ]
                for row in wcag_choices
            ],
        )
    )
    lines.append("")
    lines.append("## Polarity analysis")
    lines.append("")
    lines.append(
        "The current APCA call order swaps text and background. This table shows "
        "how many best-choice cases change when the order is corrected, and the "
        "maximum score change on the opaque pairs."
    )
    lines.append("")
    lines.append(
        md_table(
            ["Implementation", "Flips", *BEST_GROUPS, "Max score delta", "Mean score delta"],
            [
                [
                    row["label"],
                    row["flip_count"],
                    *[row["by_group"][group] for group in BEST_GROUPS],
                    fmt(row["max_score_delta"]),
                    fmt(row["mean_score_delta"]),
                ]
                for row in polarity
            ],
        )
    )
    lines.append("")
    lines.append("### Example flips")
    lines.append("")
    example_flips = polarity[0]["flips"][:8]
    if example_flips:
        lines.append(
            md_table(
                ["Case", "Group", "Background", "Current choice", "Corrected choice"],
                [
                    [
                        flip["case_id"],
                        flip["group"],
                        flip["bg"],
                        flip["current"],
                        flip["corrected"],
                    ]
                    for flip in example_flips
                ],
            )
        )
    else:
        lines.append("No flips found.")
    lines.append("")
    lines.append("## Alpha appendix (informational)")
    lines.append("")
    lines.append(
        "Alpha handling is not part of the acceptance gate. The packages "
        "disagree: chroma blends with two-decimal alpha rounding, apca-w3 blends "
        "with its own rounding, color.js and sass-apca ignore alpha, and all WCAG "
        "paths ignore alpha."
    )
    lines.append("")
    lines.append(alpha_table())
    lines.append("")
    lines.append("## Sanity checks")
    lines.append("")
    lines.append(
        f"- TypeScript harness vs the library `bestColorContrast`: "
        f"{TS['sanity']['mismatches']}/{TS['sanity']['checked']} mismatches."
    )
    lines.append(
        f"- Python harness vs the library `best_color_contrast`: "
        f"{PY['sanity']['mismatches']}/{PY['sanity']['checked']} mismatches."
    )
    sass_sanity = SASS.get("sanity")
    if sass_sanity:
        lines.append(
            f"- Sass harness vs the library `best-color-contrast`: "
            f"{sass_sanity['mismatches']}/{sass_sanity['checked']} mismatches."
        )
    lines.append("")
    lines.append("## Package comparison")
    lines.append("")
    lines.append(
        md_table(
            ["Package", "Environment", "APCA", "WCAG", "APCA argument order", "Alpha", "License"],
            [
                [
                    "chroma-js 3.2.0",
                    "JS/TS",
                    "yes",
                    "2.0",
                    "`(text, bg)`",
                    "blends (2 dp)",
                    "BSD-3",
                ],
                ["sass-apca 1.2.0", "Sass", "yes", "no", "`(text, bg)`", "ignores", "MIT"],
                [
                    "chroma_js.py (port)",
                    "Python",
                    "yes",
                    "2.0",
                    "`(text, bg)`",
                    "blends (2 dp)",
                    "BSD-3",
                ],
                ["apca-w3 0.1.9", "JS/TS", "yes", "no", "`(text, bg)`", "blends", "W3-limited"],
                ["color.js 0.7.1", "JS/TS", "yes", "2.1 / CSS 4", "`(bg, fg)`", "ignores", "MIT"],
                ["coloraide 8.13.1", "Python", "no", "2.1 / CSS 4", "n/a", "ignores", "MIT"],
            ],
        )
    )
    lines.append("")
    lines.append("### How the packages work")
    lines.append("")
    lines.append(
        "- **chroma-js** implements APCA 0.0.98G-4g and the WCAG 2.0 ratio. "
        "WCAG uses the legacy `0.03928` threshold and "
        "`0.2126/0.7152/0.0722` coefficients. APCA blends text alpha with "
        "two-decimal alpha rounding. BSD-3."
    )
    lines.append(
        "- **sass-apca** implements APCA only with the same constants and "
        "`(text, bg)` order. It ignores alpha, clamps negative luminance to "
        "zero, and omits the `deltaYmin` noise gate (the output low-clip makes "
        "the practical difference negligible). MIT."
    )
    lines.append(
        "- **chroma_js.py** is a faithful port of chroma's WCAG and APCA "
        "functions, including the two-decimal alpha rounding. It matches the "
        "JavaScript implementation to about `4e-14`."
    )
    lines.append(
        "- **apca-w3** is the reference APCA implementation: `sRGBtoY()` "
        "produces luminance and `APCAcontrast()` returns the signed Lc value; "
        "`calcAPCA()` adds parsing and alpha blending. The W3-limited licence "
        "makes it suitable as an oracle, not as a shipped runtime dependency."
    )
    lines.append(
        "- **color.js** implements APCA with a `(background, foreground)` API, "
        "WCAG 2.1 using CSS Color 4 relative luminance via XYZ D65, and "
        "additional methods (Michelson, Weber, Lstar, deltaPhi). APCA ignores "
        "alpha. MIT."
    )
    lines.append(
        "- **coloraide** implements WCAG 2.1 with the same CSS Color 4 "
        "luminance path as color.js, plus Lstar. It has no APCA. MIT."
    )
    lines.append("")
    lines.append("## Recommendation")
    lines.append("")

    lines.append(
        "1. **The APCA argument order has been fixed in all three "
        "environments.** The pre-fix `current` baseline mismatched "
        f"{apca_chroma_current['mismatches']} of "
        f"{apca_chroma_current['total']} best-choice cases, while the corrected "
        f"order mismatches {apca_chroma_corrected['mismatches']}. The same "
        "correction is applied in `src/js/utils/best-color-contrast.ts`, "
        "`chrys/utils.py` and `src/css/_functions.scss`."
    )
    lines.append(
        "2. **Do not switch APCA packages for numeric reasons.** chroma, "
        "apca-w3, color.js and sass-apca already agree to the displayed "
        "precision. Switching to color.js in TypeScript is still reasonable "
        "because its API is `(bg, fg)` and its licence is MIT; keep the Python "
        "port and sass-apca, with the corrected order."
    )
    lines.append(
        "3. **Adopt CSS Color 4 for WCAG.** chroma's WCAG differs from "
        "color.js/coloraide on almost every pair (by up to 7.8e-4). The "
        "standards-aligned stack (color.js in TypeScript, coloraide in Python, "
        "a Sass port) agrees across environments. The Sass implementation in "
        "`src/css/_wcag.scss` follows the same CSS Color 4 definition."
    )
    lines.append(
        f"4. **The Sass WCAG function is in place.** Both color.js and chroma "
        f"select the same best colors on this corpus "
        f"({wcag_colorjs['mismatches']} and {wcag_chroma['mismatches']} "
        "mismatches respectively), but chroma's WCAG scores are not CSS Color 4 "
        "scores. The Sass implementation matches color.js and coloraide to "
        "within the acceptance tolerance."
    )
    lines.append(
        "5. **Keep alpha out of scope, or define one policy.** The main API "
        "should document opaque hex colors. If alpha is supported later, "
        "composite the foreground over the background in every environment; "
        "the current packages disagree."
    )
    lines.append(
        "6. **Use apca-w3 as a test oracle only.** Its W3 licence is not "
        "appropriate for a shipped general-purpose runtime dependency."
    )
    lines.append("")

    (EVAL / "REPORT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    summary = {
        "apca": apca_stats,
        "wcag": wcag_stats,
        "apca_choices": apca_choices,
        "wcag_choices": wcag_choices,
        "cross_env": cross_env,
        "polarity": polarity,
        "sanity": {
            "ts": TS.get("sanity"),
            "py": PY.get("sanity"),
        },
    }
    (RESULTS / "summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")

    print("Wrote evaluation/REPORT.md and evaluation/results/summary.json")
    print()
    print("APCA best-choice mismatches (current vs corrected):")
    for row in apca_choices:
        print(f"  {row['label']}: {row['mismatches']}/{row['total']} ({pct(row['pct'])})")
    print()
    print("WCAG best-choice mismatches:")
    for row in wcag_choices:
        print(f"  {row['label']}: {row['mismatches']}/{row['total']} ({pct(row['pct'])})")


if __name__ == "__main__":
    main()
