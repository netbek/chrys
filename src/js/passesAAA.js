export function passesAAA(contrast, large = false) {
  if (large) {
    return contrast > 4.5;
  }
  return contrast > 7;
}
