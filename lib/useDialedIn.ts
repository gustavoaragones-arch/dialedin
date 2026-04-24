"use client";

import { useCallback, useMemo, useReducer } from "react";
import { MACHINES, STYLE_PRESETS, TECHNIQUES } from "./dialedInData";
import {
  buildStyleMap,
  dialedInInitialState,
  dialedInReducer,
  type DialedInAction,
} from "./dialedInReducer";

export function useDialedIn() {
  const machinesById = useMemo(
    () => new Map(MACHINES.map((m) => [m.id, m])),
    [],
  );
  const stylesById = useMemo(() => buildStyleMap(), []);

  const [state, rawDispatch] = useReducer(
    (s: ReturnType<typeof dialedInInitialState>, a: DialedInAction) =>
      dialedInReducer(s, a, machinesById, stylesById),
    undefined,
    dialedInInitialState,
  );

  const dispatch = useCallback((a: DialedInAction) => rawDispatch(a), []);

  const machine = state.machineId
    ? machinesById.get(state.machineId) ?? null
    : null;
  const style = state.styleId
    ? stylesById.get(state.styleId) ?? null
    : null;
  const technique = state.techniqueId
    ? TECHNIQUES.find((t) => t.id === state.techniqueId) ?? null
    : null;

  return {
    state,
    dispatch,
    machines: MACHINES,
    styles: STYLE_PRESETS,
    techniques: TECHNIQUES,
    machine,
    style,
    technique,
    machinesById,
    stylesById,
  };
}
