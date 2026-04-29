"use client";

import {
  HAND_SPEED_STEPS,
  handSpeedFromSliderIndex,
  sliderIndexFromHandSpeed,
  type HandSpeed,
} from "@/lib/dialedInEngine";
import { useTranslations } from "next-intl";

type Props = {
  value: HandSpeed;
  onChange: (speed: HandSpeed) => void;
};

/** Five discrete steps mapped to a horizontal range input (0–4). */
export function HandSpeedSlider({ value, onChange }: Props) {
  const t = useTranslations("dialedInUi");
  const idx = sliderIndexFromHandSpeed(value);
  const pct = (idx / 4) * 100;

  const label = (s: HandSpeed) => t(`handSpeed.${s}`);

  return (
    <div className="hand-speed-slider">
      <div className="hand-speed-slider__head">
        <span>{t("handSpeedHeading")}</span>
        <span className="hand-speed-slider__value">{label(value)}</span>
      </div>
      <div className="hand-speed-slider__ticks" aria-hidden>
        {HAND_SPEED_STEPS.map((s) => (
          <span key={s} className="hand-speed-slider__tick">
            {label(s)}
          </span>
        ))}
      </div>
      <div className="hand-speed-slider__track" aria-hidden>
        <div
          className="hand-speed-slider__fill"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          className="hand-speed-slider__input"
          min={0}
          max={4}
          step={1}
          value={idx}
          onChange={(e) =>
            onChange(handSpeedFromSliderIndex(Number(e.target.value)))
          }
          aria-valuemin={0}
          aria-valuemax={4}
          aria-valuenow={idx}
          aria-valuetext={label(value)}
          aria-label={t("handSpeedAriaLabel")}
        />
      </div>
      <p className="hand-speed-slider__note">
        <em>{t("handSpeedNote")}</em>
      </p>
    </div>
  );
}
