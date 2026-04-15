import Link from "next/link";

const features = [
  {
    href: "/meal-builder",
    title: "Meal Builder",
    body: "Set pre-defined meals for each client. They import straight into their diary — no copy-paste, no guesswork.",
  },
  {
    href: "/supplements",
    title: "Supplement Plan",
    body: "Recommend by name, image and link. The client sees exactly what to take and where to get it.",
  },
  {
    href: "/check-in",
    title: "Weekly Check-in",
    body: "Hunger, performance, mood. Ratings with notes — completed before the call, so the call is actually useful.",
  },
  {
    href: "/progress",
    title: "Progress Pictures",
    body: "Compare any two weeks side-by-side. Every date is labelled with weight so the lowest days are obvious.",
  },
];

export default function Home() {
  return (
    <div className="space-y-20 pt-8">
      <section className="space-y-6">
        <p className="chip">Coaching software for serious PTs</p>
        <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
          The app adapts to the coach,
          <br />
          <span className="text-ember">not the other way round.</span>
        </h1>
        <p className="max-w-xl text-lg text-ink/70">
          ForgePT builds the client's week around your standards — your meals,
          your stack, your questions. This demo runs entirely in your browser.
          Toggle Trainer/Client at the top to see both sides.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/meal-builder" className="btn">
            Open Meal Builder
          </Link>
          <Link href="/progress" className="btn-ghost">
            See progress view
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="card group transition hover:border-ink/40"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-serif text-2xl">{f.title}</h3>
              <span className="text-ink/30 group-hover:text-ink">→</span>
            </div>
            <p className="mt-2 text-sm text-ink/70">{f.body}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
