export type Role = "pt" | "client";

export type MealItem = {
  id: string;
  name: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealTemplate = {
  id: string;
  name: string;
  description: string;
  tag: "breakfast" | "lunch" | "dinner" | "snack";
  items: MealItem[];
  createdAt: number;
};

export type DiaryEntry = {
  id: string;
  date: string; // yyyy-mm-dd
  mealName: string;
  templateId?: string;
  items: MealItem[];
};

export type Supplement = {
  id: string;
  name: string;
  dose: string;
  notes: string;
  imageUrl: string;
  link: string;
  createdAt: number;
};

export type MoodScale = 1 | 2 | 3 | 4 | 5;

export type CheckIn = {
  id: string;
  weekOf: string; // yyyy-mm-dd (Monday)
  hungerRating: MoodScale;
  hungerNotes: string;
  performanceRating: MoodScale;
  performanceNotes: string;
  moodRating: MoodScale;
  moodNotes: string;
  submittedAt?: number;
};

export type ProgressEntry = {
  id: string;
  date: string; // yyyy-mm-dd
  weightKg: number;
  frontUrl?: string;
  sideUrl?: string;
  backUrl?: string;
};
