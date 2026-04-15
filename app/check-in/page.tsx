"use client";

import { useMemo, useState } from "react";
import { mondayOf, todayISO, uid, useStore } from "@/lib/store";
import type { CheckIn, MoodScale } from "@/lib/types";

const QUESTIONS: {
  key: "hunger" | "performance" | "mood";
  title: string;
  description: string;
}[] = [
  {
    key: "hunger",
    title: "Hunger",
    description: "How hungry have you felt through the week, on average?",
  },
  {
    key: "performance",
    title: "Training performance",
    description: "How strong / fast / composed have your sessions felt?",
  },
  {
    key: "mood",
    title: "Mood & energy",
    description: "How's your day-to-day mood and energy outside training?",
  },
];

const SCALE_LABELS: Record<MoodScale, string> = {
  1: "Very low",
  2: "Low",
  3: "OK",
  4: "Good",
  5: "Excellent",
};

function emptyCheckIn(weekOf: string): CheckIn {
  return {
    id: uid(),
    weekOf,
    hungerRating: 3,
    hungerNotes: "",
    performanceRating: 3,
    performanceNotes: "",
    moodRating: 3,
    moodNotes: "",
  };
}

export default function CheckInPage() {
  const { state, update } = useStore();
  const isPT = state.role === "pt";
  const currentWeek = mondayOf(todayISO());

  const existing = state.checkIns.find((c) => c.weekOf === currentWeek);
  const [draft, setDraft] = useState<CheckIn>(
    existing ?? emptyCheckIn(currentWeek)
  );

  function saveDraft(submit: boolean) {
    const toSave: CheckIn = {
      ...draft,
      submittedAt: submit ? Date.now() : draft.submittedAt,
    };
    update((s) => {
      const idx = s.checkIns.findIndex((c) => c.id === toSave.id);
      const next =
        idx >= 0
          ? s.checkIns.map((c) => (c.id === toSave.id ? toSave : c))
          : [toSave, ...s.checkIns];
      return { ...s, checkIns: next };
    });
    setDraft(toSave);
  }

  const history = useMemo(
    () => [...state.checkIns].sort((a, b) => b.weekOf.localeCompare(a.weekOf)),
    [state.checkIns]
  );

  return (
    <div className="space-y-10 pt-6">
      <header className="space-y-2">
        <p className="chip">Weekly check-in · week of {currentWeek}</p>
        <h1 className="font-serif text-4xl md:text-5xl">
          {isPT
            ? "Your client's answers before the call."
            : "Complete before your check-in call."}
        </h1>
        <p className="max-w-xl text-sm text-ink/70">
          {isPT
            ? "Ratings and notes land here each week so the call starts with signal, not small talk."
            : "Rate each area, then add context in the notes. Submit before your call."}
        </p>
      </header>

      {isPT ? (
        <TrainerCheckInView history={history} />
      ) : (
        <ClientCheckInForm
          draft={draft}
          setDraft={setDraft}
          onSave={saveDraft}
          history={history}
        />
      )}
    </div>
  );
}

function ClientCheckInForm({
  draft,
  setDraft,
  onSave,
  history,
}: {
  draft: CheckIn;
  setDraft: (c: CheckIn) => void;
  onSave: (submit: boolean) => void;
  history: CheckIn[];
}) {
  const submitted = !!draft.submittedAt;
  return (
    <>
      <section className="space-y-4">
        {QUESTIONS.map((q) => {
          const ratingKey = `${q.key}Rating` as
            | "hungerRating"
            | "performanceRating"
            | "moodRating";
          const notesKey = `${q.key}Notes` as
            | "hungerNotes"
            | "performanceNotes"
            | "moodNotes";
          const rating = draft[ratingKey];
          return (
            <div key={q.key} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl">{q.title}</h3>
                  <p className="text-sm text-ink/60">{q.description}</p>
                </div>
                <span className="chip">{SCALE_LABELS[rating]}</span>
              </div>
              <div className="mt-4 flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() =>
                      setDraft({ ...draft, [ratingKey]: n as MoodScale })
                    }
                    className={`h-10 flex-1 rounded-lg border text-sm transition ${
                      rating === n
                        ? "border-ink bg-ink text-parchment"
                        : "border-ink/20 hover:border-ink/60"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <textarea
                className="field mt-3 min-h-[90px]"
                placeholder={`Notes on ${q.title.toLowerCase()}...`}
                value={draft[notesKey]}
                onChange={(e) =>
                  setDraft({ ...draft, [notesKey]: e.target.value })
                }
              />
            </div>
          );
        })}

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => onSave(false)} className="btn-ghost">
            Save draft
          </button>
          <button onClick={() => onSave(true)} className="btn">
            {submitted ? "Update submission" : "Submit to PT"}
          </button>
          {submitted && (
            <span className="text-xs text-ink/60">
              Submitted{" "}
              {new Date(draft.submittedAt!).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          )}
        </div>
      </section>

      {history.length > 1 && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl">Past check-ins</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {history
              .filter((h) => h.id !== draft.id)
              .map((h) => (
                <CheckInCard key={h.id} c={h} />
              ))}
          </div>
        </section>
      )}
    </>
  );
}

function TrainerCheckInView({ history }: { history: CheckIn[] }) {
  if (history.length === 0) {
    return (
      <div className="card text-sm text-ink/60">
        Your client has not submitted a check-in yet.
      </div>
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {history.map((c) => (
        <CheckInCard key={c.id} c={c} detailed />
      ))}
    </div>
  );
}

function CheckInCard({ c, detailed = false }: { c: CheckIn; detailed?: boolean }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl">Week of {c.weekOf}</h3>
        {c.submittedAt ? (
          <span className="chip">Submitted</span>
        ) : (
          <span className="chip border-ember/60 text-ember">Draft</span>
        )}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
        <Metric label="Hunger" value={c.hungerRating} />
        <Metric label="Performance" value={c.performanceRating} />
        <Metric label="Mood" value={c.moodRating} />
      </div>
      {detailed && (
        <div className="mt-3 space-y-2 text-sm">
          {c.hungerNotes && (
            <p>
              <span className="text-ink/50">Hunger — </span>
              {c.hungerNotes}
            </p>
          )}
          {c.performanceNotes && (
            <p>
              <span className="text-ink/50">Performance — </span>
              {c.performanceNotes}
            </p>
          )}
          {c.moodNotes && (
            <p>
              <span className="text-ink/50">Mood — </span>
              {c.moodNotes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-ink/10 py-2">
      <div className="font-serif text-2xl">{value}</div>
      <div className="text-xs uppercase tracking-wider text-ink/50">{label}</div>
    </div>
  );
}
