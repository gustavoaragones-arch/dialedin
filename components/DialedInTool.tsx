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
import Link from "next/link";
import { HowItWorks } from "./HowItWorks";
import { SelectionInterface } from "./SelectionInterface";
import { HandSpeedSlider } from "./HandSpeedSlider";
import { NeedleHangSlider } from "./NeedleHangSlider";
import { ScienceWarningBanners } from "./ScienceWarningBanners";
import { SweetSpotGauge } from "./SweetSpotGauge";
import { TechnicalResultWithHints, TechnicalTerm } from "./TechnicalTerm";

export function DialedInTool() {
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
      tips.push(
        "Using a 4.2mm stroke for realism requires a very light hand — let needle work do the heavy lifting.",
      );
    }
    if (voltage?.longStrokeSoftShadingGuard) {
      tips.push(
        "Long stroke (4.0mm+) with Soft Shading: baseline voltage is reduced by 1.5V to limit skin trauma.",
      );
    }
    if (
      state.needleHangMm >= 2.0 &&
      engineTechniqueName &&
      /shading|realism|portrait/i.test(engineTechniqueName)
    ) {
      tips.push(
        "Higher hanging with soft techniques: float the needle and watch ink saturation — avoid over-driving voltage.",
      );
    }
    return tips;
  }, [activeStrokeMm, engineTechniqueName, voltage, state.needleHangMm]);

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
        <p className="dialed__eyebrow">
          Tattoo setup ·{" "}
          <Link className="dialed__link" href="/science">
            Scientific methodology
          </Link>
          {" · "}
          <Link className="dialed__link" href="/blog">
            Technical blog
          </Link>
        </p>
        <h1 className="dialed__title">DIALED-IN</h1>
        <p className="dialed__lede">
          Master your machine, no matter the brand. Get pro-level voltage, needle, and setup guidance for your style—designed for artists who value precision over hype.
        </p>
      </header>

      <HowItWorks />

      <div className="dialed__grid">
        <section className="dialed__panel" aria-label="Inputs">
          <h2 className="dialed__h2">Inputs</h2>

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
            <span>3 · Select Machine Library</span>
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
                {machinesLoading ? "Loading machines…" : "Select machine…"}
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
                Recommended stroke baseline for {selectedTaxonomy.styleName}:{" "}
                {selectedTaxonomy.idealStrokeMm.toFixed(1)} mm — when you pick a
                machine, stroke snaps to the closest available option.
              </p>
            ) : null}
          </label>

          {machine && strokeOptionsSorted.length > 1 ? (
            <label className="dialed__field">
              <span>Stroke length (global)</span>
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

        <section className="dialed__panel dialed__panel--out" aria-label="Output dashboard">
          {engine ? (
            <ScienceWarningBanners checks={engine.safety_trigger.checks} />
          ) : null}

          <h2 className="dialed__h2 dialed__h2--gauges">
            Output Dashboard (Recommended)
          </h2>

          {selectedTaxonomy?.technicalFocus && machine ? (
            <div className="dialed__goal" role="region" aria-label="Setup goal">
              <p className="dialed__goal__kicker">Goal</p>
              <p className="dialed__goal__text">{selectedTaxonomy.technicalFocus}</p>
            </div>
          ) : null}

          <div className="dialed__gauges-shell">
            <div className="dialed__gauges dialed__gauges--stable-row">
              {gaugePack && machine ? (
                <>
                  <div className="dialed__voltage-column">
                    <SweetSpotGauge
                      label="Voltage"
                      value={gaugePack.volts}
                      min={gaugePack.voltMin}
                      max={gaugePack.voltMax}
                      unit="V"
                      badge={
                        acusHzFirst
                          ? "Power supply reference"
                          : adaptedVolt
                            ? "Adapted range"
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
                        <p className="dialed__adaptive-mismatch__title">Lesson</p>
                        <p className="dialed__adaptive-mismatch__body">
                          DialedIn has adapted your voltage for a{" "}
                          {activeStrokeMm.toFixed(1)}mm stroke. For{" "}
                          {selectedTaxonomy.styleName}, the industry standard is{" "}
                          {selectedTaxonomy.idealStrokeMm.toFixed(1)}mm to ensure
                          optimal saturation without skin trauma.
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <SweetSpotGauge
                    label={
                      acusHzFirst
                        ? "Hertz (Hz) — primary control"
                        : "Hertz (Hz) — supply / readout band"
                    }
                    value={gaugePack.hz}
                    min={gaugePack.hzMin}
                    max={gaugePack.hzMax}
                    unit="Hz"
                    decimals={0}
                    badge={acusHzFirst ? "Primary readout" : undefined}
                    emphasis={acusHzFirst ? "primary" : "default"}
                    caption={
                      acusHzFirst
                        ? "For ACUS, treat Hz as the main operating readout; voltage is a bench supply reference into that band."
                        : "Heuristic band tied to voltage—similar to how many bench supplies frame the drive readout."
                    }
                  />
                  <SweetSpotGauge
                    label="Cycles Per Second (CPS)"
                    value={gaugePack.cps}
                    min={gaugePack.cpsMin}
                    max={gaugePack.cpsMax}
                    unit="CPS"
                    decimals={0}
                    caption="CPS = round((final volts × 1000) ÷ 60)—a scalar teaching view of how hard the pack is being driven after hand-speed offset and clamp."
                  />
                </>
              ) : (
                <p className="dialed__placeholder dialed__placeholder--gauges">
                  Select style, technique, and machine to load recommended
                  readouts and gauges.
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
              <dt>Selected stroke (global)</dt>
              <dd className="dialed__kv-value">
                {machine
                  ? `${activeStrokeMm.toFixed(1)} mm`
                  : "—"}
              </dd>
            </div>
            {selectedTaxonomy ? (
              <div>
                <dt>Style baseline (ideal stroke)</dt>
                <dd className="dialed__kv-value">
                  {selectedTaxonomy.idealStrokeMm.toFixed(1)} mm
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="dialed__cartridge-section">
            <h3 className="dialed__h3">Cartridge Configuration</h3>
            <dl className="dialed__kv dialed__kv--cartridge">
              <div>
                <dt>Recommended Grouping</dt>
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
                <dt>
                  <TechnicalTerm termKey="SLT">SLT</TechnicalTerm> context
                </dt>
                <dd className="dialed__kv-value dialed__muted">
                  Brand bridge equivalents (
                  <TechnicalTerm termKey="SLT">SLT</TechnicalTerm>,{" "}
                  <TechnicalTerm termKey="#10">#10</TechnicalTerm>,{" "}
                  <TechnicalTerm termKey="TX">TX</TechnicalTerm>) appear in
                  glossary hovers on matching cartridge copy — main UI stays
                  standard-first.
                </dd>
              </div>
              {engine ? (
                <>
                  <div>
                    <dt>Needle diameter</dt>
                    <dd className="dialed__kv-value">
                      <TechnicalResultWithHints
                        text={engine.needle_diameter_range}
                      />
                    </dd>
                  </div>
                  <div>
                    <dt>Needle count</dt>
                    <dd className="dialed__kv-value">
                      <TechnicalResultWithHints
                        text={engine.needle_count_range}
                      />
                    </dd>
                  </div>
                  <div>
                    <dt>Taper</dt>
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
                    ? "Adapted voltage band (Setup Engine)"
                    : "Machine voltage envelope"}
                </dt>
                <dd className="dialed__kv-value">
                  {adaptedVolt ? (
                    <>
                      Operating band {adaptedVolt.adaptedMin.toFixed(1)} –{" "}
                      {adaptedVolt.adaptedMax.toFixed(1)} V (3.5 mm pivot offset{" "}
                      {adaptedVolt.modifierV >= 0 ? "+" : ""}
                      {adaptedVolt.modifierV.toFixed(1)} V).{" "}
                    </>
                  ) : null}
                  Machine baseline {voltage.baselineVolts.toFixed(1)} V →
                  soft-guard / stroke adjusted {voltage.adjustedVolts.toFixed(1)}{" "}
                  V
                  {voltage.longStrokeSoftShadingGuard
                    ? " (long-stroke soft shading guard active)"
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
                    devJsonOpen
                      ? "Hide raw setup data"
                      : "Show raw setup data (JSON)"
                  }
                >
                  {devJsonOpen
                    ? "Hide technical detail"
                    : "Show technical detail"}
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
            <aside className="dialed__protips" aria-label="Pro tips">
              <h3 className="dialed__h3">Pro tips</h3>
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
