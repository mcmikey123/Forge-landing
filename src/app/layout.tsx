import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ForgePT — Coaching software shaped around you",
  description:
    "ForgePT is coaching software for personal trainers. The app adapts to you. Not the other way round.",
  metadataBase: new URL("https://forgept.app"),
  openGraph: {
    title: "ForgePT — Coaching software shaped around you",
    description:
      "Coaching software for personal trainers. The app adapts to you. Not the other way round.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <meta name="theme-color" content="#f5f1ea" />
      </head>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
