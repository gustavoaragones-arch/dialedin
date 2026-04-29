"use client";

import { TechnicalTerm } from "@/components/TechnicalTerm";
import type { NeedleCountScale } from "@/lib/dialedInEngine";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

type Props = {
  scale: NeedleCountScale;
};

export function NeedleCountScaleBlock({ scale }: Props) {
  const t = useTranslations("needleScale");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rng = `${String(scale.overallMin).padStart(2, "0")}–${String(scale.overallMax).padStart(2, "0")}`;
  const bd = scale.bands.detail;
  const st = scale.bands.standard;
  const lg = scale.bands.large;
  const largePlus = lg.openEnded ? "+" : "";

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      document.body.style.overflow = "";
    };
    dlg.addEventListener("close", onClose);
    return () => dlg.removeEventListener("close", onClose);
  }, []);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const lineageKey = `lineage.${scale.lineage}` as
    | "lineage.liner"
    | "lineage.magnum"
    | "lineage.balanced";

  return (
    <>
      <div className="dialed__needle-scale">
        <div className="dialed__needle-scale__head">
          <span className="dialed__needle-scale__range">{rng}</span>{" "}
          <span className="dialed__needle-scale__tag">{t("scalableSuffix")}</span>{" "}
          <button
            type="button"
            className="dialed__needle-scale__logic-btn dialed__link"
            onClick={openModal}
            aria-label={t("scaleLogicLinkAria")}
          >
            [{t("scaleLogicLink")}]
          </button>
        </div>
        <p className="dialed__needle-scale__lineage">{t(lineageKey)}</p>
        <ul className="dialed__needle-scale__bands">
          <li>{t("bandDetail", { low: bd.min, high: bd.max })}</li>
          <li>{t("bandStandard", { low: st.min, high: st.max })}</li>
          <li>
            {t("bandLarge", {
              low: lg.min,
              high: lg.max,
              plus: largePlus,
            })}
          </li>
        </ul>
        <p className="dialed__needle-scale__fill-note">{t("fillNote")}</p>
        {scale.skinTraumaCallout ? (
          <p className="dialed__needle-scale__trauma-inline">
            <strong>{t("traumaTitle")}: </strong>
            {t("traumaInline")}
          </p>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        className="dialed__scale-dialog"
        aria-labelledby="needle-scale-dialog-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeModal();
        }}
      >
        <div className="dialed__scale-dialog__inner">
          <button
            type="button"
            className="dialed__scale-dialog__close"
            onClick={closeModal}
            aria-label={t("modalClose")}
          >
            ×
          </button>
          <h3 id="needle-scale-dialog-title" className="dialed__scale-dialog__title">
            {t("modalTitle")}
          </h3>
          <p className="dialed__muted dialed__needle-scale__intro">{t("modalIntro")}</p>
          <p className="dialed__scale-dialog__body">{t("modalBody")}</p>

          <h4 className="dialed__scale-dialog__sub">{t("bandsHeading")}</h4>
          <ul className="dialed__scale-dialog__bands">
            <li>{t("bandDetail", { low: bd.min, high: bd.max })}</li>
            <li>{t("bandStandard", { low: st.min, high: st.max })}</li>
            <li>
              {t("bandLarge", {
                low: lg.min,
                high: lg.max,
                plus: largePlus,
              })}
            </li>
          </ul>
          <p className="dialed__needle-scale__fill-note">{t("fillNote")}</p>

          <h4 className="dialed__scale-dialog__sub">{t("traumaTitle")}</h4>
          <p className="dialed__scale-dialog__body">{t("traumaBody")}</p>
          <p className="dialed__scale-dialog__glossary">
            <TechnicalTerm termKey="Efficiency vs. Trauma" />
          </p>
        </div>
      </dialog>
    </>
  );
}
