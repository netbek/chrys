import {describe, expect, test} from 'vitest';
import {toDiscretePalette} from '..';

describe('toDiscretePalette', () => {
  test('Should throw an error when the palette is empty', () => {
    expect(() => toDiscretePalette({})).toThrow('Palette is empty.');
  });
});
