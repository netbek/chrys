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

  test('Should select the best APCA color', () => {
    const css = compile(`
      @use 'src/css/functions';
      .probe {
        color: functions.best-color-contrast(#777, (#fff, #000));
      }
    `);

    expect(css).toContain('color: #fff');
  });

  test('Should use the default foreground colors', () => {
    const css = compile(`
      @use 'src/css/functions';
      .probe {
        color: functions.best-color-contrast(#f00);
      }
    `);

    expect(css).toContain('color: #fff');
  });

  test('Should reject an algorithm argument', () => {
    expect(() =>
      compile(`
        @use 'src/css/functions';
        .probe {
          color: functions.best-color-contrast(#f00, (#000, #fff), 'wcag');
        }
      `)
    ).toThrow(/Only 2 arguments allowed/);
  });
});
