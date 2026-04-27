/**
 * Lowercase kebab-case key for engine style maps.
 * Example: `"American Traditional"` → `"american-traditional"`.
 */
export function engineStyleLookupKey(styleName: string): string {
  return styleName
    .trim()
    .toLowerCase()
    .replace(/\s*&\s*/g, "-and-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
