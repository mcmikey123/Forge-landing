import NutritionInput from "./NutritionInput";

export default function Features() {
  return (
    <section id="features">
      <div className="wrap">
        <span className="section-eyebrow">Inside Sculptr</span>
        <h2 className="section-title">
          Everything you need. <em>Nothing you don&apos;t.</em>
        </h2>
        <p className="section-sub">Core modules every coach gets. Configured the way that fits your day.</p>
        <div className="features-grid">
          <div className="feat col-3 row-2">
            <span className="feat-label">Nutrition, smarter</span>
            <div className="feat-title">Log a meal in plain English.</div>
            <div className="feat-body">
              Type it the way you&apos;d say it. No scrolling a 40,000 item food database, no scanning barcodes mid lunch.
              Foods land in the log, macros on the bottom, in under a second.
            </div>
            <NutritionInput />
          </div>

          <div className="feat col-3">
            <span className="feat-label">Client profiles</span>
            <div className="feat-title">One page per human.</div>
            <div className="feat-body">
              Training history, injuries, preferences, last 6 check ins, photo timeline. Wherever you want them on the page.
            </div>
          </div>

          <div className="feat col-3">
            <span className="feat-label">Programme builder</span>
            <div className="feat-title">Blocks, not templates.</div>
            <div className="feat-body">
              Build once, adapt per client. Sets, reps, RPE, tempo, notes, or your own custom scheme. Bulk edit across weeks.
            </div>
          </div>

          <div className="feat col-2">
            <span className="feat-label">Check ins</span>
            <div className="feat-title">Rituals, not forms.</div>
            <div className="feat-body">
              Weekly check ins that feel like a conversation, not a survey.
            </div>
          </div>

          <div className="feat col-2">
            <span className="feat-label">Progress tracking</span>
            <div className="feat-title">See the slipping before they slip.</div>
            <div className="feat-body">
              Adherence, RPE drift and sentiment trends surfaced automatically.
            </div>
          </div>

          <div className="feat col-2">
            <span className="feat-label">Messaging</span>
            <div className="feat-title">All of it, one thread.</div>
            <div className="feat-body">
              Voice notes, form videos, check in replies. Attached to the client, not lost in WhatsApp.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
