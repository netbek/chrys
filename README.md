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

1. Install Nix:

    ```shell
    sh <(curl -L https://nixos.org/nix/install) --daemon
    ```

2. Configure Nix. Edit `/etc/nix/nix.conf` (for a multi-user installation) or `~/.config/nix/nix.conf` (for a single-user installation) to include the following lines:

    ```shell
    experimental-features = nix-command flakes
    trusted-users = root <USER>
    ```

    Replace `<USER>` with your username on your computer.

3. Install direnv:

    ```shell
    sudo apt install direnv
    ```

4. Enable direnv in your shell by adding a line to your shell configuration file.

    For Bash, edit `~/.bashrc`:

    ```shell
    eval "$(direnv hook bash)"
    ```

5. Allow `.envrc`:

    ```shell
    direnv allow
    ```

6. Create `.pypirc`:

    ```shell
    cp example.pypirc .pypirc
    ```

7. Enter a [PyPI API token](https://pypi.org/manage/account/#api-tokens) as the password in `.pypirc`.

## Development: Usage

Patch Node dependencies to fix ESM imports:

```shell
npx patch-package @bokeh/bokehjs --exclude 'nothing'
npx patch-package vega-scale --exclude 'nothing'
```

Build the palette data, JavaScript and Python distribution packages, Sass, CSS, Illustrator scripts:

```shell
npm run build-data
npm run build-dist
```

Publish the JavaScript and Python distribution packages:

```shell
npm run publish-dist
```

## Credit

Palettes from:

* [Bokeh](https://github.com/bokeh/bokeh) (BSD 3-Clause)
* [Vega](https://github.com/vega/vega) (BSD 3-Clause)

## License

Copyright (c) 2017 Hein Bekker. Licensed under the BSD 3-Clause License.
