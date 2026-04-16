import Reveal from "./Reveal";

export default function Final() {
  const lines = Array.from({ length: 28 });

  return (
    <section
      id="begin"
      className="relative py-32 md:py-56 bg-ink text-paper overflow-hidden"
    >
      {/* Background SVG wave field */}
      <svg
        viewBox="0 0 1200 400"
        className="absolute inset-x-0 bottom-0 w-full opacity-30"
        aria-hidden="true"
      >
        {lines.map((_, i) => {
          const y = 20 + i * 14;
          const bend = 45 * Math.sin((i / 28) * Math.PI);
          return (
            <path
              key={i}
              d={`M 0 ${y} Q 600 ${y - bend} 1200 ${y}`}
              fill="none"
              stroke="#f5f1ea"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <Reveal>
          <p className="eyebrow text-paper/50">
            Final page of the brochure
          </p>
          <h2 className="display mt-10 text-[clamp(2.4rem,7.5vw,7.5rem)] max-w-5xl">
            Write the way you&apos;ve always written.
            <br />
            <em className="italic text-ember">We&apos;ll handle the rest.</em>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:hello@forgept.app"
              className="inline-flex items-center gap-2 rounded-full bg-paper text-ink px-7 py-3.5 text-sm hover:bg-ember hover:text-paper transition-colors duration-300"
            >
              Begin a programme
              <span>\u2192</span>
            </a>
            <a
              href="mailto:hello@forgept.app?subject=Walk-through"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm text-paper/70 link-underline"
            >
              Or book a short walk-through
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
