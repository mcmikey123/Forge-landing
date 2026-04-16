import Reveal from "./Reveal";

export default function Builder() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">The programme builder</p>
            <h2 className="display mt-8 text-[clamp(2rem,4.6vw,4rem)]">
              Writes the way <em className="italic">you</em> write.
            </h2>
            <p className="mt-8 text-ink/70 text-lg leading-relaxed">
              Built to feel like the spreadsheet you already live in &mdash;
              except everything&apos;s connected. Drag sets between days.
              Bulk-edit RPE across a phase. Duplicate a client&apos;s week and
              trim it for a deload. Type your way through a full programme
              without ever reaching for the mouse.
            </p>
            <ul className="mt-8 space-y-3 text-ink/65">
              <li className="flex gap-3">
                <span className="text-ember shrink-0">&mdash;</span>
                Two hundred movements already written in, searched as you type.
              </li>
              <li className="flex gap-3">
                <span className="text-ember shrink-0">&mdash;</span>
                Import from a sheet you&apos;ve already got. We&apos;ll read it.
              </li>
              <li className="flex gap-3">
                <span className="text-ember shrink-0">&mdash;</span>
                Auto-fill from last session, corrected in grey.
              </li>
              <li className="flex gap-3">
                <span className="text-ember shrink-0">&mdash;</span>
                Assign the same template to ten clients. Edit one without
                touching the others.
              </li>
            </ul>
          </Reveal>

          <Reveal delay={140} className="md:col-span-7">
            <BuilderVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BuilderVisual() {
  const header = ["Exercise", "Sets", "Reps", "Load", "RPE", "Notes"];
  const rows = [
    ["Back Squat", "4", "5", "120", "7", "+ warm-up sets"],
    ["Romanian DL", "3", "8", "100", "7", ""],
    ["Split Squat", "3", "10", "24", "8", "per side"],
    ["Leg Curl", "3", "12", "\u2014", "\u2014", "to failure"],
    ["Walking Lunge", "\u2014", "15m", "\u2014", "\u2014", "easy pace"],
  ];

  return (
    <div className="rounded-2xl border hair bg-paper overflow-hidden shadow-[0_30px_80px_-40px_rgba(20,17,14,0.25)]">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b hair text-xs">
        <div className="flex gap-5 text-ink/55">
          <span className="text-ink font-medium border-b-2 border-ember pb-2">
            {"Day 1 \u00b7 Lower"}
          </span>
          <span className="pb-2">{"Day 2 \u00b7 Upper"}</span>
          <span className="pb-2">{"Day 3 \u00b7 Full"}</span>
          <span className="opacity-40 pb-2">+</span>
        </div>
        <span className="text-ember/80 text-[11px]">{"Saved \u00b7"}</span>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div
          className="grid min-w-[560px]"
          style={{
            gridTemplateColumns: "2fr 0.6fr 0.7fr 0.7fr 0.6fr 1.4fr",
          }}
        >
          {/* Header */}
          {header.map((h) => (
            <div
              key={h}
              className="px-4 py-2.5 text-[10px] uppercase tracking-wider text-ink/40 border-b hair bg-paper-warm/40"
            >
              {h}
            </div>
          ))}

          {/* Data rows */}
          {rows.map((row, ri) =>
            row.map((cell, ci) => {
              const isActive = ri === 0 && ci === 3;
              return (
                <div
                  key={`${ri}-${ci}`}
                  className={`px-4 py-3 text-sm border-b hair ${
                    ci === 0
                      ? "text-ink font-medium"
                      : "text-ink/65"
                  } ${isActive ? "bg-ember/8 ring-1 ring-ember" : ""}`}
                >
                  {cell || (
                    <span className="text-ink/20">{"\u2014"}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-5 py-2.5 text-[11px] text-ink/40 flex items-center gap-4 bg-paper-warm/30">
        <span>Editing cell D2</span>
        <span className="opacity-40">{"\u00b7"}</span>
        <span>Tab to move</span>
        <span className="opacity-40">{"\u00b7"}</span>
        <span>Enter to confirm</span>
      </div>
    </div>
  );
}
