import type { Metadata } from "next";
import { Source_Sans_3, Caveat } from "next/font/google";
import "./globals.css";

const sans = Source_Sans_3({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const hand = Caveat({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forgept · Software that adapts to you",
  description:
    "Forgept is a client platform we hand build around how you actually coach. Your workflow, your check ins, your language.",
  metadataBase: new URL("https://forgept.app"),
  openGraph: {
    title: "Forgept · Software that adapts to you",
    description:
      "Forgept is a client platform we hand build around how you actually coach.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${hand.variable}`}>
      <head>
        <meta name="theme-color" content="#0d0d0b" />
      </head>
      <body>{children}</body>
    </html>
  );
}
