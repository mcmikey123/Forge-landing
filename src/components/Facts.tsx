import Reveal from "./Reveal";

export default function Facts() {
  const items = [
    {
      big: "200+",
      label: "movements written in \u2014 searched as you type",
    },
    {
      big: "One",
      label: "screen for every check-in. No tab-hopping.",
    },
    {
      big: "Offline",
      label: "works on the train. Syncs when it\u2019s back.",
    },
    {
      big: "Yours",
      label: "logo, colour, name on the header \u2014 not ours.",
    },
  ];

  return (
    <section className="relative py-32 md:py-40 bg-paper-warm">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">Facts, plainly</p>
          <h2 className="display mt-8 text-[clamp(2rem,4.6vw,4rem)] max-w-3xl">
            No buzzwords. Four things that happen to be true.
          </h2>
        </Reveal>

        <div className="mt-20 grid sm:grid-cols-2 md:grid-cols-4 gap-10 border-t hair pt-16">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 80}>
              <div>
                <span className="display text-[clamp(3rem,6vw,4.5rem)] text-ember leading-none">
                  {it.big}
                </span>
                <p className="mt-4 text-ink/65 leading-snug text-[15px]">
                  {it.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
