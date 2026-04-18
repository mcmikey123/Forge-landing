"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What happens on a build call?",
    a: "We walk through how you currently coach — your onboarding, check-ins, programming and client flow. By the end of the call you'll know exactly what we'd build for you, how long it'll take, and what your setup would look like.",
  },
  {
    q: "How long does the initial build take?",
    a: "Most builds are live within two to four weeks of the intake call. We scope the timeline on the call based on how deep the customisation goes.",
  },
  {
    q: "Can I leave and take my data?",
    a: "Yes — your data is yours. We'll export your clients, programs, and history in standard formats anytime you ask.",
  },
  {
    q: "Can I change my plan later?",
    a: "Yes. You can move between plans as your business changes. The only thing that shifts is how much we continue shaping the system with you.",
  },
  {
    q: "Do I need technical skills to use ForgePT?",
    a: "No. The whole point is that we handle the build. You coach, we shape the software around you.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="faq">
      <div className="wrap">
        <span className="section-eyebrow">FAQ</span>
        <h2 className="section-title">
          Questions <em>before the call</em>.
        </h2>
        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-toggle" aria-hidden>
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                {isOpen && <div className="faq-a">{f.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
