/**
 * Normalize input string to lowercase and trim whitespace
 * @param input - The string to normalize
 * @returns Normalized string
 */
export function normalize(input: string): string {
  return input.toLowerCase().trim();
}
