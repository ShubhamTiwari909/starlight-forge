/** Return a new array with duplicate strings removed, preserving first occurrence order. */
export function uniqueStrings(values: readonly string[]): string[] {
  return [...new Set(values)];
}
