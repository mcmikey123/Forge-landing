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
            Software that adapts <em>to you</em>, not the other way round.
          </h1>
          <p className="lead">
            Forgept is a client platform we hand build around how <em>you</em> actually coach.
            Your workflow, your check ins, your language. No more wrangling Notion, spreadsheets and WhatsApp.
          </p>
          <div className="hero-ctas">
            <a href="#enquire" className="btn btn-primary btn-lg">
              Enquire now <Ico.arrow />
            </a>
            <a href="#adapts" className="btn btn-ghost btn-lg">
              See how it adapts
            </a>
          </div>
          <div className="hero-proof">
            <div className="avatars">
              <div className="av">MF</div>
              <div className="av">PD</div>
              <div className="av">JR</div>
              <div className="av">EH</div>
            </div>
            <span>
              <span className="dot" /> &nbsp;For online coaches managing 20 to 200 clients
            </span>
          </div>
        </div>
        <BuildDemo />
      </div>
    </section>
  );
}
