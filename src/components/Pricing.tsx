import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">What it costs</p>
          <h2 className="display mt-8 text-[clamp(2rem,4.6vw,4rem)] max-w-3xl">
            Two ways to begin.{" "}
            <em className="italic">Cancel either, any time.</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-4xl">
          <Reveal>
            <PricingCard
              name="Solo"
              price="\u00a329"
              per="per month"
              tagline="For the one-coach shop with up to twenty clients on the roster."
              features={[
                "Up to 20 clients",
                "Full programme builder",
                "Daily check-ins, weekly reviews",
                "Client app on iPhone and Android",
                "Progress photos, weight, steps, nutrition",
              ]}
            />
          </Reveal>

          <Reveal delay={100}>
            <PricingCard
              featured
              name="Studio"
              price="\u00a379"
              per="per month"
              tagline="For the coach who\u2019s been asked, twice this year, where they print their t-shirts."
              features={[
                "Unlimited clients",
                "Your logo, your accent colour",
                "Priority email \u2014 answered within the day",
                "Import from Google Sheets, MyFitnessPal, Trainerize",
                "Everything in Solo",
              ]}
            />
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-14 text-sm text-ink/50 max-w-2xl">
            A fourteen-day trial on either plan, no card taken up front. If it
            isn&apos;t shaped around you within a fortnight, we&apos;d rather
            you didn&apos;t pay.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  per,
  tagline,
  features,
  featured = false,
}: {
  name: string;
  price: string;
  per: string;
  tagline: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border hair p-8 md:p-10 flex flex-col ${
        featured ? "bg-ink text-paper" : "bg-paper"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-8 text-[10px] uppercase tracking-[0.22em] bg-ember text-paper px-3.5 py-1 rounded-full font-medium">
          Most chosen
        </span>
      )}

      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-3xl">{name}</h3>
        <div className="text-right">
          <div className="font-serif text-4xl">{price}</div>
          <div
            className={`text-xs mt-0.5 ${
              featured ? "text-paper/55" : "text-ink/50"
            }`}
          >
            {per}
          </div>
        </div>
      </div>

      <p
        className={`mt-6 italic font-serif text-lg leading-snug ${
          featured ? "text-paper/75" : "text-ink/70"
        }`}
      >
        {tagline}
      </p>

      <ul
        className={`mt-8 space-y-3 text-sm flex-1 ${
          featured ? "text-paper/75" : "text-ink/70"
        }`}
      >
        {features.map((f) => (
          <li key={f} className="flex gap-3">
            <span className="text-ember shrink-0">&mdash;</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#begin"
        className={`mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-colors duration-300 w-fit ${
          featured
            ? "bg-paper text-ink hover:bg-ember hover:text-paper"
            : "bg-ink text-paper hover:bg-ember"
        }`}
      >
        Begin with {name}
        <span>\u2192</span>
      </a>
    </div>
  );
}
