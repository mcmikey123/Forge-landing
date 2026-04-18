const pains = [
  {
    i: "i.",
    title: "You adapt to the software",
    body: "Your process gets forced into someone else's system, whether it fits or not.",
  },
  {
    i: "ii.",
    title: "Your stack becomes a mess",
    body: "Check-ins in one place. Messaging in another. Programming somewhere else.",
  },
  {
    i: "iii.",
    title: "Clients feel the friction",
    body: "Clunky systems, slow responses, and a disconnected experience.",
  },
];

export default function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="wrap">
        <span className="section-eyebrow">The problem</span>
        <h2 className="section-title">
          Generic coaching software wasn&apos;t built for <em>how you coach</em>.
        </h2>
        <p className="section-sub">
          Most platforms are designed for scale — not for the way real PTs operate day-to-day.
        </p>
        <div className="problem-grid">
          {pains.map((p, i) => (
            <div key={i} className="pain-card">
              <div className="pain-icon">{p.i}</div>
              <div className="pain-title">{p.title}</div>
              <div className="pain-body">{p.body}</div>
            </div>
          ))}
        </div>
        <p className="problem-transition">
          You end up working around your tools instead of them working for you.
        </p>
      </div>
    </section>
  );
}
