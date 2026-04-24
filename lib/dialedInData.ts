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

export const MACHINES: Machine[] = [
  {
    id: "m-1",
    brand: "Example Rotary",
    model: "Short Stroke Pack",
    tier: 1,
    isAdjustableStroke: false,
    strokeOptionsMm: [3.2],
    defaultVoltRange: { min: 5.5, max: 8.0, baseline: 6.8 },
  },
  {
    id: "m-2",
    brand: "Example Rotary",
    model: "Long Stroke Adjustable",
    tier: 2,
    isAdjustableStroke: true,
    strokeOptionsMm: [3.5, 4.0, 4.2],
    defaultVoltRange: { min: 5.0, max: 10.5, baseline: 7.5 },
  },
];

export function effectiveStrokeMm(machine: Machine | null): number {
  if (!machine || machine.strokeOptionsMm.length === 0) return 0;
  return Math.max(...machine.strokeOptionsMm);
}

const LONG_STROKE_MM = 4.0;
const SOFT_SHADING_REDUCTION = 1.5;

export function computeVoltageOutput(
  machine: Machine | null,
  techniqueName: string | null,
): {
  baselineVolts: number;
  adjustedVolts: number;
  voltDelta: number;
  longStrokeSoftShadingGuard: boolean;
  effectiveStrokeMm: number;
} | null {
  if (!machine || !techniqueName) return null;
  const stroke = effectiveStrokeMm(machine);
  const baseline = machine.defaultVoltRange.baseline;
  const { min, max } = machine.defaultVoltRange;
  const isSoft =
    techniqueName.trim().toLowerCase() === "soft shading";
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

/** Hz sweet spot derived from envelope (display-only heuristic for UI gauges). */
export function hzSweetSpotFromVoltage(
  volts: number,
  machine: Machine | null,
): { hz: number; hzMin: number; hzMax: number } {
  if (!machine) return { hz: 100, hzMin: 80, hzMax: 140 };
  const span = machine.defaultVoltRange.max - machine.defaultVoltRange.min || 1;
  const t =
    (volts - machine.defaultVoltRange.min) /
    span;
  const hzMin = 85;
  const hzMax = 150;
  return {
    hz: hzMin + t * (hzMax - hzMin),
    hzMin,
    hzMax,
  };
}
