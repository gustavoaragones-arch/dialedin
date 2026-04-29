import { getBrowserSupabase } from "./supabase/client";

const TABLE = "tattoo_taxonomy";

export type TaxonomyLocale = "en" | "es" | "pt";

export function normalizeTaxonomyFetchLocale(
  locale: string | undefined,
): TaxonomyLocale {
  if (locale === "es" || locale === "pt") return locale;
  return "en";
}

/** Style dropdown: `style_key` is the normalized map key; `style_name` is the visible label (may be localized). */
export type TaxonomyStyleOption = {
  style_key: string;
  style_name: string;
};

export type TattooTaxonomyRow = {
  /** Canonical English `style_name` from DB (map key + engine). */
  styleName: string;
  /** Dropdown / UI label; localized when DB columns exist. */
  styleDisplayName: string;
  idealStrokeMm: number;
  voltMin: number;
  voltMax: number;
  liningTechnique: string;
  shadingTechnique: string;
  technicalFocus: string | null;
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
  style_name_es?: string | null;
  style_name_pt?: string | null;
  technical_focus_es?: string | null;
  technical_focus_pt?: string | null;
  lining_technique_es?: string | null;
  lining_technique_pt?: string | null;
  shading_technique_es?: string | null;
  shading_technique_pt?: string | null;
  ideal_needle_range_es?: string | null;
  ideal_needle_range_pt?: string | null;
};

function toNum(n: number | string | null | undefined): number | null {
  const v = Number(n);
  return Number.isFinite(v) ? v : null;
}

const FALLBACK_LINING = "Lining (primary pass)";
const FALLBACK_SHADING = "Shading (saturation)";

function pickLocalized(
  locale: TaxonomyLocale,
  row: TaxonomyRowRaw,
  english: string | null | undefined,
  esVal: string | null | undefined,
  ptVal: string | null | undefined,
): string {
  const base = String(english ?? "").trim();
  if (locale === "en") return base;
  const loc = locale === "es" ? esVal : ptVal;
  const s = String(loc ?? "").trim();
  return s.length > 0 ? s : base;
}

/** Temporary UI fallback when Supabase returns no usable rows (remove when DB is always populated). */
export function seedDummyTaxonomyRow(
  byStyleName: Map<string, TattooTaxonomyRow>,
): void {
  byStyleName.set("test", {
    styleName: "Test",
    styleDisplayName: "Test",
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

function mapRow(
  row: TaxonomyRowRaw,
  locale: TaxonomyLocale,
): TattooTaxonomyRow | null {
  const styleName = String(row.style_name ?? "").trim();
  const styleDisplayName = pickLocalized(
    locale,
    row,
    styleName,
    row.style_name_es,
    row.style_name_pt,
  );
  const ideal = toNum(row.ideal_stroke);
  const vmin = toNum(row.volt_min);
  const vmax = toNum(row.volt_max);
  if (!styleName || ideal == null || vmin == null || vmax == null) return null;
  if (vmax < vmin) return null;

  const liningBase = String(row.lining_technique ?? "").trim() || FALLBACK_LINING;
  const shadingBase = String(row.shading_technique ?? "").trim() || FALLBACK_SHADING;
  const lining = pickLocalized(
    locale,
    row,
    liningBase,
    row.lining_technique_es,
    row.lining_technique_pt,
  );
  const shading = pickLocalized(
    locale,
    row,
    shadingBase,
    row.shading_technique_es,
    row.shading_technique_pt,
  );

  const tfBase = String(row.technical_focus ?? "").trim();
  const tf = pickLocalized(
    locale,
    row,
    tfBase,
    row.technical_focus_es,
    row.technical_focus_pt,
  );

  const needleBase = String(row.ideal_needle_range ?? "").trim();
  const needle = pickLocalized(
    locale,
    row,
    needleBase,
    row.ideal_needle_range_es,
    row.ideal_needle_range_pt,
  );

  return {
    styleName,
    styleDisplayName: styleDisplayName || styleName,
    idealStrokeMm: ideal,
    voltMin: vmin,
    voltMax: vmax,
    liningTechnique: lining || liningBase,
    shadingTechnique: shading || shadingBase,
    technicalFocus: tf.length > 0 ? tf : null,
    idealNeedleRange: needle.length > 0 ? needle : null,
  };
}

export type FetchTattooTaxonomyResult =
  | { ok: true; byStyleName: Map<string, TattooTaxonomyRow> }
  | { ok: false; error: string };

/**
 * Loads rows from `public.tattoo_taxonomy`.
 * Map keys are always `normalizeTaxonomyStyleKey(style_name)` (English column).
 * Display strings use `style_name_es` / `style_name_pt` (etc.) when present for `locale`.
 */
export async function fetchTattooTaxonomy(
  locale: string | undefined,
): Promise<FetchTattooTaxonomyResult> {
  const loc = normalizeTaxonomyFetchLocale(locale);
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
    const mapped = mapRow(raw, loc);
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

export function normalizeTaxonomyStyleKey(
  name: string | null | undefined,
): string | null {
  if (name == null) return null;
  const k = String(name).trim().toLowerCase();
  return k.length > 0 ? k : null;
}

export function getTaxonomyForStyleName(
  map: ReadonlyMap<string, TattooTaxonomyRow>,
  styleName: string | null | undefined,
): TattooTaxonomyRow | null {
  const k = normalizeTaxonomyStyleKey(styleName);
  if (!k) return null;
  return map.get(k) ?? null;
}
