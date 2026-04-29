"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  closestStrokeOptionMm,
  computeVoltageOutput,
  frequencySweetSpotFromVoltage,
  needleHangMaxMm,
  resolveActiveStrokeMm,
} from "@/lib/dialedInData";
import { buildAdaptedVoltRange } from "@/lib/adaptiveVoltage";
import { engineTechniqueNameForSelection } from "@/lib/engineTechniqueMap";
import { isAcusFrequencyFirstBrand } from "@/lib/machineBrand";
import { dialedInEngineToJson, evaluateDialedInEngine } from "@/lib/dialedInEngine";
import { useDialedIn } from "@/components/DialedInProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { HowItWorks } from "./HowItWorks";
import { SelectionInterface } from "./SelectionInterface";
import { HandSpeedSlider } from "./HandSpeedSlider";
import { NeedleHangSlider } from "./NeedleHangSlider";
import { ScienceWarningBanners } from "./ScienceWarningBanners";
import { SweetSpotGauge } from "./SweetSpotGauge";
import { TechnicalResultWithHints } from "./TechnicalTerm";

export function DialedInTool() {
  const tNav = useTranslations("nav");
  const tUi = useTranslations("dialedInUi");
  const [developerModeEnabled, setDeveloperModeEnabled] = useState(false);
  const [devJsonOpen, setDevJsonOpen] = useState(false);
  const {
    state,
    dispatch,
    machines,
    machinesLoading,
    machinesError,
    machine,
    selectedTaxonomy,
    taxonomyStyleOptions,
    tuTaxonomyByStyleName,
    tuTaxonomyLoading,
    tuTaxonomyError,
  } = useDialedIn();

  const activeStrokeMm = useMemo(
    () => resolveActiveStrokeMm(machine, state.selectedStrokeMm),
    [machine, state.selectedStrokeMm],
  );

  const needleHangMaxMmValue = useMemo(
    () => needleHangMaxMm(machine ?? null, state.selectedStrokeMm),
    [machine, state.selectedStrokeMm],
  );

  const adaptedVolt = useMemo(() => {
    if (!selectedTaxonomy) return null;
    return buildAdaptedVoltRange(
      selectedTaxonomy.voltMin,
      selectedTaxonomy.voltMax,
      activeStrokeMm,
    );
  }, [selectedTaxonomy, activeStrokeMm]);

  const engineTechniqueName = useMemo(() => {
    if (!state.selectedStyleName || !state.techniqueSlot) return null;
    return engineTechniqueNameForSelection(
      state.selectedStyleName,
      state.techniqueSlot,
    );
  }, [state.selectedStyleName, state.techniqueSlot]);

  const voltEnvelopeForEngine = useMemo(() => {
    if (!machine) return null;
    if (adaptedVolt) {
      return {
        min: adaptedVolt.adaptedMin,
        max: adaptedVolt.adaptedMax,
        baseline: (adaptedVolt.adaptedMin + adaptedVolt.adaptedMax) / 2,
      };
    }
    return machine.defaultVoltRange;
  }, [machine, adaptedVolt]);

  const engine = useMemo(() => {
    if (
      !machine ||
      !state.selectedStyleName ||
      !state.techniqueSlot ||
      !engineTechniqueName ||
      !voltEnvelopeForEngine
    ) {
      return null;
    }
    return evaluateDialedInEngine(
      {
        strokeMm: activeStrokeMm,
        technique: engineTechniqueName,
        style: selectedTaxonomy?.styleName ?? state.selectedStyleName,
        handSpeed: state.handSpeed,
        machineTier: machine.tier,
      },
      { voltEnvelope: voltEnvelopeForEngine },
    );
  }, [
    machine,
    state.selectedStyleName,
    selectedTaxonomy?.styleName,
    state.techniqueSlot,
    engineTechniqueName,
    state.handSpeed,
    activeStrokeMm,
    voltEnvelopeForEngine,
  ]);

  const voltage = useMemo(
    () =>
      computeVoltageOutput(
        machine,
        engineTechniqueName,
        activeStrokeMm,
      ),
    [machine, engineTechniqueName, activeStrokeMm],
  );

  const gaugePack = useMemo(() => {
    if (!machine || !voltEnvelopeForEngine) return null;
    const v = engine?.voltage_baseline ?? voltage?.adjustedVolts;
    if (v == null) return null;
    if (engine) {
      return {
        volts: engine.voltage_baseline,
        hz: engine.hz_derived,
        hzMin: engine.hz_band_min,
        hzMax: engine.hz_band_max,
        cps: engine.cps_derived,
        cpsMin: engine.cps_band_min,
        cpsMax: engine.cps_band_max,
        voltMin: voltEnvelopeForEngine.min,
        voltMax: voltEnvelopeForEngine.max,
      };
    }
    const f = frequencySweetSpotFromVoltage(v, voltEnvelopeForEngine);
    return {
      volts: v,
      hz: Math.round(f.hz * 10) / 10,
      hzMin: f.hzMin,
      hzMax: f.hzMax,
      cps: Math.round(f.cps_derived * 10) / 10,
      cpsMin: f.cpsMin,
      cpsMax: f.cpsMax,
      voltMin: voltEnvelopeForEngine.min,
      voltMax: voltEnvelopeForEngine.max,
    };
  }, [machine, engine, voltage, voltEnvelopeForEngine]);

  /** Educational “lesson” when machine stroke ≠ style ideal (drives adapted band). */
  const showLessonBanner = useMemo(() => {
    if (!selectedTaxonomy || !machine) return false;
    return (
      Math.abs(activeStrokeMm - selectedTaxonomy.idealStrokeMm) > 0.01
    );
  }, [selectedTaxonomy, activeStrokeMm, machine]);

  const proTips = useMemo(() => {
    const tips: string[] = [];
    const stroke = activeStrokeMm;
    if (stroke >= 4.2 && engineTechniqueName === "Black & Grey Realism") {
      tips.push(tUi("proTipRealism"));
    }
    if (voltage?.longStrokeSoftShadingGuard) {
      tips.push(tUi("proTipLongStroke"));
    }
    if (
      state.needleHangMm >= 2.0 &&
      engineTechniqueName &&
      /shading|realism|portrait/i.test(engineTechniqueName)
    ) {
      tips.push(tUi("proTipHang"));
    }
    return tips;
  }, [
    activeStrokeMm,
    engineTechniqueName,
    voltage,
    state.needleHangMm,
    tUi,
  ]);

  const strokeOptionsSorted = useMemo(() => {
    if (!machine) return [];
    return [...machine.strokeOptionsMm].sort((a, b) => a - b);
  }, [machine]);

  const acusHzFirst = useMemo(
    () => isAcusFrequencyFirstBrand(machine?.brand),
    [machine?.brand],
  );

  const strokeSnapSigRef = useRef<string>("");
  const strokeSnapSig = `${state.selectedStyleName ?? ""}|${machine?.id ?? ""}|${selectedTaxonomy?.idealStrokeMm ?? ""}`;

  /** Snap stroke to style ideal only when style / machine / ideal identity changes (not on manual stroke tweaks). */
  useEffect(() => {
    if (strokeSnapSig === strokeSnapSigRef.current) return;
    strokeSnapSigRef.current = strokeSnapSig;
    if (!machine || !selectedTaxonomy) return;
    const ideal = selectedTaxonomy.idealStrokeMm;
    const closest = closestStrokeOptionMm(machine.strokeOptionsMm, ideal);
    if (closest == null) return;
    dispatch({ type: "SET_SELECTED_STROKE_MM", strokeMm: closest });
  }, [strokeSnapSig, machine, selectedTaxonomy, dispatch]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Hidden developer-mode gate: Cmd/Ctrl+Shift+D
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "d") {
        setDeveloperModeEnabled((v) => !v);
        setDevJsonOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="dialed">
      <header className="dialed__header">
        <p className="dialed__eyebrow dialed__eyebrow--nav">
          <Link className="dialed__link" href="/">
            {tNav("setupTool")}
          </Link>
          {" · "}
          <Link className="dialed__link" href="/how-it-works">
            {tNav("howItWorks")}
          </Link>
          {" · "}
          <Link className="dialed__link" href="/science">
            {tNav("science")}
          </Link>
          {" · "}
          <Link className="dialed__link" href="/blog">
            {tNav("blog")}
          </Link>
          {" · "}
          <LocaleSwitcher />
        </p>
        <h1 className="dialed__title">DIALED-IN</h1>
        <p className="dialed__lede">{tUi("heroLede")}</p>
      </header>

      <HowItWorks />

      <div className="dialed__grid">
        <section className="dialed__panel" aria-label={tUi("inputsAriaLabel")}>
          <h2 className="dialed__h2">{tUi("inputsHeading")}</h2>

          <SelectionInterface
            taxonomyStyleOptions={taxonomyStyleOptions}
            tuTaxonomyByStyleName={tuTaxonomyByStyleName}
            taxonomyLoading={tuTaxonomyLoading}
            taxonomyError={tuTaxonomyError}
            selectedStyleName={state.selectedStyleName}
            onStyleNameChange={(name) =>
              dispatch({ type: "SET_STYLE", styleName: name })
            }
            techniqueSlot={state.techniqueSlot}
            onTechniqueSlotChange={(slot) =>
              dispatch({ type: "SET_TECHNIQUE_SLOT", slot })
            }
            highlightedSlot={state.highlightedTechniqueSlot}
          />

          <label className="dialed__field">
            <span>{tUi("machineLibraryLabel")}</span>
            <select
              className="dialed__select"
              value={state.machineId ?? ""}
              disabled={machinesLoading && !state.selectedStyleName}
              onChange={(e) =>
                dispatch({
                  type: "SET_MACHINE",
                  machineId: e.target.value || null,
                  idealStrokeMm: selectedTaxonomy?.idealStrokeMm ?? null,
                })
              }
            >
              <option value="">
                {machinesLoading ? tUi("loadingMachines") : tUi("selectMachine")}
              </option>
              {machines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.brand} - {m.model}
                </option>
              ))}
            </select>
            {machinesError ? (
              <p className="dialed__error" role="alert">
                {machinesError}
              </p>
            ) : null}
            {selectedTaxonomy ? (
              <p className="dialed__hint">
                {tUi("strokeBaselineHint", {
                  style: selectedTaxonomy.styleDisplayName,
                  mm: selectedTaxonomy.idealStrokeMm.toFixed(1),
                })}
              </p>
            ) : null}
          </label>

          {machine && strokeOptionsSorted.length > 1 ? (
            <label className="dialed__field">
              <span>{tUi("strokeLengthLabel")}</span>
              <select
                className="dialed__select"
                value={String(
                  state.selectedStrokeMm ??
                    resolveActiveStrokeMm(machine, null),
                )}
                onChange={(e) =>
                  dispatch({
                    type: "SET_SELECTED_STROKE_MM",
                    strokeMm: Number(e.target.value),
                  })
                }
              >
                {strokeOptionsSorted.map((mm) => (
                  <option key={mm} value={mm}>
                    {mm.toFixed(1)} mm
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <HandSpeedSlider
            value={state.handSpeed}
            onChange={(handSpeed) =>
              dispatch({ type: "SET_HAND_SPEED", handSpeed })
            }
          />
        </section>

        <section
          className="dialed__panel dialed__panel--out"
          aria-label={tUi("outputAriaLabel")}
        >
          {engine ? (
            <ScienceWarningBanners checks={engine.safety_trigger.checks} />
          ) : null}

          <h2 className="dialed__h2 dialed__h2--gauges">
            {tUi("outputHeading")}
          </h2>
          <p className="dialed__tool-guardrail" role="note">
            {tUi("toolGuardrail")}
          </p>

          {selectedTaxonomy?.technicalFocus && machine ? (
            <div
              className="dialed__goal"
              role="region"
              aria-label={tUi("goalAriaLabel")}
            >
              <p className="dialed__goal__kicker">{tUi("goalKicker")}</p>
              <p className="dialed__goal__text">{selectedTaxonomy.technicalFocus}</p>
            </div>
          ) : null}

          <div className="dialed__gauges-shell">
            <div className="dialed__gauges dialed__gauges--stable-row">
              {gaugePack && machine ? (
                <>
                  <div className="dialed__voltage-column">
                    <SweetSpotGauge
                      label={tUi("voltageLabel")}
                      value={gaugePack.volts}
                      min={gaugePack.voltMin}
                      max={gaugePack.voltMax}
                      unit="V"
                      badge={
                        acusHzFirst
                          ? tUi("badgePowerSupplyRef")
                          : adaptedVolt
                            ? tUi("badgeAdaptedRange")
                            : undefined
                      }
                      emphasis={acusHzFirst ? "muted" : "default"}
                    />
                    {showLessonBanner && selectedTaxonomy ? (
                      <div
                        className="dialed__lesson-banner dialed__adaptive-mismatch"
                        role="status"
                        aria-live="polite"
                      >
                        <p className="dialed__adaptive-mismatch__title">
                          {tUi("lessonTitle")}
                        </p>
                        <p className="dialed__adaptive-mismatch__body">
                          {tUi("lessonBody", {
                            currentStroke: activeStrokeMm.toFixed(1),
                            style: selectedTaxonomy.styleDisplayName,
                            idealStroke:
                              selectedTaxonomy.idealStrokeMm.toFixed(1),
                          })}
                        </p>
                        <p className="dialed__adaptive-mismatch__bridge">
                          <Link
                            className="dialed__link dialed__adaptive-mismatch__bridge-link"
                            href="/blog/stroke-physics"
                          >
                            {tUi("lessonLink")}
                          </Link>
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <SweetSpotGauge
                    label={
                      acusHzFirst ? tUi("hzPrimary") : tUi("hzSupplyBand")
                    }
                    value={gaugePack.hz}
                    min={gaugePack.hzMin}
                    max={gaugePack.hzMax}
                    unit="Hz"
                    decimals={0}
                    badge={
                      acusHzFirst ? tUi("hzBadgePrimary") : undefined
                    }
                    emphasis={acusHzFirst ? "primary" : "default"}
                    caption={
                      acusHzFirst
                        ? tUi("hzCaptionAcus")
                        : tUi("hzCaptionOther")
                    }
                  />
                  <SweetSpotGauge
                    label={tUi("cpsLabel")}
                    value={gaugePack.cps}
                    min={gaugePack.cpsMin}
                    max={gaugePack.cpsMax}
                    unit="CPS"
                    decimals={0}
                    caption={tUi("cpsCaption")}
                  />
                </>
              ) : (
                <p className="dialed__placeholder dialed__placeholder--gauges">
                  {tUi("gaugePlaceholder")}
                </p>
              )}
            </div>
          </div>

          <NeedleHangSlider
            valueMm={state.needleHangMm}
            maxMm={needleHangMaxMmValue}
            onChange={(mm) => dispatch({ type: "SET_NEEDLE_HANG", mm })}
          />

          <dl className="dialed__kv">
            <div>
              <dt>{tUi("selectedStrokeDt")}</dt>
              <dd className="dialed__kv-value">
                {machine
                  ? `${activeStrokeMm.toFixed(1)} mm`
                  : "—"}
              </dd>
            </div>
            {selectedTaxonomy ? (
              <div>
                <dt>{tUi("styleBaselineDt")}</dt>
                <dd className="dialed__kv-value">
                  {selectedTaxonomy.idealStrokeMm.toFixed(1)} mm
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="dialed__cartridge-section">
            <h3 className="dialed__h3">{tUi("cartridgeConfigHeading")}</h3>
            <dl className="dialed__kv dialed__kv--cartridge">
              <div>
                <dt>{tUi("recommendedGroupingDt")}</dt>
                <dd className="dialed__kv-value dialed__kv-value--cartridge">
                  {selectedTaxonomy?.idealNeedleRange ? (
                    <span className="dialed__kv-value__inner">
                      <TechnicalResultWithHints
                        text={selectedTaxonomy.idealNeedleRange}
                      />
                    </span>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt>{tUi("sltContextDt")}</dt>
                <dd className="dialed__kv-value dialed__muted">
                  {tUi("sltContextBody")}
                </dd>
              </div>
              {engine ? (
                <>
                  <div>
                    <dt>{tUi("needleDiameterDt")}</dt>
                    <dd className="dialed__kv-value">
                      <TechnicalResultWithHints
                        text={engine.needle_diameter_range}
                      />
                    </dd>
                  </div>
                  <div>
                    <dt>{tUi("needleCountDt")}</dt>
                    <dd className="dialed__kv-value">
                      <TechnicalResultWithHints
                        text={engine.needle_count_range}
                      />
                    </dd>
                  </div>
                  <div>
                    <dt>{tUi("taperDt")}</dt>
                    <dd className="dialed__kv-value">
                      <TechnicalResultWithHints
                        text={engine.taper_recommendation}
                      />
                    </dd>
                  </div>
                </>
              ) : null}
            </dl>
          </div>

          {voltage ? (
            <dl className="dialed__kv dialed__kv--footer">
              <div>
                <dt>
                  {adaptedVolt
                    ? tUi("adaptedVoltageDt")
                    : tUi("machineVoltageDt")}
                </dt>
                <dd className="dialed__kv-value">
                  {adaptedVolt ? (
                    <>
                      {tUi("voltDetailAdapted", {
                        vmin: adaptedVolt.adaptedMin.toFixed(1),
                        vmax: adaptedVolt.adaptedMax.toFixed(1),
                        mod: `${adaptedVolt.modifierV >= 0 ? "+" : ""}${adaptedVolt.modifierV.toFixed(1)}`,
                      })}
                    </>
                  ) : null}
                  {tUi("voltDetailBaseline", {
                    baseline: voltage.baselineVolts.toFixed(1),
                    adj: voltage.adjustedVolts.toFixed(1),
                  })}
                  {voltage.longStrokeSoftShadingGuard
                    ? tUi("longStrokeGuardSuffix")
                    : ""}
                </dd>
              </div>
            </dl>
          ) : null}

          {engine && developerModeEnabled ? (
            <>
              <div className="dialed__detail-actions">
                <button
                  type="button"
                  className="dialed__dev-toggle"
                  onClick={() => setDevJsonOpen((o) => !o)}
                  aria-expanded={devJsonOpen}
                  aria-label={
                    devJsonOpen ? tUi("devAriaHide") : tUi("devAriaShow")
                  }
                >
                  {devJsonOpen ? tUi("devHideDetail") : tUi("devShowDetail")}
                </button>
              </div>
              {devJsonOpen ? (
                <pre className="dialed__json" tabIndex={0}>
                  {dialedInEngineToJson(engine)}
                </pre>
              ) : null}
            </>
          ) : null}

          {proTips.length > 0 ? (
            <aside
              className="dialed__protips"
              aria-label={tUi("proTipsAriaLabel")}
            >
              <h3 className="dialed__h3">{tUi("proTipsHeading")}</h3>
              <ul>
                {proTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </aside>
          ) : null}
        </section>
      </div>
    </div>
  );
}
