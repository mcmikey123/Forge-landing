import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ForgePT — Coaching, forged around the client",
  description:
    "Marketing and demo for ForgePT: PT-built meal templates, supplement plans, weekly check-ins, and progress tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <StoreProvider>
          <Nav />
          <main className="mx-auto max-w-6xl px-6 pb-24 pt-8">{children}</main>
          <footer className="mx-auto max-w-6xl px-6 py-10 text-xs text-ink/50">
            ForgePT — forged for the few. Demo data lives only in your browser.
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
