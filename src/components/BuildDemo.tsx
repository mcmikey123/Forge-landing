"use client";

import { useEffect, useState } from "react";

type Cur = { x: number; y: number; tap: boolean };

function Cursor({ x, y, tap }: Cur) {
  return (
    <div className={`cursor ${tap ? "tap" : ""}`} style={{ left: x, top: y }}>
      <svg viewBox="0 0 16 16" fill="#fff" stroke="#0d0d0b" strokeWidth={1} strokeLinejoin="round">
        <path d="M2 2 L2 12 L5 9 L7.5 14 L9.5 13 L7 8 L11 8 Z" />
      </svg>
    </div>
  );
}

function PhaseDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  const [client, setClient] = useState<string | null>(null);
  const [cur, setCur] = useState<Cur>({ x: 40, y: 80, tap: false });

  useEffect(() => {
    setPicked(null);
    setClient(null);
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setCur({ x: 50, y: 70, tap: false }), 200));
    t.push(setTimeout(() => setCur({ x: 50, y: 70, tap: true }), 900));
    t.push(setTimeout(() => { setClient("amy"); setCur({ x: 50, y: 70, tap: false }); }, 1100));
    t.push(setTimeout(() => setCur({ x: 60, y: 170, tap: false }), 1600));
    t.push(setTimeout(() => setCur({ x: 60, y: 170, tap: true }), 2200));
    t.push(setTimeout(() => setPicked("cut"), 2300));
    t.push(setTimeout(() => setCur({ x: 115, y: 170, tap: true }), 2900));
    t.push(setTimeout(() => setPicked("cut-maint"), 3000));
    t.push(setTimeout(() => setCur({ x: 175, y: 170, tap: true }), 3600));
    t.push(setTimeout(() => setPicked("full"), 3700));
    return () => t.forEach(clearTimeout);
  }, []);

  const clients = [
    { id: "amy", n: "Amy R.", m: "Hypertrophy" },
    { id: "priya", n: "Priya D.", m: "Cut wk3" },
    { id: "jonah", n: "Jonah R.", m: "Strength" },
  ];

  return (
    <div className="feat-stage" style={{ position: "relative" }}>
      <span className="new-flag">New · phase planner</span>
      <div className="stage-head">
        <div className="stage-title">Plan a phase</div>
        <div className="stage-sub">24 week view</div>
      </div>
      <div className="stg-clients">
        {clients.map((c) => (
          <div key={c.id} className={`stg-client ${client === c.id ? "picked" : ""}`}>
            <div className="sc-av">{c.n[0]}</div>
            <div className="sc-name">{c.n}</div>
            <div className="sc-meta">{c.m}</div>
          </div>
        ))}
      </div>
      <div className="stg-timeline">
        <span className="cut" style={{ flex: picked ? 2 : 0, background: "oklch(0.65 0.16 30)" }} />
        <span className="maint" style={{ flex: picked === "cut-maint" || picked === "full" ? 1 : 0, background: "color-mix(in oklab, var(--ink-3) 70%, var(--bg-2))" }} />
        <span className="bulk" style={{ flex: picked === "full" ? 3 : 0, background: "var(--accent)" }} />
      </div>
      <div className="stg-phase-legend">
        <span className={`phase-chip ${picked ? "picked" : ""}`}><span className="sw cut" />Cut 8wk</span>
        <span className={`phase-chip ${picked === "cut-maint" || picked === "full" ? "picked" : ""}`}><span className="sw maint" />Maint 4wk</span>
        <span className={`phase-chip ${picked === "full" ? "picked" : ""}`}><span className="sw bulk" />Bulk 12wk</span>
      </div>
      <Cursor x={cur.x} y={cur.y} tap={cur.tap} />
    </div>
  );
}

function SupplementDemo() {
  const [on, setOn] = useState({ creatine: false, whey: false, omega: false });
  const [cur, setCur] = useState<Cur>({ x: 40, y: 70, tap: false });

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setCur({ x: 150, y: 120, tap: false }), 300));
    t.push(setTimeout(() => setCur({ x: 150, y: 120, tap: true }), 1000));
    t.push(setTimeout(() => setOn((s) => ({ ...s, creatine: true })), 1100));
    t.push(setTimeout(() => setCur({ x: 150, y: 160, tap: true }), 1800));
    t.push(setTimeout(() => setOn((s) => ({ ...s, whey: true })), 1900));
    t.push(setTimeout(() => setCur({ x: 150, y: 200, tap: true }), 2600));
    t.push(setTimeout(() => setOn((s) => ({ ...s, omega: true })), 2700));
    return () => t.forEach(clearTimeout);
  }, []);

  const supps: { k: keyof typeof on; n: string; d: string }[] = [
    { k: "creatine", n: "Creatine mono", d: "5g · daily" },
    { k: "whey", n: "Whey isolate", d: "30g · post" },
    { k: "omega", n: "Omega 3", d: "2g · am" },
  ];

  return (
    <div className="feat-stage" style={{ position: "relative" }}>
      <span className="new-flag">New · supplements</span>
      <div className="stage-head">
        <div className="stage-title">Marcus F. · stack</div>
        <div className="stage-sub">{Object.values(on).filter(Boolean).length} assigned</div>
      </div>
      <div className="stg-supp-list">
        {supps.map((s) => (
          <div key={s.k} className={`supp-row ${on[s.k] ? "on" : ""}`}>
            <div className="sr-check" />
            <div className="sr-name">{s.n}</div>
            <div className="sr-dose">{s.d}</div>
          </div>
        ))}
      </div>
      <Cursor x={cur.x} y={cur.y} tap={cur.tap} />
    </div>
  );
}

function CategoryDemo() {
  const [picked, setPicked] = useState<"sports" | "body" | "casual" | null>(null);
  const [cur, setCur] = useState<Cur>({ x: 40, y: 60, tap: false });

  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setCur({ x: 50, y: 110, tap: false }), 300));
    t.push(setTimeout(() => setCur({ x: 50, y: 110, tap: true }), 1000));
    t.push(setTimeout(() => setPicked("sports"), 1100));
    t.push(setTimeout(() => setCur({ x: 130, y: 110, tap: true }), 2400));
    t.push(setTimeout(() => setPicked("body"), 2500));
    return () => t.forEach(clearTimeout);
  }, []);

  const cats = [
    { k: "sports" as const, n: "Sports perf", c: 24 },
    { k: "body" as const, n: "Bodybuilding", c: 78 },
    { k: "casual" as const, n: "Casual", c: 38 },
  ];
  const clientsByCat: Record<string, { n: string; t: string }[]> = {
    sports: [{ n: "Jonah R.", t: "Rugby" }, { n: "Elle H.", t: "Triathlon" }, { n: "Kai O.", t: "Football" }],
    body: [{ n: "Marcus F.", t: "Hypertrophy" }, { n: "Priya D.", t: "Cut wk3" }, { n: "Tomas O.", t: "Bulk" }],
    casual: [{ n: "Sam L.", t: "Gen fit" }, { n: "Rae N.", t: "Gen fit" }],
  };

  return (
    <div className="feat-stage" style={{ position: "relative" }}>
      <span className="new-flag">New · categories</span>
      <div className="stage-head">
        <div className="stage-title">Client categories</div>
        <div className="stage-sub">filter by type</div>
      </div>
      <div className="stg-cats">
        {cats.map((c) => (
          <div key={c.k} className={`cat-tab ${picked === c.k ? "picked" : ""}`}>
            {c.n}
            <span className="count">{c.c}</span>
          </div>
        ))}
      </div>
      <div className="cat-clients">
        {picked &&
          clientsByCat[picked].map((c, i) => (
            <div key={`${picked}-${i}`} className="cc-row" style={{ animationDelay: `${i * 80}ms` }}>
              <span>{c.n}</span>
              <span className="tag">{c.t}</span>
            </div>
          ))}
      </div>
      <Cursor x={cur.x} y={cur.y} tap={cur.tap} />
    </div>
  );
}

const scenes = [
  {
    coach: { name: "Amy", role: "Online coach · 62 clients", initials: "A", image: "/images/amy.webp" },
    ask: "Hey would it be possible to add a phase planner so we can plan long term for cutting / maintenance / bulking phases?",
    reply: "Absolutely.",
    Demo: PhaseDemo,
  },
  {
    coach: { name: "Connor", role: "Strength coach · 38 clients", initials: "C", image: "/images/connor.webp" },
    ask: "Hey dude, can we add a supplement section so we can assign supplements to certain clients?",
    reply: "No problem.",
    Demo: SupplementDemo,
  },
  {
    coach: { name: "George", role: "Hybrid gym · 140 clients", initials: "G", image: "/images/george.webp" },
    ask: "Hi, is it possible to add categories for clients? For example sports performance, bodybuilding, casual fitness.",
    reply: "Yeah no worries.",
    Demo: CategoryDemo,
  },
];

export default function BuildDemo() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(0);
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setPhase(1), 500));
    t.push(setTimeout(() => setPhase(2), 2600));
    t.push(setTimeout(() => setPhase(3), 3900));
    t.push(setTimeout(() => setPhase(4), 4700));
    t.push(setTimeout(() => setSceneIdx((sceneIdx + 1) % scenes.length), 11000));
    return () => t.forEach(clearTimeout);
  }, [sceneIdx]);

  const scene = scenes[sceneIdx];
  const Demo = scene.Demo;

  return (
    <div className="build-demo">
      <div className="chat-pane">
        <div className="chat-head">
          <div
            className="chat-av"
            style={{ backgroundImage: `url(${scene.coach.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div>
            <div className="chat-name">{scene.coach.name}</div>
            <div className="chat-role">{scene.coach.role}</div>
          </div>
        </div>
        <div className="chat-scroll">
          {phase >= 1 && (
            <div className="msg them" key={`${sceneIdx}-ask`}>
              <div className="m-av">{scene.coach.initials}</div>
              <div className="m-bubble">{scene.ask}</div>
            </div>
          )}
          {phase === 2 && (
            <div className="msg us" key={`${sceneIdx}-typing`}>
              <div className="m-av">f</div>
              <div className="m-bubble">
                <span className="typing"><span /><span /><span /></span>
              </div>
            </div>
          )}
          {phase >= 3 && (
            <div className="msg us" key={`${sceneIdx}-reply`}>
              <div className="m-av">f</div>
              <div className="m-bubble">{scene.reply}</div>
            </div>
          )}
        </div>
      </div>
      <div className="app-pane">
        <div className="app-pane-head">
          <span>Your Forgept</span>
          {phase < 4 ? (
            <span className="clearing">clearing</span>
          ) : (
            <span className="live-dot">
              <span />
              shipped
            </span>
          )}
        </div>
        {phase >= 4 && <Demo key={sceneIdx} />}
      </div>
    </div>
  );
}
