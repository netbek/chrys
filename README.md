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
make build-dist-and-commit
git push
make create-release
make publish
```

## Credit

Palettes from:

* [Bokeh](https://github.com/bokeh/bokeh) (BSD 3-Clause)
* [Vega](https://github.com/vega/vega) (BSD 3-Clause)

## License

Copyright (c) 2017 Hein Bekker. Licensed under the BSD 3-Clause License.
