"use client";

import { useTranslations } from "next-intl";

/**
 * Scientific methodology copy (tattoomachinesetup.com authority layer).
 */
export function ScienceMethodologyContent() {
  const t = useTranslations("scienceArticle");

  return (
    <article className="science-article">
      <section className="science-section" id="relational-physics">
        <h2>{t("universalMachinePhysics.h2")}</h2>
        <p>{t("universalMachinePhysics.p1")}</p>
        <p>{t("universalMachinePhysics.p2")}</p>
      </section>

      <section className="science-section" id="stroke-cycle">
        <h2>{t("strokeCycle.h2")}</h2>
        <p>{t("strokeCycle.p1")}</p>
        <p>{t("strokeCycle.p2")}</p>
      </section>

      <section className="science-section" id="acus-paradigm">
        <h2>{t("acusParadigm.h2")}</h2>
        <p>{t("acusParadigm.p1")}</p>
        <p>{t("acusParadigm.p2")}</p>
      </section>

      <section className="science-section" id="taper-geometry">
        <h2>{t("needleTaper.h2")}</h2>
        <p>{t("needleTaper.p1")}</p>
        <p>{t("needleTaper.p2")}</p>
      </section>

      <section className="science-section" id="gauge-tension">
        <h2>{t("gaugeTension.h2")}</h2>
        <p>{t("gaugeTension.p1")}</p>
        <p>{t("gaugeTension.p2")}</p>
      </section>
    </article>
  );
}
