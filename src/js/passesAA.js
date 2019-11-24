export function passesAA(contrast, large = false) {
  if (large) {
    return contrast > 3;
  }
  return contrast > 4.5;
}
