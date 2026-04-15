"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

const links = [
  { href: "/", label: "Home" },
  { href: "/meal-builder", label: "Meal Builder" },
  { href: "/supplements", label: "Supplements" },
  { href: "/check-in", label: "Weekly Check-in" },
  { href: "/progress", label: "Progress" },
];

export default function Nav() {
  const pathname = usePathname();
  const { state, setRole, reset } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-parchment/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight">
          ForgePT
        </Link>
        <nav className="hidden gap-1 md:flex">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-ink text-parchment"
                    : "text-ink/70 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-ink/20 p-0.5 text-xs">
            <button
              onClick={() => setRole("pt")}
              className={`rounded-full px-3 py-1 ${
                state.role === "pt" ? "bg-ink text-parchment" : "text-ink/60"
              }`}
            >
              Trainer
            </button>
            <button
              onClick={() => setRole("client")}
              className={`rounded-full px-3 py-1 ${
                state.role === "client"
                  ? "bg-ink text-parchment"
                  : "text-ink/60"
              }`}
            >
              Client
            </button>
          </div>
          <button
            onClick={reset}
            title="Reset demo data"
            className="hidden rounded-full border border-ink/20 px-3 py-1 text-xs text-ink/60 hover:text-ink md:inline"
          >
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
