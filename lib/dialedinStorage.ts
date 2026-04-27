/** localStorage keys for DialedIn client state (legacy + current). */
export const DIALEDIN_LS_SELECTED_STYLE = "dialedin.selectedStyleName";
export const DIALEDIN_LS_LEGACY_STYLE_ID = "dialedin.styleId";

export const DIALEDIN_STYLE_STORAGE_KEYS = [
  DIALEDIN_LS_SELECTED_STYLE,
  DIALEDIN_LS_LEGACY_STYLE_ID,
  "dialedin.selectedStyle",
] as const;
