"use client";

import { fetchMachineLibrary } from "@/lib/machineLibrary";
import type { Machine, StylePreset } from "@/lib/dialedInData";
import { STYLE_PRESETS, TECHNIQUES } from "@/lib/dialedInData";
import {
  buildStyleMap,
  dialedInInitialState,
  dialedInReducer,
  type DialedInAction,
  type DialedInState,
} from "@/lib/dialedInReducer";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Technique = (typeof TECHNIQUES)[number];

export type DialedInContextValue = {
  state: DialedInState;
  dispatch: (a: DialedInAction) => void;
  machines: Machine[];
  machinesLoading: boolean;
  machinesError: string | null;
  styles: typeof STYLE_PRESETS;
  techniques: typeof TECHNIQUES;
  machine: Machine | null;
  style: StylePreset | null;
  technique: Technique | null;
};

const DialedInContext = createContext<DialedInContextValue | null>(null);

export function DialedInProvider({ children }: { children: ReactNode }) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [machinesLoading, setMachinesLoading] = useState(true);
  const [machinesError, setMachinesError] = useState<string | null>(null);

  const machinesById = useMemo(
    () => new Map(machines.map((m) => [m.id, m])),
    [machines],
  );

  const machinesByIdRef = useRef(machinesById);
  useEffect(() => {
    machinesByIdRef.current = machinesById;
  }, [machinesById]);

  const stylesById = useMemo(() => buildStyleMap(), []);

  const reducer = useCallback(
    (s: DialedInState, a: DialedInAction) =>
      dialedInReducer(s, a, machinesByIdRef, stylesById),
    [stylesById],
  );

  const [state, rawDispatch] = useReducer(reducer, undefined, dialedInInitialState);
  const dispatch = useCallback((a: DialedInAction) => rawDispatch(a), []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setMachinesLoading(true);
      setMachinesError(null);
      const res = await fetchMachineLibrary();
      if (cancelled) return;
      if (res.ok) {
        setMachines(res.machines);
        if (res.machines.length === 0) {
          setMachinesError("No machines returned from machine_library.");
        }
      } else {
        setMachines([]);
        setMachinesError(res.error);
      }
      setMachinesLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!state.machineId) return;
    if (!machinesById.has(state.machineId)) {
      dispatch({ type: "SET_MACHINE", machineId: null });
    }
  }, [machinesById, state.machineId, dispatch]);

  const machine = state.machineId
    ? machinesById.get(state.machineId) ?? null
    : null;

  const style = state.styleId
    ? stylesById.get(state.styleId) ?? null
    : null;

  const technique = state.techniqueId
    ? TECHNIQUES.find((t) => t.id === state.techniqueId) ?? null
    : null;

  const value = useMemo<DialedInContextValue>(
    () => ({
      state,
      dispatch,
      machines,
      machinesLoading,
      machinesError,
      styles: STYLE_PRESETS,
      techniques: TECHNIQUES,
      machine,
      style,
      technique,
    }),
    [
      state,
      dispatch,
      machines,
      machinesLoading,
      machinesError,
      machine,
      style,
      technique,
    ],
  );

  return (
    <DialedInContext.Provider value={value}>{children}</DialedInContext.Provider>
  );
}

export function useDialedIn(): DialedInContextValue {
  const ctx = useContext(DialedInContext);
  if (!ctx) {
    throw new Error("useDialedIn must be used within DialedInProvider");
  }
  return ctx;
}
