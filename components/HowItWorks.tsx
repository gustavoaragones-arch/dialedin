"use client";

import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("dialedInUi");

  const steps = [
    { titleKey: "step1Title", bodyKey: "step1Body" },
    { titleKey: "step2Title", bodyKey: "step2Body" },
    { titleKey: "step3Title", bodyKey: "step3Body" },
    { titleKey: "step4Title", bodyKey: "step4Body" },
  ] as const;

  return (
    <section className="how-it-works" aria-labelledby="how-it-works-title">
      <h2 id="how-it-works-title" className="how-it-works__title">
        {t("howItWorksStripTitle")}
      </h2>
      <ol className="how-it-works__steps">
        {steps.map((step, i) => (
          <li key={step.titleKey} className="how-it-works__step">
            <span className="how-it-works__num" aria-hidden>
              {i + 1}
            </span>
            <div className="how-it-works__body">
              <h3 className="how-it-works__step-title">{t(step.titleKey)}</h3>
              <p className="how-it-works__step-text">{t(step.bodyKey)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
