import {describe, expect, test} from 'vitest';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as sass from 'sass-embedded';

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
);

/**
 * Compile a Sass source string with the repository root on the load path.
 *
 * @param {string} source Sass source.
 * @returns {string} Compiled CSS.
 */
function compile(source) {
  return sass.compileString(source, {loadPaths: [root]}).css;
}

/**
 * Compile a best-color-contrast call with the repository root on the load path.
 *
 * @param {string} args Function arguments as Sass source.
 * @returns {string} Compiled CSS.
 */
function compileContrast(args) {
  return compile(`
    @use 'src/css/functions';
    .probe {
      color: functions.best-color-contrast(${args});
    }
  `);
}

describe('best-color-contrast', () => {
  test('Should choose white on red', () => {
    expect(compileContrast('#f00, (#000, #fff)')).toContain('color: #fff');
  });

  test('Should support six-digit colors', () => {
    expect(compileContrast('#ff0000, (#000000, #ffffff)')).toContain(
      'color: #ffffff'
    );
  });

  test('Should return the first candidate when scores are equal', () => {
    expect(compileContrast('#fff, (#000, #000)')).toContain('color: #000');
  });

  test('Should return the only candidate regardless of its contrast', () => {
    expect(compileContrast('#000, (#010101)')).toContain('color: #010101');
  });

  test('Should compare absolute APCA scores', () => {
    expect(compileContrast('#777, (#fff, #000)')).toContain('color: #fff');
  });

  test('Should pass the foreground as the APCA text color', () => {
    for (const background of ['#2aabee', '#cf9275', '#31b57b']) {
      expect(
        compileContrast(`${background}, (#000, #fff)`),
        background
      ).toContain('color: #fff');
    }
  });

  test('Should ignore alpha digits', () => {
    expect(compileContrast('#ff0000ff, (#000000ff, #ffffffff)')).toContain(
      'color: white'
    );
    expect(compileContrast('#f00f, (#000f, #ffff)')).toContain('color: white');
  });

  test('Should support rgb colors', () => {
    for (const color of [
      'rgb(255, 0, 0)',
      'rgb(255 0 0)',
      'rgb(100% 0% 0%)',
      'rgba(255, 0, 0, 0.5)',
      'rgb(255 0 0 / 0.5)'
    ]) {
      expect(compileContrast(`${color}, (#000, #fff)`), color).toContain(
        'color: #fff'
      );
    }
  });

  test('Should use the default foreground colors', () => {
    expect(compileContrast('#f00')).toContain('color: #fff');
  });

  test('Should throw an error when no foreground colors are provided', () => {
    expect(() => compileContrast('#ffffff, ()')).toThrow(
      'At least one foreground color is required.'
    );
  });

  test('Should throw an error for an invalid background color', () => {
    expect(() => compileContrast('not-a-color, (#000)')).toThrow(
      /unknown format/
    );
  });

  test('Should throw an error for an invalid foreground color', () => {
    expect(() => compileContrast('#f00, (not-a-color)')).toThrow(
      /unknown format/
    );
  });

  test('Should throw an error when the hash is missing', () => {
    expect(() => compileContrast('ff0000, (#000)')).toThrow(/unknown format/);
  });

  test('Should throw an error for invalid hex lengths', () => {
    for (const color of ['#ff', '#fffff', '#fffffff', '#fffffffff']) {
      expect(() => compileContrast(`#f00, (${color})`), color).toThrow(
        /unknown format/
      );
    }
  });

  test('Should throw an error for invalid hex digits', () => {
    expect(() => compileContrast('#ggg, (#000)')).toThrow(/unknown format/);
  });

  test('Should throw an error for a non-string color', () => {
    expect(() => compileContrast('123, (#000)')).toThrow(/unknown format/);
  });
});
