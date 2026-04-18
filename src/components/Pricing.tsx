import { Ico } from "./icons";

const tiers = [
  {
    name: "Starter",
    tag: "Solo coach",
    price: "£99",
    desc: "For coaches managing up to 25 clients.",
    features: [
      "Up to 25 active clients",
      "Client profiles, programming and check ins",
      "Plain English nutrition logging",
      "Messaging and check in threads",
      "Email support",
    ],
  },
  {
    name: "Studio",
    tag: "Most popular",
    price: "£199",
    desc: "For growing coaching businesses.",
    features: [
      "Up to 100 active clients",
      "Everything in Starter",
      "Your workspace, built to your workflow",
      "Priority feature iterations",
      "Direct line to the build team",
    ],
    featured: true,
  },
  {
    name: "Scale",
    tag: "Teams and gyms",
    price: "£399",
    desc: "For teams of coaches or high volume operators.",
    features: [
      "Unlimited clients",
      "Everything in Studio",
      "Multi coach accounts and permissions",
      "Dedicated account manager",
      "Custom integrations and modules",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="wrap">
        <span className="section-eyebrow">Pricing</span>
        <h2 className="section-title">
          Simple monthly pricing, <em>built around you.</em>
        </h2>
        <p className="section-sub">
          Every plan includes your custom built workspace. No setup fees. Cancel any time.
        </p>
        <div className="pricing-wrap">
          {tiers.map((t, i) => (
            <div key={i} className={`price-card ${t.featured ? "featured" : ""}`}>
              <div className="price-tag">{t.tag}</div>
              <div className="price-name">{t.name}</div>
              <div className="price-desc">{t.desc}</div>
              <div className="price-value">
                {t.price}
                <small>/mo</small>
              </div>
              <ul className="price-features">
                {t.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <a
                href="#enquire"
                className={`btn ${t.featured ? "btn-primary" : "btn-ghost"} btn-lg form-submit`}
                style={{ marginTop: 24 }}
              >
                {t.featured ? "Enquire now" : `Choose ${t.name}`} <Ico.arrow />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
