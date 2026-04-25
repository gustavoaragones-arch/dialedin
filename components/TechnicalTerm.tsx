"use client";

import glossary from "@/lib/technicalHoverStates.json";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const GLOSSARY = glossary as Record<string, string>;

const TIP_PAD = 12;
const TIP_GAP = 10;

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

function positionTip(
  btn: DOMRect,
  tip: DOMRect,
): { top: number; left: number } {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const h = tip.height;
  const w = tip.width;
  const cx = btn.left + btn.width / 2;

  let top = btn.top - TIP_GAP - h;
  if (top < TIP_PAD) {
    top = btn.bottom + TIP_GAP;
  }
  if (top + h > vh - TIP_PAD) {
    top = Math.max(TIP_PAD, vh - TIP_PAD - h);
  }

  const half = w / 2;
  const left = Math.min(vw - TIP_PAD - half, Math.max(TIP_PAD + half, cx));

  return { top, left };
}

export function TechnicalTerm({ termKey, children }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const [tipPos, setTipPos] = useState<{ top: number; left: number } | null>(
    null,
  );

  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current != null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
      setTipPos(null);
    }, 220);
  }, [cancelCloseTimer]);

  useEffect(() => () => cancelCloseTimer(), [cancelCloseTimer]);

  const updateCoords = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    const tip = tipRef.current;
    if (!tip) return;
    const br = el.getBoundingClientRect();
    const tr = tip.getBoundingClientRect();
    if (tr.height < 4) return;
    setTipPos(positionTip(br, tr));
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setTipPos(null);
      return;
    }
    const tip = tipRef.current;
    const btn = btnRef.current;
    if (!tip || !btn) return;

    const run = () => {
      const b = btnRef.current;
      const t = tipRef.current;
      if (!b || !t) return;
      const br = b.getBoundingClientRect();
      const tr = t.getBoundingClientRect();
      if (tr.height < 4) return;
      setTipPos(positionTip(br, tr));
    };

    run();
    const raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [open, termKey]);

  useEffect(() => {
    if (!open) return;
    const onScrollOrResize = () => updateCoords();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updateCoords]);

  const syncOpen = useCallback(() => {
    cancelCloseTimer();
    setTipPos(null);
    setOpen(true);
  }, [cancelCloseTimer]);

  const entry = resolveGlossaryEntry(String(termKey));
  if (!entry) return <>{children ?? termKey}</>;

  const tipNode =
    open && typeof document !== "undefined" ? (
      createPortal(
        <div
          ref={tipRef}
          id={id}
          role="tooltip"
          className="technical-term__tip technical-term__tip--portal"
          style={{
            position: "fixed",
            left: tipPos?.left ?? -9999,
            top: tipPos?.top ?? 0,
            transform: "translateX(-50%)",
            opacity: tipPos == null ? 0 : 1,
            pointerEvents: tipPos == null ? "none" : "auto",
          }}
          onMouseEnter={cancelCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <strong>{entry.canonicalKey}</strong> — {entry.text}
        </div>,
        document.body,
      )
    ) : null;

  return (
    <span className="technical-term">
      {children ?? entry.canonicalKey}
      <button
        ref={btnRef}
        type="button"
        className="technical-term__btn"
        aria-describedby={open ? id : undefined}
        aria-label={`Brand bridge glossary: ${entry.canonicalKey}`}
        onMouseEnter={() => {
          syncOpen();
        }}
        onMouseLeave={scheduleClose}
        onFocus={() => {
          syncOpen();
        }}
        onBlur={() => {
          cancelCloseTimer();
          setOpen(false);
          setTipPos(null);
        }}
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
