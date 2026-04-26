"use client";

const STEPS = [
  {
    title: "Step 1: Set Your Artistic Goal.",
    body: "Select your style. This establishes the physics required for the skin you are working on.",
  },
  {
    title: "Step 2: Calibrate Your Technique.",
    body: "Define the hit (Lining vs Shading) to activate our safety guard against skin trauma.",
  },
  {
    title: "Step 3: Master Your Gear.",
    body: "Pick your machine—whether it's a Tier 2 workhorse or a Tier 1 benchmark. The engine adjusts to your specific hardware limits.",
  },
  {
    title: "Step 4: Find Your Sync.",
    body: "Use the Hand Speed slider to match your movement to the motor frequency. Watch the CPS gauge to ensure you aren't outrunning your needle.",
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
