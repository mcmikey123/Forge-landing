export default function Marquee() {
  const items = [
    "adapts to you",
    "not the other way round",
    "adapts to you",
    "not the other way round",
    "adapts to you",
    "not the other way round",
    "adapts to you",
    "not the other way round",
  ];

  return (
    <section
      className="py-12 md:py-16 border-y hair overflow-hidden bg-paper"
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 32s linear infinite",
          width: "max-content",
        }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="display text-[clamp(2rem,7.5vw,6rem)] px-6"
          >
            {i % 2 === 1 ? (
              <em className="italic text-ember">{t}</em>
            ) : (
              t
            )}
            <span className="mx-6 text-ink/15">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
