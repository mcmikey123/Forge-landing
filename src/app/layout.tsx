import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sans = Source_Sans_3({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ForgePT — Personal Trainer Software Built Around How You Coach",
  description:
    "Custom-built personal trainer software shaped around your workflow. Not another generic PT app — we build ForgePT around how you actually coach.",
  metadataBase: new URL("https://forgept.app"),
  openGraph: {
    title: "ForgePT — Personal Trainer Software Built Around How You Coach",
    description:
      "Custom-built personal trainer software shaped around your workflow. Not another generic PT app — we build ForgePT around how you actually coach.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={sans.variable}>
      <head>
        <meta name="theme-color" content="#0d0d0b" />
      </head>
      <body>{children}</body>
    </html>
  );
}
