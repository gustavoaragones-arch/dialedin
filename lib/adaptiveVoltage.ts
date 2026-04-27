/**
 * Mechanical-force pivot: longer stroke = less voltage headroom, shorter = more.
 * Per spec: FinalMin = volt_min + Modifier, FinalMax = volt_max + Modifier where
 * Modifier = ((UserStroke - 3.5) / 0.5) * -0.5 V, then clamp to [4, 11] V.
 */
export const STROKE_PIVOT_MM = 3.5;
const STEP_MM = 0.5;
const STEP_VOLT = 0.5;

export const VOLT_SAFETY_MIN = 4.0;
export const VOLT_SAFETY_MAX = 11.0;

export function strokeVoltageModifierV(userStrokeMm: number): number {
  return ((userStrokeMm - STROKE_PIVOT_MM) / STEP_MM) * -STEP_VOLT;
}

export type AdaptedVoltRange = {
  modifierV: number;
  adaptedMin: number;
  adaptedMax: number;
};

/**
 * Applies the stroke modifier to taxonomy volt_min / volt_max, then clamps
 * each bound into the global safe band. Ensures min ≤ max.
 */
export function buildAdaptedVoltRange(
  voltMin: number,
  voltMax: number,
  userStrokeMm: number,
): AdaptedVoltRange {
  const m = strokeVoltageModifierV(userStrokeMm);
  let aMin = voltMin + m;
  let aMax = voltMax + m;
  aMin = clampToBand(aMin);
  aMax = clampToBand(aMax);
  if (aMin > aMax) {
    const t = aMin;
    aMin = aMax;
    aMax = t;
  }
  return {
    modifierV: Math.round(m * 100) / 100,
    adaptedMin: Math.round(aMin * 100) / 100,
    adaptedMax: Math.round(aMax * 100) / 100,
  };
}

function clampToBand(v: number): number {
  return Math.min(VOLT_SAFETY_MAX, Math.max(VOLT_SAFETY_MIN, v));
}
