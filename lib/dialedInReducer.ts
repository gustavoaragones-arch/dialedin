import type { Machine, StylePreset } from "./dialedInData";
import { STYLE_PRESETS } from "./dialedInData";

import type { HandSpeed } from "./dialedInEngine";

export type DialedInState = {
  styleId: string | null;
  techniqueId: string | null;
  machineId: string | null;
  needleHangMm: number;
  handSpeed: HandSpeed;
  /** When style + machine are set, UI highlights this as recommended */
  highlightedTechniqueId: string | null;
};

export type DialedInAction =
  | { type: "SET_STYLE"; styleId: string | null }
  | { type: "SET_TECHNIQUE"; techniqueId: string | null }
  | { type: "SET_MACHINE"; machineId: string | null }
  | { type: "SET_NEEDLE_HANG"; mm: number }
  | { type: "SET_HAND_SPEED"; handSpeed: HandSpeed }
  | { type: "SYNC_RECOMMENDED_TECHNIQUE" };

const initial: DialedInState = {
  styleId: null,
  techniqueId: null,
  machineId: null,
  needleHangMm: 1.5,
  handSpeed: "Moderate",
  highlightedTechniqueId: null,
};

export function dialedInInitialState(): DialedInState {
  return { ...initial };
}

function recommendedTechniqueForStyleAndMachine(
  style: StylePreset | undefined,
  _machine: Machine | null | undefined,
): string | null {
  if (!style) return null;
  return style.recommendedTechniqueId;
}

export function dialedInReducer(
  state: DialedInState,
  action: DialedInAction,
  machinesById: Map<string, Machine>,
  stylesById: Map<string, StylePreset>,
): DialedInState {
  switch (action.type) {
    case "SET_STYLE": {
      const next = { ...state, styleId: action.styleId };
      const style = action.styleId ? stylesById.get(action.styleId) : undefined;
      const machine = state.machineId
        ? machinesById.get(state.machineId)
        : undefined;
      const rec =
        style && machine
          ? recommendedTechniqueForStyleAndMachine(style, machine)
          : null;
      return {
        ...next,
        highlightedTechniqueId: rec,
      };
    }
    case "SET_MACHINE": {
      const next = { ...state, machineId: action.machineId };
      const style = state.styleId ? stylesById.get(state.styleId) : undefined;
      const machine = action.machineId
        ? machinesById.get(action.machineId)
        : undefined;
      const rec =
        style && machine
          ? recommendedTechniqueForStyleAndMachine(style, machine)
          : null;
      return {
        ...next,
        highlightedTechniqueId: rec,
      };
    }
    case "SET_TECHNIQUE":
      return {
        ...state,
        techniqueId: action.techniqueId,
      };
    case "SET_NEEDLE_HANG":
      return {
        ...state,
        needleHangMm: Math.min(3, Math.max(0.5, action.mm)),
      };
    case "SET_HAND_SPEED":
      return { ...state, handSpeed: action.handSpeed };
    case "SYNC_RECOMMENDED_TECHNIQUE": {
      const style = state.styleId ? stylesById.get(state.styleId) : undefined;
      const machine = state.machineId
        ? machinesById.get(state.machineId)
        : undefined;
      const rec =
        style && machine
          ? recommendedTechniqueForStyleAndMachine(style, machine)
          : null;
      return { ...state, highlightedTechniqueId: rec };
    }
    default:
      return state;
  }
}

export function buildStyleMap(): Map<string, StylePreset> {
  return new Map(STYLE_PRESETS.map((s) => [s.id, s]));
}
