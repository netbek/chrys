import type {CssColor, RgbColor} from '../types.ts';

/** Matches #rgb, #rgba, #rrggbb, and #rrggbbaa. */
const HEX_COLOR = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

/** Matches the rgb() and rgba() functional notation. */
const RGB_COLOR = /^rgba?\((.*)\)$/is;

/** Matches a CSS number. */
const NUMBER = '[+-]?(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:e[+-]?\\d+)?';

const NUMBER_COLOR = new RegExp(`^${NUMBER}$`, 'i');
const PERCENTAGE_COLOR = new RegExp(`^${NUMBER}%$`, 'i');

type ChannelType = 'number' | 'percentage';

/** Clamps a value to the inclusive range. */
function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

/** Classifies a color channel token. */
function channelType(token: string): ChannelType | undefined {
  if (NUMBER_COLOR.test(token)) {
    return 'number';
  }

  if (PERCENTAGE_COLOR.test(token)) {
    return 'percentage';
  }

  return undefined;
}

/** Parses a color channel into an 8-bit sRGB value. */
function parseChannel(token: string, allowNone: boolean): number | undefined {
  if (allowNone && token.toLowerCase() === 'none') {
    return 0;
  }

  const type = channelType(token);

  if (type === 'number') {
    return clamp(Number(token), 0, 255);
  }

  if (type === 'percentage') {
    return clamp((Number(token.slice(0, -1)) / 100) * 255, 0, 255);
  }

  return undefined;
}

/** Parses an alpha channel. Alpha is validated but ignored by the caller. */
function parseAlpha(token: string, allowNone: boolean): number | undefined {
  if (allowNone && token.toLowerCase() === 'none') {
    return 1;
  }

  const type = channelType(token);

  if (type === 'number') {
    return clamp(Number(token), 0, 1);
  }

  if (type === 'percentage') {
    return clamp(Number(token.slice(0, -1)) / 100, 0, 1);
  }

  return undefined;
}

/** Parses a validated hexadecimal color into its 8-bit sRGB channels. */
function parseHexColor(color: string): RgbColor {
  let hex = color.slice(1);

  if (hex.length <= 4) {
    hex = hex
      .split('')
      .map((digit) => digit + digit)
      .join('');
  }

  return [
    Number.parseInt(hex.slice(0, 2), 16),
    Number.parseInt(hex.slice(2, 4), 16),
    Number.parseInt(hex.slice(4, 6), 16)
  ];
}

/** Parses the legacy comma-separated rgb() syntax. */
function parseLegacyRgb(body: string): RgbColor | undefined {
  const parts = body.split(',').map((part) => part.trim());

  if (parts.length !== 3 && parts.length !== 4) {
    return undefined;
  }

  const channels = parts.slice(0, 3);
  const type = channelType(channels[0]);

  if (
    type === undefined ||
    channels.some((channel) => channelType(channel) !== type)
  ) {
    return undefined;
  }

  const rgb = channels.map((channel) =>
    parseChannel(channel, false)
  ) as RgbColor;

  if (parts.length === 4 && parseAlpha(parts[3], false) === undefined) {
    return undefined;
  }

  return rgb;
}

/** Parses the modern space-separated rgb() syntax. */
function parseModernRgb(body: string): RgbColor | undefined {
  const parts = body.split('/');

  if (parts.length > 2) {
    return undefined;
  }

  const channels = parts[0].trim().split(/\s+/);

  if (channels.length !== 3) {
    return undefined;
  }

  const rgb = channels.map((channel) => parseChannel(channel, true));

  if (rgb.some((channel) => channel === undefined)) {
    return undefined;
  }

  if (parts.length === 2 && parseAlpha(parts[1].trim(), true) === undefined) {
    return undefined;
  }

  return rgb as RgbColor;
}

/** Parses an absolute rgb() or rgba() color. */
function parseRgbColor(color: string): RgbColor | undefined {
  const match = RGB_COLOR.exec(color);

  if (!match) {
    return undefined;
  }

  const body = match[1].trim();

  if (body.includes(',')) {
    return parseLegacyRgb(body);
  }

  return parseModernRgb(body);
}

/**
 * Parses a color into its 8-bit sRGB channels.
 *
 * Supports hexadecimal colors and absolute rgb()/rgba() colors. Relative
 * colors, calc(), var(), and other color functions are not supported.
 *
 * @throws {Error} When the color is not a supported color.
 */
export default function parseColor(color: CssColor): RgbColor {
  if (typeof color !== 'string') {
    throw new Error(`Color "${String(color)}": unknown format.`);
  }

  const value = color.trim();

  if (HEX_COLOR.test(value)) {
    return parseHexColor(value);
  }

  const rgb = parseRgbColor(value);

  if (rgb !== undefined) {
    return rgb;
  }

  throw new Error(`Color "${color}": unknown format.`);
}
