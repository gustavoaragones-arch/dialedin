"use client";

import glossary from "@/lib/technicalHoverStates.json";
import { type ReactNode, useId, useState } from "react";
import { createPortal } from "react-dom";

const GLOSSARY = glossary as Record<string, string>;

/** Case-insensitive match to JSON keys (SLT, TX, #10, …). */
function resolveGlossaryEntry(termKey: string): {
  canonicalKey: string;
  text: string;
} | null {
  const raw = String(termKey).trim();
  if (GLOSSARY[raw]) return { canonicalKey: raw, text: GLOSSARY[raw] };
  const lower = raw.toLowerCase();
  for (const key of Object.keys(GLOSSARY)) {
    if (key.toLowerCase() === lower) {
      return { canonicalKey: key, text: GLOSSARY[key] };
    }
  }
  return null;
}

function canonicalGlossaryKey(matched: string): string {
  const entry = resolveGlossaryEntry(matched);
  return entry?.canonicalKey ?? matched;
}

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

  const entry = resolveGlossaryEntry(String(termKey));
  if (!entry) return <>{children ?? termKey}</>;

  const tipNode =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            id={id}
            role="tooltip"
            className="technical-term__tip technical-term__tip--fixed"
          >
            <strong>{entry.canonicalKey}</strong>
            <p>{entry.text}</p>
          </div>,
          document.body,
        )
      : null;

  return (
    <span className="technical-term">
      {children ?? entry.canonicalKey}
      <button
        type="button"
        className="technical-term__btn"
        aria-describedby={open ? id : undefined}
        aria-label={`Brand bridge glossary: ${entry.canonicalKey}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <InfoIcon />
      </button>
      {tipNode}
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
      if (
        i >= 0 &&
        (idx < 0 || i < idx || (i === idx && k.length > (hit?.length ?? 0)))
      ) {
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
    const canon = canonicalGlossaryKey(hit);
    parts.push(
      <TechnicalTerm key={`${canon}-${idx}-${parts.length}`} termKey={canon}>
        {matched}
      </TechnicalTerm>,
    );
    rest = rest.slice(idx + hit.length);
  }

  return <span className="technical-result">{parts}</span>;
}
