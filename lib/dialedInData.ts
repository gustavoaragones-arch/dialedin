export type VoltRange = { min: number; max: number; baseline: number };

export type Machine = {
  id: string;
  brand: string;
  model: string;
  tier: 1 | 2;
  isAdjustableStroke: boolean;
  strokeOptionsMm: number[];
  defaultVoltRange: VoltRange;
};

export type StylePreset = {
  id: string;
  styleName: string;
  baseStrokeMm: number;
  /** Technical range only — no brand SKUs */
  idealNeedleRange: string;
  recommendedTechniqueId: string;
};

export type Technique = {
  id: string;
  name: string;
};

export const TECHNIQUES: Technique[] = [
  { id: "t-fine-line", name: "Fine Line Passes" },
  { id: "t-soft-shading", name: "Soft Shading" },
  { id: "t-whip", name: "Whip Shading" },
  { id: "t-realism", name: "Black & Grey Realism" },
];

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "s-fine-line",
    styleName: "Fine Line",
    baseStrokeMm: 3.2,
    idealNeedleRange:
      "#10 05-07 Round Liner; Open Liner 03-05 optional for bold hollow work",
    recommendedTechniqueId: "t-fine-line",
  },
  {
    id: "s-bng",
    styleName: "Black & Grey Realism",
    baseStrokeMm: 4.2,
    idealNeedleRange: "#10 09-15 Curved Magnum",
    recommendedTechniqueId: "t-realism",
  },
  {
    id: "s-soft-portrait",
    styleName: "Soft Portrait",
    baseStrokeMm: 3.5,
    idealNeedleRange: "#10 07-11 Curved Magnum",
    recommendedTechniqueId: "t-soft-shading",
  },
];

const EPS = 0.0001;

/** Max configured stroke (upper bound of machine capability). */
export function maxStrokeMm(machine: Machine | null): number {
  if (!machine || machine.strokeOptionsMm.length === 0) return 0;
  return Math.max(...machine.strokeOptionsMm);
}

/**
 * Active stroke for physics/engine: uses global `selectedStrokeMm` when it
 * matches an available option; otherwise falls back to the longest option.
 */
export function resolveActiveStrokeMm(
  machine: Machine | null,
  selectedStrokeMm: number | null,
): number {
  if (!machine || machine.strokeOptionsMm.length === 0) return 0;
  const opts = machine.strokeOptionsMm;
  if (selectedStrokeMm == null || !Number.isFinite(selectedStrokeMm)) {
    return Math.max(...opts);
  }
  const exact = opts.find((s) => Math.abs(s - selectedStrokeMm) < EPS);
  if (exact !== undefined) return exact;
  return opts.reduce((best, s) =>
    Math.abs(s - selectedStrokeMm) < Math.abs(best - selectedStrokeMm)
      ? s
      : best,
  );
}

/** Slider minimum (mm). */
export const NEEDLE_HANG_ABS_MIN_MM = 0.5;

/** When no machine is selected, cap hang at this value (mm). */
export const NEEDLE_HANG_FALLBACK_MAX_MM = 3.0;

/**
 * Max needle hang (mm) follows active stroke length: cannot exceed stroke.
 * No machine → conservative default cap.
 */
export function needleHangMaxMm(
  machine: Machine | null,
  selectedStrokeMm: number | null,
): number {
  if (!machine || machine.strokeOptionsMm.length === 0) {
    return NEEDLE_HANG_FALLBACK_MAX_MM;
  }
  const stroke = resolveActiveStrokeMm(machine, selectedStrokeMm);
  return stroke > 0 ? stroke : NEEDLE_HANG_FALLBACK_MAX_MM;
}

const LONG_STROKE_MM = 4.0;
const SOFT_SHADING_REDUCTION = 1.5;

export function computeVoltageOutput(
  machine: Machine | null,
  techniqueName: string | null,
  activeStrokeMm: number,
): {
  baselineVolts: number;
  adjustedVolts: number;
  voltDelta: number;
  longStrokeSoftShadingGuard: boolean;
  effectiveStrokeMm: number;
} | null {
  if (!machine || !techniqueName) return null;
  const stroke = activeStrokeMm;
  const baseline = machine.defaultVoltRange.baseline;
  const { min, max } = machine.defaultVoltRange;
  const isSoft = techniqueName.trim().toLowerCase() === "soft shading";
  const guard = stroke >= LONG_STROKE_MM && isSoft;
  const raw = guard ? baseline - SOFT_SHADING_REDUCTION : baseline;
  const adjusted = Math.min(Math.max(raw, min), max);
  return {
    baselineVolts: baseline,
    adjustedVolts: adjusted,
    voltDelta: adjusted - baseline,
    longStrokeSoftShadingGuard: guard,
    effectiveStrokeMm: stroke,
  };
}

export type FrequencySweetSpot = {
  /** Heuristic “supply / display” Hz band mapped from voltage. */
  hz: number;
  hzMin: number;
  hzMax: number;
  /** CPS from voltage: round((V × 1000) / 60). */
  cps_derived: number;
  cpsMin: number;
  cpsMax: number;
};

/** CPS gauge mapping from final operating voltage (after clamp). */
export function cyclesPerSecondFromVoltage(volts: number): number {
  return Math.round((volts * 1000) / 60);
}

export function cpsGaugeBandFromEnvelope(env: VoltRange): {
  cpsMin: number;
  cpsMax: number;
} {
  return {
    cpsMin: Math.round((env.min * 1000) / 60),
    cpsMax: Math.round((env.max * 1000) / 60),
  };
}

/** Maps operating voltage into Hz band + CPS derived from the same final volts. */
export function frequencySweetSpotFromVoltage(
  volts: number,
  envelope: VoltRange,
): FrequencySweetSpot {
  const span = envelope.max - envelope.min || 1;
  const t = Math.min(1, Math.max(0, (volts - envelope.min) / span));
  const hzMin = 85;
  const hzMax = 150;
  const hz = hzMin + t * (hzMax - hzMin);
  const { cpsMin, cpsMax } = cpsGaugeBandFromEnvelope(envelope);
  return {
    hz,
    hzMin,
    hzMax,
    cps_derived: cyclesPerSecondFromVoltage(volts),
    cpsMin,
    cpsMax,
  };
}

/** Hz sweet spot derived from envelope (display-only heuristic for UI gauges). */
export function hzSweetSpotFromVoltage(
  volts: number,
  machine: Machine | null,
): { hz: number; hzMin: number; hzMax: number } {
  if (!machine) return { hz: 100, hzMin: 80, hzMax: 140 };
  const f = frequencySweetSpotFromVoltage(volts, machine.defaultVoltRange);
  return { hz: f.hz, hzMin: f.hzMin, hzMax: f.hzMax };
}
