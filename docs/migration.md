# Migrating from chrys v4 to chrys v5

This guide covers the breaking changes between chrys 4.x and 5.x for consumers of the JavaScript, Python, and Sass packages. The last v4 release is 4.3.3.

## Quick reference

| v4 | v5 |
| --- | --- |
| `import {discretePalette} from 'chrys/umd'` | `import {getPaletteColors} from 'chrys'` |
| `discretePalette(name, n)` | `getPaletteColors(name, n)` |
| `toDiscretePalette(palette, n)` | `toDiscreteColors(palette, n)` |
| — | `toContinuousColors(colors, n)` |
| `docsPalette(name)` | Removed; use `getPaletteColors` or palette data |
| `bestColorContrast(bg, fg)` | Same name; APCA polarity fixed |
| `best-color-contrast($bg-color, $fg-colors)` | Same name; APCA polarity fixed |
| `parsePaletteName(name)` | Same name; typed errors |
| `from chrys.palettes import discrete_palette` | `from chrys.utils import get_palette_colors` |
| `from chrys.palettes import continuous_palette` | `from chrys.utils import get_palette_colors` |
| `from chrys.palettes import parse_palette_name` | `from chrys.utils import parse_palette_name` |
| `discrete_palette(name, n, as_rgb=True)` | `get_palette_colors(name, n)`; convert hex to RGB yourself |
| `best_color_contrast(bg, fg, large, AAA)` | `best_color_contrast(bg, fg)`; APCA polarity fixed |

## JavaScript and TypeScript

### Import paths

v5 publishes ESM and CommonJS builds under `dist/`, with type declarations. Import from the package root:

```js
import {VEGA_ACCENT, getPaletteColors} from 'chrys';
```

The v4 `chrys/umd` path is no longer available. For a browser `<script>` tag, use the UMD build published on unpkg or jsDelivr:

```html
<script src="https://unpkg.com/chrys/dist/umd/index.min.js"></script>
```

### Renamed functions

| v4 | v5 | Notes |
| --- | --- | --- |
| `discretePalette(name, n)` | `getPaletteColors(name, n)` | Resolves both discrete and continuous palettes. |
| `toDiscretePalette(palette, n)` | `toDiscreteColors(palette, n)` | Operates on palette data directly. |
| — | `toContinuousColors(colors, n)` | New; samples a base colour list. |
| `docsPalette(name)` | Removed | The demo-only palette data is no longer published. |
| `parsePaletteName(name)` | `parsePaletteName(name)` | Same purpose; throws typed errors. |
| `bestColorContrast(bg, fg, algorithm)` | `bestColorContrast(bg, fg)` | APCA argument order corrected; the algorithm argument was removed. |

### Removed exports

The following were exported in v4 and are no longer part of the public JavaScript API:

- `BOKEH` and `VEGA` constants.
- `CATEGORICAL_PALETTE_VENDORS`, `DIVERGING_PALETTE_VENDORS`, `SEQUENTIAL_PALETTE_VENDORS`, and `CYCLICAL_PALETTE_VENDORS`.
- `BOKEH_DOCS_PALETTE_DATA`, `BOKEH_DOCS_PALETTES`, `VEGA_DOCS_PALETTE_DATA`, and `VEGA_DOCS_PALETTES`.
- `discretePalette`, `toDiscretePalette`, and `docsPalette`.

If you relied on the vendor mapping constants, keep a local copy or derive the vendor from the palette name prefix (`bokeh_`, `vega_`, or `d3_`).

### New exports

- `getPaletteColors`, `toDiscreteColors`, `toContinuousColors`, and `parseColor`.
- Error classes: `PaletteNotFoundError`, `VendorNotFoundError`, and `PaletteDataEmptyError`.
- Types: `CssColor`, `CssColors`, `HexColor`, `HexColors`, `Palette`, `ParsedPaletteName`, `QualifiedPaletteName`, `RgbColor`, and `Vendor`.
- D3 palette constants, such as `D3_ACCENT` and `D3_VIRIDIS`.
- Per-palette data constants from palette subpaths, such as `BOKEH_VIRIDIS_PALETTE_DATA`, `VEGA_ACCENT_PALETTE_DATA`, and `D3_BLUES_PALETTE_DATA`.

The aggregate `*_PALETTE_DATA`, `*_PALETTE_NAMES`, and `*_PALETTES` exports for Bokeh, Vega, and D3 are still available from the package root. Per-palette data constants are imported from a palette subpath:

```js
import {BOKEH_VIRIDIS_PALETTE_DATA} from 'chrys/palettes/bokeh/viridis';
```

### Discrete and continuous colours

`getPaletteColors` chooses the right representation automatically. Continuous palettes are sampled from their 256-colour ramp; other palettes return discrete colours. Pass `n` to limit the number of colours; omit it to return every available colour. Pass `mode` to override the automatic selection.

```js
import {VEGA_ACCENT, VEGA_VIRIDIS, getPaletteColors} from 'chrys';

const allDiscrete = getPaletteColors(VEGA_ACCENT);
const five = getPaletteColors(VEGA_ACCENT, 5);
const ramp = getPaletteColors(VEGA_VIRIDIS, undefined, 'continuous');
const discreteViridis = getPaletteColors(VEGA_VIRIDIS, 6, 'discrete');
```

`mode` accepts `auto` (default), `continuous`, or `discrete`. Forcing `continuous` on a palette without a 256-colour ramp, or forcing `discrete` on a palette without discrete sizes, throws an error.

For smaller bundles, import the utility and palette data directly:

```js
import toDiscreteColors from 'chrys/utils/to-discrete-colors';
import {BOKEH_VIRIDIS_PALETTE_DATA} from 'chrys/palettes/bokeh/viridis';

const colors = toDiscreteColors(BOKEH_VIRIDIS_PALETTE_DATA, 6);
```

```js
import toContinuousColors from 'chrys/utils/to-continuous-colors';
import {VEGA_VIRIDIS_PALETTE_DATA} from 'chrys/palettes/vega/viridis';

const colors = toContinuousColors(VEGA_VIRIDIS_PALETTE_DATA[256], 7);
```

### Contrast selection

`bestColorContrast` uses the APCA algorithm. It accepts hexadecimal colours and absolute `rgb()`/`rgba()` colours; alpha is ignored. Relative colours, `calc()`, `var()`, and other colour functions are not supported. v5 fixes the argument order so the foreground colour is treated as the text colour, which is required by APCA. The selected colour can therefore differ from v4.

```js
import {bestColorContrast} from 'chrys';

const color = bestColorContrast('rgb(255, 0, 0)', ['#000000', '#ffffff']);
```

An empty foreground list now throws an error instead of returning `undefined`.

### Parsing colours

`parseColor` parses a hexadecimal or absolute `rgb()`/`rgba()` colour into 8-bit sRGB channels. Alpha is ignored. The same parser backs `bestColorContrast`.

```js
import {parseColor} from 'chrys';

parseColor('rgb(255, 0, 0)');
// [255, 0, 0]
```

For smaller bundles, import it from the utility subpath:

```js
import parseColor from 'chrys/utils/parse-color';
```

### Parsing palette names

```js
import {VEGA_ACCENT, parsePaletteName} from 'chrys';

parsePaletteName(VEGA_ACCENT);
// {vendor: "vega", palette: "accent"}
```

v5 throws `VendorNotFoundError` for an unknown vendor prefix and `PaletteNotFoundError` for an unknown palette name.

### Colour count validation

`n` is optional on `getPaletteColors`, `toDiscreteColors`, and `toContinuousColors`. When given, it must be a non-negative integer. Unsupported discrete sizes throw a `RangeError` instead of returning an obscure error or clamping silently.

## Python

### Import paths

Palette constants remain in `chrys.palettes`. Colour utilities now live in `chrys.utils`.

```python
from chrys.palettes import VEGA_ACCENT
from chrys.utils import get_palette_colors

colors = get_palette_colors(VEGA_ACCENT, n=5)
```

### Renamed and moved functions

| v4 | v5 |
| --- | --- |
| `chrys.palettes.discrete_palette(name, n, as_rgb)` | `chrys.utils.get_palette_colors(name, n)` |
| `chrys.palettes.continuous_palette(name, n, as_rgb)` | `chrys.utils.get_palette_colors(name, n)` |
| `chrys.palettes.to_discrete_palette(palette, n, as_rgb)` | `chrys.utils.to_discrete_colors(palette, n)` |
| `chrys.palettes.to_continuous_palette(palette, n, as_rgb)` | `chrys.utils.to_continuous_colors(colors, n)` |
| `chrys.palettes.parse_palette_name(name)` | `chrys.utils.parse_palette_name(name)` |
| `chrys.palettes.docs_palette(name)` | Removed |
| `chrys.utils.score_contrast(...)` | Removed |

`get_palette_colors` selects discrete or continuous output automatically. Continuous palettes are sampled from their 256-colour ramp. Pass `n` to limit the number of colours; omit it to return every available colour. Use `mode` to override the automatic selection.

```python
from chrys.palettes import VEGA_ACCENT, VEGA_VIRIDIS
from chrys.utils import PaletteMode, get_palette_colors

all_discrete = get_palette_colors(VEGA_ACCENT)
five = get_palette_colors(VEGA_ACCENT, n=5)
ramp = get_palette_colors(VEGA_VIRIDIS, mode=PaletteMode.CONTINUOUS)
discrete_viridis = get_palette_colors(VEGA_VIRIDIS, n=6, mode="discrete")
```

`mode` accepts `auto` (default), `continuous`, or `discrete`. Forcing `continuous` on a palette without a 256-colour ramp, or forcing `discrete` on a palette without discrete sizes, raises `ValueError`.

### RGB output removed

The `as_rgb` argument has been removed, along with the `matplotlib` dependency. All colours are returned as hexadecimal strings. Convert them yourself if you need RGB tuples:

```python
def hex_to_rgb(color: str) -> tuple[float, float, float]:
    value = color.lstrip("#")
    return tuple(int(value[i : i + 2], 16) / 255 for i in (0, 2, 4))
```

### Removed names

- `BOKEH` and `VEGA` string constants. Use the `Vendor` enum instead.
- `PaletteName` named tuple. Use `ParsedPaletteName`.
- `BOKEH_DOCS_PALETTE_DATA`, `BOKEH_DOCS_PALETTES`, `VEGA_DOCS_PALETTE_DATA`, and `VEGA_DOCS_PALETTES`.
- `BOKEH_CONTINUOUS_PALETTE_NAMES` and `VEGA_CONTINUOUS_PALETTE_NAMES`.
- `docs_palette` and `score_contrast`.

### New Python API

- `chrys.palettes.Vendor` (`StrEnum`) and `chrys.palettes.PALETTE_DATA`.
- `chrys.utils.get_palette`, `get_palette_colors`, `to_discrete_colors`, `to_continuous_colors`, `parse_color`, `parse_palette_name`, and `best_color_contrast`.
- `chrys.utils.ParsedPaletteName`, `PaletteMode` (`StrEnum`), and the type aliases `CssColor`, `CssColors`, `RgbColor`, `HexColor`, `HexColors`, `Palette`, and `QualifiedPaletteName`.
- `chrys.apca_w3`, a Python port of the APCA-W3 contrast algorithm.
- `chrys.exceptions.PaletteNotFoundError`, `VendorNotFoundError`, and `PaletteDataEmptyError`.
- `chrys.data.d3_palettes` and the `D3_*` constants.

All three exception classes subclass `ValueError`.

### Parsing palette names

```python
from chrys.palettes import VEGA_ACCENT
from chrys.utils import parse_palette_name

vendor, palette = parse_palette_name(VEGA_ACCENT)
# vendor is Vendor.VEGA; palette is "accent"
```

`vendor` is a `Vendor` enum member. It is a `StrEnum`, so tuple unpacking and comparisons with plain strings such as `"vega"` still work.

### Contrast selection

`best_color_contrast` uses the APCA algorithm. It accepts hexadecimal colours and absolute `rgb()`/`rgba()` colours; alpha is ignored. Relative colours, `calc()`, `var()`, and other colour functions are not supported. v5 fixes the argument order so the foreground colour is treated as the text colour, which is required by APCA. The selected colour can therefore differ from v4.

```python
from chrys.utils import best_color_contrast

color = best_color_contrast("rgb(255, 0, 0)", ["#000000", "#ffffff"])
```

An empty foreground list now raises `ValueError`, and an invalid colour raises `ValueError` with the message `Color "...": unknown format.`.

### Parsing colours

`parse_color` parses a hexadecimal or absolute `rgb()`/`rgba()` colour into 8-bit sRGB channels. Alpha is ignored. The same parser backs `best_color_contrast`.

```python
from chrys.utils import parse_color

parse_color("rgb(255, 0, 0)")
# (255.0, 0.0, 0.0)
```

## Sass and CSS

### `best-color-contrast`

The function uses the APCA algorithm. The APCA call order has been corrected to treat the foreground colour as the text colour, so results can differ from v4. Arguments are Sass colours, so both hexadecimal and `rgb()` values are accepted; quoted colour strings are not.

```scss
@use 'node_modules/chrys/src/css/functions' as chrys;

$color: chrys.best-color-contrast(rgb(255, 0, 0), (#000, #fff));
```

### Palette variables

The `$chrys-palettes` map is still available under `src/css/`. Existing Bokeh and Vega keys are unchanged. D3 palettes add new keys with the `d3-` prefix, for example `d3-accent` and `d3-viridis`.

### Compiled CSS

If you imported compiled CSS from `chrys/css/`, update the path to `chrys/dist/css/`. Sass source partials remain under `chrys/src/css/`.

## Palettes

### D3 vendor added

v5 adds the D3 colour schemes across JavaScript, Python, and Sass. Qualified names use the `d3_` prefix, for example `d3_accent` and `d3_viridis`.

See the [demo](https://netbek.github.io/chrys#colour-schemes) for the full list of D3 palettes.

### Documentation palettes removed

The demo-only documentation palettes are no longer part of the public API. If you used `docsPalette` or `docs_palette` to build legends or previews, use `getPaletteColors` with the desired colour count, or read the palette data directly.

## Error handling

| Error | Language | Thrown when |
| --- | --- | --- |
| `VendorNotFoundError` | JS / Python | The palette name has an unknown vendor prefix. |
| `PaletteNotFoundError` | JS / Python | The palette name is not recognised. |
| `PaletteDataEmptyError` | JS / Python | The palette exists but has no colour data. |
| `RangeError` | JS | A colour count is invalid or a discrete size is unsupported. |
| `ValueError` | Python | A colour count is invalid, a discrete size is unsupported, or the foreground list is empty. |

```js
import {PaletteNotFoundError, VendorNotFoundError} from 'chrys';
```

```python
from chrys.exceptions import PaletteNotFoundError, VendorNotFoundError
```

## Upgrade checklist

- Replace `chrys/umd` imports with `chrys`.
- Replace `discretePalette` with `getPaletteColors`.
- Replace `toDiscretePalette` with `toDiscreteColors`.
- Remove uses of `docsPalette`, `docs_palette`, and the `*_DOCS_*` data.
- Move Python utility imports from `chrys.palettes` to `chrys.utils`.
- Remove `as_rgb` arguments and convert hexadecimal colours to RGB yourself.
- Review contrast selections: APCA polarity is fixed, and JavaScript, Python, and Sass now use APCA only.
- Review continuous palette output, which now samples the 256-colour ramp.
- Update compiled CSS imports from `chrys/css/` to `chrys/dist/css/`.
- Replace `BOKEH` / `VEGA` constants with `Vendor` in Python or string literals in JavaScript.
- Check that any deep imports are listed in the package `exports` map.

## Links

- [Demo and usage docs](https://netbek.github.io/chrys)
