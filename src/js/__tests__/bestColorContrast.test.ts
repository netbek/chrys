import {describe, expect, test} from 'vitest';
import {bestColorContrast} from '../bestColorContrast.ts';

describe('bestColorContrast', () => {
  test('Should choose white on red with the default APCA algorithm', () => {
    expect(bestColorContrast('#f00', ['#000', '#fff'])).toEqual('#fff');
  });

  test('Should choose black on red with the WCAG algorithm', () => {
    expect(bestColorContrast('#f00', ['#000', '#fff'], 'wcag')).toEqual('#000');
  });

  test('Should fall back to the WCAG algorithm for an unknown algorithm', () => {
    expect(bestColorContrast('#f00', ['#000', '#fff'], 'unknown')).toEqual(
      '#000'
    );
  });

  test('Should return the first candidate when scores are equal', () => {
    expect(bestColorContrast('#fff', ['#000', '#000'])).toEqual('#000');
  });
});
