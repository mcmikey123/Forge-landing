import { Ico } from "./icons";

const tiers = [
  {
    name: "Solo",
    tag: "Independent PTs",
    price: "£49.99",
    desc: "For independent PTs getting set up properly.",
    features: [
      "One initial build cycle (your system set up around how you coach)",
      "Core coaching setup (programming, check-ins, client tracking)",
      "Light monthly tweaks as you refine your process",
    ],
    summary: "You're paying for a solid foundation plus small ongoing adjustments.",
  },
  {
    name: "Established",
    tag: "Most common",
    price: "£79.99",
    desc: "For coaches refining and improving how they operate.",
    features: [
      "Deeper initial build (more customised workflows and tracking)",
      "Monthly refinement sessions to evolve your system",
      "More advanced setup across programs, check-ins, and client management",
    ],
    summary: "You're paying for ongoing optimisation, not just setup.",
    featured: true,
  },
  {
    name: "Scale",
    tag: "Teams & studios",
    price: "£129.99",
    desc: "For growing coaching businesses and teams.",
    features: [
      "Full system build across your coaching operation",
      "Ongoing build partnership (continuous iteration and improvements)",
      "Multi-coach setup and more complex workflows",
    ],
    summary: "You're paying for continuous system design as your business scales.",
  },
];

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <p className="price-anchor">
          Every ForgePT setup is custom-built. Plans simply reflect how much we build and how much we evolve it with you.
        </p>
        <span className="section-eyebrow">Pricing</span>
        <h2 className="section-title">
          Custom-built software, <em>with ongoing refinement</em>.
        </h2>
        <p className="section-sub">
          No templates. No locked features. Every plan includes a tailored build — the difference is how far we take it, and how much we continue shaping it with you.
        </p>
        <div className="pricing-wrap">
          {tiers.map((t, i) => (
            <div key={i} className={`price-card ${t.featured ? "featured" : ""}`}>
              <div className="price-tag">{t.tag}</div>
              <div className="price-name">{t.name}</div>
              <div className="price-desc">{t.desc}</div>
              <div className="price-value">
                {t.price}
                <small>/month</small>
              </div>
              <ul className="price-features">
                {t.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <p className="price-summary">{t.summary}</p>
            </div>
          ))}
        </div>
        <p className="price-clarifier">
          All plans include access to the ForgePT platform — what changes is how much we shape it around you.
        </p>
        <div className="price-cta">
          <a href="#book" className="btn btn-primary btn-lg">
            Book a build call <Ico.arrow />
          </a>
          <p className="price-cta-sub">
            We&apos;ll walk through your coaching setup and show you exactly what we&apos;d build.
          </p>
        </div>
      </div>
    </section>
  );
}
