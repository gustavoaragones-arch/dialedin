import { engineStyleLookupKey } from "./engineStyleKey";

/**
 * Maps taxonomy (style + lining/shading slot) to an internal engine technique
 * name that exists in `dialedInEngine`’s TECHNIQUE_TABLE.
 */
const DEFAULT_LINING = "Fine Line Passes";
const DEFAULT_SHADING = "Soft Shading";

type Slot = "lining" | "shading";

/** Keys are `engineStyleLookupKey(style_name)` from the DB. */
const MAP: Record<string, Record<Slot, string>> = {
  "fine-line": {
    lining: "Fine Line Passes",
    shading: "Soft Shading",
  },
  "black-and-grey-realism": {
    lining: "Fine Line Passes",
    shading: "Black & Grey Realism",
  },
  "soft-portrait": {
    lining: "Fine Line Passes",
    shading: "Soft Shading",
  },
  "american-traditional": {
    lining: "Fine Line Passes",
    shading: "Whip Shading",
  },
  /** Dummy taxonomy style (local fallback). */
  test: {
    lining: "Fine Line Passes",
    shading: "Soft Shading",
  },
};

/**
 * Resolves a stable `technique` string for the physics engine.
 * Style names are matched case-insensitively via kebab-case keys.
 */
export function engineTechniqueNameForSelection(
  styleName: string,
  slot: Slot,
): string {
  const key = engineStyleLookupKey(styleName);
  const row = MAP[key];
  if (row) {
    return row[slot] ?? (slot === "lining" ? DEFAULT_LINING : DEFAULT_SHADING);
  }
  return slot === "lining" ? DEFAULT_LINING : DEFAULT_SHADING;
}
