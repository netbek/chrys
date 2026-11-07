# JavaScript and Python Parity Design

> **Status:** Last updated 2026-11-06.

## Context

The JavaScript and Python packages already ship identical palette tables. The generated data in `data/*.js` and `src/js/palettes/*/index.js` matches `chrys/data/*.py` for palette names, supported sizes, documentation palettes, and 256-color sources. The divergence is in the public surface and runtime behavior:

- JavaScript defaults `bestColorContrast` to APCA; Python defaults `best_color_contrast` to WCAG.
- JavaScript has no continuous-palette conversion and no RGB output; Python has both.
- Python's public palette module does not export the D3 catalog constants, while the JavaScript package root does.
- Python's package root exposes no public API; JavaScript exports its public API from the package root.
- Error behavior differs: JavaScript uses `RangeError` or `Error`, Python raises `ValueError` or leaks raw `KeyError`.
- JavaScript currently passes APCA arguments in the wrong order to `chroma.contrastAPCA`; the absolute result usually picks the same winner, but the score is not the true foreground/background score.
- Python samples continuous palettes with evenly spaced indices; the JavaScript data-generation helper samples with d3 `scaleQuantile`.

The design keeps the color tables as the source of truth, unifies the runtime contract, and adds a cross-language parity check so the two implementations cannot drift silently.

## Goals

1. Give both packages one palette contract: same catalog, same discrete/docs/continuous results, same RGB output.
2. Make APCA the shared default contrast algorithm, with WCAG available through the same options object in both languages.
3. Add continuous-palette conversion and integer RGB output to JavaScript, and change Python RGB output to the same 0-255 contract.
4. Expose the same public operations and catalog constants from both package roots, including the D3 maps.
5. Verify parity with executable tests rather than documentation alone.

## Non-goals

- Changing upstream palette values or adding new vendors and palettes.
- Guaranteeing that continuous conversion with the documentation palette length reproduces the stored documentation palette. Vega documentation palettes were generated from a different source than their 256-color forms.
- Preserving the old contrast call signatures or the `AAA` keyword. The unified options object is an intentional breaking change.
- Matching exception class names across languages. Behavior and the specified message wording are the parity contract.
- Redesigning the demo or CLI beyond updating examples that call changed APIs.
- Optimizing conversion or scoring performance.

## Terminology

| Term | Meaning |
|------|---------|
| Palette catalog | The complete set of palette names, vendor assignments, group memberships, supported discrete sizes, documentation palettes, and 256-color sources. |
| Discrete palette | A palette entry stored as an ordered list of hex colors for a specific size. |
| Documentation palette | The ordered list of hex colors shown in documentation for a palette; it is stored separately from discrete sizes. |
| Continuous source | The 256-color list that a continuous-capable palette exposes. |
| Continuous palette | A sampled list of colors produced from a continuous source at a requested count. |
| Quantile sampling | The deterministic sampling rule defined in D3, including the edge rules for zero, one, and over-length requests. |
| Contrast score | A numeric score for one foreground/background pair under a selected algorithm and accessibility options. |
| APCA | The Accessible Perceptual Contrast Algorithm, as implemented by the existing JavaScript dependency. |
| WCAG | The contrast-ratio calculation and AA/AAA threshold bonus currently used by Python. |
| Options object | A mapping with the fields `algorithm`, `large`, and `aaa`; JavaScript uses an object, Python uses a mapping typed as `ContrastOptions`. |
| RGB output | A three-element sequence of integer red, green, and blue channels in the 0-255 range. |
| Parity fixture | A language-neutral JSON record of selected inputs and expected outputs, read by both test suites. |

## Architecture

```text
upstream palette sources
          |
   data-generation scripts
      /            \
data/*.js       chrys/data/*.py
   |                  |
src/js/palettes   chrys/palettes.py
   |                  |
src/js/registry   Python public API
   |                  |
src/js/index      chrys/__init__.py
```

### Palette data flow

1. The generation scripts read the upstream vendor palettes and produce both the JavaScript and Python data modules.
2. Each package builds a name-to-vendor map from the group tables and a vendor-to-palette map from the data modules.
3. A name lookup resolves the vendor, then selects the discrete, documentation, or 256-color source entry.
4. Discrete conversion applies size validation and clamping.
5. Continuous conversion applies the quantile sampler to the 256-color source.
6. An optional RGB conversion runs after selection so the stored palette data is never mutated.

### Contrast flow

1. Validate the background, every foreground candidate, and the options object before scoring.
2. Normalize each color to RGB in the package's color library.
3. For APCA, compute the absolute APCA score with the candidate as text and the background as the background.
4. For WCAG, compute the contrast ratio and add the threshold bonus for the selected `large`/`aaa` combination.
5. Select the first candidate with the maximum score.
6. Return the original candidate value, not a normalized color.

### Parity verification flow

1. A JavaScript dump script and a Python dump script emit canonical JSON for the catalog, representative discrete sizes, documentation palettes, continuous samples, contrast scores, and error messages.
2. CI runs both dumps and compares the JSON.
3. A committed parity fixture holds a small language-neutral set of cases so each package can test against the contract without invoking the other runtime.
4. Data-generation checks compare every generated entry across the two artifacts.

## Code layout

| Module | Responsibility |
|--------|----------------|
| `src/js/bestColorContrast.ts` | Contrast options, APCA/WCAG scoring, candidate selection, input validation. |
| `src/js/toDiscretePalette.ts` | Discrete size validation, clamping, copying, optional RGB output. |
| `src/js/toContinuousPalette.ts` | New quantile sampler, size rules, optional RGB output. |
| `src/js/registry.ts` | Name parsing, data lookup, public discrete/docs/continuous functions, canonical palette errors. |
| `src/js/index.ts` | Package-root exports for palette and contrast APIs. |
| `src/js/paletteModules.js`, `data/*.js` | Generated palette data; not edited by hand. |
| `chrys/utils.py` | APCA and WCAG scoring, options validation, candidate selection. |
| `chrys/palettes.py` | Registry, discrete/docs/continuous APIs, quantile sampler, integer RGB output, D3 re-exports, `__all__`. |
| `chrys/__init__.py` | Package-root re-exports; submodule imports remain available. |
| `chrys/data/*.py` | Generated palette data; not edited by hand. |
| `scripts/utils.js`, `scripts/*-palettes.js` | Data generation and the existing d3 quantile helper used to produce documentation palettes. |
| `tests/parity/` | Shared contract fixture and language-specific parity checks. |

## Design decisions

### D1: Use one contrast options object and make APCA the default

**Decision.** Both packages accept an options mapping with `algorithm` (`"apca"` or `"wcag"`), `large` (boolean), and `aaa` (boolean). The defaults are `"apca"`, `false`, and `false`. Python types the mapping as `ContrastOptions`; JavaScript exports an equivalent interface. Old positional `large`/`AAA` arguments and the JavaScript third-string algorithm argument are removed.

**Rationale.** The options object removes positional ambiguity, gives both languages the same call shape, and matches the chosen APCA default. It also lets the scoring operation receive the same accessibility flags as selection.

**Consequences.** This is a breaking change for both packages. Existing JavaScript calls that pass `"wcag"` as the third argument must become options objects. Existing Python calls that pass `large` or `AAA` positionally or by keyword must move them into the options mapping. Documentation and demo examples need updating.

### D2: Implement APCA locally in Python and correct argument order in both packages

**Decision.** Add a pure-Python APCA function in `chrys/utils.py` using the same constants and formula as the existing JavaScript dependency. Call it with the foreground candidate as text and the background color as the background, then take the absolute value. Change JavaScript to use the same argument order.

**Rationale.** A local implementation avoids adding a runtime dependency whose formula could drift from the JavaScript implementation. Correcting the order removes a latent scoring bug: the current JavaScript code swaps text and background, so its absolute scores are not the true APCA scores for the pair.

**Consequences.** APCA scores change for some pairs even when the selected color does not. The formula is pinned by tests. If the JavaScript dependency updates its APCA implementation, the Python implementation must be updated in the same change.

### D3: Use d3-style quantile sampling with explicit edge rules

**Decision.** Continuous conversion follows these rules in both languages:

- `n == 0` returns an empty list.
- `n == 1` returns the first source color.
- `n > source length` raises the too-many-colors error.
- For `2 <= n <= source length`, build the domain `0 .. n-1`, compute thresholds `quantile_sorted(domain, i / source_length)` for `i = 1 .. source_length - 1`, and select `source[bisect_right(thresholds, i)]` for each domain value `i`.

`quantile_sorted` follows the d3 interpolation rule: for `p <= 0` return the first value, for `p >= 1` return the last value, otherwise interpolate between the two values surrounding position `(len(values) - 1) * p`.

**Rationale.** Quantile sampling was selected over evenly spaced indices. It is deterministic, matches the helper used for the Bokeh and D3 documentation palettes, and needs no new runtime dependency. The edge rules preserve the useful Python behavior for one color and prevent silent duplication when too many colors are requested.

**Consequences.** Python continuous output changes for most counts. For example, three colors from a four-color source now return the first, third, and fourth colors instead of the first, second, and fourth. Tests and documentation examples must be updated. The one-color rule is a deliberate exception to raw d3 `scaleQuantile`, which would return the last color for a one-value domain.

### D4: Return integer RGB channels in the 0-255 range

**Decision.** JavaScript palette functions accept an `asRgb` option; Python keeps the `as_rgb` keyword. When enabled, both return three-element sequences of integers from 0 to 255. JavaScript returns arrays; Python returns tuples. Channels are computed from the hex color and rounded half-up. Outputs are fresh objects, so mutating them cannot change stored palette data.

**Rationale.** Integer channels are easier to compare across languages and avoid floating-point differences in parity tests. Keeping the language-native container type respects each language's conventions while preserving the same channel values.

**Consequences.** Python's current 0-1 float output is a breaking change. Tests must cover exact channel values and output independence.

### D5: Expose the same public catalog and package-root surface

**Decision.** Python's public palette module imports and exports `D3_PALETTE_NAMES`, `D3_PALETTES`, and `D3_DOCS_PALETTES` alongside the Bokeh and Vega equivalents. Add an `__all__` to prevent module internals from leaking into wildcard imports. Re-export the public palette, contrast, and catalog names from `chrys/__init__.py`, while keeping submodule imports working. JavaScript continues to export the same names from its package root.

**Rationale.** Callers should not need to know which package stores D3 constants in a different module. Root exports also satisfy the package-root parity requirement without removing the existing submodule entry points.

**Consequences.** The Python root namespace grows and must be curated. Re-exporting from `__init__` creates an import path through `chrys.palettes`; the data modules must remain free of imports from the package root to avoid cycles. Wildcard imports become stable because `__all__` is explicit.

### D6: Use one validation and error contract

**Decision.** Both packages validate palette sizes as finite numbers with zero fractional part; booleans, negative values, `NaN`, and infinities are rejected. Both reject an empty foreground list, an unknown contrast algorithm, an empty palette, an unknown vendor, an unknown palette name, empty palette data, and missing documentation data with the canonical messages in the error reference. Unknown options fields and invalid option values are also rejected. JavaScript uses `RangeError` for size and count violations and `Error` subclasses for catalog, options, and color errors; Python uses `ValueError` subclasses.

**Rationale.** Canonical messages make parity failures readable and prevent one implementation from silently falling back to another algorithm or leaking a raw lookup error.

**Consequences.** JavaScript's current unknown-algorithm fallback disappears. Python's raw `KeyError` for missing data disappears. Python accepts integral floats such as `6.0` where it previously rejected them; JavaScript already accepted them. Tests must cover the message strings and validation boundaries.

### D7: Verify parity with generated dumps and a shared fixture

**Decision.** Add a JavaScript and a Python script that emit canonical JSON for catalog entries, conversion samples, contrast scores, and errors. CI runs both and compares the output. A small committed fixture under `tests/parity/` provides language-neutral expected cases for unit tests. Data-generation checks compare every generated palette entry across the two artifacts.

**Rationale.** Unit tests in each language can drift independently. A generated dump catches differences in data, ordering, sampling, rounding, and messages that a shared fixture would miss if it only covered a few examples.

**Consequences.** The repository gains two small scripts, a CI step, and a fixture. The dump format is internal; it must be stable enough for comparison but is not a public API.

## Error reference

The spec defers message wording to this table. Strings use angle-bracket tokens such as `<n>` for runtime values. The spec's size-validation, empty-palette, unsupported-continuous, too-many-colors, vendor-not-found, unknown-palette, empty-palette-data, and missing-documentation references map to the rows below in that order.

| Condition | Canonical message | JavaScript error | Python error |
|-----------|-------------------|------------------|--------------|
| Size is not a non-negative integer | `Palette size must be a non-negative integer, got <n>.` | `RangeError` | `ValueError` |
| Requested discrete size is unsupported | `Unsupported palette size <n>. Supported sizes: <sizes>.` | `RangeError` | `ValueError` |
| Palette has no sizes | `Palette is empty.` | `Error` | `ValueError` |
| Continuous count exceeds source length | `Requested <n> colors, function can only return colors up to the base palette's length (<length>).` | `RangeError` | `ValueError` |
| Palette has no continuous source | `Generating continuous palettes of "<name>" is not supported.` | `Error` | `ValueError` |
| Vendor is not in the catalog | `Vendor "<vendor>" not found.` | `VendorNotFoundError` | `VendorNotFoundError` |
| Palette name is not in the catalog | `Palette "<name>" not found.` | `PaletteNotFoundError` | `PaletteNotFoundError` |
| Discrete palette data is empty | `Palette data for "<name>" is empty.` | `PaletteDataEmptyError` | `PaletteDataEmptyError` |
| Documentation palette data is missing | `Documentation palette data for "<name>" not found.` | `Error` | `ValueError` |
| Foreground candidate list is empty | `At least one foreground color is required.` | `Error` | `ValueError` |
| Contrast algorithm is not APCA or WCAG | `Contrast algorithm "<algorithm>" not recognized.` | `Error` | `ValueError` |
| Contrast options contain an unknown field | `Unsupported contrast option "<option>".` | `Error` | `ValueError` |
| Contrast option has an invalid value | `Invalid value for contrast option "<option>": <value>.` | `Error` | `ValueError` |
| Color string cannot be parsed | `Invalid color "<value>".` | `Error` | `ValueError` |

## Alternatives considered

| Alternative | Why rejected |
|-------------|--------------|
| Keep WCAG as the default | The selected contract makes JavaScript's APCA default the shared behavior; changing Python is the smaller conceptual change for callers who already expect APCA. |
| Keep legacy positional signatures with compatibility shims | Shims preserve two call shapes and keep the parity contract ambiguous. The unified options object is intentionally breaking. |
| Use evenly spaced index sampling for continuous palettes | It preserves Python's current tests but does not match the quantile helper used for most documentation palettes. |
| Use normalized 0-1 RGB floats | Floating-point formatting and rounded values make cross-language comparisons brittle. Integer channels are the selected contract. |
| Add `d3-scale` as a JavaScript runtime dependency | The sampler is small and self-contained; a dependency would increase the runtime footprint for one helper. |
| Add a Python APCA package | A local implementation avoids dependency drift and keeps the exact formula under test. |
| Force Vega documentation palettes to match continuous conversion | Regenerating Vega docs from their 256-color sources would change published colors. The spec does not require the two operations to agree. |
| Write separate specs for palette, contrast, and export parity | The requested outcome is one cross-language contract; splitting would duplicate the shared acceptance criteria. |

## Test strategy

| Layer | Scope | Examples |
|-------|-------|----------|
| JavaScript unit tests | Options, scoring, selection, validation, discrete conversion, continuous sampling, RGB output | APCA default on red; WCAG on red; empty candidates; `n = 3` from a four-color source; integer RGB channels. |
| Python unit tests | Same contract from the Python side | `best_color_contrast` with APCA and WCAG options; `continuous_palette` quantile output; `as_rgb=True` integers; canonical errors. |
| Cross-language parity dump | Catalog, data, conversion samples, contrast scores, messages | Run both dump scripts; compare canonical JSON for every catalog entry and a fixed contrast matrix. |
| Shared parity fixture | Language-neutral expected cases | `tests/parity/` fixture read by both suites for representative sizes, continuous counts, and contrast options. |
| Data generation | Generated artifacts stay identical | Run `make build-data`; compare every name, size, docs entry, and 256-color source across JavaScript and Python. |
| Package surface | Root imports and catalog constants | Import palette and contrast operations from both package roots; read D3 maps from Python's public palette module; check `__all__` does not expose internals. |
| Regression | Known user-facing examples | Black and white on red; docs palette copying; zero-size behavior; unsupported size message. |

## References

- `src/js/bestColorContrast.ts`
- `src/js/toDiscretePalette.ts`
- `src/js/registry.ts`
- `src/js/paletteModules.js`
- `src/js/__tests__/bestColorContrast.test.ts`
- `chrys/utils.py`
- `chrys/palettes.py`
- `chrys/__init__.py`
- `tests/test_utils.py`
- `scripts/utils.js`
- `scripts/*-palettes.js`
- `Makefile`
- `node_modules/d3-scale/src/quantile.js`
- `node_modules/d3-array/src/quantile.js`
- `node_modules/chroma-js/dist/chroma.cjs` APCA implementation
