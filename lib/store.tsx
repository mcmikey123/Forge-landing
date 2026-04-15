"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  CheckIn,
  DiaryEntry,
  MealTemplate,
  ProgressEntry,
  Role,
  Supplement,
} from "./types";

type State = {
  role: Role;
  mealTemplates: MealTemplate[];
  diary: DiaryEntry[];
  supplements: Supplement[];
  checkIns: CheckIn[];
  progress: ProgressEntry[];
};

const KEY = "forgept-demo-v1";

const seed: State = {
  role: "client",
  mealTemplates: [
    {
      id: "tpl-oats",
      name: "Power Oats",
      description: "Sustained carbs for morning training days.",
      tag: "breakfast",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
      items: [
        { id: "i1", name: "Rolled oats", grams: 80, calories: 300, protein: 11, carbs: 54, fat: 5 },
        { id: "i2", name: "Whey protein", grams: 30, calories: 120, protein: 24, carbs: 2, fat: 1 },
        { id: "i3", name: "Blueberries", grams: 80, calories: 45, protein: 0, carbs: 11, fat: 0 },
      ],
    },
    {
      id: "tpl-chicken",
      name: "Chicken & Rice",
      description: "Lunch staple. Adjust rice portion on low days.",
      tag: "lunch",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
      items: [
        { id: "i4", name: "Chicken breast", grams: 180, calories: 297, protein: 56, carbs: 0, fat: 6 },
        { id: "i5", name: "Jasmine rice (cooked)", grams: 200, calories: 260, protein: 5, carbs: 56, fat: 1 },
        { id: "i6", name: "Broccoli", grams: 150, calories: 50, protein: 4, carbs: 10, fat: 0 },
      ],
    },
  ],
  diary: [],
  supplements: [
    {
      id: "sup-whey",
      name: "Whey Isolate",
      dose: "30g post-training",
      notes: "Protein top-up when meals are light.",
      imageUrl:
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600",
      link: "https://example.com/whey",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    },
    {
      id: "sup-creatine",
      name: "Creatine Monohydrate",
      dose: "5g daily",
      notes: "Take consistently — timing doesn't matter.",
      imageUrl:
        "https://images.unsplash.com/photo-1579722821273-0f6c1b5d0e4a?w=600",
      link: "https://example.com/creatine",
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    },
  ],
  checkIns: [],
  progress: [
    {
      id: "p1",
      date: "2026-03-09",
      weightKg: 86.4,
      frontUrl:
        "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600",
      sideUrl:
        "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600",
      backUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600",
    },
    {
      id: "p2",
      date: "2026-03-23",
      weightKg: 85.1,
      frontUrl:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600",
      sideUrl:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600",
      backUrl:
        "https://images.unsplash.com/photo-1549476464-37392f717541?w=600",
    },
    {
      id: "p3",
      date: "2026-04-06",
      weightKg: 84.2,
      frontUrl:
        "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=600",
      sideUrl:
        "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600",
      backUrl:
        "https://images.unsplash.com/photo-1540206395-68808572332f?w=600",
    },
    {
      id: "p4",
      date: "2026-04-13",
      weightKg: 83.6,
      frontUrl:
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600",
      sideUrl:
        "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=600",
      backUrl:
        "https://images.unsplash.com/photo-1583500178450-e59e4309ee7e?w=600",
    },
  ],
};

type Ctx = {
  state: State;
  setRole: (r: Role) => void;
  update: (fn: (s: State) => State) => void;
  reset: () => void;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(seed);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        setState({ ...seed, ...JSON.parse(raw) });
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const setRole = useCallback((role: Role) => {
    setState((s) => ({ ...s, role }));
  }, []);

  const update = useCallback((fn: (s: State) => State) => {
    setState((s) => fn(s));
  }, []);

  const reset = useCallback(() => setState(seed), []);

  const value = useMemo(
    () => ({ state, setRole, update, reset }),
    [state, setRole, update, reset]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function mondayOf(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00");
  const day = d.getDay();
  const diff = (day + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - diff);
  return d.toISOString().slice(0, 10);
}
