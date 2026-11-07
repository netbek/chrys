# Best color contrast package evaluation

This report compares the existing contrast implementations with the candidate packages. The corpus, harnesses and raw results are in `evaluation/`.

## Summary

- The existing APCA implementation selects a different foreground than the canonical implementation in 78 of 5510 best-choice cases (1.42%). The cause is the swapped APCA argument order, not the package: with the corrected order the mismatch count is 0.
- APCA values already agree across chroma, apca-w3, color.js and sass-apca once the orientation is correct. Switching APCA packages does not change the numbers; color.js is still a reasonable TypeScript choice because its API is `(bg, fg)` and its licence is MIT.
- WCAG is the package decision that matters. chroma's WCAG differs from CSS Color 4 by up to 7.80e-04 on the corpus, while color.js, coloraide and the Sass prototype agree to within `5e-11`.
- Recommendation: fix the APCA argument order in all three environments, adopt CSS Color 4 for WCAG, add the Sass WCAG function, and keep `apca-w3` as a test oracle only.

## Method

Every harness reads the same `cases.json`. APCA is evaluated with the text color first and the background color second; WCAG is symmetric. Two APCA variants are recorded:

- **current**: the call order used by the library today (`apca(bg, fg)`), which passes the background as the APCA text color.
- **corrected**: the APCA contract (`apca(fg, bg)`), which passes the foreground candidate as the text color.

### Corpus

- 2036 opaque pairs (24 canonical, 2000 seeded random, 12 edge)
- 5510 best-choice cases over 4801 palette colors
- 7 alpha pairs (informational only)
- Acceptance tolerances: APCA `0.01` Lc, WCAG `0.001` ratio

## APCA numeric agreement

Delta against the canonical `apca-w3` implementation with the correct orientation, over all opaque pairs. The `current` rows are expected to differ: they evaluate the existing swapped orientation, so the delta measures the polarity error rather than an implementation defect.

| Implementation | n | max delta | mean | p99 | >1e-9 | >1e-6 | > tolerance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| chroma (TS, current) | 2036 | 213.925406 | 54.260927 | 163.255061 | 1670 | 1670 | 1670 |
| chroma (TS, corrected) | 2036 | 0 | 0 | 0 | 0 | 0 | 0 |
| color.js (TS, corrected) | 2036 | 0 | 0 | 0 | 0 | 0 | 0 |
| chroma port (Python, current) | 2036 | 213.925406 | 54.260927 | 163.255061 | 1670 | 1670 | 1670 |
| chroma port (Python, corrected) | 2036 | 4.26e-14 | 1.92e-15 | 2.13e-14 | 0 | 0 | 0 |
| sass-apca (current) | 2036 | 213.925406 | 54.260927 | 163.255061 | 1670 | 1670 | 1670 |
| sass-apca (corrected) | 2036 | 5.00e-11 | 1.99e-11 | 4.95e-11 | 0 | 0 | 0 |
| apca-w3 (oracle) | 2036 | 0 | 0 | 0 | 0 | 0 | 0 |

## WCAG numeric agreement

Delta against the CSS Color 4 implementation (`coloraide`), over all opaque pairs.

| Implementation | n | max delta | mean | p99 | >1e-9 | >1e-6 | > tolerance |
| --- | --- | --- | --- | --- | --- | --- | --- |
| chroma (TS) | 2036 | 7.80e-04 | 1.28e-04 | 5.71e-04 | 2022 | 1995 | 0 |
| color.js (TS) | 2036 | 4.44e-15 | 2.37e-16 | 1.78e-15 | 0 | 0 | 0 |
| chroma port (Python) | 2036 | 7.80e-04 | 1.28e-04 | 5.71e-04 | 2022 | 1995 | 0 |
| coloraide (Python, oracle) | 2036 | 0 | 0 | 0 | 0 | 0 | 0 |
| Sass WCAG prototype | 2036 | 5.00e-11 | 2.51e-11 | 4.95e-11 | 0 | 0 | 0 |

## Cross-environment parity

Maximum absolute delta for the same text/background pairs in different environments.

| Left | Right | n | max delta | mean |
| --- | --- | --- | --- | --- |
| chroma (TS) | chroma port (Python) | 2036 | 4.26e-14 | 1.92e-15 |
| chroma (TS) | sass-apca | 2036 | 5.00e-11 | 1.99e-11 |
| chroma port (Python) | sass-apca | 2036 | 5.00e-11 | 1.99e-11 |
| color.js (TS) | coloraide (Python) | 2036 | 4.44e-15 | 2.37e-16 |
| color.js (TS) | Sass WCAG prototype | 2036 | 5.00e-11 | 2.51e-11 |
| coloraide (Python) | Sass WCAG prototype | 2036 | 5.00e-11 | 2.51e-11 |
| chroma (TS) | coloraide (Python) | 2036 | 7.80e-04 | 1.28e-04 |

## Best-choice agreement

Number of best-choice cases where the implementation selects a different foreground than the oracle.

### APCA

| Implementation | Mismatches | Total | Rate | wb | greys | mixed | edge |
| --- | --- | --- | --- | --- | --- | --- | --- |
| chroma (TS, current) | 78 | 5510 | 1.42% | 66 | 5 | 5 | 2 |
| chroma (TS, corrected) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |
| color.js (TS, corrected) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |
| chroma port (Python, current) | 78 | 5510 | 1.42% | 66 | 5 | 5 | 2 |
| chroma port (Python, corrected) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |
| sass-apca (current) | 78 | 5510 | 1.42% | 66 | 5 | 5 | 2 |
| sass-apca (corrected) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |
| apca-w3 (oracle) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |

### WCAG

| Implementation | Mismatches | Total | Rate | wb | greys | mixed | edge |
| --- | --- | --- | --- | --- | --- | --- | --- |
| chroma (TS) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |
| color.js (TS) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |
| chroma port (Python) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |
| coloraide (Python, oracle) | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |
| Sass WCAG prototype | 0 | 5510 | 0.00% | 0 | 0 | 0 | 0 |

## Polarity analysis

The current APCA call order swaps text and background. This table shows how many best-choice cases change when the order is corrected, and the maximum score change on the opaque pairs.

| Implementation | Flips | wb | greys | mixed | edge | Max score delta | Mean score delta |
| --- | --- | --- | --- | --- | --- | --- | --- |
| chroma (TS) | 78 | 66 | 5 | 5 | 2 | 213.925406 | 54.260927 |
| chroma port (Python) | 78 | 66 | 5 | 5 | 2 | 213.925406 | 54.260927 |
| sass-apca | 78 | 66 | 5 | 5 | 2 | 213.925406 | 54.260927 |

### Example flips

| Case | Group | Background | Current choice | Corrected choice |
| --- | --- | --- | --- | --- |
| best-wb-0636 | wb | #2aabee | #000000 | #ffffff |
| best-wb-0657 | wb | #2ba9ef | #000000 | #ffffff |
| best-wb-0776 | wb | #31b57b | #000000 | #ffffff |
| best-wb-0794 | wb | #32b57a | #000000 | #ffffff |
| best-wb-0795 | wb | #32b57b | #000000 | #ffffff |
| best-wb-0796 | wb | #32b67a | #000000 | #ffffff |
| best-wb-0816 | wb | #33b679 | #000000 | #ffffff |
| best-wb-0817 | wb | #33b67a | #000000 | #ffffff |

## Alpha appendix (informational)

Alpha handling is not part of the acceptance gate. The packages disagree: chroma blends with two-decimal alpha rounding, apca-w3 blends with its own rounding, color.js and sass-apca ignore alpha, and all WCAG paths ignore alpha.

| text | bg | chroma APCA | apca-w3 APCA | color.js APCA | sass-apca APCA | chroma WCAG | coloraide WCAG | Sass WCAG |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| #00000044 | #ffffff | 37.262528 | 36.717457 | 106.040673 | 106.040673 | 21.000000 | 21.000000 | 21.000000 |
| #ffffffc0 | #000000 | -68.041485 | -68.619946 | -107.884733 | -107.884733 | 21.000000 | 21.000000 | 21.000000 |
| #0004 | #ffffff | 37.262528 | 36.717457 | 106.040673 | 106.040673 | 21.000000 | 21.000000 | 21.000000 |
| #ff000080 | #000000 | -9.540806 | -9.540806 | -37.544993 | -37.544993 | 5.252000 | 5.252780 | 5.252780 |
| #00000000 | #ffffff | 0 | 106.040673 | 106.040673 | 106.040673 | 21.000000 | 21.000000 | 21.000000 |
| #000000ff | #ffffff | 106.040673 | 106.040673 | 106.040673 | 106.040673 | 21.000000 | 21.000000 | 21.000000 |
| #0006 | #ffffff | 54.621841 | 54.621841 | 106.040673 | 106.040673 | 21.000000 | 21.000000 | 21.000000 |

## Sanity checks

- TypeScript harness vs the library `bestColorContrast`: 0/240 mismatches.
- Python harness vs the library `best_color_contrast`: 0/240 mismatches.
- Sass harness vs the library `best-color-contrast`: 0/120 mismatches.

## Package comparison

| Package | Environment | APCA | WCAG | APCA argument order | Alpha | License |
| --- | --- | --- | --- | --- | --- | --- |
| chroma-js 3.2.0 | JS/TS | yes | 2.0 | `(text, bg)` | blends (2 dp) | BSD-3 |
| sass-apca 1.2.0 | Sass | yes | no | `(text, bg)` | ignores | MIT |
| chroma_js.py (port) | Python | yes | 2.0 | `(text, bg)` | blends (2 dp) | BSD-3 |
| apca-w3 0.1.9 | JS/TS | yes | no | `(text, bg)` | blends | W3-limited |
| color.js 0.7.1 | JS/TS | yes | 2.1 / CSS 4 | `(bg, fg)` | ignores | MIT |
| coloraide 8.13.1 | Python | no | 2.1 / CSS 4 | n/a | ignores | MIT |

### How the packages work

- **chroma-js** implements APCA 0.0.98G-4g and the WCAG 2.0 ratio. WCAG uses the legacy `0.03928` threshold and `0.2126/0.7152/0.0722` coefficients. APCA blends text alpha with two-decimal alpha rounding. BSD-3.
- **sass-apca** implements APCA only with the same constants and `(text, bg)` order. It ignores alpha, clamps negative luminance to zero, and omits the `deltaYmin` noise gate (the output low-clip makes the practical difference negligible). MIT.
- **chroma_js.py** is a faithful port of chroma's WCAG and APCA functions, including the two-decimal alpha rounding. It matches the JavaScript implementation to about `4e-14`.
- **apca-w3** is the reference APCA implementation: `sRGBtoY()` produces luminance and `APCAcontrast()` returns the signed Lc value; `calcAPCA()` adds parsing and alpha blending. The W3-limited licence makes it suitable as an oracle, not as a shipped runtime dependency.
- **color.js** implements APCA with a `(background, foreground)` API, WCAG 2.1 using CSS Color 4 relative luminance via XYZ D65, and additional methods (Michelson, Weber, Lstar, deltaPhi). APCA ignores alpha. MIT.
- **coloraide** implements WCAG 2.1 with the same CSS Color 4 luminance path as color.js, plus Lstar. It has no APCA. MIT.

## Recommendation

1. **Fix the APCA argument order in all three environments.** The current order is the main source of wrong selections: `chroma (TS, current)` mismatches 78 of 5510 best-choice cases, while the corrected order mismatches 0. Apply the same correction to `chrys/utils.py` and `src/css/_functions.scss`.
2. **Do not switch APCA packages for numeric reasons.** chroma, apca-w3, color.js and sass-apca already agree to the displayed precision. Switching to color.js in TypeScript is still reasonable because its API is `(bg, fg)` and its licence is MIT; keep the Python port and sass-apca, with the corrected order.
3. **Adopt CSS Color 4 for WCAG.** chroma's WCAG differs from color.js/coloraide on almost every pair (by up to 7.8e-4). The standards-aligned stack (color.js in TypeScript, coloraide in Python, a Sass port) agrees across environments. The prototype Sass function in `evaluation/sass/_wcag.scss` is the reference for the new Sass function.
4. **Add the Sass WCAG function.** Both color.js and chroma select the same best colors on this corpus (0 and 0 mismatches respectively), but chroma's WCAG scores are not CSS Color 4 scores. The prototype Sass function matches color.js and coloraide to within the acceptance tolerance, so it is the reference for the new Sass implementation.
5. **Keep alpha out of scope, or define one policy.** The main API should document opaque hex colors. If alpha is supported later, composite the foreground over the background in every environment; the current packages disagree.
6. **Use apca-w3 as a test oracle only.** Its W3 licence is not appropriate for a shipped general-purpose runtime dependency.

