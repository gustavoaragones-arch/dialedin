"use client";

import { fetchMachineLibrary } from "@/lib/machineLibrary";
import { DIALEDIN_STYLE_STORAGE_KEYS } from "@/lib/dialedinStorage";
import {
  fetchTattooTaxonomy,
  getTaxonomyForStyleName,
  normalizeTaxonomyStyleKey,
  type TattooTaxonomyRow,
  type TaxonomyStyleOption,
} from "@/lib/tattooTaxonomyLibrary";
import type { Machine } from "@/lib/dialedInData";
import {
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

export type DialedInContextValue = {
  state: DialedInState;
  dispatch: (a: DialedInAction) => void;
  machines: Machine[];
  machinesLoading: boolean;
  machinesError: string | null;
  machine: Machine | null;
  /** Row for `state.selectedStyleName`, or null. */
  selectedTaxonomy: TattooTaxonomyRow | null;
  /** Style dropdown options (normalized `style_key` + display `style_name`). */
  taxonomyStyleOptions: TaxonomyStyleOption[];
  /** Normalized style keys (map keys), sorted for storage checks. */
  availableStyleNames: string[];
  /** `tattoo_taxonomy` rows keyed by `normalizeTaxonomyStyleKey(style_name)`. */
  tuTaxonomyByStyleName: ReadonlyMap<string, TattooTaxonomyRow>;
  tuTaxonomyLoading: boolean;
  tuTaxonomyError: string | null;
};

const DialedInContext = createContext<DialedInContextValue | null>(null);

export function DialedInProvider({ children }: { children: ReactNode }) {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [machinesLoading, setMachinesLoading] = useState(true);
  const [machinesError, setMachinesError] = useState<string | null>(null);
  const [tuTaxonomyByStyleName, setTuTaxonomyByStyleName] = useState<
    Map<string, TattooTaxonomyRow>
  >(() => new Map());
  const [tuTaxonomyLoading, setTuTaxonomyLoading] = useState(true);
  const [tuTaxonomyError, setTuTaxonomyError] = useState<string | null>(null);

  const machinesById = useMemo(
    () => new Map(machines.map((m) => [m.id, m])),
    [machines],
  );

  const machinesByIdRef = useRef(machinesById);
  useEffect(() => {
    machinesByIdRef.current = machinesById;
  }, [machinesById]);

  const reducer = useCallback(
    (s: DialedInState, a: DialedInAction) =>
      dialedInReducer(s, a, machinesByIdRef),
    [],
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
    let cancelled = false;
    (async () => {
      setTuTaxonomyLoading(true);
      setTuTaxonomyError(null);
      try {
        const res = await fetchTattooTaxonomy();
        if (cancelled) return;
        if (res.ok) {
          setTuTaxonomyByStyleName(res.byStyleName);
        } else {
          setTuTaxonomyByStyleName(new Map());
          setTuTaxonomyError(res.error);
        }
      } finally {
        if (!cancelled) {
          setTuTaxonomyLoading(false);
        }
      }
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

  useEffect(() => {
    if (tuTaxonomyLoading) return;
    const names = Array.from(tuTaxonomyByStyleName.keys());
    try {
      for (const key of DIALEDIN_STYLE_STORAGE_KEYS) {
        const v = localStorage.getItem(key);
        const vn = normalizeTaxonomyStyleKey(v);
        if (vn != null && !names.includes(vn)) {
          localStorage.removeItem(key);
        }
      }
    } catch {
      /* ignore quota / private mode */
    }
  }, [tuTaxonomyLoading, tuTaxonomyByStyleName]);

  useEffect(() => {
    if (tuTaxonomyLoading) return;
    if (!state.selectedStyleName) return;
    if (!getTaxonomyForStyleName(tuTaxonomyByStyleName, state.selectedStyleName)) {
      dispatch({ type: "SET_STYLE", styleName: null });
    }
  }, [
    tuTaxonomyLoading,
    tuTaxonomyByStyleName,
    state.selectedStyleName,
    dispatch,
  ]);

  const machine = state.machineId
    ? machinesById.get(state.machineId) ?? null
    : null;

  const taxonomyStyleOptions = useMemo<TaxonomyStyleOption[]>(
    () =>
      Array.from(tuTaxonomyByStyleName.values())
        .sort((a, b) => a.styleName.localeCompare(b.styleName))
        .map((row) => ({
          style_key: normalizeTaxonomyStyleKey(row.styleName)!,
          style_name: row.styleName,
        })),
    [tuTaxonomyByStyleName],
  );

  const availableStyleNames = useMemo(
    () => taxonomyStyleOptions.map((o) => o.style_key),
    [taxonomyStyleOptions],
  );

  const selectedTaxonomy = useMemo(
    () => getTaxonomyForStyleName(tuTaxonomyByStyleName, state.selectedStyleName),
    [tuTaxonomyByStyleName, state.selectedStyleName],
  );

  const value = useMemo<DialedInContextValue>(
    () => ({
      state,
      dispatch,
      machines,
      machinesLoading,
      machinesError,
      machine,
      selectedTaxonomy,
      taxonomyStyleOptions,
      availableStyleNames,
      tuTaxonomyByStyleName,
      tuTaxonomyLoading,
      tuTaxonomyError,
    }),
    [
      state,
      dispatch,
      machines,
      machinesLoading,
      machinesError,
      machine,
      selectedTaxonomy,
      taxonomyStyleOptions,
      availableStyleNames,
      tuTaxonomyByStyleName,
      tuTaxonomyLoading,
      tuTaxonomyError,
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
