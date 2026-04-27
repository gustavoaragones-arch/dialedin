"use client";

import { useEffect, useMemo } from "react";
import type { TaxonomyStyleOption } from "@/lib/tattooTaxonomyLibrary";
import {
  getTaxonomyForStyleName,
  normalizeTaxonomyStyleKey,
  type TattooTaxonomyRow,
} from "@/lib/tattooTaxonomyLibrary";
import type { TechniqueSlot } from "@/lib/dialedInReducer";

type Props = {
  /** Sorted options: `style_key` = map key, `style_name` = DB label. */
  taxonomyStyleOptions: TaxonomyStyleOption[];
  /** Map keyed by `normalizeTaxonomyStyleKey(style_name)`. */
  tuTaxonomyByStyleName: ReadonlyMap<string, TattooTaxonomyRow>;
  taxonomyLoading: boolean;
  taxonomyError: string | null;
  selectedStyleName: string | null;
  onStyleNameChange: (name: string | null) => void;
  techniqueSlot: TechniqueSlot | null;
  onTechniqueSlotChange: (slot: TechniqueSlot) => void;
  highlightedSlot: TechniqueSlot | null;
};

/**
 * Style and technique pickers — populated from `tattoo_taxonomy` in Supabase.
 * Technique labels come from `lining_technique` / `shading_technique` on the selected row.
 */
export function SelectionInterface({
  taxonomyStyleOptions,
  tuTaxonomyByStyleName,
  taxonomyLoading,
  taxonomyError,
  selectedStyleName,
  onStyleNameChange,
  techniqueSlot,
  onTechniqueSlotChange,
  highlightedSlot,
}: Props) {
  const styleKey = normalizeTaxonomyStyleKey(selectedStyleName);
  const currentRow = useMemo(
    () => getTaxonomyForStyleName(tuTaxonomyByStyleName, selectedStyleName),
    [tuTaxonomyByStyleName, selectedStyleName],
  );

  const canPickTechnique = Boolean(styleKey && currentRow);

  const liningLabel = currentRow?.liningTechnique ?? "Lining";
  const shadingLabel = currentRow?.shadingTechnique ?? "Shading";
  const technicalFocus = currentRow?.technicalFocus ?? null;

  const techniqueFirstOption =
    !styleKey
      ? "Select a style first…"
      : !currentRow
        ? "Select Style First…"
        : "Select technique path…";

  useEffect(() => {
    const n = taxonomyStyleOptions.length;
    console.log("[SelectionInterface] taxonomyStyleOptions.length", n);
    if (n === 0) {
      console.warn(
        "[SelectionInterface] taxonomyStyleOptions.length is 0 — fetch likely failed, RLS blocked select, or no parsable rows. tuTaxonomyByStyleName.size =",
        tuTaxonomyByStyleName.size,
      );
    }
  }, [taxonomyStyleOptions.length, tuTaxonomyByStyleName]);

  useEffect(() => {
    if (!selectedStyleName) {
      console.log("Current Selected Style Data:", null);
      return;
    }
    const nk = selectedStyleName.trim().toLowerCase();
    const mapGet = tuTaxonomyByStyleName.get(nk);
    console.log("Current Selected Style Data:", mapGet);
  }, [selectedStyleName, tuTaxonomyByStyleName]);

  return (
    <>
      <label className="dialed__field">
        <span>1 · Style</span>
        <select
          className="dialed__select"
          value={selectedStyleName ?? ""}
          disabled={taxonomyLoading}
          onChange={(e) => {
            const v = e.target.value;
            onStyleNameChange(v ? v : null);
          }}
        >
          <option value="">
            {taxonomyLoading ? "Loading styles…" : "Select style…"}
          </option>
          {taxonomyStyleOptions.map((item) => (
            <option key={item.style_key} value={item.style_key}>
              {item.style_name}
            </option>
          ))}
        </select>
        {taxonomyError ? (
          <p className="dialed__error" role="alert">
            {taxonomyError}
          </p>
        ) : null}
      </label>

      <label className="dialed__field">
        <span>2 · Technique</span>
        <select
          className="dialed__select"
          value={canPickTechnique && techniqueSlot ? techniqueSlot : ""}
          disabled={!canPickTechnique}
          onChange={(e) => {
            const v = e.target.value as TechniqueSlot;
            if (v === "lining" || v === "shading") onTechniqueSlotChange(v);
          }}
        >
          <option value="">{techniqueFirstOption}</option>
          <option value="lining">
            {liningLabel}
            {highlightedSlot === "lining" && canPickTechnique
              ? " · Recommended"
              : ""}
          </option>
          <option value="shading">
            {shadingLabel}
            {highlightedSlot === "shading" && canPickTechnique
              ? " · Recommended"
              : ""}
          </option>
        </select>
        {highlightedSlot && canPickTechnique ? (
          <p className="dialed__hint">
            Recommended path is highlighted when both style and machine are set.
          </p>
        ) : null}
      </label>

      {technicalFocus ? (
        <div className="dialed__style-note" role="note">
          <p className="dialed__style-note__kicker">Style note</p>
          <p className="dialed__style-note__text">{technicalFocus}</p>
        </div>
      ) : null}

      <div className="dialed__chips" aria-label="Technique quick pick">
        {canPickTechnique ? (
          (["lining", "shading"] as const).map((slot) => {
            const rec = highlightedSlot === slot;
            const on = techniqueSlot === slot;
            const label = slot === "lining" ? liningLabel : shadingLabel;
            return (
              <button
                key={slot}
                type="button"
                className={`dialed__chip${rec ? " dialed__chip--rec" : ""}${on ? " dialed__chip--on" : ""}`}
                onClick={() => onTechniqueSlotChange(slot)}
              >
                {label}
                {rec ? <span className="dialed__rec-badge">Rec</span> : null}
              </button>
            );
          })
        ) : null}
      </div>
    </>
  );
}
