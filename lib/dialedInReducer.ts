import type { MutableRefObject } from "react";
import type { Machine } from "./dialedInData";
import {
  NEEDLE_HANG_ABS_MIN_MM,
  closestStrokeOptionMm,
  maxStrokeMm,
  needleHangMaxMm,
} from "./dialedInData";
import { recommendedTechniqueSlot } from "./recommendedTechniqueSlot";

import type { HandSpeed } from "./dialedInEngine";

export type TechniqueSlot = "lining" | "shading";

export type DialedInState = {
  /** Canonical `style_name` from `tattoo_taxonomy` (drives ideal stroke in UI + engine). */
  selectedStyleName: string | null;
  /** Lining vs shading path from the active taxonomy row. */
  techniqueSlot: TechniqueSlot | null;
  machineId: string | null;
  /** Active stroke length (mm) for the selected machine; drives engine + guards. */
  selectedStrokeMm: number | null;
  needleHangMm: number;
  handSpeed: HandSpeed;
  /** When style + machine are set, UI highlights a recommended slot */
  highlightedTechniqueSlot: TechniqueSlot | null;
};

export type DialedInAction =
  | { type: "SET_STYLE"; styleName: string | null }
  | { type: "SET_TECHNIQUE_SLOT"; slot: TechniqueSlot }
  | {
      type: "SET_MACHINE";
      machineId: string | null;
      /** When set, initial stroke snaps to the nearest machine option to this ideal (mm). */
      idealStrokeMm?: number | null;
    }
  | { type: "SET_SELECTED_STROKE_MM"; strokeMm: number }
  | { type: "SET_NEEDLE_HANG"; mm: number }
  | { type: "SET_HAND_SPEED"; handSpeed: HandSpeed }
  | { type: "SYNC_RECOMMENDED_TECHNIQUE" };

/** Never seed a legacy style id (e.g. s-fine-line); style comes only from Supabase style_name. */
const initial: DialedInState = {
  selectedStyleName: null,
  techniqueSlot: null,
  machineId: null,
  selectedStrokeMm: null,
  needleHangMm: 1.5,
  handSpeed: "Moderate",
  highlightedTechniqueSlot: null,
};

export function dialedInInitialState(): DialedInState {
  return { ...initial };
}

function recommendedSlot(
  styleName: string | null,
  machine: Machine | null | undefined,
): TechniqueSlot | null {
  if (!styleName || !machine) return null;
  return recommendedTechniqueSlot(styleName);
}

function defaultStrokeForMachine(
  machine: Machine | undefined,
): number | null {
  if (!machine || machine.strokeOptionsMm.length === 0) return null;
  return maxStrokeMm(machine);
}

function clampNeedleHangMm(
  mm: number,
  machine: Machine | undefined,
  selectedStrokeMm: number | null,
): number {
  const max = needleHangMaxMm(machine ?? null, selectedStrokeMm);
  return Math.min(max, Math.max(NEEDLE_HANG_ABS_MIN_MM, mm));
}

export function dialedInReducer(
  state: DialedInState,
  action: DialedInAction,
  machinesByIdRef: MutableRefObject<Map<string, Machine>>,
): DialedInState {
  const machinesById = machinesByIdRef.current;

  switch (action.type) {
    case "SET_STYLE": {
      const raw = action.styleName?.trim() ?? "";
      if (!raw) {
        return {
          ...state,
          selectedStyleName: null,
          techniqueSlot: null,
          highlightedTechniqueSlot: null,
        };
      }
      const normalized = raw.toLowerCase();
      const machine = state.machineId
        ? machinesById.get(state.machineId)
        : undefined;
      const rec = recommendedSlot(normalized, machine);
      return {
        ...state,
        selectedStyleName: normalized,
        techniqueSlot: "lining",
        highlightedTechniqueSlot: rec,
      };
    }
    case "SET_MACHINE": {
      const machine = action.machineId
        ? machinesById.get(action.machineId)
        : undefined;
      const ideal = action.idealStrokeMm;
      const nextStroke =
        action.machineId && machine && machine.strokeOptionsMm.length > 0
          ? ideal != null && Number.isFinite(ideal)
            ? (closestStrokeOptionMm(machine.strokeOptionsMm, ideal) ??
              defaultStrokeForMachine(machine))
            : defaultStrokeForMachine(machine)
          : null;
      const next = {
        ...state,
        machineId: action.machineId,
        selectedStrokeMm: action.machineId ? nextStroke : null,
      };
      const rec = recommendedSlot(state.selectedStyleName, machine);
      const needleHangMm = clampNeedleHangMm(
        state.needleHangMm,
        machine,
        next.selectedStrokeMm,
      );
      return {
        ...next,
        needleHangMm,
        highlightedTechniqueSlot: rec,
      };
    }
    case "SET_SELECTED_STROKE_MM": {
      const machine = state.machineId
        ? machinesById.get(state.machineId)
        : undefined;
      if (!machine) return state;
      const allowed = machine.strokeOptionsMm.some(
        (s) => Math.abs(s - action.strokeMm) < 0.0001,
      );
      if (!allowed) return state;
      const needleHangMm = clampNeedleHangMm(
        state.needleHangMm,
        machine,
        action.strokeMm,
      );
      return { ...state, selectedStrokeMm: action.strokeMm, needleHangMm };
    }
    case "SET_TECHNIQUE_SLOT": {
      return {
        ...state,
        techniqueSlot: action.slot,
      };
    }
    case "SET_NEEDLE_HANG": {
      const machine = state.machineId
        ? machinesById.get(state.machineId)
        : undefined;
      return {
        ...state,
        needleHangMm: clampNeedleHangMm(
          action.mm,
          machine,
          state.selectedStrokeMm,
        ),
      };
    }
    case "SET_HAND_SPEED":
      return { ...state, handSpeed: action.handSpeed };
    case "SYNC_RECOMMENDED_TECHNIQUE": {
      const machine = state.machineId
        ? machinesById.get(state.machineId)
        : undefined;
      const rec = recommendedSlot(state.selectedStyleName, machine);
      return { ...state, highlightedTechniqueSlot: rec };
    }
    default:
      return state;
  }
}
