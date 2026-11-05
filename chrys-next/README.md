# chrys-next

A collection of color palettes for visualisation in JavaScript, Python and Sass.

## Installation

```shell
npm install chrys-next
```

The ES and CommonJS builds treat [`chroma-js`](https://github.com/gka/chroma.js)
as an external dependency, so it is installed automatically. The UMD build
bundles `chroma-js` and has no separate dependency.

## Quick start

```js
import {bestColorContrast, discretePalette, VEGA_VIRIDIS} from 'chrys-next';

const colors = discretePalette(VEGA_VIRIDIS, 5);
const textColor = bestColorContrast('#ffffff', ['#000000', '#ffffff']);
```

## Build formats

`chrys-next` ships ES module, CommonJS and UMD builds. Each build includes
TypeScript declarations for the ES and CommonJS entry points.

### ES modules

```js
import {
  bestColorContrast,
  discretePalette,
  docsPalette,
  toDiscretePalette,
  VEGA_ACCENT
} from 'chrys-next';

console.log(discretePalette(VEGA_ACCENT, 4));
```

The ES build lives in `dist/es`, is marked with `"type": "module"`, preserves
the source module structure and is tree-shakeable (`"sideEffects": false`).

### CommonJS

```js
const {
  bestColorContrast,
  discretePalette,
  toDiscretePalette,
  VEGA_ACCENT
} = require('chrys-next');

console.log(discretePalette(VEGA_ACCENT, 4));
```

The CommonJS build lives in `dist/cjs` and is marked with
`"type": "commonjs"`.

### UMD

The UMD build exposes the library as the global `chrys` and bundles
`chroma-js`, so it can be loaded directly in a browser:

```html
<script src="https://unpkg.com/chrys-next/dist/umd/index.min.js"></script>
<script>
  const colors = chrys.discretePalette(chrys.VEGA_VIRIDIS, 5);
  const textColor = chrys.bestColorContrast('#ffffff', ['#000000', '#ffffff']);

  console.log(colors, textColor);
</script>
```

Two files are provided:

- `dist/umd/index.js` — unminified
- `dist/umd/index.min.js` — minified, and the target of the `unpkg` and
  `jsdelivr` package fields

When using a bundler, prefer the ES or CommonJS builds.

### Subpath imports

Individual entry points are available through the package `exports` map:

```js
import {bestColorContrast} from 'chrys-next/best-color-contrast';
import {toDiscretePalette} from 'chrys-next/core';
import * as bokeh from 'chrys-next/bokeh';
import * as vega from 'chrys-next/vega';
import {VEGA_ACCENT, VEGA_ACCENT_PALETTE_DATA} from 'chrys-next/palettes/vega/accent';
```

The `core` entry point exposes `toDiscretePalette` without loading any palette
data, which is useful when you only need to sample your own palettes. The
`best-color-contrast` entry point exposes `bestColorContrast` on its own.

## API

### `discretePalette(name, n = 6)`

Returns `n` colours from the palette identified by `name`.

```js
import {discretePalette, BOKEH_ACCENT} from 'chrys-next';

discretePalette(BOKEH_ACCENT); // 6 colours
discretePalette(BOKEH_ACCENT, 8); // 8 colours
```

Throws if the palette name is not recognised or the requested size is
unsupported. See [Discrete palette sizing](#discrete-palette-sizing) for the
exact sizing rules.

### `docsPalette(name)`

Returns a copy of the palette's documentation colours. Modifying the returned
array does not affect the shared palette data.

```js
import {docsPalette, VEGA_VIRIDIS} from 'chrys-next';

docsPalette(VEGA_VIRIDIS);
```

### `toDiscretePalette(palette, n = 6)`

Converts a palette object, mapping sizes to colour arrays, into a discrete
palette of at most `n` colours.

```js
import {toDiscretePalette} from 'chrys-next';

toDiscretePalette(
  {
    1: ['#000000'],
    2: ['#000000', '#ffffff']
  },
  2
); // ['#000000', '#ffffff']
```

This function does not depend on any bundled palette data, so it can be
imported from `chrys-next/core`.

### `bestColorContrast(bgColor, fgColors, algorithm = 'apca')`

Returns the foreground colour with the highest contrast against `bgColor`.

```js
import {bestColorContrast} from 'chrys-next';

bestColorContrast('#ff0000', ['#000000', '#ffffff']); // '#ffffff'
bestColorContrast('#ff0000', ['#000000', '#ffffff'], 'wcag');
```

Supported algorithms:

- `'apca'` (default) — APCA contrast
- `'wcag'` — WCAG 2 contrast ratio

### `parsePaletteName(name)`

Parses a palette name into its vendor and vendor-specific palette name.

```js
import {parsePaletteName, VEGA_ACCENT} from 'chrys-next';

parsePaletteName(VEGA_ACCENT); // {vendor: 'vega', palette: 'accent'}
```

Throws if the palette name is not recognised.

### Constants and palette data

The main entry point exports:

- `BOKEH` and `VEGA` — vendor identifiers
- Palette name constants such as `BOKEH_ACCENT`, `BOKEH_CATEGORY_10`,
  `VEGA_ACCENT`, `VEGA_VIRIDIS`
- `BOKEH_PALETTE_DATA` and `VEGA_PALETTE_DATA` — palette sizes mapped to
  colour arrays
- `BOKEH_DOCS_PALETTE_DATA` and `VEGA_DOCS_PALETTE_DATA` — documentation
  colours
- `BOKEH_PALETTES` and `VEGA_PALETTES` — palettes keyed by vendor-specific name
- `BOKEH_DOCS_PALETTES` and `VEGA_DOCS_PALETTES` — documentation palettes keyed
  by vendor-specific name
- `BOKEH_PALETTE_NAMES` and `VEGA_PALETTE_NAMES` — palette constants mapped to
  their full names
- `CATEGORICAL_PALETTE_VENDORS`, `DIVERGING_PALETTE_VENDORS`,
  `SEQUENTIAL_PALETTE_VENDORS` and `CYCLICAL_PALETTE_VENDORS` — palette
  groupings that pair the same logical palette across vendors

## Palette names

Palette names use the form `vendor_PaletteName`, for example:

- `bokeh_Accent`
- `bokeh_Category10`
- `vega_Viridis`
- `vega_Tableau10`

Use the exported name constants rather than string literals where possible.

## Discrete palette sizing

`discretePalette` and `toDiscretePalette` follow the same rules:

- `n` must be a non-negative integer; otherwise a `RangeError` is thrown.
- `n === 0` returns an empty array.
- If `n` is less than or equal to the smallest supported size, the smallest
  palette is sliced to `n` colours.
- If `n` matches a supported size exactly, that palette is returned (sliced to
  `n`).
- If `n` is greater than the largest supported size, the largest palette is
  returned.
- If `n` falls between supported sizes and no exact palette exists, a
  `RangeError` is thrown.

For example, `vega_Viridis` supports sizes `1`–`9` and `256`, so
`discretePalette(VEGA_VIRIDIS, 20)` throws, while
`discretePalette(VEGA_VIRIDIS, 300)` returns the 256-colour palette.

## Development

```shell
npm run dev        # generate palettes and start Vite
npm test           # generate palettes and run Vitest
npm run lint       # lint with oxlint
npm run build      # build ES, CJS and UMD outputs and type declarations
```

## Credit

Palettes from:

- [Bokeh](https://github.com/bokeh/bokeh) (BSD 3-Clause)
- [Vega](https://github.com/vega/vega) (BSD 3-Clause)

## License

Copyright (c) 2017 Hein Bekker. Licensed under the BSD 3-Clause License.
