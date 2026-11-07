/** Raised when a palette vendor is not found. */
export class VendorNotFoundError extends Error {
  constructor(vendor: string) {
    super(`Vendor "${vendor}" not found.`);
    this.name = 'VendorNotFoundError';
  }
}

/** Raised when a palette name is not found. */
export class PaletteNotFoundError extends Error {
  constructor(name: string) {
    super(`Palette "${name}" not found.`);
    this.name = 'PaletteNotFoundError';
  }
}

/** Raised when a palette has no sizes. */
export class PaletteDataEmptyError extends Error {
  constructor(name: string) {
    super(`Palette data for "${name}" is empty.`);
    this.name = 'PaletteDataEmptyError';
  }
}
