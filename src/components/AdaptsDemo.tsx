"use client";

import { useRef, useState } from "react";

function Sparkline() {
  return (
    <svg className="sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
      <path
        d="M0,22 L15,18 L30,24 L45,14 L60,16 L75,8 L90,10 L100,5"
        fill="none"
        stroke="oklch(0.88 0.17 115)"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Block = {
  id: string;
  label: string;
  title: string;
  sub: string;
  kind: "chips" | "spark" | "bars" | "text";
  chips?: string[];
  span?: boolean;
};

const initial: Block[] = [
  { id: "a", label: "WIDGET", title: "Today's check ins", sub: "4 awaiting response", kind: "chips", chips: ["Marcus", "Priya", "Jonah", "Elle"] },
  { id: "b", label: "WIDGET", title: "Weekly volume", sub: "back, legs, push", kind: "spark" },
  { id: "c", label: "WIDGET", title: "At risk clients", sub: "2 adherence under 70%", kind: "chips", chips: ["Tomas 58%", "Kai 64%"], span: true },
  { id: "d", label: "WIDGET", title: "Macros logged", sub: "today, 18 of 24", kind: "bars" },
  { id: "e", label: "WIDGET", title: "Next session", sub: "in 42 min, Marcus F.", kind: "text" },
];

export default function AdaptsDemo() {
  const [blocks, setBlocks] = useState<Block[]>(initial);
  const dragIdx = useRef<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const onDragStart = (i: number) => (e: React.DragEvent) => {
    dragIdx.current = i;
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (i: number) => (e: React.DragEvent) => {
    e.preventDefault();
    setOverIdx(i);
  };
  const onDragLeave = () => setOverIdx(null);
  const onDrop = (i: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const from = dragIdx.current;
    if (from == null || from === i) {
      setOverIdx(null);
      return;
    }
    const next = [...blocks];
    const [moved] = next.splice(from, 1);
    next.splice(i, 0, moved);
    setBlocks(next);
    dragIdx.current = null;
    setOverIdx(null);
  };

  return (
    <section id="adapts">
      <div className="wrap">
        <span className="section-eyebrow">How it adapts</span>
        <h2 className="section-title">
          We build the app <em>around how you coach</em>, not the other way round.
        </h2>
        <p className="section-sub">
          Most platforms ask you to fill their boxes. We start with a conversation about your day, then build you a workspace that fits. Module by module, field by field.
        </p>
        <div className="adapts-wrap">
          <div className="adapts-copy">
            <ul>
              <li>
                <span className="num">01</span>
                <div>
                  <strong>We shadow your current process.</strong>
                  <span>Before we write a line of code, we map how you actually onboard, programme and check in with clients.</span>
                </div>
              </li>
              <li>
                <span className="num">02</span>
                <div>
                  <strong>Your dashboard, your modules.</strong>
                  <span>Want check ins front and centre? Prefer a pipeline view? Move blocks until it feels right. Try the demo.</span>
                </div>
              </li>
              <li>
                <span className="num">03</span>
                <div>
                  <strong>Your language, your fields.</strong>
                  <span>RPE, RIR, MRV, subjective sleep score. Whatever you track, we wire in. No &quot;custom field&quot; hacks.</span>
                </div>
              </li>
              <li>
                <span className="num">04</span>
                <div>
                  <strong>Iterations without tickets.</strong>
                  <span>As your coaching evolves, so does your app. Direct line to the team that built it. No generic support queue.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="workspace">
            <div className="ws-head">
              <div className="ws-title">Your Workspace · Drag to rearrange</div>
              <div className="ws-hint">
                <em>try it</em>, drag any block
              </div>
            </div>
            <div className="ws-grid">
              {blocks.map((b, i) => (
                <div
                  key={b.id}
                  className={`block ${dragIdx.current === i ? "dragging" : ""} ${overIdx === i ? "drag-over" : ""} ${b.span ? "span-2" : ""}`}
                  draggable
                  onDragStart={onDragStart(i)}
                  onDragOver={onDragOver(i)}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop(i)}
                >
                  <div className="block-head">
                    <span className="block-label">{b.label}</span>
                    <span className="block-grip">⋮⋮</span>
                  </div>
                  <div className="block-title">{b.title}</div>
                  <div className="block-sub">{b.sub}</div>
                  {b.kind === "chips" && (
                    <div className="chips">
                      {b.chips!.map((c, j) => (
                        <span key={j} className="chip">{c}</span>
                      ))}
                    </div>
                  )}
                  {b.kind === "spark" && (
                    <div className="block-body">
                      <Sparkline />
                    </div>
                  )}
                  {b.kind === "bars" && (
                    <div className="block-body">
                      {[40, 62, 80, 55, 90, 72, 85].map((h, j) => (
                        <div key={j} className="bar" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  )}
                  {b.kind === "text" && (
                    <div className="block-body" style={{ alignItems: "center", justifyContent: "flex-start" }}>
                      <div style={{ fontFamily: "var(--serif)", fontSize: 26, color: "var(--accent)" }}>16:30</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
