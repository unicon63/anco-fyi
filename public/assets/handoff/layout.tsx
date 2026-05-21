// app/layout.tsx — UPDATED
// Only two lines change vs. your current file:
//   1. Import SkyBackground
//   2. Render <SkyBackground /> as the first child of <body>
//
// Mounting it here (not inside any page) is what keeps the cloud animation
// running continuously across `/`, `/rsvp`, `/confirmation` — the layout
// component never unmounts during client-side navigation.

import type { Metadata } from "next";
import { Instrument_Serif, Work_Sans } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";
import SkyBackground from "@/components/SkyBackground"; // ← NEW

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "∞ Annie & Nico ∞",
  description: "June 19–20 2027",
  metadataBase: new URL("https://anco.fyi"),
  openGraph: {
    title: "∞ Annie & Nico ∞",
    description: "June 19–20 2027",
    url: "https://anco.fyi",
    siteName: "anco.fyi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${workSans.variable}`}>
      <body className="antialiased bg-transparent">
        <SkyBackground /> {/* ← NEW: persistent animated sky behind every route */}
        <div className="app-bg">
          {children}
        </div>
        <AudioPlayer />
      </body>
    </html>
  );
}
