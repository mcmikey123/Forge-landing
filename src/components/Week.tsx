import Reveal from "./Reveal";

export default function Week() {
  return (
    <section id="week" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow">A coach&apos;s week, compressed</p>
          <h2 className="display mt-8 text-[clamp(2rem,5vw,4.6rem)] max-w-4xl">
            What it looks like when the software is{" "}
            <em className="italic">behind</em> you.
          </h2>
        </Reveal>

        <div className="mt-24 space-y-24 md:space-y-32">
          <Stanza
            time="Sunday, late afternoon"
            body="You sit down with a cup of tea and open the week. Fourteen programmes, nine check-ins, three clients travelling. It takes forty minutes \u2014 not four hours \u2014 because the work has come in already, sorted and waiting."
            art={<ArtWeekGrid />}
          />

          <Stanza
            reverse
            time="Monday, on the train"
            body="A client's energy has been rated two, two days in a row. You see it the moment you open the app. You send a note \u2014 the thread attaches itself to the week it's about, so six weeks from now you'll still know what you meant."
            art={<ArtPulse />}
          />

          <Stanza
            time="Wednesday, mid-session"
            body="One of the compound lifts isn't moving. You tap the cell, drop the load, add a note in the margin. The client sees the change live, keeps going, finishes the set. You don't have to email a new PDF that night."
            art={<ArtCell />}
          />

          <Stanza
            reverse
            time="Saturday, later"
            body="Progress photos arrive quietly. Six angles, two weeks apart, already laid next to each other. You write three lines, tap send. The client reads it Sunday morning, before they open your week."
            art={<ArtPhotos />}
          />
        </div>
      </div>
    </section>
  );
}

function Stanza({
  time,
  body,
  art,
  reverse = false,
}: {
  time: string;
  body: string;
  art: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid md:grid-cols-12 gap-10 md:gap-16 items-center ${
        reverse ? "" : ""
      }`}
    >
      <Reveal
        className={`md:col-span-6 ${reverse ? "md:order-2" : ""}`}
      >
        <p className="eyebrow">{time}</p>
        <p className="font-serif text-[clamp(1.3rem,2.4vw,1.85rem)] mt-5 leading-[1.35] text-ink/85">
          {body}
        </p>
      </Reveal>
      <Reveal
        delay={140}
        className={`md:col-span-6 ${reverse ? "md:order-1" : ""}`}
      >
        <div className="aspect-[5/3.5] rounded-2xl border hair relative overflow-hidden bg-paper-warm/50 grain">
          {art}
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- SVG art panels ---------- */

function ArtWeekGrid() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const filled = [3, 10, 11, 17, 24, 25, 32];
  const due = [2, 9, 23];

  return (
    <svg viewBox="0 0 500 350" className="absolute inset-0 w-full h-full p-4">
      {days.map((d, i) => (
        <text
          key={i}
          x={42 + i * 60}
          y={36}
          fontSize="12"
          fill="#14110e"
          fillOpacity="0.45"
          fontFamily="ui-sans-serif"
          textAnchor="middle"
        >
          {d}
        </text>
      ))}
      {Array.from({ length: 35 }).map((_, i) => {
        const r = Math.floor(i / 7);
        const c = i % 7;
        const isFilled = filled.includes(i);
        const isDue = due.includes(i);
        return (
          <rect
            key={i}
            x={16 + c * 60}
            y={50 + r * 52}
            width="52"
            height="40"
            rx="6"
            fill={
              isFilled
                ? "#14110e"
                : isDue
                ? "#c5572a"
                : "#ffffff"
            }
            fillOpacity={isFilled ? 0.07 : isDue ? 0.15 : 0.55}
            stroke="#14110e"
            strokeOpacity="0.08"
          />
        );
      })}
      <text
        x="16"
        y="330"
        fontSize="10"
        fill="#14110e"
        fillOpacity="0.35"
        fontFamily="ui-sans-serif"
      >
        14 programmes \u00b7 9 check-ins \u00b7 3 away
      </text>
    </svg>
  );
}

function ArtPulse() {
  return (
    <svg viewBox="0 0 500 350" className="absolute inset-0 w-full h-full p-4">
      <text
        x="30"
        y="40"
        fontSize="11"
        fill="#14110e"
        fillOpacity="0.4"
        fontFamily="ui-sans-serif"
        letterSpacing="0.06em"
      >
        ENERGY \u00b7 14 DAYS
      </text>

      <path
        d="M 30 200 L 60 190 L 95 170 L 130 200 L 165 185 L 200 225 L 235 260 L 270 245 L 305 150 L 340 160 L 375 140 L 410 125 L 445 135 L 470 115"
        fill="none"
        stroke="#14110e"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLineJoin="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
        style={{
          animation:
            "draw 2.4s 0.2s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      />

      {/* Low energy markers */}
      <circle cx="235" cy="260" r="6" fill="#c5572a" />
      <circle cx="200" cy="225" r="4" fill="#c5572a" fillOpacity="0.6" />

      {/* Alert badge */}
      <rect
        x="205"
        y="278"
        width="64"
        height="22"
        rx="11"
        fill="#14110e"
      />
      <text
        x="237"
        y="293"
        fontSize="9"
        fill="#f5f1ea"
        textAnchor="middle"
        fontFamily="ui-sans-serif"
      >
        check in?
      </text>

      {/* Subtle area fill */}
      <path
        d="M 30 200 L 60 190 L 95 170 L 130 200 L 165 185 L 200 225 L 235 260 L 270 245 L 305 150 L 340 160 L 375 140 L 410 125 L 445 135 L 470 115 L 470 320 L 30 320 Z"
        fill="#14110e"
        fillOpacity="0.03"
      />
    </svg>
  );
}

function ArtCell() {
  return (
    <svg viewBox="0 0 500 350" className="absolute inset-0 w-full h-full p-4">
      <g fontFamily="ui-sans-serif">
        {/* Headers */}
        <text x="30" y="50" fontSize="10" fill="#14110e" fillOpacity="0.4" letterSpacing="0.06em">
          EXERCISE
        </text>
        <text x="180" y="50" fontSize="10" fill="#14110e" fillOpacity="0.4" letterSpacing="0.06em">
          SET
        </text>
        <text x="240" y="50" fontSize="10" fill="#14110e" fillOpacity="0.4" letterSpacing="0.06em">
          LOAD
        </text>
        <text x="320" y="50" fontSize="10" fill="#14110e" fillOpacity="0.4" letterSpacing="0.06em">
          REPS
        </text>

        <line
          x1="20"
          y1="64"
          x2="480"
          y2="64"
          stroke="#14110e"
          strokeOpacity="0.1"
        />

        {/* Row */}
        <text x="30" y="100" fontSize="15" fill="#14110e">
          Bench Press
        </text>
        <text x="180" y="100" fontSize="15" fill="#14110e" fillOpacity="0.7">
          3
        </text>

        {/* Load change */}
        <text
          x="240"
          y="100"
          fontSize="15"
          fill="#14110e"
          fillOpacity="0.3"
          textDecoration="line-through"
        >
          85
        </text>
        <text x="275" y="100" fontSize="17" fill="#c5572a" fontWeight="500">
          75
        </text>

        <text x="320" y="100" fontSize="15" fill="#14110e" fillOpacity="0.7">
          8
        </text>

        <line
          x1="20"
          y1="118"
          x2="480"
          y2="118"
          stroke="#14110e"
          strokeOpacity="0.1"
        />

        {/* Active cell highlight */}
        <rect
          x="230"
          y="78"
          width="80"
          height="32"
          fill="none"
          stroke="#c5572a"
          strokeWidth="2"
          rx="4"
        >
          <animate
            attributeName="stroke-opacity"
            values="1;0.25;1"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Note */}
        <text
          x="30"
          y="165"
          fontSize="14"
          fill="#14110e"
          fillOpacity="0.5"
          fontFamily="ui-serif"
          fontStyle="italic"
        >
          note \u2014
        </text>
        <text
          x="96"
          y="165"
          fontSize="14"
          fill="#14110e"
          fillOpacity="0.6"
        >
          bar speed dropped, keep easy today
        </text>

        {/* Live indicator */}
        <circle cx="30" cy="220" r="4" fill="#3a4634">
          <animate
            attributeName="r"
            values="4;6;4"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x="44"
          y="224"
          fontSize="11"
          fill="#3a4634"
          fillOpacity="0.7"
        >
          Client sees this change live
        </text>
      </g>
    </svg>
  );
}

function ArtPhotos() {
  return (
    <svg viewBox="0 0 500 350" className="absolute inset-0 w-full h-full p-4">
      {[0, 1, 2, 3].map((i) => {
        const x = 36 + i * 110;
        return (
          <g key={i}>
            <rect
              x={x}
              y="40"
              width="92"
              height="230"
              rx="8"
              fill="#14110e"
              fillOpacity={0.03 + i * 0.02}
              stroke="#14110e"
              strokeOpacity="0.12"
            />

            {/* Silhouette placeholder */}
            <ellipse
              cx={x + 46}
              cy={120}
              rx="16"
              ry="14"
              fill="#14110e"
              fillOpacity={0.08 + i * 0.04}
            />
            <path
              d={`M ${x + 22} 230 Q ${x + 46} ${180 - i * 8} ${x + 70} 230`}
              fill="#14110e"
              fillOpacity={0.06 + i * 0.03}
            />

            {/* Week label */}
            <text
              x={x + 46}
              y={295}
              fontSize="11"
              fill="#14110e"
              fillOpacity="0.45"
              textAnchor="middle"
              fontFamily="ui-sans-serif"
            >
              wk {i * 2}
            </text>
          </g>
        );
      })}

      {/* Arrow between last two */}
      <line
        x1="358"
        y1="315"
        x2="440"
        y2="315"
        stroke="#c5572a"
        strokeWidth="1.5"
        markerEnd=""
      />
      <text
        x="399"
        y="335"
        fontSize="10"
        fill="#c5572a"
        textAnchor="middle"
        fontFamily="ui-sans-serif"
      >
        visible progress
      </text>
    </svg>
  );
}
