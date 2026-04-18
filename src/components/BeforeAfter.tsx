export default function BeforeAfter() {
  return (
    <section className="vs">
      <div className="wrap">
        <span className="section-eyebrow">The difference</span>
        <h2 className="section-title">
          Coaching before ForgePT, <em>coaching after.</em>
        </h2>
        <div className="vs-grid">
          <div className="vs-col bad">
            <span className="vs-tag">Generic SaaS</span>
            <div className="vs-headline">Open 4 apps. Find nothing.</div>
            <ul className="vs-list">
              <li><span className="ic">✕</span>Copy today&apos;s sessions from a spreadsheet into the app&apos;s &quot;workout builder&quot;.</li>
              <li><span className="ic">✕</span>Scroll through WhatsApp for Marcus&apos;s Sunday check in. Take a screenshot.</li>
              <li><span className="ic">✕</span>Nutrition, client spent 20 minutes searching &quot;home made lasagne&quot; in a dropdown.</li>
              <li><span className="ic">✕</span>Export a CSV to figure out who&apos;s slipping. Never actually open it.</li>
              <li><span className="ic">✕</span>Email support about a missing feature. Auto reply, &quot;on our roadmap.&quot;</li>
            </ul>
          </div>
          <div className="vs-vs">vs</div>
          <div className="vs-col good">
            <span className="vs-tag">ForgePT</span>
            <div className="vs-headline">Open ForgePT. Coach.</div>
            <ul className="vs-list">
              <li><span className="ic">✓</span>Today&apos;s sessions and check ins on the homepage you asked us to build.</li>
              <li><span className="ic">✓</span>Marcus&apos;s check in already threaded on his profile, right where you need it.</li>
              <li><span className="ic">✓</span>Nutrition, &quot;two eggs on sourdough, flat white.&quot; Logged. Done.</li>
              <li><span className="ic">✓</span>At risk clients flagged in your view, with the <em>why</em>.</li>
              <li><span className="ic">✓</span>New feature idea? Message the team. Shipped in days, not quarters.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
