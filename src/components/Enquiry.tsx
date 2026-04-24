"use client";

import { useState } from "react";
import { Ico } from "./icons";

export default function Enquiry() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", clients: "", about: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="enquiry" id="book">
      <div className="wrap enquiry-wrap">
        <div className="enquiry-copy">
          <span className="section-eyebrow">Book a build call</span>
          <h2 className="section-title">
            Tell us how <em>you</em> coach.
          </h2>
          <p className="section-sub">
            We&apos;ll come back within one working day to book a call. No pitch deck — just a conversation about your day and what we&apos;d build for you.
          </p>
          <ul className="enquiry-list">
            <li><span className="ic">i.</span>We&apos;ll map how you currently coach, top to bottom.</li>
            <li><span className="ic">ii.</span>We&apos;ll show you exactly what your Sculptr setup would look like.</li>
            <li><span className="ic">iii.</span>You decide whether to build. No obligation, no commitment.</li>
          </ul>
        </div>
        <div className="form-card">
          {sent ? (
            <div className="form-success">
              <div className="ic">✓</div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 2 }}>
                  Got it, {form.name.split(" ")[0] || "thanks"}.
                </div>
                <div style={{ color: "var(--ink-2)", fontSize: 14 }}>
                  We&apos;ll be in touch within 1 working day.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your name</label>
                <input
                  id="name"
                  className="form-input"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Marcus Finch"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@coach.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-input"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+44 7700 000 000"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="clients">Rough client count</label>
                <input
                  id="clients"
                  className="form-input"
                  value={form.clients}
                  onChange={(e) => setForm({ ...form, clients: e.target.value })}
                  placeholder="e.g. 38 online, 4 in person"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="about">What&apos;s your biggest frustration right now?</label>
                <textarea
                  id="about"
                  className="form-textarea"
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  placeholder="Optional, but it helps us prep for the call."
                />
              </div>
              <button type="submit" className="btn btn-primary form-submit">
                Book a build call <Ico.arrow />
              </button>
              <div className="form-footnote">No newsletters. No drip sequences. A human will read this.</div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
