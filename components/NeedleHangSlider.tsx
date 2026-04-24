"use client";

import { TechnicalTerm } from "./TechnicalTerm";

type Props = {
  valueMm: number;
  onChange: (mm: number) => void;
};

export function NeedleHangSlider({ valueMm, onChange }: Props) {
  const min = 0.5;
  const max = 3.0;
  const pct = ((valueMm - min) / (max - min)) * 100;

  return (
    <div className="hang-slider">
      <div className="hang-slider__head">
        <span>
          Needle <TechnicalTerm termKey="Hanging">hanging</TechnicalTerm>
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
          aria-label="Needle hanging depth in millimeters"
        />
      </div>
      <div className="hang-slider__ticks">
        <span>0.5 mm</span>
        <span>3.0 mm</span>
      </div>
    </div>
  );
}
