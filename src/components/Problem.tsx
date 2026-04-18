const pains = [
  {
    i: "i.",
    title: "Your stack isn't a stack, it's a scrapbook",
    body: "Spreadsheets for programmes. WhatsApp for check ins. Notion for notes. Nothing talks to anything else.",
    quote: "\"I spend 2 hours every Sunday copying numbers between apps.\"",
  },
  {
    i: "ii.",
    title: "Generic SaaS bends you out of shape",
    body: "You force your coaching into someone else's template. Tabs you don't need, fields that don't fit, workflows that fight you.",
    quote: "\"The software has opinions. I have better ones.\"",
  },
  {
    i: "iii.",
    title: "You can't see how your clients are doing",
    body: "Adherence, RPE trends, check in sentiment. Scattered across DMs, screenshots and half remembered conversations.",
    quote: "\"By the time I notice someone's slipping, they've already ghosted.\"",
  },
];

export default function Problem() {
  return (
    <section className="problem" id="problem">
      <div className="wrap">
        <span className="section-eyebrow">The problem</span>
        <h2 className="section-title">
          Generic coaching software was built for <em>someone else</em>.
        </h2>
        <p className="section-sub">
          Most platforms ship one template and expect 40,000 different coaches to squeeze into it. That&apos;s why you end up back in WhatsApp.
        </p>
        <div className="problem-grid">
          {pains.map((p, i) => (
            <div key={i} className="pain-card">
              <div className="pain-icon">{p.i}</div>
              <div className="pain-title">{p.title}</div>
              <div className="pain-body">{p.body}</div>
              <div className="pain-quote">{p.quote}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
