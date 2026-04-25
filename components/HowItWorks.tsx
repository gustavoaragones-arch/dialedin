"use client";

const STEPS = [
  {
    title: "Style selection",
    body: "Establish the artistic baseline (e.g., Realism).",
  },
  {
    title: "Technique calibration",
    body: "Define the hit (e.g., Shading) to activate the Kinetic Impact Guard.",
  },
  {
    title: "Machine sync",
    body: "Connect your hardware (including ACUS Hz-priority models) to the engine.",
  },
  {
    title: "Velocity equilibrium",
    body: "Adjust hand speed to find your optimal CPS (Cycles Per Second).",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="how-it-works" aria-labelledby="how-it-works-title">
      <h2 id="how-it-works-title" className="how-it-works__title">
        How it works
      </h2>
      <ol className="how-it-works__steps">
        {STEPS.map((step, i) => (
          <li key={step.title} className="how-it-works__step">
            <span className="how-it-works__num" aria-hidden>
              {i + 1}
            </span>
            <div className="how-it-works__body">
              <h3 className="how-it-works__step-title">{step.title}</h3>
              <p className="how-it-works__step-text">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
