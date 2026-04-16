import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">A short statement of intent</p>
        </Reveal>

        <Reveal delay={60}>
          <p className="display mt-10 text-[clamp(2rem,5.6vw,5.4rem)] max-w-5xl leading-[0.98]">
            You&apos;ve spent years figuring out{" "}
            <em className="italic">how</em> you coach. The last thing you need
            is a piece of software telling you you&apos;ve been doing it wrong.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-12 mt-24">
          <Reveal className="md:col-span-6 md:col-start-6">
            <div className="text-lg md:text-xl leading-relaxed text-ink/75 space-y-6">
              <p>
                Most coaching tools assume their way is the way. Their
                templates, their macro splits, their check-in forms, their
                terminology. You end up spending half your Sunday evening bending
                your own process to fit theirs.
              </p>
              <p>
                ForgePT was built to do the bending. Write programmes the way
                you write programmes. Check in with clients on the days that
                matter. Put your name on the header, not ours.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Decorative SVG divider */}
        <Reveal delay={200}>
          <svg
            viewBox="0 0 1100 80"
            className="mt-20 w-full opacity-70"
            aria-hidden="true"
          >
            <path
              d="M 0 40 Q 275 10 550 40 T 1100 40"
              fill="none"
              stroke="#14110e"
              strokeOpacity="0.12"
              strokeWidth="1"
              strokeDasharray="1200"
              strokeDashoffset="1200"
              style={{
                animation: "draw 2.5s cubic-bezier(0.16,1,0.3,1) forwards",
                animationDelay: "0.3s",
              }}
            />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
