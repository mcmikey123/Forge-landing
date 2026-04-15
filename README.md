# ForgePT — Landing & Feature Demo

Marketing site and interactive demo for ForgePT, coaching software for personal trainers.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 3
- Instrument Serif + Inter via `next/font`
- Client-side state in `localStorage` (no backend required for the demo)

## Features

Toggle between **Trainer** and **Client** in the top-right to see both sides.

- **Meal Builder** (`/meal-builder`) — PT creates reusable meal templates with items + macros. Client imports templates into their food diary on any date.
- **Supplements** (`/supplements`) — PT recommends with name, image, dose, notes, and product link.
- **Weekly Check-in** (`/check-in`) — Client rates hunger, training performance, and mood (1–5) with notes per area. Submitted before the call so the call is signal, not small talk.
- **Progress Pictures** (`/progress`) — Side-by-side comparison with **two independently toggleable date selectors**. Every date option is labelled `date — weight` so the lightest weigh-ins are obvious. Front/side/back angle toggle and delta bar showing weight change between the two selected weeks.

## Reset

Demo data lives in `localStorage`. Use the **Reset** button in the nav to restore the seeded examples.

## Philosophy

No icons. No generic SaaS vocabulary. The app adapts to the coach, not the other way round.
