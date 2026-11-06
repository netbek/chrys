# chrys

A collection of color palettes for visualisation in JavaScript, Python and Sass.

## Demo

[netbek.github.io/chrys](https://netbek.github.io/chrys#colour-schemes)

## Installation

### Node.js and Sass

```shell
npm install chrys
```

### Python 3.13 and up

```shell
pip install chrys
```

## Usage

For instructions, refer to [the docs](https://netbek.github.io/chrys#usage).

## Development: Installation

1. Clone the repo:

    ```shell
    git clone git@github.com:netbek/chrys.git
    ```

2. Install Mise and add activation to `~/.bashrc`, e.g.

    ```shell
    curl -fsSL https://github.com/jdx/mise/releases/download/v2026.7.13/install.sh | sh
    ```

    See [other installation methods](https://mise.en.dev/installing-mise.html).

3. Trust `mise.toml`:

    ```shell
    mise trust
    ```

4. Create a [PyPI API token](https://pypi.org/manage/account/#api-tokens), and add the token to the system keyring as the password:

    ```shell
    keyring set pypi-chrys __token__
    ```

## Development: Usage

Patch Node dependencies to fix ESM imports:

```shell
npx patch-package @bokeh/bokehjs --exclude 'nothing'
npx patch-package vega-scale --exclude 'nothing'
```

Build the palette data:

```shell
make build-data
```

Build and publish the JavaScript and Python distribution packages:

```shell
make bump-version [major|minor|patch]
git push
make build-dist
make create-release
make publish
```

## Credit

Palettes from:

- [Bokeh](https://github.com/bokeh/bokeh) — Copyright (c) 2012-2022 Anaconda, Inc., and Bokeh Contributors ([BSD 3-Clause](https://github.com/bokeh/bokeh/blob/2.4.3/LICENSE.txt))
- [D3](https://github.com/d3/d3-scale-chromatic) — D3: Copyright (c) 2010-2026 Mike Bostock; ColorBrewer: Copyright 2002 Cynthia Brewer, Mark Harrower, and The Pennsylvania State University ([ISC; ColorBrewer palettes Apache 2.0](https://github.com/d3/d3-scale-chromatic/blob/v3.1.1/LICENSE))
- [Vega](https://github.com/vega/vega) — Copyright (c) 2015-2023 University of Washington Interactive Data Lab ([BSD 3-Clause](https://github.com/vega/vega/blob/v5.33.1/LICENSE))

WCAG and APCA contrast algorithms from:

- [Chroma.js](https://github.com/gka/chroma.js) — Copyright (c) 2011-2025 Gregor Aisch ([BSD 3-Clause](https://github.com/gka/chroma.js/blob/v3.2.0/LICENSE))

## License

Copyright (c) 2017 Hein Bekker. Licensed under the BSD 3-Clause License.
