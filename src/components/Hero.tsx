import BuildDemo from "./BuildDemo";
import { Ico } from "./icons";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />
        <div className="beam" />
      </div>
      <div className="wrap hero-grid">
        <div>
          <h1 className="display">
            Your coaching business, <em>your software.</em>
          </h1>
          <p className="lead">
            Built on ForgePT&apos;s coaching engine. Shaped around how you coach.
            Personal trainer software tailored to your workflow, not another generic PT app.
          </p>
          <div className="hero-ctas">
            <a href="#book" className="btn btn-primary btn-lg">
              Book a build call <Ico.arrow />
            </a>
          </div>
          <div className="hero-proof">
            <span>
              <span className="dot" /> &nbsp;We&apos;ll map how you coach and show you what your setup would look like.
            </span>
          </div>
        </div>
        <BuildDemo />
      </div>
    </section>
  );
}
