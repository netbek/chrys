import {describe, expect, test} from 'vitest';
import bestColorContrast from '../best-color-contrast.ts';

describe('bestColorContrast', () => {
  test('Should choose white on red', () => {
    expect(bestColorContrast('#f00', ['#000', '#fff'])).toEqual('#fff');
  });

  test('Should return the first candidate when scores are equal', () => {
    expect(bestColorContrast('#fff', ['#000', '#000'])).toEqual('#000');
  });

  test('Should return the only candidate regardless of its contrast', () => {
    expect(bestColorContrast('#000', ['#010101'])).toEqual('#010101');
  });

  test('Should compare absolute APCA scores', () => {
    expect(bestColorContrast('#777', ['#fff', '#000'])).toEqual('#fff');
  });

  test('Should pass the foreground as the APCA text color', () => {
    expect(bestColorContrast('#2aabee', ['#000', '#fff'])).toEqual('#fff');
    expect(bestColorContrast('#cf9275', ['#000', '#fff'])).toEqual('#fff');
    expect(bestColorContrast('#31b57b', ['#000', '#fff'])).toEqual('#fff');
  });

  test('Should ignore alpha digits', () => {
    expect(bestColorContrast('#ff0000ff', ['#000000ff', '#ffffffff'])).toEqual(
      '#ffffffff'
    );
    expect(bestColorContrast('#f00f', ['#000f', '#ffff'])).toEqual('#ffff');
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
