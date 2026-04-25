"use client";

import {
  HAND_SPEED_STEPS,
  handSpeedFromSliderIndex,
  handSpeedLabel,
  sliderIndexFromHandSpeed,
  type HandSpeed,
} from "@/lib/dialedInEngine";

type Props = {
  value: HandSpeed;
  onChange: (speed: HandSpeed) => void;
};

/** Five discrete steps mapped to a horizontal range input (0–4). */
export function HandSpeedSlider({ value, onChange }: Props) {
  const idx = sliderIndexFromHandSpeed(value);
  const pct = (idx / 4) * 100;

  return (
    <div className="hand-speed-slider">
      <div className="hand-speed-slider__head">
        <span>Hand speed (velocity model)</span>
        <span className="hand-speed-slider__value">{handSpeedLabel(value)}</span>
      </div>
      <div className="hand-speed-slider__ticks" aria-hidden>
        {HAND_SPEED_STEPS.map((s) => (
          <span key={s} className="hand-speed-slider__tick">
            {handSpeedLabel(s)}
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
          aria-valuetext={handSpeedLabel(value)}
          aria-label="Hand speed relative to machine cycle rate"
        />
      </div>
      <p className="hand-speed-slider__note">
        <em>
          Note: Hand speed is a relative variable. This scale is designed to
          demonstrate the conceptual relationship between movement and cycle
          frequency, not as a literal measurement.
        </em>
      </p>
    </div>
  );
}
