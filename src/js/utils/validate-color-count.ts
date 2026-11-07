/**
 * Validates that a color count is a non-negative integer.
 *
 * @param n Color count.
 * @throws {RangeError} If `n` is not an integer or is negative.
 */
export function validateColorCount(n: number): void {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`Color count must be a non-negative integer, got ${n}.`);
  }
}
