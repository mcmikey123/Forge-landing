import type { ReactNode } from "react";
import { Ico, Wordmark } from "./icons";

const steps: { n: string; title: ReactNode; body: string }[] = [
  {
    n: "01",
    title: "We map how you already work",
    body: "Your check-ins, your programming style, your client flow.",
  },
  {
    n: "02",
    title: <>We build your version of <Wordmark /></>,
    body: "Tailored dashboards, tracking, and workflows based on you, not a template.",
  },
  {
    n: "03",
    title: "We refine it as you grow",
    body: "Need changes? We adapt the system with you. No rebuilding from scratch.",
  },
];

export default function Differentiator() {
  return (
    <section id="how" className="differentiator">
      <div className="wrap">
        <span className="section-eyebrow">How it works</span>
        <h2 className="section-title">
          We build the app <em>around how you coach</em>.
        </h2>
        <p className="section-sub">
          Not templates. Not presets. We work with you to shape <Wordmark /> around your exact workflow — then keep refining it as you grow.
        </p>

        <div className="diff-steps">
          {steps.map((s) => (
            <div key={s.n} className="diff-step">
              <div className="diff-step-num">{s.n}</div>
              <div className="diff-step-title">{s.title}</div>
              <div className="diff-step-body">{s.body}</div>
            </div>
          ))}
        </div>

        <div className="diff-pullquote">
          <span>No two <Wordmark /> setups are the same.</span>
        </div>

        <div className="diff-cta">
          <a href="#book" className="btn btn-primary btn-lg">
            Book a build call <Ico.arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
