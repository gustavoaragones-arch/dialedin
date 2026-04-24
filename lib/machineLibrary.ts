import type { Machine, VoltRange } from "./dialedInData";
import { getBrowserSupabase } from "./supabase/client";

/** Row shape: only columns we read from `public.machine_library` (+ id for keys). */
type MachineRow = {
  id: string;
  brand: string;
  model: string;
  stroke_options: number[] | null;
  default_volt_range: VoltRange | null;
  tier?: number | null;
  is_adjustable_stroke?: boolean | null;
};

function parseVoltRange(raw: unknown): VoltRange | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const min = Number(o.min);
  const max = Number(o.max);
  const baseline = Number(o.baseline);
  if (![min, max, baseline].every((n) => Number.isFinite(n))) return null;
  return { min, max, baseline };
}

export function mapMachineRow(row: MachineRow): Machine | null {
  const opts = Array.isArray(row.stroke_options)
    ? row.stroke_options.map(Number).filter((n) => Number.isFinite(n))
    : [];
  if (opts.length === 0) return null;
  const vr = parseVoltRange(row.default_volt_range);
  if (!vr) return null;

  const tier: 1 | 2 = row.tier === 2 ? 2 : 1;
  const isAdjustableStroke =
    typeof row.is_adjustable_stroke === "boolean"
      ? row.is_adjustable_stroke
      : opts.length > 1;

  return {
    id: row.id,
    brand: String(row.brand ?? "").trim() || "Unknown",
    model: String(row.model ?? "").trim() || "Unknown",
    tier,
    isAdjustableStroke,
    strokeOptionsMm: opts,
    defaultVoltRange: vr,
  };
}

export type FetchMachinesResult =
  | { ok: true; machines: Machine[] }
  | { ok: false; error: string };

const MACHINE_LIBRARY = "machine_library";

/**
 * Loads machines from `public.machine_library` (not `machines`).
 * Select list matches schema: brand, model, stroke_options, default_volt_range, plus id.
 */
export async function fetchMachineLibrary(): Promise<FetchMachinesResult> {
  const supabase = getBrowserSupabase();
  if (!supabase) {
    return {
      ok: false,
      error:
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env",
    };
  }

  const { data, error } = await supabase
    .from(MACHINE_LIBRARY)
    .select("id, brand, model, stroke_options, default_volt_range")
    .order("brand", { ascending: true })
    .order("model", { ascending: true });

  if (error) {
    return { ok: false, error: error.message };
  }

  const rows = (data ?? []) as MachineRow[];
  const machines: Machine[] = [];
  for (const row of rows) {
    const m = mapMachineRow(row);
    if (m) machines.push(m);
  }

  return { ok: true, machines };
}
