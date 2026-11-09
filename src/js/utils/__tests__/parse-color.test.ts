import {describe, expect, test} from 'vitest';
import {parseColor} from '../parse-color.ts';

describe('parseColor', () => {
  test('Should parse hexadecimal colors', () => {
    for (const color of [
      '#f00',
      '#ff0000',
      '#f00f',
      '#ff000080',
      '#FF0000',
      ' #f00 '
    ]) {
      expect(parseColor(color), color).toEqual([255, 0, 0]);
    }
  });

  test('Should parse legacy rgb colors', () => {
    for (const color of [
      'rgb(255, 0, 0)',
      'rgba(255, 0, 0, 1)',
      'rgb(255, 0, 0, 0.5)',
      'rgb(100%, 0%, 0%)',
      'rgba(100%, 0%, 0%, 50%)'
    ]) {
      expect(parseColor(color), color).toEqual([255, 0, 0]);
    }
  });

  test('Should parse modern rgb colors', () => {
    for (const color of [
      'rgb(255 0 0)',
      'rgb(100% 0% 0%)',
      'rgb(255 0 0 / 0.5)',
      'rgb(255 0 0 / 50%)',
      ' RGB( 255\t0\n0 / 0.5 ) '
    ]) {
      expect(parseColor(color), color).toEqual([255, 0, 0]);
    }
  });

  test('Should parse mixed modern channels', () => {
    expect(parseColor('rgb(50% 0 0)')).toEqual([127.5, 0, 0]);
  });

  test('Should treat none as zero for modern channels', () => {
    expect(parseColor('rgb(none none none / none)')).toEqual([0, 0, 0]);
  });

  test('Should clamp channels', () => {
    expect(parseColor('rgb(300 -20 0)')).toEqual([255, 0, 0]);
    expect(parseColor('rgb(300% -20% 0%)')).toEqual([255, 0, 0]);
  });

  test('Should preserve fractional channels', () => {
    expect(parseColor('rgb(127.5 0 0)')).toEqual([127.5, 0, 0]);
  });

  test('Should clamp alpha values', () => {
    for (const color of [
      'rgb(255 0 0 / 2)',
      'rgb(255 0 0 / -1)',
      'rgb(255 0 0 / 200%)'
    ]) {
      expect(parseColor(color), color).toEqual([255, 0, 0]);
    }
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
      expect(() => parseColor(color), color).toThrow(/unknown format/);
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
      expect(() => parseColor(color), color).toThrow(/unknown format/);
    }
  });

  test('Should throw an error for a non-string color', () => {
    expect(() => parseColor(123 as unknown as string)).toThrow(
      /unknown format/
    );
  });
});
