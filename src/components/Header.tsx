"use client";

import { useEffect, useState } from "react";
import { BrandMark, Ico } from "./icons";

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="site">
      <div className="wrap nav">
        <a className="brand" href="#top">
          <BrandMark />
          Forgept
        </a>
        <nav className="nav-links">
          <a href="#problem">Why Forgept</a>
          <a href="#adapts">How it works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Ico.sun /> : <Ico.moon />}
          </button>
          <a className="btn btn-primary" href="#enquire">
            Enquire now <Ico.arrow />
          </a>
        </div>
      </div>
    </header>
  );
}
