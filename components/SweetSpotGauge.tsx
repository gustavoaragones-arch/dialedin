"use client";

import { useId } from "react";

type GaugeEmphasis = "default" | "primary" | "muted";

type Props = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  decimals?: number;
  /** Optional teaching line (e.g. CPS vs Hz). */
  caption?: string;
  /** Small caption under the main label (e.g. supply reference). */
  badge?: string;
  /** Visual priority in the trio (e.g. Hz-first for ACUS). */
  emphasis?: GaugeEmphasis;
};

/** CSS + SVG hybrid semicircle “speedometer” for sweet-spot readouts. */
export function SweetSpotGauge({
  label,
  value,
  min,
  max,
  unit,
  decimals = 1,
  caption,
  badge,
  emphasis = "default",
}: Props) {
  const gid = useId().replace(/:/g, "");
  const t = max > min ? (value - min) / (max - min) : 0;
  const clamped = Math.min(1, Math.max(0, t));
  const angle = -180 + clamped * 180;
  const r = 52;
  const cx = 60;
  const cy = 58;

  const wrapClass =
    emphasis === "primary"
      ? "gauge gauge--primary"
      : emphasis === "muted"
        ? "gauge gauge--muted"
        : "gauge";

  return (
    <div
      className={wrapClass}
      aria-label={`${label}: ${value.toFixed(decimals)} ${unit}`}
    >
      <div className="gauge__label">
        <span className="gauge__label-text">{label}</span>
        {badge ? <span className="gauge__badge">{badge}</span> : null}
      </div>
      <svg
        className="gauge__svg"
        viewBox="0 0 120 70"
        width={140}
        height={82}
        aria-hidden
      >
        <defs>
          <linearGradient id={`g-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--gauge-low)" />
            <stop offset="50%" stopColor="var(--gauge-mid)" />
            <stop offset="100%" stopColor="var(--gauge-high)" />
          </linearGradient>
        </defs>
        <path
          d="M 12 58 A 48 48 0 0 1 108 58"
          fill="none"
          stroke={`url(#g-${gid})`}
          strokeWidth={10}
          strokeLinecap="round"
          opacity={0.35}
        />
        <path
          d="M 12 58 A 48 48 0 0 1 108 58"
          fill="none"
          stroke="var(--gauge-track)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <g
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
          }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - r + 6}
            stroke="var(--gauge-needle)"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>
        <circle cx={cx} cy={cy} r={4} fill="var(--gauge-needle)" />
      </svg>
      <div className="gauge__readout">
        <span className="gauge__value">{value.toFixed(decimals)}</span>
        <span className="gauge__unit">{unit}</span>
      </div>
      <div className="gauge__range">
        {min.toFixed(decimals)} – {max.toFixed(decimals)} {unit}
      </div>
      {caption ? <p className="gauge__caption">{caption}</p> : null}
    </div>
  );
}
