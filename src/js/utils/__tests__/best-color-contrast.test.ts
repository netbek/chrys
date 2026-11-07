import {describe, expect, test} from 'vitest';
import bestColorContrast from '../best-color-contrast.ts';

describe('bestColorContrast', () => {
  test('Should choose white on red with the default APCA algorithm', () => {
    expect(bestColorContrast('#f00', ['#000', '#fff'])).toEqual('#fff');
  });

  test('Should choose white on red with the explicit APCA algorithm', () => {
    expect(bestColorContrast('#f00', ['#000', '#fff'], 'apca')).toEqual('#fff');
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

  test('Should return the only candidate regardless of its contrast', () => {
    expect(bestColorContrast('#000', ['#010101'])).toEqual('#010101');
  });

  test('Should compare absolute APCA scores, which can differ from WCAG', () => {
    expect(bestColorContrast('#777', ['#fff', '#000'])).toEqual('#fff');
    expect(bestColorContrast('#777', ['#fff', '#000'], 'wcag')).toEqual('#000');
  });

  test('Should pass the foreground as the APCA text color', () => {
    expect(bestColorContrast('#2aabee', ['#000', '#fff'])).toEqual('#fff');
    expect(bestColorContrast('#cf9275', ['#000', '#fff'])).toEqual('#fff');
    expect(bestColorContrast('#31b57b', ['#000', '#fff'])).toEqual('#fff');
  });

  test('Should throw an error when no foreground colors are provided', () => {
    expect(() => bestColorContrast('#f00', [])).toThrow(
      'At least one foreground color is required.'
    );
  });

  test('Should throw an error for an invalid background color', () => {
    expect(() => bestColorContrast('not-a-color', ['#000'])).toThrow(
      /unknown format/
    );
  });

  test('Should throw an error for an invalid foreground color', () => {
    expect(() => bestColorContrast('#f00', ['not-a-color'])).toThrow(
      /unknown format/
    );
  });
});
