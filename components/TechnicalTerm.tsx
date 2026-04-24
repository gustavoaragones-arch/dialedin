"use client";

import glossary from "@/lib/technicalHoverStates.json";
import { type ReactNode, useId, useState } from "react";

const GLOSSARY = glossary as Record<string, string>;

function InfoIcon() {
  return (
    <svg
      className="technical-term__icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 16v-5M12 8h.01"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

type Props = {
  termKey: keyof typeof GLOSSARY | string;
  children?: ReactNode;
};

export function TechnicalTerm({ termKey, children }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const text = GLOSSARY[termKey as string];
  if (!text) return <>{children ?? termKey}</>;

  return (
    <span className="technical-term">
      {children ?? termKey}
      <button
        type="button"
        className="technical-term__btn"
        aria-describedby={open ? id : undefined}
        aria-label={`Glossary: ${termKey}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <InfoIcon />
      </button>
      {open ? (
        <span id={id} role="tooltip" className="technical-term__tip">
          <strong>{termKey}</strong> — {text}
        </span>
      ) : null}
    </span>
  );
}

/**
 * Renders technical copy with glossary-linked info icons (case-insensitive token match).
 */
export function TechnicalResultWithHints({ text }: { text: string }) {
  const keys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  const parts: ReactNode[] = [];
  let rest = text;
  let guard = 0;

  while (rest.length > 0 && guard++ < 80) {
    let hit: string | null = null;
    let idx = -1;
    const restLower = rest.toLowerCase();

    for (const k of keys) {
      const i = restLower.indexOf(k.toLowerCase());
      if (i >= 0 && (idx < 0 || i < idx || (i === idx && k.length > (hit?.length ?? 0)))) {
        idx = i;
        hit = k;
      }
    }

    if (hit === null || idx < 0) {
      parts.push(rest);
      break;
    }

    if (idx > 0) {
      parts.push(rest.slice(0, idx));
    }

    const matched = rest.slice(idx, idx + hit.length);
    parts.push(
      <TechnicalTerm key={`${hit}-${idx}-${parts.length}`} termKey={hit}>
        {matched}
      </TechnicalTerm>,
    );
    rest = rest.slice(idx + hit.length);
  }

  return <span className="technical-result">{parts}</span>;
}
