"use client";

import { useMemo, useState } from "react";
import { todayISO, uid, useStore } from "@/lib/store";
import type { MealItem, MealTemplate } from "@/lib/types";

function totals(items: MealItem[]) {
  return items.reduce(
    (acc, i) => ({
      calories: acc.calories + i.calories,
      protein: acc.protein + i.protein,
      carbs: acc.carbs + i.carbs,
      fat: acc.fat + i.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function emptyItem(): MealItem {
  return {
    id: uid(),
    name: "",
    grams: 0,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };
}

export default function MealBuilderPage() {
  const { state } = useStore();
  const isPT = state.role === "pt";

  return (
    <div className="space-y-10 pt-6">
      <header className="space-y-2">
        <p className="chip">Meal Builder</p>
        <h1 className="font-serif text-4xl md:text-5xl">
          {isPT ? "Templates you set for your clients." : "Your meals, ready to import."}
        </h1>
        <p className="max-w-xl text-sm text-ink/70">
          {isPT
            ? "Create reusable meal templates. Clients import them into their diary with one tap."
            : "Tap a template to import it into today's food diary, or pick a different date."}
        </p>
      </header>

      {isPT ? <TrainerView /> : <ClientView />}

      <FoodDiary />
    </div>
  );
}

function TrainerView() {
  const { state, update } = useStore();
  const [editing, setEditing] = useState<MealTemplate | null>(null);

  function startNew() {
    setEditing({
      id: uid(),
      name: "",
      description: "",
      tag: "breakfast",
      items: [emptyItem()],
      createdAt: Date.now(),
    });
  }

  function saveTemplate(tpl: MealTemplate) {
    update((s) => {
      const exists = s.mealTemplates.some((t) => t.id === tpl.id);
      return {
        ...s,
        mealTemplates: exists
          ? s.mealTemplates.map((t) => (t.id === tpl.id ? tpl : t))
          : [tpl, ...s.mealTemplates],
      };
    });
    setEditing(null);
  }

  function deleteTemplate(id: string) {
    update((s) => ({
      ...s,
      mealTemplates: s.mealTemplates.filter((t) => t.id !== id),
    }));
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Your meal templates</h2>
        <button onClick={startNew} className="btn">
          New template
        </button>
      </div>

      {editing && (
        <TemplateEditor
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={saveTemplate}
        />
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {state.mealTemplates.map((t) => {
          const m = totals(t.items);
          return (
            <div key={t.id} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl">{t.name}</h3>
                    <span className="chip capitalize">{t.tag}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink/60">{t.description}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditing(t)}
                    className="rounded-full border border-ink/20 px-3 py-1 text-xs hover:border-ink/60"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTemplate(t.id)}
                    className="rounded-full border border-ink/20 px-3 py-1 text-xs hover:border-ember hover:text-ember"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <ul className="mt-3 space-y-1 text-sm">
                {t.items.map((i) => (
                  <li key={i.id} className="flex justify-between text-ink/70">
                    <span>
                      {i.name} · {i.grams}g
                    </span>
                    <span>{i.calories} kcal</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink/60">
                <span className="chip">{m.calories} kcal</span>
                <span className="chip">P {m.protein}g</span>
                <span className="chip">C {m.carbs}g</span>
                <span className="chip">F {m.fat}g</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TemplateEditor({
  initial,
  onCancel,
  onSave,
}: {
  initial: MealTemplate;
  onCancel: () => void;
  onSave: (t: MealTemplate) => void;
}) {
  const [tpl, setTpl] = useState<MealTemplate>(initial);
  const m = totals(tpl.items);

  function setItem(id: string, patch: Partial<MealItem>) {
    setTpl((t) => ({
      ...t,
      items: t.items.map((i) => (i.id === id ? { ...i, ...patch } : i)),
    }));
  }

  return (
    <div className="card border-ink/30 bg-white">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="label">Name</label>
          <input
            className="field"
            value={tpl.name}
            onChange={(e) => setTpl({ ...tpl, name: e.target.value })}
            placeholder="e.g. Power Oats"
          />
        </div>
        <div>
          <label className="label">Meal type</label>
          <select
            className="field"
            value={tpl.tag}
            onChange={(e) =>
              setTpl({ ...tpl, tag: e.target.value as MealTemplate["tag"] })
            }
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label">Description / notes for the client</label>
          <input
            className="field"
            value={tpl.description}
            onChange={(e) => setTpl({ ...tpl, description: e.target.value })}
            placeholder="When to use this meal, swaps allowed, etc."
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-serif text-lg">Items</h4>
          <button
            onClick={() =>
              setTpl({ ...tpl, items: [...tpl.items, emptyItem()] })
            }
            className="btn-ghost !py-1.5 text-xs"
          >
            + Add item
          </button>
        </div>
        <div className="space-y-2">
          {tpl.items.map((i) => (
            <div key={i.id} className="grid grid-cols-12 gap-2">
              <input
                className="field col-span-4"
                placeholder="Item"
                value={i.name}
                onChange={(e) => setItem(i.id, { name: e.target.value })}
              />
              <input
                className="field col-span-1"
                type="number"
                placeholder="g"
                value={i.grams || ""}
                onChange={(e) =>
                  setItem(i.id, { grams: Number(e.target.value) })
                }
              />
              <input
                className="field col-span-2"
                type="number"
                placeholder="kcal"
                value={i.calories || ""}
                onChange={(e) =>
                  setItem(i.id, { calories: Number(e.target.value) })
                }
              />
              <input
                className="field col-span-1"
                type="number"
                placeholder="P"
                value={i.protein || ""}
                onChange={(e) =>
                  setItem(i.id, { protein: Number(e.target.value) })
                }
              />
              <input
                className="field col-span-1"
                type="number"
                placeholder="C"
                value={i.carbs || ""}
                onChange={(e) =>
                  setItem(i.id, { carbs: Number(e.target.value) })
                }
              />
              <input
                className="field col-span-1"
                type="number"
                placeholder="F"
                value={i.fat || ""}
                onChange={(e) => setItem(i.id, { fat: Number(e.target.value) })}
              />
              <button
                onClick={() =>
                  setTpl({
                    ...tpl,
                    items: tpl.items.filter((x) => x.id !== i.id),
                  })
                }
                className="col-span-2 rounded-lg border border-ink/20 text-xs text-ink/60 hover:border-ember hover:text-ember"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="chip">{m.calories} kcal</span>
          <span className="chip">P {m.protein}g</span>
          <span className="chip">C {m.carbs}g</span>
          <span className="chip">F {m.fat}g</span>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
        <button
          onClick={() => onSave(tpl)}
          disabled={!tpl.name.trim() || tpl.items.length === 0}
          className="btn"
        >
          Save template
        </button>
      </div>
    </div>
  );
}

function ClientView() {
  const { state, update } = useStore();
  const [date, setDate] = useState(todayISO());

  function importTemplate(tpl: MealTemplate) {
    update((s) => ({
      ...s,
      diary: [
        {
          id: uid(),
          date,
          mealName: tpl.name,
          templateId: tpl.id,
          items: tpl.items.map((i) => ({ ...i, id: uid() })),
        },
        ...s.diary,
      ],
    }));
  }

  const groups = useMemo(() => {
    const map = new Map<string, MealTemplate[]>();
    state.mealTemplates.forEach((t) => {
      const arr = map.get(t.tag) ?? [];
      arr.push(t);
      map.set(t.tag, arr);
    });
    return map;
  }, [state.mealTemplates]);

  const order: MealTemplate["tag"][] = ["breakfast", "lunch", "dinner", "snack"];

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-serif text-2xl">Templates from your PT</h2>
        <label className="ml-auto flex items-center gap-2 text-sm text-ink/60">
          Import to
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="field max-w-[160px]"
          />
        </label>
      </div>

      {order.map((tag) => {
        const tpls = groups.get(tag);
        if (!tpls || tpls.length === 0) return null;
        return (
          <div key={tag}>
            <h3 className="mb-2 text-sm uppercase tracking-wider text-ink/50">
              {tag}
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {tpls.map((t) => {
                const m = totals(t.items);
                return (
                  <div key={t.id} className="card flex flex-col">
                    <h4 className="font-serif text-xl">{t.name}</h4>
                    <p className="mt-1 text-sm text-ink/60">{t.description}</p>
                    <ul className="mt-3 space-y-1 text-sm text-ink/70">
                      {t.items.map((i) => (
                        <li key={i.id} className="flex justify-between">
                          <span>
                            {i.name} · {i.grams}g
                          </span>
                          <span>{i.calories} kcal</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="chip">{m.calories} kcal</span>
                      <span className="chip">P {m.protein}g</span>
                      <span className="chip">C {m.carbs}g</span>
                      <span className="chip">F {m.fat}g</span>
                    </div>
                    <button
                      onClick={() => importTemplate(t)}
                      className="btn mt-4 self-start"
                    >
                      Import to diary
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function FoodDiary() {
  const { state, update } = useStore();
  const [date, setDate] = useState(todayISO());

  const entries = state.diary.filter((e) => e.date === date);
  const m = totals(entries.flatMap((e) => e.items));

  function remove(id: string) {
    update((s) => ({ ...s, diary: s.diary.filter((e) => e.id !== id) }));
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-serif text-2xl">Food diary</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="field ml-auto max-w-[160px]"
        />
      </div>

      {entries.length === 0 ? (
        <div className="card text-sm text-ink/60">
          No meals logged for {date}. Import a template above to fill this in.
        </div>
      ) : (
        <div className="card space-y-3">
          {entries.map((e) => (
            <div key={e.id} className="border-b border-ink/10 pb-3 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg">{e.mealName}</h4>
                <button
                  onClick={() => remove(e.id)}
                  className="text-xs text-ink/50 hover:text-ember"
                >
                  Remove
                </button>
              </div>
              <ul className="mt-1 space-y-0.5 text-sm text-ink/70">
                {e.items.map((i) => (
                  <li key={i.id} className="flex justify-between">
                    <span>
                      {i.name} · {i.grams}g
                    </span>
                    <span>{i.calories} kcal</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-wrap gap-2 pt-2 text-xs">
            <span className="chip">Daily total</span>
            <span className="chip">{m.calories} kcal</span>
            <span className="chip">P {m.protein}g</span>
            <span className="chip">C {m.carbs}g</span>
            <span className="chip">F {m.fat}g</span>
          </div>
        </div>
      )}
    </section>
  );
}
