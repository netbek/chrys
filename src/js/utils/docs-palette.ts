import getDocsPalette from './get-docs-palette.ts';

/**
 * Gets the documentation palette by name.
 *
 * @param name Palette name.
 * @returns A copy of the documentation palette colors.
 * @throws If the palette name is not recognized or its data is missing.
 */
export default function docsPalette(name: string): string[] {
  return [...getDocsPalette(name)];
}
