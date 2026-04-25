"use client";

import { useMemo, useState } from "react";
import {
  computeVoltageOutput,
  frequencySweetSpotFromVoltage,
  needleHangMaxMm,
  resolveActiveStrokeMm,
} from "@/lib/dialedInData";
import { isAcusFrequencyFirstBrand } from "@/lib/machineBrand";
import { dialedInEngineToJson, evaluateDialedInEngine } from "@/lib/dialedInEngine";
import { useDialedIn } from "@/components/DialedInProvider";
import Link from "next/link";
import { HowItWorks } from "./HowItWorks";
import { HandSpeedSlider } from "./HandSpeedSlider";
import { NeedleHangSlider } from "./NeedleHangSlider";
import { ScienceWarningBanners } from "./ScienceWarningBanners";
import { SweetSpotGauge } from "./SweetSpotGauge";
import { TechnicalResultWithHints, TechnicalTerm } from "./TechnicalTerm";

export function DialedInTool() {
  const [devJsonOpen, setDevJsonOpen] = useState(false);
  const {
    state,
    dispatch,
    machines,
    machinesLoading,
    machinesError,
    styles,
    techniques,
    machine,
    style,
    technique,
  } = useDialedIn();

  const activeStrokeMm = useMemo(
    () => resolveActiveStrokeMm(machine, state.selectedStrokeMm),
    [machine, state.selectedStrokeMm],
  );

  const needleHangMaxMmValue = useMemo(
    () => needleHangMaxMm(machine ?? null, state.selectedStrokeMm),
    [machine, state.selectedStrokeMm],
  );

  const engine = useMemo(() => {
    if (!machine || !style || !technique) return null;
    return evaluateDialedInEngine(
      {
        strokeMm: activeStrokeMm,
        technique: technique.name,
        style: style.styleName,
        handSpeed: state.handSpeed,
      },
      { voltEnvelope: machine.defaultVoltRange },
    );
  }, [machine, style, technique, state.handSpeed, activeStrokeMm]);

  const voltage = useMemo(
    () =>
      computeVoltageOutput(
        machine,
        technique?.name ?? null,
        activeStrokeMm,
      ),
    [machine, technique, activeStrokeMm],
  );

  const gaugePack = useMemo(() => {
    if (!machine) return null;
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
      };
    }
    const f = frequencySweetSpotFromVoltage(v, machine.defaultVoltRange);
    return {
      volts: v,
      hz: Math.round(f.hz * 10) / 10,
      hzMin: f.hzMin,
      hzMax: f.hzMax,
      cps: Math.round(f.cps_derived * 10) / 10,
      cpsMin: f.cpsMin,
      cpsMax: f.cpsMax,
    };
  }, [machine, engine, voltage]);

  const proTips = useMemo(() => {
    const tips: string[] = [];
    const stroke = activeStrokeMm;
    if (stroke >= 4.2 && technique?.name === "Black & Grey Realism") {
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
      technique &&
      /shading|realism|portrait/i.test(technique.name)
    ) {
      tips.push(
        "Higher hanging with soft techniques: float the needle and watch ink saturation — avoid over-driving voltage.",
      );
    }
    return tips;
  }, [activeStrokeMm, technique, voltage, state.needleHangMm]);

  const strokeOptionsSorted = useMemo(() => {
    if (!machine) return [];
    return [...machine.strokeOptionsMm].sort((a, b) => a - b);
  }, [machine]);

  const acusHzFirst = useMemo(
    () => isAcusFrequencyFirstBrand(machine?.brand),
    [machine?.brand],
  );

  return (
    <div className="dialed">
      <header className="dialed__header">
        <p className="dialed__eyebrow">
          Tattoo setup ·{" "}
          <Link className="dialed__link" href="/science">
            Scientific methodology
          </Link>
        </p>
        <h1 className="dialed__title">DIALED-IN</h1>
        <p className="dialed__lede">
          Stop guessing your tattoo machine settings. Pick your style and
          machine to instantly find the perfect voltage, needle grouping, and
          technique for every session.
        </p>
      </header>

      <HowItWorks />

      <div className="dialed__grid">
        <section className="dialed__panel" aria-label="Inputs">
          <h2 className="dialed__h2">Inputs</h2>

          <label className="dialed__field">
            <span>1 · Style</span>
            <select
              className="dialed__select"
              value={state.styleId ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_STYLE",
                  styleId: e.target.value || null,
                })
              }
            >
              <option value="">Select style…</option>
              {styles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.styleName}
                </option>
              ))}
            </select>
          </label>

          <label className="dialed__field">
            <span>2 · Technique</span>
            <select
              value={state.techniqueId ?? ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_TECHNIQUE",
                  techniqueId: e.target.value || null,
                })
              }
            >
              <option value="">Select technique…</option>
              {techniques.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                  {state.highlightedTechniqueId === t.id ? " · Recommended" : ""}
                </option>
              ))}
            </select>
            {state.highlightedTechniqueId ? (
              <p className="dialed__hint">
                Recommended technique is highlighted when style and machine are
                both set.
              </p>
            ) : null}
          </label>

          <label className="dialed__field">
            <span>3 · Select Machine Library</span>
            <select
              className="dialed__select"
              value={state.machineId ?? ""}
              disabled={machinesLoading}
              onChange={(e) =>
                dispatch({
                  type: "SET_MACHINE",
                  machineId: e.target.value || null,
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

          <div className="dialed__chips" aria-label="Technique quick pick">
            {techniques.map((t) => {
              const rec = state.highlightedTechniqueId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`dialed__chip${rec ? " dialed__chip--rec" : ""}${state.techniqueId === t.id ? " dialed__chip--on" : ""}`}
                  onClick={() =>
                    dispatch({ type: "SET_TECHNIQUE", techniqueId: t.id })
                  }
                >
                  {t.name}
                  {rec ? <span className="dialed__rec-badge">Rec</span> : null}
                </button>
              );
            })}
          </div>
        </section>

        <section className="dialed__panel dialed__panel--out" aria-label="Output dashboard">
          {engine ? (
            <ScienceWarningBanners checks={engine.safety_trigger.checks} />
          ) : null}

          <h2 className="dialed__h2 dialed__h2--gauges">
            Output Dashboard (Recommended)
          </h2>

          <div className="dialed__gauges-shell">
            <div className="dialed__gauges dialed__gauges--stable-row">
              {gaugePack && machine ? (
                <>
                  <SweetSpotGauge
                    label="Voltage"
                    value={gaugePack.volts}
                    min={machine.defaultVoltRange.min}
                    max={machine.defaultVoltRange.max}
                    unit="V"
                    badge={
                      acusHzFirst ? "Power supply reference" : undefined
                    }
                    emphasis={acusHzFirst ? "muted" : "default"}
                  />
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
          </dl>

          <div className="dialed__cartridge-section">
            <h3 className="dialed__h3">Cartridge Configuration</h3>
            <dl className="dialed__kv dialed__kv--cartridge">
              <div>
                <dt>Cartridge (technical range)</dt>
                <dd className="dialed__kv-value dialed__kv-value--cartridge">
                  {style ? (
                    <span className="dialed__kv-value__inner">
                      <TechnicalResultWithHints text={style.idealNeedleRange} />
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
                <dt>Machine voltage envelope</dt>
                <dd className="dialed__kv-value">
                  Baseline {voltage.baselineVolts.toFixed(1)} V → adjusted{" "}
                  {voltage.adjustedVolts.toFixed(1)} V
                  {voltage.longStrokeSoftShadingGuard
                    ? " (long-stroke soft shading guard active)"
                    : ""}
                </dd>
              </div>
            </dl>
          ) : null}

          {engine ? (
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
