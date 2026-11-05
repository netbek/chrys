import {describe, expect, test} from 'vitest';
import {
  D3_ACCENT,
  D3_BLUES,
  D3_VIRIDIS,
  discretePalette,
  docsPalette
} from '..';

describe('d3 palettes', () => {
  test('Should generate a discrete d3 palette', () => {
    expect(discretePalette(D3_BLUES, 6)).toEqual([
      '#eff3ff',
      '#c6dbef',
      '#9ecae1',
      '#6baed6',
      '#3182bd',
      '#08519c'
    ]);
  });

  test('Should return a d3 documentation palette', () => {
    expect(docsPalette(D3_ACCENT)).toHaveLength(8);
  });

  test('Should clamp a large d3 palette request to 256 colors', () => {
    expect(discretePalette(D3_VIRIDIS, 300)).toHaveLength(256);
  });
});
