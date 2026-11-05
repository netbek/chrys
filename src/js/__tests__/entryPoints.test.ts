import {describe, expect, test} from 'vitest';
import {bestColorContrast} from '../bestColorContrast.js';
import {toDiscretePalette} from '../toDiscretePalette.js';

describe('entry points', () => {
  test('Should expose bestColorContrast', () => {
    expect(bestColorContrast('#f00', ['#000', '#fff'])).toEqual('#fff');
  });

  test('Should expose toDiscretePalette without palette data', () => {
    expect(
      toDiscretePalette({
        1: ['#000000'],
        2: ['#000000', '#ffffff']
      })
    ).toEqual(['#000000', '#ffffff']);
  });
});
