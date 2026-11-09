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

  test('Should accept legacy rgb colors', () => {
    for (const color of [
      'rgb(255, 0, 0)',
      'rgba(255, 0, 0, 1)',
      'rgb(255, 0, 0, 0.5)',
      'rgb(100%, 0%, 0%)',
      'rgba(100%, 0%, 0%, 50%)'
    ]) {
      expect(bestColorContrast(color, ['#000', '#fff']), color).toEqual('#fff');
    }
  });

  test('Should accept modern rgb colors', () => {
    for (const color of [
      'rgb(255 0 0)',
      'rgb(100% 0% 0%)',
      'rgb(50% 0 0)',
      'rgb(255 0 0 / 0.5)',
      'rgb(255 0 0 / 50%)',
      'rgb(none none none / none)',
      ' RGB( 255\t0\n0 / 0.5 ) '
    ]) {
      expect(bestColorContrast(color, ['#000', '#fff']), color).toEqual('#fff');
    }
  });

  test('Should clamp channels and preserve fractional values', () => {
    expect(bestColorContrast(' #f00 ', ['#000', '#fff'])).toEqual('#fff');
    expect(bestColorContrast('rgb(300 -20 0)', ['#000', '#fff'])).toEqual(
      '#fff'
    );
    expect(bestColorContrast('rgb(300% -20% 0%)', ['#000', '#fff'])).toEqual(
      '#fff'
    );
    expect(bestColorContrast('rgb(127.5 0 0)', ['#000', '#fff'])).toEqual(
      '#fff'
    );
    expect(bestColorContrast('rgb(255 0 0 / 2)', ['#000', '#fff'])).toEqual(
      '#fff'
    );
    expect(bestColorContrast('rgb(255 0 0 / -1)', ['#000', '#fff'])).toEqual(
      '#fff'
    );
  });

  test('Should throw an error for unsupported rgb syntax', () => {
    for (const color of [
      'rgb(from red r g b)',
      'rgb(calc(255) 0 0)',
      'rgb(var(--r) 0 0)',
      'rgb(255, 0)',
      'rgb(255, 0, 0, 0.5, 1)',
      'rgb(255 0 0 0.5)',
      'rgb(255, 0, 0 / 0.5)',
      'rgb(255 0 0, 0.5)',
      'rgb(255, 0%, 0)',
      'rgb(none, 0, 0)',
      'rgb(255, 0, 0, none)',
      'rgb(255 0 0 /)',
      'rgb(255 0 0 / 0.5 / 1)',
      'rgb(255 0 0 / nope)',
      'rgb(255deg 0 0)',
      'rgb(255.0.0 0 0)',
      'rgb(255, nope, 0)',
      'rgb(255, 0, 0, nope)',
      'rgb(nope 0 0)',
      'rgb(255 0)',
      'hsl(0 100% 50%)',
      'rgb(255 0 0) garbage'
    ]) {
      expect(() => bestColorContrast('#f00', [color]), color).toThrow(
        /unknown format/
      );
    }
  });

  test('Should throw an error for invalid hex colors', () => {
    for (const color of [
      'ff0000',
      '#ff',
      '#fffff',
      '#fffffff',
      '#fffffffff',
      '#ggg'
    ]) {
      expect(() => bestColorContrast('#f00', [color]), color).toThrow(
        /unknown format/
      );
    }
  });

  test('Should throw an error for a non-string color', () => {
    expect(() => bestColorContrast(123 as unknown as string, ['#000'])).toThrow(
      /unknown format/
    );
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
