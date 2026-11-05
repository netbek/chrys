import {describe, expect, test} from 'vitest';
import {docsPalette, VEGA_ACCENT} from '..';

describe('docsPalette', () => {
  test('Should return a copy that does not mutate the shared data', () => {
    const palette = docsPalette(VEGA_ACCENT);
    const original = palette[0];

    palette[0] = '#000000';

    expect(docsPalette(VEGA_ACCENT)[0]).toEqual(original);
  });
});
