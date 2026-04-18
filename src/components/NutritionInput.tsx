"use client";

import { useEffect, useState } from "react";

type Food = { ic: string; name: string; macro: string; kcal: number };
type Totals = { kcal: number; p: number; c: number; f: number };

const meals: { phrase: string; foods: Food[]; totals: Totals }[] = [
  {
    phrase: "two eggs on sourdough with avocado and a flat white",
    foods: [
      { ic: "🥚", name: "2 eggs, poached", macro: "P 12g · F 10g", kcal: 140 },
      { ic: "🍞", name: "Sourdough toast", macro: "C 28g · F 2g", kcal: 150 },
      { ic: "🥑", name: "Half avocado", macro: "F 14g · C 6g", kcal: 160 },
      { ic: "☕", name: "Flat white, whole", macro: "P 6g · F 5g", kcal: 110 },
    ],
    totals: { kcal: 560, p: 22, c: 36, f: 31 },
  },
  {
    phrase: "grilled chicken, sweet potato and a big side of broccoli",
    foods: [
      { ic: "🍗", name: "Grilled chicken 180g", macro: "P 44g · F 6g", kcal: 250 },
      { ic: "🍠", name: "Sweet potato 200g", macro: "C 42g", kcal: 180 },
      { ic: "🥦", name: "Broccoli, big side", macro: "C 8g · P 5g", kcal: 55 },
    ],
    totals: { kcal: 485, p: 55, c: 50, f: 8 },
  },
  {
    phrase: "greek yogurt, handful of berries, granola",
    foods: [
      { ic: "🥣", name: "Greek yogurt 200g", macro: "P 18g · C 10g", kcal: 140 },
      { ic: "🫐", name: "Mixed berries", macro: "C 14g", kcal: 60 },
      { ic: "🌾", name: "Granola, 30g", macro: "C 20g · F 5g", kcal: 140 },
    ],
    totals: { kcal: 340, p: 19, c: 44, f: 8 },
  },
];

export default function NutritionInput() {
  const [mealIdx, setMealIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [dropped, setDropped] = useState<Food[]>([]);
  const [totals, setTotals] = useState<Totals>({ kcal: 0, p: 0, c: 0, f: 0 });

  useEffect(() => {
    const meal = meals[mealIdx];
    setTyped("");
    setDropped([]);
    setTotals({ kcal: 0, p: 0, c: 0, f: 0 });

    let i = 0;
    const typing = setInterval(() => {
      i++;
      setTyped(meal.phrase.slice(0, i));
      if (i >= meal.phrase.length) clearInterval(typing);
    }, 38);

    const typeDuration = meal.phrase.length * 38 + 250;
    const drops = meal.foods.map((f, k) =>
      setTimeout(() => {
        setDropped((prev) => [...prev, f]);
      }, typeDuration + k * 480),
    );
    const totalsDelay = typeDuration + meal.foods.length * 480 + 300;
    const totalsT = setTimeout(() => setTotals(meal.totals), totalsDelay);
    const next = setTimeout(() => setMealIdx((mealIdx + 1) % meals.length), totalsDelay + 3200);

    return () => {
      clearInterval(typing);
      drops.forEach(clearTimeout);
      clearTimeout(totalsT);
      clearTimeout(next);
    };
  }, [mealIdx]);

  return (
    <div className="nutri-demo">
      <div className="nutri-input">
        <span className="prompt-dot" />
        <span>{typed}</span>
        <span className="caret" />
      </div>
      <div className="nutri-log">
        <div className="nutri-log-head">
          <span>Today&apos;s log</span>
          <span>{dropped.length} items</span>
        </div>
        {dropped.map((f, i) => (
          <div className="food-chip" key={`${mealIdx}-${i}`}>
            <span className="fc-ic">{f.ic}</span>
            <span className="fc-name">{f.name}</span>
            <span className="fc-macro">{f.macro}</span>
            <span className="fc-kcal">{f.kcal}</span>
          </div>
        ))}
        <div className="nutri-totals">
          <div className="nt-cell">
            <div className="nt-lab">kcal</div>
            <div className="nt-val"><em>{totals.kcal}</em></div>
          </div>
          <div className="nt-cell">
            <div className="nt-lab">protein</div>
            <div className="nt-val">{totals.p}g</div>
          </div>
          <div className="nt-cell">
            <div className="nt-lab">carbs</div>
            <div className="nt-val">{totals.c}g</div>
          </div>
          <div className="nt-cell">
            <div className="nt-lab">fat</div>
            <div className="nt-val">{totals.f}g</div>
          </div>
        </div>
      </div>
    </div>
  );
}
