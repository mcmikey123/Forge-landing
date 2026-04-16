import Reveal from "./Reveal";

export default function Opposite() {
  return (
    <section id="craft" className="relative py-24 md:py-40 bg-paper-warm">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">The opposite of generic</p>
          <h2 className="display mt-8 text-[clamp(2rem,5vw,4.6rem)] max-w-4xl">
            Three decisions we made early, and haven&apos;t walked back.
          </h2>
        </Reveal>

        <div className="mt-24 space-y-28">
          <Row
            n="01"
            title={
              <>
                Your programme.{" "}
                <em className="italic">Not our template.</em>
              </>
            }
            body="A spreadsheet-style grid that bends to your handwriting. Your day names, your exercise language, your set-rep-RPE conventions, your comments in the margin. Inline editing with keyboard-first movement, drag-to-reorder, bulk edits across cells. Nothing is hidden inside a wizard."
            art={<ArtGrid />}
          />

          <Row
            reverse
            n="02"
            title={
              <>
                Your rhythm.{" "}
                <em className="italic">Not our calendar.</em>
              </>
            }
            body={"Check-ins fall on the day you agreed with each client, not on the day the app prefers. Daily check-in flow: energy, sleep, soreness, mood \u2014 logged in twenty seconds, sat in one screen for you to read on Monday morning. Weekly review threads attach to the week they\u2019re about."}
            art={<ArtCadence />}
          />

          <Row
            n="03"
            title={
              <>
                Your voice.{" "}
                <em className="italic">Not our tone.</em>
              </>
            }
            body="Put your logo on the header. Pick the accent colour your clients already associate with your work. They see you, not us. Your name in the corner, not a product brand pretending to own the relationship."
            art={<ArtBrand />}
          />
        </div>
      </div>
    </section>
  );
}

function Row({
  n,
  title,
  body,
  art,
  reverse = false,
}: {
  n: string;
  title: React.ReactNode;
  body: string;
  art: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
      <Reveal className={`md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
        <div className="flex items-start gap-6">
          <span className="font-serif italic text-ember text-2xl md:text-3xl pt-1.5 shrink-0">
            {n}
          </span>
          <div>
            <h3 className="display text-[clamp(1.8rem,3.8vw,3.4rem)]">
              {title}
            </h3>
            <p className="mt-6 text-lg text-ink/70 max-w-xl leading-relaxed">
              {body}
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal
        delay={120}
        className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}
      >
        <div className="aspect-[5/4] rounded-2xl border hair overflow-hidden relative grain bg-paper">
          {art}
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- SVG illustrations ---------- */

function ArtGrid() {
  const rows = 7;
  const cols = 6;
  const cw = 68;
  const ch = 38;
  const ox = 30;
  const oy = 50;

  const data: [number, number, string][] = [
    [0, 0, "Exercise"],
    [0, 1, "Sets"],
    [0, 2, "Reps"],
    [0, 3, "Load"],
    [0, 4, "RPE"],
    [0, 5, "Notes"],
    [1, 0, "Squat"],
    [1, 1, "5"],
    [1, 2, "5"],
    [1, 3, "120"],
    [1, 4, "7"],
    [2, 0, "Bench"],
    [2, 1, "4"],
    [2, 2, "8"],
    [2, 3, "80"],
    [2, 4, "7"],
    [3, 0, "Row"],
    [3, 1, "4"],
    [3, 2, "10"],
    [3, 3, "60"],
    [3, 4, "8"],
  ];

  return (
    <svg viewBox="0 0 460 340" className="absolute inset-0 w-full h-full p-2">
      {/* Grid lines */}
      {Array.from({ length: rows + 1 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={ox}
          y1={oy + i * ch}
          x2={ox + cols * cw}
          y2={oy + i * ch}
          stroke="#14110e"
          strokeOpacity={i === 1 ? 0.25 : 0.1}
        />
      ))}
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={ox + i * cw}
          y1={oy}
          x2={ox + i * cw}
          y2={oy + rows * ch}
          stroke="#14110e"
          strokeOpacity="0.1"
        />
      ))}

      {/* Cell data */}
      {data.map(([r, c, t], i) => (
        <text
          key={i}
          x={ox + c * cw + 10}
          y={oy + r * ch + 25}
          fontSize={r === 0 ? "10" : "13"}
          fill="#14110e"
          fillOpacity={r === 0 ? 0.45 : 0.8}
          fontFamily="ui-sans-serif"
          letterSpacing={r === 0 ? "0.08em" : "0"}
        >
          {t}
        </text>
      ))}

      {/* Active cell cursor */}
      <rect
        x={ox + 3 * cw}
        y={oy + 1 * ch}
        width={cw}
        height={ch}
        fill="none"
        stroke="#c5572a"
        strokeWidth="2"
        rx="3"
      >
        <animate
          attributeName="stroke-opacity"
          values="1;0.3;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}

function ArtCadence() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const active = [1, 4];
  return (
    <svg viewBox="0 0 460 340" className="absolute inset-0 w-full h-full p-2">
      {days.map((d, i) => {
        const x = 40 + i * 56;
        const isCheck = active.includes(i);
        return (
          <g key={i}>
            <text
              x={x}
              y={60}
              fontSize="13"
              fill="#14110e"
              fillOpacity="0.5"
              fontFamily="ui-sans-serif"
              textAnchor="middle"
            >
              {d}
            </text>
            <circle
              cx={x}
              cy={100}
              r={isCheck ? 18 : 11}
              fill={isCheck ? "#c5572a" : "none"}
              stroke="#14110e"
              strokeOpacity={isCheck ? 0 : 0.25}
            />
            {isCheck && (
              <text
                x={x}
                y={105}
                fontSize="13"
                textAnchor="middle"
                fill="#f5f1ea"
                fontFamily="ui-sans-serif"
              >
                {"\u2713"}
              </text>
            )}
          </g>
        );
      })}

      {/* Energy trend line */}
      <text
        x="30"
        y="175"
        fontSize="11"
        fill="#14110e"
        fillOpacity="0.45"
        fontFamily="ui-sans-serif"
        letterSpacing="0.06em"
      >
        {"Energy \u00b7 seven days"}
      </text>
      <path
        d="M 30 240 L 85 225 L 140 215 L 195 235 L 250 260 L 305 230 L 360 200 L 420 210"
        fill="none"
        stroke="#14110e"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="900"
        strokeDashoffset="900"
        style={{
          animation:
            "draw 2.2s 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      />

      {/* Low energy dots */}
      <circle cx="250" cy="260" r="5" fill="#c5572a" />
      <rect
        x="225"
        y="275"
        width="52"
        height="20"
        rx="10"
        fill="#14110e"
      />
      <text
        x="251"
        y="289"
        fontSize="9"
        fill="#f5f1ea"
        textAnchor="middle"
        fontFamily="ui-sans-serif"
      >
        check in?
      </text>
    </svg>
  );
}

function ArtBrand() {
  return (
    <svg viewBox="0 0 460 340" className="absolute inset-0 w-full h-full p-2">
      {/* Phone outline */}
      <rect
        x="130"
        y="20"
        width="200"
        height="300"
        rx="24"
        fill="#f5f1ea"
        stroke="#14110e"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />

      {/* Screen notch hint */}
      <rect
        x="200"
        y="30"
        width="60"
        height="6"
        rx="3"
        fill="#14110e"
        fillOpacity="0.08"
      />

      {/* Brand header */}
      <text
        x="230"
        y="72"
        textAnchor="middle"
        fontSize="17"
        fill="#14110e"
        fontFamily="ui-serif"
        fontStyle="italic"
      >
        your studio
      </text>
      <line
        x1="148"
        y1="88"
        x2="312"
        y2="88"
        stroke="#14110e"
        strokeOpacity="0.1"
      />

      {/* Accent card */}
      <rect
        x="148"
        y="100"
        width="164"
        height="56"
        fill="#c5572a"
        fillOpacity="0.9"
        rx="10"
      >
        <animate
          attributeName="fill"
          values="#c5572a;#3a4634;#14110e;#c5572a"
          dur="8s"
          repeatCount="indefinite"
        />
      </rect>
      <text
        x="160"
        y="134"
        fontSize="11"
        fill="#f5f1ea"
        fontFamily="ui-sans-serif"
      >
        Today with you
      </text>

      {/* Content bars */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="148"
          y={172 + i * 28}
          width={164 - i * 20}
          height="14"
          fill="#14110e"
          fillOpacity="0.05"
          rx="4"
        />
      ))}
    </svg>
  );
}
