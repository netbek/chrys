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

describe('best-color-contrast', () => {
  test('Should pass the foreground as the APCA text color', () => {
    for (const background of ['#2aabee', '#cf9275', '#31b57b']) {
      const css = compile(`
        @use 'src/css/functions';
        .probe {
          color: functions.best-color-contrast(${background}, (#000, #fff));
        }
      `);

      expect(css, background).toContain('color: #fff');
    }
  });

  test('Should use WCAG when requested', () => {
    const css = compile(`
      @use 'src/css/functions';
      .probe {
        color: functions.best-color-contrast(#f00, (#000, #fff), 'wcag');
      }
    `);

    expect(css).toContain('color: #000');
  });

  test('Should select the algorithm-specific best color', () => {
    const apca = compile(`
      @use 'src/css/functions';
      .probe {
        color: functions.best-color-contrast(#777, (#fff, #000));
      }
    `);
    const wcag = compile(`
      @use 'src/css/functions';
      .probe {
        color: functions.best-color-contrast(#777, (#fff, #000), 'wcag');
      }
    `);

    expect(apca).toContain('color: #fff');
    expect(wcag).toContain('color: #000');
  });

  test('Should fall back to WCAG for an unknown algorithm', () => {
    const css = compile(`
      @use 'src/css/functions';
      .probe {
        color: functions.best-color-contrast(#f00, (#000, #fff), 'unknown');
      }
    `);

    expect(css).toContain('color: #000');
  });
});

describe('wcag.contrast', () => {
  test('Should calculate the WCAG contrast ratio', () => {
    const css = compile(`
      @use 'src/css/wcag';
      .probe {
        value: wcag.contrast(#000, #fff);
      }
    `);

    expect(css).toContain('value: 21');
  });
});
