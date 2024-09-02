import { randomBytes } from "node:crypto";

/**
 * The "randomBytes" function from crypto only takes a byte length and not a string length,
 * so this factor is needed to convert the string length to byte amount necessary.
 */
const bytesNeededForBase64EncodingConversionRatio = 0.75;

/**
 * Generates a random modified base-64 string with the given length.
 * Utilizes "crypto" under the hood for the randomness generation.
 *
 * The modifications make the generated string URL friendly by replacing the
 * characters that might need encoding ("+" and "/") with characters that don't ("-" and "_").
 * @see https://www.youtube.com/watch?v=gocwRvLhDf8
 * @param length The length of the string to generate.
 * @returns The random base-64 string.
 */
export function randomUrlSafeBase64String(length: number): string {
  const base64String = randomBase64String(length);
  return base64ToUrlSafe(base64String);
}

/**
 * Converts a base-64 string into a URL-safe base-64 string by replacing unsafe characters "+" and "/" with "-" and "_".
 * @param base64String The base-64 string.
 * @returns The URL-safe base-64 string.
 */
function base64ToUrlSafe(base64String: string): string {
  return base64String.replaceAll("+", "-").replaceAll("/", "_");
}

/**
 * Generates a random base-64 string with the given length.
 * Utilizes "crypto" under the hood for the randomness generation.
 * @param length The length of the string to generate.
 * @returns The random base-64 string.
 */
function randomBase64String(length: number): string {
  const bytes = lengthToBytes(length);
  return randomBytes(bytes).toString("base64").slice(0, length);
}

/**
 * Converts a given length to an amount of bytes needed to pass to randomBytes to generate the required length of string.
 * @param length The string length.
 * @returns The amount of bytes needed to generate the string length.
 */
function lengthToBytes(length: number): number {
  return Math.ceil(length * bytesNeededForBase64EncodingConversionRatio);
}
