export default function Hero() {
  const lines = Array.from({ length: 44 });

  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-32 md:pb-52">
      {/* Animated SVG field */}
      <div
        className="pointer-events-none absolute inset-0 flex items-end justify-center z-0"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 600"
          className="w-full h-[500px] md:h-[700px] -mb-24 opacity-90"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="hero-void" cx="55%" cy="58%" r="26%">
              <stop offset="0%" stopColor="#f5f1ea" stopOpacity="1" />
              <stop offset="80%" stopColor="#f5f1ea" stopOpacity="0" />
            </radialGradient>
          </defs>
          {lines.map((_, i) => {
            const y = (i + 0.5) * (600 / 44);
            const cy = 350;
            const dy = y - cy;
            const bend = 85 * Math.exp(-(dy * dy) / (2 * 115 * 115));
            const d = `M 0 ${y} Q 660 ${y - bend} 1200 ${y}`;
            const len = 1500;
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#14110e"
                strokeOpacity={0.08 + Math.sin((i / 44) * Math.PI) * 0.12}
                strokeWidth="1"
                strokeDasharray={len}
                strokeDashoffset={len}
                style={{
                  animation: `draw 1.8s cubic-bezier(0.16,1,0.3,1) forwards`,
                  animationDelay: `${i * 0.025}s`,
                }}
              />
            );
          })}
          <circle cx={660} cy={350} r={180} fill="url(#hero-void)" />
        </svg>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative z-10">
        <p className="eyebrow rise">
          <span>Coaching software</span>
          <span className="mx-3 opacity-40">\u00b7</span>
          <span>Written for personal trainers</span>
        </p>

        <h1 className="display mt-10 md:mt-14 text-[clamp(3.2rem,9.5vw,10rem)]">
          <span className="block rise delay-1">Shaped</span>
          <span className="block rise delay-2">
            around <em className="italic text-ember">you</em>.
          </span>
          <span className="block rise delay-3 text-ink/25">
            Not the other way round.
          </span>
        </h1>

        <div className="mt-12 md:mt-16 max-w-2xl rise delay-4">
          <p className="text-xl md:text-[1.65rem] text-ink/75 leading-snug font-serif">
            ForgePT folds itself around the way you already write programmes,
            check in with clients, and run your week &mdash; instead of asking
            you to learn somebody else&apos;s way of doing it.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start gap-4 rise delay-5">
          <a
            href="#begin"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-7 py-3.5 text-sm hover:bg-ember transition-colors duration-300"
          >
            Begin a programme
            <span>\u2192</span>
          </a>
          <a
            href="#week"
            className="inline-flex items-center gap-2 px-4 py-3.5 text-sm link-underline text-ink/75"
          >
            A ninety-second tour
          </a>
        </div>
      </div>
    </section>
  );
}
