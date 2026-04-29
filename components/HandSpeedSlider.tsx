"use client";

import {
  HAND_SPEED_STEPS,
  snapHandSpeedFromPct,
  type HandSpeed,
} from "@/lib/dialedInEngine";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

type Props = {
  pct: number;
  onPctChange: (pct: number) => void;
};

/**
 * Fluid 0–100% range; fill follows the thumb while the engine uses
 * {@link snapHandSpeedFromPct} (debounced in parent) for voltage / CPS.
 */
export function HandSpeedSlider({ pct, onPctChange }: Props) {
  const t = useTranslations("dialedInUi");
  const [dragging, setDragging] = useState(false);
  const snapped: HandSpeed = snapHandSpeedFromPct(pct);

  const label = (s: HandSpeed) => t(`handSpeed.${s}`);

  useEffect(() => {
    if (!dragging) return;
    const end = () => setDragging(false);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [dragging]);

  const startDrag = useCallback(() => setDragging(true), []);

  const rootClass = [
    "hand-speed-slider",
    "hand-speed-slider--fluid",
    dragging ? "hand-speed-slider--dragging" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <div className="hand-speed-slider__head">
        <span>{t("handSpeedHeading")}</span>
        <span className="hand-speed-slider__value">{label(snapped)}</span>
      </div>
      <div className="hand-speed-slider__ticks" aria-hidden>
        {HAND_SPEED_STEPS.map((s) => (
          <span key={s} className="hand-speed-slider__tick">
            {label(s)}
          </span>
        ))}
      </div>
      <div className="hand-speed-slider__track-wrap">
        <div className="hand-speed-slider__track" aria-hidden>
          <div
            className="hand-speed-slider__fill"
            style={{ width: `${pct}%` }}
          />
          <input
            type="range"
            className="hand-speed-slider__input"
            min={0}
            max={100}
            step={1}
            value={pct}
            onChange={(e) => onPctChange(Number(e.target.value))}
            onPointerDown={startDrag}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-valuetext={label(snapped)}
            aria-label={t("handSpeedAriaLabel")}
          />
        </div>
      </div>
      <p className="hand-speed-slider__note">
        <em>{t("handSpeedNote")}</em>
      </p>
    </div>
  );
}
