import { getBrowserSupabase } from "./supabase/client";

const TABLE = "tattoo_taxonomy";

/** Style dropdown: `style_key` is the normalized map key; `style_name` is the DB label. */
export type TaxonomyStyleOption = {
  style_key: string;
  style_name: string;
};

/** Normalized map key: `trim().toLowerCase()` (spacing-insensitive, case-insensitive). */
export function normalizeTaxonomyStyleKey(
  name: string | null | undefined,
): string | null {
  if (name == null) return null;
  const k = String(name).trim().toLowerCase();
  return k.length > 0 ? k : null;
}

export type TattooTaxonomyRow = {
  styleName: string;
  idealStrokeMm: number;
  voltMin: number;
  voltMax: number;
  /** Display label for the lining-oriented technique option. */
  liningTechnique: string;
  /** Display label for the shading-oriented technique option. */
  shadingTechnique: string;
  /** Short “style note” for the quick-tip under selectors. */
  technicalFocus: string | null;
  /** Optional technical cartridge / needle string for Cartridge section. */
  idealNeedleRange: string | null;
};

type TaxonomyRowRaw = {
  style_name: string;
  ideal_stroke: number | string | null;
  volt_min: number | string | null;
  volt_max: number | string | null;
  lining_technique?: string | null;
  shading_technique?: string | null;
  technical_focus?: string | null;
  ideal_needle_range?: string | null;
};

function toNum(n: number | string | null | undefined): number | null {
  const v = Number(n);
  return Number.isFinite(v) ? v : null;
}

const FALLBACK_LINING = "Lining (primary pass)";
const FALLBACK_SHADING = "Shading (saturation)";

/** Temporary UI fallback when Supabase returns no usable rows (remove when DB is always populated). */
export function seedDummyTaxonomyRow(
  byStyleName: Map<string, TattooTaxonomyRow>,
): void {
  byStyleName.set("test", {
    styleName: "Test",
    idealStrokeMm: 3.5,
    voltMin: 5,
    voltMax: 9,
    liningTechnique: "Test Line",
    shadingTechnique: "Test Shade",
    technicalFocus:
      "Dummy taxonomy row for local UI — replace with live tattoo_taxonomy data.",
    idealNeedleRange: "#10 test grouping",
  });
}

function mapRow(row: TaxonomyRowRaw): TattooTaxonomyRow | null {
  const styleName = String(row.style_name ?? "").trim();
  const ideal = toNum(row.ideal_stroke);
  const vmin = toNum(row.volt_min);
  const vmax = toNum(row.volt_max);
  if (!styleName || ideal == null || vmin == null || vmax == null) return null;
  if (vmax < vmin) return null;
  const lining = String(row.lining_technique ?? "").trim() || FALLBACK_LINING;
  const shading = String(row.shading_technique ?? "").trim() || FALLBACK_SHADING;
  const tf = String(row.technical_focus ?? "").trim();
  const needle = String(row.ideal_needle_range ?? "").trim();
  return {
    styleName,
    idealStrokeMm: ideal,
    voltMin: vmin,
    voltMax: vmax,
    liningTechnique: lining,
    shadingTechnique: shading,
    technicalFocus: tf.length > 0 ? tf : null,
    idealNeedleRange: needle.length > 0 ? needle : null,
  };
}

export type FetchTattooTaxonomyResult =
  | { ok: true; byStyleName: Map<string, TattooTaxonomyRow> }
  | { ok: false; error: string };

/**
 * Loads rows from `public.tattoo_taxonomy` (ideal_stroke, volt_min, volt_max).
 * Keys in the map are `style_name.trim().toLowerCase()` (normalized).
 */
export async function fetchTattooTaxonomy(): Promise<FetchTattooTaxonomyResult> {
  const supabase = getBrowserSupabase();
  if (!supabase) {
    return {
      ok: false,
      error:
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env",
    };
  }

  const response = await supabase
    .from(TABLE)
    .select("*")
    .order("style_name", { ascending: true });

  console.log("Raw Supabase Response:", response);

  const { data, error } = response;

  if (error) {
    console.error("Supabase Error Details:", error);
    return { ok: false, error: error.message };
  }

  // Legacy debug line — prefer Raw Supabase Response above
  console.log("Supabase tattoo_taxonomy data[]:", data);

  const rawRows = (data ?? []) as TaxonomyRowRaw[];

  const byStyleName = new Map<string, TattooTaxonomyRow>();
  if (rawRows.length === 0) {
    console.warn(
      "tattoo_taxonomy: empty array — seeding dummy style so the UI can load.",
    );
    seedDummyTaxonomyRow(byStyleName);
    return { ok: true, byStyleName };
  }

  for (const raw of rawRows) {
    const mapped = mapRow(raw);
    if (!mapped) continue;
    const key = String(raw.style_name ?? "").trim().toLowerCase();
    if (!key) continue;
    byStyleName.set(key, mapped);
  }

  if (byStyleName.size === 0) {
    console.warn(
      "tattoo_taxonomy: no parsable rows (check ideal_stroke, volt_min, volt_max) — seeding dummy style.",
    );
    seedDummyTaxonomyRow(byStyleName);
  }

  return { ok: true, byStyleName };
}

export function getTaxonomyForStyleName(
  map: ReadonlyMap<string, TattooTaxonomyRow>,
  styleName: string | null | undefined,
): TattooTaxonomyRow | null {
  const k = normalizeTaxonomyStyleKey(styleName);
  if (!k) return null;
  return map.get(k) ?? null;
}
