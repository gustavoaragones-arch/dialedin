"use client";

import { NEEDLE_HANG_ABS_MIN_MM } from "@/lib/dialedInData";
import { useTranslations } from "next-intl";
import { TechnicalTerm } from "./TechnicalTerm";

type Props = {
  valueMm: number;
  maxMm: number;
  onChange: (mm: number) => void;
};

export function NeedleHangSlider({ valueMm, maxMm, onChange }: Props) {
  const t = useTranslations("dialedInUi");
  const min = NEEDLE_HANG_ABS_MIN_MM;
  const max = Math.max(min, maxMm);
  const span = max - min;
  const pct = span <= 0 ? 0 : ((valueMm - min) / span) * 100;

  return (
    <div className="hang-slider">
      <div className="hang-slider__head">
        <span>
          {t("needleHangPrefix")}
          <TechnicalTerm termKey="Hanging">{t("needleHangWord")}</TechnicalTerm>
        </span>
        <span className="hang-slider__value">{valueMm.toFixed(1)} mm</span>
      </div>
      <div className="hang-slider__track" aria-hidden>
        <div
          className="hang-slider__fill"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          className="hang-slider__input"
          min={min}
          max={max}
          step={0.1}
          value={valueMm}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valueMm}
          aria-label={t("needleHangAriaLabel")}
        />
      </div>
      <div className="hang-slider__ticks">
        <span>{min.toFixed(1)} mm</span>
        <span>{max.toFixed(1)} mm</span>
      </div>
    </div>
  );
}
