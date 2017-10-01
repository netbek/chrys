# chrys

A collection of Sass color palettes for mapping and visualisation.

## Demo

[netbek.github.io/chrys](https://netbek.github.io/chrys)

## Installation

```
npm install chrys
```

## Usage

See the [demo](https://netbek.github.io/chrys) for a list of palette names and sizes.

### Sass

```
@import 'node_modules/chrys/src/variables';

// Get the first color of the `colorblind` palette, size 3
$palette-name: 'colorblind';
$palette-size: 3;
$palette:      map-get(map-get($chrys-color-map, $palette-name), $palette-size);
$color:        nth($palette, 1);

div {
  background: $color;
}
```

## Maintenance

Download `https://raw.githubusercontent.com/bokeh/bokeh/0.12.4/bokehjs/src/coffee/api/palettes.ts` to `/src/data` and run `gulp`.

## Credit

Adapted from [Bokeh](http://bokeh.pydata.org/en/0.12.4/docs/reference/palettes.html). The respective licenses for all the palettes included are viewable as a comment at the top of the [bokeh/palettes.py](https://github.com/bokeh/bokeh/tree/0.12.4/bokeh/palettes.py) source file.

## License

Copyright (c) 2017 Hein Bekker. Licensed under the BSD 3-Clause License.
