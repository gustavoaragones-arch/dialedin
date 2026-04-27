import type { VoltRange } from "./dialedInData";
import { frequencySweetSpotFromVoltage } from "./dialedInData";
import { engineStyleLookupKey } from "./engineStyleKey";

/** High stroke threshold (mm) for Hammer Effect guard. */
export const HIGH_STROKE_MM = 4.0;

const HAMMER_REDUCTION_V = 1.5;
const TIER2_CARTRIDGE_TENSION_COMPENSATION_V = 0.2;

/** Five discrete hand-speed steps (slider indices 0–4). */
export const HAND_SPEED_STEPS = [
  "Slow",
  "SlowModerate",
  "Moderate",
  "FastModerate",
  "Fast",
] as const;

export type HandSpeed = (typeof HAND_SPEED_STEPS)[number];

export function handSpeedLabel(s: HandSpeed): string {
  const map: Record<HandSpeed, string> = {
    Slow: "Slow",
    SlowModerate: "Slow-Moderate",
    Moderate: "Moderate",
    FastModerate: "Fast-Moderate",
    Fast: "Fast",
  };
  return map[s];
}

export function handSpeedFromSliderIndex(i: number): HandSpeed {
  const idx = Math.min(4, Math.max(0, Math.round(i)));
  return HAND_SPEED_STEPS[idx]!;
}

export function sliderIndexFromHandSpeed(s: HandSpeed): number {
  return HAND_SPEED_STEPS.indexOf(s);
}

/**
 * Slider steps 1–5 (indices 0–4: Slow → Fast) map to voltage offsets (V)
 * applied after relational baseline, before envelope clamp.
 */
export const HAND_SPEED_VOLTAGE_OFFSETS = [
  -0.6, -0.3, 0.0, 0.4, 0.8,
] as const;

export function handSpeedOffsetVolts(speed: HandSpeed): number {
  const i = sliderIndexFromHandSpeed(speed);
  return HAND_SPEED_VOLTAGE_OFFSETS[i] ?? 0;
}

export type DialedInEngineInput = {
  /** Effective machine stroke in mm (e.g. max of stroke_options). */
  strokeMm: number;
  technique: string;
  style: string;
  handSpeed?: HandSpeed | null;
  /** Optional machine tier for cartridge-tension compensation logic. */
  machineTier?: 1 | 2 | null;
};

export type ScienceCheckCode =
  | "HAMMER_EFFECT"
  | "GEOMETRY_DESYNC"
  | "VELOCITY_SYNC";

export type ScienceCheck = {
  code: ScienceCheckCode;
  severity: "critical" | "advisory";
  message: string;
};

export type SafetyTriggerState = {
  /** True when any scientific check is present. */
  active: boolean;
  checks: ScienceCheck[];
};

export type DialedInEngineResult = {
  needle_diameter_range: string;
  needle_count_range: string;
  taper_recommendation: string;
  voltage_baseline: number;
  needle_hang_mm: number;
  /** Heuristic Hz band from voltage (supply / readout framing). */
  hz_derived: number;
  hz_band_min: number;
  hz_band_max: number;
  /** Physical needle cycles/sec (1:1 direct-drive model ≈ drive frequency here). */
  cps_derived: number;
  cps_band_min: number;
  cps_band_max: number;
  /** Integrated scientific authority checks + legacy aggregate. */
  safety_trigger: SafetyTriggerState;
};

type StyleProfile = {
  needle_diameter_range: string;
  needle_count_low: number;
  needle_count_high: number;
  taper_recommendation: string;
  voltage_base: number;
  needle_hang_mm: number;
};

type TechniqueProfile = {
  delicate_shading: boolean;
  volt_delta: number;
  needle_count_delta: number;
  hang_delta_mm: number;
  taper_suffix?: string;
};

const STYLE_TABLE: Record<string, StyleProfile> = {
  "fine-line": {
    needle_diameter_range: "0.25–0.30 mm (#08–#10)",
    needle_count_low: 3,
    needle_count_high: 7,
    taper_recommendation: "Standard long taper (LT)",
    voltage_base: 6.2,
    needle_hang_mm: 1.5,
  },
  "black-and-grey-realism": {
    needle_diameter_range: "0.30–0.35 mm (#10–#12)",
    needle_count_low: 9,
    needle_count_high: 15,
    taper_recommendation: "Super long taper (SLT) preferred",
    voltage_base: 7.2,
    needle_hang_mm: 2.2,
  },
  "soft-portrait": {
    needle_diameter_range:
      "0.30–0.35 mm (#10–#12); TX optional for large wash fields",
    needle_count_low: 7,
    needle_count_high: 11,
    taper_recommendation: "Long taper (LT) to SLT",
    voltage_base: 6.8,
    needle_hang_mm: 2.0,
  },
  "american-traditional": {
    needle_diameter_range: "0.30–0.35 mm (#10–#12)",
    needle_count_low: 3,
    needle_count_high: 11,
    taper_recommendation: "Standard to long taper (LT); bold line priority",
    voltage_base: 5.6,
    needle_hang_mm: 1.6,
  },
};

const FALLBACK_STYLE_KEY = "black-and-grey-realism";

const DEFAULT_STYLE_PROFILE: StyleProfile =
  STYLE_TABLE[FALLBACK_STYLE_KEY]!;

const TECHNIQUE_TABLE: Record<string, TechniqueProfile> = {
  "fine line passes": {
    delicate_shading: false,
    volt_delta: -0.15,
    needle_count_delta: 0,
    hang_delta_mm: 0,
  },
  "soft shading": {
    delicate_shading: true,
    volt_delta: -0.35,
    needle_count_delta: 1,
    hang_delta_mm: 0.15,
  },
  "whip shading": {
    delicate_shading: true,
    volt_delta: 0,
    needle_count_delta: 0,
    hang_delta_mm: 0.1,
  },
  "black & grey realism": {
    delicate_shading: false,
    volt_delta: 0.2,
    needle_count_delta: 0,
    hang_delta_mm: 0,
    taper_suffix: " — pack with soft edges",
  },
};

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function styleProfile(style: string): StyleProfile {
  const k = engineStyleLookupKey(style);
  return STYLE_TABLE[k] ?? DEFAULT_STYLE_PROFILE;
}

function techniqueProfile(technique: string): TechniqueProfile | null {
  return TECHNIQUE_TABLE[norm(technique)] ?? null;
}

function strokeVoltageDelta(strokeMm: number): number {
  if (strokeMm < 3.5) return -0.1;
  if (strokeMm < HIGH_STROKE_MM) return 0;
  return 0.15;
}

function clampCount(
  low: number,
  high: number,
  floor = 3,
  ceiling = 21,
): [number, number] {
  const a = Math.min(Math.max(low, floor), ceiling);
  const b = Math.min(Math.max(high, floor), ceiling);
  return a <= b ? [a, b] : [b, a];
}

/** True if recommendation explicitly centers SLT / super long taper. */
export function taperRecommendationIsSlt(taper: string): boolean {
  const t = taper.toLowerCase();
  return (
    /\bslt\b/.test(t) ||
    t.includes("super long taper") ||
    t.includes("nano-taper")
  );
}

function isHammerTechnique(technique: string): boolean {
  const n = norm(technique);
  return n === "soft shading" || n === "whip shading";
}

const HAMMER_MESSAGE =
  "Kinetic Impact Hazard: A 4.0mm+ stroke delivers high needle momentum. Reducing voltage by 1.5V is required to prevent the 'Hammer Effect' (sub-dermal scarring) during delicate shading.";

const GEOMETRY_MESSAGE =
  "Geometry Mismatch: Standard tapers create excessive skin displacement for micro-details. Super Long Taper (SLT) is recommended to prevent ink spread (blowouts).";

const VELOCITY_MESSAGE =
  "Frequency/Velocity Desync: Your hand speed exceeds the machine's cycle rate. This may cause 'dashed' lines or skin snagging. Increase voltage or decelerate hand movement.";

function defaultEnvelope(): VoltRange {
  return { min: 5, max: 10.5, baseline: 7.5 };
}

/**
 * Relational mapping + scientific checks (Hammer Effect, Geometry Desync, Velocity Sync).
 */
export function evaluateDialedInEngine(
  input: DialedInEngineInput,
  options?: { voltEnvelope?: VoltRange | null },
): DialedInEngineResult | null {
  const { strokeMm, technique, style, handSpeed, machineTier } = input;
  if (!Number.isFinite(strokeMm) || strokeMm <= 0) return null;
  if (!style.trim() || !technique.trim()) return null;

  const sp = styleProfile(style);
  const tp = techniqueProfile(technique);
  if (!tp) return null;

  const highStroke = strokeMm >= HIGH_STROKE_MM;
  const hammer = highStroke && isHammerTechnique(technique);

  const [cLo, cHi] = clampCount(
    sp.needle_count_low + tp.needle_count_delta,
    sp.needle_count_high + tp.needle_count_delta,
  );

  const speed: HandSpeed = handSpeed ?? "Moderate";
  const envelope = options?.voltEnvelope ?? defaultEnvelope();

  /** Relational + hammer baseline (no hand-speed offset yet). */
  let voltageBaseline =
    sp.voltage_base + tp.volt_delta + strokeVoltageDelta(strokeMm);

  if (hammer) {
    voltageBaseline -= HAMMER_REDUCTION_V;
  }

  // Tier 2 setups commonly run stiffer cartridge membranes; add a small
  // torque headroom bump so baseline does not under-drive the motor.
  if (machineTier === 2) {
    voltageBaseline += TIER2_CARTRIDGE_TENSION_COMPENSATION_V;
  }

  const handOffset = handSpeedOffsetVolts(speed);
  let voltage = voltageBaseline + handOffset;

  if (options?.voltEnvelope) {
    const { min, max } = options.voltEnvelope;
    voltage = Math.min(Math.max(voltage, min), max);
  } else {
    voltage = Math.min(Math.max(voltage, 4.5), 11);
  }

  const voltageRounded = Math.round(voltage * 10) / 10;

  const freq = frequencySweetSpotFromVoltage(voltageRounded, envelope);

  const hang = Math.min(
    3.0,
    Math.max(0.5, sp.needle_hang_mm + tp.hang_delta_mm),
  );

  const taper = tp.taper_suffix
    ? `${sp.taper_recommendation}${tp.taper_suffix}`
    : sp.taper_recommendation;

  const checks: ScienceCheck[] = [];

  if (hammer) {
    checks.push({
      code: "HAMMER_EFFECT",
      severity: "critical",
      message: HAMMER_MESSAGE,
    });
  }

  if (engineStyleLookupKey(style) === "fine-line" && !taperRecommendationIsSlt(taper)) {
    checks.push({
      code: "GEOMETRY_DESYNC",
      severity: "advisory",
      message: GEOMETRY_MESSAGE,
    });
  }

  if (
    (speed === "Fast" || speed === "FastModerate") &&
    voltageRounded < 7.5
  ) {
    checks.push({
      code: "VELOCITY_SYNC",
      severity: "advisory",
      message: VELOCITY_MESSAGE,
    });
  }

  return {
    needle_diameter_range: sp.needle_diameter_range,
    needle_count_range: `${String(cLo).padStart(2, "0")}–${String(cHi).padStart(2, "0")}`,
    taper_recommendation: taper,
    voltage_baseline: voltageRounded,
    needle_hang_mm: Math.round(hang * 10) / 10,
    hz_derived: Math.round(freq.hz * 10) / 10,
    hz_band_min: freq.hzMin,
    hz_band_max: freq.hzMax,
    cps_derived: freq.cps_derived,
    cps_band_min: freq.cpsMin,
    cps_band_max: freq.cpsMax,
    safety_trigger: {
      active: checks.length > 0,
      checks,
    },
  };
}

export function dialedInEngineToJson(result: DialedInEngineResult): string {
  return JSON.stringify(result, null, 2);
}
