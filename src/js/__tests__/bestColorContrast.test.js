import {describe, expect, test} from 'vitest';
import {bestColorContrast} from '../bestColorContrast.js';

describe('bestColorContrast', () => {
  test('Should choose black on red', () => {
    expect(bestColorContrast('#f00', ['#000', '#fff'])).toEqual('#000');
  });
});
