"use client";

import { useEffect, useMemo, useState } from "react";
import { todayISO, uid, useStore } from "@/lib/store";
import type { ProgressEntry } from "@/lib/types";

type Angle = "frontUrl" | "sideUrl" | "backUrl";

const ANGLES: { key: Angle; label: string }[] = [
  { key: "frontUrl", label: "Front" },
  { key: "sideUrl", label: "Side" },
  { key: "backUrl", label: "Back" },
];

export default function ProgressPage() {
  const { state, update } = useStore();
  const isPT = state.role === "pt";

  const sorted = useMemo(
    () =>
      [...state.progress].sort((a, b) => a.date.localeCompare(b.date)),
    [state.progress]
  );

  const [leftId, setLeftId] = useState<string | null>(null);
  const [rightId, setRightId] = useState<string | null>(null);
  const [angle, setAngle] = useState<Angle>("frontUrl");

  // Default: oldest on the left, latest on the right, updated when data shifts.
  useEffect(() => {
    if (sorted.length === 0) {
      setLeftId(null);
      setRightId(null);
      return;
    }
    setLeftId((id) => (id && sorted.some((p) => p.id === id) ? id : sorted[0].id));
    setRightId((id) =>
      id && sorted.some((p) => p.id === id) ? id : sorted[sorted.length - 1].id
    );
  }, [sorted]);

  const left = sorted.find((p) => p.id === leftId) ?? null;
  const right = sorted.find((p) => p.id === rightId) ?? null;

  return (
    <div className="space-y-10 pt-6">
      <header className="space-y-2">
        <p className="chip">Progress</p>
        <h1 className="font-serif text-4xl md:text-5xl">
          Compare any two weeks, side by side.
        </h1>
        <p className="max-w-xl text-sm text-ink/70">
          Pick a date for each side — both are toggleable, so you can compare
          last month to this month, or any two weigh-ins. Weight is shown next
          to each date so the lightest days jump out.
        </p>
      </header>

      {sorted.length < 2 ? (
        <div className="card text-sm text-ink/60">
          Need at least two entries to compare. Add a couple below.
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl">Comparison</h2>
            <div className="flex rounded-full border border-ink/20 p-0.5 text-xs">
              {ANGLES.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setAngle(a.key)}
                  className={`rounded-full px-3 py-1 ${
                    angle === a.key
                      ? "bg-ink text-parchment"
                      : "text-ink/60"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ProgressPane
              label="Before"
              entries={sorted}
              selectedId={leftId}
              onSelect={setLeftId}
              entry={left}
              angle={angle}
            />
            <ProgressPane
              label="After"
              entries={sorted}
              selectedId={rightId}
              onSelect={setRightId}
              entry={right}
              angle={angle}
            />
          </div>

          {left && right && (
            <DeltaBar left={left} right={right} />
          )}
        </section>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl">All entries</h2>
          {isPT && <AddEntryButton />}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[...sorted]
            .reverse()
            .map((p) => (
              <EntryCard
                key={p.id}
                entry={p}
                onDelete={
                  isPT
                    ? () =>
                        update((s) => ({
                          ...s,
                          progress: s.progress.filter((x) => x.id !== p.id),
                        }))
                    : undefined
                }
              />
            ))}
          {sorted.length === 0 && (
            <div className="card col-span-full text-sm text-ink/60">
              No progress entries yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProgressPane({
  label,
  entries,
  selectedId,
  onSelect,
  entry,
  angle,
}: {
  label: string;
  entries: ProgressEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  entry: ProgressEntry | null;
  angle: Angle;
}) {
  const url = entry?.[angle];
  return (
    <div className="card p-0">
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
        <span className="text-xs uppercase tracking-wider text-ink/50">
          {label}
        </span>
        <select
          value={selectedId ?? ""}
          onChange={(e) => onSelect(e.target.value)}
          className="field max-w-[240px] !py-1.5 text-sm"
        >
          {entries.map((p) => (
            <option key={p.id} value={p.id}>
              {p.date} — {p.weightKg.toFixed(1)} kg
            </option>
          ))}
        </select>
      </div>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/5">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={`${label} ${entry?.date}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-ink/40">
            No photo for this angle
          </div>
        )}
        {entry && (
          <div className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-parchment backdrop-blur">
            {entry.date} · {entry.weightKg.toFixed(1)} kg
          </div>
        )}
      </div>
    </div>
  );
}

function DeltaBar({ left, right }: { left: ProgressEntry; right: ProgressEntry }) {
  const diff = right.weightKg - left.weightKg;
  const days = Math.round(
    (new Date(right.date).getTime() - new Date(left.date).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const positive = diff < 0; // weight loss is good in this context
  return (
    <div className="card flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm text-ink/60">
          {left.date} → {right.date}
        </p>
        <p className="font-serif text-2xl">
          {Math.abs(diff).toFixed(1)} kg {diff === 0 ? "unchanged" : diff < 0 ? "lost" : "gained"}
        </p>
      </div>
      <div className="flex gap-2 text-xs">
        <span className="chip">{Math.abs(days)} days</span>
        <span
          className={`chip ${
            positive
              ? "border-ember/60 text-ember"
              : diff === 0
                ? ""
                : "border-ink/60"
          }`}
        >
          {left.weightKg.toFixed(1)} → {right.weightKg.toFixed(1)} kg
        </span>
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  onDelete,
}: {
  entry: ProgressEntry;
  onDelete?: () => void;
}) {
  return (
    <div className="card p-0">
      <div className="grid grid-cols-3 gap-0.5 bg-ink/10">
        {ANGLES.map((a) => {
          const u = entry[a.key];
          return (
            <div key={a.key} className="aspect-square bg-parchment">
              {u ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={u}
                  alt={a.label}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-wider text-ink/30">
                  {a.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="font-serif text-lg">
            {entry.date} · {entry.weightKg.toFixed(1)} kg
          </div>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-xs text-ink/50 hover:text-ember"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

function AddEntryButton() {
  const { update } = useStore();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ProgressEntry>({
    id: uid(),
    date: todayISO(),
    weightKg: 0,
    frontUrl: "",
    sideUrl: "",
    backUrl: "",
  });

  function save() {
    update((s) => ({ ...s, progress: [...s.progress, draft] }));
    setOpen(false);
    setDraft({
      id: uid(),
      date: todayISO(),
      weightKg: 0,
      frontUrl: "",
      sideUrl: "",
      backUrl: "",
    });
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn">
        Add entry
      </button>
    );
  }

  return (
    <div className="card w-full">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">Date</label>
          <input
            type="date"
            className="field"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            className="field"
            value={draft.weightKg || ""}
            onChange={(e) =>
              setDraft({ ...draft, weightKg: Number(e.target.value) })
            }
          />
        </div>
        {ANGLES.map((a) => (
          <div key={a.key}>
            <label className="label">{a.label} image URL</label>
            <input
              className="field"
              value={draft[a.key] ?? ""}
              onChange={(e) => setDraft({ ...draft, [a.key]: e.target.value })}
              placeholder="https://..."
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button onClick={() => setOpen(false)} className="btn-ghost">
          Cancel
        </button>
        <button
          onClick={save}
          disabled={!draft.weightKg || !draft.date}
          className="btn"
        >
          Save entry
        </button>
      </div>
    </div>
  );
}
