"use client";

import type { ScienceCheck } from "@/lib/dialedInEngine";
import { useTranslations } from "next-intl";

type Props = {
  checks: ScienceCheck[];
};

/** High-visibility amber / black authority banners above the result dashboard. */
export function ScienceWarningBanners({ checks }: Props) {
  const t = useTranslations("scienceBanners");

  if (checks.length === 0) return null;

  return (
    <div className="science-banners" role="region" aria-label="Scientific safety checks">
      {checks.map((c) => (
        <div
          key={c.code}
          className={`science-banner science-banner--${c.severity}`}
          role="alert"
        >
          <span className="science-banner__icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4m0 4h.01M12 3L2 21h20L12 3z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="science-banner__body">
            <strong className="science-banner__title">
              {t(`title.${c.code}`)}
            </strong>
            <p className="science-banner__msg">{t(`message.${c.code}`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
