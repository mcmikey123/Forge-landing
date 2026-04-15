"use client";

import { useState } from "react";
import { uid, useStore } from "@/lib/store";
import type { Supplement } from "@/lib/types";

function emptySupp(): Supplement {
  return {
    id: uid(),
    name: "",
    dose: "",
    notes: "",
    imageUrl: "",
    link: "",
    createdAt: Date.now(),
  };
}

export default function SupplementsPage() {
  const { state, update } = useStore();
  const isPT = state.role === "pt";
  const [editing, setEditing] = useState<Supplement | null>(null);

  function save(s: Supplement) {
    update((st) => {
      const exists = st.supplements.some((x) => x.id === s.id);
      return {
        ...st,
        supplements: exists
          ? st.supplements.map((x) => (x.id === s.id ? s : x))
          : [s, ...st.supplements],
      };
    });
    setEditing(null);
  }

  function remove(id: string) {
    update((st) => ({
      ...st,
      supplements: st.supplements.filter((s) => s.id !== id),
    }));
  }

  return (
    <div className="space-y-8 pt-6">
      <header className="space-y-2">
        <p className="chip">Supplements</p>
        <h1 className="font-serif text-4xl md:text-5xl">
          {isPT ? "Recommend the stack." : "Your recommended stack."}
        </h1>
        <p className="max-w-xl text-sm text-ink/70">
          {isPT
            ? "Add what you want your client to take. Name, image, link — that's it."
            : "Your PT's recommendations. Tap through to buy the exact product they use."}
        </p>
      </header>

      {isPT && (
        <div className="flex justify-end">
          <button onClick={() => setEditing(emptySupp())} className="btn">
            Add supplement
          </button>
        </div>
      )}

      {editing && (
        <SupplementEditor
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {state.supplements.map((s) => (
          <div key={s.id} className="card flex flex-col overflow-hidden p-0">
            <div className="aspect-square w-full overflow-hidden bg-ink/5">
              {s.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.imageUrl}
                  alt={s.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-ink/30">
                  No image
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-serif text-xl">{s.name}</h3>
              {s.dose && <p className="text-sm text-ink/60">{s.dose}</p>}
              {s.notes && (
                <p className="mt-2 text-sm text-ink/70">{s.notes}</p>
              )}
              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                {s.link ? (
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ember !py-1.5 text-xs"
                  >
                    View product →
                  </a>
                ) : (
                  <span className="text-xs text-ink/40">No link</span>
                )}
                {isPT && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditing(s)}
                      className="rounded-full border border-ink/20 px-3 py-1 text-xs hover:border-ink/60"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(s.id)}
                      className="rounded-full border border-ink/20 px-3 py-1 text-xs hover:border-ember hover:text-ember"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {state.supplements.length === 0 && (
          <div className="card col-span-full text-sm text-ink/60">
            No supplements recommended yet.
          </div>
        )}
      </div>
    </div>
  );
}

function SupplementEditor({
  initial,
  onCancel,
  onSave,
}: {
  initial: Supplement;
  onCancel: () => void;
  onSave: (s: Supplement) => void;
}) {
  const [s, setS] = useState<Supplement>(initial);
  return (
    <div className="card border-ink/30 bg-white">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">Name</label>
          <input
            className="field"
            value={s.name}
            onChange={(e) => setS({ ...s, name: e.target.value })}
            placeholder="Creatine Monohydrate"
          />
        </div>
        <div>
          <label className="label">Dose / timing</label>
          <input
            className="field"
            value={s.dose}
            onChange={(e) => setS({ ...s, dose: e.target.value })}
            placeholder="5g daily"
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Image URL</label>
          <input
            className="field"
            value={s.imageUrl}
            onChange={(e) => setS({ ...s, imageUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Product link</label>
          <input
            className="field"
            value={s.link}
            onChange={(e) => setS({ ...s, link: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Notes</label>
          <textarea
            className="field min-h-[80px]"
            value={s.notes}
            onChange={(e) => setS({ ...s, notes: e.target.value })}
            placeholder="Why you've chosen this for the client."
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
        <button
          onClick={() => onSave(s)}
          disabled={!s.name.trim()}
          className="btn"
        >
          Save
        </button>
      </div>
    </div>
  );
}
