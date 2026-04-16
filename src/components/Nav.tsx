"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-b hair shadow-[0_1px_12px_rgba(20,17,14,0.04)]"
          : ""
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between h-[72px]">
        <a href="#" className="inline-flex items-baseline gap-1 rise">
          <span className="font-serif text-[22px] leading-none">Forge</span>
          <span className="font-sans text-[11px] uppercase tracking-[0.22em] -translate-y-[3px] text-ember font-medium">
            PT
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10 text-[13px] text-ink/75">
          <a href="#craft" className="link-underline">
            The craft of it
          </a>
          <a href="#week" className="link-underline">
            A coach&apos;s week
          </a>
          <a href="#pricing" className="link-underline">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#begin"
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2 text-[13px] hover:bg-ink hover:text-paper transition-colors duration-300"
          >
            Begin
            <span className="inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-transform duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-transform duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-80 border-b hair" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-6 px-6 py-8 text-lg">
          <a
            href="#craft"
            onClick={() => setMobileOpen(false)}
            className="link-underline"
          >
            The craft of it
          </a>
          <a
            href="#week"
            onClick={() => setMobileOpen(false)}
            className="link-underline"
          >
            A coach&apos;s week
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="link-underline"
          >
            Pricing
          </a>
          <a
            href="#begin"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-6 py-3 text-sm w-fit"
          >
            Begin →
          </a>
        </nav>
      </div>
    </header>
  );
}
