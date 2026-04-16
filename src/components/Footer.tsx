export default function Footer() {
  return (
    <footer className="relative border-t hair py-16 md:py-20 bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
          {/* Wordmark & blurb */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="inline-flex items-baseline gap-1">
              <span className="font-serif text-[22px] leading-none">
                Forge
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.22em] -translate-y-[3px] text-ember font-medium">
                PT
              </span>
            </p>
            <p className="mt-4 text-sm text-ink/55 max-w-xs leading-relaxed">
              Coaching software shaped around personal trainers. Made in
              Britain, written slowly.
            </p>
          </div>

          {/* Column: The software */}
          <div>
            <p className="eyebrow">The software</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a href="#craft" className="link-underline text-ink/70">
                  The craft of it
                </a>
              </li>
              <li>
                <a href="#week" className="link-underline text-ink/70">
                  A coach&apos;s week
                </a>
              </li>
              <li>
                <a href="#pricing" className="link-underline text-ink/70">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Get in touch */}
          <div>
            <p className="eyebrow">Get in touch</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:hello@forgept.app"
                  className="link-underline text-ink/70"
                >
                  Say hello
                </a>
              </li>
              <li>
                <a
                  href="mailto:studio@forgept.app"
                  className="link-underline text-ink/70"
                >
                  Studio enquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column: The small print */}
          <div>
            <p className="eyebrow">The small print</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a href="#" className="link-underline text-ink/70">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="link-underline text-ink/70">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="link-underline text-ink/70">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t hair flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ink/40">
          <span>\u00a9 ForgePT, 2026. All rights reserved.</span>
          <span>Designed &amp; written in London.</span>
        </div>
      </div>
    </footer>
  );
}
